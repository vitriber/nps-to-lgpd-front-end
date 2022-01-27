import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { PrivateRoute } from '../components/PrivateRoute';
import { ListQuestion } from '../pages/Question/ListQuestion';
import { RegisterQuestion } from '../pages/Question/RegisterQuestion';
import { Dashboard } from '../pages/Dashboard';
import { SignUp } from '../pages/SignUp';
import { EmptyPage } from '../pages/Empty';
import { RegisterEnterprise } from '../pages/Register';
import { FindNPS } from '../pages/FindNPS';
import { ConfigureQuestion } from '../pages/Question/ConfigureQuestion';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />
    <PrivateRoute path="/encontrar-nps" component={FindNPS} />
    <PrivateRoute
      path="/questionário/cadastrar"
      component={RegisterEnterprise}
    />
    <PrivateRoute path="/pergunta/configurar" component={ListQuestion} />
    <PrivateRoute path="/pergunta/cadastrar" component={RegisterQuestion} />
    <PrivateRoute path="/pergunta/editar/:id" component={ConfigureQuestion} />
    <PrivateRoute path="/" component={Dashboard} exact />
    <PrivateRoute path="/" component={EmptyPage} />
  </Switch>
);

export default Routes;
