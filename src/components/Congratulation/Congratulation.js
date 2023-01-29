import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Box,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import commaNumber from "comma-number";
import confirm from "../../images/Icon/confirm 1.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../images/loader/Render.gif";
import axios from "axios";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ReConfirm from "../../images/undraw/undraw_confirmation_re_b6q5.svg";
import Issue from "../../images/undraw/undraw_booking_re_gw4j.svg";
import BookingCancel from "../../images/undraw/undraw_cancel_re_pkdm.svg";
import flightData from "../flightData";
import BookingConfirWithPriceF from "../AllFlyhubPdf/BookingPdf/BookingConfirWithPrice/BookingConfirWithPriceF";
import BookingConfirWithoutPriceF from "../AllFlyhubPdf/BookingPdf/BookingConfirWithoutPrice/BookingConfirWithoutPriceF";
import BookingConfirWithPrice from "../AllPdf/BookingPdf/BookingConfirWithPrice/BookingConfirWithPrice";
import BookingConfirWithoutPrice from "../AllPdf/BookingPdf/BookingConfirWithoutPrice/BookingConfirWithoutPrice";
import AirlineName from "../AirlineName/AirlineName";
import "./Congratulation.css";
import FileUploadSection from "../Shared/FileUploadSection/FileUploadSection";

const Congratulation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //todo:state change
  const [state, setState] = useState(false);
  // visa and passport copy update state
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    setState((prev) => !prev);
    setOpenUpdateModal(false);
    // navigate(0);
  };
  const updateModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#fff",
    p: 4,
  };
  const [openModal, setOpenModal] = useState(false);
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  let staffName = users?.user?.name;
  let agentName = users?.user?.name;

  const [open, setOpen] = useState(false);

  const [downExpanded, setDownExpanded] = useState();
  const handleChangeDown = (panel) => (event, newExpanded) => {
    setDownExpanded(newExpanded ? panel : false);
  };

  const [isDone, setIsDone] = useState(true);

  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);

  // for Flyhub pnr fatch data start
  const system = location?.state?.bookingInfo?.system;
  const pnr = location?.state?.bookingInfo?.pnr;
  const bookingId =
    location?.state?.bookId?.BookingId ||
    location.state?.bookingDetails?.BookingId;
  const searchId = location?.state?.bookingInfo?.SearchID;
  const resultId = location?.state?.bookingInfo?.ResultID;

  const [flyhubBookData, setflyhubBookData] = useState({});
  const [sabreBookData, setSabreBookData] = useState({});
  const [bookingDetails, setBookingDetails] = useState([]);
  const [fareCost, setFareCost] = useState({});
  const [userData, setUserData] = useState([]);
  const [flightName, setFlightName] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [balance, setBalance] = useState([]);

  //todo: inbound outbound state
  const [triptype, setTripType] = useState("");
  //todo: end of state

  //flight Name Fetch

  useEffect(() => {
    //todo: inbound outbound
    const depObj = flightData.filter((item) => item.code === deptFrom.trim());
    const arrObj = flightData.filter((item) => item.code === arriveTo.trim());
    console.log(deptFrom, arriveTo);
    const depCountry = depObj[0]?.Address?.split(",")
      .at(-1)
      ?.trim()
      ?.toLowerCase();
    const arrCountry = arrObj[0]?.Address?.split(",")
      .at(-1)
      ?.trim()
      ?.toLowerCase();
    // console.log(flightData.filter((item) => item.code === deptFrom.trim()));
    // console.log(flightData.filter((item) => item.code === arriveTo.trim()));
    // console.log(depCountry, arrCountry);
    if (depCountry === "bangladesh" && arrCountry === "bangladesh") {
      setTripType("Inbound");
    } else {
      setTripType("Outbound");
    }
    //todo: inbound outbound
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
        // console.log(console.log(resSabre.data));
        setSabreBookData(resSabre.data);
      }
      const resBooking = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=all`
      );
      setBookingDetails(resBooking.data);

      const resBookingId = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=BId&bookingId=${bookingId}`
      );

      setFareCost(resBookingId.data);

      const resUserData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`
      );
      setUserData(resUserData.data);

      const resPassengerData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/PassengerData.php?bookingId=${bookingId}&agentId=${agentID}`
      );
      setPassengerData(resPassengerData.data);

      const resBalenceData = await axios(
        `https://api.flyfarint.com/v.1.0.0/Accounts/ClientLeadger.php?agentId=${agentID}&balance`
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
  }, [system, pnr, agentID, state]);

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
    handleSearchFare();
  }, [state]);

  const airLineName = AirlineName;
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
  }, [sabreBookData, state]);

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
  const removeLastWord = (str) => {
    const lastIndexOfSpace = str.lastIndexOf(" ");
    if (lastIndexOfSpace === -1) {
      return str;
    }
    return str.substring(0, lastIndexOfSpace);
  };

  //? FlyHub and Sabre Fare rules handle and get adult and child refund and reissue penalties

  const adultFareRules = sabreBookData?.fareRules?.filter(
    (fareAdultData) => fareAdultData.passengerCode === "ADT"
  );

  const childFareRules = sabreBookData?.fareRules?.filter(
    (fareChildData) => fareChildData.passengerCode === "C09"
  );
  const infantFareRules = sabreBookData?.fareRules?.filter(
    (fareInfantData) => fareInfantData.passengerCode === "INF"
  );

  //--------------- Isssue Ticket Start ------------------

  //  cancellation

  const handleBooking = () => {
    navigate("/dashboard/bookingPdf", {
      state: {
        location,
      },
    });
  };
  const data = flightData;
  const deptFrom = location?.state?.bookingInfo?.from;
  const arriveTo = location?.state?.bookingInfo?.to;
  let fromCountryName;
  let toCountryName;
  const airlines = fareCost[0]?.airlines;
  const tripType = fareCost[0]?.tripType;
  const netCost = fareCost[0]?.netCost;
  const issueTime = fareCost[0]?.issueTime;

  async function handleIssueTicket() {
    const e = window.event;
    e.preventDefault();
    if (parseInt(balance[0]?.bonus) > 0) {
      Swal.fire({
        imageUrl: ReConfirm,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Use Your Bonus Balance",
        html: "<strong>If you use your bonus balance <strong>100 BDT</strong> will be deduct form your bonus wallet</strong>",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Redeem Bonus",
        confirmButtonColor: "#003566",
        denyButtonText: `Don't Use Bonus`,
        denyButtonColor: "#dc143c",
        cancelButtonColor: "#9999",
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
                route: `${deptFrom}-${arriveTo}`,
                type: tripType,
                cost: netCost,
                pnr: pnr,
                gds: system,
                status: "Issue in Process",
                useFromBonus: "yes",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data) {
                Swal.fire({
                  imageUrl: Issue,
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                  title: "Issue Ticket Request In Process",
                  html: "Your issue ticket request submitted successfully wait for a response. if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                  confirmButtonColor: "#dc143c",
                  confirmButtonText: "Ok",
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
              console.log(err.message);
              Swal.fire({
                imageUrl: Invalid,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Issue Ticket Failed!",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
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
                route: `${deptFrom}-${arriveTo}`,
                type: tripType,
                cost: netCost,
                pnr: pnr,
                gds: system,
                status: "Issue in Process",
                useFromBonus: "no",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.status === "success") {
                Swal.fire({
                  imageUrl: Issue,
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: "Custom image",
                  title: "Issue Ticket Request In Process",
                  html: "Your issue ticket request submitted successfully wait for a response. if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
                  confirmButtonColor: "#dc143c",
                  confirmButtonText: "Ok",
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
              console.log(err.message);
              Swal.fire({
                imageUrl: Invalid,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Issue Ticket Failed!",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
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
            route: `${deptFrom}-${arriveTo}`,
            type: tripType,
            cost: netCost,
            pnr: pnr,
            gds: staffId,
            status: "Issue in Process",
            useFromBonus: "no",
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.status === "success") {
            Swal.fire({
              imageUrl: Issue,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Issue Ticket Request In Process",
              html: "Your issue ticket request submitted successfully wait for a response. if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
              confirmButtonColor: "#dc143c",
              confirmButtonText: "Ok",
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
          console.log(err.message);
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Issue Ticket Failed!",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setIssueLoading(false);
            setIsLoading(true);
            navigate("/dashboard/queues/queues");
          });
        });
    }
  }
  //--------------- Isssue Ticket end ------------------
  //--------------- Cancel Button Handle ------------------
  const cancelBooking = (system, pnr) => {
    console.log(
      JSON.stringify({
        // BookingID: pnr,
        bookingId: bookingId,
        cancelBy: staffName || agentID,
        platform: "B2B",
      })
    );
    Swal.fire({
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes Cancel it!",
      confirmButtonColor: "#003566",
      cancelButtonText: "Don't Cancel it",
      cancelButtonColor: "#dc143c",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setOpen(false);
        setIsLoading(true);
        setIsDone(false);
        // let url = `https://api.flyfarint.com/v.1.0.0/${system}/AirCancel.php`;
        let url = `https://api.flyfarint.com/v.1.0.0/AirBooking/AirCancel.php`;
        let body = JSON.stringify({
          // BookingID: pnr,
          bookingId: bookingId,
          cancelBy: staffName || agentID,
          platform: "B2B",
        });
        console.log(
          JSON.stringify({
            // BookingID: pnr,
            bookingId: bookingId,
            cancelBy: staffName || agentID,
            platform: "B2B",
          })
        );
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
            console.log(data);
            if (data?.status === "success") {
              setIsLoading(false);
              Swal.fire({
                imageUrl: BookingCancel,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Your Flight is Cancel!",
                html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
                confirmButtonColor: "#dc143c",
                confirmButtonText: "Ok",
              }).then(() => {
                setIsDone(true);
                navigate("/dashboard/queues/queues");
              });
            } else {
              throw new Error("error");
            }
          })
          .catch((err) => {
            console.log(err.message);
            setIsLoading(false);
            Swal.fire({
              imageUrl: Invalid,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Booking Cancel Failed!",
              html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
              confirmButtonColor: "#dc143c",
              confirmButtonText: "Ok",
            }).then(() => {
              setIsDone(true);
              navigate("/dashboard/queues/queues");
            });
          });
      }
    });
  };
  const allAirportName = flightData;

  const allData = {
    pnr: location?.state?.pnr || location.state.bookingInfo.pnr,
    fromCountryName: fromCountryName,
    toCountryName: toCountryName,
    bookingId: bookingId,
    issueTime: issueTime,
  };
  const string1 = "Baggage :";
  const string2 = "S<br/>";

  if (!isDone) {
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
      <Box position={"relative"}>
        {!isLoading ? (
          <>
            <Box className="congratulation">
              <Container maxWidth="xxl">
                <Box>
                  <>
                    {system === "Sabre" ? (
                      <Box maxWidth="xxl">
                        {Object.keys(sabreBookData).length !== 0 ? (
                          <Box pb={4}>
                            <Grid container spacing={2}>
                              <Grid item md={9.5}>
                                <Grid container mt={4} mb={2}>
                                  <Grid
                                    gap={"15px"}
                                    className="congratulation-content"
                                  >
                                    <Box>
                                      <img src={confirm} alt="..." />
                                    </Box>
                                    <Box>
                                      <h4>
                                        Thank You. Your Booking is Confirmed
                                      </h4>
                                      <p>
                                        A Confirmation email has been sent to
                                        your provided email address.
                                      </p>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Box className="queues-detail">
                                  <Grid
                                    display={"flex"}
                                    alignItems={"center"}
                                    container
                                    justifyContent={"space-between"}
                                  >
                                    <Grid item>
                                      <h3>Reference ID: {bookingId} </h3>
                                    </Grid>
                                    <Grid
                                      xs={3}
                                      display={"flex"}
                                      justifyContent={"flex-end"}
                                      item
                                    >
                                      <Box>
                                        <button>
                                          {bookingDetails[0]?.status ||
                                            "Status"}
                                        </button>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                                {/* --------------- Booking confirmation--------------------------- */}
                                <Box
                                  mt={2}
                                  className="queues-detail-bookingInfo"
                                >
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
                                            {fareCost[0]?.tripType ===
                                            "oneway" ? (
                                              <>
                                                {" "}
                                                {deptFrom} - {arriveTo}
                                              </>
                                            ) : (
                                              <>
                                                {" "}
                                                {deptFrom} - {arriveTo} -{" "}
                                                {deptFrom}{" "}
                                              </>
                                            )}

                                            {/* {fromCountryName?.split(",")[0] ||
                                            deptFrom}{" "}
                                          -
                                          {toCountryName?.split(",")[0] ||
                                            arriveTo} */}
                                          </h5>

                                          <h5>
                                            {fareCost[0]?.bookedBy || "Agent"}
                                          </h5>
                                          <h5>
                                            {fareCost[0]?.bookedAt
                                              ? fareCost[0]?.bookedAt
                                                ? format(
                                                    new Date(
                                                      fareCost[0]?.bookedAt.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )
                                                : "Book Time"
                                              : "Book Time"}
                                          </h5>

                                          <h5 style={{ color: "crimson" }}>
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
                                      {sabreBookData?.fareRules ===
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
                                          {sabreBookData?.fareRules[0]
                                            ?.isRefundable === true ? (
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

                                <Box
                                  mt={2}
                                  className="flight-queue-detail-fareInfo"
                                >
                                  <span>Flight Information</span>

                                  <Box mt={2}>
                                    <Box
                                      display={{
                                        xs: "none",
                                        sm: "none",
                                        lg: "flex",
                                      }}
                                    >
                                      <table width="100%">
                                        <tr>
                                          <th width="15%">Flight</th>
                                          <th width="23%">Departure From</th>
                                          <th width="23%">Arrival To</th>
                                          <th width="10%">Depart At</th>
                                          <th width="10%">Arrive At</th>
                                          <th width="19%">Info</th>
                                        </tr>

                                        {!sabreBookData === undefined ? (
                                          <></>
                                        ) : !sabreBookData?.flights[0]
                                            ?.itemId ? (
                                          <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td colSpan={"2"}>
                                              {" "}
                                              <Box sx={{ display: "flex" }}>
                                                <CircularProgress
                                                  style={{
                                                    backgroundColor: "#fff",
                                                  }}
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
                                                      alt="flight-img"
                                                      className={`img-border-${system.toLowerCase()}`}
                                                    />
                                                    <br />
                                                    {nameofflight[index] ||
                                                      fareCost[0]?.airlines}
                                                    {" | "}
                                                    {
                                                      flightData?.operatingAirlineCode
                                                    }{" "}
                                                    {
                                                      flightData?.operatingFlightNumber
                                                    }
                                                  </td>

                                                  <td>
                                                    {allAirportName.map(
                                                      (name) => (
                                                        <>
                                                          {name.code ===
                                                          flightData?.fromAirportCode ? (
                                                            <>
                                                              ({name.code})-
                                                              {
                                                                name?.Address?.split(
                                                                  ","
                                                                )[0]
                                                              }
                                                              , {name?.name}
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </>
                                                      )
                                                    )}
                                                    <br />
                                                    {!flightData?.departureTerminalName ? (
                                                      <></>
                                                    ) : (
                                                      <>
                                                        {
                                                          flightData?.departureTerminalName
                                                        }{" "}
                                                        <br></br> Gate -{" "}
                                                        {
                                                          flightData?.departureGate
                                                        }
                                                      </>
                                                    )}
                                                  </td>

                                                  <td>
                                                    {allAirportName.map(
                                                      (name) => (
                                                        <>
                                                          {name.code ===
                                                          flightData?.toAirportCode ? (
                                                            <>
                                                              ({name.code})-
                                                              {
                                                                name?.Address?.split(
                                                                  ","
                                                                )[0]
                                                              }
                                                              , {name?.name}
                                                            </>
                                                          ) : (
                                                            <></>
                                                          )}
                                                        </>
                                                      )
                                                    )}
                                                    <br />
                                                    {!flightData?.arrivalTerminalName ? (
                                                      <></>
                                                    ) : (
                                                      <>
                                                        {
                                                          flightData?.arrivalTerminalName
                                                        }{" "}
                                                        <br></br> Gate -{" "}
                                                        {
                                                          flightData?.arrivalGate
                                                        }
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
                                                    Class:{" "}
                                                    {flightData?.bookingClass}
                                                    <br />
                                                    Baggage:{" "}
                                                    {(sabreBookData?.fares[0]
                                                      ?.fareConstruction[0]
                                                      ?.checkedBaggageAllowance
                                                      ?.maximumPieces && (
                                                      <>
                                                        {
                                                          sabreBookData
                                                            ?.fares[0]
                                                            ?.fareConstruction[0]
                                                            ?.checkedBaggageAllowance
                                                            ?.maximumPieces
                                                        }{" "}
                                                        Piece
                                                      </>
                                                    )) ||
                                                      ""}
                                                    {(sabreBookData?.fares[0]
                                                      ?.fareConstruction[0]
                                                      ?.checkedBaggageAllowance
                                                      ?.totalWeightInKilograms && (
                                                      <>
                                                        {
                                                          sabreBookData
                                                            ?.fares[0]
                                                            ?.fareConstruction[0]
                                                            ?.checkedBaggageAllowance
                                                            ?.totalWeightInKilograms
                                                        }{" "}
                                                        Kg
                                                      </>
                                                    )) ||
                                                      ""}
                                                    <br />
                                                    Duration:{" "}
                                                    {Math.floor(
                                                      flightData?.durationInMinutes /
                                                        60
                                                    )}
                                                    h&nbsp;
                                                    {flightData?.durationInMinutes -
                                                      Math.floor(
                                                        flightData?.durationInMinutes /
                                                          60
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

                                <Box
                                  mt={2}
                                  className="flight-queue-detail-fareInfo"
                                >
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

                                        {fareCost[0]?.adultCount > 0 ? (
                                          <tr>
                                            <td>
                                              Adult X{fareCost[0]?.adultCount}
                                            </td>

                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.adultCostBase
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.adultCostTax
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(adultTotalPrice)} BDT
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )}

                                        {fareCost[0]?.childCount > 0 ? (
                                          <tr>
                                            <td>
                                              Child X{fareCost[0]?.childCount}
                                            </td>

                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.childCostBase
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.childCostTax
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(childTotalPrice)} BDT
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )}
                                        {fareCost[0]?.infantCount > 0 ? (
                                          <tr>
                                            <td>
                                              Infant X{fareCost[0]?.infantCount}
                                            </td>
                                            {/* <td></td> */}
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.infantCostBase
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.infantCostTax
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(infantTotalPrice)}{" "}
                                              BDT
                                            </td>
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
                                            {commaNumber(fareCost[0]?.netCost)}{" "}
                                            BDT
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

                                <Box
                                  mt={5}
                                  className="queue-detail-passenger-detail"
                                >
                                  <Box my={2}>
                                    <span>Passenger Details</span>
                                  </Box>

                                  <div>
                                    {passengerData.length === 0 ? (
                                      <>loading...</>
                                    ) : (
                                      <>
                                        {passengerData.map((traveler) => (
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
                                                    {traveler?.gender ===
                                                      "Male" &&
                                                    traveler?.type === "ADT" ? (
                                                      <>
                                                        MR {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MSTR {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    )}
                                                  </>
                                                ) : (
                                                  <>
                                                    {traveler?.gender ===
                                                      "Female" &&
                                                    traveler?.type === "ADT" ? (
                                                      <>
                                                        MS {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MISS {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                              </h5>
                                            </Box>

                                            <Box
                                              border="1px solid #DEDEDE"
                                              p="3px"
                                              mb={2}
                                            >
                                              <Grid container spacing={2}>
                                                <Grid item xs={4} md={2}>
                                                  <h5>Title</h5>
                                                  <h6>
                                                    {traveler?.gender ===
                                                    "Male" ? (
                                                      <>
                                                        {traveler?.gender ===
                                                          "Male" &&
                                                        traveler?.type ===
                                                          "ADT" ? (
                                                          <>MR</>
                                                        ) : (
                                                          <>MSTR</>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {traveler?.gender ===
                                                          "Female" &&
                                                        traveler?.type ===
                                                          "ADT" ? (
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
                                                  <h6>
                                                    {traveler?.passNation}
                                                  </h6>
                                                </Grid>

                                                <Grid item xs={4} md={2}>
                                                  <h5>Date of Birth</h5>
                                                  <h6>
                                                    {traveler?.dob
                                                      ? format(
                                                          new Date(
                                                            traveler?.dob
                                                          ),
                                                          "dd MMM yyyy"
                                                        )
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
                                                      : "Infat"}
                                                  </h6>
                                                </Grid>

                                                <Grid item xs={4} md={2}>
                                                  <h5>Passport Number</h5>
                                                  <h6>
                                                    {fareCost[0]
                                                      ?.journeyType ===
                                                    "Outbound"
                                                      ? traveler?.passNo?.toUpperCase() ||
                                                        traveler?.passNo?.toUpperCase() ||
                                                        "Passport Number"
                                                      : "Domestic Flight"}
                                                  </h6>
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                  <h5>Passport Expire Date</h5>

                                                  <h6>
                                                    {fareCost[0]
                                                      ?.journeyType ===
                                                    "Outbound" ? (
                                                      <>
                                                        {traveler?.passEx ===
                                                        "0000-00-00" ? (
                                                          <></>
                                                        ) : (
                                                          <>
                                                            {traveler?.passEx
                                                              ? format(
                                                                  new Date(
                                                                    traveler?.passEx
                                                                  ),
                                                                  "dd MMM yyyy"
                                                                )
                                                              : "Passport Expire Date"}
                                                          </>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>Domestic Flight</>
                                                    )}
                                                  </h6>
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          </>
                                        ))}
                                      </>
                                    )}
                                  </div>
                                </Box>
                              </Grid>

                              <Grid item xs={12} md={2.5} mt={4}>
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
                                    {/* <ClientInvoice allData={allData} />
                                  <AgentInvoice allData={allData} /> */}
                                    <BookingConfirWithPrice allData={allData} />
                                    <BookingConfirWithoutPrice
                                      allData={allData}
                                    />
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
                                    {sabreBookData?.fareRules === undefined ? (
                                      <>Non Refundable</>
                                    ) : sabreBookData?.fareRules !==
                                      undefined ? (
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

                                        {adultFareRules[0]?.passengerCode ===
                                          "ADT" && (
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
                                                {adultFareRules[0]
                                                  ?.refundPenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {adultFareRules[0]
                                                      ?.refundPenalties[0]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
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
                                                After Departure
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
                                                {adultFareRules[0]
                                                  ?.refundPenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {adultFareRules[0]
                                                      ?.refundPenalties[1]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
                                          </Box>
                                        )}

                                        {childFareRules[0]?.passengerCode ===
                                          "C09" && (
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
                                                {childFareRules[0]
                                                  ?.refundPenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {childFareRules[0]
                                                      ?.refundPenalties[0]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
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
                                                After Departure
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
                                                {childFareRules[0]
                                                  ?.refundPenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {childFareRules[0]
                                                      ?.refundPenalties[1]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
                                          </Box>
                                        )}

                                        {infantFareRules[0]?.passengerCode ===
                                          "INF" && (
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
                                              Infant
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
                                                {infantFareRules[0]
                                                  ?.refundPenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {infantFareRules[0]
                                                      ?.refundPenalties[0]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
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
                                                After Departure
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
                                                {infantFareRules[0]
                                                  ?.refundPenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {infantFareRules[0]
                                                      ?.refundPenalties[1]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
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

                                        {adultFareRules[0]?.passengerCode ===
                                          "ADT" && (
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
                                                {adultFareRules[0]
                                                  ?.exchangePenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {adultFareRules[0]
                                                      ?.exchangePenalties[0]
                                                      ?.penalty?.amount ||
                                                      "0.0"}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
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
                                                After Departure
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
                                                {adultFareRules[0]
                                                  ?.exchangePenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {adultFareRules[0]
                                                      ?.exchangePenalties[1]
                                                      ?.penalty?.amount ||
                                                      "0.0"}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
                                          </Box>
                                        )}

                                        {childFareRules[0]?.passengerCode ===
                                          "C09" && (
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
                                                {childFareRules[0]
                                                  ?.exchangePenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {childFareRules[0]
                                                      ?.exchangePenalties[0]
                                                      ?.penalty?.amount ||
                                                      "0.0"}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
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
                                                After Departure
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
                                                {childFareRules[0]
                                                  ?.exchangePenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {childFareRules[0]
                                                      ?.exchangePenalties[1]
                                                      ?.penalty?.amount ||
                                                      "0.0"}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
                                          </Box>
                                        )}

                                        {infantFareRules[0]?.passengerCode ===
                                          "INF" && (
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
                                              Infant
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
                                                {infantFareRules[0]
                                                  ?.exchangePenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {infantFareRules[0]
                                                      ?.exchangePenalties[0]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
                                                    &#2547;
                                                  </>
                                                )}
                                              </span>
                                            </Box>
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
                                                After Departure
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
                                                {infantFareRules[0]
                                                  ?.exchangePenalties ===
                                                undefined ? (
                                                  <>0.0 &#2547;</>
                                                ) : (
                                                  <>
                                                    {infantFareRules[0]
                                                      ?.exchangePenalties[1]
                                                      ?.penalty?.amount ||
                                                      "0.0"}{" "}
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
                                        No automatic fare rules available,
                                        Please mail us for fare rules.
                                      </>
                                    )}
                                  </AccordionDetails>
                                </Accordion>

                                {/* <Accordion
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
                                                ?.totalWeightInKilograms ||
                                                "0"}{" "}
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
                                                ?.totalWeightInKilograms ||
                                                "0"}{" "}
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
                                                ?.totalWeightInKilograms ||
                                                "0"}{" "}
                                              Kg
                                            </>
                                          )}
                                        </span>
                                      </Box>
                                    )}
                                  </>
                                </AccordionDetails>
                              </Accordion> */}

                                <Box>
                                  <>
                                    {parseInt(balance[0]?.lastAmount) >=
                                    parseInt(fareCost[0]?.netCost) ? (
                                      <>
                                        <Box className="queues-detail-calcel-btn">
                                          {!issueLoading ? (
                                            <Box
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <button
                                                style={{
                                                  backgroundColor: "#003566",
                                                  color: "#fff",
                                                  border: "none",
                                                }}
                                                onClick={() => {
                                                  if (
                                                    passengerData[0]
                                                      ?.passportCopy === "" &&
                                                    passengerData[0]
                                                      ?.visaCopy === "" &&
                                                    triptype === "Outbound"
                                                  ) {
                                                    handleOpenUpdateModal();
                                                  } else if (
                                                    passengerData[0]
                                                      ?.passportCopy !== "" &&
                                                    passengerData[0]
                                                      ?.visaCopy !== "" &&
                                                    triptype !== "Outbound"
                                                  ) {
                                                    handleIssueTicket();
                                                  } else {
                                                    handleIssueTicket();
                                                  }
                                                }}
                                              >
                                                Issue Ticket
                                              </button>
                                              {/* //todo: upload section */}
                                              {triptype === "Outbound" ? (
                                                <button
                                                  style={{
                                                    backgroundColor:
                                                      passengerData[0]
                                                        ?.passportCopy === "" &&
                                                      passengerData[0]
                                                        ?.visaCopy === ""
                                                        ? "#003566"
                                                        : "green",
                                                    color: "#fff",
                                                    border: "none",
                                                  }}
                                                  onClick={() => {
                                                    handleOpenUpdateModal();
                                                  }}
                                                >
                                                  {passengerData[0]
                                                    ?.passportCopy === "" &&
                                                  passengerData[0]?.visaCopy ===
                                                    ""
                                                    ? "Update Document"
                                                    : "Document Updated ✔"}
                                                </button>
                                              ) : null}
                                            </Box>
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
                                            <Box
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <button
                                                style={{
                                                  backgroundColor: "#003566",
                                                  color: "#fff",
                                                  border: "none",
                                                }}
                                                onClick={() => {
                                                  if (
                                                    passengerData[0]
                                                      ?.passportCopy === "" &&
                                                    passengerData[0]
                                                      ?.visaCopy === "" &&
                                                    triptype === "Outbound"
                                                  ) {
                                                    handleOpenUpdateModal();
                                                  } else if (
                                                    passengerData[0]
                                                      ?.passportCopy !== "" &&
                                                    passengerData[0]
                                                      ?.visaCopy !== "" &&
                                                    triptype !== "Outbound"
                                                  ) {
                                                    handleIssueTicket();
                                                  } else {
                                                    handleIssueTicket();
                                                  }
                                                }}
                                              >
                                                Issue Ticket
                                              </button>
                                              {/* //todo: upload section */}
                                              {triptype === "Outbound" ? (
                                                <button
                                                  style={{
                                                    backgroundColor:
                                                      passengerData[0]
                                                        ?.passportCopy === "" &&
                                                      passengerData[0]
                                                        ?.visaCopy === ""
                                                        ? "#003566"
                                                        : "green",
                                                    color: "#fff",
                                                    border: "none",
                                                  }}
                                                  onClick={() => {
                                                    handleOpenUpdateModal();
                                                  }}
                                                >
                                                  {passengerData[0]
                                                    ?.passportCopy === "" &&
                                                  passengerData[0]?.visaCopy ===
                                                    ""
                                                    ? "Update Document"
                                                    : "Document Updated ✔"}
                                                </button>
                                              ) : null}
                                            </Box>
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
                                          you have insufficient balance, please
                                          make deposit to issue this ticket
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
                                        onClick={() =>
                                          cancelBooking(system, pnr)
                                        }
                                      >
                                        Cancel Flight
                                      </button>
                                    </Box>
                                  </>
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
                      </Box>
                    ) : system === "FlyHub" ? (
                      <Box maxWidth="xxl">
                        {Object.keys(flyhubBookData).length !== 0 ? (
                          <Box pb={4}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={9.5}>
                                <Grid container mt={4} mb={2}>
                                  <Grid
                                    gap={"15px"}
                                    className="congratulation-content"
                                  >
                                    <Box>
                                      <img src={confirm} alt="..." />
                                    </Box>
                                    <Box>
                                      <h4>
                                        Thank You. Your Booking is Confirmed
                                      </h4>
                                      <p>
                                        A Confirmation email has been sent to
                                        your provided email address.
                                      </p>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid
                                  container
                                  justifyContent={"space-between"}
                                >
                                  <Box mt={1} mb={2}>
                                    <h2>Reference ID: {bookingId}</h2>
                                  </Box>
                                  <Box mt={1} mb={2}>
                                    <Typography
                                      bgcolor="#003566"
                                      color="#fff"
                                      py={1}
                                      px={4}
                                    >
                                      {bookingDetails[0]?.status}
                                    </Typography>
                                  </Box>
                                </Grid>

                                {/* --------------- Booking confirmation--------------------------- */}

                                <Box
                                  mt={1}
                                  className="queues-detail-bookingInfo"
                                >
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

                                          {/* <h5>Client:</h5> */}
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
                                            {fareCost[0]?.tripType ===
                                            "oneway" ? (
                                              <>
                                                {" "}
                                                {deptFrom} - {arriveTo}
                                              </>
                                            ) : (
                                              <>
                                                {" "}
                                                {deptFrom} - {arriveTo} -{" "}
                                                {deptFrom}{" "}
                                              </>
                                            )}
                                            {/* {fromCountryName?.split(",")[0] ||
                                            deptFrom}{" "}
                                          -
                                          {toCountryName?.split(",")[0] ||
                                            arriveTo} */}
                                          </h5>

                                          {/* <h5>{fareCost[0]?.name}</h5> */}

                                          <h5>
                                            {fareCost[0]?.bookedBy || "Agent"}
                                          </h5>
                                          <h5>
                                            {fareCost[0]?.bookedAt
                                              ? fareCost[0]?.bookedAt
                                                ? format(
                                                    new Date(
                                                      fareCost[0]?.bookedAt.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )
                                                : "Date Time"
                                              : "Date Time"}
                                          </h5>
                                          <h5 style={{ color: "crimson" }}>
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
                                      <></>
                                    </Grid>
                                    <Grid item>
                                      {flyhubBookData?.Results[0]
                                        ?.IsRefundable === undefined ? (
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
                                          {flyhubBookData?.Results[0]
                                            ?.IsRefundable === true ? (
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

                                <Box
                                  mt={2}
                                  className="flight-queue-detail-fareInfo"
                                >
                                  <span>Flight Information</span>

                                  <Box mt={2}>
                                    {/* <Typography mb={1}>Departure Flight</Typography> */}

                                    <table width="100%">
                                      <tr>
                                        <th width="15%">Flight</th>
                                        <th width="23%">Departure From</th>
                                        <th width="23%">Arrival To</th>
                                        <th width="10%">Depart At</th>
                                        <th width="10%">Arrive At</th>
                                        <th width="19%">Info</th>
                                      </tr>
                                      {/* --------Segments 0-------- */}
                                      <tr>
                                        {flyhubBookData?.Results[0]
                                          ?.segments[0] &&
                                          flyhubBookData.Results[0]?.segments[0]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              <img
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[0]?.Airline?.AirlineCode}.png`}
                                                width="30px"
                                                height="30px"
                                                alt="flight-Img"
                                                className="img-border-flyhub"
                                              />
                                              <br />
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Airline
                                                  ?.AirlineName
                                              }
                                              {" | "}
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Airline
                                                  ?.AirlineCode
                                              }
                                              &nbsp;
                                              {(flyhubBookData?.Results[0]
                                                ?.segments[0]?.Airline
                                                ?.FlightNumber).length > 4 ? (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]?.segments[0]?.Airline?.FlightNumber?.split(
                                                      "G9"
                                                    )[1]
                                                  }
                                                </>
                                              ) : (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[0]?.Airline
                                                      ?.FlightNumber
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[0] &&
                                          flyhubBookData.Results[0]?.segments[0]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {/* from */}(
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Origin?.Airport
                                                  ?.AirportCode
                                              }
                                              )-
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Origin?.Airport
                                                  ?.CityName
                                              }
                                              -
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Origin?.Airport
                                                  ?.AirportName
                                              }
                                              <br />
                                              {flyhubBookData?.Results[0]
                                                ?.segments[0]?.Origin?.Airport
                                                ?.Terminal === "" ? (
                                                <></>
                                              ) : (
                                                <>
                                                  Terminal:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[0]?.Origin
                                                      ?.Airport?.Terminal
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[0] &&
                                          flyhubBookData.Results[0]?.segments[0]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {/* To  */}(
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Destination
                                                  ?.Airport?.AirportCode
                                              }
                                              )-
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Destination
                                                  ?.Airport?.CityName
                                              }
                                              -
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]?.Destination
                                                  ?.Airport?.AirportName
                                              }
                                              <br />
                                              {flyhubBookData?.Results[0]
                                                ?.segments[0]?.Destination
                                                ?.Airport?.Terminal === "" ? (
                                                <></>
                                              ) : (
                                                <>
                                                  Terminal:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[0]?.Destination
                                                      ?.Airport?.Terminal
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[0] &&
                                          flyhubBookData.Results[0]?.segments[0]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {format(
                                                new Date(
                                                  flyhubBookData?.Results[0]?.segments[0]?.Origin?.DepTime?.toString()
                                                ),
                                                "dd MMM yyyy hh:mm a"
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[0] &&
                                          flyhubBookData.Results[0]?.segments[0]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {format(
                                                new Date(
                                                  flyhubBookData?.Results[0]?.segments[0]?.Destination?.ArrTime?.toString()
                                                ),
                                                "dd MMM yyyy hh:mm a"
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[0] &&
                                          flyhubBookData.Results[0]?.segments[0]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              Cabin: 7Kg <br />
                                              Class:{" "}
                                              {flyhubBookData?.Results[0]
                                                ?.segments[0]?.Airline
                                                ?.BookingClass || "Economy"}
                                              <br />
                                              Baggage:{" "}
                                              {flyhubBookData?.Results[0]?.segments[0]?.Baggage?.includes(
                                                string1,
                                                string2
                                              ) === true ? (
                                                <>
                                                  {flyhubBookData?.Results[0]?.segments[0]?.Baggage?.replace(
                                                    "Baggage :",
                                                    ""
                                                  )?.replace("S<br/>", "")}
                                                </>
                                              ) : (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[0]?.Baggage
                                                  }
                                                </>
                                              )}
                                              <br />
                                              Duration:{" "}
                                              {Math.floor(
                                                flyhubBookData?.Results[0]
                                                  ?.segments[0]
                                                  ?.JourneyDuration / 60
                                              )}
                                              h&nbsp;
                                              {flyhubBookData?.Results[0]
                                                ?.segments[0]?.JourneyDuration -
                                                Math.floor(
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[0]
                                                    ?.JourneyDuration / 60
                                                ) *
                                                  60}
                                              m
                                            </td>
                                          )}
                                      </tr>
                                      {/* ---------segments 0 End-------- */}

                                      {/* ---------segments 1 End-------- */}
                                      <tr>
                                        {flyhubBookData?.Results[0]
                                          ?.segments[1] &&
                                          flyhubBookData.Results[0]?.segments[1]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              <img
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[1]?.Airline?.AirlineCode}.png`}
                                                width="30px"
                                                height="30px"
                                                alt="flight-Img"
                                                className="img-border-flyhub"
                                              />
                                              <br />
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Airline
                                                  ?.AirlineName
                                              }
                                              {" | "}
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Airline
                                                  ?.AirlineCode
                                              }
                                              &nbsp;
                                              {(flyhubBookData?.Results[0]
                                                ?.segments[1]?.Airline
                                                ?.FlightNumber).length > 4 ? (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]?.segments[1]?.Airline?.FlightNumber?.split(
                                                      "G9"
                                                    )[1]
                                                  }
                                                </>
                                              ) : (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Airline
                                                      ?.FlightNumber
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[1] &&
                                          flyhubBookData.Results[0]?.segments[1]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {/* from */}(
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Origin?.Airport
                                                  ?.AirportCode
                                              }
                                              )-
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Origin?.Airport
                                                  ?.CityName
                                              }
                                              -
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Origin?.Airport
                                                  ?.AirportName
                                              }
                                              <br />
                                              {flyhubBookData?.Results[0]
                                                ?.segments[1]?.Origin?.Airport
                                                ?.Terminal === "" ? (
                                                <></>
                                              ) : (
                                                <>
                                                  Terminal:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Origin
                                                      ?.Airport?.Terminal
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[1] &&
                                          flyhubBookData.Results[0]?.segments[1]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {/* To  */}(
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Destination
                                                  ?.Airport?.AirportCode
                                              }
                                              )-
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Destination
                                                  ?.Airport?.CityName
                                              }
                                              -
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Destination
                                                  ?.Airport?.AirportName
                                              }
                                              <br />
                                              {flyhubBookData?.Results[0]
                                                ?.segments[1]?.Destination
                                                ?.Airport?.Terminal === "" ? (
                                                <></>
                                              ) : (
                                                <>
                                                  Terminal:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Destination
                                                      ?.Airport?.Terminal
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[1] &&
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
                                        {flyhubBookData?.Results[0]
                                          ?.segments[1] &&
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
                                        {flyhubBookData?.Results[0]
                                          ?.segments[1] &&
                                          flyhubBookData.Results[0]?.segments[1]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              Cabin: 7Kg <br />
                                              Class:{" "}
                                              {flyhubBookData?.Results[0]
                                                ?.segments[0]?.Airline
                                                ?.BookingClass || "Economy"}
                                              <br />
                                              Baggage:{" "}
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]?.Baggage
                                              }
                                              <br />
                                              Duration:{" "}
                                              {Math.floor(
                                                flyhubBookData?.Results[0]
                                                  ?.segments[1]
                                                  ?.JourneyDuration / 60
                                              )}
                                              h&nbsp;
                                              {flyhubBookData?.Results[0]
                                                ?.segments[1]?.JourneyDuration -
                                                Math.floor(
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[1]
                                                    ?.JourneyDuration / 60
                                                ) *
                                                  60}
                                              m
                                            </td>
                                          )}
                                      </tr>
                                      {/* ---------segments 1 End-------- */}

                                      {/* ---------segments 2 End-------- */}
                                      <tr>
                                        {flyhubBookData?.Results[0]
                                          ?.segments[2] &&
                                          flyhubBookData.Results[0]?.segments[2]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              <img
                                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[2]?.Airline?.AirlineCode}.png`}
                                                width="30px"
                                                height="30px"
                                                alt="flight-Img"
                                                className="img-border-flyhub"
                                              />
                                              <br />
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Airline
                                                  ?.AirlineName
                                              }
                                              {" | "}
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Airline
                                                  ?.AirlineCode
                                              }
                                              &nbsp;
                                              {(flyhubBookData?.Results[0]
                                                ?.segments[2]?.Airline
                                                ?.FlightNumber).length > 4 ? (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]?.segments[2]?.Airline?.FlightNumber?.split(
                                                      "G9"
                                                    )[1]
                                                  }
                                                </>
                                              ) : (
                                                <>
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Airline
                                                      ?.FlightNumber
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[2] &&
                                          flyhubBookData.Results[0]?.segments[2]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {/* from */}(
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Origin?.Airport
                                                  ?.AirportCode
                                              }
                                              )-
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Origin?.Airport
                                                  ?.CityName
                                              }
                                              -
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Origin?.Airport
                                                  ?.AirportName
                                              }
                                              <br />
                                              {flyhubBookData?.Results[0]
                                                ?.segments[2]?.Origin?.Airport
                                                ?.Terminal === "" ? (
                                                <></>
                                              ) : (
                                                <>
                                                  Terminal:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Origin
                                                      ?.Airport?.Terminal
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[2] &&
                                          flyhubBookData.Results[0]?.segments[2]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              {/* To  */}(
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Destination
                                                  ?.Airport?.AirportCode
                                              }
                                              )-
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Destination
                                                  ?.Airport?.CityName
                                              }
                                              -
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Destination
                                                  ?.Airport?.AirportName
                                              }
                                              <br />
                                              {flyhubBookData?.Results[0]
                                                ?.segments[2]?.Destination
                                                ?.Airport?.Terminal === "" ? (
                                                <></>
                                              ) : (
                                                <>
                                                  Terminal:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Destination
                                                      ?.Airport?.Terminal
                                                  }
                                                </>
                                              )}
                                            </td>
                                          )}
                                        {flyhubBookData?.Results[0]
                                          ?.segments[2] &&
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
                                        {flyhubBookData?.Results[0]
                                          ?.segments[2] &&
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
                                        {flyhubBookData?.Results[0]
                                          ?.segments[2] &&
                                          flyhubBookData.Results[0]?.segments[2]
                                            ?.TripIndicator === "OutBound" && (
                                            <td>
                                              Cabin: 7Kg <br />
                                              Class:{" "}
                                              {flyhubBookData?.Results[0]
                                                ?.segments[0]?.Airline
                                                ?.BookingClass || "Economy"}
                                              <br />
                                              Baggage:{" "}
                                              {
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]?.Baggage
                                              }
                                              <br />
                                              Duration:{" "}
                                              {Math.floor(
                                                flyhubBookData?.Results[0]
                                                  ?.segments[2]
                                                  ?.JourneyDuration / 60
                                              )}
                                              h&nbsp;
                                              {flyhubBookData?.Results[0]
                                                ?.segments[2]?.JourneyDuration -
                                                Math.floor(
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[2]
                                                    ?.JourneyDuration / 60
                                                ) *
                                                  60}
                                              m
                                            </td>
                                          )}
                                      </tr>
                                      {fareCost[0]?.tripType === "oneway" ? (
                                        <></>
                                      ) : (
                                        <>
                                          <tr>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[1]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  <img
                                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[1]?.Airline?.AirlineCode}.png`}
                                                    width="30px"
                                                    height="30px"
                                                    alt="flight-img"
                                                    className="img-border-flyhub"
                                                  />
                                                  <br />
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Airline
                                                      ?.AirlineName
                                                  }
                                                  {" | "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Airline
                                                      ?.AirlineCode
                                                  }
                                                  {/* {
                                              flyhubBookData?.Results[0]
                                                ?.segments[1]?.Airline
                                                ?.FlightNumber
                                            } */}
                                                  &nbsp;
                                                  {(flyhubBookData?.Results[0]
                                                    ?.segments[1]?.Airline
                                                    ?.FlightNumber).length >
                                                  4 ? (
                                                    <>
                                                      {
                                                        flyhubBookData?.Results[0]?.segments[1]?.Airline?.FlightNumber?.split(
                                                          "G9"
                                                        )[1]
                                                      }
                                                    </>
                                                  ) : (
                                                    <>
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[1]?.Airline
                                                          ?.FlightNumber
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[1]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* from */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Origin
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Origin
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Origin
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[1]?.Origin
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[1]?.Origin
                                                          ?.Airport?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[1]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* To  */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Destination
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Destination
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Destination
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[1]?.Destination
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[1]
                                                          ?.Destination?.Airport
                                                          ?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[1]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[1]?.Origin?.DepTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[1]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[1]?.Destination?.ArrTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[1]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  Cabin: 7Kg <br />
                                                  Class:{" "}
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[0]?.Airline
                                                    ?.BookingClass || "Economy"}
                                                  <br />
                                                  Baggage:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]?.Baggage
                                                  }
                                                  <br />
                                                  Duration:{" "}
                                                  {Math.floor(
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[1]
                                                      ?.JourneyDuration / 60
                                                  )}
                                                  h&nbsp;
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[1]
                                                    ?.JourneyDuration -
                                                    Math.floor(
                                                      flyhubBookData?.Results[0]
                                                        ?.segments[1]
                                                        ?.JourneyDuration / 60
                                                    ) *
                                                      60}
                                                  m
                                                </td>
                                              )}
                                          </tr>
                                          {/* ---------segments 1 End-------- */}

                                          {/* ---------segments 2 End-------- */}
                                          <tr>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[2]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  <img
                                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[2]?.Airline?.AirlineCode}.png`}
                                                    width="30px"
                                                    height="30px"
                                                    alt="flight-img"
                                                    className="img-border-flyhub"
                                                  />
                                                  <br />
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Airline
                                                      ?.AirlineName
                                                  }
                                                  {" | "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Airline
                                                      ?.AirlineCode
                                                  }
                                                  &nbsp;
                                                  {(flyhubBookData?.Results[0]
                                                    ?.segments[2]?.Airline
                                                    ?.FlightNumber).length >
                                                  4 ? (
                                                    <>
                                                      {
                                                        flyhubBookData?.Results[0]?.segments[2]?.Airline?.FlightNumber?.split(
                                                          "G9"
                                                        )[1]
                                                      }
                                                    </>
                                                  ) : (
                                                    <>
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[2]?.Airline
                                                          ?.FlightNumber
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[2]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* from */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Origin
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Origin
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Origin
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[2]?.Origin
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[2]?.Origin
                                                          ?.Airport?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[2]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* To  */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Destination
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Destination
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Destination
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[2]?.Destination
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[2]
                                                          ?.Destination?.Airport
                                                          ?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[2]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[2]?.Origin?.DepTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[2]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[2]?.Destination?.ArrTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[2]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  Cabin: 7Kg <br />
                                                  Class:{" "}
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[0]?.Airline
                                                    ?.BookingClass || "Economy"}
                                                  <br />
                                                  Baggage:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]?.Baggage
                                                  }
                                                  <br />
                                                  Duration:
                                                  {Math.floor(
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[2]
                                                      ?.JourneyDuration / 60
                                                  )}
                                                  h&nbsp;
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[2]
                                                    ?.JourneyDuration -
                                                    Math.floor(
                                                      flyhubBookData?.Results[0]
                                                        ?.segments[2]
                                                        ?.JourneyDuration / 60
                                                    ) *
                                                      60}
                                                  m
                                                </td>
                                              )}
                                          </tr>
                                          {/* ---------segments 2 End-------- */}

                                          {/* ---------segments 3 End-------- */}
                                          <tr>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[3]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  <img
                                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[3]?.Airline?.AirlineCode}.png`}
                                                    width="30px"
                                                    height="30px"
                                                    alt="flight-img"
                                                    className="img-border-flyhub"
                                                  />
                                                  <br />
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Airline
                                                      ?.AirlineName
                                                  }
                                                  {" | "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Airline
                                                      ?.AirlineCode
                                                  }
                                                  &nbsp;
                                                  {(flyhubBookData?.Results[0]
                                                    ?.segments[3]?.Airline
                                                    ?.FlightNumber).length >
                                                  4 ? (
                                                    <>
                                                      {
                                                        flyhubBookData?.Results[0]?.segments[3]?.Airline?.FlightNumber?.split(
                                                          "G9"
                                                        )[1]
                                                      }
                                                    </>
                                                  ) : (
                                                    <>
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[3]?.Airline
                                                          ?.FlightNumber
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[3]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* from */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Origin
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Origin
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Origin
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[3]?.Origin
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[3]?.Origin
                                                          ?.Airport?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[3]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* To  */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Destination
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Destination
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Destination
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[3]?.Destination
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[3]
                                                          ?.Destination?.Airport
                                                          ?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[3]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[3]?.Origin?.DepTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[3]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[3]?.Destination?.ArrTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[3]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  Cabin: 7Kg <br />
                                                  Class:{" "}
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[0]?.Airline
                                                    ?.BookingClass || "Economy"}
                                                  <br />
                                                  Baggage:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]?.Baggage
                                                  }
                                                  <br />
                                                  Duration:{" "}
                                                  {Math.floor(
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[3]
                                                      ?.JourneyDuration / 60
                                                  )}
                                                  h&nbsp;
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[3]
                                                    ?.JourneyDuration -
                                                    Math.floor(
                                                      flyhubBookData?.Results[0]
                                                        ?.segments[3]
                                                        ?.JourneyDuration / 60
                                                    ) *
                                                      60}
                                                  m
                                                </td>
                                              )}
                                          </tr>
                                          {/* ---------segments 3 End-------- */}

                                          {/* ---------segments 4 End-------- */}
                                          <tr>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[4]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  <img
                                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[4]?.Airline?.AirlineCode}.png`}
                                                    width="30px"
                                                    height="30px"
                                                    alt="flight-img"
                                                    className="img-border-flyhub"
                                                  />
                                                  <br />
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Airline
                                                      ?.AirlineName
                                                  }
                                                  {" | "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Airline
                                                      ?.AirlineCode
                                                  }
                                                  &nbsp;
                                                  {(flyhubBookData?.Results[0]
                                                    ?.segments[4]?.Airline
                                                    ?.FlightNumber).length >
                                                  4 ? (
                                                    <>
                                                      {
                                                        flyhubBookData?.Results[0]?.segments[4]?.Airline?.FlightNumber?.split(
                                                          "G9"
                                                        )[1]
                                                      }
                                                    </>
                                                  ) : (
                                                    <>
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[4]?.Airline
                                                          ?.FlightNumber
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[4]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* from */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Origin
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Origin
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Origin
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[4]?.Origin
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[4]?.Origin
                                                          ?.Airport?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[4]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* To  */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Destination
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Destination
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Destination
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[4]?.Destination
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[4]
                                                          ?.Destination?.Airport
                                                          ?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[4]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[4]?.Origin?.DepTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[4]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[4]?.Destination?.ArrTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[4]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  Cabin: 7Kg <br />
                                                  Class:{" "}
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[0]?.Airline
                                                    ?.BookingClass || "Economy"}
                                                  <br />
                                                  Baggage:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]?.Baggage
                                                  }
                                                  <br />
                                                  Duration:{" "}
                                                  {Math.floor(
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[4]
                                                      ?.JourneyDuration / 60
                                                  )}
                                                  h&nbsp;
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[4]
                                                    ?.JourneyDuration -
                                                    Math.floor(
                                                      flyhubBookData?.Results[0]
                                                        ?.segments[4]
                                                        ?.JourneyDuration / 60
                                                    ) *
                                                      60}
                                                  m
                                                </td>
                                              )}
                                          </tr>
                                          {/* ---------segments 4 End-------- */}
                                          {/* ---------segments 5 End-------- */}
                                          <tr>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[5]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  <img
                                                    src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flyhubBookData?.Results[0]?.segments[5]?.Airline?.AirlineCode}.png`}
                                                    width="30px"
                                                    height="30px"
                                                    alt="flight-img"
                                                    className="img-border-flyhub"
                                                  />
                                                  <br />
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Airline
                                                      ?.AirlineName
                                                  }
                                                  {" | "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Airline
                                                      ?.AirlineCode
                                                  }
                                                  &nbsp;
                                                  {(flyhubBookData?.Results[0]
                                                    ?.segments[5]?.Airline
                                                    ?.FlightNumber).length >
                                                  4 ? (
                                                    <>
                                                      {
                                                        flyhubBookData?.Results[0]?.segments[5]?.Airline?.FlightNumber?.split(
                                                          "G9"
                                                        )[1]
                                                      }
                                                    </>
                                                  ) : (
                                                    <>
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[5]?.Airline
                                                          ?.FlightNumber
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[5]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* from */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Origin
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Origin
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Origin
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[5]?.Origin
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[5]?.Origin
                                                          ?.Airport?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[5]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {/* To  */}(
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Destination
                                                      ?.Airport?.AirportCode
                                                  }
                                                  )-
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Destination
                                                      ?.Airport?.CityName
                                                  }
                                                  -
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Destination
                                                      ?.Airport?.AirportName
                                                  }
                                                  <br />
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[5]?.Destination
                                                    ?.Airport?.Terminal ===
                                                  "" ? (
                                                    <></>
                                                  ) : (
                                                    <>
                                                      Terminal:{" "}
                                                      {
                                                        flyhubBookData
                                                          ?.Results[0]
                                                          ?.segments[5]
                                                          ?.Destination?.Airport
                                                          ?.Terminal
                                                      }
                                                    </>
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[5]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[5]?.Origin?.DepTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[5]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  {format(
                                                    new Date(
                                                      flyhubBookData?.Results[0]?.segments[5]?.Destination?.ArrTime?.toString()
                                                    ),
                                                    "dd MMM yyyy hh:mm a"
                                                  )}
                                                </td>
                                              )}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5] &&
                                              flyhubBookData.Results[0]
                                                ?.segments[5]?.TripIndicator ===
                                                "InBound" && (
                                                <td>
                                                  Cabin: 7Kg <br />
                                                  Class:{" "}
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[0]?.Airline
                                                    ?.BookingClass || "Economy"}
                                                  <br />
                                                  Baggage:{" "}
                                                  {
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]?.Baggage
                                                  }
                                                  <br />
                                                  Duration:{" "}
                                                  {Math.floor(
                                                    flyhubBookData?.Results[0]
                                                      ?.segments[5]
                                                      ?.JourneyDuration / 60
                                                  )}
                                                  h&nbsp;
                                                  {flyhubBookData?.Results[0]
                                                    ?.segments[5]
                                                    ?.JourneyDuration -
                                                    Math.floor(
                                                      flyhubBookData?.Results[0]
                                                        ?.segments[5]
                                                        ?.JourneyDuration / 60
                                                    ) *
                                                      60}
                                                  m
                                                </td>
                                              )}
                                          </tr>
                                          {/* ---------segments 5 End-------- */}
                                        </>
                                      )}
                                      {/* ---------segments 2 End-------- */}
                                    </table>
                                  </Box>
                                </Box>

                                {/*---------------------------- Fare details ----------------------------*/}

                                <Box
                                  mt={2}
                                  className="flight-queue-detail-fareInfo"
                                >
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

                                        {fareCost[0]?.adultCount > 0 ? (
                                          <tr>
                                            <td>
                                              Adult X{fareCost[0]?.adultCount}
                                            </td>
                                            {/* <td>
                                        {flyhubBookData?.Results[0]?.Fares[0]
                                          ?.PaxType === "Adult" && (
                                          <>
                                            {" "}
                                            {flyhubBookData?.Results[0]
                                              ?.segments[0]?.baggageDetails[0]
                                              .Checkin || "0 Kg"}
                                          </>
                                        )}
                                      </td> */}
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.adultCostBase
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.adultCostTax
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(adultTotalPrice)} BDT
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )}

                                        {fareCost[0]?.childCount > 0 ? (
                                          <tr>
                                            <td>
                                              Child X{fareCost[0]?.childCount}
                                            </td>
                                            {/* <td>
                                        {flyhubBookData?.Results[0]?.Fares[1]
                                          ?.PaxType === "Child" && (
                                          <>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[1]?.baggageDetails[1]
                                              .Checkin || "0.0 Kg"}
                                          </>
                                        )}
                                      </td> */}
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.childCostBase
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.childCostTax
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(childTotalPrice)} BDT
                                            </td>
                                          </tr>
                                        ) : (
                                          <></>
                                        )}
                                        {fareCost[0]?.infantCount > 0 ? (
                                          <tr>
                                            <td>
                                              Infant X{fareCost[0]?.infantCount}
                                            </td>
                                            {/* <td>
                                        {" "}
                                        {flyhubBookData?.Results[0]?.Fares[2]
                                          ?.PaxType === "Infant" && (
                                          <>
                                            {flyhubBookData?.Results[0]
                                              ?.segments[2]?.baggageDetails[2]
                                              .Checkin || "0.0 Kg"}
                                          </>
                                        )}
                                      </td> */}
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.infantCostBase
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(
                                                fareCost[0]?.infantCostTax
                                              )}{" "}
                                              BDT
                                            </td>
                                            <td>
                                              {commaNumber(infantTotalPrice)}{" "}
                                              BDT
                                            </td>
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
                                            {commaNumber(fareCost[0]?.netCost)}{" "}
                                            BDT
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

                                <Box
                                  mt={5}
                                  className="queue-detail-passenger-detail"
                                >
                                  <Box my={2}>
                                    <span>Passenger Details</span>
                                  </Box>

                                  <div>
                                    {passengerData.length === 0 ? (
                                      <>loading...</>
                                    ) : (
                                      <>
                                        {passengerData.map((traveler) => (
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
                                                    {traveler?.gender ===
                                                      "Male" &&
                                                    traveler?.type === "ADT" ? (
                                                      <>
                                                        MR {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MSTR {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    )}
                                                  </>
                                                ) : (
                                                  <>
                                                    {traveler?.gender ===
                                                      "Female" &&
                                                    traveler?.type === "ADT" ? (
                                                      <>
                                                        MS {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MISS {traveler?.fName}{" "}
                                                        {traveler?.lName}
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                              </h5>
                                            </Box>

                                            <Box
                                              border="1px solid #DEDEDE"
                                              p="3px"
                                              mb={2}
                                            >
                                              <Grid container spacing={2}>
                                                <Grid item xs={4} md={2}>
                                                  <h5>Title</h5>
                                                  <h6>
                                                    {traveler?.gender ===
                                                    "Male" ? (
                                                      <>
                                                        {traveler?.gender ===
                                                          "Male" &&
                                                        traveler?.type ===
                                                          "ADT" ? (
                                                          <>MR</>
                                                        ) : (
                                                          <>MSTR</>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>
                                                        {traveler?.gender ===
                                                          "Female" &&
                                                        traveler?.type ===
                                                          "ADT" ? (
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
                                                  <h6>
                                                    {traveler?.passNation}
                                                  </h6>
                                                </Grid>

                                                <Grid item xs={4} md={2}>
                                                  <h5>Date of Birth</h5>
                                                  <h6>
                                                    {traveler?.dob
                                                      ? format(
                                                          new Date(
                                                            traveler?.dob
                                                          ),
                                                          "dd MMM yyyy"
                                                        )
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
                                                      : "Infat"}
                                                  </h6>
                                                </Grid>

                                                <Grid item xs={4} md={2}>
                                                  <h5>Passport Number</h5>
                                                  <h6>
                                                    {fareCost[0]
                                                      ?.journeyType ===
                                                    "Outbound"
                                                      ? traveler?.passNo?.toUpperCase() ||
                                                        traveler?.passNo?.toUpperCase() ||
                                                        "Passport Number"
                                                      : "Domestic Flight"}
                                                  </h6>
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                  <h5>Passport Expire Date</h5>

                                                  <h6>
                                                    {fareCost[0]
                                                      ?.journeyType ===
                                                    "Outbound" ? (
                                                      <>
                                                        {traveler?.passEx ===
                                                        "0000-00-00" ? (
                                                          <></>
                                                        ) : (
                                                          <>
                                                            {traveler?.passEx
                                                              ? format(
                                                                  new Date(
                                                                    traveler?.passEx
                                                                  ),
                                                                  "dd MMM yyyy"
                                                                )
                                                              : "Passport Expire Date"}
                                                          </>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <>Domestic Flight</>
                                                    )}
                                                  </h6>
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          </>
                                        ))}
                                      </>
                                    )}
                                  </div>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={2.5} mt={10.5}>
                                <Box>
                                  <>
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
                                        <BookingConfirWithPriceF
                                          allData={allData}
                                        />
                                        <BookingConfirWithoutPriceF
                                          allData={allData}
                                        />
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
                                            No automatic fare rules available,
                                            Please mail us for fare rules.
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                                  justifyContent={
                                                    "space-between"
                                                  }
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
                                            No automatic fare rules available,
                                            Please mail us for fare rules.
                                          </>
                                        )}
                                      </AccordionDetails>
                                    </Accordion>

                                    {/* <Accordion
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
                                        <Typography>
                                          Departure Flight
                                        </Typography>
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
                                            <Typography>
                                              Return Flight
                                            </Typography>
                                            <Grid
                                              container
                                              justifyContent="space-between"
                                            >
                                              <Grid item>
                                                <Typography
                                                  color="#000"
                                                  fontSize="14px"
                                                >
                                                  {fareCost[0]?.adultCount >
                                                    0 && (
                                                    <>
                                                      Adult <br />
                                                    </>
                                                  )}

                                                  {fareCost[0]?.childCount >
                                                    0 && (
                                                    <>
                                                      Child
                                                      <br />
                                                    </>
                                                  )}

                                                  {fareCost[0]?.infantCount >
                                                    0 && (
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
                                    </AccordionDetails>
                                  </Accordion> */}

                                    {parseInt(balance[0]?.lastAmount) >=
                                    parseInt(fareCost[0]?.netCost) ? (
                                      <>
                                        <Box className="queues-detail-calcel-btn">
                                          {!issueLoading ? (
                                            <Box
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <button
                                                style={{
                                                  backgroundColor: "#003566",
                                                  color: "#fff",
                                                  border: "none",
                                                }}
                                                onClick={() => {
                                                  if (
                                                    passengerData[0]
                                                      ?.passportCopy === "" &&
                                                    passengerData[0]
                                                      ?.visaCopy === "" &&
                                                    triptype === "Outbound"
                                                  ) {
                                                    handleOpenUpdateModal();
                                                  } else if (
                                                    passengerData[0]
                                                      ?.passportCopy !== "" &&
                                                    passengerData[0]
                                                      ?.visaCopy !== "" &&
                                                    triptype !== "Outbound"
                                                  ) {
                                                    handleIssueTicket();
                                                  } else {
                                                    handleIssueTicket();
                                                  }
                                                }}
                                              >
                                                Issue Ticket
                                              </button>
                                              {/* //todo: upload section */}
                                              {triptype === "Outbound" ? (
                                                <button
                                                  style={{
                                                    backgroundColor:
                                                      passengerData[0]
                                                        ?.passportCopy === "" &&
                                                      passengerData[0]
                                                        ?.visaCopy === ""
                                                        ? "#003566"
                                                        : "green",
                                                    color: "#fff",
                                                    border: "none",
                                                  }}
                                                  onClick={() => {
                                                    handleOpenUpdateModal();
                                                  }}
                                                >
                                                  {passengerData[0]
                                                    ?.passportCopy === "" &&
                                                  passengerData[0]?.visaCopy ===
                                                    ""
                                                    ? "Update Document"
                                                    : "Document Updated ✔"}
                                                </button>
                                              ) : null}
                                            </Box>
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
                                            <Box
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                              }}
                                            >
                                              <button
                                                style={{
                                                  backgroundColor: "#003566",
                                                  color: "#fff",
                                                  border: "none",
                                                }}
                                                onClick={() => {
                                                  if (
                                                    passengerData[0]
                                                      ?.passportCopy === "" &&
                                                    passengerData[0]
                                                      ?.visaCopy === "" &&
                                                    triptype === "Outbound"
                                                  ) {
                                                    handleOpenUpdateModal();
                                                  } else if (
                                                    passengerData[0]
                                                      ?.passportCopy !== "" &&
                                                    passengerData[0]
                                                      ?.visaCopy !== "" &&
                                                    triptype !== "Outbound"
                                                  ) {
                                                    handleIssueTicket();
                                                  } else {
                                                    handleIssueTicket();
                                                  }
                                                }}
                                              >
                                                Issue Ticket
                                              </button>
                                              {/* //todo: upload section */}
                                              {triptype === "Outbound" ? (
                                                <button
                                                  style={{
                                                    backgroundColor:
                                                      passengerData[0]
                                                        ?.passportCopy === "" &&
                                                      passengerData[0]
                                                        ?.visaCopy === ""
                                                        ? "#003566"
                                                        : "green",
                                                    color: "#fff",
                                                    border: "none",
                                                  }}
                                                  onClick={() => {
                                                    handleOpenUpdateModal();
                                                  }}
                                                >
                                                  {passengerData[0]
                                                    ?.passportCopy === "" &&
                                                  passengerData[0]?.visaCopy ===
                                                    ""
                                                    ? "Update Document"
                                                    : "Document Updated ✔"}
                                                </button>
                                              ) : null}
                                            </Box>
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
                                          you have insufficient balance, please
                                          make deposit to issue this ticket
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
                                        onClick={() =>
                                          cancelBooking(system, pnr)
                                        }
                                      >
                                        Cancel Flight
                                      </button>
                                    </Box>
                                  </>
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
                      </Box>
                    ) : (
                      "There is a no queues"
                    )}
                  </>
                </Box>
              </Container>
            </Box>
          </>
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
      </Box>
      {/* //todo: Update Document Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box sx={updateModalStyle}>
          <FileUploadSection
            setState={setState}
            passengerData={passengerData}
            handleIssueTicket={handleIssueTicket}
            handleCloseUpdateModal={handleCloseUpdateModal}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Congratulation;
