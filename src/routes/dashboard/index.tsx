import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import img from "/img.png";

export default component$(() => {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center gap-12 p-24 text-center">
      <h1 class="text-2xl font-bold md:text-4xl">
        {" "}
        This is the secret content
      </h1>
      <img src={img} alt="Manu" width={200} height={200} />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
