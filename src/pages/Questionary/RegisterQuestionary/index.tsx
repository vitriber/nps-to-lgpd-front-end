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
import { Question } from '../../Question/Interfaces/QuestionInterface';
import { Answer } from '../Interfaces/AnswerInterface';
import { QuestionaryResponse } from '../Interfaces/QuestionaryResponse';
import { useStyles } from './styles';

export const RegisterQuestionary = (): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>();
  const userId = localStorage.getItem('user_id');
  const [questionaryValues, setQuestionaryValues] =
    useState<QuestionaryResponse>({
      name_enterprise: '',
      nps_value: 0,
      answers: [],
    });
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const classes = useStyles();

  useEffect(() => {
    handleGetQuestions();
  }, []);

  useEffect(() => {
    setTimeout(() => setError(''), 4000);
  }, [error]);

  const handleGetQuestions = async () => {
    const response = await api.get('api/question/all');
    setQuestions(response.data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const number_value = value === 'true' ? 1 : 0;
    let updated_answers: Answer[] = [];

    const exist_answer = questionaryValues?.answers?.find(
      answer => answer.question_id === Number(name),
    );

    if (exist_answer) {
      updated_answers = questionaryValues?.answers?.map(answer => {
        if (answer.question_id === Number(name)) {
          return {
            ...answer,
            value: number_value,
          };
        }
        return answer;
      });
    } else {
      updated_answers = [
        ...questionaryValues.answers,
        {
          question_id: Number(name),
          value: number_value,
        },
      ];
    }
    setQuestionaryValues({ ...questionaryValues, answers: updated_answers });
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuestionaryValues({ ...questionaryValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!questionaryValues.name_enterprise) {
      setError('Digite um nome de empresa v??lido');
      return;
    }

    if (questionaryValues.answers.length !== questions?.length) {
      setError('Preencha todas as respostas');
      return;
    }

    if (!questionaryValues.nps_value) {
      setError('Digite um valor de NPS de 0 a 10');
      return;
    }

    try {
      const response = await api.post(`api/questionary`, {
        name_enterprise: questionaryValues.name_enterprise,
        nps_value: questionaryValues.nps_value,
        user_id: userId,
      });

      await api.post(
        `api/answer/${response.data[0][0]}`,
        questionaryValues.answers,
      );
      setShowModalRegister(true);
    } catch {
      setError('Erro ao cadastrar question??rio');
    }
  };

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Cadastrar Question??rio
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
                      value={questionaryValues.name_enterprise}
                      fullWidth
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
                          key={`${question.id}`}
                          name={`${question.id}`}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value
                            control={<Radio />}
                            label="Sim"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="N??o"
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
                      fullWidth
                      id="nps_value"
                      label="Valor do NPS: De 0 a 10."
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
                      Cadastrar Question??rio
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
            textModal="Question??rio cadastrado com sucesso!"
          />
        </Container>
      </main>
    </Layout>
  );
};
