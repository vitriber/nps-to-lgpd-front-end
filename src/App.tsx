import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './routes';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        {window.location.pathname !== '/login' && window.location.pathname !== '/signup' && <NavBar />}
        <Routes />
      </div>
    </Router>
  );
};

export default App;

