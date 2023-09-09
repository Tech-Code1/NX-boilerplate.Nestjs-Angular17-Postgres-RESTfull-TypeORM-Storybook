export type BooleanValue = { requiredLength: number };
export type ErrorFunction = (
  booleanValue?: BooleanValue,
  controlName?: string
) => string;

export const ErrorMessages = {
  EMPTY: `The field is required`,
  MIN_LENGTH: (booleanValue: BooleanValue) =>
    `The field must have at least ${booleanValue.requiredLength} characters.`,
  MAX_LENGTH: (booleanValue: BooleanValue) =>
    `The field must have a maximum of ${booleanValue.requiredLength} characters.`,
  INVALID_EMAIL: 'Email address is not valid!',
  PATTERN: `The field does not have a valid format.`,
  INVALID_NUMBER: 'Invalid number! Only digits are allowed.',
  NO_SIMILAR: `The password must be the same.`,
  // Add more error types and messages as needed
};
