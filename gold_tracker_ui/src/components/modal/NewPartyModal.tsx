import React, { useState, useEffect } from "react";
import BasicModal from "../common/basicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createParty } from "../../actions/partyActions/CRUDParty";

const defaultInputValues = {
  name: "",
  anon_gold: 0,
  anon_silver: 0,
  anon_copper: 0,
  master: localStorage.getItem("id"),
};

const defaultErrorValues = {
  nameError: true,
  nameHelperText: "Input your party's name.",
  goldError: false,
  goldHelperText: "",
  silverError: false,
  silverHelperText: "",
  copperError: false,
  copperHelperText: "",
};

const NewPartyModal = ({ open, onClose, handleSuccess }: any) => {
  const [values, setValues] = useState(defaultInputValues);

  const [errorValues, setErrorValues] = useState(defaultErrorValues);

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

  //Validates string user input
  /* eslint-disable */
  let validRegEx = /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_\ \&\$\#]{1,60}$/gm;

  const validateInput = (value: any) => {
    //Validate party name string
    if (!validRegEx.test(value.name)) {
      setErrorValues({
        ...errorValues,
        nameError: true,
        nameHelperText: "name contains a ! @ % ^ * ) or (",
      });
      if (value.name.length > 60) {
        setErrorValues({
          ...errorValues,
          nameError: true,
          nameHelperText: "name must be shorter than 60 characters",
        });
      }
    } else {
      setErrorValues({ ...errorValues, nameError: false, nameHelperText: "" });
    }
  };
  //Validate gold inputs
  const validateGold = (value: any) => {
    if (value < 0 || isNaN(value)) {
      setErrorValues({
        ...errorValues,
        goldError: true,
        goldHelperText: "value must be a number above 0",
      });
    } else {
      setErrorValues({
        ...errorValues,
        goldError: false,
        goldHelperText: "",
      });
    }
  };

  //Validate silver inputs
  const validateSilver = (value: any) => {
    if (value < 0 || isNaN(value)) {
      setErrorValues({
        ...errorValues,
        silverError: true,
        silverHelperText: "value must be a number above 0",
      });
    } else {
      setErrorValues({
        ...errorValues,
        silverError: false,
        silverHelperText: "",
      });
    }
  };

  //Validate copper inputs
  const validateCopper = (value: any) => {
    if (value < 0 || isNaN(value)) {
      setErrorValues({
        ...errorValues,
        copperError: true,
        copperHelperText: "value must be a number above 0",
      });
    } else {
      setErrorValues({
        ...errorValues,
        copperError: false,
        copperHelperText: "",
      });
    }
  };
  //When input field has any change it validates the contents and sets the state to match the current input
  const handleChange = (value: any) => {
    setValues(value);
  };

  //Checks if any errors are active
  const handleSubmit = () => {
    if (
      errorValues.nameError === true ||
      errorValues.goldError === true ||
      errorValues.silverError === true ||
      errorValues.copperError === true
    ) {
      console.log("AN ERROR STILL REMAINS");
    } else {
      //Passes values(party name, gold, etc..) as props
      createParty(values);
      return onClose();
    }
  };

  //Clears inputs on modal close
  useEffect(() => {
    if (open) setValues(defaultInputValues);
  }, [open]);
  const getContent = () => {
    return (
      <Box sx={partyModalStyles.inputFields}>
        <TextField
          placeholder="Party Name"
          name="name"
          label="Party Name"
          required
          value={values.name}
          onChange={(event) => {
            handleChange({ ...values, name: event.target.value });
            validateInput(event.target.value);
          }}
          error={errorValues.nameError ? true : false}
          helperText={errorValues.nameHelperText}
        />
        <TextField
          placeholder="0"
          name="anon_gold"
          label="Gold"
          value={values.anon_gold}
          onChange={(event) => {
            handleChange({ ...values, anon_gold: event.target.value });
            validateGold(event.target.value);
          }}
          error={errorValues.goldError ? true : false}
          helperText={errorValues.goldHelperText}
        />
        <TextField
          placeholder="0"
          name="anon_silver"
          label="Silver"
          value={values.anon_silver}
          onChange={(event) => {
            handleChange({ ...values, anon_silver: event.target.value });
            validateSilver(event.target.value);
          }}
          error={errorValues.silverError ? true : false}
          helperText={errorValues.silverHelperText}
        />
        <TextField
          placeholder="0"
          name="anon_copper"
          label="Copper"
          value={values.anon_copper}
          onChange={(event) => {
            handleChange({ ...values, anon_copper: event.target.value });
            validateCopper(event.target.value);
          }}
          error={errorValues.copperError ? true : false}
          helperText={errorValues.copperHelperText}
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
      onSubmit={handleSubmit}
    ></BasicModal>
  );
};

export default NewPartyModal;
