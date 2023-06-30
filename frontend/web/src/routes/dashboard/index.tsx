import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h3>Admin dashboard</h3>
      <p>Esta ruta debe de ser privada</p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Boilerplate NX - Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
