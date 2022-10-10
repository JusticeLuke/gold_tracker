import * as React from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import { AxiosError } from "axios";

interface AlertProps {
  isError?: boolean,
  isSuccess?: boolean,
  error?: AxiosError | null,
  error400?: string | undefined
}
const AlertMessage = (props: AlertProps) => {
    let message = "";
    let severity: AlertColor | undefined = undefined;
    if(props.isError && props.error != null){
      if(props.error.message === 'Network Error'){
        severity="error";
        message="Cannot connect to server";
      }else if(props.error.response?.request.status === 400){
        severity="warning";
        message = props.error400 ? props.error400 : "Bad Request";
      }else if(props.error.response?.request.status === 401){
        severity="error";
        message="Unauthorized";
      }else if(props.error.response?.request.status === 403){
        severity="error";
        message="Forbidden";
      }else if(props.error.response?.request.status === 429){
        severity="error";
        message="Too many requests";
      }else if(props.error.response?.request.status === 500){
        severity="error";
        message="Internal Server Error";
      }
    }else if(props.isSuccess){
        severity='success'
        message="Success!";
    }

    return (
      severity ? <Alert severity={severity}>{message}</Alert> : <div></div>
    )
};

export default AlertMessage;
