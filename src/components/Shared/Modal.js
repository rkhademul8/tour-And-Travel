import { Box } from "@mui/material";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import LoginPage from "../Login/LoginPage";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const Modal = () => {
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose} className="custom-modal">
      <Box className="modalStyle">{<LoginPage />}</Box>
    </Modal>
  );
};

export default Modal;
