import { Meta, StoryObj } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { LabelComponent } from '../../../components';

type StoryType = LabelComponent & { text?: string };

const meta: Meta<StoryType> = {
  title: 'atoms/Label',
  component: LabelComponent,
  render: (args) => {
    const { text, ...props } = args;
    return {
      props,
      template: `
        <Label [css]="css">
          ${text}
        </Label>
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
    for: {
      type: 'string',
    },
  },
  args: {
    css: 'label-primary' || 'label-secondary' || 'label-tertiary',
    text: '',
    for: '',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<StoryType>;

export const Primary: Story = {
  args: {
    css: 'label-primary',
    text: 'Label Text',
  },
};
