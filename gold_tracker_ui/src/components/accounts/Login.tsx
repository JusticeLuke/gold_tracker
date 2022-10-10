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
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { getUser, login } from "../../actions/userActions/CRUDUser";
import CircularProgress from '@mui/material/CircularProgress';
import AlertMessage from '../common/alerts/AlertMessage';
import { AxiosError } from "axios";

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  from: { pathname: string };
}

export default function Login() {
  let navigate = useNavigate();
  
  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    from: { pathname: "../partys" },
  });

  const { isLoading, isError, error, refetch } = useQuery<void, AxiosError>(
    ['login'], 
    async () => {const {data} = await login(values);return data;}, 
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
      retry: false,
      onSuccess: (data: any) => {getUser(data.auth_token);navigate("../partys");}
    }
  );


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

  async function signInClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    refetch();
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
      <h2>Login</h2>
      <AlertMessage isError={isError} error={error} error400={"Invalid username or password"}></AlertMessage>
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
      <CommonButton variant={"contained"} onClick={signInClick}>
        {isLoading ? <CircularProgress color='inherit'/> : 'Sign In'}
      </CommonButton>
      <Link
        onClick={() => {
          navigate("../register");
        }}
        href=""
        sx={{ m: 1 }}
      >
        Create new account
      </Link>
    </Grid>
  );
}
