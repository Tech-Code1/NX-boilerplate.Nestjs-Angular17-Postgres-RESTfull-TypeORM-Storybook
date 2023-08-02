import { FormControl } from '@angular/forms';

export enum Code {
  EMPTY = "Input field can't be empty!",
  INVALID_EMAIL = 'Email address is not valid!',
  TOO_SMALL = 'The field should have more characters',
  // Add more error types and messages as needed
}

export type ErrorsType = keyof typeof Code;

type RequiredInputType = {
  type: 'text' | 'number' | 'email' | 'password';
  css: 'input-primary' | 'input-secondary' | 'input-tertiary';
  disabled: boolean;
  onChange: (value: string) => void;
  onTouch: () => void;
  formControl: FormControl;
};

type OptionalInputType = {
  value?: string | number;
  id?: string;
  errors?: ErrorsType;
  name?: string;
  placeholder?: string;
};

export type InputType = RequiredInputType & OptionalInputType;
