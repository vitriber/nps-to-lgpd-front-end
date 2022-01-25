import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListQuestion from '../pages/ListQuestion';

import Dashboard from '../pages/Dashboard';
import FindNPS from '../pages/FindNPS';
import RegisterEnterprise from '../pages/Register';
import RegisterQuestion from '../pages/RegisterQuestion';
import EmptyPage from '../pages/Empty';
import SignUp from '../pages/SignUp';
import { Login } from '../pages/Login';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/encontrar-nps" component={FindNPS} />
    <Route path="/questionario/cadastrar" component={RegisterEnterprise} />
    <Route path="/pergunta/configurar" component={ListQuestion} />
    <Route path="/pergunta/cadastrar" component={RegisterQuestion} />
    <Route path="/" component={Dashboard} exact/>
    <Route path="/" component={EmptyPage}/>
  </Switch>
);

export default Routes;