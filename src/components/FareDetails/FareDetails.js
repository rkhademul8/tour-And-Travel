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

const FareDetails = ({ flightData }) => {
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
    <Box>
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
              <TableCell>Type</TableCell>
              <TableCell align="right">Base Fare</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Service Fee</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Sub Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& td, & th": { color: "var(--secondary-color)" },
            }}
          >
            {flightData.pricebreakdown.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.PaxType === "ADT"
                    ? "Adult"
                    : row.PaxType === "CNN"
                    ? "Child"
                    : "Infant"}
                  {` (x${row.PaxCount})`}
                </TableCell>
                <TableCell align="right">
                  {commaNumber(parseInt(row.BaseFare || 0))}
                </TableCell>
                <TableCell align="right">
                  {commaNumber(parseInt(row.Tax || 0))}
                </TableCell>
                <TableCell align="right">
                  {commaNumber(parseInt(row.ServiceFee || 0))}
                </TableCell>
                <TableCell align="right">{parseInt(row.PaxCount)}</TableCell>
                <TableCell align="right">
                  {commaNumber(
                    parseInt(row.BaseFare || 0) + parseInt(row.Tax || 0)
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                "& td, & th": { fontWeight: "600" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" colSpan={5}>
                Total Base Fare(BDT)
              </TableCell>
              <TableCell align="right">{commaNumber(totalBaseFare)}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td, & th": { fontWeight: "600" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" colSpan={5}>
                Total Tax(BDT)
              </TableCell>
              <TableCell align="right">{commaNumber(totalTax)}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td, & th": { fontWeight: "600" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" colSpan={5}>
                AIT(BDT)
              </TableCell>
              <TableCell align="right">{commaNumber(ait)}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td, & th": { fontWeight: "600" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" colSpan={5}>
                Discount(BDT)
              </TableCell>
              <TableCell align="right">{commaNumber(discount)}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td, & th": { fontWeight: "600" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" colSpan={5}>
                Others(BDT)
              </TableCell>
              <TableCell align="right">{commaNumber(others)}</TableCell>
            </TableRow>
            <TableRow
              sx={{
                "& td, & th": { fontWeight: "600" },
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" colSpan={5}>
                Total Fare(BDT)
              </TableCell>
              <TableCell align="right">{commaNumber(totalFare)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FareDetails;
