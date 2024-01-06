import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import GitHubCorner from "~/components/GitHubCorner";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useCheckCookie = routeLoader$(({ cookie, query }) => {
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
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <div id="glare"></div>
      <GitHubCorner />
      <Slot />
    </>
  );
});
