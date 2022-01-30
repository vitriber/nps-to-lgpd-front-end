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
import { Layout } from '../../../components/Layout';
import { ModalRegister } from '../../../components/ModalRegister';
import api from '../../../services/api';
import { useStyles } from './styles';

const initialQuestionValues = {
  name: '',
  constant_factor: '',
  description: '',
  is_multiple: false,
  description_question_1: '',
  description_question_2: '',
  description_question_3: '',
  description_question_4: '',
};

export const RegisterQuestion = (): JSX.Element => {
  const [questionValues, setQuestionValues] = useState(initialQuestionValues);
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [showMultipleQuestion, setShowMultipleQuestion] =
    useState<boolean>(false);
  const [error, setError] = useState<string>();

  const classes = useStyles();

  useEffect(() => {
    setQuestionValues(initialQuestionValues);
  }, []);

  useEffect(() => {
    setTimeout(() => setError(''), 4000);
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const option = value === 'true';
    setShowMultipleQuestion(option);

    setQuestionValues({ ...questionValues, [name]: option });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuestionValues({ ...questionValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post('api/question', questionValues);
      setQuestionValues(initialQuestionValues);
      setShowModalRegister(true);
    } catch {
      setError('Erro ao cadastrar pergunta');
    }
  };

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Cadastrar Pergunta
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
                      label="Identificador da Pergunta: Ex: Questão 1"
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
                      id="constant_factor"
                      label="Peso da Pergunta: Ex: 1,2, 1.5"
                      name="constant_factor"
                      autoComplete="constant_factor"
                      onChange={handleChangeText}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      autoComplete="fname"
                      name="description"
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      label="Descrição da Pergunta"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend">
                      <p>A pergunta é de múltipla escolha?</p>
                    </FormLabel>
                    <RadioGroup
                      aria-label="is_multiple"
                      name="is_multiple"
                      value={questionValues.is_multiple}
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
                  {showMultipleQuestion && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textField}
                          autoComplete="fname"
                          name="description_question_1"
                          variant="outlined"
                          required
                          fullWidth
                          id="description_question_1"
                          label="Descrição da primeira opção"
                          onChange={handleChangeText}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textField}
                          autoComplete="fname"
                          name="description_question_1"
                          variant="outlined"
                          required
                          fullWidth
                          id="description_question_1"
                          label="Descrição da segunda opção"
                          onChange={handleChangeText}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textField}
                          autoComplete="fname"
                          name="description_question_1"
                          variant="outlined"
                          required
                          fullWidth
                          id="description_question_1"
                          label="Descrição da terceira opção"
                          onChange={handleChangeText}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.textField}
                          autoComplete="fname"
                          name="description_question_1"
                          variant="outlined"
                          required
                          fullWidth
                          id="description_question_1"
                          label="Descrição da quarta opção"
                          onChange={handleChangeText}
                          autoFocus
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Cadastrar Pergunta
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
            textModal="Questão cadastrada com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};
