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
import { Enteprise } from '../interfaces/EnterpriseInterface';
import { useStyles } from './styles';

export const ListEnterprise = (): JSX.Element => {
  const [enteprises, setEnterprises] = useState<Enteprise[]>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();

  const handleAddUser = () => {
    history.push('/empresa/cadastrar');
  };

  const handleEditUser = (id: number) => {
    history.push(`/empresa/editar/${id}`);
  };

  const handleGetUsers = async () => {
    const response = await api.get('api/user/enterprise/all');
    setEnterprises(response.data);
  };

  useEffect(() => {
    handleGetUsers();
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
              <Title>Empresas</Title>
              <Button variant="contained" onClick={handleAddUser}>
                Adicionar Empresa
              </Button>
            </div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>ID do Usuário</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enteprises &&
                  enteprises.map(enteprise => (
                    <TableRow key={enteprise.id}>
                      <TableCell>{enteprise.id}</TableCell>
                      <TableCell>{enteprise.name}</TableCell>
                      <TableCell>{enteprise.mail}</TableCell>
                      <TableCell>{enteprise.phone}</TableCell>
                      <TableCell>{enteprise.user_id}</TableCell>
                      <TableCell onClick={() => handleEditUser(enteprise.id)}>
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
            Tem certeza que deseja remover essa empresa?
          </Typography>
          <Button variant="contained">Remover</Button>
        </Box>
      </Modal>
    </Layout>
  );
};
