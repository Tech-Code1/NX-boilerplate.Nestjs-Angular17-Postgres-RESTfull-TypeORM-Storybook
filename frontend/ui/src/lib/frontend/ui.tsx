import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './ui.scss?inline';

export const Ui = component$(() => {
  useStylesScoped$(styles);

  return <>Ui works!</>;
});
