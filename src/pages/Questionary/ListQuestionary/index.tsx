import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DeleteOutline, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { Title } from '../../../components/Title';
import api from '../../../services/api';
import { Questionary } from '../Interfaces/QuestionaryInterface';
import { useStyles } from './styles';

export const ListQuestionary = (): JSX.Element => {
  const [questionnaires, setQuestionnaires] = useState<Questionary[]>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();

  const handleAddQuestionary = () => {
    history.push('/questionario/cadastrar');
  };

  const handleEditQuestionary = (id: number) => {
    history.push(`/questionario/editar/${id}`);
  };

  const handleGetQuestionnaires = async () => {
    const response = await api.get('api/questionary/all');
    setQuestionnaires(response.data);
  };

  useEffect(() => {
    handleGetQuestionnaires();
  }, []);

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <Paper className={classes.paper}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
            >
              <Title>Questionários</Title>
              <Button variant="contained" onClick={handleAddQuestionary}>
                Adicionar
              </Button>
            </div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nome Empresa</TableCell>
                  <TableCell>NPS</TableCell>
                  <TableCell>Data de Criação</TableCell>
                  <TableCell>Data de Edição</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionnaires &&
                  questionnaires.map(questionary => (
                    <TableRow key={questionary.id}>
                      <TableCell>{questionary.id}</TableCell>
                      <TableCell>{questionary.name_enterprise}</TableCell>
                      <TableCell>{questionary.nps_value}</TableCell>
                      <TableCell>{questionary.created_at}</TableCell>
                      <TableCell>{questionary.updated_at}</TableCell>
                      <TableCell
                        onClick={() => handleEditQuestionary(questionary.id)}
                      >
                        <Tooltip title="Editar">
                          <IconButton>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell onClick={() => setShowModalDelete(true)}>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteOutline />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </main>
      <Modal
        open={showModalDelete}
        onClose={() => setShowModalDelete(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tem certeza que deseja remover esse questionario?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ao remover você concorda que pode haver inconsistências no NPS
          </Typography>
          <Button variant="contained">Remover</Button>
        </Box>
      </Modal>
    </Layout>
  );
};
