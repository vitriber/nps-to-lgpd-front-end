import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Fade } from '../Fade';
import { useStyles } from './styles';

interface Props {
  handleClose: () => void;
  open: boolean;
  npsValue: string;
}

export const ModalNPS = ({
  open,
  handleClose,
  npsValue,
}: Props): JSX.Element => {
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
          <h2 id="spring-modal-description">
            {parseFloat(npsValue).toFixed(2)}
          </h2>
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
};
