import { style } from '@vanilla-extract/css';

export const page = style({
  color: 'var(--foreground-rgb)',
  position: 'relative',
});

export const content = style({
  display: 'grid',
  inset: 0,
  placeContent: 'center',
  position: 'absolute',
});
