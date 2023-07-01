import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Input } from '../../components';
import doc from './input.doc.mdx';

export default {
  title: 'components/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: doc,
    },
  },
} as Meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  render: () => (
    <Input
      style="input-primary"
      placeholder="example placeholder"
      name="hola"
    />
  ),
};
