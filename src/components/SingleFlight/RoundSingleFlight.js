import {
  Button,
  Collapse,
  Grid,
  SwipeableDrawer,
  Tab,
  Tabs,
  // ToggleButton,
  // ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import seat1 from "../../images/Icon/bag.svg";
import bag from "../../images/Icon/seat.svg";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import toimg from "../../images/Icon/to.svg";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import FlightIcon from "@mui/icons-material/Flight";
import commaNumber from "comma-number";
import { format } from "date-fns";
import secureLocalStorage from "react-secure-storage";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WorkIcon from "@mui/icons-material/Work";

import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import "./SingleFlight.css";

const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: selectedColor,
  },
}));

const HtmlTooltip = styled(({ className, ...propss }) => (
  <Tooltip {...propss} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--gary)",
    maxWidth: 220,
    fontSize: "5px",
    padding: "10px",
  },
}));
const RoundSingleFlight = (props) => {
  const [value, setValue] = useState("1");
  const [flightDetails, setFlightDetails] = useState(false);
  const [allFlights, setAllFlight] = useState(true);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [toggleBtn, setToggleBtn] = useState("depart");
  const handleChangeToggleBtn = (event, newValue) => {
    setToggleBtn(newValue);
  };

  const {
    backarrival,
    backarrivalDate,
    backarrivalTime,
    backdeparture,
    backdepartureDate,
    backdepartureTime,
    backflightduration,
    bags,
    career,
    careerName,
    goarrival,
    goarrivalDate,
    goarrivalTime,
    godeparture,
    godepartureDate,
    godepartureTime,
    goflightduration,
    refundable,
    price,
    Taxes,
    seat,
    segment,
    segments,
    stop,
    system,
    transit,
    bookingcode,
    BasePrice,
    pricebreakdown,
  } = props.roundData;
  console.log(props.roundData);

  const {
    adultCount,
    childCount,
    infant,
    agentFarePrice,
    setAgentFarePrice,
    commisionFarePrice,
    setCommisionFarePrice,
    customerFare,
    setCustomerFare,
  } = props;

  //todo:CF AF CM variable are here
  const [toggledrawer, setToggledrawer] = useState(false);
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const commissionData = secureLocalStorage.getItem("commissionData");
  const clientPrice = Math.round(
    parseInt(props.roundData.clientPrice || props.roundData.baseprice)
  );
  const percentRate = parseInt(7) / 100;
  const clientFare = parseInt(clientPrice);
  const agentFare = Math.round(parseInt(price));
  const commission = Math.round(clientFare - agentFare);
  //todo:end of CM AF CM variables
  //todo: booking functional work here
  const RoundTripFlightInfo = () => {
    system === "Sabre"
      ? navigate("/roundflightinformation", {
          state: {
            roundData: props.roundData,
            adultCount: props.adultCount,
            childCount: props.childCount,
            infant: props.infant,
            tripType: props.tripType,
            clientFare,
          },
        })
      : system === "Galileo"
      ? navigate("/roundflightinformation", {
          state: {
            roundData: props.roundData,
            adultCount: props.adultCount,
            childCount: props.childCount,
            infant: props.infant,
            tripType: props.tripType,
            clientFare,
          },
        })
      : navigate("/roundflightinformation", {
          state: {
            roundData: props.roundData,
            adultCount: props.adultCount,
            childCount: props.childCount,
            infant: props.infant,
            tripType: props.tripType,
            clientFare,
          },
        });
  };

  return (
    <Box
      mb={2.5}
      style={{
        overflow: "hidden",
        boxShadow:
          "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",

        borderRadius: "10px",
      }}
    >
      {/* //todo: Desktop Design Section */}
      <Grid container>
        <Grid
          item
          xs={12}
          sm={7.5}
          md={9.5}
          p={{ sm: 2, md: "15px 10px 15px 15px" }}
          // sx={{
          //   transition: "all .5s ease-in-out",
          //   borderRadius: "10px 0 0 10px",
          //   border: "2px solid var(--gray)",
          //   borderRight: "0px",
          // }}
        >
          {/* Go Start  */}

          <Grid container justifyContent={"space-between"}>
            {/* //todo:one */}

            <Grid xs={6} sm={6} md={2}>
              <Box>
                <img
                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                  className={`${system?.toLowerCase()}`}
                  alt={`${career}`}
                  width="60px"
                  height="60px"
                />

                <Tooltip title={`${segments?.go[0]?.marketingcareerName}`}>
                  <Typography
                    fontSize={{ sm: "12px", md: "13px" }}
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${segments?.go[0]?.marketingcareerName}`}</Typography>
                </Tooltip>
                <Typography>
                  {refundable === "Refundable" ? (
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: { sm: "12px", md: "12px" },
                      }}
                    >
                      Refundable
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "var(--red)",
                        fontSize: { sm: "12px", md: "12px" },
                      }}
                    >
                      Non Refundable
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} sm={6} md={3.5} px={1}>
              <Box>
                <Typography
                  sx={{
                    color: "var(--text-greencolor)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "15px",
                      lg: "16px",
                    },
                  }}
                >
                  <span style={{ fontSize: "23px" }}>
                    {segments?.go[0]?.departureLocation?.split(" ,")[0]}
                    {", "}
                  </span>
                  <span> {segments?.go[0]?.departure} </span>
                </Typography>

                <Tooltip title={`${segments?.go[0]?.departureAirport}`}>
                  <Typography
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${segments?.go[0]?.departureAirport}`}</Typography>
                </Tooltip>
                <Typography
                  sx={{
                    color: "var(--mateBlack)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "11px",
                      md: "13px",
                    },
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {system === "Galileo"
                      ? `${
                          new Date(godepartureTime)
                            .toTimeString()
                            ?.split(":")[0]
                        }:${
                          new Date(godepartureTime)
                            .toTimeString()
                            ?.split(":")[1]
                        }`
                      : `${godepartureTime?.split(":")[0]}:${
                          godepartureTime?.split(":")[1]
                        }`}
                  </span>
                  {" - "}
                  {godepartureDate}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:two */}
            <Grid
              xs={6}
              sm={6}
              md={3}
              textAlign={"center"}
              margin={{ xs: "10px 0", md: "0" }}
            >
              <Box textAlign={"center"} padding="0px 7px">
                <Typography>
                  {segments?.go?.length === 3 ? (
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--text-greencolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        {segments?.go[0]?.flightduration} |{" "}
                        {segments?.go[1]?.flightduration} |{" "}
                        {segments?.go[2]?.flightduration}
                      </Typography>
                      <Box className="stop-bar-parent">
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <CircleIcon
                          sx={{
                            color: "var(--text-greencolor)",
                            fontSize: "12px",
                          }}
                        />
                        <CircleIcon
                          sx={{
                            color: "var(--text-greencolor)",
                            fontSize: "12px",
                          }}
                        />
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <Box className="stop-bar-line"></Box>
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--third-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        2 STOP
                      </Typography>
                    </Box>
                  ) : segments?.go?.length === 2 ? (
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--text-greencolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        {segments?.go[0]?.flightduration} |{" "}
                        {segments?.go[1]?.flightduration}
                      </Typography>
                      <Box className="stop-bar-parent">
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <CircleIcon
                          sx={{
                            color: "var(--text-greencolor)",
                            fontSize: "12px",
                          }}
                        />
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <Box className="stop-bar-line"></Box>
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--third-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        1 STOP
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--text-greencolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        {segments?.go[0]?.flightduration}
                      </Typography>
                      <Box className="stop-bar-parent">
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <Box className="stop-bar-line"></Box>
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--third-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        NO STOP
                      </Typography>
                    </Box>
                  )}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:Three */}
            <Grid
              xs={6}
              sm={6}
              md={3.5}
              px={1}
              margin={{ xs: "10px 0", md: "0" }}
            >
              <Box textAlign={"end"}>
                <Typography
                  sx={{
                    color: "var(--text-greencolor)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "15px",
                      lg: "16px",
                    },
                  }}
                >
                  <span style={{ fontSize: "23px" }}>
                    {
                      segments?.go[
                        segments?.go?.length - 1
                      ]?.arrivalLocation?.split(" ,")[0]
                    }
                  </span>
                  {", "}
                  <span>
                    {segments?.go[segments?.go?.length - 1]?.arrival}{" "}
                  </span>
                </Typography>
                <Tooltip
                  title={`${
                    segments?.go[segments?.go?.length - 1]?.arrivalAirport
                  }`}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${
                    segments?.go[segments?.go?.length - 1]?.arrivalAirport
                  }`}</Typography>
                </Tooltip>

                <Typography
                  sx={{
                    color: "var(--mateBlack)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "11px",
                      md: "13px",
                    },
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {system === "Galileo"
                      ? `${
                          new Date(goarrivalTime).toTimeString()?.split(":")[0]
                        }:${
                          new Date(goarrivalTime).toTimeString()?.split(":")[1]
                        }`
                      : `${goarrivalTime?.split(":")[0]}:${
                          goarrivalTime?.split(":")[1]
                        }`}
                  </span>
                  {" - "}
                  {goarrivalDate}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:Four */}
          </Grid>

          {/* Go End */}

          <Grid container justifyContent={"space-between"}>
            {/* //todo:one */}

            <Grid xs={6} sm={6} md={2}>
              <Box>
                <img
                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                  className={`${system?.toLowerCase()}`}
                  alt={`${career}`}
                  width="60px"
                  height="60px"
                />

                <Tooltip title={`${segments?.back[0]?.marketingcareerName}`}>
                  <Typography
                    fontSize={{ sm: "12px", md: "13px" }}
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${segments?.back[0]?.marketingcareerName}`}</Typography>
                </Tooltip>
                <Typography>
                  {refundable === "Refundable" ? (
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: { sm: "12px", md: "12px" },
                      }}
                    >
                      Refundable
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "var(--red)",
                        fontSize: { sm: "12px", md: "12px" },
                      }}
                    >
                      Non Refundable
                    </Typography>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={6} sm={6} md={3.5} px={1}>
              <Box>
                <Typography
                  sx={{
                    color: "var(--text-greencolor)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "15px",
                      lg: "16px",
                    },
                  }}
                >
                  <span style={{ fontSize: "23px" }}>
                    {segments?.back[0]?.departureLocation?.split(" ,")[0]}
                    {", "}
                  </span>
                  <span>{segments?.back[0]?.departure} </span>
                </Typography>

                <Tooltip title={`${segments?.back[0]?.departureAirport}`}>
                  <Typography
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${segments?.back[0]?.departureAirport}`}</Typography>
                </Tooltip>
                <Typography
                  sx={{
                    color: "var(--mateBlack)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "11px",
                      md: "13px",
                    },
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {system === "Galileo"
                      ? `${
                          new Date(backdepartureTime)
                            .toTimeString()
                            ?.split(":")[0]
                        }:${
                          new Date(backdepartureTime)
                            .toTimeString()
                            ?.split(":")[1]
                        }`
                      : `${backdepartureTime?.split(":")[0]}:${
                          backdepartureTime?.split(":")[1]
                        }`}
                  </span>
                  {" - "}
                  {backdepartureDate}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:two */}
            <Grid
              xs={6}
              sm={6}
              md={3}
              textAlign={"center"}
              margin={{ xs: "10px 0", md: "0" }}
            >
              <Box textAlign={"center"} padding="0px 7px">
                <Typography>
                  {segments?.back?.length === 3 ? (
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--text-greencolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        {segments?.back[0]?.flightduration} |{" "}
                        {segments?.back[1]?.flightduration} |{" "}
                        {segments?.back[2]?.flightduration}
                      </Typography>
                      <Box className="stop-bar-parent">
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <CircleIcon
                          sx={{
                            color: "var(--text-greencolor)",
                            fontSize: "12px",
                          }}
                        />
                        <CircleIcon
                          sx={{
                            color: "var(--text-greencolor)",
                            fontSize: "12px",
                          }}
                        />
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <Box className="stop-bar-line"></Box>
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--third-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        2 STOP
                      </Typography>
                    </Box>
                  ) : segments?.back?.length === 2 ? (
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--text-greencolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        {segments?.back[0]?.flightduration} |{" "}
                        {segments?.back[1]?.flightduration}
                      </Typography>
                      <Box className="stop-bar-parent">
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <CircleIcon
                          sx={{
                            color: "var(--text-greencolor)",
                            fontSize: "12px",
                          }}
                        />
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <Box className="stop-bar-line"></Box>
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--third-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        1 STOP
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        sx={{
                          color: "var(--text-greencolor)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        {segments?.back[0]?.flightduration}
                      </Typography>
                      <Box className="stop-bar-parent">
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                        <Box className="stop-bar-line"></Box>
                        <CircleIcon
                          sx={{ color: "var(--gary)", fontSize: "15px" }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: "var(--third-color)",
                          fontWeight: 500,
                          fontSize: {
                            xs: "12px",
                            sm: "12px",
                            md: "12px",
                          },
                        }}
                      >
                        NO STOP
                      </Typography>
                    </Box>
                  )}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:Three */}
            <Grid
              xs={6}
              sm={6}
              md={3.5}
              margin={{ xs: "10px 0", md: "0" }}
              px={1}
            >
              <Box textAlign={"end"}>
                <Typography
                  sx={{
                    color: "var(--text-greencolor)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "15px",
                      lg: "16px",
                    },
                  }}
                >
                  <span style={{ fontSize: "23px" }}>
                    {
                      segments?.back[
                        segments?.back?.length - 1
                      ]?.arrivalLocation?.split(" ,")[0]
                    }
                  </span>
                  {", "}
                  <span>
                    {segments?.back[segments?.back?.length - 1]?.arrival}{" "}
                  </span>
                </Typography>
                <Tooltip
                  title={`${
                    segments?.back[segments?.back?.length - 1]?.arrivalAirport
                  }`}
                >
                  <Typography
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${
                    segments?.back[segments?.back?.length - 1]?.arrivalAirport
                  }`}</Typography>
                </Tooltip>

                <Typography
                  sx={{
                    color: "var(--mateBlack)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "11px",
                      md: "13px",
                    },
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {system === "Galileo"
                      ? `${
                          new Date(backarrivalTime)
                            .toTimeString()
                            ?.split(":")[0]
                        }:${
                          new Date(backarrivalTime)
                            .toTimeString()
                            ?.split(":")[1]
                        }`
                      : `${backarrivalTime?.split(":")[0]}:${
                          backarrivalTime?.split(":")[1]
                        }`}
                  </span>
                  {" - "}
                  {backarrivalDate}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} px={1}>
              <Box textAlign="end">
                <Typography
                  sx={{
                    textAlign: "end",
                    color: "var(--primary-color)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "14px",
                    },
                  }}
                >
                  Seat: {seat || 9}&nbsp;&nbsp; Baggage:{" "}
                  {bags === "3" || bags === "2" || bags === "1" ? (
                    <>{bags?.split(" ")[0]} Piece</>
                  ) : bags === " " ? (
                    <>0 Kg</>
                  ) : (
                    <>{bags?.slice(0, 2) || 0} Kg</>
                  )}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:Four */}
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sm={2.5}
          md={2.5}
          // bgcolor="var(--white)"
          p={{ sm: 2, md: 2 }}
          sx={{
            // transition: "all .5s ease-in-out",
            // borderRadius: "0 10px 10px 0",
            // border: "2px solid var(--gray)",
            borderLeft: "2px dashed var(--gray)",
          }}
        >
          <Box textAlign="end" mt={{ sm: 1, md: 1 }}>
            <Typography
              style={{
                fontSize: "18px",
                color: "var(--secondary-color)",
                fontWeight: "bold",
              }}
            >
              BDT {commaNumber(agentFare)}
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
                color: "var(--third-color)",
                textDecoration: "line-through",
                fontWeight: "bold",
              }}
            >
              BDT {commaNumber(clientFare)}
            </Typography>
          </Box>

          <Box textAlign="end" mt={{ sm: 1, md: 10 }}>
            <Button
              className="shine-effect"
              style={{
                color: "var(--white)",
                fontWeight: 600,
                backgroundColor: "var(--primary-color)",
                borderRadius: "5px",
              }}
              disabled
              // disabled={system === "Galileo" ? true : false}
              onClick={RoundTripFlightInfo}
            >
              BOOK NOW
            </Button>
            {["right"].map((anchor) => (
              <Box key={anchor}>
                <Button
                  size="small"
                  onClick={toggleDrawer(anchor, true)}
                  style={{
                    marginTop: "8px",
                    color: "var(--text-greencolor)",
                    fontWeight: 600,
                    width: "fit-content",
                    paddingRight: "0px",
                    fontSize: "12px",
                  }}
                >
                  Show Details
                  <ArrowDropDownIcon
                    style={{ width: "fit-content", rotate: "90deg" }}
                  />
                </Button>
                {/* ----new start flight details */}

                <SwipeableDrawer
                  style={{ margin: "0px", padding: "0px" }}
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  <Box
                    bgcolor="var(--drawer-bgcolor)"
                    style={{ width: "50vw" }}
                  >
                    <Box sx={{ marginTop: "30px" }}>
                      <Box margin="0 30px 30px 30px">
                        <Typography style={{ color: "var(--text-greencolor)" }}>
                          Flight Details Result
                        </Typography>
                        <Typography>
                          Return Flight <span>|</span>{" "}
                          {adultCount > 0 && `Adult(${adultCount})`}
                          {childCount > 0 && `Children(${childCount})`}
                          {infant > 0 && `Infant(${infant})`} <span>|</span>{" "}
                          {format(new Date(godepartureDate), "dd MMM yyyy")}
                          {" - "}
                          {format(new Date(goarrivalDate), "dd MMM yyyy")}
                          {" || "}
                          {format(new Date(backdepartureDate), "dd MMM yyyy")}
                          {" - "}
                          {format(new Date(backarrivalDate), "dd MMM yyyy")}
                        </Typography>
                        <Typography>
                          ({godeparture}
                          {" - "}
                          {goarrival}){" || "}({goarrival}
                          {" - "}
                          {godeparture})
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            backgroundColor: "var(--primary-color)",
                            padding: "4px",
                            color: "var(--white)",
                            fontWeight: 600,
                            width: { xs: "100%", sm: "30%", md: "20%" },
                            textAlign: "center",
                          }}
                        >
                          Flight Details
                        </Typography>

                        <Box margin={{ xs: "15px", md: "0 3vw 3vw 3vw" }}>
                          <Box textAlign={"right"} mb={1}>
                            <ToggleButtonGroup
                              value={toggleBtn}
                              size="small"
                              exclusive
                              onChange={handleChangeToggleBtn}
                              aria-label="Platform"
                            >
                              <ToggleButton
                                value="depart"
                                selectedColor="var(--primary-color)"
                              >
                                Depart
                              </ToggleButton>
                              <ToggleButton
                                value="return"
                                selectedColor="var(--primary-color)"
                              >
                                Return
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Box>
                          {toggleBtn === "depart" ? (
                            <Box bgcolor="var(--white)" padding="8px 20px">
                              <Grid
                                container
                                justifyContent="space-between"
                                borderBottom="2px solid var(--text-greencolor)"
                              >
                                <Grid item>
                                  <Typography
                                    sx={{
                                      color: "var(--black)",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Depart:{" "}
                                    <span
                                      style={{
                                        color: "var(--text-greencolor)",
                                      }}
                                    >
                                      {godepartureDate}
                                    </span>{" "}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--text-greencolor)",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {segment === 1 ? (
                                      <>Non</>
                                    ) : (
                                      <>{segment - 1} </>
                                    )}
                                    Stop {goflightduration}{" "}
                                    <span
                                      style={{
                                        color: "var(--gray)",
                                      }}
                                    >
                                      {segments?.go?.map((data) => (
                                        <>
                                          {system === "Sabre" ? (
                                            data?.marketingcareer !==
                                            data?.operatingcareer ? (
                                              <>
                                                Operated By:{" "}
                                                {data?.operatingCarrierName}
                                              </>
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ))}
                                    </span>
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  {
                                    segments?.go[0]?.departureLocation?.split(
                                      ","
                                    )[0]
                                  }
                                  {" - "}
                                  {
                                    segments?.go?.[
                                      segments?.go?.length - 1
                                    ]?.arrivalLocation?.split(",")[0]
                                  }{" "}
                                </Grid>
                              </Grid>

                              {segments?.go?.map((data, i, arr) => (
                                <Box my={2}>
                                  <Grid container spacing={2}>
                                    <Grid item sm={6} md={2.5}>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.marketingcareer}.png`}
                                          alt="flight logo"
                                          width="50px"
                                          height="50px"
                                        />
                                      </Box>
                                      <Typography
                                        sx={{
                                          color: "var(--text-greencolor)",
                                          fontWeight: 500,
                                          fontSize: "12px",
                                        }}
                                      >
                                        {data?.marketingcareerName}
                                        <br />
                                        <span
                                          style={{
                                            color:
                                              "var(--flight-details-fontcolor)",
                                          }}
                                        >
                                          {data?.marketingcareer}{" "}
                                          {data?.marketingflight} & Economy
                                        </span>
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={3.5}>
                                      <Typography>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "23px",
                                          }}
                                        >
                                          {
                                            data?.departureLocation?.split(
                                              " ,"
                                            )[0]
                                          }
                                          ,{" "}
                                        </span>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.departure}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color: "var(--mateBlack)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.departureAirport}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color:
                                              "var(--flight-details-fontcolor)",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {format(
                                            new Date(
                                              data?.departureTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </span>
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={2.5} margin="auto">
                                      <Box textAlign="center">
                                        <Typography
                                          sx={{
                                            color: "var(--secondary-color)",
                                            fontWeight: 500,
                                            fontSize: {
                                              xs: "12px",
                                              xs: "15px",
                                              md: "12px",
                                            },
                                          }}
                                        >
                                          {data?.flightduration}
                                        </Typography>
                                        <Box className="stop-bar-parent">
                                          <CircleIcon
                                            sx={{
                                              color: "var(--gary)",
                                              fontSize: "15px",
                                            }}
                                          />
                                          <Box className="stop-bar-line-details"></Box>
                                          <CircleIcon
                                            sx={{
                                              color: "var(--gary)",
                                              fontSize: "15px",
                                            }}
                                          />
                                        </Box>
                                      </Box>
                                    </Grid>
                                    <Grid item sm={6} md={3.5}>
                                      <Typography>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "23px",
                                          }}
                                        >
                                          {
                                            data?.arrivalLocation?.split(
                                              " ,"
                                            )[0]
                                          }
                                          ,{" "}
                                        </span>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.arrival}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color: "var(--mateBlack)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.arrivalAirport}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color:
                                              "var(--flight-details-fontcolor)",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {format(
                                            new Date(
                                              data?.arrivalTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </span>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                            </Box>
                          ) : (
                            <Box bgcolor="var(--white)" padding="8px 20px">
                              <Grid
                                container
                                justifyContent="space-between"
                                borderBottom="2px solid var(--text-greencolor)"
                              >
                                <Grid item>
                                  <Typography
                                    sx={{
                                      color: "var(--black)",
                                      fontSize: "14px",
                                    }}
                                  >
                                    Return:{" "}
                                    <span
                                      style={{
                                        color: "var(--text-greencolor)",
                                      }}
                                    >
                                      {backdepartureDate}
                                    </span>{" "}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "var(--text-greencolor)",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {segment === 1 ? (
                                      <>Non</>
                                    ) : (
                                      <>{segment - 1} </>
                                    )}
                                    Stop {backflightduration}{" "}
                                    <span
                                      style={{
                                        color: "var(--gray)",
                                      }}
                                    >
                                      {segments?.back?.map((data) => (
                                        <>
                                          {system === "Sabre" ? (
                                            data?.marketingcareer !==
                                            data?.operatingcareer ? (
                                              <>
                                                Operated By:{" "}
                                                {data?.operatingCarrierName}
                                              </>
                                            ) : (
                                              ""
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      ))}
                                    </span>
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  {
                                    segments?.back[0]?.departureLocation?.split(
                                      ","
                                    )[0]
                                  }
                                  {" - "}
                                  {
                                    segments?.back?.[
                                      segments?.back?.length - 1
                                    ]?.arrivalLocation?.split(",")[0]
                                  }{" "}
                                </Grid>
                              </Grid>

                              {segments?.back?.map((data, i, arr) => (
                                <Box my={2}>
                                  <Grid container spacing={2}>
                                    <Grid item sm={6} md={2.5}>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.marketingcareer}.png`}
                                          alt="flight loback"
                                          width="50px"
                                          height="50px"
                                        />
                                      </Box>
                                      <Typography
                                        sx={{
                                          color: "var(--text-greencolor)",
                                          fontWeight: 500,
                                          fontSize: "12px",
                                        }}
                                      >
                                        {data?.marketingcareerName}
                                        <br />
                                        <span
                                          style={{
                                            color:
                                              "var(--flight-details-fontcolor)",
                                          }}
                                        >
                                          {data?.marketingcareer}{" "}
                                          {data?.marketingflight} & Economy
                                        </span>
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={3.5}>
                                      <Typography>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "23px",
                                          }}
                                        >
                                          {
                                            data?.departureLocation?.split(
                                              " ,"
                                            )[0]
                                          }
                                          ,{" "}
                                        </span>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.departure}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color: "var(--mateBlack)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.departureAirport}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color:
                                              "var(--flight-details-fontcolor)",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {format(
                                            new Date(
                                              data?.departureTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </span>
                                      </Typography>
                                    </Grid>
                                    <Grid item sm={6} md={2.5} margin="auto">
                                      <Box textAlign="center">
                                        <Typography
                                          sx={{
                                            color: "var(--secondary-color)",
                                            fontWeight: 500,
                                            fontSize: {
                                              xs: "12px",
                                              sm: "15px",
                                              md: "12px",
                                            },
                                          }}
                                        >
                                          {data?.flightduration}
                                        </Typography>
                                        <Box className="stop-bar-parent">
                                          <CircleIcon
                                            sx={{
                                              color: "var(--gary)",
                                              fontSize: "15px",
                                            }}
                                          />
                                          <Box className="stop-bar-line-details"></Box>
                                          <CircleIcon
                                            sx={{
                                              color: "var(--gary)",
                                              fontSize: "15px",
                                            }}
                                          />
                                        </Box>
                                      </Box>
                                    </Grid>
                                    <Grid item sm={6} md={3.5}>
                                      <Typography>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "23px",
                                          }}
                                        >
                                          {
                                            data?.arrivalLocation?.split(
                                              " ,"
                                            )[0]
                                          }
                                          ,{" "}
                                        </span>
                                        <span
                                          style={{
                                            color: "var(--text-greencolor)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.arrival}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color: "var(--mateBlack)",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {data?.arrivalAirport}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            color:
                                              "var(--flight-details-fontcolor)",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {format(
                                            new Date(
                                              data?.arrivalTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </span>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            backgroundColor: "var(--primary-color)",
                            padding: "4px",
                            color: "var(--white)",
                            fontWeight: 600,
                            width: { xs: "100%", sm: "30%", md: "20%" },
                            textAlign: "center",
                          }}
                        >
                          Baggage
                        </Typography>
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "3vw" }}
                        >
                          <Box className="flight-search-table">
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                              }}
                            >
                              <tr>
                                <th>Baggage</th>
                                <th>Check-In</th>
                                <th>Cabin</th>
                              </tr>

                              <tr>
                                <td>Adult</td>
                                <td>
                                  {bags === "3" ||
                                  bags === "2" ||
                                  bags === "1" ? (
                                    <>{bags?.split(" | ")[0]} Piece</>
                                  ) : bags === " " ? (
                                    <>0 Kg</>
                                  ) : bags?.length === 6 ? (
                                    <>{bags?.slice(2, 4) || 0} Kg </>
                                  ) : (
                                    <>{bags?.slice(0, 2) || 0} Kg</>
                                  )}
                                </td>
                                <td>{props?.roundData?.class || "Economy"}</td>
                              </tr>
                              {childCount > 0 && (
                                <tr>
                                  <td>Child</td>
                                  <td>
                                    {bags === "3" ||
                                    bags === "2" ||
                                    bags === "1" ? (
                                      <>{bags?.split(" | ")[0]} Piece</>
                                    ) : bags === " " ? (
                                      <>0 Kg</>
                                    ) : bags?.length === 6 ? (
                                      <>{bags?.slice(2, 4) || 0} Kg </>
                                    ) : (
                                      <>{bags?.slice(0, 2) || 0} Kg</>
                                    )}
                                  </td>
                                  <td>{props.roundData?.class || "Economy"}</td>
                                </tr>
                              )}
                              {infant > 0 && (
                                <tr>
                                  <td>Infant</td>
                                  <td>
                                    {bags === "3" ||
                                    bags === "2" ||
                                    bags === "1" ? (
                                      <>{bags?.split(" | ")[0]} Piece</>
                                    ) : bags === " " ? (
                                      <>0 Kg</>
                                    ) : bags?.length === 6 ? (
                                      <>{bags?.slice(2, 4) || 0} Kg </>
                                    ) : (
                                      <>{bags?.slice(0, 2) || 0} Kg</>
                                    )}
                                  </td>
                                  <td>{props.roundData?.class || "Economy"}</td>
                                </tr>
                              )}
                            </table>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            backgroundColor: "var(--primary-color)",
                            padding: "4px",
                            color: "var(--white)",
                            fontWeight: 600,
                            width: { xs: "100%", sm: "30%", md: "20%" },
                            textAlign: "center",
                          }}
                        >
                          Price Breakdown{" "}
                        </Typography>
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "3vw" }}
                          className="flight-search-table"
                        >
                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                            }}
                          >
                            <tr>
                              <th>Pax Type</th>
                              <th>Base Fare</th>
                              <th>Tax + Fees</th>
                              <th>Per Passenger</th>
                              <th>Total Cost</th>
                            </tr>
                            {pricebreakdown?.map((data) => (
                              <tr>
                                <td>
                                  BDT{" "}
                                  {data.PaxType === "ADT"
                                    ? "Adult"
                                    : data.PaxType === "CNN"
                                    ? "Child"
                                    : "Infant"}
                                </td>
                                <td>BDT {commaNumber(data.BaseFare)}</td>
                                <td>
                                  BDT{" "}
                                  {commaNumber(
                                    parseInt(data.Tax) +
                                      parseInt(data.ServiceFee)
                                  )}
                                </td>

                                <td>
                                  BDT ({commaNumber(data.BaseFare)}
                                  {" * "}
                                  {data.PaxCount})
                                </td>

                                <td>
                                  BDT{" "}
                                  {commaNumber(
                                    (parseInt(data?.BaseFare) +
                                      parseInt(data?.Tax) +
                                      parseInt(data?.ServiceFee)) *
                                      parseInt(data?.PaxCount)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </table>
                          <Grid
                            container
                            justifyContent="space-between"
                            padding="20px"
                          >
                            <Grid item>
                              <Typography
                                mb="5px"
                                sx={{
                                  color: "var(--black)",
                                  fontSize: "12px",
                                }}
                              >
                                Total ({" "}
                                {pricebreakdown.length === 3 ? (
                                  <>
                                    {parseInt(pricebreakdown[0]?.PaxCount) +
                                      parseInt(pricebreakdown[1]?.PaxCount) +
                                      parseInt(pricebreakdown[2]?.PaxCount)}
                                  </>
                                ) : pricebreakdown?.length === 2 ? (
                                  <>
                                    {parseInt(pricebreakdown[0]?.PaxCount) +
                                      parseInt(pricebreakdown[1]?.PaxCount)}
                                  </>
                                ) : (
                                  <>{parseInt(pricebreakdown[0]?.PaxCount)}</>
                                )}{" "}
                                Traveler)
                              </Typography>
                              <Typography
                                sx={{
                                  color: "var(--total-text-color)",
                                  fontSize: "12px",
                                }}
                              >
                                Commission & Your Saving{" "}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                sx={{
                                  color: "var(--black)",
                                  fontSize: "12px",
                                }}
                              >
                                BDT {clientPrice}
                              </Typography>

                              <Typography
                                sx={{
                                  color: "var(--total-text-color)",
                                  fontSize: "12px",
                                }}
                              >
                                BDT {commission}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            bgcolor="var(--primary-color)"
                            padding="8px 20px"
                          >
                            <Typography color="var(--white)" fontSize="13px">
                              Total Payable
                            </Typography>
                            <Typography color="var(--white)" fontSize="13px">
                              BDT {price}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            backgroundColor: "var(--primary-color)",
                            padding: "4px",
                            color: "var(--white)",
                            fontWeight: 600,
                            width: { xs: "100%", sm: "30%", md: "20%" },
                            textAlign: "center",
                          }}
                        >
                          Fare Policy{" "}
                        </Typography>
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "3vw" }}
                        >
                          <Typography
                            sx={{
                              color: "var(--flight-details-fontcolor)",
                              fontSize: "12px",
                              fontWeight: 500,
                              padding: "20px",
                            }}
                          >
                            Pay attention to the following notifications in the
                            CANCELLATIONS section:
                            <br />
                            <br />
                            TICKET IS NON-REFUNDABLE — the ticket is
                            non-refundable;
                            <br />
                            TICKET IS NON-REFUNDABLE FOR CANCEL/REFUND — the
                            ticket is non-refundable;
                            <br />
                            REFUND IS NOT PERMITTED — the ticket is
                            non-refundable;
                            <br />
                            ANY TIME TICKET IS NON-REFUNDABLE — the ticket is
                            non-refundable;
                            <br />
                            TICKET IS NON-REFUNDABLE IN CASE OF NO-SHOW — the
                            ticket cannot be refunded in case of no-show.
                            <br />
                            Change rules are described in the section with the
                            CHANGES subtitle.
                            <br />
                            <br />
                            The CHANGES ARE NOT PERMITTED line means that you
                            cannot make any changes and in such a case, you are
                            not allowed to change the date/time/route of the
                            flight.
                          </Typography>
                        </Box>
                      </Box>

                      {/* -------new end */}
                    </Box>
                  </Box>
                </SwipeableDrawer>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      {/* //todo: Desktop Desing Section */}
    </Box>
  );
};

export default RoundSingleFlight;
