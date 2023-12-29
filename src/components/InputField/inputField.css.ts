import { style } from '@vanilla-extract/css';

export const fieldWrapper = style({
  display: 'contents',
});

export const label = style({
  '@media': {
    'screen and (min-width: 480px)': {
      gridRowEnd: 1,
      gridRowStart: 1,
    },
  },
});

export const input = style({
  border: 0,
  fontSize: '1rem',
  padding: '0.5rem',

  // eslint-disable-next-line perfectionist/sort-objects
  '@media': {
    'screen and (min-width: 480px)': {
      gridRowEnd: 2,
      gridRowStart: 2,
    },
  },
});

export const errors = style({
  gridColumnStart: 1,

  // eslint-disable-next-line perfectionist/sort-objects
  '@media': {
    'screen and (min-width: 480px)': {
      gridRowEnd: 3,
      gridRowStart: 3,
    },
  },
});
