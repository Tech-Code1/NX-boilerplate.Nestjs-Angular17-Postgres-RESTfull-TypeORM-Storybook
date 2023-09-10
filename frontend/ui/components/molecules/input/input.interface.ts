import { FormControl, FormGroup } from '@angular/forms';

type RequiredInputType = {
  css: 'input-primary' | 'input-secondary' | 'input-tertiary';
  name: string;
};

type OptionalInputType = {
  value: string | number;
  id: string;
  formGroup: FormGroup;
  formControl: FormControl;
  placeholder: string;
};

export type InputType = RequiredInputType & Partial<OptionalInputType>;
