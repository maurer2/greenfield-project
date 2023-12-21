import { style } from '@vanilla-extract/css';

export const submitButton = style({
  appearance: 'button',
  background: 'var(--foreground-rgb)',
  border: 0,
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.5rem',

  // eslint-disable-next-line perfectionist/sort-objects
  '@media': {
    'screen and (min-width: 480px)': {
      gridRow: '1/span 2',
    },
  },
});
