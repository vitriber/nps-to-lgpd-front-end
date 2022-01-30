import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Dashboard } from '../pages/Dashboard';
import { EmptyPage } from '../pages/Empty';
import { FindNPS } from '../pages/FindNPS';
import { ConfigureQuestion } from '../pages/Question/ConfigureQuestion';
import { ListQuestion } from '../pages/Question/ListQuestion';
import { RegisterQuestion } from '../pages/Question/RegisterQuestion';
import { ConfigureQuestionary } from '../pages/Questionary/ConfigureQuestionary';
import { ListQuestionary } from '../pages/Questionary/ListQuestionary';
import { RegisterQuestionary } from '../pages/Questionary/RegisterQuestionary';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ListUser } from '../pages/User/ListUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />
    <PrivateRoute path="/encontrar-nps" component={FindNPS} />

    <PrivateRoute path="/questionario/configurar" component={ListQuestionary} />
    <PrivateRoute
      path="/questionario/cadastrar"
      component={RegisterQuestionary}
    />
    <PrivateRoute
      path="/questionario/editar/:id"
      component={ConfigureQuestionary}
    />

    <PrivateRoute path="/pergunta/configurar" component={ListQuestion} />
    <PrivateRoute path="/pergunta/cadastrar" component={RegisterQuestion} />
    <PrivateRoute path="/pergunta/editar/:id" component={ConfigureQuestion} />

    <PrivateRoute path="/usuario/configurar" component={ListUser} />

    <PrivateRoute path="/" component={Dashboard} exact />
    <PrivateRoute path="/" component={EmptyPage} />
  </Switch>
);

export default Routes;
