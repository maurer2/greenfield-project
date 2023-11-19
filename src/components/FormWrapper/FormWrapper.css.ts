import { style } from '@vanilla-extract/css';

export const form = style({
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeContent: 'center'
});

export const wrapper = style({
  display: 'grid',
  padding: '2rem',
  gridTemplateColumns: '7.5rem 7.5rem max-content',
  gridTemplateRows: 'max-content 1fr auto',
  gap: '0.5rem 2rem',
  border: '4px solid var(--foreground-rgb)',
  background: ['var(--background-rgb)', 'rgb(from var(--background-rgb) r g b / 0.95)'], // fallback to solid colour, if browser does not support relative colours
  fontSize: '1rem'
});

export const submitButton = style({
  gridRow: '1/span 2',
  padding: '0.5rem',
  fontSize: '1rem',
  background: 'var(--foreground-rgb)',
  cursor: 'pointer',
  appearance: 'button',
  border: 0,
});