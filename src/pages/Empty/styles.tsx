import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    height: '100vh',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
  },
}));
