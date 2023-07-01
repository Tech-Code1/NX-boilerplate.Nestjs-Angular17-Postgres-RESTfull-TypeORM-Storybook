import { withNx } from 'qwik-nx/storybook';
import { mergeConfig, UserConfig } from 'vite';
import viteConfig from './../vite.config';

const config = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: { name: 'storybook-framework-qwik' },
  async viteFinal(config: UserConfig) {
    const updatedConfig = mergeConfig(config, viteConfig);
    return withNx(updatedConfig);
  },
};

export default config;
