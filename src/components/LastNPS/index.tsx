import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Questionary } from '../../pages/Questionary/Interfaces/QuestionaryInterface';
import { Title } from '../Title';
import { useStyles } from './styles';

interface Props {
  questionary: Questionary | undefined;
}

export const LastNPS = ({ questionary }: Props): JSX.Element => {
  const classes = useStyles();

  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Title>NPS Recentes</Title>
      <Typography component="p" variant="h4">
        {questionary?.nps_value}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {questionary?.updated_at}
      </Typography>
      <div>
        <Link color="primary" href="/relatório" onClick={preventDefault}>
          Ver mais
        </Link>
      </div>
    </>
  );
};
