import { style } from '@vanilla-extract/css';

export const wrapper = style({
  background: ['var(--background-rgb)', 'rgb(from var(--background-rgb) r g b / 0.95)'], // fallback to solid colour, if browser does not support relative colours
  border: '2px solid var(--foreground-rgb)',
  display: 'grid',
  fontSize: '1rem',
  gap: '0.5rem 2rem',
  padding: '2rem',

  // eslint-disable-next-line perfectionist/sort-objects
  '@media': {
    'screen and (min-width: 480px)': {
      borderWidth: '4px',
      gridTemplateColumns: '7rem 7rem max-content',
      gridTemplateRows: 'max-content 1fr auto',
    },
  },
  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line
  '&:has([aria-invalid="true"])': {
    border: '2px solid var(--error-rgb)',
  },
});

export const output = style({
  gridColumn: '1/-1',
});
