import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function EmptyPage() {
  const classes = useStyles();

  return (
      <main className={classes.content}>
         <Typography>
             Página em Construção
         </Typography>
      </main>
  );
}