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
import FlightIcon from "@mui/icons-material/Flight";
import { format } from "date-fns";

const FlightDetails = ({ flightData }) => {
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
        {flightData?.segments.map((segment, i, arr) => (
          <TabPanel value={`${i}`} style={{ padding: "0px" }}>
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                border: "1px solid var(--secondary-color) ",
              }}
            >
              {segment.map((segment, i, arr) => (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="start"
                  height="80px"
                  sx={{ padding: "5px 0px" }}
                >
                  {/* //todo: first section */}
                  <Grid md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "30%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ width: "50px", height: "50px" }}>
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment?.marketingcareer}.png`}
                            className={`${flightData?.system?.toLowerCase()}`}
                            alt={`${segment?.marketingcareer}`}
                          />
                        </Box>
                        <Tooltip title={`${segment?.marketingcareerName}`}>
                          <Typography
                            sx={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            {segment?.marketingcareer}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          width: "70%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "100%",
                            color: "var(--secondary-color)",
                            fontWeight: "600",
                          }}
                        >{`${segment.departure} ${format(
                          new Date(segment.departureTime),
                          "hh:mm"
                        )}`}</Typography>
                        <Tooltip title={`${segment.departureAirport}`}>
                          <Typography
                            sx={{
                              width: "100%",
                              cursor: "pointer",
                              color: "var(--mateBlack)",
                            }}
                            noWrap
                          >{`${segment.departureAirport}`}</Typography>
                        </Tooltip>
                        <Typography
                          sx={{ width: "100%", fontSize: "14px" }}
                        >{`${format(
                          new Date(segment.departureTime),
                          "MMM dd,EE"
                        )}`}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  {/* //todo: second section */}
                  <Grid md={4}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Tooltip title={`${segment.flightduration}`}>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                            },
                            cursor: "pointer",
                          }}
                          noWrap
                        >
                          {segment.flightduration}
                        </Typography>
                      </Tooltip>
                      <Box
                        px={1}
                        sx={{
                          width: "50%",
                          height: "fit-content",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderTop: "1px dashed var(--secondary-color)",
                          // borderBottom: "1px dotted var(--secondary-color)",
                        }}
                      >
                        <FlightIcon
                          style={{
                            color: "var(--primary-color)",
                            transform: "rotate(90deg)",
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--gray)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "10px",
                            md: "12px",
                          },
                        }}
                      >
                        {segment.length > 0
                          ? `${segment.length} stop`
                          : "Nonstop"}
                      </Typography>
                    </Box>
                  </Grid>
                  {/* //todo: third section */}
                  <Grid md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "30%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ width: "50px", height: "50px" }}>
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment?.marketingcareer}.png`}
                            className={`${flightData?.system?.toLowerCase()}`}
                            alt={`${segment?.marketingcareer || "Image"}`}
                          />
                        </Box>
                        <Tooltip title={`${segment?.marketingcareerName}`}>
                          <Typography
                            sx={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            {segment?.marketingcareer}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <Box
                        sx={{
                          width: "70%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            width: "100%",
                            color: "var(--secondary-color)",
                            fontWeight: "600",
                          }}
                        >{`${segment?.arrival || "empty"} ${
                          segment?.arrivalTime
                            ? format(new Date(segment?.arrivalTime), "hh:mm")
                            : "empty"
                        }`}</Typography>
                        <Tooltip title={`${segment.arrivalAirport}`}>
                          <Typography
                            sx={{
                              width: "100%",
                              cursor: "pointer",
                              color: "var(--mateBlack)",
                            }}
                            noWrap
                          >{`${segment.arrivalAirport || "empty"}`}</Typography>
                        </Tooltip>
                        <Typography
                          sx={{ width: "100%", fontSize: "14px" }}
                        >{`${
                          segment.arrivalTime
                            ? format(
                                new Date(segment.arrivalTime),
                                "MMM dd,EEE"
                              )
                            : "empty"
                        }`}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default FlightDetails;
