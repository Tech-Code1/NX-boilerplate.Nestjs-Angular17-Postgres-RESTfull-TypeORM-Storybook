import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Button } from '../../../components';
import doc from './button.doc.mdx';

export default {
  title: 'molecules/Button',
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

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <Button style="button-primary" color="t-white">
      Text example
    </Button>
  ),
};
