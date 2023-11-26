import { style } from '@vanilla-extract/css';

export const page = style({
  position: 'relative',
  color: 'var(--background-rgb)',
});

export const content = style({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeContent: 'center',
  background: 'var(--foreground-rgb)',
})