import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CommonButton from "../common/commonButton/CommonButton";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useAuth } from "../../actions/userActions/AuthProvider";
import { useNavigate } from "react-router-dom";

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

export default function Register() {
  let auth = useAuth();
  let navigate = useNavigate();
  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function registerClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await auth.register(values);
  }

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Register</h2>
      <TextField
        label="Username"
        id="outlined-start-adornment"
        value={values.username}
        onChange={handleChange("username")}
        sx={{ m: 1, width: "25ch" }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          label="Confirm Password"
        />
      </FormControl>
      <CommonButton variant={"contained"} onClick={registerClick}>
        Register
      </CommonButton>
      <Link
        onClick={() => {
          navigate("../login");
        }}
        href=""
        sx={{ m: 1 }}
      >
        Already have an account?
      </Link>
    </Grid>
  );
}
