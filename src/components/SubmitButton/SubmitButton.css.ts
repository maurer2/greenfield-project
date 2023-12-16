import { style } from '@vanilla-extract/css';

export const submitButton = style({
  appearance: 'button',
  background: 'var(--foreground-rgb)',
  border: 0,
  cursor: 'pointer',
  fontSize: '1rem',
  gridRow: '1/span 2',
  padding: '0.5rem',
});
