import React, { FC, ReactElement } from "react";
import Modal from "@mui/material/Modal";

type CommonModalProps = {
  children: ReactElement;
  open: boolean;
  handleClose?: () => void;
  unClosable?: boolean;
};

export const CommonModal: FC<CommonModalProps> = ({
  children,
  open,
  handleClose,
  unClosable,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      hideBackdrop={unClosable}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Modal>
  );
};
