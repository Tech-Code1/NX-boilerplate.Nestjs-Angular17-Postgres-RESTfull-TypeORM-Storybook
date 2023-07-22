import { Meta, StoryObj } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { LabelComponent } from '../../../components';

// ? for events emitters
/* export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
}; */

const meta: Meta<LabelComponent> = {
  title: 'atoms/Label',
  component: LabelComponent,
  tags: ['autodocs'],
  render: ({ text = 'label text', ...args }: LabelComponent) => ({
    props: {
      args,
      text,
    },
  }),
};
export default meta;

type Story = StoryObj<LabelComponent>;

export const Primary: Story = {
  args: {
    style: 'label-primary',
    text: 'Example label',
    label: 'Example label',
  },
};
