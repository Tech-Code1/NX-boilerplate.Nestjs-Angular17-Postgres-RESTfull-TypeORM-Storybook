import type { LabelType } from './label.interface';
import './label.scss';

const getStyles = (...args: string[]) =>
  ['label', ...args].filter(Boolean).join(' ');

export const Label = ({ children, label, style }: LabelType) => {
  return (
    <label for={label} class={getStyles(style)}>
      {children}
    </label>
  );
};
