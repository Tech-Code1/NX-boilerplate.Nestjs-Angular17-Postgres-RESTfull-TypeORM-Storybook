/* const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (storybookBaseConfig) => {
  storybookBaseConfig.cache = {
    type: 'filesystem',
    cacheDirectory: path.resolve(
      __dirname,
      '../../node_modules/.cache/frontend/ui'
    ),
  };

  storybookBaseConfig.resolve.plugins = [
    new TsconfigPathsPlugin({ configFile: '../../tsconfig.json' }),
  ];

  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { importLoaders: 1 },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: [require('tailwindcss'), require('autoprefixer')],
          },
        },
      },
      'sass-loader',
    ],
  });

  return storybookBaseConfig;
};
 */
