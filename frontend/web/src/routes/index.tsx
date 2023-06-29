import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const pokemonId = useSignal(1);

  return (
    <>
      <div class="flex flex-col gap-4 justify-center items-center">
        <span class="text-2xl">Buscador simple</span>
        <span class="text-9xl">{pokemonId}</span>

        <div class="flex flex-row gap-4">
          <button
            onClick$={() => pokemonId.value--}
            class="font-bold py-2 px-4 rounded bg-purple-600"
          >
            Anterior
          </button>
          <button
            onClick$={() => pokemonId.value++}
            class="font-bold py-2 px-4 rounded bg-red-500"
          >
            Siguiente
          </button>
        </div>
      </div>
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
