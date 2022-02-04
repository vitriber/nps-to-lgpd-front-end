import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import { Alert } from '@mui/material';
import api from '../../services/api';
import useToken from '../../services/useToken';

export const SignUp = (): JSX.Element => {
  const theme = createTheme();
  const history = useHistory();
  const [error, setError] = useState<string>();

  const { setToken, saveUser } = useToken();

  const [signupForm, setSignupForm] = useState({
    name: '',
    enterprise: '',
    mail: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    setTimeout(() => setError(''), 4000);
  }, [error]);

  const signupMeIn = () => {
    api
      .post('api/signup', signupForm)
      .then(response => {
        saveUser({
          id: response.data.id,
          email: response.data.email,
          is_admin: response.data.is_admin,
          name: response.data.name,
        });
        setToken(response.data.access_token);
        history.push('/');
      })
      .catch(err => {
        setError(err.response.data.message);
      });
    setSignupForm({
      name: '',
      enterprise: '',
      mail: '',
      phone: '',
      password: '',
    });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signupMeIn();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  required
                  fullWidth
                  name="name"
                  onChange={handleChangeText}
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="enterprise"
                  required
                  fullWidth
                  name="enterprise"
                  onChange={handleChangeText}
                  label="Empresa"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone"
                  required
                  fullWidth
                  name="phone"
                  onChange={handleChangeText}
                  label="Telefone"
                  autoFocus
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  required
                  fullWidth
                  name="email"
                  onChange={handleChangeText}
                  label="Email"
                  autoFocus
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  required
                  fullWidth
                  name="password"
                  onChange={handleChangeText}
                  label="Senha"
                  type="password"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Já possui uma conta? entre
                </Link>
              </Grid>
            </Grid>
            {error && (
              <Alert style={{ marginTop: 10 }} severity="error">
                {error}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
