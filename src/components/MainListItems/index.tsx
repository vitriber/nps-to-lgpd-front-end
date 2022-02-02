import React from 'react';
import {
  Collapse,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  QuestionAnswer,
  AddCircle,
  Edit,
  Apartment,
  Person,
} from '@material-ui/icons';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';

export const MainListItems = (): JSX.Element => {
  const [openMenuQuestion, setOpenMenuQuestion] = React.useState(false);
  const [openMenuDataBase, setOpenMenuDataBase] = React.useState(false);
  const [openMenuEnterprise, setOpenMenuEnterprise] = React.useState(false);
  const [openMenuUser, setOpenMenuUser] = React.useState(false);

  const isAdmin = localStorage.getItem('user_is_admin') === 'true';

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

      {isAdmin && (
        <>
          <ListItem button onClick={handleClickOpenMenuQuestion}>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary="Perguntas" />
            {openMenuQuestion ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenuQuestion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ paddingLeft: 10 }}>
              <ListItem button component={Link} href="/pergunta/configurar">
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Configurar" />
              </ListItem>
              <ListItem button component={Link} href="/pergunta/cadastrar">
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
            <ListItemText primary="Questionários" />
            {openMenuDataBase ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMenuDataBase} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ paddingLeft: 10 }}>
              <ListItem button component={Link} href="/questionario/configurar">
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Configurar" />
              </ListItem>
              <ListItem button component={Link} href="/questionario/cadastrar">
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Cadastrar" />
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
            <List component="div" disablePadding style={{ paddingLeft: 10 }}>
              <ListItem button component={Link} href="/usuario/configurar">
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Configurar" />
              </ListItem>
              <ListItem button component={Link} href="/usuario/cadastrar">
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Cadastrar" />
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
            <List component="div" disablePadding style={{ paddingLeft: 10 }}>
              <ListItem button component={Link} href="/empresa/configurar">
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Configurar" />
              </ListItem>
              <ListItem button component={Link} href="/empresa/cadastrar">
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Cadastrar" />
              </ListItem>
            </List>
          </Collapse>
        </>
      )}
    </div>
  );
};

export const secondaryListItems = <div />;
