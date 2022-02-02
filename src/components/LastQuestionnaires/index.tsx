import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { Questionary } from '../../pages/Questionary/Interfaces/QuestionaryInterface';
import api from '../../services/api';
import { Title } from '../Title';
import { useStyles } from './styles';

export const LastQuestionaries = (): JSX.Element => {
  const classes = useStyles();
  const [questionnaires, setQuestionnaires] = useState<Questionary[]>();

  const preventDefault = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleGetQuestionnaires = async () => {
    const response = await api.get('api/questionary/all');
    setQuestionnaires(response.data);
  };

  useEffect(() => {
    handleGetQuestionnaires();
  }, []);

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
