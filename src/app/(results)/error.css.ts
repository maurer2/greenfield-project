import { style } from '@vanilla-extract/css';

export const wrapper = style({
  background: 'var(--foreground-rgb)',
  color: 'var(--background-rgb)',
  padding: '2rem',
});

export const body = style({
  margin: '2rem 0',
});

export const backLink = style({
  display: 'block',
});
