import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CommonButton from "../commonButton/CommonButton";
import CharacterCard from "../../suite/inventoryComponents/CharacterCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function CharacterDataTable(rows: any) {
  const [character, setCharacter] = React.useState<any>();
  const handleSubmit = (row: any) => {
    setCharacter(row);
  };

  if (rows.rows.length > 0) {
    return (
      <TableContainer sx={{ display: "inline-flex" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Characters</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.rows.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <CommonButton
                    variant={"contained"}
                    onClick={() => {
                      handleSubmit(row);
                    }}
                    title={"Manage Character"}
                  >
                    <EditIcon />
                  </CommonButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CharacterCard row={character} />
      </TableContainer>
    );
  } else {
    return (
      <Box sx={{ display: "block", textAlign: "center" }}>
        <Typography>This party has no characters</Typography>{" "}
      </Box>
    );
  }
}
