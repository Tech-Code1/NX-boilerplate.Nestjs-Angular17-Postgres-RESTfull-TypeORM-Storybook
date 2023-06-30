import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <h3>Dashboard Layout</h3>
      <Slot />
    </>
  );
});
