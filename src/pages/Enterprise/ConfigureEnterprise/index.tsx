import {
  Alert,
  Button,
  Card,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { ModalRegister } from '../../../components/ModalRegister';
import api from '../../../services/api';
import { ParamTypes } from '../../../utils/Interfaces/ParamTypes';
import { EntepriseResponse } from '../interfaces/EntepriseReponse';
import { useStyles } from './styles';

export const ConfigureEnterprise = (): JSX.Element => {
  const [enterpriseValues, setEnterpriseValues] = useState<EntepriseResponse>({
    name: '',
    mail: '',
    phone: '',
  });
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<ParamTypes>();

  const classes = useStyles();

  const handleGetUser = async () => {
    try {
      const response = await api.get(`api/enterprise/${id}`);
      setEnterpriseValues(response.data);
    } catch (err) {
      setError('Erro ao buscar empresa');
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    setTimeout(() => setError(''), 4000);
  }, [error]);

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnterpriseValues({ ...enterpriseValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.patch(`api/enterprise/${id}`, enterpriseValues);
      setShowModalRegister(true);
    } catch {
      setError('Erro ao atualizar empresa');
    }
  };

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Editar Empresa
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Card className={classes.card}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      autoComplete="fname"
                      name="name"
                      variant="outlined"
                      required
                      value={enterpriseValues.name}
                      fullWidth
                      id="name"
                      label="Nome"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      required
                      fullWidth
                      value={enterpriseValues.phone}
                      id="phone"
                      type="tel"
                      label="Telefone"
                      name="phone"
                      autoComplete="phone"
                      onChange={handleChangeText}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      autoComplete="fname"
                      name="mail"
                      type="email"
                      variant="outlined"
                      value={enterpriseValues.mail}
                      required
                      fullWidth
                      id="mail"
                      label="E-Mail"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Editar Empresa
                    </Button>
                  </Grid>
                </Grid>
                {error && (
                  <Alert style={{ marginTop: 10 }} severity="error">
                    {error}
                  </Alert>
                )}
              </Card>
            </form>
          </div>
          <ModalRegister
            open={showModalRegister}
            handleClose={() => {
              setShowModalRegister(false);
            }}
            textModal="Empresa alterada com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};
