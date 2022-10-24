import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CommonButton from "../commonButton/CommonButton";
import { modalStyles } from "./ModalStyles";
import { CircularProgress } from "@mui/material";

const BasicModal = ({
  open,
  onClose,
  title,
  subTitle,
  content,
  onSubmit,
  error,
  isLoading,
}: any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles.wrapper}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{subTitle}</Typography>
        {content}
        <Box sx={modalStyles.buttons}>
          {isLoading ? <CircularProgress></CircularProgress>:
                       <CommonButton variant="contained" onClick={onSubmit} disabled={error}>
                          Submit
                       </CommonButton>
          }
          <CommonButton onClick={onClose}>Cancel</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
