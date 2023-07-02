import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Label } from '../../atoms/label/label';
import type { InputType } from './Input.interface';
import styles from './input.scss?inline';

const getStyles = (styles: string[]) =>
  ['input', ...styles].filter(Boolean).join(' ');

export enum ErrorMessages {
  EMPTY = "Input field can't be empty!",
  INVALID_EMAIL = 'Email address is not valid!',
  LENGTH_PASSWORD = 'Enter a password with more than 6 characters',
  // Add more error types and messages as needed
}

export type ErrorsType = keyof typeof ErrorMessages;

export const Input = component$<InputType>((inputProps) => {
  useStylesScoped$(styles);

  const {
    type = 'text',
    disabled = false,
    name,
    onInput$,
    style,
    placeholder,
    value,
    errors,
    errorKey,
    titleLabel,
  } = inputProps;

  const error = errors ? 'error' : '';

  const inputStyles = getStyles([style, error]);
  return (
    <div class="content-input">
      {titleLabel && (
        <Label
          for={name}
          children={titleLabel}
          label={titleLabel}
          style="label-primary"
        />
      )}
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        class={inputStyles}
        required
        disabled={disabled}
        onInput$={onInput$}
        placeholder={placeholder}
      />
      {errors && <p class="error">{ErrorMessages[errors as ErrorsType]}</p>}
    </div>
  );
});
