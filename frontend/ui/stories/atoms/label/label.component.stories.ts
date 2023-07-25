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
};
export default meta;

type Story = StoryObj<LabelComponent>;

export const Primary: Story = {
  args: {
    css: 'label-primary',
    text: 'Label Text',
  },
};
