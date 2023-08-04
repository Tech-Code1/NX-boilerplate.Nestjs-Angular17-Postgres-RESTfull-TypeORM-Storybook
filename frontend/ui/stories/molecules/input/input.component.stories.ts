import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ErrorInputComponent,
  InputComponent,
  LabelComponent,
} from '../../../components';

type StoryLabel = LabelComponent & { text: string };
type StoryError = { error: string; formContained: FormControl<string | null> };
type Story = StoryObj<
  InputComponent & { label: StoryLabel } & { errors: StoryError }
>;
type StoryComponent = InputComponent & { label: StoryLabel } & {
  errors: StoryError;
};

const meta: Meta<StoryComponent> = {
  title: 'Components/Molecules/Input',
  component: InputComponent,
  //👇 Import both components to allow component compositing with Storybook
  decorators: [
    moduleMetadata({
      declarations: [InputComponent, LabelComponent, ErrorInputComponent],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
    //👇 Wrap our stories with a decorator (optional)
    // componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ],
  argTypes: {
    css: {
      options: ['input-primary', 'input-secondary', 'input-tertiary'],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    type: {
      options: ['number', 'text', 'email', 'password'],
      control: { type: 'radio' },
    },
  },
  render: (args: StoryComponent) => {
    const { label, errors, ...inputProps } = args;
    const { text, ...inputLabel } = label;
    const { ...inputError } = errors;

    return {
      props: { inputProps, inputLabel, inputError },
      template: `
      <c-label [css]="inputLabel.css">
        ${text}
        <c-input
        [css]="inputProps.css"
        [type]="inputProps.type"
        [placeholder]="inputProps.placeholder"
        [disabled]="inputProps.disabled"
        [formControl]="inputProps.formControl"
        [name]="inputProps.name"></c-input>
      </c-label>

      `,
    };
  },
};
export default meta;

export const PrimaryButton: Story = {
  args: {
    css: 'input-primary',
    type: 'text',
    placeholder: 'Entry text',
    disabled: false,
    name: 'example',
    formControl: new FormControl(''),
    label: {
      css: 'label-primary',
      text: 'Label text',
    },
    errors: {
      error: 'example error',
      formContained: new FormControl('', Validators.required),
    },
  },
};
