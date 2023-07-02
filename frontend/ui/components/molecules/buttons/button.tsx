import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { Title } from '../../atoms/title/title';
import { ButtonType } from './button.interface';
import styles from './button.scss?inline';

const getStyles = (...args: string[]) =>
  ['button', ...args].filter(Boolean).join(' ');

const getStylesTitle = (...args: string[]) =>
  [...args].filter(Boolean).join(' ');

export const Button = component$<ButtonType>((buttonProps) => {
  useStyles$(styles);

  const {
    type = 'button',
    disabled = false,
    style,
    events = {},
    color = 't-black',
  } = buttonProps;
  const buttonFontStyles = getStylesTitle('title-base', color);

  return (
    <button
      type={type}
      class={getStyles(style)}
      disabled={disabled}
      {...events}
    >
      <Title style={buttonFontStyles}>
        <Slot />
      </Title>
    </button>
  );
});
