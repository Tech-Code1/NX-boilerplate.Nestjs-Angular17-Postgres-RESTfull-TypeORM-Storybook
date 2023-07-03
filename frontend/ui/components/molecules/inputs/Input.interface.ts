import { QwikChangeEvent, QwikFocusEvent } from '@builder.io/qwik';

export type EventsInputsPropsType = {
  // Input Events
  onInput$?: (event: Event, element: HTMLInputElement) => any;
  onChange$?: (
    event: QwikChangeEvent<HTMLInputElement>,
    element: HTMLInputElement
  ) => any;
  onBlur$?: (event: QwikFocusEvent<HTMLElement>, element: HTMLElement) => any;
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
  value: string | number;
  id: string;
  disabled: boolean;
  errors: string;
  events: EventsInputsPropsType;
  titleLabel: string;
};

export type InputType = RequiredInputType &
  Partial<OptionalInputType> &
  EventsInputsPropsType;
