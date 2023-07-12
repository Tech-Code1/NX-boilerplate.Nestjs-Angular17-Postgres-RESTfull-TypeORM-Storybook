import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Label } from '../../atoms/label/label';
import type { InputType } from './Input.interface';
import styles from './input.scss?inline';

const getStyles = (styles: string[]) =>
  ['input', ...styles].filter(Boolean).join(' ');

export enum Code {
  EMPTY = "Input field can't be empty!",
  INVALID_EMAIL = 'Email address is not valid!',
  LENGTH_ERROR = 'The field should have more characters',
  TOO_SMALL = 'The field should have more characters',
  // Add more error types and messages as needed
}

export type ErrorsType = keyof typeof Code;

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
    onBlur$,
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
        onBlur$={onBlur$}
        placeholder={placeholder}
      />
      {errors && <p class="error">{Code[errors as ErrorsType]}</p>}
    </div>
  );
});
