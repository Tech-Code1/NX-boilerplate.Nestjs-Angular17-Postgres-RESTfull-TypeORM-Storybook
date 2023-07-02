import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Label } from '../../atoms/label/label';
import type { InputType } from './Input.interface';
import styles from './input.scss?inline';

const getStyles = (...args: string[]) =>
  ['input', ...args].filter(Boolean).join(' ');

const validators = (errors: { [key: string]: string }, key: string) => {
  return errors[key] ? <p class="error">Input filed can't be empty!</p> : '';
};

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
        class={getStyles(style)}
        required
        disabled={disabled}
        onInput$={onInput$}
        placeholder={placeholder}
      />
      {errors && errorKey && validators(errors, errorKey)}
    </div>
  );
});
