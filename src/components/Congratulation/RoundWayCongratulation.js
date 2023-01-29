import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useRef, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import commaNumber from "comma-number";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../../../image/loader/Render.gif";
import confirm from "../../../image/Icon/confirm 1.png";
import cancelConfirmation from "../../../image/undraw/undraw_confirmation_re_b6q5.svg";

import ClientInvoice from "../../AllPdf/Invoice/ClientInvoice/ClientInvoice";
import AgentInvoice from "../../AllPdf/Invoice/AgentInvoice/AgentInvoice";
import BookingConfirWithoutPrice from "../../AllPdf/BookingPdf/BookingConfirWithoutPrice/BookingConfirWithoutPrice";
import BookingConfirWithPrice from "../../AllPdf/BookingPdf/BookingConfirWithPrice/BookingConfirWithPrice";

import ClientInvoiceF from "../../AllFlyhubPdf/Invoice/ClientInvoice/ClientInvoiceF";
import AgentInvoiceF from "../../AllFlyhubPdf/Invoice/AgentInvoice/AgentInvoiceF";
import BookingConfirWithPriceF from "../../AllFlyhubPdf/BookingPdf/BookingConfirWithPrice/BookingConfirWithPriceF";
import BookingConfirWithoutPriceF from "../../AllFlyhubPdf/BookingPdf/BookingConfirWithoutPrice/BookingConfirWithoutPriceF";

import Swal from "sweetalert2";
import axios from "axios";
import flightData from "../DashboardMain/flightData";
import { format } from "date-fns";
import secureLocalStorage from "react-secure-storage";
import airlineNames from "../Queues/Queues/QueuesDetail/airlineNames";

const RoundWayCongratulation = () => {
  //  handle accordion function
  //Data from Queues page

  const location = useLocation();
  const bookingId = location.state?.bookingDetails?.BookingId;
  const {
    agentId,
    system,
    airlines,
    name,
    phone,
    email,
    pnr,
    pax,
    adultcount,
    childcount,
    infantcount,
    netcost,
    adultcostbase,
    childcostbase,
    infantcostbase,
    adultcosttax,
    childcosttax,
    infantcosttax,
    grosscost,
    basefare,
    tax,
    from,
    to,
    tripType,
  } = location?.state?.bookingInfo;
  const [openModal, setOpenModal] = useState(false);
  const { Results } = location?.state?.allFlightData?.searchResult;
  // console.log(location?.state?.bookingInfo);
  const navigate = useNavigate();

  const searchId = location?.state?.bookingInfo?.SearchID;
  const resultId = location?.state?.bookingInfo?.ResultID;
  const [downExpanded, setDownExpanded] = useState();
  const handleChangeDown = (panel) => (event, newExpanded) => {
    setDownExpanded(newExpanded ? panel : false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [expanded, setExpanded] = useState("panel1");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [issueLoading, setIssueLoading] = useState(false);
  // --------------------- client information start ---------------------------
  // const users = JSON.parse(sessionStorage.getItem("user-info"));
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  let staffName = users?.user?.name;
  let agentName = users?.user?.name;

  const [flyhubBookData, setflyhubBookData] = useState({});
  const [sabreBookData, setSabreBookData] = useState({});
  const [bookingDetails, setBookingDetails] = useState([]);
  const [fareCost, setFareCost] = useState({});
  const [userData, setUserData] = useState([]);
  const [flightName, setFlightName] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [invoiceId, setInvoiceId] = useState([]);
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      if (system === "FlyHub") {
        const resflyHub = await axios(
          `https://api.flyfarint.com/v.1.0.0/FlyHub/AirRetrieve.php?BookingID=${pnr}`
        );
        setflyhubBookData(resflyHub.data);
      } else {
        const resSabre = await axios(
          `https://api.flyfarint.com/v.1.0.0/Sabre/AirRetrieve.php?BookingID=${pnr}`
        );
        // console.log(resSabre.data);
        setSabreBookData(resSabre.data);
      }
      const resBooking = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentId}&search=all`
      );
      setBookingDetails(resBooking.data);

      const resBookingId = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentId}&search=BId&bookingId=${bookingId}`
      );
      setFareCost(resBookingId.data);

      const resUserData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentId}`
      );
      setUserData(resUserData.data);

      const resPassengerData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/PassengerData.php?bookingId=${bookingId}&agentId=${agentId}`
      );
      setPassengerData(resPassengerData.data);

      const resBalenceData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentId}&balance`
      );
      setBalance(resBalenceData.data);

      if (system === "FlyHub") {
        if (Object.keys(flyhubBookData).length !== 0) {
          const resAirlineCode = await axios(
            `https://api.flyfarint.com/v.1.0.0/AirMaterials/Airlines.php?search=${flyhubBookData?.flights[0]?.airlineCode}`
          );
          setFlightName(resAirlineCode.data);
          const adults = flyhubBookData?.travelers.filter(
            (item) => item.type === "ADULT"
          );
          const saving =
            (parseInt(flyhubBookData?.fares[0]?.totals?.subtotal) +
              parseInt(flyhubBookData?.fares[0]?.totals?.taxes)) *
            (7 / 100);
        }
      }
      if (system === "Sabre") {
        if (Object.keys(sabreBookData).length !== 0) {
          const resAirlineCode = await axios(
            `https://api.flyfarint.com/v.1.0.0/AirMaterials/Airlines.php?search=${sabreBookData?.flights[0]?.airlineCode}`
          );
          setFlightName(resAirlineCode.data);
          const adults = sabreBookData?.travelers.filter(
            (item) => item.type === "ADULT"
          );
          const saving =
            (parseInt(sabreBookData?.fares[0]?.totals?.subtotal) +
              parseInt(sabreBookData?.fares[0]?.totals?.taxes)) *
            (7 / 100);
        }
      }
    };

    fetchAllData();
  }, [system, pnr, agentId]);

  const [fare, setFare] = useState();

  useEffect(() => {
    async function handleSearchFare(e) {
      let body = JSON.stringify({
        SearchID: searchId,
        ResultID: resultId,
      });
      await fetch("https://api.flyfarint.com/v.1.0.0/FlyHub/AirFareRules.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          setFare(data);
        });
    }

    const url5 = `https://api.flyfarint.com/v.1.0.0/Queues/Ticketing.php?bookingId=${bookingId}&invoiceId=${fareCost[0]?.invoiceId}`;
    const fetchUserData5 = fetch(url5)
      .then((res) => res.json())
      .then((data) => {
        setInvoiceId(data);
      });
    handleSearchFare();
  }, [bookingId]);

  const airLineName = airlineNames;
  const [nameofflight, setNameofflight] = useState([]);
  useEffect(() => {
    if (Object.keys(sabreBookData).length !== 0) {
      sabreBookData?.flights.map((flightData) => {
        airLineName.map((airName) => {
          if (airName.code === flightData.operatingAirlineCode) {
            setNameofflight((prev) => [...prev, airName.name]);
          }
        });
      });
    }
  }, [sabreBookData]);

  const cancelBooking = (system, pnr) => {
    Swal.fire({
      imageUrl: cancelConfirmation,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You Wants to Cancel this Flight ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Cancel it!",
      confirmButtonColor: "#003566",
      cancelButtonText: "Don't Cancel it",
      cancelButtonColor: "#dc143c",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsLoading(false);
        let url = `https://api.flyfarint.com/v.1.0.0/${system}/AirCancel.php`;
        let body = JSON.stringify({
          BookingID: pnr,
          cancelBy: staffName || agentID,
        });
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: body,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.status === "success") {
              setIsLoading(true);
              Swal.fire({
                icon: "success",
                title: "Your Flight is Cancel!",
                html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc143c",
              }).then(() => {
                navigate("/dashboard/queues/queues");
              });
            } else {
              throw new Error("error");
            }
          })
          .catch((err) => {
            setIsLoading(true);
            Swal.fire({
              icon: "error",
              title: "Booking Cancel Failed!",
              html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/dashboard/queues/queues");
            });
          });
      }
    });
  };

  //--------------- Booking cancel handle end ------------------
  //--------------- Isssue Ticket Start ------------------

  const issueTime = new Date();
  async function handleSearch(e) {
    e.preventDefault();
    if (parseInt(balance[0]?.bonus) > 0) {
      Swal.fire({
        title: "Use Your Bonus Balance",
        html: "If you use your bonus balance <strong>100 BDT</strong> will be deduct form your bonus wallet",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Redeem Bonus",
        denyButtonText: `Don't Use Bonus`,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoading(false);
          setIssueLoading(true);
          fetch(
            "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                agentId: agentID || "Agent",
                bookingId: bookingId || "BookingId",
                staffId: staffId || "Staff",
                airlines: airlines,
                issueRequestBy: staffName || agentName,
                route: `${from}-${to}`,
                type: tripType,
                cost: netcost,
                pnr: pnr,
                gds: system,
                status: "Issue in Process",
                useFromBonus: "yes",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                Swal.fire({
                  icon: "Success",
                  title: "Issue Ticket Request Successful",
                  html: "Your issue ticket is submitted successfully Please wait for a response; if you do not receive any email, Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                }).then(function () {
                  setIssueLoading(false);
                  setIsLoading(true);
                  navigate("/dashboard/queues/queues");
                });
              } else {
                throw new Error("error");
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Sorry",
                html: "<strong>Issue Ticket Failed!</strong>",
              }).then(function () {
                setIssueLoading(false);
                setIsLoading(true);
                navigate("/dashboard/queues/queues");
              });
            });
        } else if (result.isDenied) {
          setIsLoading(false);
          setIssueLoading(true);
          fetch(
            "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                agentId: agentID || "Agent",
                bookingId: bookingId || "BookingId",
                staffId: staffId || "Staff",
                airlines: airlines,
                issueRequestBy: staffName || agentName,
                route: `${from}-${to}`,
                type: tripType,
                cost: netcost,
                pnr: pnr,
                gds: system,
                status: "Issue in Process",
                useFromBonus: "no",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                Swal.fire({
                  icon: "Success",
                  title: "Issue Ticket Request Successful",
                  html: "Your issue ticket is submitted successfully Please wait for a response; if you do not receive any email, Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                }).then(function () {
                  setIssueLoading(false);
                  setIsLoading(true);
                  navigate("/dashboard/queues/queues");
                });
              } else {
                throw new Error("error");
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Sorry",
                html: "<strong>Issue Ticket Failed!</strong>",
              }).then(function () {
                setIssueLoading(false);
                setIsLoading(true);
                navigate("/dashboard/queues/queues");
              });
            });
        }
      });
    } else {
      setIsLoading(false);
      setIssueLoading(true);
      await fetch(
        "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: agentID || "Agent",
            bookingId: bookingId || "BookingId",
            staffId: staffId || "Staff",
            airlines: airlines,
            issueRequestBy: staffName || agentName,
            route: `${from}-${to}`,
            type: tripType,
            cost: netcost,
            pnr: pnr,
            gds: staffId,
            status: "Issue in Process",
            useFromBonus: "no",
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            Swal.fire({
              icon: "Success",
              title: "Issue Ticket Request Successful",
              html: "Your issue ticket is submitted successfully Please wait for a response; if you do not receive any email, Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
            }).then(function () {
              setIssueLoading(false);
              setIsLoading(true);
              navigate("/dashboard/queues/queues");
            });
          } else {
            throw new Error("error");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Sorry",
            html: "<strong>Issue Ticket Failed!</strong>",
          }).then(function () {
            setIssueLoading(false);
            setIsLoading(true);
            navigate("/dashboard/queues/queues");
          });
        });
    }
  }

  //--------------- Issue Ticket end ------------------1

  const data = flightData;
  let fromCountryName;
  {
    data.map((flightData) => {
      if (flightData.code === from) {
        fromCountryName = flightData?.Address;
      }
    });
  }
  let toCountryName;
  {
    data.map((flightData) => {
      if (flightData.code === to) {
        toCountryName = flightData?.Address;
      }
    });
  }

  // ---------------------- Table row handle by filter start------------------=

  //  all passenger total price calculation
  const adultTotalPrice =
    parseInt(fareCost[0]?.adultCostBase) + parseInt(fareCost[0]?.adultCostTax);

  const childTotalPrice =
    parseInt(fareCost[0]?.childCostBase) + parseInt(fareCost[0]?.childCostTax);

  const infantTotalPrice =
    parseInt(fareCost[0]?.infantCostBase) +
    parseInt(fareCost[0]?.infantCostTax);

  const totalPrice = adultTotalPrice + childTotalPrice + infantTotalPrice;

  const savingMoney =
    parseInt(fareCost[0]?.grossCost) - parseInt(fareCost[0]?.netCost);

  const finalPrice = totalPrice - savingMoney;
  // ---------------------- Table row handle by filter end ------------------

  // saving calculation

  //  booking price update
  const [basePrice, setBasePrice] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const updateBookingPrice = () => {};

  // const allData = {
  //   pnr: location?.state?.pnr,
  //   fromCountryName: fromCountryName,
  //   toCountryName: toCountryName,
  //   bookingId: bookingId,
  //   bookDate: fareCost[0]?.dateTime,
  //   issueTime: issueTime,
  // };

  const allData = {
    pnr: location?.state?.pnr || location.state.bookingInfo.pnr,
    fromCountryName: fromCountryName,
    toCountryName: toCountryName,
    bookingId: bookingId,
    issueTime: issueTime,
  };

  //todo remove last word function
  function removeLastWord(str) {
    const lastIndexOfSpace = str.lastIndexOf(" ");

    if (lastIndexOfSpace === -1) {
      return str;
    }

    return str.substring(0, lastIndexOfSpace);
  }

  const adultFareRules = sabreBookData?.fareRules?.filter(
    (fareAdultData) => fareAdultData.passengerCode === "ADT"
  );

  const childFareRules = sabreBookData?.fareRules?.filter(
    (fareChildData) => fareChildData.passengerCode === "C09"
  );

  if (!isLoading) {
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
  const allAirportName = flightData;

  return (
    <>
      {system === "Sabre" ? (
        <Container className="queues-detail-parent" maxWidth="xxl">
          {Object.keys(sabreBookData).length !== 0 ? (
            <Box pb={4}>
              <Grid container spacing={2} mt={4}>
                <Grid item xs={12} md={9.5}>
                  <Grid gap={"15px"} className="congratulation-content">
                    <Box>
                      <img src={confirm} alt="..." />
                    </Box>
                    <Box>
                      <h4>Thank You. Your Booking is Confirmed</h4>
                      <p>
                        A Confirmation email has been sent to your provided
                        email address.
                      </p>
                    </Box>
                  </Grid>
                  <Box className="queues-detail">
                    <Grid container justifyContent={"space-between"}>
                      <Grid item mt={4} mb={2} md={8}>
                        <h2>Reference ID: {bookingId}</h2>
                      </Grid>
                      <Grid item mt={4} mb={2} md={3} textAlign="end">
                        <button>{fareCost[0]?.status || "Hold"}</button>
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

                            <h5>Booked By: </h5>
                            <h5>Booked At: </h5>
                            <h5>Time Limit: </h5>
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
                              {from} - {to} - {from}
                              {/* {fromCountryName?.split(",")[0] || from} -
                              {toCountryName?.split(",")[0] || to} -{" "}
                              {fromCountryName?.split(",")[0] || from} */}
                            </h5>

                            <h5>{fareCost[0]?.bookedby}</h5>
                            <h5>
                              {fareCost[0]?.bookedAt
                                ? fareCost[0]?.bookedAt
                                  ? format(
                                      new Date(
                                        fareCost[0]?.bookedAt.toString()
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "Booked Time"
                                : "Booked Time"}
                            </h5>
                            <h5 style={{ color: "red" }}>
                              {fareCost[0]?.timeLimit
                                ? fareCost[0]?.timeLimit
                                  ? format(
                                      new Date(
                                        fareCost[0]?.timeLimit.toString()
                                      ),
                                      "dd MMM yyyy hh:mm a"
                                    )
                                  : "Immediate Issue"
                                : "Immediate Issue"}
                            </h5>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item>
                        {sabreBookData?.fareRules === undefined ? (
                          <Typography
                            style={{
                              color: "red",
                              fontWeight: 600,
                            }}
                          >
                            Non Refundable / Economy
                          </Typography>
                        ) : (
                          <>
                            {sabreBookData?.fareRules[0]?.isRefundable ===
                            true ? (
                              <Typography
                                style={{
                                  color: "green",
                                  fontWeight: 600,
                                }}
                              >
                                Refundable / Economy
                              </Typography>
                            ) : (
                              <Typography
                                style={{
                                  color: "red",
                                  fontWeight: 600,
                                }}
                              >
                                Non Refundable / Economy
                              </Typography>
                            )}
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Box>

                  {/* ------------- FLight Information ---------------------------- */}

                  <Box mt={2} className="flight-queue-detail-fareInfo">
                    <span>Flight Information</span>
                    <Box mt={2}>
                      <Box>
                        <table>
                          <tr>
                            <th width="7%">Flight</th>
                            <th width="10%">Departure From</th>
                            <th width="10%">Arrival To</th>
                            <th width="10%">Depart At</th>
                            <th width="10%">Arrive At</th>
                            <th width="10%">Info</th>
                          </tr>

                          {!sabreBookData === undefined ? (
                            <></>
                          ) : !sabreBookData?.flights[0]?.itemId ? (
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td colSpan={"2"}>
                                {" "}
                                <Box sx={{ display: "flex" }}>
                                  <CircularProgress
                                    style={{ backgroundColor: "#fff" }}
                                  />
                                </Box>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          ) : (
                            <>
                              {sabreBookData?.flights.map(
                                (flightData, index) => (
                                  <tr>
                                    <td>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.airlineCode}.png`}
                                        width="30px"
                                        height="30px"
                                        alt="flight Image"
                                      />
                                      <br />
                                      {nameofflight[index] ||
                                        fareCost[0]?.airlines}
                                      {" | "}
                                      {flightData?.operatingAirlineCode}{" "}
                                      {flightData?.operatingFlightNumber}
                                    </td>

                                    <td>
                                      {allAirportName.map((name) => (
                                        <>
                                          {name.code ===
                                          flightData?.fromAirportCode ? (
                                            <>
                                              ({name.code})-
                                              {
                                                name?.Address?.split(",")[0]
                                              }, {name?.name}
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      ))}
                                      <br />
                                      {!flightData?.departureTerminalName ? (
                                        <></>
                                      ) : (
                                        <>
                                          {flightData?.departureTerminalName}{" "}
                                          <br></br> Gate -{" "}
                                          {flightData?.departureGate}
                                        </>
                                      )}
                                    </td>

                                    <td>
                                      {allAirportName.map((name) => (
                                        <>
                                          {name.code ===
                                          flightData?.toAirportCode ? (
                                            <>
                                              ({name.code})-
                                              {
                                                name?.Address?.split(",")[0]
                                              }, {name?.name}
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      ))}
                                      <br />
                                      {!flightData?.arrivalTerminalName ? (
                                        <></>
                                      ) : (
                                        <>
                                          {flightData?.arrivalTerminalName}{" "}
                                          <br></br> Gate -{" "}
                                          {flightData?.arrivalGate}
                                        </>
                                      )}
                                    </td>

                                    <td>
                                      {flightData?.departureDate
                                        ? format(
                                            new Date(
                                              `${flightData?.departureDate}:${flightData?.departureTime}`
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "Depart date"}
                                    </td>
                                    <td>
                                      {flightData?.arrivalDate
                                        ? format(
                                            new Date(
                                              `${flightData?.arrivalDate}:${flightData?.arrivalTime}`
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "Depart date"}
                                    </td>
                                    <td>
                                      Cabin: 7Kg <br />
                                      Baggage:{" "}
                                      {sabreBookData.fareOffers[0]
                                        ?.checkedBaggageAllowance
                                        ?.maximumPieces && (
                                        <>
                                          {" "}
                                          {sabreBookData.fareOffers[0]
                                            ?.checkedBaggageAllowance
                                            ?.maximumPieces || "0.0"}{" "}
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
                                            ?.totalWeightInKilograms ||
                                            "0.0"}{" "}
                                          Kg
                                        </>
                                      )}{" "}
                                      <br />
                                      {flightData?.cabinTypeName}
                                      <br />
                                      Duration:{" "}
                                      {Math.floor(
                                        flightData?.durationInMinutes / 60
                                      )}
                                      h&nbsp;
                                      {flightData?.durationInMinutes -
                                        Math.floor(
                                          flightData?.durationInMinutes / 60
                                        ) *
                                          60}
                                      m
                                    </td>
                                  </tr>
                                )
                              )}
                            </>
                          )}
                        </table>
                      </Box>
                    </Box>
                  </Box>

                  {/*---------------------------- Fare details ----------------------------*/}

                  <Box mt={2} className="queue-detail-fareInfo">
                    <span>Fare Details</span>

                    <Box mt={2}>
                      <Box display={{ lg: "flex" }}>
                        <table>
                          <tr>
                            <th>Passenger </th>
                            {/* <th>Baggage</th> */}
                            <th>Base Fare </th>
                            <th>Tax</th>
                            <th>Total Fare</th>
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
                                      ?.checkedBaggageAllowance
                                      ?.maximumPieces || "0.0"}{" "}
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
                              <td>
                                {commaNumber(fareCost[0]?.adultCostBase)} BDT
                              </td>
                              <td>
                                {commaNumber(fareCost[0]?.adultCostTax)} BDT
                              </td>
                              <td>{commaNumber(adultTotalPrice)} BDT</td>
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
                                      ?.checkedBaggageAllowance
                                      ?.maximumPieces || "0.0"}{" "}
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
                              <td>
                                {commaNumber(fareCost[0]?.childCostBase)} BDT
                              </td>
                              <td>
                                {commaNumber(fareCost[0]?.childCostTax)} BDT
                              </td>
                              <td>{commaNumber(childTotalPrice)} BDT</td>
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
                              <td>
                                {commaNumber(fareCost[0]?.infantCostTax)} BDT
                              </td>
                              <td>{commaNumber(infantTotalPrice)} BDT</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </table>
                      </Box>
                      <table>
                        <tr>
                          <td style={{ color: "#DC143C" }}>
                            Your Saving:
                            <em style={{ padding: "0px 10px" }}>
                              {commaNumber(savingMoney)} BDT
                            </em>{" "}
                          </td>

                          <td>
                            Agent Total:
                            <em style={{ paddingLeft: "10px" }}>
                              {commaNumber(fareCost[0]?.netCost)} BDT
                            </em>
                          </td>

                          <td>
                            Customer Total:
                            <em style={{ paddingLeft: "10px" }}>
                              {commaNumber(totalPrice)} BDT
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

                    <div>
                      {passengerData.map((traveler) => (
                        <Accordion
                          expanded={expanded === "panel1"}
                          onChange={handleChange("panel1")}
                          style={{
                            border: "1px solid #C4C4C4",
                            boxShadow: "none",
                            overflow: "hidden",
                          }}
                        >
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            sx={{
                              borderBottom: "1px solid #DEDEDE",
                              height: "0px !important",
                            }}
                          >
                            <Box
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
                              </h5>
                            </Box>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Grid container spacing={2}>
                              <Grid item xs={4} md={2}>
                                <h5>Nationality</h5>
                                <h6>{traveler?.passNation}</h6>
                              </Grid>

                              <Grid item xs={4} md={2}>
                                <h5>Date of Birth</h5>
                                <h6>
                                  {traveler?.dob
                                    ? format(
                                        new Date(traveler?.dob),
                                        "dd MMM yyyy"
                                      )
                                    : "Date of Birth"}
                                </h6>
                              </Grid>

                              <Grid item xs={4} md={2}>
                                <h5>Gender</h5>
                                <h6> {traveler?.gender}</h6>
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
                                  {fareCost[0].journeyType === "Outbound"
                                    ? traveler?.passNo?.toUpperCase() ||
                                      "Passport Number"
                                    : "Domestic Flight"}
                                </h6>
                              </Grid>
                              <Grid item xs={4} md={2}>
                                <h5>Passport Expire Date</h5>

                                <h6>
                                  {fareCost[0]?.journeyType === "Outbound"
                                    ? traveler?.passEx
                                      ? format(
                                          new Date(traveler?.passEx),
                                          "dd MMM yyyy"
                                        )
                                      : "Passport Expire Date"
                                    : "Domestic Flight"}
                                </h6>
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={12} md={2.5}>
                  <Box>
                    <div>
                      <Accordion
                        expanded={expanded === "panel8"}
                        onChange={handleChange("panel8")}
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            style={{
                              color: "#dc143c",
                              fontFamily: "poppies",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            Download / PDF
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* <ClientInvoice allData={allData} />
                          <AgentInvoice allData={allData} /> */}
                          <BookingConfirWithPrice allData={allData} />
                          <BookingConfirWithoutPrice allData={allData} />
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2bh-content"
                          id="panel2bh-header"
                        >
                          <Typography
                            style={{
                              color: "#dc143c",
                              fontFamily: "poppies",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            Fare Rules
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {sabreBookData?.fareRules === undefined ? (
                            <>Non Refundable</>
                          ) : sabreBookData?.fareRules !== undefined ? (
                            <>
                              <Typography
                                style={{
                                  color: "#003566",
                                  fontFamily: "poppies",
                                  fontWeight: "500",
                                  fontSize: "15px",
                                }}
                              >
                                Refund Penalties
                              </Typography>

                              {adultFareRules[0]?.passengerCode === "ADT" && (
                                <Box>
                                  <Typography
                                    style={{
                                      color: "#dc143c",
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Adult
                                  </Typography>

                                  <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    lineHeight="35px"
                                  >
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      Before Departure
                                    </span>
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      {adultFareRules[0]?.refundPenalties ===
                                      undefined ? (
                                        <>0.0 &#2547;</>
                                      ) : (
                                        <>
                                          {childFareRules[0]?.refundPenalties[0]
                                            ?.penalty?.amount || "0.0"}{" "}
                                          &#2547;
                                        </>
                                      )}
                                    </span>
                                  </Box>
                                </Box>
                              )}

                              {childFareRules[0]?.passengerCode === "C09" && (
                                <Box>
                                  <Typography
                                    style={{
                                      color: "#dc143c",
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Child
                                  </Typography>

                                  <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    lineHeight="35px"
                                  >
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      Before Departure
                                    </span>
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      {childFareRules[0]?.refundPenalties ===
                                      undefined ? (
                                        <>0.0 &#2547;</>
                                      ) : (
                                        <>
                                          {childFareRules[0]?.refundPenalties[0]
                                            ?.penalty?.amount || "0.0"}{" "}
                                          &#2547;
                                        </>
                                      )}
                                    </span>
                                  </Box>
                                </Box>
                              )}
                              <Box my={2}>
                                <hr></hr>
                              </Box>
                              <Typography
                                style={{
                                  color: "#003566",
                                  fontFamily: "poppies",
                                  fontWeight: "500",
                                  fontSize: "15px",
                                }}
                              >
                                Reissue Penalties
                              </Typography>

                              {adultFareRules[0]?.passengerCode === "ADT" && (
                                <Box>
                                  <Typography
                                    style={{
                                      color: "#dc143c",
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Adult
                                  </Typography>

                                  <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    lineHeight="35px"
                                  >
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      Before Departure
                                    </span>
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      {adultFareRules[0]?.exchangePenalties ===
                                      undefined ? (
                                        <>0.0 &#2547;</>
                                      ) : (
                                        <>
                                          {adultFareRules[0]
                                            ?.exchangePenalties[0]?.penalty
                                            ?.amount || "0.0"}
                                          &#2547;
                                        </>
                                      )}
                                    </span>
                                  </Box>
                                </Box>
                              )}

                              {childFareRules[0]?.passengerCode === "C09" && (
                                <Box>
                                  <Typography
                                    style={{
                                      color: "#dc143c",
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "14px",
                                      lineHeight: "30px",
                                    }}
                                  >
                                    Child
                                  </Typography>

                                  <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    lineHeight="35px"
                                  >
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      Before Departure
                                    </span>
                                    <span
                                      style={{
                                        color: "#272323",
                                        fontSize: "13px",
                                        fontFamily: "poppins",
                                        fontWeight: "500",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      {childFareRules[0]?.exchangePenalties ===
                                      undefined ? (
                                        <>0.0 &#2547;</>
                                      ) : (
                                        <>
                                          {childFareRules[0]
                                            ?.exchangePenalties[0]?.penalty
                                            ?.amount || "0.0"}
                                          &#2547;
                                        </>
                                      )}
                                    </span>
                                  </Box>
                                </Box>
                              )}
                            </>
                          ) : (
                            <>
                              No automatic fare rules available, Please mail us
                              for fare rules.
                            </>
                          )}
                        </AccordionDetails>
                      </Accordion>

                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                        style={{
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3bh-content"
                          id="panel3bh-header"
                        >
                          <Typography
                            style={{
                              color: "#dc143c",
                              fontFamily: "poppies",
                              fontWeight: "500",
                              fontSize: "15px",
                            }}
                          >
                            Baggage
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            lineHeight="35px"
                          >
                            <span
                              style={{
                                color: "#272323",
                                fontSize: "13px",
                                fontFamily: "poppins",
                                fontWeight: "500",
                              }}
                            >
                              Cabin Baggage
                            </span>
                            <span
                              style={{
                                color: "#272323",
                                fontSize: "13px",
                                fontFamily: "poppins",
                                fontWeight: "500",
                              }}
                            >
                              7 KG
                            </span>
                          </Box>
                          <>
                            {fareCost[0]?.adultCount > 0 && (
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                lineHeight="20px"
                              >
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  Adult
                                </span>
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  {sabreBookData.fareOffers[0]
                                    ?.checkedBaggageAllowance
                                    ?.maximumPieces && (
                                    <>
                                      {" "}
                                      {sabreBookData.fareOffers[0]
                                        ?.checkedBaggageAllowance
                                        ?.maximumPieces || "0"}{" "}
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
                                        ?.totalWeightInKilograms || "0"}{" "}
                                      Kg
                                    </>
                                  )}
                                </span>
                              </Box>
                            )}
                            {fareCost[0]?.childCount > 0 && (
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                lineHeight="20px"
                              >
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  Child
                                </span>
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  {sabreBookData.fareOffers[0]
                                    ?.checkedBaggageAllowance
                                    ?.maximumPieces && (
                                    <>
                                      {" "}
                                      {sabreBookData.fareOffers[0]
                                        ?.checkedBaggageAllowance
                                        ?.maximumPieces || "0"}{" "}
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
                                        ?.totalWeightInKilograms || "0"}{" "}
                                      Kg
                                    </>
                                  )}
                                </span>
                              </Box>
                            )}
                            {fareCost[0]?.infantCount > 0 && (
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                lineHeight="20px"
                              >
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  Infant
                                </span>
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  {sabreBookData.fareOffers[0]
                                    ?.checkedBaggageAllowance
                                    ?.maximumPieces && (
                                    <>
                                      {" "}
                                      {sabreBookData.fareOffers[1]
                                        ?.checkedBaggageAllowance
                                        ?.maximumPieces || "0"}{" "}
                                      Piece
                                    </>
                                  )}
                                  {sabreBookData.fareOffers[1]
                                    ?.checkedBaggageAllowance
                                    ?.totalWeightInKilograms && (
                                    <>
                                      {" "}
                                      {sabreBookData.fareOffers[1]
                                        ?.checkedBaggageAllowance
                                        ?.totalWeightInKilograms || "0"}{" "}
                                      Kg
                                    </>
                                  )}
                                </span>
                              </Box>
                            )}
                          </>
                        </AccordionDetails>
                      </Accordion>
                    </div>

                    {bookingDetails.status === "Ticketed" ? (
                      <>
                        <Box className="queues-detail-calcel-btn">
                          <button
                            style={{
                              backgroundColor: "#003566",
                              color: "#fff",
                              border: "none",
                            }}
                          >
                            Re-Issue
                          </button>
                        </Box>
                        <Box className="queues-detail-calcel-btn">
                          <button
                            style={{
                              backgroundColor: "#003566",
                              color: "#fff",
                              border: "none",
                            }}
                          >
                            Refund
                          </button>
                        </Box>
                        <Box className="queues-detail-calcel-btn">
                          <button
                            style={{
                              backgroundColor: "#003566",
                              color: "#fff",
                              border: "none",
                            }}
                          >
                            Void
                          </button>
                        </Box>
                      </>
                    ) : bookingDetails.status === "Issue In Processing" ? (
                      <>
                        <Box className="queues-detail-calcel-btn">
                          <button
                            style={{
                              backgroundColor: "#003566",
                              color: "#fff",
                              border: "none",
                            }}
                          >
                            Wait For Ticketed
                          </button>
                        </Box>
                      </>
                    ) : (
                      <>
                        {parseInt(balance[0]?.lastAmount) >=
                        parseInt(fareCost[0]?.netCost) ? (
                          <>
                            <Box className="queues-detail-calcel-btn">
                              {!issueLoading ? (
                                <button
                                  style={{
                                    backgroundColor: "#003566",
                                    color: "#fff",
                                    border: "none",
                                  }}
                                  onClick={handleSearch}
                                >
                                  Issue Ticket
                                </button>
                              ) : (
                                <CircularProgress />
                              )}
                            </Box>
                          </>
                        ) : parseInt(balance[0]?.lastAmount) +
                            parseInt(balance[0]?.lastAmount) >=
                          parseInt(fareCost[0]?.netCost) ? (
                          <>
                            <Box className="queues-detail-calcel-btn">
                              {!issueLoading ? (
                                <button
                                  style={{
                                    backgroundColor: "#003566",
                                    color: "#fff",
                                    border: "none",
                                  }}
                                  onClick={handleSearch}
                                >
                                  Issue Ticket
                                </button>
                              ) : (
                                <CircularProgress />
                              )}
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box className="queues-detail-calcel-btn">
                              <button
                                style={{
                                  backgroundColor: "#003566",
                                  color: "#fff",
                                  border: "none",
                                }}
                                onClick={() => setOpenModal(true)}
                              >
                                Issue Ticket
                              </button>
                            </Box>
                          </>
                        )}
                        <Modal
                          open={openModal}
                          onClose={() => setOpenModal(false)}
                          className="custom-modal-r"
                          width="50%"
                        >
                          <Box
                            className="modalStyler"
                            bgcolor="#fff"
                            p="25px"
                            textAlign="center"
                          >
                            <Typography
                              sx={{
                                fontSize: "22px",
                                textAlign: "center",
                                fontWeight: 600,
                                mt: "15px",
                                color: "#DC143C",
                                mb: "20px",
                              }}
                            >
                              Insufficient Balance !
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                textAlign: "center",
                                fontWeight: 500,
                                mt: "15px",
                                color: "#222222",
                                mb: "20px",
                              }}
                            >
                              you have insufficient balance, please make deposit
                              to issue this ticket
                            </Typography>
                            <NavLink
                              to="/dashboard/account/DepositEntry"
                              style={{
                                textDecoration: "none",
                                color: "#fff",
                                backgroundColor: "#033655",
                                padding: "5px 10px",
                              }}
                            >
                              Deposit Request
                            </NavLink>
                          </Box>
                        </Modal>
                        <Box className="queues-detail-calcel-btn">
                          <button onClick={() => cancelBooking(system, pnr)}>
                            Cancel Flight
                          </button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
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
        </Container>
      ) : system === "FlyHub" ? (
        <Container maxWidth="xxl">
          {Object.keys(flyhubBookData).length !== 0 ? (
            <Box pb={4}>
              <Grid container spacing={2}>
                {flyhubBookData?.bookingId === null ? (
                  <Box
                    position={"absolute"}
                    top="50%"
                    left="40%"
                    fontSize="30px"
                  >
                    Your Flight Booking is Time Out{" "}
                  </Box>
                ) : (
                  <>
                    <Grid item xs={12} md={9.5}>
                      <Grid container mt={4} mb={2} mx="24px">
                        <Grid gap={"15px"} className="congratulation-content">
                          <Box>
                            <img src={confirm} alt="..." />
                          </Box>
                          <Box>
                            <h4>Thank You. Your Booking is Confirmed</h4>
                            <p>
                              A Confirmation email has been sent to your
                              provided email address.
                            </p>
                          </Box>
                        </Grid>
                      </Grid>
                      <Box className="queues-detail">
                        <Grid container justifyContent={"space-between"}>
                          <Box mt={4} mb={2}>
                            <h2>Reference ID: {bookingId}</h2>
                          </Box>
                          <Box mt={4} mb={2}>
                            <button>{fareCost[0]?.status || "Hold"}</button>
                          </Box>
                        </Grid>
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
                                  }}
                                >
                                  Destination:
                                </h5>

                                <h5>Booked By: </h5>
                                <h5>Booked At: </h5>
                                <h5>Time Limit: </h5>
                              </Box>

                              <Box>
                                <h5
                                  style={{
                                    color: "#003566",
                                    fontWeight: "500",
                                    fontSize: "17px",
                                    // marginBottom: "10px",
                                  }}
                                >
                                  {from} - {to} - {from}
                                  {/* {fromCountryName?.split(",")[0] || from} -
                                  {toCountryName?.split(",")[0] || to} -{" "}
                                  {fromCountryName?.split(",")[0] || from} */}
                                </h5>
                                <h5>{fareCost[0]?.bookedby}</h5>
                                <h5>
                                  {fareCost[0]?.bookedAt
                                    ? fareCost[0]?.bookedAt
                                      ? format(
                                          new Date(
                                            fareCost[0]?.bookedAt.toString()
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : "Booked Time"
                                    : "Booked Time"}
                                </h5>
                                <h5 style={{ color: "red" }}>
                                  {fareCost[0]?.timeLimit
                                    ? fareCost[0]?.timeLimit
                                      ? format(
                                          new Date(
                                            fareCost[0]?.timeLimit.toString()
                                          ),
                                          "dd MMM yyyy hh:mm a"
                                        )
                                      : "Immediate Issue"
                                    : "Immediate Issue"}
                                </h5>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item>
                            {flyhubBookData?.Results[0]?.IsRefundable ===
                            undefined ? (
                              <Typography
                                style={{
                                  color: "red",
                                  fontWeight: 600,
                                }}
                              >
                                Non Refundable / Economy
                              </Typography>
                            ) : (
                              <>
                                {flyhubBookData?.Results[0]?.IsRefundable ===
                                true ? (
                                  <Typography
                                    style={{
                                      color: "green",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Refundable / Economy
                                  </Typography>
                                ) : (
                                  <Typography
                                    style={{
                                      color: "red",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Non Refundable / Economy
                                  </Typography>
                                )}
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Box>

                      {/* ------------- FLight Information ---------------------------- */}

                      <Box mt={2} className="flight-queue-detail-fareInfo">
                        <span>Flight Information</span>

                        <Box mt={2}>
                          {/* <Typography mb={1}>Departure Flight</Typography> */}

                          <table>
                            <tr>
                              <th>Flight Segment</th>
                              <th>Flight No </th>
                              <th>Career Name </th>
                              <th>Departure</th>
                              <th>Arrival</th>
                              <th>Class</th>
                            </tr>
                            <>
                              {/* --------Segments 0-------- */}
                              <tr>
                                {flyhubBookData?.Results[0]?.segments[0] &&
                                  flyhubBookData.Results[0]?.segments[0]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[0]
                                          ?.Origin?.Airport?.AirportCode
                                      }
                                      -
                                      {
                                        flyhubBookData?.Results[0]?.segments[0]
                                          ?.Destination?.Airport?.AirportCode
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[0] &&
                                  flyhubBookData.Results[0]?.segments[0]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[0]
                                          ?.Airline?.AirlineCode
                                      }
                                      {
                                        flyhubBookData?.Results[0]?.segments[0]
                                          ?.Airline?.FlightNumber
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[0] &&
                                  flyhubBookData.Results[0]?.segments[0]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[0]
                                          ?.Airline?.AirlineName
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[0] &&
                                  flyhubBookData.Results[0]?.segments[0]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {flyhubBookData?.Results[0]?.segments[0]
                                        ?.Origin?.DepTime
                                        ? format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[0]?.Origin?.DepTime
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "Departure Date"}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[0] &&
                                  flyhubBookData.Results[0]?.segments[0]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {flyhubBookData?.Results[0]?.segments[0]
                                        ?.Destination?.ArrTime
                                        ? format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[0]?.Destination?.ArrTime
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )
                                        : "Arrival Time"}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[0] &&
                                  flyhubBookData.Results[0]?.segments[0]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {flyhubBookData?.Results[0]?.segments[0]
                                        ?.Airline?.CabinClass || "empty"}
                                    </td>
                                  )}
                              </tr>
                              {/* ---------segments 0 End-------- */}
                              {/* ---------segments 1 Start-------- */}
                              <tr>
                                {flyhubBookData?.Results[0]?.segments[1] &&
                                  flyhubBookData.Results[0]?.segments[1]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[1]
                                          ?.Origin?.Airport?.AirportCode
                                      }
                                      -
                                      {
                                        flyhubBookData?.Results[0]?.segments[1]
                                          ?.Destination?.Airport?.AirportCode
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[1] &&
                                  flyhubBookData.Results[0]?.segments[1]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[1]
                                          ?.Airline?.AirlineCode
                                      }
                                      {
                                        flyhubBookData?.Results[0]?.segments[1]
                                          ?.Airline?.FlightNumber
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[1] &&
                                  flyhubBookData.Results[0]?.segments[1]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[1]
                                          ?.Airline?.AirlineName
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[1] &&
                                  flyhubBookData.Results[0]?.segments[1]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {format(
                                        new Date(
                                          flyhubBookData?.Results[0]?.segments[1]?.Origin?.DepTime?.toString()
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[1] &&
                                  flyhubBookData.Results[0]?.segments[1]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {format(
                                        new Date(
                                          flyhubBookData?.Results[0]?.segments[1]?.Destination?.ArrTime?.toString()
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[1] &&
                                  flyhubBookData.Results[0]?.segments[1]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {/* Class:{" "}
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[0]?.Airline
                                                ?.BookingClass
                                            }{" "} */}
                                      {
                                        flyhubBookData?.Results[0]?.segments[1]
                                          ?.Airline?.CabinClass
                                      }
                                    </td>
                                  )}
                              </tr>
                              {/* ---------segments 1 End-------- */}
                              {/* ---------segments 2 Start-------- */}
                              <tr>
                                {flyhubBookData?.Results[0]?.segments[2] &&
                                  flyhubBookData.Results[0]?.segments[2]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[2]
                                          ?.Origin?.Airport?.AirportCode
                                      }
                                      -
                                      {
                                        flyhubBookData?.Results[0]?.segments[2]
                                          ?.Destination?.Airport?.AirportCode
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[2] &&
                                  flyhubBookData.Results[0]?.segments[2]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {
                                        flyhubBookData?.Results[0]?.segments[2]
                                          ?.Airline?.AirlineCode
                                      }
                                      {
                                        flyhubBookData?.Results[0]?.segments[2]
                                          ?.Airline?.FlightNumber
                                      }
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[2] &&
                                  flyhubBookData.Results[0]?.segments[2]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {flyhubBookData?.Results[0]?.segments[2]
                                        ?.Airline?.AirlineName || "empty"}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[2] &&
                                  flyhubBookData.Results[0]?.segments[2]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {format(
                                        new Date(
                                          flyhubBookData?.Results[0]?.segments[2]?.Origin?.DepTime?.toString()
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[2] &&
                                  flyhubBookData.Results[0]?.segments[2]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {format(
                                        new Date(
                                          flyhubBookData?.Results[0]?.segments[2]?.Destination?.ArrTime?.toString()
                                        ),
                                        "dd MMM yyyy hh:mm a"
                                      )}
                                    </td>
                                  )}
                                {flyhubBookData?.Results[0]?.segments[2] &&
                                  flyhubBookData.Results[0]?.segments[2]
                                    ?.TripIndicator === "OutBound" && (
                                    <td>
                                      {flyhubBookData?.Results[0]?.segments[2]
                                        ?.Airline?.CabinClass || "empty"}
                                    </td>
                                  )}
                              </tr>

                              {tripType === "oneway" ? (
                                <></>
                              ) : (
                                <>
                                  {/* --------Segments 1-------- */}
                                  <tr className="trflyhub">
                                    {flyhubBookData?.Results[0]?.segments[1] &&
                                      flyhubBookData.Results[0]?.segments[1]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[1]?.Origin?.Airport
                                              ?.AirportCode
                                          }
                                          -
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[1]?.Destination
                                              ?.Airport?.AirportCode
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[1] &&
                                      flyhubBookData.Results[0]?.segments[1]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[1]?.Airline
                                              ?.AirlineCode
                                          }
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[1]?.Airline
                                              ?.FlightNumber
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[1] &&
                                      flyhubBookData.Results[0]?.segments[1]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[1]?.Airline
                                              ?.AirlineName
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[1] &&
                                      flyhubBookData.Results[0]?.segments[1]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[1]?.Origin?.DepTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[1] &&
                                      flyhubBookData.Results[0]?.segments[1]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[1]?.Destination?.ArrTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[1] &&
                                      flyhubBookData.Results[0]?.segments[1]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {flyhubBookData?.Results[0]
                                            ?.segments[1]?.Airline
                                            ?.CabinClass || "empty"}
                                        </td>
                                      )}
                                  </tr>
                                  {/* ---------segments 1 End-------- */}

                                  {/* ---------segments 2 Start-------- */}
                                  <tr>
                                    {flyhubBookData?.Results[0]?.segments[2] &&
                                      flyhubBookData.Results[0]?.segments[2]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[2]?.Origin?.Airport
                                              ?.AirportCode
                                          }
                                          -
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[2]?.Destination
                                              ?.Airport?.AirportCode
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[2] &&
                                      flyhubBookData.Results[0]?.segments[2]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[2]?.Airline
                                              ?.AirlineCode
                                          }
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[2]?.Airline
                                              ?.FlightNumber
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[2] &&
                                      flyhubBookData.Results[0]?.segments[2]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[2]?.Airline
                                              ?.AirlineName
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[2] &&
                                      flyhubBookData.Results[0]?.segments[2]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[2]?.Origin?.DepTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[2] &&
                                      flyhubBookData.Results[0]?.segments[2]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[2]?.Destination?.ArrTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[2] &&
                                      flyhubBookData.Results[0]?.segments[2]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {flyhubBookData?.Results[0]
                                            ?.segments[2]?.Airline
                                            ?.CabinClass || "empty"}
                                        </td>
                                      )}
                                  </tr>
                                  {/* ---------segments 2 End-------- */}

                                  {/* ---------segments 3 Start-------- */}
                                  <tr>
                                    {flyhubBookData?.Results[0]?.segments[3] &&
                                      flyhubBookData.Results[0]?.segments[3]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[3]?.Origin?.Airport
                                              ?.AirportCode
                                          }
                                          -
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[3]?.Destination
                                              ?.Airport?.AirportCode
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[3] &&
                                      flyhubBookData.Results[0]?.segments[3]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[3]?.Airline
                                              ?.AirlineCode
                                          }
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[3]?.Airline
                                              ?.FlightNumber
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[3] &&
                                      flyhubBookData.Results[0]?.segments[3]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[3]?.Airline
                                              ?.AirlineName
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[3] &&
                                      flyhubBookData.Results[0]?.segments[3]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[3]?.Origin?.DepTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[3] &&
                                      flyhubBookData.Results[0]?.segments[3]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[3]?.Destination?.ArrTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}

                                    {flyhubBookData?.Results[0]?.segments[3] &&
                                      flyhubBookData.Results[0]?.segments[3]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {flyhubBookData?.Results[0]
                                            ?.segments[3]?.Airline
                                            ?.CabinClass || "empty"}
                                        </td>
                                      )}
                                  </tr>
                                  {/* ---------segments 3 End-------- */}

                                  {/* ---------segments 4 Start-------- */}
                                  <tr>
                                    {flyhubBookData?.Results[0]?.segments[4] &&
                                      flyhubBookData.Results[0]?.segments[4]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[4]?.Origin?.Airport
                                              ?.AirportCode
                                          }
                                          -
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[4]?.Destination
                                              ?.Airport?.AirportCode
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[4] &&
                                      flyhubBookData.Results[0]?.segments[4]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[4]?.Airline
                                              ?.AirlineCode
                                          }
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[4]?.Airline
                                              ?.FlightNumber
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[4] &&
                                      flyhubBookData.Results[0]?.segments[4]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[4]?.Airline
                                              ?.AirlineName
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[4] &&
                                      flyhubBookData.Results[0]?.segments[4]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[4]?.Origin?.DepTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[4] &&
                                      flyhubBookData.Results[0]?.segments[4]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[4]?.Destination?.ArrTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}

                                    {flyhubBookData?.Results[0]?.segments[4] &&
                                      flyhubBookData.Results[0]?.segments[4]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {flyhubBookData?.Results[0]
                                            ?.segments[4]?.Airline
                                            ?.CabinClass || "empty"}
                                        </td>
                                      )}
                                  </tr>
                                  {/* ---------segments 4 End-------- */}

                                  {/* ---------segments 5 Start-------- */}
                                  <tr>
                                    {flyhubBookData?.Results[0]?.segments[5] &&
                                      flyhubBookData.Results[0]?.segments[5]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[5]?.Origin?.Airport
                                              ?.AirportCode
                                          }
                                          -
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[5]?.Destination
                                              ?.Airport?.AirportCode
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[5] &&
                                      flyhubBookData.Results[0]?.segments[5]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[5]?.Airline
                                              ?.AirlineCode
                                          }
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[5]?.Airline
                                              ?.FlightNumber
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[5] &&
                                      flyhubBookData.Results[0]?.segments[5]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {
                                            flyhubBookData?.Results[0]
                                              ?.segments[5]?.Airline
                                              ?.AirlineName
                                          }
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[5] &&
                                      flyhubBookData.Results[0]?.segments[5]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[5]?.Origin?.DepTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}
                                    {flyhubBookData?.Results[0]?.segments[5] &&
                                      flyhubBookData.Results[0]?.segments[5]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {format(
                                            new Date(
                                              flyhubBookData?.Results[0]?.segments[5]?.Destination?.ArrTime?.toString()
                                            ),
                                            "dd MMM yyyy hh:mm a"
                                          )}
                                        </td>
                                      )}

                                    {flyhubBookData?.Results[0]?.segments[5] &&
                                      flyhubBookData.Results[0]?.segments[5]
                                        ?.TripIndicator === "InBound" && (
                                        <td>
                                          {flyhubBookData?.Results[0]
                                            ?.segments[5]?.Airline
                                            ?.CabinClass || "empty"}
                                        </td>
                                      )}
                                  </tr>
                                  {/* ---------segments 5 End-------- */}
                                </>
                              )}

                              {/* ---------segments 2 End-------- */}
                            </>
                          </table>
                        </Box>
                      </Box>

                      {/*---------------------------- Fare details ----------------------------*/}

                      <Box mt={2} className="queue-detail-fareInfo">
                        <span>Fare Details</span>

                        <Box mt={2}>
                          <Box>
                            <table>
                              <tr>
                                <th>Passenger </th>
                                {/* <th>Baggage</th> */}
                                <th>Base Fare </th>
                                <th>Tax</th>
                                <th>Total Fare</th>
                              </tr>

                              {fareCost[0]?.adultCount > 0 ? (
                                <tr>
                                  <td>Adult X{fareCost[0]?.adultCount}</td>
                                  {/* <td>
                                    {flyhubBookData?.Results[0]?.Fares[0]
                                      ?.PaxType === "Adult" && (
                                      <>
                                        {" "}
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.baggageDetails[0].Checkin ||
                                          "0.0 Kg"}
                                      </>
                                    )}
                                  </td> */}
                                  <td>
                                    {/* {console.log("data", fareCost[0])} */}
                                    {commaNumber(
                                      fareCost[0]?.adultCostBase
                                    )}{" "}
                                    BDT
                                  </td>
                                  <td>
                                    {commaNumber(fareCost[0]?.adultCostTax)} BDT
                                  </td>
                                  <td>{commaNumber(adultTotalPrice)} BDT</td>
                                </tr>
                              ) : (
                                <></>
                              )}

                              {fareCost[0]?.childCount > 0 ? (
                                <tr>
                                  <td>Child X{fareCost[0]?.childCount}</td>
                                  {/* <td>
                                    {" "}
                                    {flyhubBookData?.Results[0]?.Fares[1]
                                      ?.PaxType === "Child" && (
                                      <>
                                        {flyhubBookData?.Results[0]?.segments[1]
                                          ?.baggageDetails[1].Checkin ||
                                          "0.0 Kg"}
                                      </>
                                    )}
                                  </td> */}
                                  <td>
                                    {commaNumber(fareCost[0]?.childCostBase)}{" "}
                                    BDT
                                  </td>
                                  <td>
                                    {commaNumber(fareCost[0]?.childCostTax)} BDT
                                  </td>
                                  <td>{commaNumber(childTotalPrice)} BDT</td>
                                </tr>
                              ) : (
                                <></>
                              )}
                              {fareCost[0]?.infantCount > 0 ? (
                                <tr>
                                  <td>Infant X{fareCost[0]?.infantCount}</td>
                                  {/* <td>
                                    {" "}
                                    {flyhubBookData?.Results[0]?.Fares[2]
                                      ?.PaxType === "Infant" && (
                                      <>
                                        {flyhubBookData?.Results[0]?.segments[2]
                                          ?.baggageDetails[2].Checkin ||
                                          "0.0 Kg"}
                                      </>
                                    )}
                                  </td> */}
                                  <td>
                                    {commaNumber(fareCost[0]?.infantCostBase)}{" "}
                                    BDT
                                  </td>
                                  <td>
                                    {commaNumber(fareCost[0]?.infantCostTax)}{" "}
                                    BDT
                                  </td>
                                  <td>{commaNumber(infantTotalPrice)} BDT</td>
                                </tr>
                              ) : (
                                <></>
                              )}
                            </table>
                          </Box>
                          <table>
                            <tr>
                              <td style={{ color: "#DC143C" }}>
                                Your Saving:
                                <em style={{ padding: "0px 10px" }}>
                                  {commaNumber(savingMoney)} BDT
                                </em>{" "}
                              </td>

                              <td>
                                Agent Total:
                                <em style={{ paddingLeft: "10px" }}>
                                  {commaNumber(fareCost[0]?.netCost)} BDT
                                </em>
                              </td>

                              <td>
                                Customer Total:
                                <em style={{ paddingLeft: "10px" }}>
                                  {commaNumber(totalPrice)} BDT
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

                        <div>
                          {flyhubBookData?.Passengers?.map((traveler) => (
                            <Accordion
                              expanded={expanded === "panel1"}
                              onChange={handleChange("panel1")}
                              style={{
                                border: "1px solid #C4C4C4",
                                boxShadow: "none",
                                overflow: "hidden",
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1d-content"
                                id="panel1d-header"
                                sx={{
                                  borderBottom: "1px solid #DEDEDE",
                                  height: "0px !important",
                                }}
                              >
                                <Box
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
                                    {traveler?.Gender === "Male" ? (
                                      <>
                                        {traveler?.Gender === "Male" &&
                                        traveler?.PaxType === "Adult" ? (
                                          <>
                                            MR {traveler?.FirstName}{" "}
                                            {traveler?.LastName}
                                          </>
                                        ) : (
                                          <>
                                            MSTR {traveler?.FirstName}{" "}
                                            {traveler?.LastName}
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {traveler?.Gender === "Female" &&
                                        traveler?.PaxType === "Adult" ? (
                                          <>
                                            MS {traveler?.FirstName}{" "}
                                            {traveler?.LastName}
                                          </>
                                        ) : (
                                          <>
                                            MISS {traveler?.FirstName}{" "}
                                            {traveler?.LastName}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </h5>
                                </Box>
                              </AccordionSummary>

                              <AccordionDetails>
                                <Grid container spacing={2}>
                                  <Grid item xs={4} md={2}>
                                    <h5>Nationality</h5>
                                    <h6>{traveler?.CountryCode}</h6>
                                  </Grid>

                                  <Grid item xs={4} md={2}>
                                    <h5>Date of Birth</h5>

                                    <h6>
                                      {traveler?.DateOfBirth
                                        ? format(
                                            new Date(traveler?.DateOfBirth),
                                            "dd MMM yyyy"
                                          )
                                        : "Date of Birth"}
                                    </h6>
                                  </Grid>

                                  <Grid item xs={4} md={2}>
                                    <h5>Gender</h5>
                                    <h6>
                                      {traveler?.gender ||
                                        traveler?.Gender ||
                                        "Gender"}
                                    </h6>
                                  </Grid>
                                  <Grid item xs={4} md={2}>
                                    <h5>Pax Type</h5>
                                    <h6>
                                      {traveler?.PaxType ||
                                        traveler?.PaxType ||
                                        "PaxType"}
                                    </h6>
                                  </Grid>
                                  <Grid item xs={4} md={2}>
                                    <h5>Passport Number</h5>

                                    <h6>
                                      {fareCost[0]?.journeyType === "Outbound"
                                        ? traveler?.PassportNumber ||
                                          traveler?.passportno ||
                                          "Passport Number"
                                        : "Domestic Flight"}
                                    </h6>
                                  </Grid>
                                  <Grid item xs={4} md={2}>
                                    <h5>Passport Expire Date</h5>
                                    <h6>
                                      {fareCost[0]?.journeyType === "Outbound"
                                        ? traveler?.PassportExpiryDate ||
                                          traveler?.passexpireDate
                                          ? format(
                                              new Date(
                                                traveler?.PassportExpiryDate ||
                                                  traveler?.passexpireDate
                                              ),
                                              "dd MMM yyyy"
                                            )
                                          : "Passport Expire Date"
                                        : "Domestic Flight"}
                                    </h6>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        </div>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={2.5}>
                      <Box mt={5}>
                        <Box>
                          <Accordion
                            expanded={downExpanded === "panel4"}
                            onChange={handleChangeDown("panel4")}
                            style={{
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                            >
                              <Typography
                                style={{
                                  color: "#dc143c",
                                  fontFamily: "poppies",
                                  fontWeight: "500",
                                  fontSize: "15px",
                                }}
                              >
                                Download / PDF
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {/* <ClientInvoiceF allData={allData} />
                              <AgentInvoiceF allData={allData} /> */}
                              <BookingConfirWithPriceF allData={allData} />
                              <BookingConfirWithoutPriceF allData={allData} />
                            </AccordionDetails>
                          </Accordion>

                          <Accordion
                            expanded={downExpanded === "panel2"}
                            onChange={handleChangeDown("panel2")}
                            style={{
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2bh-content"
                              id="panel2bh-header"
                            >
                              <Typography
                                style={{
                                  color: "#dc143c",
                                  fontFamily: "poppies",
                                  fontWeight: "500",
                                  fontSize: "15px",
                                }}
                              >
                                Fare Rules
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {fare?.miniRules === null ? (
                                <>
                                  No automatic fare rules available, Please mail
                                  us for fare rules.
                                </>
                              ) : fare?.miniRules.length > 0 ? (
                                <>
                                  <Typography
                                    style={{
                                      color: "#003566",
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "15px",
                                    }}
                                  >
                                    Refund Penalties
                                  </Typography>

                                  {fareCost[0]?.adultCount > 0 && (
                                    <Box>
                                      <Typography
                                        style={{
                                          color: "#dc143c",
                                          fontFamily: "poppies",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        Adult
                                      </Typography>

                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>Before Departure</span>
                                        <span>
                                          {fare?.miniRules[1]
                                            ?.amountRefundableBeforeDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>After Departure</span>
                                        <span>
                                          {fare?.miniRules[1]
                                            ?.amountrefundableafterDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                    </Box>
                                  )}
                                  {fareCost[0]?.childCount > 0 && (
                                    <Box>
                                      <Typography
                                        style={{
                                          color: "#dc143c",
                                          fontFamily: "poppies",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        Child
                                      </Typography>

                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>Before Departure</span>
                                        <span>
                                          {fare?.miniRules[3]
                                            ?.amountRefundableBeforeDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>After Departure</span>
                                        <span>
                                          {fare?.miniRules[3]
                                            ?.amountrefundableafterDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                    </Box>
                                  )}
                                  {fareCost[0]?.infantCount > 0 && (
                                    <Box>
                                      <Typography
                                        style={{
                                          color: "#dc143c",
                                          fontFamily: "poppies",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        INFANT
                                      </Typography>

                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>Before Departure</span>
                                        <span>
                                          {fare?.miniRules[5]
                                            ?.amountRefundableBeforeDeparture ||
                                            "0.0"}{" "}
                                          &#2547;
                                        </span>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>After Departure</span>
                                        <span>
                                          {fare?.miniRules[5]
                                            ?.amountrefundableafterDeparture ||
                                            "0.0"}{" "}
                                          &#2547;
                                        </span>
                                      </Box>
                                    </Box>
                                  )}

                                  <Box my={2}>
                                    <hr></hr>
                                  </Box>
                                  <Typography
                                    style={{
                                      color: "#003566",
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "15px",
                                    }}
                                  >
                                    Reissue Penalties
                                  </Typography>

                                  {fareCost[0]?.adultCount > 0 && (
                                    <Box>
                                      <Typography
                                        style={{
                                          color: "#dc143c",
                                          fontFamily: "poppies",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        Adult
                                      </Typography>

                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>Before Departure</span>
                                        <span>
                                          {fare?.miniRules[0]
                                            ?.amountExchangeableBeforeDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>After Departure</span>
                                        <span>
                                          {fare?.miniRules[0]
                                            ?.amountExchangeableAfterDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                    </Box>
                                  )}

                                  {fareCost[0]?.childCount > 0 && (
                                    <Box>
                                      <Typography
                                        style={{
                                          color: "#dc143c",
                                          fontFamily: "poppies",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        Child
                                      </Typography>

                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>Before Departure</span>
                                        <span>
                                          {fare?.miniRules[2]
                                            ?.amountExchangeableBeforeDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>After Departure</span>
                                        <span>
                                          {fare?.miniRules[2]
                                            ?.amountExchangeableAfterDeparture ||
                                            "0.0"}
                                          &#2547;
                                        </span>
                                      </Box>
                                    </Box>
                                  )}
                                  {fareCost[0]?.infantCount > 0 && (
                                    <Box>
                                      <Typography
                                        style={{
                                          color: "#dc143c",
                                          fontFamily: "poppies",
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        INFANT
                                      </Typography>

                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>Before Departure</span>
                                        <span>
                                          {fare?.miniRules[4]
                                            ?.amountExchangeableBeforeDeparture ||
                                            "0.0"}{" "}
                                          &#2547;
                                        </span>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        style={{
                                          color: "#272323",
                                          fontSize: "12px",
                                          fontFamily: "poppins",
                                          fontWeight: "500",
                                        }}
                                      >
                                        <span>After Departure</span>
                                        <span>
                                          {fare?.miniRules[4]
                                            ?.amountExchangeableAfterDeparture ||
                                            "0.0"}{" "}
                                          &#2547;
                                        </span>
                                      </Box>
                                    </Box>
                                  )}
                                </>
                              ) : (
                                <>
                                  No automatic fare rules available, Please mail
                                  us for fare rules.
                                </>
                              )}
                            </AccordionDetails>
                          </Accordion>

                          <Accordion
                            expanded={downExpanded === "panel3"}
                            onChange={handleChangeDown("panel3")}
                            style={{
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel3bh-content"
                              id="panel3bh-header"
                            >
                              <Typography
                                style={{
                                  color: "#dc143c",
                                  fontFamily: "poppies",
                                  fontWeight: "500",
                                  fontSize: "15px",
                                }}
                              >
                                Baggage
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                lineHeight="35px"
                              >
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  Cabin Baggage
                                </span>
                                <span
                                  style={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  7 KG
                                </span>
                              </Box>
                              <Box>
                                <Typography>Departure Flight</Typography>
                                <Grid container justifyContent="space-between">
                                  <Grid item>
                                    <Typography color="#000" fontSize="14px">
                                      {fareCost[0]?.adultCount > 0 && (
                                        <>
                                          Adult <br />
                                        </>
                                      )}

                                      {fareCost[0]?.childCount > 0 && (
                                        <>
                                          Child
                                          <br />
                                        </>
                                      )}

                                      {fareCost[0]?.infantCount > 0 && (
                                        <>
                                          Infant <br />
                                        </>
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography color="#000" fontSize="14px">
                                      {flyhubBookData?.Results[0]?.segments[0]?.baggageDetails.map(
                                        (bag) => (
                                          <>
                                            {bag?.Checkin} <br />
                                          </>
                                        )
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {tripType === "return" ? (
                                  <>
                                    <Typography>Return Flight</Typography>
                                    <Grid
                                      container
                                      justifyContent="space-between"
                                    >
                                      <Grid item>
                                        <Typography
                                          color="#000"
                                          fontSize="14px"
                                        >
                                          {fareCost[0]?.adultCount > 0 && (
                                            <>
                                              Adult <br />
                                            </>
                                          )}

                                          {fareCost[0]?.childCount > 0 && (
                                            <>
                                              Child
                                              <br />
                                            </>
                                          )}

                                          {fareCost[0]?.infantCount > 0 && (
                                            <>
                                              Infant <br />
                                            </>
                                          )}
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Typography
                                          color="#000"
                                          fontSize="14px"
                                        >
                                          {flyhubBookData?.Results[0]?.segments[1]?.baggageDetails.map(
                                            (bag) => (
                                              <>
                                                {bag?.Checkin} <br />
                                              </>
                                            )
                                          )}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </>
                                ) : (
                                  ""
                                )}
                              </Box>
                              {/* {flyhubBookData?.Results[0]?.Fares[0]?.PaxType ===
                                "Adult" && (
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  lineHeight="20px"
                                  sx={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span>Adult</span>
                                  <span>
                                    {flyhubBookData?.Results[0]?.segments[0]
                                      ?.baggageDetails[0].Checkin || "0 Kg"}
                                  </span>
                                </Box>
                              )}
                              {flyhubBookData?.Results[0]?.Fares[1]?.PaxType ===
                                "Child" && (
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  lineHeight="20px"
                                  sx={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span>Child</span>
                                  <span>
                                    {flyhubBookData?.Results[0]?.segments[1]
                                      ?.baggageDetails[1].Checkin || "0 Kg"}
                                  </span>
                                </Box>
                              )}
                              {flyhubBookData?.Results[0]?.Fares[2]?.PaxType ===
                                "Infant" && (
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  lineHeight="20px"
                                  sx={{
                                    color: "#272323",
                                    fontSize: "13px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span>Infant</span>
                                  <span>
                                    {flyhubBookData?.Results[0]?.segments[1]
                                      ?.baggageDetails[2].Checkin || "0 Kg"}
                                  </span>
                                </Box>
                              )} */}
                            </AccordionDetails>
                          </Accordion>
                          <>
                            {parseInt(balance[0]?.lastAmount) >=
                            parseInt(fareCost[0]?.netCost) ? (
                              <>
                                <Box className="queues-detail-calcel-btn">
                                  {!issueLoading ? (
                                    <button
                                      style={{
                                        backgroundColor: "#003566",
                                        color: "#fff",
                                        border: "none",
                                      }}
                                      onClick={handleSearch}
                                    >
                                      Issue Ticket
                                    </button>
                                  ) : (
                                    <CircularProgress />
                                  )}
                                </Box>
                              </>
                            ) : parseInt(balance[0]?.lastAmount) +
                                parseInt(balance[0]?.credit) >=
                              parseInt(fareCost[0]?.netCost) ? (
                              <>
                                <Box className="queues-detail-calcel-btn">
                                  {!issueLoading ? (
                                    <button
                                      style={{
                                        backgroundColor: "#003566",
                                        color: "#fff",
                                        border: "none",
                                      }}
                                      onClick={handleSearch}
                                    >
                                      Issue Ticket
                                    </button>
                                  ) : (
                                    <CircularProgress />
                                  )}
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box className="queues-detail-calcel-btn">
                                  <button
                                    style={{
                                      backgroundColor: "#003566",
                                      color: "#fff",
                                      border: "none",
                                    }}
                                    onClick={() => setOpenModal(true)}
                                  >
                                    Issue Ticket
                                  </button>
                                </Box>
                              </>
                            )}
                            <Modal
                              open={openModal}
                              onClose={() => setOpenModal(false)}
                              className="custom-modal-r"
                              width="50%"
                            >
                              <Box
                                className="modalStyler"
                                bgcolor="#fff"
                                p="25px"
                                textAlign="center"
                              >
                                <Typography
                                  sx={{
                                    fontSize: "22px",
                                    textAlign: "center",
                                    fontWeight: 600,
                                    mt: "15px",
                                    color: "#DC143C",
                                    mb: "20px",
                                  }}
                                >
                                  Insufficient Balance !
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    textAlign: "center",
                                    fontWeight: 500,
                                    mt: "15px",
                                    color: "#222222",
                                    mb: "20px",
                                  }}
                                >
                                  you have insufficient balance, please make
                                  deposit to issue this ticket
                                </Typography>
                                <NavLink
                                  to="/dashboard/account/DepositEntry"
                                  style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                    backgroundColor: "#033655",
                                    padding: "5px 10px",
                                  }}
                                >
                                  Deposit Request
                                </NavLink>
                              </Box>
                            </Modal>
                            <Box className="queues-detail-calcel-btn">
                              <button
                                onClick={() => cancelBooking(system, pnr)}
                              >
                                Cancel Flight
                              </button>
                            </Box>
                          </>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
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
        </Container>
      ) : (
        "There is a no queues"
      )}
    </>
  );
};

export default RoundWayCongratulation;
