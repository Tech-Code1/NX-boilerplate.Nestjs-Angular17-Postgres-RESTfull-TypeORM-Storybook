import { Meta, StoryObj } from '@storybook/angular';
import { TitleComponent } from '../../../components';

type StoryType = TitleComponent & { text?: string };

const meta: Meta<StoryType> = {
  title: 'Components/Atoms/Title',
  component: TitleComponent,
  render: (args) => {
    const { text, ...props } = args;
    return {
      props,
      template: `
        <c-title [css]="css" [color]="color">
          ${text}
        </c-title>
      `,
    };
  },
  argTypes: {
    css: {
      control: {
        type: 'select',
        options: [
          'title-xs',
          'title-sm',
          'title-base',
          'title-xl',
          'title-2xl',
        ],
      },
    },
    color: {
      control: { type: 'radio', options: ['t-white', 't-black'] },
    },
    text: {
      control: { type: 'text' },
    },
  },
  args: {
    css: 'title-xs',
    color: 't-black',
    text: 'Title Text',
  },
};
export default meta;

type Story = StoryObj<StoryType>;

export const Primary: Story = {
  args: {
    color: 't-black',
    css: 'title-2xl',
    text: 'Title Text',
  },
};
