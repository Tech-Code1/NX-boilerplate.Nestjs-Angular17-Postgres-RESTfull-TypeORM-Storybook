import { Meta, StoryObj } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { ButtonComponent } from '../../../components';

type StoryType = ButtonComponent & { text?: string };

const meta: Meta<StoryType> = {
  title: 'Components/Molecules/Button',
  component: ButtonComponent,
  render: (args) => {
    const { text, ...props } = args;
    return {
      props,
      template: `
        <Button [css]="css">
          ${text}
        </Button>
      `,
    };
  },
  argTypes: {
    css: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  args: {
    css: 'button-primary' || 'button-secondary' || 'button-tertiary',
    text: '',
    type: 'button' || 'reset' || 'submit',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<StoryType>;

export const Primary: Story = {
  args: {
    css: 'button-primary',
    text: 'Button Text',
  },
};
