import { FormControl } from '@angular/forms';

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
  errors?: string;
  name?: string;
  placeholder?: string;
};

export type InputType = RequiredInputType & OptionalInputType;
