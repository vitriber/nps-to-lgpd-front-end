import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import MoodIcon from '@material-ui/icons/Mood';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '15px',
    },
  }),
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

interface ModalNPSProps {
  handleClose: () => void;
  open: boolean;
  npsValue: string;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref,
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function ModalNPS({
  open,
  handleClose,
  npsValue,
}: ModalNPSProps) {
  const classes = useStyles();

  const history = useHistory();
  const feeling = Number(npsValue) > 7;

  const handleOnClick = () => {
    history.push('/');
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="spring-modal-title">Seu valor de NPS é:</h2>
          <h2 id="spring-modal-description">{npsValue}</h2>
          <div className={classes.content}>
            {feeling ? (
              <MoodIcon style={{ color: 'green' }} fontSize="large" />
            ) : (
              <SentimentVeryDissatisfiedIcon
                style={{ color: 'red' }}
                fontSize="large"
              />
            )}
          </div>

          <Button
            onClick={handleOnClick}
            color="primary"
            fullWidth
            variant="contained"
          >
            Voltar
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}
