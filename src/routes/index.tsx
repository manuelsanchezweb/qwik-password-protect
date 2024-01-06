import { $, component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeAction$,
  Link,
} from "@builder.io/qwik-city";
import { IconEyeOff, IconEyeOn } from "~/components/Icons";
import { useCheckCookie } from "./layout";

export const useSubmitPassword = routeAction$(
  async (data, { cookie, redirect }) => {
    const password = data["password"];

    if (password !== import.meta.env.PUBLIC_PAGE_PASSWORD) {
      return {
        success: false,
      };
    }

    cookie.set(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!, "1", {
      secure: true,
      path: "/",
    });

    redirect(302, "/dashboard");
    return {
      success: true,
    };
  },
);

export default component$(() => {
  const passwordVisible = useSignal(false);
  const loading = useSignal(false);
  const submitAction = useSubmitPassword();
  const hasCookie = useCheckCookie();

  const togglePasswordVisibility = $(() => {
    passwordVisible.value = !passwordVisible.value;
  });

  return (
    <div class="grid min-h-screen place-content-center">
      <div class="flex flex-col gap-2 text-center">
        <h1 class="text-2xl font-bold md:text-4xl">
          Qwik Template Password Protected
        </h1>
      </div>

      {!hasCookie.value.success ? (
        <>
          <Form
            class="my-12 flex flex-col items-center gap-4"
            action={submitAction}
          >
            <label for="password">Insert Password:</label>
            <div class="relative">
              <input
                class="p-2"
                name="password"
                type={passwordVisible.value ? "text" : "password"}
                id="password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center justify-center pr-1 text-sm leading-5 text-black"
                onClick$={() => togglePasswordVisibility()}
              >
                {passwordVisible.value ? <IconEyeOn /> : <IconEyeOff />}
              </button>
            </div>
            <button
              disabled={loading.value}
              class={`rounded-md border border-white px-4 py-2 hover:bg-gray-200 hover:text-black focus-visible:bg-gray-200 focus-visible:text-black
      ${loading.value && "pointer-events-none opacity-50"}
      `}
              type="submit"
            >
              Submit
            </button>
          </Form>
          {submitAction.value?.success === false && (
            <p class="text-center text-red-500">
              Password incorrect. <p class="italic">Try writing msweb.</p>
            </p>
          )}
        </>
      ) : (
        <Link
          class="mx-auto my-12 rounded-lg border border-white px-3 py-2"
          href="/dashboard/"
        >
          Dashboard
        </Link>
      )}
    </div>
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
