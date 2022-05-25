import React, { useState, useEffect } from "react";
import BasicModal from "../common/basicModal/BasicModal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { updateCharacter } from "../../actions/characterActions/CRUDCharacter";

const defaultErrorValues = {
  goldError: false,
  goldHelperText: "",
  silverError: false,
  silverHelperText: "",
  copperError: false,
  copperHelperText: "",
};

interface valueType {
  name: string;
  personal_gold: number;
  personal_silver: number;
  personal_copper: number;
  tribute_gold: number;
  tribute_silver: number;
  tribute_copper: number;
  id: number;
  party_id: number;
}

const NewTributeModal = ({ open, onClose, character }: any) => {
  const defaultInputValues = {
    name: character.name,
    personal_gold: character.personal_gold,
    personal_silver: character.personal_silver,
    personal_copper: character.personal_copper,
    tribute_gold: 0,
    tribute_silver: 0,
    tribute_copper: 0,
    id: character.id,
    party_id: character.party_id,
  };
  const defaultTempValues = {
    tempGold: 0,
    tempSilver: 0,
    tempCopper: 0,
  };

  const [values, setValues] = useState<valueType>(defaultInputValues);
  const [tempValues, setTempValues] = useState(defaultTempValues);
  const [errorValues, setErrorValues] = useState(defaultErrorValues);

  const partyModalStyles = {
    Typography: {
      textAlign: "center",
      marginBottom: "5px",
    },
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
    } else if (value > character.personal_gold) {
      setErrorValues({
        ...errorValues,
        goldError: true,
        goldHelperText: "you do not possess that much gold",
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
    } else if (value > character.personal_silver) {
      setErrorValues({
        ...errorValues,
        silverError: true,
        silverHelperText: "you do not possess that much silver",
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
    } else if (value > character.personal_copper) {
      setErrorValues({
        ...errorValues,
        copperError: true,
        copperHelperText: "you do not possess that much copper",
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
  const handleChange = (value: any, temp: any) => {
    setValues(value);
    setTempValues(temp);
    // let goldTribute =
    //   Number(value.tribute_gold) + Number(character.tribute_gold);
    // let silverTribute =
    //   Number(value.tribute_silver) + Number(character.tribute_silver);
    // let copperTribute =
    //   Number(value.tribute_copper) + Number(character.tribute_copper);
    // let newGold = Number(character.personal_gold) - Number(value.tribute_gold);
    // let newSilver =
    //   Number(character.personal_silver) - Number(value.tribute_silver);
    // let newCopper =
    //   Number(character.personal_copper) - Number(value.tribute_copper);
    // setTempValues({
    //   ...tempValues,
    //   tempGold: value.tribute_gold,
    //   tempSilver: value.tribute_silver,
    //   tempCopper: value.tribute_copper,
    // });
    // setValues({
    //   ...values,
    //   tribute_gold: goldTribute,
    //   tribute_silver: silverTribute,
    //   tribute_copper: copperTribute,
    //   personal_gold: newGold,
    //   personal_silver: newSilver,
    //   personal_copper: newCopper,
    // });
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
      console.log(values);
      return onClose();
    }
  };

  //Clears inputs on modal close
  useEffect(() => {
    if (open) {
      setTempValues(defaultTempValues);
      setValues(defaultInputValues);
    }
  }, [open]);

  const getContent = () => {
    return (
      <Box sx={partyModalStyles.inputFields}>
        <Typography sx={partyModalStyles.Typography}>
          {"Donated gold: " + character.tribute_gold}
        </Typography>
        <TextField
          placeholder="0"
          name="tribute_gold"
          label={
            "Maximum possible gold contribution: " + character.personal_gold
          }
          value={tempValues.tempGold}
          onChange={(event) => {
            handleChange(
              {
                ...values,
                tribute_gold:
                  Number(event.target.value) + Number(character.tribute_gold),
                personal_gold:
                  Number(character.personal_gold) - Number(event.target.value),
              },
              { ...tempValues, tempGold: event.target.value }
            );
            validateGold(event.target.value);
          }}
          error={errorValues.goldError ? true : false}
          helperText={errorValues.goldHelperText}
        />

        <Typography sx={partyModalStyles.Typography}>
          {"Donated silver: " + character.tribute_silver}
        </Typography>
        <TextField
          placeholder="0"
          name="tribute_silver"
          label={
            "Maximum possible silver contribution: " + character.personal_silver
          }
          value={tempValues.tempSilver}
          onChange={(event) => {
            handleChange(
              {
                ...values,
                tribute_silver:
                  Number(event.target.value) + Number(character.tribute_silver),
                personal_silver:
                  Number(character.personal_silver) -
                  Number(event.target.value),
              },
              { ...tempValues, tempSilver: event.target.value }
            );
            validateSilver(event.target.value);
          }}
          error={errorValues.silverError ? true : false}
          helperText={errorValues.silverHelperText}
        />

        <Typography sx={partyModalStyles.Typography}>
          {"Donated copper: " + character.tribute_copper}
        </Typography>
        <TextField
          placeholder="0"
          name="tribute_copper"
          label={
            "Maximum possible copper contribution: " + character.personal_copper
          }
          value={tempValues.tempCopper}
          onChange={(event) => {
            handleChange(
              {
                ...values,
                tribute_copper:
                  Number(event.target.value) + Number(character.tribute_copper),
                personal_copper:
                  Number(character.personal_copper) -
                  Number(event.target.value),
              },
              { ...tempValues, tempCopper: event.target.value }
            );
            validateCopper(event.target.value);
          }}
          error={errorValues.copperError ? true : false}
          helperText={errorValues.copperHelperText}
        />

        <FormControlLabel
          control={<Checkbox name="donate anon" disabled />}
          label="Donate anonymously"
        />
      </Box>
    );
  };
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Contribute to party wealth"
      subTitle=""
      content={getContent()}
      onSubmit={handleSubmit}
    ></BasicModal>
  );
};

export default NewTributeModal;
