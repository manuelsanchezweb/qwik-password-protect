import { component$ } from "@builder.io/qwik";
import { Form, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";

import img from "../../public/img.png";

export const useDeleteCookie = routeAction$(async (_, { cookie, redirect }) => {
  cookie.delete(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!, {
    domain: "localhost",
    path: "/login",
  });
  // console.log("You have been logged out");

  // console.log(cookie.get(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!));
  throw redirect(302, "/login");
});

// export const onGet: RequestHandler = ({ cookie, redirect }) => {
//   if (!cookie.get(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!)) {
//     throw redirect(302, "/login");
//   }
// };

export default component$(() => {
  const deleteCookie = useDeleteCookie();

  return (
    <main class="flex min-h-screen flex-col items-center justify-center gap-12 p-24 text-center">
      <h1 class="text-2xl font-bold md:text-4xl">
        {" "}
        This is the secret content
      </h1>
      <img src={img} alt="Manu" width={200} height={200} />

      <Form action={deleteCookie}>
        <button
          class={`rounded-md border border-white px-4 py-2 hover:bg-gray-200 hover:text-black focus-visible:bg-gray-200 focus-visible:text-black`}
        >
          Logout
        </button>
      </Form>
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
