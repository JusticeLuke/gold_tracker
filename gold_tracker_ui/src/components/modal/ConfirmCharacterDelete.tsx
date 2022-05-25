import React, { useState, useEffect } from "react";
import BasicModal from "../common/basicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { updateCharacter } from "../../actions/characterActions/CRUDCharacter";

const ConfirmCharacterDelete = ({ open, onClose, character }: any) => {
  return <Box>Delete Me</Box>;
};

export default ConfirmCharacterDelete;
