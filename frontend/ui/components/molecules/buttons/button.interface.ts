import {
  QwikFocusEvent,
  QwikKeyboardEvent,
  QwikMouseEvent,
  QwikSubmitEvent,
  QwikTouchEvent,
} from '@builder.io/qwik';

type EventsProps = {
  // Mouse Events
  onClick$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onDoubleClick$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseDown$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseEnter$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseLeave$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseMove$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseOut$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseOver$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  onMouseUp$?: (
    event: QwikMouseEvent<HTMLElement, MouseEvent>,
    element: HTMLElement
  ) => any;
  // Keyboard Events
  onKeyDown$?: (
    event: QwikKeyboardEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  onKeyPress$?: (
    event: QwikKeyboardEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  onKeyUp$?: (
    event: QwikKeyboardEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  // Focus Events
  onFocus$?: (event: QwikFocusEvent<HTMLElement>, element: HTMLElement) => any;
  onBlur$?: (event: QwikFocusEvent<HTMLElement>, element: HTMLElement) => any;
  // Form Events
  onSubmit$?: (
    event: QwikSubmitEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  // Touch Events
  onTouchCancel$?: (
    event: QwikTouchEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  onTouchEnd$?: (
    event: QwikTouchEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  onTouchMove$?: (
    event: QwikTouchEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  onTouchStart$?: (
    event: QwikTouchEvent<HTMLElement>,
    element: HTMLElement
  ) => any;
  // Others...
};

type RequiredInputType = {
  style: 'button-primary' | 'button-secondary' | 'button-tertiary';
};

type OptionalInputType = {
  type: 'button' | 'reset' | 'submit';
  disabled: boolean;
  events: EventsProps;
  color: 't-black' | 't-white';
};

export type ButtonType = RequiredInputType & Partial<OptionalInputType>;
