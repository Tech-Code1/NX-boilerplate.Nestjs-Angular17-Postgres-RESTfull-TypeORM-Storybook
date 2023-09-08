import { FormControl, FormGroup } from '@angular/forms';

type RequiredInputType = {
  //type: 'text' | 'number' | 'email' | 'password';
  css: 'input-primary' | 'input-secondary' | 'input-tertiary';
  name: string;
};

type OptionalInputType = {
  value?: string | number;
  id?: string;
  formGroup?: FormGroup;
  formControl?: FormControl;
  placeholder?: string;
};

export type InputType = RequiredInputType & OptionalInputType;
