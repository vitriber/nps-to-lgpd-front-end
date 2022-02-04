import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export const Title = ({ children }: Props): JSX.Element => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
};
