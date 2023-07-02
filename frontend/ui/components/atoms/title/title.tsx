import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import type { TitleType } from './title.interface';
import styles from './title.scss?inline';

const getStyles = (...args: string[]) =>
  ['title', ...args].filter(Boolean).join(' ');

export const Title = component$<TitleType>(({ style }) => {
  useStyles$(styles);
  return (
    <p class={getStyles(style)}>
      <Slot />
    </p>
  );
});
