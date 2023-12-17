import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import GitHubCorner from "~/components/GitHubCorner";

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
