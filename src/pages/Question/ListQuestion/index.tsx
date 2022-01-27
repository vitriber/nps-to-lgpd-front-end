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
import Title from '../../../components/Title';
import api from '../../../services/api';
import { Question } from '../Interfaces/QuestionInterface';
import { useStyles } from './styles';

export const ListQuestion = () => {
  const [questions, setQuestions] = useState<Question[]>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();

  const handleAddQuestion = () => {
    history.push('/pergunta/cadastrar');
  };

  const handleEditQuestion = (id: number) => {
    history.push(`/pergunta/editar/${id}`);
  };

  const handleGetQuestions = async () => {
    const response = await api.get('api/question/todos');
    setQuestions(response.data);
  };

  useEffect(() => {
    handleGetQuestions();
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
              <Title>Questões</Title>
              <Button variant="contained" onClick={handleAddQuestion}>
                Adicionar Pergunta
              </Button>
            </div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Pergunta</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Fator Constante</TableCell>
                  <TableCell> Data de Criação</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions &&
                  questions.map(question => (
                    <TableRow key={question.id}>
                      <TableCell>{question.id}</TableCell>
                      <TableCell>{question.name}</TableCell>
                      <TableCell>{question.description}</TableCell>
                      <TableCell>{question.constant_factor}</TableCell>
                      <TableCell>{question.created_at}</TableCell>
                      <TableCell
                        onClick={() => handleEditQuestion(question.id)}
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
            Tem certeza que deseja remover essa pergunta?
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
