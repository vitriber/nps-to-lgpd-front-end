import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from '../Title';

// Generate Order Data
function createData(id: number, date: string, name: string, nps: number) {
  return { id, date, name, nps };
}

const rows = [
  createData(0, '16 Mar, 2021', 'FIAT', 10.45),
  createData(1, '16 Mar, 2021', 'Riachuelo', 9.99),
  createData(2, '16 Ago, 2021', 'Ricardo Eletro', 2.81),
  createData(3, '16 Set, 2021', 'Casas Bahia', 4.39),
  createData(4, '15 Mar, 2021', 'Ponto Frio', 8.79),
];

function preventDefault(event: React.MouseEvent<HTMLElement>) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export const Orders = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Title>Avaliações Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Valor NPS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.nps}</TableCell>
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
