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
import { useNavigate } from "react-router-dom";

export default function DataTable(rows: any) {
  const navigate = useNavigate();
  const editPartyClick = (row: any) => {
    localStorage.setItem("selectedRow", row.id);
    navigate("inventory");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Party Name</TableCell>
            <TableCell align="right">Copper</TableCell>
            <TableCell align="right">Silver</TableCell>
            <TableCell align="right">Gold</TableCell>
            <TableCell align="center">Manage Partys</TableCell>
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
              <TableCell align="right">{row.anon_copper}</TableCell>
              <TableCell align="right">{row.anon_silver}</TableCell>
              <TableCell align="right">{row.anon_gold}</TableCell>
              <TableCell align="center">
                <CommonButton
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => editPartyClick(row)}
                >
                  <EditIcon />
                </CommonButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
