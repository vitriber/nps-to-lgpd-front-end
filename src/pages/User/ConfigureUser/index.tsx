import {
  Alert,
  Button,
  Card,
  Container,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../../components/Layout';
import { ModalRegister } from '../../../components/ModalRegister';
import api from '../../../services/api';
import { ParamTypes } from '../../../utils/Interfaces/ParamTypes';
import { UserResponse } from '../interfaces/UserReponse';
import { useStyles } from './styles';

export const ConfigureUser = (): JSX.Element => {
  const [userValues, setUserValues] = useState<UserResponse>({
    name: '',
    mail: '',
    phone: '',
    password: '',
    is_admin: false,
  });
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<ParamTypes>();

  const classes = useStyles();

  const handleGetUser = async () => {
    try {
      const response = await api.get(`api/user/${id}`);
      setUserValues(response.data);
    } catch (err) {
      setError('Erro ao buscar usuário');
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    setTimeout(() => setError(''), 4000);
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const option = value === 'true';

    setUserValues({ ...userValues, [name]: option });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.patch(`api/user/${id}`, userValues);
      setShowModalRegister(true);
    } catch {
      setError('Erro ao atualizar usuário');
    }
  };

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Editar Pergunta
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
                      value={userValues.name}
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
                      value={userValues.phone}
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
                      value={userValues.mail}
                      required
                      fullWidth
                      id="mail"
                      label="E-Mail"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      autoComplete="fname"
                      name="password"
                      variant="outlined"
                      type="password"
                      value={userValues.password}
                      required
                      fullWidth
                      id="password"
                      label="Senha"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend">
                      <p>O usuário vai ser administrador?</p>
                    </FormLabel>
                    <RadioGroup
                      aria-label="is_admin"
                      name="is_admin"
                      value={userValues.is_admin}
                      onChange={handleChange}
                    >
                      <FormControlLabel value control={<Radio />} label="Sim" />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="Não"
                      />
                    </RadioGroup>
                  </Grid>

                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Cadastrar Usuário
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
            textModal="Usuário alterado com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};
