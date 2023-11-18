import { style } from '@vanilla-extract/css';

export const form = style({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeContent: 'center'
});

export const fieldset = style({
  display: 'grid',
  padding: '2rem',
  gridTemplateColumns: 'max-content 1fr 1fr',
  gap: '1rem',
  border: 0,
  background: 'var(--foreground-rgb)'
});