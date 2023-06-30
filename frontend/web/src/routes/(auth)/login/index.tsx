import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const pokemonId = useSignal(1);

  return (
    <>
      <h2>Login form</h2>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
