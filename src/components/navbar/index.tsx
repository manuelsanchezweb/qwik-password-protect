import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  return (
    <nav>
      <ul class="flex items-center gap-12">
        <li>
          <Link href="/dashboard/">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
});
