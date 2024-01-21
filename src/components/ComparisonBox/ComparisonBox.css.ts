import { style } from '@vanilla-extract/css';

export const wrapper = style({
  background: 'var(--foreground-rgb)',
  color: 'var(--background-rgb)',
  padding: '2rem',
});

export const backLink = style({
  display: 'block',
});
