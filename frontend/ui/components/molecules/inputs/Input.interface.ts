import { QwikChangeEvent } from '@builder.io/qwik';

export type EventsInputsPropsType = {
  // Mouse Events
  onInput$?: (event: Event, element: HTMLInputElement) => any;
  onChange$?: (
    event: QwikChangeEvent<HTMLInputElement>,
    element: HTMLInputElement
  ) => any;
};

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
  events: EventsInputsPropsType;
  errorKey: string;
  titleLabel: string;
};

export type InputType = RequiredInputType &
  Partial<OptionalInputType> &
  EventsInputsPropsType;
