import { useEffect, useState } from "preact/hooks";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "../supabase/client.ts";
import Auth from "./Auth.tsx";
import Profile from "./Profile.tsx";

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div
      class={`${
        !session ? "flex flex-col" : "grid-cols-2"
      } items-center justify-start md:(w-1/2) w-4/5`}
    >
      {!session ? <Auth /> : (
        <Profile
          key={session.user.id}
          session={session}
        />
      )}
    </div>
  );
}
