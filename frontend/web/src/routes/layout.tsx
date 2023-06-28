import { component$, Slot } from '@builder.io/qwik';
import Navbar from '../components/shared/navbar/navbar';

export default component$(() => {
  return (
    <>
      <main class="flex flex-col items-center justify-center">
        <Navbar />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://discord.gg/77guznJ8mZ" target="_blank">
          Made with ❤ by Indie Creators HQ
        </a>
      </footer>
    </>
  );
});
