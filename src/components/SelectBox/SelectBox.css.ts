import { style, styleVariants } from '@vanilla-extract/css';

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

const selectBase = style({
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

export const select = styleVariants({
  default: [selectBase, { background: 'var(--foreground-rgb)' }],
  invalid: [
    selectBase,
    {
      background: 'var(--error-rgb)',
      color: 'var(--foreground-rgb)',
    },
  ],
});

export const errors = style({
  gridColumnStart: 2,

  // eslint-disable-next-line perfectionist/sort-objects
  '@media': {
    'screen and (min-width: 480px)': {
      gridRowEnd: 3,
      gridRowStart: 3,
    },
  },
});
