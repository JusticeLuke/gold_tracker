import React, { useState, useEffect } from "react";
import BasicModal from "../common/basicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const defaultInputValues = {
  name: "",
  anonGold: 0,
};
const NewPartyModal = ({ open, onClose, addNewParty }: any) => {
  const [values, setValues] = useState(defaultInputValues);

  const partyModalStyles = {
    inputFields: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      ".MuiFormControl-root": {
        marginBottom: "20px",
      },
    },
  };

  const handleChange = (value: any) => {
    setValues(value);
  };

  const getContent = () => {
    return (
      <Box sx={partyModalStyles.inputFields}>
        <TextField
          placeholder="Party Name"
          name="name"
          label="Party Name"
          required
          value={values.name}
          onChange={(event) =>
            handleChange({ ...values, userId: event.target.value })
          }
        />
        <TextField
          placeholder="Anonymous Gold"
          name="anonGold"
          label="Anonymous Gold"
          required
          value={values.anonGold}
          onChange={(event) =>
            handleChange({ ...values, anonGold: event.target.value })
          }
        />
      </Box>
    );
  };
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New party"
      subTitle=""
      content={getContent()}
      //validateFunction()
    ></BasicModal>
  );
};

export default NewPartyModal;
