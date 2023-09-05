import { useEffect, useState } from "preact/hooks";
import { supabase } from "../supabase/client.ts";

export default function Avatar(
  props: {
    url: string;
    size: number;
    onUpload: CallableFunction;
  },
) {
  const { url, size, onUpload } = props;
  const [avatar_url, setavatar_url] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from("avatars").download(
        path,
      );
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setavatar_url(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event: Event) {
    try {
      setUploading(true);
      const files = (event.target as HTMLInputElement).files;

      if (
        !files || files.length === 0
      ) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div class="overflow-hidden">
      {avatar_url
        ? (
          <img
            src={avatar_url}
            alt="Avatar"
            class="p-2 w-full border-2 border-yellow-300 h-full object-cover bg-gray-100 rounded-lg border focus:(outline-none border-yellow-400)"
            style={{ height: size, width: size }}
          />
        )
        : (
          <div
            class="p-2 w-full border-2 border-yellow-300 h-full object-cover bg-gray-100 rounded-lg border"
            style={{ height: size, width: size }}
          />
        )}
      <div style={{ width: size }} class="mt-1">
        <label
          htmlFor="single"
          class={"w-full uppercase bg-gray-700 border border-transparent rounded-md mt-0 py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-gray-900"}
        >
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
