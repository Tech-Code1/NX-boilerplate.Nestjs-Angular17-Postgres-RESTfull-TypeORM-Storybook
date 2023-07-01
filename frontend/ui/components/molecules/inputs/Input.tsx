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
    label = '',
    name,
    trigger,
    style,
    placeholder,
    value,
    errors,
    errorKey,
    titleLabel,
    ...props
  } = inputProps;

  return (
    <div class="content-input">
      {label && (
        <Label
          for={name}
          children={titleLabel}
          label={label}
          style="label-primary"
        />
      )}
      <input
        type={type}
        id={label || name}
        value={value}
        name={name}
        class={getStyles(style)}
        required
        disabled={disabled}
        onChange$={() => trigger}
        placeholder={placeholder}
      />
      {errors && errorKey && validators(errors, errorKey)}
    </div>
  );
});
