import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { Dashboard } from '../pages/Dashboard';
import { EmptyPage } from '../pages/Empty';
import { ConfigureEnterprise } from '../pages/Enterprise/ConfigureEnterprise';
import { ListEnterprise } from '../pages/Enterprise/ListEnterprise';
import { RegisterEnterprise } from '../pages/Enterprise/RegisterEnterprise';
import { FindNps } from '../pages/FindNPS';
import { ConfigureQuestion } from '../pages/Question/ConfigureQuestion';
import { ListQuestion } from '../pages/Question/ListQuestion';
import { RegisterQuestion } from '../pages/Question/RegisterQuestion';
import { ConfigureQuestionary } from '../pages/Questionary/ConfigureQuestionary';
import { ListQuestionary } from '../pages/Questionary/ListQuestionary';
import { RegisterQuestionary } from '../pages/Questionary/RegisterQuestionary';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { ConfigureUser } from '../pages/User/ConfigureUser';
import { ListUser } from '../pages/User/ListUser';
import { RegisterUser } from '../pages/User/RegisterUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={SignIn} />
    <Route path="/cadastrar" component={SignUp} />
    <PrivateRoute path="/encontrar-nps" component={FindNps} />

    <PrivateRoute path="/pergunta/configurar" component={ListQuestion} />
    <PrivateRoute path="/pergunta/cadastrar" component={RegisterQuestion} />
    <PrivateRoute path="/pergunta/editar/:id" component={ConfigureQuestion} />

    <PrivateRoute path="/questionario/configurar" component={ListQuestionary} />
    <PrivateRoute
      path="/questionario/cadastrar"
      component={RegisterQuestionary}
    />
    <PrivateRoute
      path="/questionario/editar/:id"
      component={ConfigureQuestionary}
    />

    <PrivateRoute path="/usuario/configurar" component={ListUser} />
    <PrivateRoute path="/usuario/cadastrar" component={RegisterUser} />
    <PrivateRoute path="/usuario/editar/:id" component={ConfigureUser} />

    <PrivateRoute path="/empresa/configurar" component={ListEnterprise} />
    <PrivateRoute path="/empresa/cadastrar" component={RegisterEnterprise} />
    <PrivateRoute path="/empresa/editar/:id" component={ConfigureEnterprise} />

    <PrivateRoute path="/" component={Dashboard} exact />
    <PrivateRoute path="/" component={EmptyPage} />
  </Switch>
);

export default Routes;
