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
import { QuestionResponse } from '../Interfaces/QuestionReponseInterface';
import { useStyles } from './styles';

export const ConfigureQuestion = (): JSX.Element => {
  const [questionValues, setQuestionValues] = useState<QuestionResponse>({
    name: '',
    constant_factor: '',
    description: '',
    is_multiple: false,
    description_question_1: '',
    description_question_2: '',
    description_question_3: '',
    description_question_4: '',
  });
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [showMultipleQuestion, setShowMultipleQuestion] =
    useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<ParamTypes>();

  const classes = useStyles();

  const handleGetQuestion = async () => {
    try {
      const response = await api.get(`api/question/${id}`);
      setQuestionValues(response.data);
    } catch (err) {
      setError('Erro ao buscar pergunta');
    }
  };

  useEffect(() => {
    handleGetQuestion();
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
      await api.patch(`api/question/${id}`, questionValues);
      setShowModalRegister(true);
    } catch {
      setError('Erro ao atualizar pergunta');
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
                      fullWidth
                      id="name"
                      value={questionValues?.name}
                      label="Identificador da Pergunta: Ex: Quest??o 1"
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
                      value={questionValues?.constant_factor}
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
                      value={questionValues?.description}
                      required
                      fullWidth
                      id="description"
                      label="Descri????o da Pergunta"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel component="legend">
                      <p>A pergunta ?? de m??ltipla escolha?</p>
                    </FormLabel>
                    <RadioGroup
                      aria-label="is_multiple"
                      name="is_multiple"
                      value={questionValues?.is_multiple}
                      onChange={handleChange}
                    >
                      <FormControlLabel value control={<Radio />} label="Sim" />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="N??o"
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
                          label="Descri????o da primeira op????o"
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
                          label="Descri????o da segunda op????o"
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
                          label="Descri????o da terceira op????o"
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
                          label="Descri????o da quarta op????o"
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
                      Editar Pergunta
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
            textModal="Quest??o editada com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};
