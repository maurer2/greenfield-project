import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'grid',
  gap: '2rem',
  gridTemplateColumns: 'min-content max-content max-content',
  listStyle: 'none',
  marginBottom: '2rem',
  marginTop: '1rem',
});
