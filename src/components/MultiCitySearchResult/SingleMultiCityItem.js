import React, { useState } from "react";
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
  Button,
  Collapse,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import seat from "../../images/Icon/seat.svg";
import bag from "../../images/Icon/bag.svg";
import { useNavigate } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WorkIcon from "@mui/icons-material/Work";
import { format } from "date-fns";
import "./SingleMultiCityItem.css";
import FlightDetails from "../FlightDetails/FlightDetails";
import FareDetails from "../FareDetails/FareDetails";
import FarePolicy from "../FarePolicy/FarePolicy";
import Baggage from "../Baggage/Baggage";
import CommissionInvoice from "../CommissionInvoice/CommissionInvoice";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "crimson",
    maxWidth: 220,
    fontSize: "5px",
    borderRadius: "8px 0px 8px 0px",
  },
}));

const SingleMultiCityItem = ({
  flightData,
  adultCount,
  childCount,
  infant,
  to,
  from,
  tripType,
  fromAddress,
  toAddress,
  dDate,
  agentFarePrice,
  setAgentFarePrice,
  commisionFarePrice,
  setCommisionFarePrice,
  customerFare,
  setCustomerFare,
  isLoaded,
}) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [flightDetails, setFlightDetails] = useState(false);
  const clientPrice = parseInt(
    flightData.system !== "Galileo" ? flightData.clientPrice : flightData.price
  );
  // const percentRate = parseInt(commissionData.defaultCommissionRate) / 100;
  const clientFare = Math.round(clientPrice);
  const agentFare = Math.round(
    parseInt(
      flightData.system !== "Galileo"
        ? flightData.agentprice || flightData.BasePrice
        : flightData.agentprice || flightData.BasePrice
    )
  );
  const commission = Math.round(clientFare - agentFare);

  const navigate = useNavigate();
  const FlightInformation = () => {
    flightData?.system === "Sabre"
      ? navigate("/flightinformation", {
          state: {
            flightData,
            adultCount,
            childCount,
            infant,
            to,
            from,
            tripType,
            fromAddress,
            toAddress,
            dDate,
            clientFare,
            agentFare,
            commission,
          },
        })
      : flightData.system === "Galileo"
      ? navigate("/flightinformation", {
          state: {
            flightData,
            adultCount,
            childCount,
            infant,
            to,
            from,
            tripType,
            fromAddress,
            toAddress,
            dDate,
            clientFare,
            agentFare,
            commission,
          },
        })
      : navigate("/flightinformation", {
          state: {
            flightData,
            adultCount,
            childCount,
            infant,
            to,
            from,
            tripType,
            fromAddress,
            toAddress,
            dDate,
            clientFare,
            agentFare,
            commission,
          },
        });
  };

  let calParcent = (num, percentage) => {
    const result = num * (percentage / 100);
    return parseFloat(result.toFixed(0));
  };
  let percntVal = calParcent(parseInt(flightData.price), 7);

  const offerPrice = parseInt(flightData.price) + parseInt(percntVal);
  const paxCount = adultCount + childCount + infant;
  let count = [];
  for (let i = 0; i < paxCount; i++) {
    count.push(i);
  }
  // //console.log(flightData);
  //todo: calculate total flight duration
  const calDuration = (arr) => {
    const timeArr = arr.map((item) => item.flightduration);
    const convertTime = timeArr.map(
      (item) =>
        parseInt(item.split(" ")[0]) * 3600 * 1000 +
        parseInt(item.split(" ")[1]) * 60 * 1000
    );
    const milliseconds = convertTime.reduce((cur, acc) => cur + acc, 0);
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${hours.toString().padStart(2, 0)}H:${minutes
      .toString()
      .padStart(2, 0)}Min`;
  };
  return (
    <Box>
      <Grid
        container
        sx={{
          transition: "all .5s ease-in-out",
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          marginBottom: "10px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <Grid container sm={8} md={10} padding="15px 15px 0px 15px">
          <Grid item md={12} sm={12}>
            {flightData.segments.map((segment, i, arr) => (
              <Grid container height="100px">
                {/* //todo: first section */}
                <Grid item md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      gap: "10px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "30%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <Box sx={{ width: "50px", height: "50px" }}>
                        <img
                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment[0]?.marketingcareer}.png`}
                          className={`${flightData?.system?.toLowerCase()}`}
                          alt={`${segment[0]?.marketingcareer}`}
                        />
                      </Box>
                      <Tooltip title={`${segment[0].marketingcareerName}`}>
                        <Typography
                          sx={{
                            color: "var(--secondary-color)",
                            fontWeight: 500,
                            fontSize: {
                              xs: "14px",
                              sm: "14px",
                              md: "14px",
                              cursor: "pointer",
                            },
                            width: "100%",
                          }}
                          noWrap
                        >{`${segment[0].marketingcareerName}`}</Typography>
                      </Tooltip>
                      <Tooltip
                        title={`${segment[0].marketingcareer} ${segment[0].marketingflight} & ${segment[0].bookingcode}`}
                      >
                        <Typography
                          sx={{
                            color: "var(--black)",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "12px",
                              cursor: "pointer",
                            },
                          }}
                          noWrap
                        >{`${segment[0].marketingcareer} ${segment[0].marketingflight} & ${segment[0].bookingcode}`}</Typography>
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
                      >{`${segment[0].departure} ${format(
                        new Date(segment[0].departureTime),
                        "hh:mm"
                      )}`}</Typography>
                      <Tooltip title={`${segment[0].departureAirport}`}>
                        <Typography
                          sx={{
                            width: "100%",
                            cursor: "pointer",
                            color: "var(--mateBlack)",
                          }}
                          noWrap
                        >{`${segment[0].departureAirport}`}</Typography>
                      </Tooltip>
                      <Typography
                        sx={{ width: "100%", fontSize: "14px" }}
                      >{`${format(
                        new Date(segment[0].departureTime),
                        "MMM dd,EE"
                      )}`}</Typography>
                    </Box>
                  </Box>
                </Grid>
                {/* //todo: second section */}
                <Grid item md={2}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FlightIcon
                          style={{
                            color: "var(--primary-color)",
                            transform: "rotate(90deg)",
                          }}
                        />
                      </Box>
                      <Tooltip
                        title={`${segment
                          .map((item) => `${item.flightduration}`)
                          .join("|")}`}
                      >
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
                          {calDuration(segment)}
                        </Typography>
                      </Tooltip>
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
                  </Box>
                </Grid>
                {/* //todo: third section */}
                <Grid item md={4}>
                  <Box
                    sx={{
                      width: "100%",
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
                    >{`${segment[segment.length - 1]?.arrival || "empty"} ${
                      segment[segment.length - 1]?.arrivalTime
                        ? format(
                            new Date(segment[segment.length - 1]?.arrivalTime),
                            "hh:mm"
                          )
                        : "empty"
                    }`}</Typography>
                    <Tooltip
                      title={`${segment[segment.length - 1].arrivalAirport}`}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          cursor: "pointer",
                          color: "var(--mateBlack)",
                        }}
                        noWrap
                      >{`${
                        segment[segment.length - 1].arrivalAirport || "empty"
                      }`}</Typography>
                    </Tooltip>
                    <Typography sx={{ width: "100%", fontSize: "14px" }}>{`${
                      segment[segment.length - 1].arrivalTime
                        ? format(
                            new Date(segment[segment.length - 1].arrivalTime),
                            "MMM dd,EEE"
                          )
                        : "empty"
                    }`}</Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* //todo:Four */}
          <Grid
            item
            md={12}
            style={{
              width: "100%",
              height: "50px",
              marginTop: "15px",
              marginLeft: "-15px",
            }}
          >
            <Grid
              container
              style={{
                width: "80%",
                height: "100%",
                backgroundColor: "rgba(var(--primary-rgb),.5)",
                padding: "10px 0",
              }}
            >
              <Grid md={4}>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "14px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                    width: "100%",
                    height: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {flightData?.refundable === "Refundable"
                    ? "Refundable"
                    : "Non Refundable"}
                </Typography>
              </Grid>
              <Grid md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <WorkIcon style={{ color: "var(--primary-color)" }} />
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                      },
                    }}
                  >
                    {flightData?.bags[0].adultBag}
                  </Typography>
                </Box>
              </Grid>
              <Grid md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontWeight: 500,
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "14px",
                        lg: "16px",
                      },
                    }}
                  >
                    {flightData?.segments[0]?.seat || 9} Seat
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* //todo: left section */}
        <Grid item md={2}>
          <Box
            sx={{
              background: "rgba(var(--secondary-rgb), 0.4)",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                flexDirection: "column",
                padding: "10px",
              }}
            >
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
                  color: "var(--black)",
                  textDecoration: "line-through",
                  fontWeight: "normal",
                }}
              >
                BDT {commaNumber(clientFare)}
              </Typography>
            </Box>
            <Box
              style={{
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
                gap: "5px",
                padding: "0px 10px 10px 0px",
              }}
            >
              <Button
                className="shine-effect"
                style={{
                  color: "var(--white)",
                  fontWeight: 600,
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "5px",
                  width: "fit-content",
                }}
                disabled
                // disabled={flightData?.system === "Galileo" ? true : false}
                onClick={FlightInformation}
              >
                BOOK NOW
              </Button>
              <Button
                style={{
                  color: "var(--secondary-color)",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  width: "fit-content",
                  paddingRight: "0px",
                  fontSize: "12px",
                }}
                onClick={() => setFlightDetails(!flightDetails)}
              >
                {!flightDetails ? (
                  <Typography
                    style={{
                      color: "var(--secondary-color)",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    Show Details
                    <ArrowDropDownIcon style={{ width: "fit-content" }} />
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      color: "var(--secondary-color)",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    Hide Details <ArrowDropUpIcon />
                  </Typography>
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* //TODO:Flight Details start------------ */}
        <Collapse
          in={flightDetails}
          timeout="auto"
          unmountOnExit
          sx={{ width: "100%", marginBottom: "0px" }}
        >
          <Box sx={{ width: "100%", marginTop: "0px" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  background: "var(--secondary-color)",
                  height: { lg: "40px", md: "40px", sm: "40px", xs: "40px" },
                  minHeight: "100%",
                  borderRadius: "0px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: "1",
                  ".MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                    padding: {
                      lg: "0px",
                      md: "0px",
                      sm: "0px 20px",
                      xs: "0px 20px",
                    },
                  },
                  "& button": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                    opacity: "1",
                  },

                  "& button.Mui-selected": {
                    background: "var(--primary-color)",
                    color: "var(--white)",
                    opacity: "1",
                  },
                }}
              >
                <TabList
                  value={value}
                  onChange={handleChange}
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  <Tab label="Flight Details" value="1" />
                  <Tab label="Fare Details" value="2" />
                  <Tab label="Commission & Invoice" value="3" />
                  <Tab label="Fare Policy" value="4" />
                  <Tab label="Baggage" value="5" />
                </TabList>
              </Box>

              {/* //todo:Flight Details */}
              <TabPanel value="1" style={{ padding: "20px" }}>
                <FlightDetails flightData={flightData} />
              </TabPanel>
              {/* //todo:Fare Details */}
              <TabPanel value="2" style={{ padding: "20px" }}>
                <FareDetails flightData={flightData} />
              </TabPanel>
              {/* //todo:Commission and invoice */}
              <TabPanel value="3" style={{ padding: "20px" }}>
                <CommissionInvoice
                  flightData={flightData}
                  clientFare={clientFare}
                  agentFare={agentFare}
                  commission={commission}
                />
              </TabPanel>
              {/* //todo:Fare Policy */}
              <TabPanel value="4" style={{ padding: "20px" }}>
                <FarePolicy flightData={flightData} />
              </TabPanel>
              {/* //todo:Baggage */}
              <TabPanel value="5" style={{ padding: "20px" }}>
                <Baggage flightData={flightData} />
              </TabPanel>
            </TabContext>
          </Box>
        </Collapse>
        {/* //TODO:Flight Details end------------ */}
      </Grid>
    </Box>
  );
};

export default SingleMultiCityItem;
