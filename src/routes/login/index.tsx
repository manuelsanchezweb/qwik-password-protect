import { $, component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  type RequestHandler,
  Form,
  routeAction$,
} from "@builder.io/qwik-city";
import { IconEyeOff, IconEyeOn } from "~/components/Icons";

export const useSubmitPassword = routeAction$(
  async (data, { cookie, redirect }) => {
    const password = data["password"];

    if (password !== import.meta.env.PUBLIC_PAGE_PASSWORD) {
      return {
        success: false,
      };
    }

    redirect(302, "/");
    cookie.set(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!, "1");
    return {
      success: true,
    };
  },
);

export const onGet: RequestHandler = ({ cookie, query, redirect }) => {
  if (cookie.get(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!)) {
    throw redirect(302, "/");
  }
  if (query.get("password") === import.meta.env.PUBLIC_PAGE_PASSWORD) {
    cookie.set(import.meta.env.PUBLIC_PASSWORD_COOKIE_NAME!, "1");
    throw redirect(302, "/");
  }
};

export default component$(() => {
  const passwordVisible = useSignal(false);
  const loading = useSignal(false);
  const submitAction = useSubmitPassword();

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
