import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import flightData from "../../../flightData";
// import airlineNames from "../../../../../DashboardMain/airlineNames";
import airlineNames from "./airlineNames";
import commaNumber from "comma-number";
import Loader from "../../../../images/loader/Render.gif";
import CircularProgress from "@mui/material/CircularProgress";

// import ClientInvoice from "../../../../AllPdf/Invoice/ClientInvoice/ClientInvoice";
// import EticketWithoutPrice from "../../../../AllPdf/EticketCom/EticketWithoutPrice/EticketWithoutPrice";
// import AgentInvoice from "../../../../AllPdf/Invoice/AgentInvoice/AgentInvoice";
// import ClientTicketWithPrice from "../../../../AllPdf/ClientTicket/ClientTicketWithPrice/ClientTicketWithPrice";
// import BookingConfirWithoutPrice from "../../../../AllPdf/BookingPdf/BookingConfirWithoutPrice/BookingConfirWithoutPrice";
// import BookingConfirWithPrice from "../../../../AllPdf/BookingPdf/BookingConfirWithPrice/BookingConfirWithPrice";
// import ClientInvoiceF from "./../../../../AllFlyhubPdf/Invoice/ClientInvoice/ClientInvoiceF";
// import AgentInvoiceF from "./../../../../AllFlyhubPdf/Invoice/AgentInvoice/AgentInvoiceF";
// import ClientTicketWithPriceF from "./../../../../AllFlyhubPdf/ClientTicket/ClientTicketWithPrice/ClientTicketWithPriceF";
// import EticketWithoutPriceF from "./../../../../AllFlyhubPdf/EticketCom/EticketWithoutPrice/EticketWithoutPriceF";
// import BookingConfirWithPriceF from "./../../../../AllFlyhubPdf/BookingPdf/BookingConfirWithPrice/BookingConfirWithPriceF";
// import BookingConfirWithoutPriceF from "./../../../../AllFlyhubPdf/BookingPdf/BookingConfirWithoutPrice/BookingConfirWithoutPriceF";

import swal from "sweetalert2";
import ellips from "../../../../images/Ellipse.png";
import subtract from "../../../../images/Subtract.png";
import airImg from "../../../../images/airImg.png";
import confirm from "../../../../images/Icon/confirm 1.png";
import Swal from "sweetalert2";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { format, formatRelative } from "date-fns";
// import UpdateDocument from "../../../../UpdateDocument/UpdateDocument";

import { Calendar } from "react-date-range";
import cancelImg from "../../../../images/undraw/undraw_cancel_re_pkdm.svg";
import cancelFailed from "../../../../images/undraw/undraw_bug_fixing_oc-7-a.svg";
import ReConfirm from "../../../../images/undraw/undraw_confirmation_re_b6q5.svg";
import Issue from "../../../../images/undraw/undraw_booking_re_gw4j.svg";
import Invalid from "../../../../images/undraw/undraw_warning_re_eoyh.svg";
import "./QueuesDetail.css";

const CancelQueues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDone, setIsDone] = useState(false);
  const [queuesData, setQueuesData] = useState({});
  const [flightData, setFlightData] = useState({});
  const { bookingId, agentId } = location.state;
  useEffect(() => {
    setIsDone(true);
    let url = `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${location.state.agentId}&search=BId&bookingId=${location.state.bookingId}`;
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQueuesData(data[0]);
        setFlightData(data[0]?.flightData[0]);
        setIsDone(false);
      });
  }, [agentId, bookingId]);
  console.log("flightData", flightData);
  console.log("queuesData", queuesData);

  if (isDone) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {!isDone && Object.keys(queuesData).length > 0 ? (
        <Container className="queues-detail-parent" maxWidth="xxl">
          <Box pb={4}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={9.5}>
                <Box className="queues-detail">
                  <Grid container justifyContent={"space-between"}>
                    <Grid item mt={4} mb={2} md={6}>
                      <h2>Reference ID: {bookingId}</h2>
                    </Grid>
                    <Grid item mt={4} mb={2} md={6} textAlign="end">
                      <button>{queuesData?.status || "Loading ..."}</button>
                    </Grid>
                  </Grid>
                  <Grid
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                    container
                  ></Grid>
                </Box>

                {/* --------------- Booking confirmation--------------------------- */}

                <Box mt={2} className="queues-detail-bookingInfo">
                  <span>Booking Confirmation</span>
                  <Grid mt={1} container>
                    <Grid item xs={12} md={6}>
                      <Box display={"flex"} gap="20px">
                        <Box>
                          <h5
                            style={{
                              fontSize: "17px",
                              marginBottom: "10px",
                            }}
                          >
                            Destination:
                          </h5>

                          <h5>Cancelled By: </h5>
                          <h5>Cancelled At: </h5>
                        </Box>

                        <Box>
                          <h5
                            style={{
                              color: "#003566",
                              fontWeight: "500",
                              fontSize: "17px",
                              marginBottom: "10px",
                            }}
                          >
                            {queuesData?.deptFrom} - {queuesData?.arriveTo}
                            {queuesData?.tripType === "return" ? (
                              <>- {queuesData?.deptFrom}</>
                            ) : null}
                          </h5>

                          <h5>{queuesData?.bookedby || "Agent"}</h5>
                          <h5>
                            {queuesData?.bookedAt
                              ? queuesData?.bookedAt
                                ? format(
                                    new Date(queuesData?.bookedAt.toString()),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "Date Time"
                              : "Date Time"}
                          </h5>
                          {queuesData?.status === "Hold" ? (
                            <>
                              {queuesData?.timeLimit ? (
                                queuesData?.timeLimit ? (
                                  format(
                                    new Date(queuesData?.timeLimit.toString()),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                ) : (
                                  <Typography color="crimson">
                                    Immediate Issue
                                  </Typography>
                                )
                              ) : (
                                <Typography color="crimson">
                                  Immediate Issue
                                </Typography>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid xs={12} item md={6}>
                      {queuesData?.refundable === "no" ? (
                        <Typography
                          style={{
                            color: "red",
                            fontWeight: 600,
                          }}
                        >
                          Non Refundable | Economy
                        </Typography>
                      ) : (
                        <>
                          <Typography
                            style={{
                              color: "green",
                              fontWeight: 600,
                            }}
                          >
                            Refundable | Economy
                          </Typography>
                        </>
                      )}
                      <Box display={"flex"} gap={{ lg: "20px", xs: "48px" }}>
                        {queuesData?.status === "Hold" ? (
                          <></>
                        ) : queuesData?.status === "Issue In Processing" ? (
                          <>
                            <Box>
                              <h5>Issue Requested By: </h5>
                              <h5>Issue Requested At: </h5>
                            </Box>

                            <Box>
                              <h5>
                                {queuesData?.issueRequestBy ||
                                  "Issue Requested"}
                              </h5>
                              <h5>
                                {queuesData?.issueRequestAt
                                  ? format(
                                      new Date(
                                        queuesData?.issueRequestAt?.toString()
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "Issue Time"}
                              </h5>
                            </Box>
                          </>
                        ) : (
                          <>
                            {queuesData?.ticketBy ? (
                              <>
                                {" "}
                                <Box>
                                  <h5>Ticketed By: </h5>
                                  <h5>Ticketed At: </h5>
                                </Box>
                                <Box>
                                  <h5>
                                    {queuesData?.ticketBy || "Ticketed By"}
                                  </h5>
                                  <h5>
                                    {queuesData?.ticketedAt
                                      ? format(
                                          new Date(
                                            queuesData?.ticketedAt?.toString()
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : "Ticketed At"}
                                  </h5>
                                </Box>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* ------------- FLight Information ---------------------------- */}

                <Box mt={2} className="flight-queue-detail-fareInfo">
                  <span>Flight Information </span>

                  <Box mt={2}>
                    <table
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <tr>
                        <th width="7%">Flight</th>
                        <th width="10%">Departure From</th>
                        <th width="10%">Arrival To</th>
                        <th width="10%">Depart At</th>
                        <th width="10%">Arrive At</th>
                        <th width="10%">Info</th>
                      </tr>

                      <tbody
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        {[...Array(Number(flightData.segment))].map((x, i) => (
                          <tr
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <td>
                              <img
                                src={
                                  queuesData.tripType === "oneway"
                                    ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                        flightData[`marketingCareer${i + 1}`]
                                      }.png`
                                    : `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                        flightData[`goMarketingCareer${i + 1}`]
                                      }.png`
                                }
                                width="30px"
                                height="30px"
                                alt="flight-Img"
                                className={`img-border-${queuesData?.gds?.toLowerCase()}`}
                              />
                              <br />
                              {queuesData.tripType === "oneway"
                                ? flightData[`marketingCareerName${i + 1}`]
                                : flightData[`goMarketingCareerName${i + 1}`]}
                              {" | "}
                              {queuesData.tripType === "oneway"
                                ? flightData[`bookingcode${i + 1}`]
                                : flightData[`goBookingCode${i + 1}`]}
                              {flightData.tripType === "oneway"
                                ? flightData[`marketingFlight${i + 1}`]
                                : flightData[`goMarketingFlight${i + 1}`]}
                            </td>
                            <td>
                              (
                              {queuesData.tripType === "oneway"
                                ? flightData[`departure${i + 1}`]
                                : flightData[`goDeparture${i + 1}`]}
                              )-
                              {queuesData.tripType === "oneway"
                                ? flightData[
                                    `departureLocation${i + 1}`
                                  ]?.slice(
                                    0,
                                    flightData[
                                      `departureLocation${i + 1}`
                                    ].indexOf(" ")
                                  )
                                : flightData[
                                    `goDepartureLocation${i + 1}`
                                  ]?.slice(
                                    0,
                                    flightData[
                                      `goDepartureLocation${i + 1}`
                                    ].indexOf(" ")
                                  )}
                              -
                              {queuesData.tripType === "oneway"
                                ? flightData[`departureAirport${i + 1}`]
                                : flightData[`goDepartureAirport${i + 1}`]}
                              <br />
                              <>Terminal: {i + 1}</>
                            </td>
                            <td>
                              (
                              {queuesData.tripType === "oneway"
                                ? flightData[`arrival${i + 1}`]
                                : flightData[`goArrival${i + 1}`]}
                              )-
                              {queuesData.tripType === "oneway"
                                ? flightData[`arrivalLocation${i + 1}`]?.slice(
                                    0,
                                    flightData[
                                      `arrivalLocation${i + 1}`
                                    ].indexOf(" ")
                                  )
                                : flightData[
                                    `goArrivalLocation${i + 1}`
                                  ]?.slice(
                                    0,
                                    flightData[
                                      `goArrivalLocation${i + 1}`
                                    ].indexOf(" ")
                                  )}
                              -
                              {queuesData.tripType === "oneway"
                                ? flightData[`arrivalAirport${i + 1}`]
                                : flightData[`goArrivalAirport${i + 1}`]}
                              <br />
                              <>Terminal: {i + 1}</>
                            </td>

                            <td>
                              {queuesData.tripType === "oneway"
                                ? flightData[`departureTime${i + 1}`]
                                  ? format(
                                      new Date(
                                        flightData[`departureTime${i + 1}`]
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "Departure Time"
                                : flightData[`goDepartureTime${i + 1}`]
                                ? format(
                                    new Date(
                                      flightData[`goDepartureTime${i + 1}`]
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "Departure Time"}
                            </td>

                            <td>
                              {queuesData.tripType === "oneway"
                                ? flightData[`arrivalTime${i + 1}`]
                                  ? format(
                                      new Date(
                                        flightData[`arrivalTime${i + 1}`]
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "Arrival Time"
                                : flightData[`goArrivalTime${i + 1}`]
                                ? format(
                                    new Date(
                                      flightData[`goArrivalTime${i + 1}`]
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "Arrival Time"}
                            </td>

                            <td>
                              Cabin: 7Kg
                              <br />
                              Class:{" "}
                              {queuesData.tripType === "oneway"
                                ? flightData[`bookingcode${i + 1}`] || "Economy"
                                : flightData[`goBookingCode${i + 1}`] ||
                                  "Economy"}
                              <br />
                              Baggage:{" "}
                              <>
                                {Number(queuesData.adultCount) > 0 &&
                                  `ADT-${
                                    queuesData.adultBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  }`}
                                {Number(queuesData.childCount) > 0 &&
                                  `-CNN-${
                                    queuesData.childBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  }`}
                                {Number(queuesData.infantCount) > 0 &&
                                  `-INF-${
                                    queuesData.infantBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  }`}
                              </>
                              <br />
                              Duration:{" "}
                              {queuesData.tripType === "oneway"
                                ? flightData[`flightDuration${i + 1}`]
                                : flightData[`goFlightDuration${i + 1}`]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Box>

                {/*---------------------------- Fare details ----------------------------*/}

                <Box mt={2} className="flight-queue-detail-fareInfo">
                  <span>Fare Details</span>

                  <Box mt={2}>
                    <Box>
                      <table>
                        <tr>
                          <th>Passenger </th>
                          <th>Base Fare </th>
                          <th>Tax</th>
                          <th>Total Fare</th>
                        </tr>

                        {queuesData?.adultCount > 0 ? (
                          <tr>
                            <td>Adult X{queuesData?.adultCount}</td>

                            <td>
                              {commaNumber(queuesData?.adultCostBase)} BDT
                            </td>
                            <td>{commaNumber(queuesData?.adultCostTax)} BDT</td>
                            <td>
                              {commaNumber(
                                Number(queuesData?.adultCostBase) +
                                  Number(queuesData?.adultCostTax)
                              )}{" "}
                              BDT
                            </td>
                          </tr>
                        ) : null}

                        {queuesData?.childCount > 0 ? (
                          <tr>
                            <td>Child X{queuesData?.childCount}</td>

                            <td>
                              {commaNumber(queuesData?.childCostBase)} BDT
                            </td>
                            <td>{commaNumber(queuesData?.childCostTax)} BDT</td>
                            <td>
                              {commaNumber(
                                Number(queuesData?.childCostBase) +
                                  Number(queuesData?.childCostTax)
                              )}{" "}
                              BDT
                            </td>
                          </tr>
                        ) : null}
                        {queuesData?.infantCount > 0 ? (
                          <tr>
                            <td>Infant X{queuesData?.infantCount}</td>

                            <td>
                              {commaNumber(queuesData?.infantCostBase)} BDT
                            </td>
                            <td>
                              {commaNumber(queuesData?.infantCostTax)} BDT
                            </td>
                            <td>
                              {commaNumber(
                                Number(queuesData?.infantCostBase) +
                                  Number(queuesData?.infantCostTax)
                              )}{" "}
                              BDT
                            </td>
                          </tr>
                        ) : null}
                      </table>
                    </Box>
                    <table>
                      <tr>
                        <td style={{ color: "#DC143C" }}>
                          Your Saving:
                          <em style={{ padding: "0px 10px" }}>
                            {commaNumber(
                              Number(queuesData?.grossCost) -
                                Number(queuesData?.netCost)
                            )}{" "}
                            BDT
                          </em>{" "}
                        </td>

                        <td>
                          Agent Total:
                          <em style={{ paddingLeft: "10px" }}>
                            {commaNumber(queuesData?.netCost)} BDT
                          </em>
                        </td>

                        <td>
                          Customer Total:
                          <em style={{ paddingLeft: "10px" }}>
                            {commaNumber(Number(queuesData?.grossCost))} BDT
                          </em>
                        </td>
                      </tr>
                    </table>
                  </Box>
                </Box>

                {/* --------------------- passenger details accordion ------------------- */}

                <Box mt={5} className="queue-detail-passenger-detail">
                  <Box my={2}>
                    <span>Passenger Details</span>
                  </Box>
                  <Box>
                    <Box>
                      {queuesData?.passenger?.map((traveler) => (
                        <>
                          <Box
                            p="3px"
                            border="1px solid #DEDEDE"
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                          >
                            <h5
                              style={{
                                color: "#003566",
                                fontWeight: "500",
                                fontSize: "15px",
                              }}
                            >
                              {traveler?.gender === "Male" ? (
                                <>
                                  {traveler?.gender === "Male" &&
                                  traveler?.type === "ADT" ? (
                                    <>
                                      MR {traveler?.fName} {traveler?.lName}
                                    </>
                                  ) : (
                                    <>
                                      MSTR {traveler?.fName} {traveler?.lName}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {traveler?.gender === "Female" &&
                                  traveler?.type === "ADT" ? (
                                    <>
                                      MRS {traveler?.fName} {traveler?.lName}
                                    </>
                                  ) : (
                                    <>
                                      MISS {traveler?.fName} {traveler?.lName}
                                    </>
                                  )}
                                </>
                              )}
                            </h5>
                          </Box>

                          <Box border="1px solid #DEDEDE" p="3px" mb={2}>
                            <Grid container spacing={2}>
                              <Grid item xs={4} md={2}>
                                <h5>Title</h5>
                                <h6>
                                  {traveler?.gender === "Male" ? (
                                    <>
                                      {traveler?.gender === "Male" &&
                                      traveler?.type === "ADT" ? (
                                        <>MR</>
                                      ) : (
                                        <>MSTR</>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {traveler?.gender === "Female" &&
                                      traveler?.type === "ADT" ? (
                                        <>MS</>
                                      ) : (
                                        <>MISS</>
                                      )}
                                    </>
                                  )}
                                </h6>
                              </Grid>
                              <Grid item xs={4} md={2}>
                                <h5>First Name</h5>
                                <h6>{traveler?.fName}</h6>
                              </Grid>
                              <Grid item xs={4} md={2}>
                                <h5>Last Name</h5>
                                <h6>{traveler?.lName}</h6>
                              </Grid>
                              <Grid item xs={4} md={2}>
                                <h5>Nationality</h5>
                                <h6>{traveler?.passNation}</h6>
                              </Grid>

                              <Grid item xs={4} md={2}>
                                <h5>Date of Birth</h5>
                                <h6>
                                  {traveler?.dob !== "000-00-00"
                                    ? traveler?.dob
                                      ? format(
                                          new Date(traveler?.dob),
                                          "dd MMM yyyy"
                                        )
                                      : "Date of Birth"
                                    : "Date of Birth"}
                                </h6>
                              </Grid>

                              <Grid item xs={4} md={2}>
                                <h5>Gender</h5>
                                <h6>{traveler?.gender}</h6>
                              </Grid>

                              <Grid item xs={4} md={2}>
                                <h5>Pax Type</h5>
                                <h6>
                                  {traveler?.type === "ADT"
                                    ? "Adult"
                                    : traveler?.type === "CNN"
                                    ? "Child"
                                    : "Infant"}
                                </h6>
                              </Grid>

                              <Grid item xs={4} md={2}>
                                <h5>Passport Number</h5>
                                <h6>
                                  {queuesData?.journeyType === "Outbound"
                                    ? traveler?.passNo?.toUpperCase() ||
                                      traveler?.passNo?.toUpperCase() ||
                                      "Passport Number"
                                    : "Domestic Flight"}
                                </h6>
                              </Grid>
                              <Grid item xs={2} md={2}>
                                <h5>Passport Expire Date</h5>

                                <h6>
                                  {queuesData?.journeyType === "Outbound"
                                    ? traveler?.passEx !== "0000-00-00"
                                      ? traveler?.passEx
                                        ? format(
                                            new Date(
                                              traveler?.passEx ||
                                                traveler?.passEx
                                            ),
                                            "dd MMM yyyy"
                                          )
                                        : "Passport Expire Date"
                                      : "Domestic Flight"
                                    : "Domestic Flight"}
                                </h6>
                              </Grid>
                              {queuesData?.journeyType === "Outbound" &&
                              queuesData?.status !== "Hold" &&
                              traveler.passportCopy !== "" &&
                              traveler.visaCopy !== "" ? (
                                <>
                                  <Grid item xs={2} md={2}>
                                    <h5>Passport Copy</h5>

                                    <h6>
                                      <a
                                        style={{
                                          color: "#003566",
                                          fontWeight: "500",
                                          fontSize: "12px",
                                          textDecoration: "none",
                                          marginRight: "10px",
                                        }}
                                        href={"/"}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        View
                                      </a>
                                    </h6>
                                  </Grid>
                                  <Grid item xs={2} md={2}>
                                    <h5>Visa Copy</h5>

                                    <h6>
                                      <a
                                        style={{
                                          color: "#003566",
                                          fontWeight: "500",
                                          fontSize: "12px",
                                          textDecoration: "none",
                                        }}
                                        href={traveler?.visaCopy || ""}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {" "}
                                        View
                                      </a>
                                    </h6>
                                  </Grid>
                                </>
                              ) : null}
                            </Grid>
                          </Box>
                        </>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={12} md={2.5}>
                <Accordion
                  expanded={true}
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                    marginTop: "30px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel8bh-content"
                    id="panelbh-header"
                  >
                    <Typography
                      style={{
                        color: "#dc143c",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        fontSize: "16px",
                      }}
                    >
                      PNR History
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {queuesData?.activity?.map((data) => (
                      <Grid container>
                        <Grid item className="line" xs={1}>
                          <Box
                            width="14px"
                            height="14px"
                            bgcolor="#DC143C"
                            position="relative"
                            ml={-1}
                          ></Box>
                        </Grid>
                        <Grid item mt="-3px" xs={11}>
                          <Typography
                            sx={{
                              color: "#003566",
                              fontSize: "16px",
                              fontWeight: 500,
                            }}
                          >
                            {data?.status}
                          </Typography>
                          <Box py={2}>
                            {" "}
                            <Typography
                              sx={{
                                color: "#70A5D8",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {data?.status === "Hold" ||
                              data?.status === "Issue In Processing" ? (
                                <>{data?.actionBy}</>
                              ) : (
                                <>Fly Far International</>
                              )}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#767676",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {data?.actionAt
                                ? format(
                                    new Date(data?.actionAt?.toString()),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "Issue Time"}
                            </Typography>
                            <Typography
                              sx={{
                                color: "crimson",
                                fontSize: "12px",
                                fontWeight: 500,
                                mt: "4px",
                              }}
                            >
                              {data?.remarks === "" || data?.remarks === " " ? (
                                ""
                              ) : (
                                <>Remarks: {data?.remarks}</>
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            width: "70vw",
            marginInline: "auto",
          }}
        >
          <Box
            style={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Loader}
              alt="loader"
              style={{
                width: "40%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CancelQueues;
