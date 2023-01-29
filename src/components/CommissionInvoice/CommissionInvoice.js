import { InsertEmoticon } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import commaNumber from "comma-number";
import React from "react";

const CommissionInvoice = ({
  flightData,
  clientFare,
  agentFare,
  commission,
}) => {
  const totalBaseFare = flightData.pricebreakdown.reduce(
    (cur, acc) => cur + parseInt(acc.BaseFare),
    0
  );
  // //console.log(totalBaseFare);
  const totalTax = flightData.pricebreakdown.reduce(
    (cur, acc) => cur + parseInt(acc.Tax),
    0
  );
  const ait = 0;
  const discount = 0;
  const others = 0;
  const totalFare = totalBaseFare + totalTax + ait + discount + others;
  return (
    <Box className="fare-summery-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow
              sx={{
                "th:not([scope='row'])": {
                  color: "var(--secondary-color )",
                },
              }}
            >
              <TableCell align="center">Customer Invoice</TableCell>
              <TableCell align="center">Commission</TableCell>
              <TableCell align="center">Agent Invoice</TableCell>
              <TableCell align="center">Profit Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td, & th": { color: "var(--secondary-color)" },
            }}
          >
            <TableRow
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "rgba(var(--secondary-rgb),.4)",
                },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">
                {commaNumber(parseInt(clientFare || 0))}
              </TableCell>
              <TableCell align="center">7%</TableCell>
              <TableCell align="center">
                {commaNumber(parseInt(agentFare || 0))}
              </TableCell>
              <TableCell align="center">{parseInt(commission)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommissionInvoice;
