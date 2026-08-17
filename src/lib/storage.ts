import { supabase, isDemoMode } from "./supabase";

/**
 * Uploads an image file to Supabase Storage bucket 'clinic-assets'.
 * If bucket doesn't exist or upload fails, falls back to a Base64 data URL
 * so that uploads work seamlessly without crashing.
 */
export async function uploadClinicAsset(file: File): Promise<string> {
  if (isDemoMode) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('clinic-assets')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.warn("Supabase Storage upload failed, falling back to Base64 data URL:", uploadError.message);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const { data } = supabase.storage
      .from('clinic-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.warn("Storage exception, using Base64 fallback", err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
