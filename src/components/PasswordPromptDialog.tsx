import { $, QwikSubmitEvent, component$, useSignal } from "@builder.io/qwik";
import { IconEyeOff, IconEyeOn } from "./Icons";
import { log } from "console";
import { Form, routeAction$, useNavigate } from "@builder.io/qwik-city";

/**
 * This component renders a dialog for password input.
 * @param onSubmit - A callback function to handle the form submission.
 */
const PasswordPromptDialog = component$(() => {
  const password = useSignal("");
  const passwordVisible = useSignal(false); // New SignaluseSignal for toggling visibility
  const passwordIncorrect = useSignal(false);
  const loading = useSignal(false);
  const nav = useNavigate();

  console.log("passwordIncorrect", passwordIncorrect.value);

  const submitPassword = (event: QwikSubmitEvent) => {
    // event.preventDefault();
    // event.stopImmediatePropagation(); // Stop other event handlers

    console.log("Before URL Change");

    const encodedPassword = encodeURIComponent(password.value);
    if (encodedPassword) {
      window.history.pushState({}, "", `/?password=${encodedPassword}`);
    } else {
      console.error("Password is empty");
    }

    console.log("After URL Change");
  };

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
        // action={submitPassword}
      >
        <label for="password">Insert Password:</label>
        <div class="relative">
          <input
            class="p-2"
            type={passwordVisible.value ? "text" : "password"}
            id="password"
            value={password.value}
            onChange$={(e) => (password.value = e.target.value)}
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
      {passwordIncorrect.value && (
        <p class="text-center text-red-500">
          Password incorrect. <p class="italic">Try writing msweb.</p>
        </p>
      )}
    </div>
  );
});

export default PasswordPromptDialog;
