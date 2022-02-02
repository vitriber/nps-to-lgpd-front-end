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
import { Layout } from '../../components/Layout';
import { ModalNPS } from '../../components/ModalNPS';
import api from '../../services/api';
import { Question } from '../Question/Interfaces/QuestionInterface';
import { Answer } from '../Questionary/Interfaces/AnswerInterface';
import { QuestionaryResponse } from '../Questionary/Interfaces/QuestionaryResponse';
import { useStyles } from './style';

export const FindNps = (): JSX.Element => {
  const [questions, setQuestions] = useState<Question[]>();
  const [questionaryValues, setQuestionaryValues] =
    useState<QuestionaryResponse>({
      name_enterprise: '',
      nps_value: 0,
      answers: [],
    });
  const [showModalNPS, setShowModalNPS] = useState<boolean>(false);
  const [npsValue, setNpsValue] = useState('');
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
      setError('Digite um nome de empresa válido');
      return;
    }

    if (questionaryValues.answers.length !== questions?.length) {
      setError('Preencha todas as respostas');
      return;
    }

    try {
      const response = await api.post(
        `api/find-nps`,
        questionaryValues.answers,
      );
      const NPSValue = response.data.nps;
      setNpsValue(NPSValue > 0 ? NPSValue : 0);
      setShowModalNPS(true);
    } catch {
      setError('Erro ao calcular NPS');
    }
  };

  return (
    <Layout>
      <main className={classes.content}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" color="primary">
              Encontre o NPS da sua empresa
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
                      error={!!questionaryValues.name_enterprise}
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
                            label="Não"
                          />
                        </RadioGroup>
                      </Grid>
                    ))}
                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Calcular NPS
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
          <ModalNPS
            open={showModalNPS}
            handleClose={() => {
              setShowModalNPS(false);
            }}
            npsValue={npsValue}
          />
        </Container>
      </main>
    </Layout>
  );
};
