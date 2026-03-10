import { NextResponse } from "next/server";

/**
 * Proxy Google Drive files through our server using the service account.
 * This avoids broken images when files are shared only with the SA
 * (not "anyone with the link").
 *
 * GET /api/drive/file/{fileId}
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;

  if (!fileId || fileId.length < 10) {
    return new NextResponse("Invalid file ID", { status: 400 });
  }

  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    return new NextResponse("Drive integration not configured", { status: 500 });
  }

  try {
    const { google } = await import("googleapis");
    const credentials = JSON.parse(serviceAccountKey);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Get file metadata for mime type
    const meta = await drive.files.get({ fileId, fields: "mimeType,size" });
    const mimeType = meta.data.mimeType ?? "application/octet-stream";

    // Download file content
    const file = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" },
    );

    return new NextResponse(file.data as ArrayBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("Drive file proxy error:", err);
    return new NextResponse("File not found", { status: 404 });
  }
}
