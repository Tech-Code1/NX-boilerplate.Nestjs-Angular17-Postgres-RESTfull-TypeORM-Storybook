import { $ } from '@builder.io/qwik';

export const handleInput = $(
  (event: Event, form: Record<string, any>, key: string) => {
    const { value } = event.target as HTMLInputElement;
    form[key] = value;
  }
);
