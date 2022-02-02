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
import { Layout } from '../../../components/Layout';
import { ModalRegister } from '../../../components/ModalRegister';
import api from '../../../services/api';
import { useStyles } from './styles';

const initialEnterpriseValues = {
  name: '',
  mail: '',
  phone: '',
};

export const RegisterEnterprise = (): JSX.Element => {
  const [enterpriseValues, setEnterpriseValues] = useState(
    initialEnterpriseValues,
  );
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const classes = useStyles();

  useEffect(() => {
    setEnterpriseValues(initialEnterpriseValues);
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
      await api.post('api/enterprise', enterpriseValues);
      setEnterpriseValues(initialEnterpriseValues);
      setShowModalRegister(true);
    } catch {
      setError('Erro ao cadastrar empresa');
    }
  };

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Cadastrar Empresa
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
                      Cadastrar Empresa
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
            textModal="Empresa cadastrada com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};
