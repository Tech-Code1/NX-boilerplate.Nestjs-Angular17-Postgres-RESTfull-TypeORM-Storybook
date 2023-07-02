import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Input, Title } from '@ui/components';
import styles from './login.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <form class="w-1/2 flex flex-col gap-6 items-center">
        <Title style="title-2xl">Login Form</Title>

        <div class="w-full flex flex-col gap-4">
          <div class="relative">
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Password"
              label="Email Address"
              titleLabel="Email Address"
              style="input-primary"
            />
          </div>
          <div class="relative">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
              titleLabel="Password"
              style="input-primary"
            />
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
