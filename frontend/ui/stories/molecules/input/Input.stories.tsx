import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Input } from '../../../components';
import doc from './input.doc.mdx';

export default {
  title: 'molecules/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: doc,
    },
  },
  /* render(args) {
    return (
      <Input
        style="input-primary"
        placeholder="example placeholder"
        name="hola"
        label="Example label"
        titleLabel="Example label"
        {...args}
      />
    );
  }, */
} as Meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  render: () => (
    <Input
      style="input-primary"
      placeholder="example placeholder"
      name="hola"
      label="Example label"
      titleLabel="Example label"
    />
  ),
};
