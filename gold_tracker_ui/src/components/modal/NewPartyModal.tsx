import React, { useState, useEffect } from "react";
import BasicModal from "../common/basicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const defaultInputValues = {
  name: "",
  anonGold: 0,
  anonSilver: 0,
  anonCopper: 0,
};

const defaultErrorValues = {
  nameError: false,
  nameHelperText: "",
  goldError: false,
  goldHelperText: "",
  silverError: false,
  silverHelperText: "",
  copperError: false,
  copperHelperText: "",
};

const NewPartyModal = ({ open, onClose, addNewParty }: any) => {
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
    validateInput(value);
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
      console.log("AN ERROR STILL REMAIN");
    } else {
      //Passes values(party name, gold, etc..) as props
      addNewParty(values);
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
          onChange={(event) =>
            handleChange({ ...values, name: event.target.value })
          }
          error={errorValues.nameError ? true : false}
          helperText={errorValues.nameHelperText}
        />
        <TextField
          placeholder="0"
          name="anonGold"
          label="Gold"
          value={values.anonGold}
          onChange={(event) => {
            handleChange({ ...values, anonGold: event.target.value });
            validateGold(event.target.value);
          }}
          error={errorValues.goldError ? true : false}
          helperText={errorValues.goldHelperText}
        />
        <TextField
          placeholder="0"
          name="anonSilver"
          label="Silver"
          value={values.anonSilver}
          onChange={(event) => {
            handleChange({ ...values, anonSilver: event.target.value });
            validateSilver(event.target.value);
          }}
          error={errorValues.silverError ? true : false}
          helperText={errorValues.silverHelperText}
        />
        <TextField
          placeholder="0"
          name="anonCopper"
          label="Copper"
          value={values.anonCopper}
          onChange={(event) => {
            handleChange({ ...values, anonCopper: event.target.value });
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
