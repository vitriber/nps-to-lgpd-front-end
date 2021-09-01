import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from '@material-ui/core/Link';
import LayersIcon from '@material-ui/icons/Layers';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

export const mainListItems = (
  <div>
    <ListItem button component={Link} href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} href="/encontrar-nps">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Encontrar NPS" />
    </ListItem>
    <ListItem button component={Link} href="empresa/cadastrar">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Cadastrar" />
    </ListItem>
    <ListItem button component={Link} href="empresa/configurar">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Configurar" />
    </ListItem>
    <ListItem button component={Link} href="/configuracoes">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Configurações" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);
