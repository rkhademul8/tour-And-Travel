/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { Box, Button, Grid, Tab, Tabs, Container } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import seat from "../../images/Icon/seat.svg";
import bag from "../../images/Icon/bag.svg";
import { useNavigate } from "react-router-dom";
import { TabContext, TabPanel } from "@material-ui/lab";
import FlightIcon from "@mui/icons-material/Flight";
import commaNumber from "comma-number";
import secureLocalStorage from "react-secure-storage";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import WorkIcon from "@mui/icons-material/Work";
import { format } from "date-fns";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./SingleFlight.css";
import Transit from "./Transit";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--gray)",
    maxWidth: 300,
    padding: "10px",
  },
}));

const SingleFlight = ({
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
}) => {
  const [value, setValue] = useState("1");
  const [flightDetails, setFlightDetails] = useState(false);
  const [toggledrawer, setToggledrawer] = useState(false);
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const [changeStateSession, setChangeStateSession] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clientPrice = parseInt(
    flightData.system !== "Galileo" ? flightData.clientPrice : flightData.price
  );
  // const percentRate = parseInt(commissionData.defaultCommissionRate) / 100;
  const clientFare = Math.round(clientPrice);
  const agentFare = Math.round(
    parseInt(
      flightData.system !== "Galileo" ? flightData.price : flightData.BasePrice
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
  const PaxCount = adultCount + childCount + infant;
  let count = [];
  for (let i = 0; i < PaxCount; i++) {
    count.push(i);
  }

  // ----   --------Copy form ALL.js end----------
  return (
    <Box
      mb={2.5}
      sx={{
        boxShadow:
          "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",
        borderRadius: "10px",
      }}
    >
      <Grid container>
        <Grid
          xs={12}
          sm={7.5}
          md={9.5}
          p={{ xs: 2, md: "15px 10px 15px 15px" }}
          sx={
            {
              // transition: "all .5s ease-in-out",
              // borderRadius: "10px 0 0 10px",
              // border: "2px solid var(--gray)",
              // borderRight: "0px",
              // boxShadow:
              //   "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }
          }
        >
          <Grid container justifyContent={"space-between"}>
            {/* //todo:one */}

            <Grid xs={6} sm={6} md={2}>
              <Box>
                <img
                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                  className={`${flightData?.system?.toLowerCase()}`}
                  alt={`${flightData.career}`}
                  width="60px"
                  height="60px"
                />

                <Tooltip
                  title={`${flightData?.segments[0]?.marketingcareerName}`}
                >
                  <Typography
                    fontSize={{ sm: "10px", md: "13px" }}
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${flightData?.segments[0]?.marketingcareerName}`}</Typography>
                </Tooltip>
                <Typography>
                  {flightData?.refundable === "Refundable" ? (
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: { sm: "10px", md: "12px" },
                      }}
                    >
                      Refundable
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "var(--red)",
                        fontSize: { sm: "10px", md: "12px" },
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
                    color: "var(--primary-color)",
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
                    {flightData?.segments[0]?.departureLocation?.split(" ,")[0]}
                  </span>
                  {", "}
                  <span>{flightData?.segments[0]?.departure} </span>
                </Typography>

                <Tooltip title={`${flightData?.segments[0]?.departureAirport}`}>
                  <Typography
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color: "var(--mateBlack)",
                    }}
                    noWrap
                  >{`${flightData?.segments[0]?.departureAirport}`}</Typography>
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
                    {flightData?.departureTime.length > 5
                      ? `${
                          new Date(flightData?.departureTime)
                            .toTimeString()
                            ?.split(":")[0]
                        }:${
                          new Date(flightData?.departureTime)
                            .toTimeString()
                            ?.split(":")[1]
                        }`
                      : `${flightData?.departureTime?.split(":")[0]}:${
                          flightData?.departureTime?.split(":")[1]
                        }`}
                  </span>
                  {" - "}
                  {flightData?.departureDate}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:two */}
            <Grid
              xs={6}
              sm={12}
              md={3}
              textAlign={"center"}
              my={{ xs: "10px", sm: "0px" }}
            >
              <Transit flightData={flightData} />
            </Grid>
            {/* //todo:Three */}
            <Grid xs={6} sm={12} md={3.5} px={1} my={{ xs: "10px", sm: "0px" }}>
              <Box textAlign={"end"}>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
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
                      flightData?.segments[
                        flightData?.segments?.length - 1
                      ]?.arrivalLocation?.split(" ,")[0]
                    }
                  </span>
                  {", "}
                  <span>
                    {
                      flightData?.segments[flightData?.segments?.length - 1]
                        ?.arrival
                    }{" "}
                  </span>
                </Typography>
                <Tooltip
                  title={`${
                    flightData?.segments[flightData?.segments?.length - 1]
                      ?.arrivalAirport
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
                    flightData?.segments[flightData?.segments?.length - 1]
                      ?.arrivalAirport
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
                    {flightData?.arrivalTime.length > 5
                      ? `${
                          new Date(flightData?.arrivalTime)
                            .toTimeString()
                            ?.split(":")[0]
                        }:${
                          new Date(flightData?.arrivalTime)
                            .toTimeString()
                            ?.split(":")[1]
                        }`
                      : `${flightData?.arrivalTime?.split(":")[0]}:${
                          flightData?.arrivalTime?.split(":")[1]
                        }`}
                  </span>
                  {" - "}
                  {flightData?.arrivalDate}
                </Typography>
              </Box>
            </Grid>
            {/* //todo:Four */}
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
                  Seat: {flightData?.seat || 9}&nbsp;&nbsp; Baggage:{" "}
                  {flightData?.bags === "3" ||
                  flightData?.bags === "2" ||
                  flightData?.bags === "1" ? (
                    <>{flightData?.bags?.split(" ")[0]} Piece</>
                  ) : flightData?.bags === " " ? (
                    <>0 Kg</>
                  ) : (
                    <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                  )}
                </Typography>
              </Box>{" "}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          sm={2.5}
          md={2.5}
          sx={{
            borderLeft: "2px dashed var(--gray)",
          }}
          p={{ xs: "0 10px 10px 15px", md: 2 }}
        >
          <Box textAlign="end" mr={{ xs: "10px", sm: "0px" }}>
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

          <Box
            textAlign="end"
            mt={1}
            display={{ xs: "flex", sm: "block" }}
            justifyContent="space-between"
          >
            <Button
              size="small"
              className="shine-effect"
              style={{
                color: "var(--white)",
                fontWeight: 600,
                backgroundColor: "var(--primary-color)",
                borderRadius: "5px",
              }}
              disabled
              // disabled={flightData?.system === "Galileo" ? true : false}
              onClick={FlightInformation}
            >
              BOOK NOW
            </Button>
            {["right"].map((anchor) => (
              <Box key={anchor}>
                <Button
                  mt={1}
                  size="small"
                  onClick={toggleDrawer(anchor, true)}
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
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
                        <Typography style={{ color: "var(--primary-color)" }}>
                          Flight Details Result
                        </Typography>
                        <Typography>
                          {tripType === "oneway"
                            ? "One Way"
                            : tripType === "return"
                            ? "Return"
                            : "Multi City"}{" "}
                          Flight <span>|</span>{" "}
                          {adultCount > 0 && `Adult(${adultCount})`}
                          {childCount > 0 && `Children(${childCount})`}
                          {infant > 0 && `Infant(${infant})`} <span>|</span>{" "}
                          {format(
                            new Date(flightData?.departureDate),
                            "dd MMM yyyy"
                          )}
                          {" | "}
                          {format(
                            new Date(flightData?.arrivalDate),
                            "dd MMM yyyy"
                          )}
                        </Typography>
                        <Typography>
                          {flightData?.departure}
                          {" - "}
                          {flightData?.arrival}
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
                        <Box
                          bgcolor="var(--white)"
                          margin={{ xs: "15px", md: "3vw" }}
                          padding="8px 20px"
                        >
                          <Grid
                            container
                            justifyContent="space-between"
                            borderBottom="2px solid var(--primary-color)"
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
                                    color: "var(--primary-color)",
                                  }}
                                >
                                  {flightData?.departureDate}
                                </span>{" "}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "var(--primary-color)",
                                  fontSize: "14px",
                                }}
                              >
                                {flightData?.segment === 1 ? (
                                  <>Non</>
                                ) : (
                                  <>{flightData?.segment - 1} </>
                                )}
                                Stop {flightData?.flightduration}{" "}
                                <span
                                  style={{
                                    color: "var(--gray)",
                                  }}
                                >
                                  {flightData?.segments?.map((data) => (
                                    <>
                                      {flightData?.system === "Sabre" ? (
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
                                flightData?.segments[0]?.departureLocation?.split(
                                  ","
                                )[0]
                              }
                              {" - "}
                              {
                                flightData?.segments[
                                  flightData?.segments?.length - 1
                                ]?.arrivalLocation?.split(",")[0]
                              }{" "}
                            </Grid>
                          </Grid>

                          {flightData?.segments.map((data, i, arr) => (
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
                                      color: "var(--primary-color)",
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
                                        color: "var(--primary-color)",
                                        fontSize: "23px",
                                      }}
                                    >
                                      {data?.departureLocation?.split(" ,")[0]},{" "}
                                    </span>
                                    <span
                                      style={{
                                        color: "var(--primary-color)",
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
                                        color: "var(--primary-color)",
                                        fontWeight: 500,
                                        fontSize: {
                                          xs: "12px",
                                          sm: "10px",
                                          md: "12px",
                                        },
                                      }}
                                    >
                                      {data?.flightduration}
                                    </Typography>
                                    <Box className="stop-bar-parent">
                                      <CircleIcon
                                        sx={{
                                          color: "var(--gray)",
                                          fontSize: "15px",
                                        }}
                                      />
                                      <Box className="stop-bar-line-details"></Box>
                                      <CircleIcon
                                        sx={{
                                          color: "var(--gray)",
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
                                        color: "var(--primary-color)",
                                        fontSize: "23px",
                                      }}
                                    >
                                      {data?.arrivalLocation?.split(" ,")[0]},{" "}
                                    </span>
                                    <span
                                      style={{
                                        color: "var(--primary-color)",
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
                                        new Date(data?.arrivalTime?.toString()),
                                        "dd MMM yyyy hh:mm a"
                                      )}
                                    </span>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
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
                                  {flightData?.bags === "3" ||
                                  flightData?.bags === "2" ||
                                  flightData?.bags === "1" ? (
                                    <>{flightData?.bags?.split(" ")[0]} Piece</>
                                  ) : flightData?.bags === " " ? (
                                    <>0 Kg</>
                                  ) : (
                                    <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                  )}
                                </td>
                                <td>{flightData?.class}</td>
                              </tr>
                              {childCount > 0 && (
                                <tr>
                                  <td>Child</td>
                                  <td>
                                    {flightData?.bags === "3" ||
                                    flightData?.bags === "2" ||
                                    flightData?.bags === "1" ? (
                                      <>
                                        {flightData?.bags?.split(" ")[0]} Piece
                                      </>
                                    ) : flightData?.bags === " " ? (
                                      <>0 Kg</>
                                    ) : flightData?.bags.length === 6 ? (
                                      <>
                                        {flightData?.bags?.slice(2, 4) || 0} Kg{" "}
                                      </>
                                    ) : (
                                      <>
                                        {flightData?.bags?.slice(0, 2) || 0} Kg
                                      </>
                                    )}
                                  </td>
                                  <td>{flightData?.class}</td>
                                </tr>
                              )}
                              {infant > 0 && (
                                <tr>
                                  <td>Infant</td>
                                  <td>
                                    {flightData?.bags === "3" ||
                                    flightData?.bags === "2" ||
                                    flightData?.bags === "1" ? (
                                      <>
                                        {flightData?.bags?.split(" ")[0]} Piece
                                      </>
                                    ) : flightData?.bags === " " ? (
                                      <>0 Kg</>
                                    ) : flightData?.bags.length === 6 ? (
                                      <>
                                        {flightData?.bags?.slice(4, 6) || 0} Kg{" "}
                                      </>
                                    ) : (
                                      <>
                                        {flightData?.bags?.slice(0, 2) || 0} Kg
                                      </>
                                    )}
                                  </td>
                                  <td>{flightData?.class}</td>
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
                            {flightData?.pricebreakdown.map((data) => (
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
                                {flightData?.pricebreakdown.length === 3 ? (
                                  <>
                                    {parseInt(
                                      flightData?.pricebreakdown[0].PaxCount
                                    ) +
                                      parseInt(
                                        flightData?.pricebreakdown[1].PaxCount
                                      ) +
                                      parseInt(
                                        flightData?.pricebreakdown[2].PaxCount
                                      )}
                                  </>
                                ) : flightData?.pricebreakdown.length === 2 ? (
                                  <>
                                    {parseInt(
                                      flightData?.pricebreakdown[0].PaxCount
                                    ) +
                                      parseInt(
                                        flightData?.pricebreakdown[1].PaxCount
                                      )}
                                  </>
                                ) : (
                                  <>
                                    {parseInt(
                                      flightData?.pricebreakdown[0].PaxCount
                                    )}
                                  </>
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
                                BDT {flightData.clientPrice}
                              </Typography>

                              <Typography
                                sx={{
                                  color: "var(--total-text-color)",
                                  fontSize: "12px",
                                }}
                              >
                                BDT {flightData.comission}
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
                              BDT {flightData.price}
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
        {/* --------------Flight Details start------------ */}

        {/* --------------Flight Details end------------ */}
      </Grid>
    </Box>
  );
};

export default SingleFlight;
