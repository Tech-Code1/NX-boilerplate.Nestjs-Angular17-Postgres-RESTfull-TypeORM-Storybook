import { Meta, Story } from '@storybook/angular';
//import { action } from '@storybook/addon-actions';
import { LabelDirective } from '../../../components';

// ? for events emitters
/* export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
}; */

const meta: Meta<LabelDirective> = {
  title: 'atoms/Label',
  component: LabelDirective,
  tags: ['autodocs'],
};
export default meta;

//type Story = StoryObj<LabelDirective>;

export const Primary: Story<LabelDirective> = () => ({
  moduleMetadata: {
    imports: [LabelDirective],
  },
  template: `<label Label cssClass="labelPrimary">Example label</label>`,
});
