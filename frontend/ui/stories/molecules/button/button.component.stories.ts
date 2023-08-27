import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';
import { ButtonComponent, TitleComponent } from '../../../components';

type StoryTitle = TitleComponent & { text: string };
type Story = StoryObj<ButtonComponent & { title: StoryTitle }>;
type StoryComponent = ButtonComponent & { title: StoryTitle };

const meta: Meta<StoryComponent> = {
  title: 'Components/Molecules/Button',
  component: ButtonComponent,
  //👇 Import both components to allow component compositing with Storybook
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, TitleComponent],
      imports: [CommonModule],
    }),
    //👇 Wrap our stories with a decorator (optional)
    // componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ],
  argTypes: {
    css: {
      options: ['button-primary', 'button-secondary', 'button-tertiary'],
      control: { type: 'select' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    type: {
      options: ['button', 'reset', 'submit'],
      control: { type: 'radio' },
    },
  },
  render: (args: StoryComponent) => {
    const { title, ...buttonProps } = args;
    const { text, ...titleProps } = title;

    return {
      props: { buttonProps, titleProps },
      template: `
      <c-button [css]="buttonProps.css" [disabled]="buttonProps.disabled" [type]="buttonProps.type">
      <c-title [css]="titleProps.css" [color]="titleProps.color">${text}</c-title>
    </c-button>
      `,
    };
  },
};
export default meta;

export const PrimaryButton: Story = {
  args: {
    css: 'button-primary',
    title: {
      css: 'title-base',
      color: 't-white',
      text: 'Text button',
    },
  },
};
