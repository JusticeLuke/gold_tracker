import React, { useState, useEffect } from "react";
import BasicModal from "../common/basicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { updateCharacter } from "../../actions/characterActions/CRUDCharacter";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

const defaultErrorValues = {
  goldError: false,
  goldHelperText: "",
  silverError: false,
  silverHelperText: "",
  copperError: false,
  copperHelperText: "",
};

const NewWealthModal = ({ open, onClose, character }: any) => {
  const defaultInputValues = {
    name: character.name,
    personal_gold: character.personal_gold,
    personal_silver: character.personal_silver,
    personal_copper: character.personal_copper,
    id: character.id,
    party_id: character.party_id,
  };

  const [values, setValues] = useState(defaultInputValues);

  const [errorValues, setErrorValues] = useState(defaultErrorValues);
  const { isLoading, isSuccess, isError, error, refetch } = useQuery<void, AxiosError>(
    ['createParty'], 
    async () => {const {data} = await updateCharacter(values);return data;}, 
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
      retry: false,
    }
  );
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
      errorValues.goldError === true ||
      errorValues.silverError === true ||
      errorValues.copperError === true
    ) {
      console.log("AN ERROR STILL REMAINS");
    } else {
      //Passes values(party name, gold, etc..) as props
      updateCharacter(values);
      return onClose();
    }
  };

  //Clears inputs on modal close
  useEffect(() => {
    if (open) setValues(defaultInputValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const getContent = () => {
    return (
      <Box sx={partyModalStyles.inputFields}>
        <TextField
          placeholder="0"
          name="personal_gold"
          label={"Current gold: " + character.personal_gold}
          value={values.personal_gold}
          onChange={(event) => {
            handleChange({ ...values, personal_gold: event.target.value });
            validateGold(event.target.value);
          }}
          error={errorValues.goldError ? true : false}
          helperText={errorValues.goldHelperText}
        />
        <TextField
          placeholder="0"
          name="personal_silver"
          label={"Current silver: " + character.personal_silver}
          value={values.personal_silver}
          onChange={(event) => {
            handleChange({ ...values, personal_silver: event.target.value });
            validateSilver(event.target.value);
          }}
          error={errorValues.silverError ? true : false}
          helperText={errorValues.silverHelperText}
        />
        <TextField
          placeholder="0"
          name="personal_copper"
          label={"Current copper: " + character.personal_copper}
          value={values.personal_copper}
          onChange={(event) => {
            handleChange({ ...values, personal_copper: event.target.value });
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
      title="Update Personal Wealth"
      subTitle=""
      content={getContent()}
      onSubmit={handleSubmit}
    ></BasicModal>
  );
};

export default NewWealthModal;
