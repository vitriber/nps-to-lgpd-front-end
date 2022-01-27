import React from 'react';
import { NavBar } from '../NavBar';
import { useStyles } from './styles';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <NavBar />
      {children}
    </main>
  );
};
