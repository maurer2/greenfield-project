import { style } from '@vanilla-extract/css';

export const fieldWrapper = style({
  display: 'contents',
});

export const label = style({
  gridRowEnd: 1,
  gridRowStart: 1,
});

export const input = style({
  border: 0,
  fontSize: '1rem',
  gridRowEnd: 2,
  gridRowStart: 2,
  padding: '0.5rem',
});

export const errors = style({
  gridRowEnd: 3,
  gridRowStart: 3,
});
