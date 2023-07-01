import { QwikChangeEvent } from '@builder.io/qwik';

export type TriggerType<T> = {
  trigger: (event: Event) => T;
};

type RequiredInputType = {
  name: string;
  placeholder: string;
  style: 'input-primary' | 'input-secondary' | 'input-tertiary';
};

type OptionalInputType = {
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  value: string | number;
  id: string;
  disabled: boolean;
  errors: { [key: string]: string };
  trigger: (event: QwikChangeEvent<HTMLInputElement>) => void;
  errorKey: string;
};

export type InputType = RequiredInputType & Partial<OptionalInputType>;
