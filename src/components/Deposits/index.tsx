import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Title } from '../Title';

function preventDefault(event: React.MouseEvent<HTMLElement>) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export const Deposits = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Title>NPS Recentes</Title>
      <Typography component="p" variant="h4">
        9.47
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        em 15 de Março, 2021
      </Typography>
      <div>
        <Link color="primary" href="/relatório" onClick={preventDefault}>
          Ver mais
        </Link>
      </div>
    </>
  );
};
