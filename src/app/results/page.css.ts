import { style } from '@vanilla-extract/css';

export const page = style({
  color: 'var(--background-rgb)',
  position: 'relative',
});

export const content = style({
  background: 'var(--foreground-rgb)',
  display: 'grid',
  inset: 0,
  placeContent: 'center',
  position: 'absolute',
});
