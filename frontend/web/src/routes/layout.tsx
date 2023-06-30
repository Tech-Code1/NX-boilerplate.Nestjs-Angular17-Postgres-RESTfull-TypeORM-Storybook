import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="flex justify-center items-center flex-col h-screen">
      <ul class="flex gap-6">
        <li>
          <a href="http://localhost:4200/login">Login</a>
        </li>
        <li>
          <a href="http://localhost:4200/dashboard">Dashboard</a>
        </li>
      </ul>
      <Slot />
    </div>
  );
});
