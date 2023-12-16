import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'grid',
  inset: 0,
  placeContent: 'center',
  position: 'absolute',
});

export const wrapper = style({
  background: ['var(--background-rgb)', 'rgb(from var(--background-rgb) r g b / 0.95)'], // fallback to solid colour, if browser does not support relative colours
  border: '4px solid var(--foreground-rgb)',
  display: 'grid',
  fontSize: '1rem',
  gap: '0.5rem 2rem',
  gridTemplateColumns: '7.5rem 7.5rem max-content',
  gridTemplateRows: 'max-content 1fr auto',
  padding: '2rem',
});
