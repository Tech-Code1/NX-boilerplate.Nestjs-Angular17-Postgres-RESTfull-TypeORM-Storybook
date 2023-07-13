import { component$, Slot } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const route = useLocation();

  return (
    <div class="flex flex-row items-center justify-center w-full h-full gap-8">
      <div class="flex flex-col gap-4">
        <Link
          class={[
            {
              'flex justify-center p-4 bg-purple-300 rounded-md font-bold text-purple-700':
                route.url.pathname === '/login/',
            },
            'flex justify-center p-4 bg-gray-100 rounded-md',
          ]}
          href="/login"
        >
          Login
        </Link>
        <Link
          class={[
            {
              'flex justify-center p-4 bg-purple-300 rounded-md font-bold text-purple-700':
                route.url.pathname === '/register/',
            },
            'flex justify-center p-4 bg-gray-100 rounded-md',
          ]}
          href="/register"
        >
          Register
        </Link>
      </div>
      <Slot />
    </div>
  );
});
