import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Chart } from '../../components/Chart';
import { Copyright } from '../../components/Copyright';
import { LastNPS } from '../../components/LastNPS';
import { LastQuestionaries } from '../../components/LastQuestionnaires';
import { Layout } from '../../components/Layout';
import api from '../../services/api';
import { Questionary } from '../Questionary/Interfaces/QuestionaryInterface';
import { useStyles } from './styles';

export const Dashboard = (): JSX.Element => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [questionnaires, setQuestionnaires] = useState<Questionary[]>();
  const [lastQuestionary, setLastQuestionary] = useState<Questionary>();

  const handleGetQuestionnaires = async () => {
    const response = await api.get('api/questionary/all');
    setQuestionnaires(response.data);
  };

  useEffect(() => {
    handleGetQuestionnaires();
  }, []);

  useEffect(() => {
    if (questionnaires) {
      const last = questionnaires.reduce((a, b) => {
        return new Date(a.updated_at) > new Date(b.updated_at) ? a : b;
      });
      setLastQuestionary(last);
    }
  }, [questionnaires]);

  return (
    <Layout>
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart questionnaires={questionnaires} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <LastNPS questionary={lastQuestionary} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <LastQuestionaries questionnaires={questionnaires} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </Layout>
  );
};
