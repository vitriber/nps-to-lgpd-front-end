import { Collapse, List } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandLess, ExpandMore, QuestionAnswer, AddCircle, Edit, Apartment, Person } from '@material-ui/icons';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import React from 'react';

export default function MainListItems() {
  const [openMenuQuestion, setOpenMenuQuestion] = React.useState(false);
  const [openMenuDataBase, setOpenMenuDataBase] = React.useState(false);
  const [openMenuEnterprise, setOpenMenuEnterprise] = React.useState(false);
  const [openMenuUser, setOpenMenuUser] = React.useState(false);

  const handleClickOpenMenuQuestion = () => {
    setOpenMenuQuestion(!openMenuQuestion);
  };


  const handleClickOpenMenuDataBase = () => {
    setOpenMenuDataBase(!openMenuDataBase);
  };


  const handleClickOpenMenuEnterprise = () => {
    setOpenMenuEnterprise(!openMenuEnterprise);
  };


  const handleClickOpenMenuUser = () => {
    setOpenMenuUser(!openMenuUser);
  };

  return (
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
      <ListItem button component={Link} href="/relatorios">
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
      </ListItem>

      <ListItem button onClick={handleClickOpenMenuQuestion}>
        <ListItemIcon>
          <QuestionAnswer />
        </ListItemIcon>
        <ListItemText primary="Perguntas" />
        {openMenuQuestion ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMenuQuestion} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link} href="pergunta/configurar"
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Configurar" />
          </ListItem>
          <ListItem
            button
            component={Link} href="pergunta/cadastrar"
          >
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Cadastrar" />
          </ListItem>
        </List>
      </Collapse>



      <ListItem button onClick={handleClickOpenMenuDataBase}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Base de Dados" />
        {openMenuDataBase ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMenuDataBase} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link} href="base-de-dados/configurar"
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Configurar" />
          </ListItem>
          <ListItem
            button
            component={Link} href="base-de-dados/cadastrar"
          >
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Cadastrar Reposta" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickOpenMenuEnterprise}>
        <ListItemIcon>
          <Apartment />
        </ListItemIcon>
        <ListItemText primary="Empresas" />
        {openMenuEnterprise ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMenuEnterprise} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link} href="empresa/configurar"
          >
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Nova Empresa" />
          </ListItem>
          <ListItem
            button
            component={Link} href="empresa/cadastrar"
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Lista de Empresas" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickOpenMenuUser}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
        {openMenuUser ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMenuUser} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            component={Link} href="usuario/configurar"
          >
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Novo Usuário" />
          </ListItem>
          <ListItem
            button
            component={Link} href="usuario/cadastrar"
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Lista de Usuários" />
          </ListItem>
        </List>
      </Collapse>
      
    </div>
  )
};

export const secondaryListItems = (
  <div>
  </div>
);
