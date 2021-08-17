import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useModalStore } from "states/modalState";
import "./Modal.scss";

const Modal = () => {
  const [modalStore] = useModalStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (modalStore.title) {
      setShowModal(true);
    }
  }, [modalStore]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDoAction = () => {
    if (modalStore.action) {
      modalStore.action();
    }
    handleClose();
  };

  const handleDoSecondaryAction = () => {
    if (modalStore.secondaryAction) {
      modalStore.secondaryAction();
    }
    handleClose();
  };

  return (
    <Dialog className="Modal" onClose={handleClose} open={showModal}>
      <Typography variant="h5">
        <IconButton
          aria-label="close"
          className="btn-close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        {modalStore.title}
      </Typography>
      {modalStore.subtitle && (
        <Typography variant="body1">{modalStore.subtitle}</Typography>
      )}
      <Button variant="contained" onClick={handleDoAction}>
        {modalStore.btnLabel}
      </Button>
      {modalStore.secondaryBtnLabel && (
        <Button variant="outlined" onClick={handleDoSecondaryAction}>
          {modalStore.secondaryBtnLabel}
        </Button>
      )}
    </Dialog>
  );
};

export { Modal };
