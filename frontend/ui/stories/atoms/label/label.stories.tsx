import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Label } from '../../../components';
import doc from './label.doc.mdx';

export default {
  title: 'atoms/Label',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: doc,
    },
  },
} as Meta;

type Story = StoryObj<typeof Label>;

export const Primary: Story = {
  render: () => (
    <Label
      style="label-primary"
      children="Example label"
      label="Example label"
    />
  ),
};
