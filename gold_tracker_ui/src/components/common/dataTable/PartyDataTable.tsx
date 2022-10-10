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
import { getPartyCharacters } from "../../../actions/characterActions/CRUDCharacter";
import { getLog } from "../../../actions/logActions/CRLog";
import { Party } from "../../../actions/partyActions/CRUDParty";

interface PartyTable{
  userPartys: Party[];
  search: string;
}
export default function PartyDataTable(props: PartyTable) {
  const navigate = useNavigate();
  
  const editPartyClick = async (row: Party) => {
    localStorage.setItem("partyId", row.partyId!);
    localStorage.setItem("partyName", row.name!);
    await getPartyCharacters();
    await getLog();
    navigate("inventory");
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Party Name</TableCell>
            <TableCell align="right">Gold</TableCell>
            <TableCell align="right">Silver</TableCell>
            <TableCell align="right">Copper</TableCell>
            <TableCell align="center">Manage Partys</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.userPartys.map((row: any) => {
            if (
              row.name.toLowerCase().includes(props.search.search) ||
              props.search.trim() === ""
            ) {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.anon_gold}</TableCell>
                  <TableCell align="right">{row.anon_silver}</TableCell>
                  <TableCell align="right">{row.anon_copper}</TableCell>
                  <TableCell align="center">
                    <CommonButton
                      variant={"contained"}
                      onClick={() => editPartyClick({...row, partyId: row.id})}
                    >
                      <EditIcon />
                    </CommonButton>
                  </TableCell>
                </TableRow>
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
