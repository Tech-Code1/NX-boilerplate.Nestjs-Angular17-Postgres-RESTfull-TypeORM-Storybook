import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';
import { Ui } from './ui';

test(`[Ui Component]: Should render`, async () => {
  const { screen, render } = await createDOM();
  await render(<Ui />);
  expect(screen.innerHTML).toContain('Ui works!');
});
