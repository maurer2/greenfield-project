import { style } from '@vanilla-extract/css';

export const fieldWrapper = style({
  display: 'contents',
});

export const label = style({
  gridRowStart: 1,
  gridRowEnd: 1,
});

export const select = style({
  gridRowStart: 2,
  gridRowEnd: 2,
  padding: '0.5rem',
  fontSize: '1rem',
});

export const errors = style({
  gridRowStart: 3,
  gridRowEnd: 3,
})
