import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import BasicCard from "../../common/basicCard/BasicCard";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

const LogCard = () => {
  const [log, setLog] = React.useState<any>();

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    setLog(localStorage.getItem("log"));
  }, []);

  const getLogData = () => {
    let logData = [];
    if (log != null) {
      logData = JSON.parse(log);
    }
    return logData;
  };
  const getContent = () => {
    const logData = getLogData();
    return (
      <List>
        {logData.map((row: any) => (
          <ListItem>
            <ListItemText primary={row.entry}> </ListItemText>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <Grid item xs={4}>
      <BasicCard
        content={getContent()}
        header={"Party Log"}
        sx={{ mt: "5px" }}
      />
    </Grid>
  );
};

export default LogCard;
