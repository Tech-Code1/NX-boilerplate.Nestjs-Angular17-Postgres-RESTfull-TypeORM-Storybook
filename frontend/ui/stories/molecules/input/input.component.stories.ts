import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  TitleComponent,
} from '../../../components';

type StoryTitle = TitleComponent & { text: string };
type Story = StoryObj<InputComponent>;
type StoryComponent = ButtonComponent & { title: StoryTitle };

const meta: Meta<InputComponent> = {
  title: 'Components/Molecules/Input',
  component: InputComponent,
  //👇 Import both components to allow component compositing with Storybook
  decorators: [
    moduleMetadata({
      declarations: [InputComponent],
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
  render: (args: InputComponent) => {
    const { ...inputProps } = args;

    return {
      props: { inputProps },
      template: `
      <c-input [css]="inputProps.css" [type]="inputProps.type" [placeholder]="inputProps.placeholder" [disabled]="inputProps.disabled" [name]="inputProps.name"></c-input>
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
  },
};
