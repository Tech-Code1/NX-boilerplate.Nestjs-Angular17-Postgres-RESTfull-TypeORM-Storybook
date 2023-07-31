import '!style-loader!css-loader!sass-loader!./styles.scss';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

// ? Use in case you want to use a more complete documentation
/* const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview; */
