import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent, LabelComponent } from '../../../components';

type StoryLabel = LabelComponent & { text: string };
type Story = StoryObj<InputComponent & { label: StoryLabel }>;
type StoryComponent = InputComponent & { label: StoryLabel };

const meta: Meta<StoryComponent> = {
  title: 'Components/Molecules/Input',
  component: InputComponent,
  //👇 Import both components to allow component compositing with Storybook
  decorators: [
    moduleMetadata({
      declarations: [InputComponent, LabelComponent],
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
    errors: {
      options: ['EMPTY', 'INVALID_EMAIL', 'TOO_SMALL'],
      control: { type: 'select' },
    },
  },
  render: (args: StoryComponent) => {
    const { label, ...inputProps } = args;
    const { text, ...inputLabel } = label;

    return {
      props: { inputProps, inputLabel },
      template: `
      <c-label [css]="inputLabel.css">
        ${text}
        <c-input
        [css]="inputProps.css"
        [type]="inputProps.type"
        [placeholder]="inputProps.placeholder"
        [disabled]="inputProps.disabled"
        [errors]="inputProps.errors"
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
    label: {
      css: 'label-primary',
      text: 'Label text',
    },
  },
};
