import React from "react";
import BasicCard from "../common/basicCard/BasicCard";
import GridWrapper from "../common/gridWrapper/GridWrapper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CommonButton from "../common/commonButton/CommonButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { predictHP } from "../../actions/monsterActions/monsterPredict";

const defaultInputValues = {
  name: null,
  size: null,
  type: null,
  alignment: null,
  ac: null,
  cr: null,
  speed: null,
  swim: null,
  fly: null,
  climb: null,
  burrow: null,
  passive_perception: null,
  darkvision: null,
  truesight: null,
  tremorsense: null,
  blindsight: null,
  str_mod: null,
  dex_mod: null,
  con_mod: null,
  int_mod: null,
  wis_mod: null,
  cha_mod: null,
  str_save: null,
  dex_save: null,
  con_save: null,
  int_save: null,
  wis_save: null,
  cha_save: null,
  history: null,
  perception: null,
  stealth: null,
  persuasion: null,
  insight: null,
  deception: null,
  arcana: null,
  religion: null,
  acrobatics: null,
  athletics: null,
  intimidation: null,
  multiattack: null,
  legendary: null,
};

const MonsterGen = () => {
  const [values, setValues] = React.useState(defaultInputValues);
  const [hp, setHp] = React.useState();
  const [acc, setAcc] = React.useState("");

  //Get model accuracy only on load
  const modelAcc = async () => {
    let accuracy = await modelAccuracy();
    setAcc(accuracy);
  };
  modelAcc();

  const handleChange = (value: any) => {
    setValues(value);
  };

  const handleSubmit = async () => {
    let jsonPrediction = await predictHP(values);
    let hp = jsonPrediction.Predicted_HP[0];
    setHp(hp);
  };

  const formStyles = {
    dropdownFields: {
      width: "48%",
      margin: "2em",
    },
    inputFields: {
      width: "20%",
      margin: "2em",
    },
    inputContainers: {
      display: "inline",
    },
    predict: {
      fontSize: "1em",
      fontStyle: "bold",
      margin: "2em",
    },
  };

  const getContent = () => {
    return (
      <Box sx={formStyles.inputContainers}>
        <FormControl sx={formStyles.dropdownFields}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type-select"
            value={values.type}
            label="Type"
            onChange={(event) => {
              handleChange({ ...values, type: event.target.value });
            }}
          >
            <MenuItem value={1}>ABBERATION</MenuItem>
            <MenuItem value={12}>BEAST</MenuItem>
            <MenuItem value={13}>CELESTIAL</MenuItem>
            <MenuItem value={11}>CONSTRUCT</MenuItem>
            <MenuItem value={5}>DRAGON</MenuItem>
            <MenuItem value={8}>ELEMENTAL</MenuItem>
            <MenuItem value={10}>FEY</MenuItem>
            <MenuItem value={9}>FIEND</MenuItem>
            <MenuItem value={0}>HUMANOID</MenuItem>
            <MenuItem value={3}>MONSTROSITY</MenuItem>
            <MenuItem value={7}>OOZE</MenuItem>
            <MenuItem value={6}>PLANT</MenuItem>
            <MenuItem value={14}>SWARM</MenuItem>
            <MenuItem value={4}>UNDEAD</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={formStyles.dropdownFields}>
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            labelId="size-label"
            id="size-select"
            value={values.size}
            label="Size"
            onChange={(event) => {
              handleChange({ ...values, size: event.target.value });
            }}
          >
            <MenuItem value={0}>TINY</MenuItem>
            <MenuItem value={1}>SMAL</MenuItem>
            <MenuItem value={2}>MEDIUM</MenuItem>
            <MenuItem value={3}>LARGE</MenuItem>
            <MenuItem value={4}>HUGE</MenuItem>
            <MenuItem value={5}>GARGANTUAN</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <TextField
            sx={formStyles.inputFields}
            placeholder="0"
            name="Armor Class"
            label="Armor Class"
            value={values.ac}
            onChange={(event) => {
              handleChange({ ...values, ac: event.target.value });
            }}
            // error={errorValues.goldError ? true : false}
            // helperText={errorValues.goldHelperText}
          />
          <TextField
            sx={formStyles.inputFields}
            placeholder="0"
            name="Challenge Rating"
            label="Challenge Rating"
            value={values.cr}
            onChange={(event) => {
              handleChange({ ...values, cr: event.target.value });
            }}
            // error={errorValues.goldError ? true : false}
            // helperText={errorValues.goldHelperText}
          />
          <TextField
            sx={formStyles.inputFields}
            placeholder="0"
            name="Speed"
            label="Speed (ft)"
            value={values.speed}
            onChange={(event) => {
              handleChange({ ...values, speed: event.target.value });
            }}
            // error={errorValues.goldError ? true : false}
            // helperText={errorValues.goldHelperText}
          />
          <TextField
            sx={formStyles.inputFields}
            placeholder="0"
            name="Fly Speed"
            label="Fly Speed (ft)"
            value={values.fly}
            onChange={(event) => {
              handleChange({ ...values, fly: event.target.value });
            }}
            // error={errorValues.goldError ? true : false}
            // helperText={errorValues.goldHelperText}
          />
          <TextField
            sx={formStyles.inputFields}
            placeholder="0"
            name="Swim Speed"
            label="Swim Speed (ft)"
            value={values.swim}
            onChange={(event) => {
              handleChange({ ...values, swim: event.target.value });
            }}
            // error={errorValues.goldError ? true : false}
            // helperText={errorValues.goldHelperText}
          />
          <TextField
            sx={formStyles.inputFields}
            placeholder="0"
            name="Passive Perception"
            label="Passive Perception"
            value={values.passive_perception}
            onChange={(event) => {
              handleChange({
                ...values,
                passive_perception: event.target.value,
              });
            }}
            // error={errorValues.goldError ? true : false}
            // helperText={errorValues.goldHelperText}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.legendary === 1}
                onChange={(event) => {
                  //When checked legendary should equal 1
                  if (values.legendary === 0) {
                    handleChange({ ...values, legendary: 1 });
                  } else {
                    handleChange({ ...values, legendary: 0 });
                  }
                }}
              />
            }
            label="Monster has Legendary Actions"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={values.multiattack === 1}
                onChange={(event) => {
                  //When checked legendary should equal 1
                  if (values.multiattack === 0) {
                    handleChange({ ...values, multiattack: 1 });
                  } else {
                    handleChange({ ...values, multiattack: 0 });
                  }
                }}
              />
            }
            label="Monster has a multi-attack"
          />
        </FormGroup>
        <CommonButton
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
          size={"large"}
        >
          Predict HP
        </CommonButton>
        <Typography sx={formStyles.predict}>
          Predicted HP(Model Accuracy {acc}): {hp}
        </Typography>
      </Box>
    );
  };
  return (
    <GridWrapper item xs={8} sx={{ margin: "auto" }}>
      <BasicCard content={getContent()} sx={{ mt: "5px" }} />
    </GridWrapper>
  );
};
export default MonsterGen;

async function modelAccuracy() {
  const testData = [
    {
      name: "aarakocra",
      size: 2,
      type: 0,
      alignment: "neutral good",
      ac: 12,
      cr: 0.25,
      speed: 20,
      swim: 0,
      fly: 50,
      climb: 0,
      burrow: 0,
      passive_perception: 15,
      darkvision: 0,
      truesight: 0,
      tremorsense: 0,
      blindsight: 0,
      str_mod: 0,
      dex_mod: 2,
      con_mod: 0,
      int_mod: 0,
      wis_mod: 1,
      cha_mod: 0,
      str_save: 0,
      dex_save: 0,
      con_save: 0,
      int_save: 0,
      wis_save: 0,
      cha_save: 0,
      history: 0,
      perception: 5,
      stealth: 0,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 0,
      legendary: 0,
    },
    {
      name: "abjurer",
      size: 2,
      type: 0,
      alignment: "any alignment",
      ac: 12,
      cr: 9,
      speed: 30,
      swim: 0,
      fly: 0,
      climb: 0,
      burrow: 0,
      passive_perception: 11,
      darkvision: 0,
      truesight: 0,
      tremorsense: 0,
      blindsight: 0,
      str_mod: -1,
      dex_mod: 2,
      con_mod: 2,
      int_mod: 4,
      wis_mod: 1,
      cha_mod: 0,
      str_save: 0,
      dex_save: 0,
      con_save: 0,
      int_save: 8,
      wis_save: 5,
      cha_save: 0,
      history: 8,
      perception: 0,
      stealth: 0,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 8,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 0,
      legendary: 0,
    },
    {
      name: "aboleth",
      size: 4,
      type: 1,
      alignment: "lawful evil",
      ac: 17,
      cr: 10,
      speed: 10,
      swim: 40,
      fly: 0,
      climb: 0,
      burrow: 0,
      passive_perception: 20,
      darkvision: 120,
      truesight: 0,
      tremorsense: 0,
      blindsight: 0,
      str_mod: 5,
      dex_mod: -1,
      con_mod: 2,
      int_mod: 4,
      wis_mod: 2,
      cha_mod: 4,
      str_save: 0,
      dex_save: 0,
      con_save: 6,
      int_save: 8,
      wis_save: 6,
      cha_save: 0,
      history: 12,
      perception: 10,
      stealth: 0,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 1,
      legendary: 1,
    },
    {
      name: "abominable-yeti",
      size: 5,
      type: 2,
      alignment: "chaotic evil",
      ac: 15,
      cr: 9,
      speed: 40,
      swim: 0,
      fly: 0,
      climb: 40,
      burrow: 0,
      passive_perception: 15,
      darkvision: 60,
      truesight: 0,
      tremorsense: 0,
      blindsight: 0,
      str_mod: 7,
      dex_mod: 0,
      con_mod: 6,
      int_mod: -1,
      wis_mod: 1,
      cha_mod: -1,
      str_save: 0,
      dex_save: 0,
      con_save: 0,
      int_save: 0,
      wis_save: 0,
      cha_save: 0,
      history: 0,
      perception: 5,
      stealth: 4,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 0,
      legendary: 0,
    },
    {
      name: "acererak",
      size: 2,
      type: 3,
      alignment: "neutral evil",
      ac: 21,
      cr: 23,
      speed: 30,
      swim: 0,
      fly: 0,
      climb: 0,
      burrow: 0,
      passive_perception: 22,
      darkvision: 0,
      truesight: 120,
      tremorsense: 0,
      blindsight: 0,
      str_mod: 1,
      dex_mod: 3,
      con_mod: 5,
      int_mod: 8,
      wis_mod: 5,
      cha_mod: 5,
      str_save: 0,
      dex_save: 0,
      con_save: 12,
      int_save: 15,
      wis_save: 12,
      cha_save: 0,
      history: 22,
      perception: 12,
      stealth: 0,
      persuasion: 0,
      insight: 12,
      deception: 0,
      arcana: 22,
      religion: 15,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 0,
      legendary: 0,
    },
    {
      name: "acolyte",
      size: 2,
      type: 0,
      alignment: "any alignment",
      ac: 10,
      cr: 0.25,
      speed: 30,
      swim: 0,
      fly: 0,
      climb: 0,
      burrow: 0,
      passive_perception: 12,
      darkvision: 0,
      truesight: 0,
      tremorsense: 0,
      blindsight: 0,
      str_mod: 0,
      dex_mod: 0,
      con_mod: 0,
      int_mod: 0,
      wis_mod: 2,
      cha_mod: 0,
      str_save: 0,
      dex_save: 0,
      con_save: 0,
      int_save: 0,
      wis_save: 0,
      cha_save: 0,
      history: 0,
      perception: 0,
      stealth: 0,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 2,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 0,
      legendary: 0,
    },
    {
      name: "adult-black-dragon",
      size: 5,
      type: 4,
      alignment: "chaotic evil",
      ac: 19,
      cr: 14,
      speed: 40,
      swim: 40,
      fly: 80,
      climb: 0,
      burrow: 0,
      passive_perception: 21,
      darkvision: 120,
      truesight: 0,
      tremorsense: 0,
      blindsight: 60,
      str_mod: 6,
      dex_mod: 2,
      con_mod: 5,
      int_mod: 2,
      wis_mod: 1,
      cha_mod: 3,
      str_save: 0,
      dex_save: 7,
      con_save: 10,
      int_save: 0,
      wis_save: 6,
      cha_save: 8,
      history: 0,
      perception: 11,
      stealth: 7,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 1,
      legendary: 1,
    },
    {
      name: "adult-blue-dracolich",
      size: 5,
      type: 3,
      alignment: "lawful evil",
      ac: 19,
      cr: 17,
      speed: 40,
      swim: 0,
      fly: 80,
      climb: 0,
      burrow: 30,
      passive_perception: 24,
      darkvision: 120,
      truesight: 0,
      tremorsense: 0,
      blindsight: 60,
      str_mod: 7,
      dex_mod: 0,
      con_mod: 6,
      int_mod: 3,
      wis_mod: 2,
      cha_mod: 4,
      str_save: 0,
      dex_save: 6,
      con_save: 12,
      int_save: 0,
      wis_save: 8,
      cha_save: 10,
      history: 0,
      perception: 14,
      stealth: 6,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 0,
      legendary: 1,
    },
    {
      name: "adult-blue-dragon",
      size: 5,
      type: 4,
      alignment: "lawful evil",
      ac: 19,
      cr: 16,
      speed: 40,
      swim: 0,
      fly: 80,
      climb: 0,
      burrow: 30,
      passive_perception: 22,
      darkvision: 120,
      truesight: 0,
      tremorsense: 0,
      blindsight: 60,
      str_mod: 7,
      dex_mod: 0,
      con_mod: 6,
      int_mod: 3,
      wis_mod: 2,
      cha_mod: 4,
      str_save: 0,
      dex_save: 5,
      con_save: 11,
      int_save: 0,
      wis_save: 7,
      cha_save: 9,
      history: 0,
      perception: 12,
      stealth: 5,
      persuasion: 0,
      insight: 0,
      deception: 0,
      arcana: 0,
      religion: 0,
      acrobatics: 0,
      athletics: 0,
      intimidation: 0,
      multiattack: 1,
      legendary: 1,
    },
  ];

  const expectedHP = [13, 84, 135, 137, 285, 9, 195, 225, 225];
  let predictedHP = [];
  for (let i = 0; i < testData.length; i++) {
    let jsonPrediction = await predictHP(testData[i]);
    let hp = jsonPrediction.Predicted_HP[0];
    predictedHP.push(hp);
  }

  let accArray = [];
  let avg = 0;
  for (let x = 0; x < expectedHP.length; x++) {
    if (expectedHP[x] <= predictedHP[x]) {
      accArray.push(expectedHP[x] / predictedHP[x]);
    } else {
      accArray.push(predictedHP[x] / expectedHP[x]);
    }
  }

  accArray.map((num) => (avg += num));
  let avgFormat = new Intl.NumberFormat("en-en", {
    style: "percent",
  }).format(avg / 9);

  return avgFormat;
}
