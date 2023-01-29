import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import commaNumber from "comma-number";
import CircularProgress from "@mui/material/CircularProgress";
import { ToWords } from "to-words";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";

const BookingConfirWithPrice = ({ allData }) => {
  const componentRef = useRef();
  // --------------------- client information start ---------------------------
  // const users = JSON.parse(sessionStorage.getItem("user-info"));
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  const {
    pnr,
    fromCountryName,
    toCountryName,
    flightType,
    bookingId,
    bookDate,
    issueTime,
  } = allData;

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [fareCost, setFareCost] = useState({});
  const [balance, setBalance] = useState([]);
  const [invoiceId, setInvoiceId] = useState([]);
  const [flightName, setFlightName] = useState([]);
  const [prices, setPrices] = useState();
  const [passenger, setPassenger] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    setIsLoading(false);
  }, [pnr, bookingId, agentID]);

  //  all passenger total price calculation
  const adultTotalPrice =
    parseInt(fareCost[0]?.adultCostBase) + parseInt(fareCost[0]?.adultCostTax);

  const childTotalPrice =
    parseInt(fareCost[0]?.childCostBase) + parseInt(fareCost[0]?.childCostTax);

  const infantTotalPrice =
    parseInt(fareCost[0]?.infantCostBase) +
    parseInt(fareCost[0]?.infantCostTax);

  const totalPrice = adultTotalPrice + childTotalPrice + infantTotalPrice;
  const totalTicketFare = parseInt(fareCost[0]?.netCost);

  const discount =
    parseInt(fareCost[0]?.grossCost) - parseInt(fareCost[0]?.netCost);



  const date = new Date().toLocaleString("sv");

  //todo remove last word function
  const number = 0;
  useEffect(() => {
    if (totalPrice > number) {
      const toWords = new ToWords();
      let words = toWords.convert(totalPrice, {
        currency: false,
        ignoreDecimal: true,
      });
      setPrices(words);
    }
  }, [totalPrice]);

  const handleToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Booking_confirmation_with_price_${fareCost[0]?.deptFrom}-${fareCost[0]?.arriveTo}_${fareCost[0]?.travelDate}_PAX-${fareCost[0]?.pax}`,
    pageStyle: "@page { size: 210mm 297mm }",
  });

  const allflightData = fareCost[0]?.flightData[0];
  
  return (
    <>
      {Object.keys(fareCost).length !== 0 ? (
        <>
          <Box className="invoice-btn">
            <button onClick={handleToPrint}>Booking With Price</button>
          </Box>
          <Box mt={5} style={{ display: "none" }}>
            <Container>
              <Box ref={componentRef}>
                <Box className="agentBookingPrice">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {userData[0]?.companyImage && (
                      <Box height="100px">
                        <img
                          src={userData[0]?.companyImage}
                          style={{ height: "100%" }}
                          alt="company logo"
                        />
                      </Box>
                    )}
                  </div>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box width="50%">
                      <Box>
                        <Typography
                          fontWeight={500}
                          fontSize="20px"
                          sx={{
                            color: "#222222",
                            mb: "5px",
                          }}
                        >
                          {userData[0]?.company}
                        </Typography>
                      </Box>
                      <p style={{ fontSize: "11px", color: "#dcdcdc" }}>
                        {userData[0]?.companyadd}
                      </p>
                      <p style={{ fontSize: "11px" }}>
                        Email:{" "}
                        <span style={{ color: "#dcdcdc" }}>
                          {userData[0]?.email}
                        </span>
                      </p>
                      <p style={{ fontSize: "11px" }}>
                        Phone:{" "}
                        <span
                          style={{
                            color: "#dcdcdc",
                            textDecoration: "none",
                          }}
                        >
                          {userData[0]?.phone}
                        </span>
                      </p>
                    </Box>

                    <div width="50%" style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontSize: "40px",
                          color: "#003566",
                          opacity: "30%",
                        }}
                      >
                        Booking Copy
                      </p>
                    </div>
                  </Box>

                  {/*  body start here */}

                  <Box className="client-pdf-invoice" mt={2}>
                    <Grid container columnSpacing={3}>
                      <Grid item md={3}>
                        <Typography>Reference: {allData?.bookingId}</Typography>
                      </Grid>
                      <Grid item md={3}>
                        <Typography>
                          Booking:{" "}
                          {fareCost[0]?.bookedAt
                            ? format(
                                new Date(fareCost[0]?.bookedAt.toString()),
                                "dd MMM yyyy"
                              )
                            : "Booking"}
                        </Typography>
                      </Grid>

                      <Grid item md={5}>
                        {fareCost[0]?.refundable === "yes" ? (
                          <Typography
                            style={{
                              color: "green",
                              fontWeight: 600,
                            }}
                          >
                            Refundable | Economy
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              color: "red",
                              fontWeight: 600,
                            }}
                          >
                            Non Refundable | Economy
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>

                  <Box className="client-pdf-des">
                    <h4 style={{ marginBottom: "15px" }}>PASSENGER DETAILS</h4>
                  </Box>

                  <Box className="clientInvoice-table">
                    <table>
                      <tr>
                        <td>Passenger Name</td>
                        <td>Gender</td>
                        <td>Passenger Type</td>
                        {fareCost[0]?.journeyType === "Outbound" && (
                          <td>
                            <>Passport Number</>
                          </td>
                        )}
                      </tr>

                      {passenger.map((traveler) => (
                        <tr>
                          <td>
                            {traveler?.gender === "Male" ? (
                              <>
                                {traveler?.gender === "Male" &&
                                traveler?.type === "ADT" ? (
                                  <>
                                    MR {traveler?.fName?.toUpperCase()}{" "}
                                    {traveler?.lName?.toUpperCase()}
                                  </>
                                ) : (
                                  <>
                                    MSTR {traveler?.fName?.toUpperCase()}{" "}
                                    {traveler?.lName?.toUpperCase()}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {traveler?.gender === "Female" &&
                                traveler?.type === "ADT" ? (
                                  <>
                                    MS {traveler?.fName?.toUpperCase()}{" "}
                                    {traveler?.lName?.toUpperCase()}
                                  </>
                                ) : (
                                  <>
                                    MISS {traveler?.fName?.toUpperCase()}{" "}
                                    {traveler?.lName?.toUpperCase()}
                                  </>
                                )}
                              </>
                            )}
                          </td>
                          <td>{traveler?.gender}</td>{" "}
                          <td>
                            {traveler.type === "ADT" ? (
                              <>Adult</>
                            ) : traveler.type === "INF" ? (
                              <>Infant</>
                            ) : (
                              <>Child</>
                            )}
                          </td>
                          {fareCost[0]?.journeyType === "Outbound" ? (
                            <td>{traveler?.passNo?.toUpperCase() || ""}</td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))}
                    </table>
                    {/* <Box className="client-pdf-to">
                   <p>
                     <span>Passenger Email: </span>
                     {fareCost[0]?.email}
                   </p>
                   <p>
                     <span>Passenger Phone: </span>
                     {fareCost[0]?.phone}
                   </p>
                 </Box> */}
                  </Box>

                  {/*  flight ITINERARIES start here */}

                  <Box className="client-pdf-des">
                    <h4>FLIGHT ITINERARIES</h4>
                  </Box>
                  <Box mt={2} className="clientInvoice-table">
                    <Box className="clientInvoice-table">
                      <table width="100%">
                        <tr>
                          <td width="16%">Flight</td>
                          <td width="21%">Departure From</td>
                          <td width="21%">Arrival To</td>
                          <td width="12%">Depart At</td>
                          <td width="12%">Arrive At</td>
                          <td width="18%">Info</td>
                        </tr>
                        {/* Segment 1 oneway and return  */}
                        {(allflightData?.departure1 ||
                          allflightData?.goDeparture1) !== "" && (
                          <tr>
                            <td>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                  allflightData?.goMarketingCareer1 ||
                                  allflightData?.marketingCareer1
                                }.png`}
                                width="30px"
                                height="30px"
                                alt="flight Image"
                              />
                              <br />
                              {allflightData?.goMarketingCareerName1 ||
                                allflightData?.marketingCareerName1}
                              <br />
                              {allflightData?.goMarketingCareer1 ||
                                allflightData?.marketingCareer1}{" "}
                              {allflightData?.goMarketingFlight1 ||
                                allflightData?.marketingFlight1}
                            </td>
                            <td>
                              (
                              {allflightData?.goDeparture1 ||
                                allflightData?.departure1}
                              ){" "}
                              {allflightData?.goDepartureLocation1?.split(
                                ","
                              )[0] ||
                                allflightData?.departureLocation1?.split(
                                  ","
                                )[0]}
                              {allflightData?.goDepartureAirport1 ||
                                allflightData?.departureAirport1}
                            </td>
                            <td>
                              (
                              {allflightData?.goArrival1 ||
                                allflightData?.arrival1}
                              ){" "}
                              {allflightData?.goArrivalLocation1?.split(
                                ","
                              )[0] ||
                                allflightData?.arrivalLocation1?.split(
                                  ","
                                )[0]}{" "}
                              {allflightData?.goArrivalAirport1 ||
                                allflightData?.arrivalAirport1}
                            </td>
                            <td>
                              {allflightData?.goDepartureTime1
                                ? format(
                                    new Date(
                                      `${allflightData?.goDepartureTime1}`
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : allflightData?.departureTime1
                                ? format(
                                    new Date(
                                      `${allflightData?.departureTime1}`
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "depart Date"}
                            </td>
                            <td>
                              {allflightData?.goArrivalTime1
                                ? format(
                                    new Date(
                                      `${allflightData?.goArrivalTime1}`
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : allflightData?.arrivalTime1
                                ? format(
                                    new Date(`${allflightData?.arrivalTime1}`),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "arrival Date"}
                            </td>
                            <td>
                              Cabin: 7Kg, Class:{" "}
                              {allflightData?.goBookingCode1 ||
                                allflightData?.bookingcode1}
                              <br />
                              Baggage:{" "}
                              {fareCost[0]?.adultCount > 0 && (
                                <>
                                  {parseInt(
                                    fareCost[0]?.adultBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  ) > 3 ? (
                                    <>
                                      ADT-
                                      {
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  ) : (
                                    <>
                                      ADT-
                                      {
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  )}
                                </>
                              )}
                              {fareCost[0]?.childCount > 0 && (
                                <>
                                  {parseInt(
                                    fareCost[0]?.childBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  ) > 3 ? (
                                    <>
                                      {", "}CNN-
                                      {
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  ) : (
                                    <>
                                      {", "}CNN-
                                      {
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  )}
                                </>
                              )}
                              {fareCost[0]?.infantCount > 0 && (
                                <>
                                  {parseInt(
                                    fareCost[0]?.infantBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  ) > 3 ? (
                                    <>
                                      {", "}INF-
                                      {
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  ) : (
                                    <>
                                      {", "}INF-
                                      {
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  )}
                                </>
                              )}
                              <br />
                              Duration:{" "}
                              {allflightData?.goFlightDuration1 ||
                                allflightData?.flightDuration1}
                            </td>
                          </tr>
                        )}

                        {/* Segment 2 oneway and return  */}
                        {(allflightData?.departure2 ||
                          allflightData?.goDeparture2) && (
                          <tr>
                            <td>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                  allflightData?.goMarketingCareer2 ||
                                  allflightData?.marketingCareer2
                                }.png`}
                                width="30px"
                                height="30px"
                                alt="flight Image"
                              />
                              <br />
                              {allflightData?.goMarketingCareerName2 ||
                                allflightData?.marketingCareerName2}
                              <br />
                              {allflightData?.goMarketingCareer2 ||
                                allflightData?.marketingCareer2}{" "}
                              {allflightData?.goMarketingFlight2 ||
                                allflightData?.marketingFlight2}
                            </td>
                            <td>
                              (
                              {allflightData?.goDeparture2 ||
                                allflightData?.departure2}
                              ){" "}
                              {allflightData?.goDepartureLocation2?.split(
                                ","
                              )[0] ||
                                allflightData?.departureLocation2?.split(
                                  ","
                                )[0]}
                              {allflightData?.goDepartureAirport2 ||
                                allflightData?.departureAirport2}
                            </td>
                            <td>
                              (
                              {allflightData?.goArrival2 ||
                                allflightData?.arrival2}
                              ){" "}
                              {allflightData?.goArrivalLocation2?.split(
                                ","
                              )[0] ||
                                allflightData?.arrivalLocation2?.split(
                                  ","
                                )[0]}{" "}
                              {allflightData?.goArrivalAirport2 ||
                                allflightData?.arrivalAirport2}
                            </td>
                            <td>
                              {allflightData?.goDepartureTime2
                                ? format(
                                    new Date(
                                      `${allflightData?.goDepartureTime2}`
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : allflightData?.departureTime2
                                ? format(
                                    new Date(
                                      `${allflightData?.departureTime2}`
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "depart Date"}
                            </td>
                            <td>
                              {allflightData?.goArrivalTime2
                                ? format(
                                    new Date(
                                      `${allflightData?.goArrivalTime2}`
                                    ),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : allflightData?.arrivalTime2
                                ? format(
                                    new Date(`${allflightData?.arrivalTime2}`),
                                    "dd MMM yyyy hh:mm a"
                                  )
                                : "arrival Date"}
                            </td>
                            <td>
                              Cabin: 7Kg, Class:{" "}
                              {allflightData?.goBookingCode2 ||
                                allflightData?.bookingcode2}
                              <br />
                              Baggage:{" "}
                              {fareCost[0]?.adultCount > 0 && (
                                <>
                                  {parseInt(
                                    fareCost[0]?.adultBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  ) > 3 ? (
                                    <>
                                      ADT-
                                      {
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  ) : (
                                    <>
                                      ADT-
                                      {
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  )}
                                </>
                              )}
                              {fareCost[0]?.childCount > 0 && (
                                <>
                                  {parseInt(
                                    fareCost[0]?.childBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  ) > 3 ? (
                                    <>
                                      {", "}CNN-
                                      {
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  ) : (
                                    <>
                                      {", "}CNN-
                                      {
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  )}
                                </>
                              )}
                              {fareCost[0]?.infantCount > 0 && (
                                <>
                                  {parseInt(
                                    fareCost[0]?.infantBag
                                      ?.split("|")[0]
                                      ?.split("-")[1]
                                  ) > 3 ? (
                                    <>
                                      {", "}INF-
                                      {
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                    </>
                                  ) : (
                                    <>
                                      {", "}INF-
                                      {
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      }
                                      Piece
                                    </>
                                  )}
                                </>
                              )}
                              <br />
                              Duration:{" "}
                              {allflightData?.goFlightDuration2 ||
                                allflightData?.flightDuration2}
                            </td>
                          </tr>
                        )}
                        {/* Segment 3 oneway and return  */}
                        {fareCost[0]?.tripType === "oneway" &&
                          allflightData?.segment === "3" && (
                            <>
                              {allflightData?.departure3 !== "" && (
                                <tr>
                                  <td>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                        allflightData?.goMarketingCareer3 ||
                                        allflightData?.marketingCareer3
                                      }.png`}
                                      width="30px"
                                      height="30px"
                                      alt="flight Image"
                                    />
                                    <br />
                                    {allflightData?.goMarketingCareerName3 ||
                                      allflightData?.marketingCareerName3}
                                    <br />
                                    {allflightData?.goMarketingCareer3 ||
                                      allflightData?.marketingCareer3}{" "}
                                    {allflightData?.goMarketingFlight3 ||
                                      allflightData?.marketingFlight3}
                                  </td>
                                  <td>
                                    (
                                    {allflightData?.goDeparture3 ||
                                      allflightData?.departure3}
                                    ){" "}
                                    {allflightData?.goDepartureLocation3?.split(
                                      ","
                                    )[0] ||
                                      allflightData?.departureLocation3?.split(
                                        ","
                                      )[0]}
                                    {allflightData?.goDepartureAirport3 ||
                                      allflightData?.departureAirport3}
                                  </td>
                                  <td>
                                    (
                                    {allflightData?.goArrival3 ||
                                      allflightData?.arrival3}
                                    ){" "}
                                    {allflightData?.goArrivalLocation3?.split(
                                      ","
                                    )[0] ||
                                      allflightData?.arrivalLocation3?.split(
                                        ","
                                      )[0]}{" "}
                                    {allflightData?.goArrivalAirport3 ||
                                      allflightData?.arrivalAirport3}
                                  </td>
                                  <td>
                                    {allflightData?.goDepartureTime3
                                      ? format(
                                          new Date(
                                            `${allflightData?.goDepartureTime3}`
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : allflightData?.departureTime3
                                      ? format(
                                          new Date(
                                            `${allflightData?.departureTime3}`
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : "depart Date"}
                                  </td>
                                  <td>
                                    {allflightData?.goArrivalTime3
                                      ? format(
                                          new Date(
                                            `${allflightData?.goArrivalTime3}`
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : allflightData?.arrivalTime3
                                      ? format(
                                          new Date(
                                            `${allflightData?.arrivalTime3}`
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : "arrival Date"}
                                  </td>
                                  <td>
                                    Cabin: 7Kg, Class:{" "}
                                    {allflightData?.goBookingCode3 ||
                                      allflightData?.bookingcode3}
                                    <br />
                                    Baggage:{" "}
                                    {fareCost[0]?.adultCount > 0 && (
                                      <>
                                        {parseInt(
                                          fareCost[0]?.adultBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        ) > 3 ? (
                                          <>
                                            ADT-
                                            {
                                              fareCost[0]?.adultBag
                                                ?.split("|")[0]
                                                ?.split("-")[1]
                                            }
                                          </>
                                        ) : (
                                          <>
                                            ADT-
                                            {
                                              fareCost[0]?.adultBag
                                                ?.split("|")[0]
                                                ?.split("-")[1]
                                            }
                                          </>
                                        )}
                                      </>
                                    )}
                                    {fareCost[0]?.childCount > 0 && (
                                      <>
                                        {parseInt(
                                          fareCost[0]?.childBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        ) > 3 ? (
                                          <>
                                            {", "}CNN-
                                            {
                                              fareCost[0]?.childBag
                                                ?.split("|")[0]
                                                ?.split("-")[1]
                                            }
                                          </>
                                        ) : (
                                          <>
                                            {", "}CNN-
                                            {
                                              fareCost[0]?.childBag
                                                ?.split("|")[0]
                                                ?.split("-")[1]
                                            }
                                          </>
                                        )}
                                      </>
                                    )}
                                    {fareCost[0]?.infantCount > 0 && (
                                      <>
                                        {parseInt(
                                          fareCost[0]?.infantBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        ) > 3 ? (
                                          <>
                                            {", "}INF-
                                            {
                                              fareCost[0]?.infantBag
                                                ?.split("|")[0]
                                                ?.split("-")[1]
                                            }
                                          </>
                                        ) : (
                                          <>
                                            {", "}INF-
                                            {
                                              fareCost[0]?.infantBag
                                                ?.split("|")[0]
                                                ?.split("-")[1]
                                            }
                                          </>
                                        )}
                                      </>
                                    )}
                                    <br />
                                    Duration:{" "}
                                    {allflightData?.goFlightDuration3 ||
                                      allflightData?.flightDuration3}
                                  </td>
                                </tr>
                              )}
                            </>
                          )}

                        {fareCost[0]?.tripType === "return" &&
                          allflightData?.segment === "3" && (
                            <tr>
                              <td>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${
                                    allflightData?.goMarketingCareer3 ||
                                    allflightData?.marketingCareer3
                                  }.png`}
                                  width="30px"
                                  height="30px"
                                  alt="flight Image"
                                />
                                <br />
                                {allflightData?.goMarketingCareerName3 ||
                                  allflightData?.marketingCareerName3}
                                <br />
                                {allflightData?.goMarketingCareer3 ||
                                  allflightData?.marketingCareer3}{" "}
                                {allflightData?.goMarketingFlight3 ||
                                  allflightData?.marketingFlight3}
                              </td>
                              <td>
                                (
                                {allflightData?.goDeparture3 ||
                                  allflightData?.departure3}
                                ){" "}
                                {allflightData?.goDepartureLocation3?.split(
                                  ","
                                )[0] ||
                                  allflightData?.departureLocation3?.split(
                                    ","
                                  )[0]}
                                {allflightData?.goDepartureAirport3 ||
                                  allflightData?.departureAirport3}
                              </td>
                              <td>
                                (
                                {allflightData?.goArrival3 ||
                                  allflightData?.arrival3}
                                ){" "}
                                {allflightData?.goArrivalLocation3?.split(
                                  ","
                                )[0] ||
                                  allflightData?.arrivalLocation3?.split(
                                    ","
                                  )[0]}{" "}
                                {allflightData?.goArrivalAirport3 ||
                                  allflightData?.arrivalAirport3}
                              </td>
                              <td>
                                {allflightData?.goDepartureTime3
                                  ? format(
                                      new Date(
                                        `${allflightData?.goDepartureTime3}`
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : allflightData?.departureTime3
                                  ? format(
                                      new Date(
                                        `${allflightData?.departureTime3}`
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "depart Date"}
                              </td>
                              <td>
                                {allflightData?.goArrivalTime3
                                  ? format(
                                      new Date(
                                        `${allflightData?.goArrivalTime3}`
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : allflightData?.arrivalTime3
                                  ? format(
                                      new Date(
                                        `${allflightData?.arrivalTime3}`
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "arrival Date"}
                              </td>
                              <td>
                                Cabin: 7Kg, Class:{" "}
                                {allflightData?.goBookingCode3 ||
                                  allflightData?.bookingcode3}
                                <br />
                                Baggage:{" "}
                                {fareCost[0]?.adultCount > 0 && (
                                  <>
                                    {parseInt(
                                      fareCost[0]?.adultBag
                                        ?.split("|")[0]
                                        ?.split("-")[1]
                                    ) > 3 ? (
                                      <>
                                        ADT-
                                        {
                                          fareCost[0]?.adultBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        }
                                      </>
                                    ) : (
                                      <>
                                        ADT-
                                        {
                                          fareCost[0]?.adultBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        }
                                      </>
                                    )}
                                  </>
                                )}
                                {fareCost[0]?.childCount > 0 && (
                                  <>
                                    {parseInt(
                                      fareCost[0]?.childBag
                                        ?.split("|")[0]
                                        ?.split("-")[1]
                                    ) > 3 ? (
                                      <>
                                        {", "}CNN-
                                        {
                                          fareCost[0]?.childBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        }
                                      </>
                                    ) : (
                                      <>
                                        {", "}CNN-
                                        {
                                          fareCost[0]?.childBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        }
                                      </>
                                    )}
                                  </>
                                )}
                                {fareCost[0]?.infantCount > 0 && (
                                  <>
                                    {parseInt(
                                      fareCost[0]?.infantBag
                                        ?.split("|")[0]
                                        ?.split("-")[1]
                                    ) > 3 ? (
                                      <>
                                        {", "}INF-
                                        {
                                          fareCost[0]?.infantBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        }
                                      </>
                                    ) : (
                                      <>
                                        {", "}INF-
                                        {
                                          fareCost[0]?.infantBag
                                            ?.split("|")[0]
                                            ?.split("-")[1]
                                        }
                                      </>
                                    )}
                                  </>
                                )}
                                <br />
                                Duration:{" "}
                                {allflightData?.goFlightDuration3 ||
                                  allflightData?.flightDuration3}
                              </td>
                            </tr>
                          )}
                        {/* Segment 1 back type=return  */}
                        {fareCost[0]?.tripType === "return" && (
                          <>
                            {allflightData?.backDeparture1 !== "" && (
                              <tr>
                                <td>
                                  <img
                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${allflightData?.backMarketingCareer1}.png`}
                                    width="30px"
                                    height="30px"
                                    alt="flight Image"
                                  />
                                  <br />
                                  {allflightData?.backMarketingCareerName1}
                                  <br />
                                  {allflightData?.backMarketingCareer1}{" "}
                                  {allflightData?.backMarketingFlight1}
                                </td>
                                <td>
                                  ({allflightData?.backDeparture1}){" "}
                                  {
                                    allflightData?.backDepartureLocation1?.split(
                                      ","
                                    )[0]
                                  }
                                  {allflightData?.backDepartureAirport1}
                                </td>
                                <td>
                                  ({allflightData?.backArrival1}){" "}
                                  {
                                    allflightData?.backArrivalLocation1?.split(
                                      ","
                                    )[0]
                                  }
                                  {allflightData?.backArrivalAirport1}
                                </td>

                                <td>
                                  {allflightData?.backDepartureTime1
                                    ? format(
                                        new Date(
                                          `${allflightData?.backDepartureTime1}`
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )
                                    : "back depart date"}
                                </td>
                                <td>
                                  {allflightData?.backArrivalTime1
                                    ? format(
                                        new Date(
                                          `${allflightData?.backArrivalTime1}`
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )
                                    : "arrival Date"}
                                </td>
                                <td>
                                  Cabin: 7Kg, Class:{" "}
                                  {allflightData?.backBookingCode1}
                                  <br />
                                  Baggage:{" "}
                                  {fareCost[0]?.adultCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          ADT-
                                          {
                                            fareCost[0]?.adultBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          ADT-
                                          {
                                            fareCost[0]?.adultBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                  {fareCost[0]?.childCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          {", "}CNN-
                                          {
                                            fareCost[0]?.childBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          {", "}CNN-
                                          {
                                            fareCost[0]?.childBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                  {fareCost[0]?.infantCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          {", "}INF-
                                          {
                                            fareCost[0]?.infantBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          {", "}INF-
                                          {
                                            fareCost[0]?.infantBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                          Piece
                                        </>
                                      )}
                                    </>
                                  )}
                                  <br />
                                  Duration: {allflightData?.backFlightDuration1}
                                </td>
                              </tr>
                            )}
                            {allflightData?.backDeparture2 !== "" && (
                              <tr>
                                <td>
                                  <img
                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${allflightData?.backMarketingCareer2}.png`}
                                    width="30px"
                                    height="30px"
                                    alt="flight Image"
                                  />
                                  <br />
                                  {allflightData?.backMarketingCareerName2}
                                  <br />
                                  {allflightData?.backMarketingCareer2}{" "}
                                  {allflightData?.backMarketingFlight2}
                                </td>
                                <td>
                                  ({allflightData?.backDeparture2}){" "}
                                  {
                                    allflightData?.backDepartureLocation2?.split(
                                      ","
                                    )[0]
                                  }
                                  {allflightData?.backDepartureAirport2}
                                </td>
                                <td>
                                  ({allflightData?.backArrival2}){" "}
                                  {
                                    allflightData?.backArrivalLocation2?.split(
                                      ","
                                    )[0]
                                  }
                                  {allflightData?.backArrivalAirport2}
                                </td>

                                <td>
                                  {allflightData?.backDepartureTime2
                                    ? format(
                                        new Date(
                                          `${allflightData?.backDepartureTime2}`
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )
                                    : "back depart date"}
                                </td>
                                <td>
                                  {allflightData?.backArrivalTime2
                                    ? format(
                                        new Date(
                                          `${allflightData?.backArrivalTime2}`
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )
                                    : "arrival Date"}
                                </td>
                                <td>
                                  Cabin: 7Kg, Class:{" "}
                                  {allflightData?.backBookingCode2}
                                  <br />
                                  Baggage:{" "}
                                  {fareCost[0]?.adultCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          ADT-
                                          {
                                            fareCost[0]?.adultBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          ADT-
                                          {
                                            fareCost[0]?.adultBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                  {fareCost[0]?.childCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          {", "}CNN-
                                          {
                                            fareCost[0]?.childBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          {", "}CNN-
                                          {
                                            fareCost[0]?.childBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                  {fareCost[0]?.infantCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          {", "}INF-
                                          {
                                            fareCost[0]?.infantBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          {", "}INF-
                                          {
                                            fareCost[0]?.infantBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                          Piece
                                        </>
                                      )}
                                    </>
                                  )}
                                  <br />
                                  Duration: {allflightData?.backFlightDuration2}
                                </td>
                              </tr>
                            )}
                            {allflightData?.backDeparture3 !== "" && (
                              <tr>
                                <td>
                                  <img
                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${allflightData?.backMarketingCareer3}.png`}
                                    width="30px"
                                    height="30px"
                                    alt="flight Image"
                                  />
                                  <br />
                                  {allflightData?.backMarketingCareerName3}
                                  <br />
                                  {allflightData?.backMarketingCareer3}{" "}
                                  {allflightData?.backMarketingFlight3}
                                </td>
                                <td>
                                  ({allflightData?.backDeparture3}){" "}
                                  {
                                    allflightData?.backDepartureLocation3?.split(
                                      ","
                                    )[0]
                                  }
                                  {allflightData?.backDepartureAirport3}
                                </td>
                                <td>
                                  ({allflightData?.backArrival3}){" "}
                                  {
                                    allflightData?.backArrivalLocation3?.split(
                                      ","
                                    )[0]
                                  }
                                  {allflightData?.backArrivalAirport3}
                                </td>

                                <td>
                                  {allflightData?.backDepartureTime3
                                    ? format(
                                        new Date(
                                          `${allflightData?.backDepartureTime3}`
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )
                                    : "back depart date"}
                                </td>
                                <td>
                                  {allflightData?.backArrivalTime3
                                    ? format(
                                        new Date(
                                          `${allflightData?.backArrivalTime3}`
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )
                                    : "arrival Date"}
                                </td>
                                <td>
                                  Cabin: 7Kg, Class:{" "}
                                  {allflightData?.backBookingCode3}
                                  <br />
                                  Baggage:{" "}
                                  {fareCost[0]?.adultCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.adultBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          ADT-
                                          {
                                            fareCost[0]?.adultBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          ADT-
                                          {
                                            fareCost[0]?.adultBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                  {fareCost[0]?.childCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.childBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          {", "}CNN-
                                          {
                                            fareCost[0]?.childBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          {", "}CNN-
                                          {
                                            fareCost[0]?.childBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                  {fareCost[0]?.infantCount > 0 && (
                                    <>
                                      {parseInt(
                                        fareCost[0]?.infantBag
                                          ?.split("|")[0]
                                          ?.split("-")[1]
                                      ) > 3 ? (
                                        <>
                                          {", "}INF-
                                          {
                                            fareCost[0]?.infantBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                        </>
                                      ) : (
                                        <>
                                          {", "}INF-
                                          {
                                            fareCost[0]?.infantBag
                                              ?.split("|")[0]
                                              ?.split("-")[1]
                                          }
                                          Piece
                                        </>
                                      )}
                                    </>
                                  )}
                                  <br />
                                  Duration: {allflightData?.backFlightDuration3}
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </table>
                    </Box>
                  </Box>

                  {/*  flight ITINERARIES end here */}

                  {/*  price breakdown start here */}

                  <Box className="client-pdf-des pdf-break">
                    <h4>PRICE BREAKDOWN</h4>
                  </Box>

                  <Box mt={2} className="clientInvoice-table">
                    <table>
                      <tr>
                        <td>Passenger </td>
                        <td>Base Fare </td>
                        <td>Tax</td>
                        <td style={{ textAlign: "right" }}>Total Fare</td>
                      </tr>

                      {fareCost[0]?.adultCount > 0 ? (
                        <tr>
                          <td>Adult X{fareCost[0]?.adultCount}</td>
                          {/* <td>
                         {sabreBookData.fareOffers[0]
                           ?.checkedBaggageAllowance?.maximumPieces && (
                           <>
                             {" "}
                             {sabreBookData.fareOffers[0]
                               ?.checkedBaggageAllowance?.maximumPieces ||
                               "0.0"}{" "}
                             Piece
                           </>
                         )}
                         {sabreBookData.fareOffers[0]
                           ?.checkedBaggageAllowance
                           ?.totalWeightInKilograms && (
                           <>
                             {" "}
                             {sabreBookData.fareOffers[0]
                               ?.checkedBaggageAllowance
                               ?.totalWeightInKilograms || "0.0"}{" "}
                             Kg
                           </>
                         )}
                       </td> */}
                          <td>{commaNumber(fareCost[0]?.adultCostBase)} BDT</td>
                          <td>{commaNumber(fareCost[0]?.adultCostTax)} BDT</td>
                          <td style={{ textAlign: "right" }}>
                            {commaNumber(adultTotalPrice)} BDT
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}

                      {fareCost[0]?.childCount > 0 ? (
                        <tr>
                          <td>Child X{fareCost[0]?.childCount}</td>
                          {/* <td>
                         {sabreBookData.fareOffers[0]
                           ?.checkedBaggageAllowance?.maximumPieces && (
                           <>
                             {" "}
                             {sabreBookData.fareOffers[0]
                               ?.checkedBaggageAllowance?.maximumPieces ||
                               "0.0"}{" "}
                             Piece
                           </>
                         )}
                         {sabreBookData.fareOffers[0]
                           ?.checkedBaggageAllowance
                           ?.totalWeightInKilograms && (
                           <>
                             {" "}
                             {sabreBookData.fareOffers[0]
                               ?.checkedBaggageAllowance
                               ?.totalWeightInKilograms || "0.0"}{" "}
                             Kg
                           </>
                         )}
                       </td> */}
                          <td>{commaNumber(fareCost[0]?.childCostBase)} BDT</td>
                          <td>{commaNumber(fareCost[0]?.childCostTax)} BDT</td>
                          <td style={{ textAlign: "right" }}>
                            {commaNumber(childTotalPrice)} BDT
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {fareCost[0]?.infantCount > 0 ? (
                        <tr>
                          <td>Infant X{fareCost[0]?.infantCount}</td>
                          {/* <td></td> */}
                          <td>
                            {commaNumber(fareCost[0]?.infantCostBase)} BDT
                          </td>
                          <td>{commaNumber(fareCost[0]?.infantCostTax)} BDT</td>
                          <td style={{ textAlign: "right" }}>
                            {commaNumber(infantTotalPrice)} BDT
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}

                      <tr>
                        <td colSpan="7" style={{ textAlign: "end" }}>
                          Grand TOTAL:&nbsp;
                          <strong>{commaNumber(totalPrice)} BDT</strong>
                        </td>
                      </tr>
                    </table>
                  </Box>

                  <Box mt={4}>
                    <Grid container spacing={2}>
                      <Grid item md={7}>
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          className="clientInvoice-price-box"
                        >
                          <Box>
                            <h5>Base fare total amount</h5>
                            <h5>Tax</h5>
                            <h5 style={{ fontWeight: "bold" }}>
                              Customer Total Ticket fare Amount
                            </h5>
                          </Box>
                          <Box textAlign={"right"}>
                            <h5>{commaNumber(fareCost[0]?.baseFare)} BDT</h5>
                            <h5>{commaNumber(fareCost[0]?.Tax)} BDT</h5>

                            <h5 style={{ fontWeight: "bold" }}>
                              {commaNumber(totalPrice)} BDT
                            </h5>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box className="clientInvoice-price-content">
                    <h6>In Words: {prices} Taka Only</h6>
                  </Box>

                  {/* <Box className="clientInvoice-note">
                 <h6>Note:</h6>
                 <p>
                   All payment should be made in favor of "Fly Far
                   International".This Invoice will not be recognized as paid
                   unless supported by Company Official Receipt. 3% Bank
                   Charge will be add on total bill amount, if the bill
                   Paid/settled by Debit/Credit Card
                 </p>
               </Box> */}

                  {/* body end */}
                </Box>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default BookingConfirWithPrice;
