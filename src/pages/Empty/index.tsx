import { Container } from '@mui/material';
import React from 'react';
import { Layout } from '../../components/Layout';
import { useStyles } from './styles';

export const EmptyPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.content}>
        <Container className={classes.container}>
          <h1>Página em Construção</h1>
        </Container>
      </div>
    </Layout>
  );
};
