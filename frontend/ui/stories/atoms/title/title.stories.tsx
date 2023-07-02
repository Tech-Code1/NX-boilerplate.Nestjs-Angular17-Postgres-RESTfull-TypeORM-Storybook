import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { Title } from '../../../components';
import doc from './title.doc.mdx';

export default {
  title: 'atoms/Title',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: doc,
    },
  },
} as Meta;

type Story = StoryObj<typeof Title>;

export const Title2xl: Story = {
  render: () => <Title style="title-2xl">Title example</Title>,
};
