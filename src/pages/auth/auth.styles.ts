import { styled } from '@mui/material';

const authStyles = {
  form: { display: 'grid', gap: '4rem' },
};

export const SingleColumnGrid = styled('div')({ display: 'grid', gap: '1rem' });
export const SpacedButtonsContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
  justifyContent: 'space-between',
});

export default authStyles;
