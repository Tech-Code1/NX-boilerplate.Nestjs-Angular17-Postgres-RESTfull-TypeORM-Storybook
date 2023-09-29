import { FormControl, FormGroup } from '@angular/forms';

type RequiredInputType = {
  css: 'input-primary' | 'input-secondary' | 'input-tertiary';
  name: string;
  type: 'number' | 'text' | 'email' | 'password';
};

type OptionalInputType = {
  value: string | number;
  id: string;
  formGroup: FormGroup;
  formControl: FormControl;
  placeholder: string;
  disabled?: boolean;
};

export type InputType = RequiredInputType & Partial<OptionalInputType>;
