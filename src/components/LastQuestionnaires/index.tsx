import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Questionary } from '../../pages/Questionary/Interfaces/QuestionaryInterface';
import { Title } from '../Title';
import { useStyles } from './styles';

interface Props {
  questionnaires: Questionary[] | undefined;
}

export const LastQuestionaries = ({ questionnaires }: Props): JSX.Element => {
  const classes = useStyles();

  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Title>Avaliações Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome Empresa</TableCell>
            <TableCell>NPS</TableCell>
            <TableCell>Última Atualização</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionnaires &&
            questionnaires.map(questionary => (
              <TableRow key={questionary.id}>
                <TableCell>{questionary.name_enterprise}</TableCell>
                <TableCell>{questionary.nps_value}</TableCell>
                <TableCell>{questionary.updated_at}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="/relatorios" onClick={preventDefault}>
          Veja mais avaliações
        </Link>
      </div>
    </>
  );
};
