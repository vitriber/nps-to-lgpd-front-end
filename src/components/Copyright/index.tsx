import React from 'react';
import { Link, Typography } from '@mui/material';

export const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Todos os diretos reservados
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};
