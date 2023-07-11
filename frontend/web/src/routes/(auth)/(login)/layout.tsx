import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex flex-col items-center justify-center w-full h-full p-4">
      <Link href="/login">login</Link>
      <Link href="/register">register</Link>
      <Slot />
    </div>
  );
});
