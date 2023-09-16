export type BooleanValue = { requiredLength: number };
export type ErrorFunction = (
  booleanValue?: BooleanValue,
  controlName?: string
) => string;

export const DefaultErrorMessages: Record<string, ErrorFunction> = {
  required: () => 'The field is required',
  email: () => 'Email address is not valid!',
  pattern: () => 'The field does not have a valid format.',
  minlength: (booleanValue: BooleanValue = { requiredLength: 6 }) =>
    `The field must have at least ${booleanValue.requiredLength} characters.`,
  maxlength: (booleanValue: BooleanValue = { requiredLength: 50 }) =>
    `The field must have a maximum of ${booleanValue.requiredLength} characters.`,
  noSimilar: () => 'Passwords do not match.',
  // ... other errors can be added here
};
