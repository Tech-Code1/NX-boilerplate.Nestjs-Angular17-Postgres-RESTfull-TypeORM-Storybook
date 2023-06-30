import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './login.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <form class="w-1/2 flex flex-col gap-6 items-center">
        <h1 class="text-2xl font-bold">Login Form</h1>

        <div class="w-full flex flex-col gap-4">
          <div class="relative">
            <input
              class="px-4"
              name="email"
              type="text"
              placeholder="Email address"
            />
            <label for="email">Email Address</label>
          </div>
          <div class="relative">
            <input
              class="px-4"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <label for="password">Password</label>
          </div>
        </div>
        <div class="relative w-full">
          <button>Ingresar</button>
        </div>

        {/* <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code> */}
      </form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX - Login',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
