import { Head } from "$fresh/runtime.ts";
import App from "../islands/App.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Magic Link Login</title>
        <meta
          name="description"
          content="Learn how create Magic Link authentication with Supabase + Deno Fresh"
        />
      </Head>
      <main class="flex flex-col items-center justify-start my-10 w-full">
        <App />
        <a
          href="https://github.com/FabianMendoza7/magic-link-login"
          target="_blank"
        >
          <img
            class="fixed z-10 right-2 bottom-2 animate-bounce md:(bottom-4 right-4)"
            width="44"
            height="44"
            src="/github.png"
            alt="Explore Magic Link Login on GitHub"
          />
        </a>
      </main>
    </>
  );
}
