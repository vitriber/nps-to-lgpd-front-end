import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Fade } from '../Fade';
import { useStyles } from './styles';

interface Props {
  handleClose: () => void;
  open: boolean;
  textModal: string;
}

export const ModalRegister = ({
  open,
  handleClose,
  textModal,
}: Props): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

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
          <h2 id="spring-modal-title">{textModal}</h2>
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
