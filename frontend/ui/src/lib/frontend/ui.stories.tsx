import type { Meta } from 'storybook-framework-qwik';
import { Ui } from './ui';
import doc from './ui.doc.mdx';

export default {
  title: 'Ui',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: doc,
    },
  },
  argTypes: {
    // put component params here
  },
  render(args) {
    return <Ui {...args} />;
  },
} as Meta;

export const Primary = {};
