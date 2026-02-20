import { createClient } from "@/lib/supabase/client";

/**
 * Upload an image file to Supabase Storage bucket "images".
 * Returns the public URL on success, or null on failure.
 */
export async function uploadImage(file: File, folder: string): Promise<string | null> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(path, file);
  if (error) return null;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}
