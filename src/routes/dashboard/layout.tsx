import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import GitHubCorner from "~/components/GitHubCorner";
import { Navbar } from "~/components/navbar";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

export const useCheckAuthCookie = routeLoader$(
  ({ cookie, query, redirect }) => {
    const isRightPassword =
      query.get("password") == import.meta.env.PUBLIC_PAGE_PASSWORD;
    if (isRightPassword) {
      cookie.set(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!, "1", {
        secure: true,
        path: "/",
      });
    }

    const jwtCookie = cookie.get(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME);
    if (jwtCookie) {
      // console.log("Cookie value:", jwtCookie);
      return;
    }

    redirect(302, "/");
  },
);

export const useDeleteCookie = routeAction$(async (_, { cookie, redirect }) => {
  cookie.delete(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!, {
    path: "/",
  });

  redirect(302, "/");
});

export default component$(() => {
  const actionDeleteCookie = useDeleteCookie();

  useStyles$(styles);
  return (
    <>
      <div id="glare"></div>
      <GitHubCorner />
      <div class="mt-12 flex w-auto max-w-full items-center justify-center gap-2">
        <Navbar />
        <Form action={actionDeleteCookie}>
          <button
            class={`rounded-md border border-white px-4 py-2 hover:bg-gray-200 hover:text-black focus-visible:bg-gray-200 focus-visible:text-black`}
          >
            Logout
          </button>
        </Form>
      </div>
      <Slot />
    </>
  );
});
