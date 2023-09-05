import { useEffect, useState } from "preact/hooks";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../supabase/client.ts";
import Avatar from "./Avatar.tsx";

export default function Profile(
  props: { session: AuthSession },
) {
  const { session } = props;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [full_name, setFullname] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setavatar_url] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, full_name, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setFullname(data.full_name);
        setWebsite(data.website);
        setavatar_url(data.avatar_url);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  async function updateProfile(
    event: Event,
    avatar_url: string | null,
  ): Promise<void> {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      full_name,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setavatar_url(avatar_url);
    }
    setLoading(false);
  }

  return (
    <>
      <Avatar
        url={avatar_url || ""}
        size={165}
        onUpload={(event: Event, url: string) => {
          updateProfile(event, url);
        }}
      />
      <div class="mt-3">
        <label htmlFor="email" class="text-sm uppercase">Email</label>
        <input
          id="email"
          type="text"
          value={session.user.email}
          disabled
          class={"p-2 w-full border-2 border-yellow-300 h-10 rounded-md text-lg mt-1 text-center duration-300 focus:(outline-none border-yellow-400)"}
        />
      </div>
      <div class="mt-3">
        <label htmlFor="username" class="text-sm uppercase">
          Username
        </label>
        <input
          id="username"
          type="text"
          required
          value={username || ""}
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          placeholder="e.g. agent007"
          class={"p-2 w-full border-2 border-yellow-300 h-10 rounded-md text-lg mt-1 text-center duration-300 focus:(outline-none border-yellow-400)"}
        />
      </div>
      <div class="mt-3">
        <label htmlFor="full_name" class="text-sm uppercase">
          Full name
        </label>
        <input
          id="full_name"
          type="text"
          required
          value={full_name || ""}
          onChange={(e) => setFullname((e.target as HTMLInputElement).value)}
          placeholder="e.g. James Bond"
          class={"p-2 w-full border-2 border-yellow-300 h-10 rounded-md text-lg mt-1 text-center duration-300 focus:(outline-none border-yellow-400)"}
        />
      </div>
      <div class="mt-3">
        <label htmlFor="website" class="text-sm uppercase">Website</label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite((e.target as HTMLInputElement).value)}
          placeholder="e.g. https://www.james-bond-blog.com"
          class={"p-2 w-full border-2 border-yellow-300 h-10 rounded-md text-lg mt-1 text-center duration-300 focus:(outline-none border-yellow-400)"}
        />
      </div>
      <div class="mt-3">
        <button
          type="button"
          disabled={loading}
          onClick={(e) => updateProfile(e, avatar_url)}
          class={"w-full uppercase bg-gray-700 border border-transparent rounded-md mt-4 py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-gray-900"}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
      <div class="mt-1">
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          class={"w-full uppercase bg-gray-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-gray-900"}
        >
          Sign Out
        </button>
      </div>
    </>
  );
}
