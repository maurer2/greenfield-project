import { style } from '@vanilla-extract/css';

export const page = style({
  position: 'relative',
});

export const content = style({
  display: 'grid',
  inset: 0,
  placeContent: 'center',
  position: 'absolute',
});
