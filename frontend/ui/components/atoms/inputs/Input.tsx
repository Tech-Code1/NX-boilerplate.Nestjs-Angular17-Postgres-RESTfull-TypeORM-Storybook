import { component$ } from '@builder.io/qwik';
import './styles/input.scss';
import type { InputType } from './types/Input.interface';

const getStyles = (...args: string[]) =>
  ['input', ...args].filter(Boolean).join(' ');

const validators = (errors: { [key: string]: string }, key: string) => {
  return errors[key] ? <p class="error">Input filed can't be empty!</p> : '';
};

export const Input = component$<InputType>((inputProps) => {
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
    ...props
  } = inputProps;

  return (
    <div>
      {label && <label for={name}>{label}</label>}
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
