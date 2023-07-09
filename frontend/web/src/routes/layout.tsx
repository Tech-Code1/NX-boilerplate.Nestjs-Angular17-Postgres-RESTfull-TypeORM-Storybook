import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { QwikLogo } from '../components/icons/qwik';

export default component$(() => {
  return (
    <div class="flex justify-center items-center flex-col h-screen">
      <ul class="flex bg-[white] h-9 mb-4 z-50 w-auto rounded-md">
        <li class="w-32">
          <Link
            class="w-full h-full flex justify-center items-center"
            href="/login"
          >
            Login
          </Link>
        </li>
        <li class="w-32">
          <Link
            class="w-full flex h-full justify-center items-center"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </ul>
      <div class="w-1/2 h-3/5 flex flex-col justify-between shadown-quick">
        <div class="w-full h-24 bg-[white] flex justify-center items-center rounded-t-md">
          <Link href="https://qwik.builder.io/" target="_blank">
            <QwikLogo />
          </Link>
        </div>
        <main class="flex flex-col items-center justify-center w-full h-full p-4">
          <Slot />
        </main>
        <footer class="w-full h-24 bg-[white] flex justify-center items-center rounded-b-md">
          <Link
            class="hover:underline"
            href="https://discord.gg/77guznJ8mZ"
            target="_blank"
          >
            Made with ❤ by Indie Creators HQ
          </Link>
        </footer>
      </div>
    </div>
  );
});
