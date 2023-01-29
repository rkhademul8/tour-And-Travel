import React from "react";
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Container,
  Typography,
  Tooltip,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";

const Baggage = ({ flightData }) => {
  const [value, setValue] = useState("0");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{
            width: "100%",
            background: "var(--white)",
            height: { lg: "40px", md: "50px", sm: "100%", xs: "100%" },
            minHeight: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            opacity: "1",
            "& button": {
              background: "var(--secondary-color)",
              color: "var(--white)",
              opacity: "1",
            },
            "& button:first-child": {
              borderRadius: "10px 0px 0px 0px",
            },
            "& button:last-child": {
              borderRadius: "0px 10px 0px 0px",
            },

            "& button.Mui-selected": {
              background: "var(--primary-color)",
              color: "var(--white)",
              opacity: "1",
            },
          }}
        >
          <TabList onChange={handleChange}>
            {flightData?.segments.map((segment, i, arr) => (
              <Tab
                label={`${segment[0]?.departure} ✈ ${
                  segment[segment.length - 1]?.arrival
                }`}
                value={`${i}`}
              />
            ))}
          </TabList>
        </Box>
        {flightData?.segments.map((segment, index, arr) => (
          <TabPanel value={`${index}`} style={{ padding: "0px" }}>
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                border: "1px solid var(--secondary-color) ",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow
                      sx={{
                        "th:not([scope='row'])": {
                          color: "var(--secondary-color )",
                        },
                      }}
                    >
                      <TableCell align="center">Baggage</TableCell>
                      <TableCell align="center">Check In</TableCell>
                      <TableCell align="center">Cabin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(flightData.bags[index]).map(
                      (key, keyIndex, fullArr) => (
                        <TableRow
                          sx={{
                            "& th,& td": { color: "var(--secondary-color)" },
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {`${key.slice(0, -3).toUpperCase()} (x${
                              flightData.pricebreakdown[keyIndex].PaxCount
                            })`}
                          </TableCell>
                          <TableCell align="center">
                            {`${flightData.bags[index][key]}`}
                          </TableCell>
                          <TableCell align="center">
                            {segment[0]?.bookingcode}
                            {console.log(segment[0].bookingcode)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Baggage;
