import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import FindNPS from '../pages/FindNPS';
import RegisterEnterprise from '../pages/Register';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact/>
    <Route path="/encontrar-nps" component={FindNPS} />
    <Route path="/empresa/cadastrar" component={RegisterEnterprise} />
  </Switch>
);

export default Routes;