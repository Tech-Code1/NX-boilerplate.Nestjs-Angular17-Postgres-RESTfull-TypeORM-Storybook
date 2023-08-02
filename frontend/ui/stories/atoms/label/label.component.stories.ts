import { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from '../../../components';

type StoryType = LabelComponent & { text?: string };

const meta: Meta<StoryType> = {
  title: 'Components/Atoms/Label',
  component: LabelComponent,
  render: (args) => {
    const { text, ...props } = args;
    return {
      props,
      template: `
        <c-label [css]="css">
          ${text}
        </c-label>
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
};
export default meta;

type Story = StoryObj<StoryType>;

export const Primary: Story = {
  args: {
    css: 'label-primary',
    text: 'Label Text',
  },
};
