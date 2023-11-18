import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100%',
  background: 'var(--background-rgb)',
});

export const image = style({
  display: 'block',
  height: '100%',
  width: '100%',
});
