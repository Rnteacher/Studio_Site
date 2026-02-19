import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function extractFolderId(url: string): string | null {
  // Match: https://drive.google.com/drive/folders/{id}
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { folderUrl, projectId } = await request.json();

    if (!folderUrl || !projectId) {
      return NextResponse.json({ error: "Missing folderUrl or projectId" }, { status: 400 });
    }

    const folderId = extractFolderId(folderUrl);
    if (!folderId) {
      return NextResponse.json({ error: "Invalid Google Drive folder URL" }, { status: 400 });
    }

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      return NextResponse.json({ error: "Google Drive integration not configured" }, { status: 500 });
    }

    // Use googleapis to list files
    const { google } = await import("googleapis");
    const credentials = JSON.parse(serviceAccountKey);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, thumbnailLink, webViewLink)",
      pageSize: 100,
      orderBy: "name",
    });

    const files = response.data.files ?? [];

    // Upsert project_media records
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { data: existing } = await supabase
        .from("project_media")
        .select("id")
        .eq("project_id", projectId)
        .eq("drive_file_id", file.id!)
        .single();

      if (existing) {
        await supabase
          .from("project_media")
          .update({
            file_name: file.name ?? "",
            mime_type: file.mimeType ?? "",
            thumbnail_url: file.thumbnailLink ?? null,
            web_view_url: file.webViewLink ?? null,
            sort_order: i,
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("project_media").insert({
          project_id: projectId,
          drive_file_id: file.id!,
          file_name: file.name ?? "",
          mime_type: file.mimeType ?? "",
          thumbnail_url: file.thumbnailLink ?? null,
          web_view_url: file.webViewLink ?? null,
          sort_order: i,
        });
      }
    }

    // Remove media that's no longer in the folder
    const driveFileIds = files.map((f) => f.id!).filter(Boolean);
    if (driveFileIds.length > 0) {
      const { data: allMedia } = await supabase
        .from("project_media")
        .select("id, drive_file_id")
        .eq("project_id", projectId)
        .not("drive_file_id", "is", null);

      const toDelete = (allMedia ?? []).filter(
        (m) => m.drive_file_id && !driveFileIds.includes(m.drive_file_id)
      );

      for (const m of toDelete) {
        await supabase.from("project_media").delete().eq("id", m.id);
      }
    }

    return NextResponse.json({
      success: true,
      filesCount: files.length,
    });
  } catch (err) {
    console.error("Drive sync error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Drive sync failed" },
      { status: 500 }
    );
  }
}
