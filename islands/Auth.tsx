import { useState } from "preact/hooks";
import { supabase } from "../supabase/client.ts";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event: Event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <>
      <img src="./logo.png" alt="walking dinos" />
      <h3 class="md:(text-1xl) text-1xl font-bold text-center">
        Supabase + Deno Fresh
      </h3>
      <div class="row flex flex-center">
        <div class="col-6 form-widget">
          <p class="mt-4 text-lg text-center">
            Sign in via magic link with your email below
          </p>
          <form class="form-widget" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                class={"p-2 w-full border-2 border-yellow-300 h-10 rounded-md text-lg mt-4 text-center duration-300 focus:(outline-none border-yellow-400)"}
              />
            </div>
            <div>
              <button
                disabled={loading}
                class={"w-full uppercase bg-gray-700 border border-transparent rounded-md mt-4 py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-gray-900"}
              >
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
