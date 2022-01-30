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
import { Question } from '../../Question/Interfaces/QuestionInterface';
import { Answer } from '../Interfaces/AnswerInterface';
import { QuestionaryResponse } from '../Interfaces/QuestionaryResponse';
import { useStyles } from './styles';

export const ConfigureQuestionary = (): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>();
  const [answers, setAnswers] = useState<Answer[]>();
  const [questionaryValues, setQuestionaryValues] =
    useState<QuestionaryResponse>();
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);

  const [error, setError] = useState<string>();
  const { id } = useParams<ParamTypes>();

  const classes = useStyles();

  const handleGetQuestionary = async () => {
    try {
      const response = await api.get(`api/questionary/${id}`);
      setQuestionaryValues(response.data);
    } catch (err) {
      setError('Erro ao buscar questionário');
    }
  };

  const handleGetQuestions = async () => {
    const response = await api.get('api/question/all');
    setQuestions(response.data);
  };

  const handleGetAnswers = async () => {
    const response = await api.get(`api/answer/all/${id}`);
    setAnswers(response.data);
  };

  useEffect(() => {
    handleGetQuestionary();
    handleGetQuestions();
    handleGetAnswers();
  }, []);

  useEffect(() => {
    setTimeout(() => setError(''), 4000);
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const option = value === 'true';
    setQuestionaryValues({ ...questionaryValues, [name]: option });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuestionaryValues({ ...questionaryValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.patch(`api/questionary/${id}`, questionaryValues);
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
              Editar Questionário
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Card className={classes.card}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      autoComplete="fname"
                      name="name_enterprise"
                      variant="outlined"
                      required
                      fullWidth
                      value={questionaryValues?.name_enterprise}
                      id="name_enterprise"
                      label="Nome da empresa"
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </Grid>

                  {questions &&
                    questions.map(question => (
                      <Grid item xs={12}>
                        <FormLabel component="legend">
                          <p>{question.description}</p>
                        </FormLabel>
                        <RadioGroup
                          aria-label="is_multiple"
                          name={`${question.id}`}
                          onChange={handleChange}
                          value={
                            answers?.find(
                              answer =>
                                answer.question_id === question.id.toString(),
                            )?.value
                          }
                        >
                          <FormControlLabel
                            value
                            control={<Radio />}
                            label="Sim"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="Não"
                          />
                        </RadioGroup>
                      </Grid>
                    ))}

                  <Grid item xs={12}>
                    <TextField
                      className={classes.textField}
                      autoComplete="fname"
                      name="nps_value"
                      variant="outlined"
                      required
                      value={questionaryValues?.nps_value}
                      fullWidth
                      id="nps_value"
                      label="Valor do NPS"
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
                      Cadastrar Questionário
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
            textModal="Questão editada com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};