/* eslint-disable react/jsx-no-comment-textnodes */
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
import "./QueuesDetail.css";
import secureLocalStorage from "react-secure-storage";
import { format, formatRelative } from "date-fns";
// import UpdateDocument from "../../../../UpdateDocument/UpdateDocument";
import { Calendar } from "react-date-range";
import cancelImg from "../../../../images/undraw/undraw_cancel_re_pkdm.svg";
import cancelFailed from "../../../../images/undraw/undraw_bug_fixing_oc-7-a.svg";
import ReConfirm from "../../../../images/undraw/undraw_confirmation_re_b6q5.svg";
import Issue from "../../../../images/undraw/undraw_booking_re_gw4j.svg";
import Invalid from "../../../../images/undraw/undraw_warning_re_eoyh.svg";
import Ticketed from "./../../Ticketed/Ticketed";

const QueuesDetail = () => {
  //  handle accordion function
  //Data from Queues page
  const location = useLocation();
  const {
    bookingId,
    gds,
    flightType,
    status,
    bookDate,
    deptFrom,
    arriveTo,
    pnr,
    airlines,
    netCost,
    tripType,
    issueTime,
    name,
    bookingDetail,
    searchId,
    resultId,
  } = location?.state;

  const [triptype, setTripType] = useState("");

  const issueModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#fff",
    p: 4,
  };
  const navigate = useNavigate();
  const [issueModal, setIssueModal] = useState(false);
  const handleOpenIssueModal = () => setIssueModal(true);
  const handleCloseIssueModal = () => {
    setIssueModal(false);
  };
  const [openModalReIssue, setOpenModalReIssue] = useState(false);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const [openModalVoid, setOpenModalVoid] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [expanded, setExpanded] = useState("panel1");
  const [downExpanded, setDownExpanded] = useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleChangeDown = (panel) => (event, newExpanded) => {
    setDownExpanded(newExpanded ? panel : false);
  };
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [issueLoading, setIssueLoading] = useState(false);
  // --------------------- client information start ---------------------------
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  let agentName = users?.user?.name;
  let staffName = users?.user?.name;
  let userStaffId = users?.user?.staffId;

  const [isDone, setIsDone] = useState(true);

  const [flyhubBookData, setflyhubBookData] = useState({});
  const [sabreBookData, setSabreBookData] = useState({});
  const [bookingDetails, setBookingDetails] = useState([]);
  const [fareCost, setFareCost] = useState({});
  const [userData, setUserData] = useState([0]);
  const [flightName, setFlightName] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const [invoiceId, setInvoiceId] = useState([]);

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(format(new Date(), "dd-MMM-yyyy"));

  //todo:state change
  const [state, setState] = useState(false);

  // visa and passport copy update state
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => {
    setState((prev) => !prev);
    setOpenUpdateModal(false);
    navigate(0);
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
  // End of visa and passport copy update
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    //todo: inbound outbound
    const depObj = flightData.filter((item) => item.code === deptFrom);
    const arrObj = flightData.filter((item) => item.code === arriveTo);
    const depCountry = depObj[0]?.Address?.split(",")[1]?.trim()?.toLowerCase();
    const arrCountry = arrObj[0]?.Address?.split(",")[1]?.trim()?.toLowerCase();
    if (depCountry === "bangladesh" && arrCountry === "bangladesh") {
      setTripType("Inbound");
    } else {
      setTripType("Outbound");
    }
    //todo: inbound outbound
    const fetchAllData = async () => {
      if (gds === "FlyHub") {
        const resflyHub = await axios(
          `https://api.flyfarint.com/v.1.0.0/FlyHub/AirRetrieve.php?BookingID=${
            pnr || location.state.bookingInfo.pnr
          }`
        );
        setflyhubBookData(resflyHub.data);
      } else {
        const resSabre = await axios(
          `https://api.flyfarint.com/v.1.0.0/Sabre/AirRetrieve.php?BookingID=${
            pnr || location.state.bookingInfo.pnr
          }`
        );

        setSabreBookData(resSabre.data);
      }
      const resBooking = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=all`
      );
      setBookingDetails(resBooking.data);
      //todo: data retrieve after cancellation section
      const resBookingId = await axios(
        `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=BId&bookingId=${bookingId}`
      );
      // console.log(
      //   `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentID}&search=BId&bookingId=${bookingId}`
      // );
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

      if (gds === "FlyHub") {
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
      if (gds === "Sabre") {
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
  }, [gds, pnr, agentID, bookingId, state]);

  const cancelBooking = (system, pnr) => {
    Swal.fire({
      // icon: "warning",
      imageUrl: ReConfirm,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      title: "Are you sure?",
      text: "You Wants to Cancel this Flight ?",
      showCancelButton: true,
      confirmButtonColor: "#003566",
      confirmButtonText: "Yes Cancel it!",
      cancelButtonColor: "#dc143c",
      cancelButtonText: "Don't Cancel it",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        setIsDone(false);
        setOpen(false);
        setIsLoading(false);
        // let url = `https://api.flyfarint.com/v.1.0.0/${system}/AirCancel.php`;
        let url = `https://api.flyfarint.com/v.1.0.0/AirBooking/AirCancel.php`;
        let body = JSON.stringify({
          // BookingID: pnr,
          bookingId: bookingId,
          cancelBy: staffName || agentID,
          platform: "B2B",
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
              Swal.fire({
                // icon: "success",
                imageUrl: cancelImg,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: "Your Flight is Cancel!",
                html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
                confirmButtonText: "OK",
                cancelButtonColor: "#dc143c",
              }).then(() => {
                setIsDone(true);
                navigate(-1);
              });
            } else {
              throw new Error("error");
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              imageUrl: cancelFailed,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Booking Cancel Failed!",
              html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
              confirmButtonText: "OK",
              cancelButtonColor: "#dc143c",
            }).then(() => {
              setIsDone(true);
              navigate(-1);
            });
          });
      }
    });
  };

  //--------------- Booking cancel handle end ------------------
  //--------------- Issue Ticket Start ------------------

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
        html: "If you use your bonus balance <strong>100 BDT</strong> will be deduct form your bonus wallet",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: "#003566",
        cancelButtonColor: "#9999",
        denyButtonColor: "#dc143c",
        confirmButtonText: "Redeem Bonus",
        denyButtonText: `Don't Use Bonus`,
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDone(false);
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
                staffId: userStaffId || "Staff",
                airlines: airlines,
                issueRequestBy: staffName || agentName,
                route: `${deptFrom}-${arriveTo}`,
                type: tripType,
                cost: netCost,
                pnr: pnr,
                gds: gds,
                status: "Issue in Process",
                useFromBonus: "yes",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
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
                  setIsDone(true);
                  navigate(0);
                });
              } else {
                throw new Error("error");
              }
            })
            .catch((err) => {
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
                setIsDone(true);
                navigate(-1);
              });
            });
        } else if (result.isDenied) {
          setIsDone(false);
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
                staffId: userStaffId || "Staff",
                airlines: airlines,
                issueRequestBy: staffName || agentName,
                route: `${deptFrom}-${arriveTo}`,
                type: tripType,
                cost: netCost,
                pnr: pnr,
                gds: gds,
                status: "Issue in Process",
                useFromBonus: "no",
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
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
                  setIsDone(true);
                  navigate(0);
                });
              } else {
                throw new Error("error");
              }
            })
            .catch((err) => {
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
                setIsDone(true);
                navigate(-1);
              });
            });
        }
      });
    } else {
      setIsDone(false);
      setIssueLoading(true);
      let url = "https://api.flyfarint.com/v.1.0.0/AirBooking/AirTicketing.php";
      let body = JSON.stringify({
        agentId: agentID || "Agent",
        bookingId: bookingId || "BookingId",
        staffId: userStaffId || "Staff",
        airlines: airlines,
        issueRequestBy: staffName || agentName,
        route: `${deptFrom}-${arriveTo}`,
        type: tripType,
        cost: netCost,
        pnr: pnr,
        gds: gds,
        status: "Issue in Process",
        useFromBonus: "no",
      });
      // console.log(url);
      // console.log(body);
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      })
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
              setIsDone(true);
              setIssueLoading(false);
              navigate(-1);
            });
          } else {
            throw new Error("error");
          }
        })
        .catch((err) => {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Issue Ticket Failed!",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            setIsDone(true);
            setIssueLoading(false);
            navigate(-1);
          });
        });
    }
  }
  //--------------- Isssue Ticket end ------------------
  // -------------- data get from queue page -------------
  // ------------ country name find-out ------------

  const data = flightData;

  let fromCountryName;
  {
    data.map((flightData) => {
      if (flightData.code === deptFrom) {
        fromCountryName = flightData?.Address;
      }
    });
  }
  let toCountryName;
  {
    data.map((flightData) => {
      if (flightData.code === arriveTo) {
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

  const allData = {
    pnr: location?.state?.pnr || location.state.bookingInfo.pnr,
    fromCountryName: fromCountryName,
    toCountryName: toCountryName,
    flightType: flightType,
    bookingId: bookingId,
    bookDate: bookDate,
    // issueTime: issueTime,
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

  const infantFareRules = sabreBookData?.fareRules?.filter(
    (fareInfantData) => fareInfantData.passengerCode === "INF"
  );

  // Fare rules
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

  const airLineName = airlineNames;
  const [nameofflight, setNameofflight] = useState([]);
  useEffect(() => {
    if (Object.keys(sabreBookData).length !== 0) {
      sabreBookData?.flights?.map((flightData) => {
        airLineName?.map((airName) => {
          if (airName?.code === flightData?.operatingAirlineCode) {
            setNameofflight((prev) => [...prev, airName?.name]);
          }
        });
      });
    }
  }, [sabreBookData, state]);

  // For Ticket Number
  useEffect(() => {
    if (Object.keys(fareCost).length !== 0) {
      const url5 = `https://api.flyfarint.com/v.1.0.0/Queues/Ticketing.php?bookingId=${bookingId}`;
      // console.log(url5);
      const fetchUserData5 = fetch(url5)
        .then((res) => res.json())
        .then((data) => {
          setInvoiceId(data);
          setIsLoading(false);
        });
    }
  }, [bookingId, fareCost]);

  const [reissueData, setReIssueData] = useState();
  const [checkBox, setCheckBox] = useState();
  const handleCheckBox = (index) => {
    const e = window.event;
    const tempData = [...invoiceId];
    tempData[index] = { ...tempData[index], checkBox: e.target.checked };
    setCheckBox(e.target.checked);
    setInvoiceId(tempData);
  };

  let reissue = [];
  const checkedData = invoiceId.filter((data) => {
    if (data.checkBox === true) {
      reissue = [
        ...reissue,
        { name: data.passengerName, ticket: data.ticketno },
      ];
    }
  });

  let checkIssueBalance =
    parseInt(balance[0]?.lastAmount) + parseInt(balance[0]?.credit);

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

  // Void -Function

  const handleVoid = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      staffId: userStaffId || "StaffId",
      bookingId: bookingId || "BookingId",
      requestedBy: staffName || agentName,
      passengerData: reissue,
      // date: date,
    });
    console.log("void", body);
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/AirBooking/Void.php",

      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOpenModalVoid(false);
          Swal.fire({
            icon: "success",
            title: "Your request is processing !",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "OK",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            navigate(0);
          });
        } else {
          setOpenModalVoid(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(-1);
          });
        }
      });

    e.target.reset();
  };
  const handleRefund = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      staffId: userStaffId || "StaffId",
      bookingId: bookingId || "BookingId",
      requestedBy: staffName || agentName,
      passengerData: reissue,
      // date: date,
    });
    console.log("refund", body);
    await fetch("https://api.flyfarint.com/v.1.0.0/AirBooking/Refund.php", {
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
          setOpenModalRefund(false);
          Swal.fire({
            icon: "success",
            title: "Your request is processing !",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "OK",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            navigate(0);
          });
        } else {
          setOpenModalRefund(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(-1);
          });
        }
      });

    e.target.reset();
  };
  const handleReissue = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId: agentID,
      staffId: userStaffId || "StaffId",
      bookingId: bookingId || "BookingId",
      requestedBy: staffName || agentName,
      passengerData: reissue,
      date: date,
    });
    console.log("Reissue", body);
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/AirBooking/Reissue.php",

      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOpenModalReIssue(false);
          Swal.fire({
            icon: "success",
            title: "Your request is processing !",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "OK",
          }).then(function () {
            // window.location.href = "/dashboard/account/DepositEntry";
            navigate(0);
          });
        } else {
          setOpenModalReIssue(false);
          Swal.fire({
            icon: "error",
            title: "Reissue Request Failed!",
            html: "For any query.Please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912</strong>",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(-1);
          });
        }
      });

    e.target.reset();
  };

  const allAirportName = flightData;
  const voideDate = new Date(fareCost[0]?.activity[0]?.actionAt).getDate();
  const todaydate = new Date().getDate();
  const string1 = "Baggage :";
  const string2 = "S<br/>";
  return (
    <>
      {Object.keys(sabreBookData).length !== 0 ||
      Object.keys(flyhubBookData).length !== 0 ? (
        <>
          {gds === "Sabre" ||
          location?.state?.bookingInfo?.system === "Sabre" ? (
            <Container className="queues-detail-parent" maxWidth="xxl">
              {Object.keys(sabreBookData).length !== 0 ? (
                <Box pb={4}>
                  <Grid container spacing={2}>
                    {sabreBookData.BookingID === null ? (
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
                        <Grid item md={9.5}>
                          <Box className="queues-detail">
                            <Grid container justifyContent={"space-between"}>
                              <Grid item mt={4} mb={2} md={6}>
                                <h2>Reference ID: {bookingId}</h2>
                              </Grid>
                              <Grid item mt={4} mb={2} md={6} textAlign="end">
                                <button>
                                  {fareCost[0]?.status === "Return"
                                    ? "Issue Rejected"
                                    : fareCost[0]?.status || "Loading ..."}
                                </button>
                              </Grid>
                            </Grid>
                            <Grid
                              display={"flex"}
                              justifyContent="space-between"
                              alignItems={"center"}
                              container
                            >
                              {/* <Grid item>
                            {status === "Ticketed" ? (
                              <h5>
                                Airlines PNR:{" "}
                                <span>
                                  {sabreBookData?.flights[0]?.confirmationId}
                                </span>
                              </h5>
                            ) : (
                              <></>
                            )}
                          </Grid> */}
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
                                        marginBottom: "10px",
                                      }}
                                    >
                                      Destination:
                                    </h5>
                                    <h5>Booked By: </h5>
                                    <h5>Booked At: </h5>
                                    {fareCost[0]?.status === "Hold" ? (
                                      <h5>Time Limit: </h5>
                                    ) : (
                                      ""
                                    )}
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
                                      {deptFrom} - {arriveTo}
                                      {tripType === "return" ? (
                                        <>
                                          {" "}
                                          - {deptFrom}
                                          {/* {fromCountryName?.split(",")[0] || deptFrom} -{" "}
                                  {toCountryName?.split(",")[0] || arriveTo}
                                  {tripType === "return" ? (
                                    <>
                                      {" "}
                                      -{" "}
                                      {fromCountryName?.split(",")[0] ||
                                        deptFrom} */}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </h5>

                                    <h5>{fareCost[0]?.bookedBy || "Agent"}</h5>
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
                                    {fareCost[0]?.status === "Hold" ? (
                                      <>
                                        {fareCost[0]?.timeLimit ? (
                                          fareCost[0]?.timeLimit ? (
                                            format(
                                              new Date(
                                                fareCost[0]?.timeLimit.toString()
                                              ),
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
                                <Box>
                                  {sabreBookData?.fareRules === undefined ? (
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
                                      {sabreBookData?.fareRules[0]
                                        ?.isRefundable === true ? (
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
                                    </>
                                  )}
                                </Box>
                                {/* <Box
                                  display={"flex"}
                                  gap={{ lg: "20px", xs: "48px" }}
                                >
                                  {fareCost[0]?.status === "Hold" ? (
                                    <></>
                                  ) : fareCost[0]?.status ===
                                    "Issue In Processing" ? (
                                    <>
                                      <Box>
                                        <h5>Issue Requested By: </h5>
                                        <h5>Issue Requested At: </h5>
                                      </Box>

                                      <Box>
                                        <h5>
                                          {fareCost[0]?.issueRequestBy ||
                                            "Issue Requested"}
                                        </h5>
                                        <h5>
                                          {fareCost[0]?.issueRequestAt
                                            ? format(
                                                new Date(
                                                  fareCost[0]?.issueRequestAt?.toString()
                                                ),
                                                "dd MMM yyyy hh:mm a"
                                              )
                                            : "Issue Time"}
                                        </h5>
                                      </Box>
                                    </>
                                  ) : (
                                    <>
                                      {fareCost[0]?.ticketBy ? (
                                        <>
                                          <Box>
                                            <h5>Ticketed By: </h5>
                                            <h5>Ticketed At: </h5>
                                          </Box>
                                          <Box>
                                            <h5>
                                              {fareCost[0]?.ticketBy ||
                                                "Ticketed By"}
                                            </h5>
                                            <h5>
                                              {fareCost[0]?.ticketedAt
                                                ? format(
                                                    new Date(
                                                      fareCost[0]?.ticketedAt?.toString()
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
                                </Box> */}
                              </Grid>
                            </Grid>
                          </Box>

                          {/* ------------- FLight Information ---------------------------- */}

                          <Box mt={2} className="flight-queue-detail-fareInfo">
                            <span>Flight Information</span>
                            <Box mt={2}>
                              <Box>
                                {sabreBookData?.flights === undefined ? (
                                  <Typography
                                    color="red"
                                    fontWeight="bold"
                                    width="100%"
                                  >
                                    This flight information is automatic deleted
                                    by system
                                  </Typography>
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
                                  <table>
                                    <tr>
                                      <th width="7%">Flight</th>
                                      <th width="10%">Departure From</th>
                                      <th width="10%">Arrival To</th>
                                      <th width="10%">Depart At</th>
                                      <th width="10%">Arrive At</th>
                                      <th width="10%">Info</th>
                                    </tr>
                                    {sabreBookData?.flights.map(
                                      (flightData, index) => (
                                        <tr key={index}>
                                          <td>
                                            <img
                                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.airlineCode}.png`}
                                              width="30px"
                                              height="30px"
                                              alt="flight Image"
                                              className="img-border-sabre"
                                            />
                                            <br />
                                            {nameofflight[index] ||
                                              fareCost[0]?.airlines}
                                            {" | "}
                                            {
                                              flightData?.operatingAirlineCode
                                            }{" "}
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
                                            ))}
                                            <br />
                                            {!flightData?.departureTerminalName ? (
                                              <></>
                                            ) : (
                                              <>
                                                {
                                                  flightData?.departureTerminalName
                                                }{" "}
                                                <br /> Gate -{" "}
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
                                            ))}
                                            <br />
                                            {!flightData?.arrivalTerminalName ? (
                                              <></>
                                            ) : (
                                              <>
                                                {
                                                  flightData?.arrivalTerminalName
                                                }{" "}
                                                <br /> Gate -{" "}
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
                                            Class: {flightData?.bookingClass}
                                            <br />
                                            Baggage:{" "}
                                            {(sabreBookData?.fares[0]
                                              ?.fareConstruction[0]
                                              ?.checkedBaggageAllowance
                                              ?.maximumPieces && (
                                              <>
                                                {
                                                  sabreBookData?.fares[0]
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
                                                  sabreBookData?.fares[0]
                                                    ?.fareConstruction[0]
                                                    ?.checkedBaggageAllowance
                                                    ?.totalWeightInKilograms
                                                }{" "}
                                                Kg
                                              </>
                                            )) ||
                                              ""}
                                            {/* {sabreBookData?.fareOffers[0]
                                              ?.checkedBaggageAllowance
                                              ?.maximumPieces && (
                                              <>
                                                {" "}
                                                {sabreBookData?.fareOffers[0]
                                                  ?.checkedBaggageAllowance
                                                  ?.maximumPieces || "0.0"}{" "}
                                                Piece
                                              </>
                                            )}
                                            {sabreBookData?.fareOffers[0]
                                              ?.checkedBaggageAllowance
                                              ?.totalWeightInKilograms && (
                                              <>
                                                {" "}
                                                {sabreBookData?.fareOffers[0]
                                                  ?.checkedBaggageAllowance
                                                  ?.totalWeightInKilograms ||
                                                  "0.0"}{" "}
                                                Kg
                                              </>
                                            )}{" "} */}
                                            <br />
                                            Duration:{" "}
                                            {Math.floor(
                                              flightData?.durationInMinutes / 60
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
                                  </table>
                                )}
                                {/* </table> */}
                              </Box>
                            </Box>
                          </Box>

                          {/*---------------------------- Fare details ----------------------------*/}

                          <Box mt={2} className="flight-queue-detail-fareInfo">
                            <span>Fare Details</span>
                            {Object.keys(fareCost).length === 0 ? (
                              <>Loading...</>
                            ) : (
                              <>
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
                                            {commaNumber(infantTotalPrice)} BDT
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
                              </>
                            )}
                          </Box>

                          {/* --------------------- passenger details accordion ---------------- */}

                          <Box mt={5} className="queue-detail-passenger-detail">
                            <Box my={2}>
                              <span>Passenger Details</span>
                            </Box>

                            <div>
                              {passengerData?.length === 0 ? (
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
                                              {traveler?.gender === "Male" &&
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
                                              {traveler?.gender === "Female" &&
                                              traveler?.type === "ADT" ? (
                                                <>
                                                  MRS {traveler?.fName}{" "}
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
                                              {traveler?.gender === "Male" ? (
                                                <>
                                                  {traveler?.gender ===
                                                    "Male" &&
                                                  traveler?.type === "ADT" ? (
                                                    <>MR</>
                                                  ) : (
                                                    <>MSTR</>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  {traveler?.gender ===
                                                    "Female" &&
                                                  traveler?.type === "ADT" ? (
                                                    <>MRS</>
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
                                              {fareCost[0]?.journeyType ===
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
                                              {fareCost[0]?.journeyType ===
                                              "Outbound"
                                                ? traveler?.passEx ||
                                                  traveler?.passEx
                                                  ? format(
                                                      new Date(
                                                        traveler?.passEx ||
                                                          traveler?.passEx
                                                      ),
                                                      "dd MMM yyyy"
                                                    )
                                                  : "Passport Expire Date"
                                                : "Domestic Flight"}
                                            </h6>
                                          </Grid>
                                          {fareCost[0]?.journeyType ===
                                            "Outbound" &&
                                          fareCost[0]?.status !== "Hold" ? (
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
                                                    href={
                                                      traveler?.passportCopy ||
                                                      ""
                                                    }
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
                                                    href={
                                                      traveler?.visaCopy || ""
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {" "}
                                                    View
                                                  </a>
                                                </h6>
                                              </Grid>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                      </Box>
                                    </>
                                  ))}
                                </>
                              )}
                            </div>
                          </Box>
                        </Grid>

                        <Grid item sm={12} md={2.5}>
                          <Box mt={5}>
                            <div>
                              <Accordion
                                expanded={downExpanded === "panel1"}
                                onChange={handleChangeDown("panel1")}
                                style={{
                                  boxShadow:
                                    "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
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
                                  {fareCost[0]?.activity?.map((data) => (
                                    <Grid container>
                                      {console.log(data)}
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
                                            {data?.status === "Ticketed" ||
                                            data?.status === "Refunded" ||
                                            data?.status === "Reissued" ||
                                            data?.status === "Voided" ||
                                            data?.status ===
                                              "Issue Rejected" ? (
                                              <>Fly Far International</>
                                            ) : (
                                              <>
                                                {data?.actionBy},{" "}
                                                {userData[0]?.company}
                                              </>
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
                                                  new Date(
                                                    data?.actionAt?.toString()
                                                  ),
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
                                            {data?.remarks === "" ||
                                            data?.remarks === " " ? (
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
                                    {/* Download / PDF Sabre */}
                                    Download / PDF
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {fareCost[0]?.status === "Ticketed" ? (
                                    <>
                                      {/* <ClientInvoice allData={allData} /> */}
                                      {/* <AgentInvoice allData={allData} /> */}
                                      {/* <ClientTicketWithPrice
                                        allData={allData}
                                      /> */}
                                      {/* <EticketWithoutPrice allData={allData} /> */}
                                    </>
                                  ) : (
                                    <>
                                      {/* <BookingConfirWithPrice
                                        allData={allData}
                                      /> */}
                                      {/* <BookingConfirWithoutPrice
                                        allData={allData}
                                      /> */}
                                    </>
                                  )}
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
                                                    ?.penalty?.amount || "0.0"}
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
                                                    ?.penalty?.amount || "0.0"}
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
                                                    ?.penalty?.amount || "0.0"}
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
                                                    ?.penalty?.amount || "0.0"}
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
                                      No automatic fare rules available, Please
                                      mail us for fare rules.
                                    </>
                                  )}
                                </AccordionDetails>
                              </Accordion>
                            </div>

                            {fareCost[0]?.status === "Ticketed" ? (
                              <>
                                <Box className="queues-detail-calcel-btn">
                                  <button
                                    style={{
                                      backgroundColor: "#003566",
                                      color: "#fff",
                                      border: "none",
                                    }}
                                    onClick={() => setOpenModalReIssue(true)}
                                  >
                                    Re-Issue
                                  </button>
                                  <Modal
                                    open={openModalReIssue}
                                    onClose={() => setOpenModalReIssue(false)}
                                    className="custom-modal-r modal-table-0"
                                  >
                                    <Box
                                      className="modalStyler"
                                      bgcolor="#fff"
                                      p="25px"
                                    >
                                      <Box className="modal-table">
                                        <Typography
                                          sx={{
                                            color: "#033566",
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            mb: "10px",
                                          }}
                                        >
                                          Re-Issue
                                        </Typography>
                                        <table>
                                          <tr>
                                            <th width="5%">Select</th>
                                            <th width="35%">Passenger Name</th>
                                            <th width="20%">Gender</th>
                                            <th width="20%">Passenger Type</th>
                                            <th width="30%">Ticket No</th>
                                          </tr>
                                          {invoiceId.map((ticket, index) => (
                                            <tr key={index}>
                                              <td
                                                width="10px"
                                                style={{ border: "none" }}
                                              >
                                                <FormGroup
                                                  style={{
                                                    padding: "0px",
                                                    margin: "0px",
                                                  }}
                                                >
                                                  <FormControlLabel
                                                    control={
                                                      <Checkbox
                                                        style={{
                                                          padding: "0px",
                                                          margin: "auto",
                                                          marginLeft: "20px",
                                                        }}
                                                        onChange={() =>
                                                          handleCheckBox(index)
                                                        }
                                                      />
                                                    }
                                                  />
                                                </FormGroup>
                                              </td>
                                              <td>
                                                {ticket?.gender === "Female" ? (
                                                  <>
                                                    {ticket?.gender ===
                                                      "Female" &&
                                                    ticket?.pType === "ADT" ? (
                                                      <>
                                                        MRS{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MISS{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    )}
                                                  </>
                                                ) : (
                                                  <>
                                                    {ticket?.gender ===
                                                      "Male" &&
                                                    ticket?.pType === "ADT" ? (
                                                      <>
                                                        MR{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MSTR{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                              </td>
                                              <td>{ticket?.gender}</td>
                                              <td>
                                                {ticket?.pType === "ADT" ? (
                                                  <>Adult</>
                                                ) : ticket?.pType === "CNN" ? (
                                                  <>Child</>
                                                ) : (
                                                  <>Infant</>
                                                )}
                                              </td>
                                              <td>{ticket?.ticketno}</td>
                                            </tr>
                                          ))}
                                        </table>
                                        <Grid
                                          container
                                          justifyContent={"space-between"}
                                          alignItems="center"
                                        >
                                          <Grid item mt={2}>
                                            <Box>
                                              <label htmlFor="date">
                                                Select Date
                                              </label>{" "}
                                              <br />
                                              <input
                                                style={{
                                                  border: "2px solid #C4C4C4",
                                                  padding: "5px",
                                                  fontSize: "14px",
                                                  cursor: "pointer",
                                                }}
                                                required
                                                type="text"
                                                name="date"
                                                readOnly
                                                value={format(
                                                  new Date(date),
                                                  "dd MMM yyyy"
                                                )}
                                                onClick={() => {
                                                  setOpenDate((prev) => !prev);
                                                }}
                                              />
                                              {openDate && (
                                                <Calendar
                                                  color={"#dc143c"}
                                                  date={new Date(date)}
                                                  onChange={(date) => {
                                                    setDate(
                                                      new Date(
                                                        date
                                                      ).toLocaleDateString("sv")
                                                    );
                                                    setOpenDate(false);
                                                  }}
                                                  minDate={new Date(date)}
                                                  months={1}
                                                  direction="horizontal"
                                                  className="new-dashboard-calendar"
                                                  name="dashboard-calendar"
                                                />
                                              )}
                                            </Box>
                                          </Grid>
                                          <Grid item mt={4}>
                                            <>
                                              <button
                                                style={{
                                                  padding: "6px 20px",
                                                  marginRight: "20px",
                                                  color: "#fff",
                                                  backgroundColor: "#003566",
                                                  border: "none",
                                                  cursor: "pointer",
                                                }}
                                                disabled={!checkBox === true}
                                                onClick={handleReissue}
                                              >
                                                Submit
                                              </button>
                                              <button
                                                style={{
                                                  padding: "6px 20px",
                                                  color: "#fff",
                                                  backgroundColor: "crimson",
                                                  border: "none",
                                                  cursor: "pointer",
                                                }}
                                                type="reset"
                                                onClick={() =>
                                                  setOpenModalReIssue(false)
                                                }
                                              >
                                                Cancel
                                              </button>
                                            </>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </Box>
                                    {/* </from> */}
                                  </Modal>
                                </Box>

                                {sabreBookData?.fareRules === undefined ? (
                                  <></>
                                ) : (
                                  <>
                                    {sabreBookData?.fareRules[0]
                                      ?.isRefundable === true ? (
                                      <Box className="queues-detail-calcel-btn">
                                        <button
                                          style={{
                                            backgroundColor: "#003566",
                                            color: "#fff",
                                            border: "none",
                                          }}
                                          onClick={() =>
                                            setOpenModalRefund(true)
                                          }
                                        >
                                          Refund
                                        </button>
                                        <Modal
                                          open={openModalRefund}
                                          onClose={() =>
                                            setOpenModalRefund(false)
                                          }
                                          className="custom-modal-r modal-table-0"
                                        >
                                          <Box
                                            className="modalStyler"
                                            bgcolor="#fff"
                                            p="25px"
                                          >
                                            <Box className="modal-table">
                                              <Typography
                                                sx={{
                                                  color: "#033566",
                                                  fontSize: "20px",
                                                  fontWeight: "bold",
                                                  mb: "10px",
                                                }}
                                              >
                                                Refund
                                              </Typography>
                                              <table>
                                                <tr>
                                                  <th width="5%">Select</th>
                                                  <th width="35%">
                                                    Passenger Name
                                                  </th>
                                                  <th width="20%">Gender</th>
                                                  <th width="20%">
                                                    Passenger Type
                                                  </th>
                                                  <th width="30%">Ticket No</th>
                                                </tr>
                                                {invoiceId.map(
                                                  (ticket, index) => (
                                                    <tr key={index}>
                                                      <td
                                                        width="10px"
                                                        style={{
                                                          border: "none",
                                                        }}
                                                      >
                                                        <FormGroup
                                                          style={{
                                                            padding: "0px",
                                                            margin: "0px",
                                                          }}
                                                        >
                                                          <FormControlLabel
                                                            control={
                                                              <Checkbox
                                                                style={{
                                                                  padding:
                                                                    "0px",
                                                                  margin:
                                                                    "auto",
                                                                  marginLeft:
                                                                    "20px",
                                                                }}
                                                                onChange={() =>
                                                                  handleCheckBox(
                                                                    index
                                                                  )
                                                                }
                                                              />
                                                            }
                                                          />
                                                        </FormGroup>
                                                      </td>
                                                      <td>
                                                        {ticket?.gender ===
                                                        "Female" ? (
                                                          <>
                                                            {ticket?.gender ===
                                                              "Female" &&
                                                            ticket?.pType ===
                                                              "ADT" ? (
                                                              <>
                                                                MRS{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            ) : (
                                                              <>
                                                                MISS{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            )}
                                                          </>
                                                        ) : (
                                                          <>
                                                            {ticket?.gender ===
                                                              "Male" &&
                                                            ticket?.pType ===
                                                              "ADT" ? (
                                                              <>
                                                                MR{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            ) : (
                                                              <>
                                                                MSTR{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            )}
                                                          </>
                                                        )}
                                                      </td>
                                                      <td>{ticket?.gender}</td>
                                                      <td>
                                                        {ticket?.pType ===
                                                        "ADT" ? (
                                                          <>Adult</>
                                                        ) : ticket?.pType ===
                                                          "CNN" ? (
                                                          <>Child</>
                                                        ) : (
                                                          <>Infant</>
                                                        )}
                                                      </td>
                                                      <td>
                                                        {ticket?.ticketno}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </table>
                                              <Grid
                                                container
                                                justifyContent={"space-between"}
                                                alignItems="center"
                                              >
                                                <Grid item mt={2}></Grid>
                                                <Grid item mt={4}>
                                                  <>
                                                    <button
                                                      style={{
                                                        padding: "6px 20px",
                                                        marginRight: "20px",
                                                        color: "#fff",
                                                        backgroundColor:
                                                          "#003566",
                                                        border: "none",
                                                        cursor: "pointer",
                                                      }}
                                                      disabled={
                                                        !checkBox === true
                                                      }
                                                      onClick={handleRefund}
                                                    >
                                                      Submit
                                                    </button>
                                                    <button
                                                      style={{
                                                        padding: "6px 20px",
                                                        color: "#fff",
                                                        backgroundColor:
                                                          "crimson",
                                                        border: "none",
                                                        cursor: "pointer",
                                                      }}
                                                      type="reset"
                                                      onClick={() =>
                                                        setOpenModalRefund(
                                                          false
                                                        )
                                                      }
                                                    >
                                                      Cancel
                                                    </button>
                                                  </>
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          </Box>
                                          {/* </from> */}
                                        </Modal>
                                      </Box>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                                {fareCost[0]?.status === "Ticketed" &&
                                todaydate <= voideDate ? (
                                  <Box className="queues-detail-calcel-btn">
                                    <button
                                      style={{
                                        backgroundColor: "#003566",
                                        color: "#fff",
                                        border: "none",
                                      }}
                                      onClick={() => setOpenModalVoid(true)}
                                    >
                                      Void
                                    </button>
                                    <Modal
                                      open={openModalVoid}
                                      onClose={() => setOpenModalVoid(false)}
                                      className="custom-modal-r modal-table-0"
                                    >
                                      <Box
                                        className="modalStyler"
                                        bgcolor="#fff"
                                        p="25px"
                                      >
                                        <Box className="modal-table">
                                          <Typography
                                            sx={{
                                              color: "#033566",
                                              fontSize: "20px",
                                              fontWeight: "bold",
                                              mb: "10px",
                                            }}
                                          >
                                            Void
                                          </Typography>
                                          <table>
                                            <tr>
                                              <th width="5%">Select</th>
                                              <th width="35%">
                                                Passenger Name
                                              </th>
                                              <th width="20%">Gender</th>
                                              <th width="20%">
                                                Passenger Type
                                              </th>
                                              <th width="30%">Ticket No</th>
                                            </tr>
                                            {invoiceId.map((ticket, index) => (
                                              <tr key={index}>
                                                <td
                                                  width="10px"
                                                  style={{ border: "none" }}
                                                >
                                                  <FormGroup
                                                    style={{
                                                      padding: "0px",
                                                      margin: "0px",
                                                    }}
                                                  >
                                                    <FormControlLabel
                                                      control={
                                                        <Checkbox
                                                          style={{
                                                            padding: "0px",
                                                            margin: "auto",
                                                            marginLeft: "20px",
                                                          }}
                                                          onChange={() =>
                                                            handleCheckBox(
                                                              index
                                                            )
                                                          }
                                                        />
                                                      }
                                                    />
                                                  </FormGroup>
                                                </td>
                                                <td>
                                                  {ticket?.gender ===
                                                  "Female" ? (
                                                    <>
                                                      {ticket?.gender ===
                                                        "Female" &&
                                                      ticket?.pType ===
                                                        "ADT" ? (
                                                        <>
                                                          MRS{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      ) : (
                                                        <>
                                                          MISS{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <>
                                                      {ticket?.gender ===
                                                        "Male" &&
                                                      ticket?.pType ===
                                                        "ADT" ? (
                                                        <>
                                                          MR{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      ) : (
                                                        <>
                                                          MSTR{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                </td>
                                                <td>{ticket?.gender}</td>
                                                <td>
                                                  {ticket?.pType === "ADT" ? (
                                                    <>Adult</>
                                                  ) : ticket?.pType ===
                                                    "CNN" ? (
                                                    <>Child</>
                                                  ) : (
                                                    <>Infant</>
                                                  )}
                                                </td>
                                                <td>{ticket?.ticketno}</td>
                                              </tr>
                                            ))}
                                          </table>
                                          <Grid
                                            container
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                          >
                                            <Grid item mt={2}></Grid>
                                            <Grid item mt={4}>
                                              <>
                                                <button
                                                  style={{
                                                    padding: "6px 20px",
                                                    marginRight: "20px",
                                                    color: "#fff",
                                                    backgroundColor: "#003566",
                                                    border: "none",
                                                    cursor: "pointer",
                                                  }}
                                                  disabled={!checkBox === true}
                                                  onClick={handleVoid}
                                                >
                                                  Submit
                                                </button>
                                                <button
                                                  style={{
                                                    padding: "6px 20px",
                                                    color: "#fff",
                                                    backgroundColor: "crimson",
                                                    border: "none",
                                                    cursor: "pointer",
                                                  }}
                                                  type="reset"
                                                  onClick={() =>
                                                    setOpenModalVoid(false)
                                                  }
                                                >
                                                  Cancel
                                                </button>
                                              </>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      </Box>
                                      {/* </from> */}
                                    </Modal>
                                  </Box>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : fareCost[0]?.status ===
                              "Issue In Processing" ? (
                              <>
                                <Box className="queues-detail-wait-btn">
                                  <button>Wait For Ticketed</button>
                                </Box>
                              </>
                            ) : fareCost[0]?.status ===
                              "Refund In Processing" ? (
                              <Box className="queues-detail-wait-btn">
                                <button>Wait For Refunded</button>
                              </Box>
                            ) : fareCost[0]?.status ===
                              "Reissue In Processing" ? (
                              <Box className="queues-detail-wait-btn">
                                <button>Wait For Reissued</button>
                              </Box>
                            ) : fareCost[0]?.status === "Void In Processing" ? (
                              <Box className="queues-detail-wait-btn">
                                <button>Wait For Voided</button>
                              </Box>
                            ) : (
                              <>
                                {/* //todo: sabre issue ticket update document section */}
                                {fareCost[0]?.status === "Hold" &&
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
                                          onClick={() => {
                                            if (
                                              passengerData[0]?.passportCopy ===
                                                "" &&
                                              passengerData[0]?.visaCopy ===
                                                "" &&
                                              triptype === "Outbound"
                                            ) {
                                              handleOpenUpdateModal();
                                            } else if (
                                              passengerData[0]?.passportCopy !==
                                                "" &&
                                              passengerData[0]?.visaCopy !==
                                                "" &&
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
                                      ) : (
                                        <CircularProgress />
                                      )}
                                    </Box>
                                  </>
                                ) : fareCost[0]?.status === "Hold" &&
                                  checkIssueBalance >=
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
                                          onClick={handleIssueTicket}
                                        >
                                          Issue Ticket
                                        </button>
                                      ) : (
                                        <CircularProgress />
                                      )}
                                    </Box>
                                  </>
                                ) : fareCost[0]?.status === "Hold" &&
                                  parseInt(balance[0]?.lastAmount) >=
                                    parseInt(fareCost[0]?.netCost) &&
                                  sabreBookData?.fareRules[0]?.isRefundable ===
                                    true ? (
                                  <>
                                    <Box className="queues-detail-calcel-btn">
                                      {!issueLoading ? (
                                        <button
                                          style={{
                                            backgroundColor: "#003566",
                                            color: "#fff",
                                            border: "none",
                                          }}
                                          onClick={handleIssueTicket}
                                        >
                                          Issue Ticket
                                        </button>
                                      ) : (
                                        <CircularProgress />
                                      )}
                                    </Box>
                                  </>
                                ) : fareCost[0]?.status === "Hold" &&
                                  parseInt(balance[0]?.lastAmount) +
                                    parseInt(balance[0]?.credit) <=
                                    parseInt(fareCost[0]?.netCost) ? (
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
                                  </Box>
                                ) : (
                                  ""
                                )}
                                {fareCost[0]?.status === "Hold" && (
                                  <Box className="queues-detail-calcel-btn">
                                    <button
                                      onClick={() => cancelBooking(gds, pnr)}
                                    >
                                      Cancel Flight
                                    </button>
                                  </Box>
                                )}
                              </>
                            )}
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
          ) : gds === "FlyHub" ||
            location?.state?.bookingInfo?.system === "FlyHub" ? (
            <Container className="queues-detail-parent" maxWidth="xxl">
              {Object.keys(flyhubBookData).length !== 0 ? (
                <Box pb={4}>
                  <Grid container spacing={2}>
                    {flyhubBookData?.BookingID === null ? (
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
                        <Grid item md={9.5}>
                          <Box className="queues-detail">
                            <Grid container justifyContent={"space-between"}>
                              <Grid item mt={4} mb={2} md={6}>
                                <h2>Reference ID: {bookingId}</h2>
                              </Grid>
                              <Grid item mt={4} mb={2} md={6} textAlign="end">
                                <button>
                                  {fareCost[0]?.status || "Loading ..."}
                                </button>
                              </Grid>
                            </Grid>
                            <Grid
                              display={"flex"}
                              justifyContent="space-between"
                              alignItems={"center"}
                              container
                            >
                              {/* <Grid item>
                                {status === "Ticketed" ? (
                                  <h5>
                                    Airlines PNR:{" "}
                                    <span>
                                      {
                                        flyhubBookData?.Results[0]?.segments[0]
                                          ?.AirlinePNR
                                      }
                                    </span>
                                  </h5>
                                ) : (
                                  <></>
                                )}
                              </Grid> */}
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
                                        marginBottom: "10px",
                                      }}
                                    >
                                      Destination:
                                    </h5>

                                    <h5>Booked By: </h5>
                                    <h5>Booked At: </h5>
                                    {fareCost[0]?.status === "Hold" ? (
                                      <h5>Time Limit: </h5>
                                    ) : (
                                      ""
                                    )}
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
                                      {deptFrom} - {arriveTo}
                                      {tripType === "return" ? (
                                        <>
                                          - {deptFrom}
                                          {/* {fromCountryName?.split(",")[0] ||
                                        deptFrom}{" "}
                                      -{" "}
                                      {toCountryName?.split(",")[0] || arriveTo}
                                      {tripType === "return" ? (
                                        <>
                                          -{" "}
                                          {fromCountryName?.split(",")[0] ||
                                            deptFrom} */}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </h5>

                                    <h5>{fareCost[0]?.bookedBy || "Agent"}</h5>
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
                                    {fareCost[0]?.status === "Hold" ? (
                                      <>
                                        {fareCost[0]?.timeLimit ? (
                                          fareCost[0]?.timeLimit ? (
                                            format(
                                              new Date(
                                                fareCost[0]?.timeLimit.toString()
                                              ),
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
                                {flyhubBookData?.Results[0]?.IsRefundable ===
                                undefined ? (
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
                                    {flyhubBookData?.Results[0]
                                      ?.IsRefundable === true ? (
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
                                  </>
                                )}
                                {/* <Box
                                  display={"flex"}
                                  gap={{ lg: "20px", xs: "48px" }}
                                >
                                  {fareCost[0]?.status === "Hold" ? (
                                    <></>
                                  ) : fareCost[0]?.status ===
                                    "Issue In Processing" ? (
                                    <>
                                      <Box>
                                        <h5>Issue Requested By: </h5>
                                        <h5>Issue Requested At: </h5>
                                      </Box>

                                      <Box>
                                        <h5>
                                          {fareCost[0]?.issueRequestBy ||
                                            "Issue Requested"}
                                        </h5>
                                        <h5>
                                          {fareCost[0]?.issueRequestAt
                                            ? format(
                                                new Date(
                                                  fareCost[0]?.issueRequestAt?.toString()
                                                ),
                                                "dd MMM yyyy hh:mm a"
                                              )
                                            : "Issue Time"}
                                        </h5>
                                      </Box>
                                    </>
                                  ) : (
                                    <>
                                      {fareCost[0]?.ticketBy ? (
                                        <>
                                          {" "}
                                          <Box>
                                            <h5>Ticketed By: </h5>
                                            <h5>Ticketed At: </h5>
                                          </Box>
                                          <Box>
                                            <h5>
                                              {fareCost[0]?.ticketBy ||
                                                "Ticketed By"}
                                            </h5>
                                            <h5>
                                              {fareCost[0]?.ticketedAt
                                                ? format(
                                                    new Date(
                                                      fareCost[0]?.ticketedAt?.toString()
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
                                </Box> */}
                              </Grid>
                            </Grid>
                          </Box>

                          {/* ------------- FLight Information ---------------------------- */}

                          <Box mt={2} className="flight-queue-detail-fareInfo">
                            <span>Flight Information </span>

                            <Box mt={2}>
                              {/* <Typography mb={1}>Departure Flight</Typography> */}

                              <table width="100%">
                                <tr>
                                  <th width="12%">Flight</th>
                                  <th width="20%">Departure From</th>
                                  <th width="20%">Arrival To</th>
                                  <th width="16%">Depart At</th>
                                  <th width="16%">Arrive At</th>
                                  <th width="20%">Info</th>
                                </tr>
                                {/* --------Segments 0-------- */}
                                <tr>
                                  {flyhubBookData?.Results[0]?.segments[0] &&
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
                                            ?.segments[0]?.Airline?.AirlineName
                                        }
                                        {" | "}
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[0]?.Airline?.AirlineCode
                                        }
                                        &nbsp;
                                        {(flyhubBookData?.Results[0]
                                          ?.segments[0]?.Airline?.FlightNumber)
                                          .length > 4 ? (
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
                                  {flyhubBookData?.Results[0]?.segments[0] &&
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
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.Origin?.Airport?.Terminal === "" ? (
                                          <></>
                                        ) : (
                                          <>
                                            Terminal:{" "}
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[0]?.Origin?.Airport
                                                ?.Terminal
                                            }
                                          </>
                                        )}
                                      </td>
                                    )}
                                  {flyhubBookData?.Results[0]?.segments[0] &&
                                    flyhubBookData.Results[0]?.segments[0]
                                      ?.TripIndicator === "OutBound" && (
                                      <td>
                                        {/* To  */}(
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[0]?.Destination?.Airport
                                            ?.AirportCode
                                        }
                                        )-
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[0]?.Destination?.Airport
                                            ?.CityName
                                        }
                                        -
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[0]?.Destination?.Airport
                                            ?.AirportName
                                        }
                                        <br />
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.Destination?.Airport?.Terminal ===
                                        "" ? (
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
                                  {flyhubBookData?.Results[0]?.segments[0] &&
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
                                  {flyhubBookData?.Results[0]?.segments[0] &&
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
                                  {flyhubBookData?.Results[0]?.segments[0] &&
                                    flyhubBookData.Results[0]?.segments[0]
                                      ?.TripIndicator === "OutBound" && (
                                      <td>
                                        Cabin: 7Kg <br />
                                        Class:{" "}
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.Airline?.BookingClass || "Economy"}
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
                                            ?.segments[0]?.JourneyDuration / 60
                                        )}
                                        h&nbsp;
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.JourneyDuration -
                                          Math.floor(
                                            flyhubBookData?.Results[0]
                                              ?.segments[0]?.JourneyDuration /
                                              60
                                          ) *
                                            60}
                                        m
                                      </td>
                                    )}
                                </tr>
                                {/* ---------segments 0 End-------- */}

                                {/* ---------segments 1 End-------- */}
                                <tr>
                                  {flyhubBookData?.Results[0]?.segments[1] &&
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
                                            ?.segments[1]?.Airline?.AirlineName
                                        }
                                        {" | "}
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[1]?.Airline?.AirlineCode
                                        }
                                        &nbsp;
                                        {(flyhubBookData?.Results[0]
                                          ?.segments[1]?.Airline?.FlightNumber)
                                          .length > 4 ? (
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
                                  {flyhubBookData?.Results[0]?.segments[1] &&
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
                                        {flyhubBookData?.Results[0]?.segments[1]
                                          ?.Origin?.Airport?.Terminal === "" ? (
                                          <></>
                                        ) : (
                                          <>
                                            Terminal:{" "}
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[1]?.Origin?.Airport
                                                ?.Terminal
                                            }
                                          </>
                                        )}
                                      </td>
                                    )}
                                  {flyhubBookData?.Results[0]?.segments[1] &&
                                    flyhubBookData.Results[0]?.segments[1]
                                      ?.TripIndicator === "OutBound" && (
                                      <td>
                                        {/* To  */}(
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[1]?.Destination?.Airport
                                            ?.AirportCode
                                        }
                                        )-
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[1]?.Destination?.Airport
                                            ?.CityName
                                        }
                                        -
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[1]?.Destination?.Airport
                                            ?.AirportName
                                        }
                                        <br />
                                        {flyhubBookData?.Results[0]?.segments[1]
                                          ?.Destination?.Airport?.Terminal ===
                                        "" ? (
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
                                        Cabin: 7Kg <br />
                                        Class:{" "}
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.Airline?.BookingClass || "Economy"}
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
                                            ?.segments[1]?.JourneyDuration / 60
                                        )}
                                        h&nbsp;
                                        {flyhubBookData?.Results[0]?.segments[1]
                                          ?.JourneyDuration -
                                          Math.floor(
                                            flyhubBookData?.Results[0]
                                              ?.segments[1]?.JourneyDuration /
                                              60
                                          ) *
                                            60}
                                        m
                                      </td>
                                    )}
                                </tr>
                                {/* ---------segments 1 End-------- */}

                                {/* ---------segments 2 End-------- */}
                                <tr>
                                  {flyhubBookData?.Results[0]?.segments[2] &&
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
                                            ?.segments[2]?.Airline?.AirlineName
                                        }
                                        {" | "}
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[2]?.Airline?.AirlineCode
                                        }
                                        &nbsp;
                                        {(flyhubBookData?.Results[0]
                                          ?.segments[2]?.Airline?.FlightNumber)
                                          .length > 4 ? (
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
                                  {flyhubBookData?.Results[0]?.segments[2] &&
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
                                        {flyhubBookData?.Results[0]?.segments[2]
                                          ?.Origin?.Airport?.Terminal === "" ? (
                                          <></>
                                        ) : (
                                          <>
                                            Terminal:{" "}
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[2]?.Origin?.Airport
                                                ?.Terminal
                                            }
                                          </>
                                        )}
                                      </td>
                                    )}
                                  {flyhubBookData?.Results[0]?.segments[2] &&
                                    flyhubBookData.Results[0]?.segments[2]
                                      ?.TripIndicator === "OutBound" && (
                                      <td>
                                        {/* To  */}(
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[2]?.Destination?.Airport
                                            ?.AirportCode
                                        }
                                        )-
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[2]?.Destination?.Airport
                                            ?.CityName
                                        }
                                        -
                                        {
                                          flyhubBookData?.Results[0]
                                            ?.segments[2]?.Destination?.Airport
                                            ?.AirportName
                                        }
                                        <br />
                                        {flyhubBookData?.Results[0]?.segments[2]
                                          ?.Destination?.Airport?.Terminal ===
                                        "" ? (
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
                                        Cabin: 7Kg <br />
                                        Class:{" "}
                                        {flyhubBookData?.Results[0]?.segments[0]
                                          ?.Airline?.BookingClass || "Economy"}
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
                                            ?.segments[2]?.JourneyDuration / 60
                                        )}
                                        h&nbsp;
                                        {flyhubBookData?.Results[0]?.segments[2]
                                          ?.JourneyDuration -
                                          Math.floor(
                                            flyhubBookData?.Results[0]
                                              ?.segments[2]?.JourneyDuration /
                                              60
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
                                        flyhubBookData.Results[0]?.segments[1]
                                          ?.TripIndicator === "InBound" && (
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
                                          ?.TripIndicator === "InBound" && (
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
                                          ?.TripIndicator === "InBound" && (
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[1] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[1] &&
                                        flyhubBookData.Results[0]?.segments[1]
                                          ?.TripIndicator === "InBound" && (
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
                                                ?.segments[1]?.JourneyDuration /
                                                60
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
                                          ?.TripIndicator === "InBound" && (
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
                                          ?.TripIndicator === "InBound" && (
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
                                          ?.TripIndicator === "InBound" && (
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[2] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[2] &&
                                        flyhubBookData.Results[0]?.segments[2]
                                          ?.TripIndicator === "InBound" && (
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
                                                ?.segments[2]?.JourneyDuration /
                                                60
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
                                    {/* ---------segments 2 End-------- */}

                                    {/* ---------segments 3 End-------- */}
                                    <tr>
                                      {flyhubBookData?.Results[0]
                                        ?.segments[3] &&
                                        flyhubBookData.Results[0]?.segments[3]
                                          ?.TripIndicator === "InBound" && (
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
                                              ?.FlightNumber).length > 4 ? (
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
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[3]?.Airline
                                                    ?.FlightNumber
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[3] &&
                                        flyhubBookData.Results[0]?.segments[3]
                                          ?.TripIndicator === "InBound" && (
                                          <td>
                                            {/* from */}(
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[3]?.Origin?.Airport
                                                ?.AirportCode
                                            }
                                            )-
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[3]?.Origin?.Airport
                                                ?.CityName
                                            }
                                            -
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[3]?.Origin?.Airport
                                                ?.AirportName
                                            }
                                            <br />
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3]?.Origin?.Airport
                                              ?.Terminal === "" ? (
                                              <></>
                                            ) : (
                                              <>
                                                Terminal:{" "}
                                                {
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[3]?.Origin
                                                    ?.Airport?.Terminal
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[3] &&
                                        flyhubBookData.Results[0]?.segments[3]
                                          ?.TripIndicator === "InBound" && (
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
                                              ?.Airport?.Terminal === "" ? (
                                              <></>
                                            ) : (
                                              <>
                                                Terminal:{" "}
                                                {
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[3]?.Destination
                                                    ?.Airport?.Terminal
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[3] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[3] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[3] &&
                                        flyhubBookData.Results[0]?.segments[3]
                                          ?.TripIndicator === "InBound" && (
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
                                                ?.segments[3]?.JourneyDuration /
                                                60
                                            )}
                                            h&nbsp;
                                            {flyhubBookData?.Results[0]
                                              ?.segments[3]?.JourneyDuration -
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
                                        flyhubBookData.Results[0]?.segments[4]
                                          ?.TripIndicator === "InBound" && (
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
                                              ?.FlightNumber).length > 4 ? (
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
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[4]?.Airline
                                                    ?.FlightNumber
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[4] &&
                                        flyhubBookData.Results[0]?.segments[4]
                                          ?.TripIndicator === "InBound" && (
                                          <td>
                                            {/* from */}(
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[4]?.Origin?.Airport
                                                ?.AirportCode
                                            }
                                            )-
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[4]?.Origin?.Airport
                                                ?.CityName
                                            }
                                            -
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[4]?.Origin?.Airport
                                                ?.AirportName
                                            }
                                            <br />
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4]?.Origin?.Airport
                                              ?.Terminal === "" ? (
                                              <></>
                                            ) : (
                                              <>
                                                Terminal:{" "}
                                                {
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[4]?.Origin
                                                    ?.Airport?.Terminal
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[4] &&
                                        flyhubBookData.Results[0]?.segments[4]
                                          ?.TripIndicator === "InBound" && (
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
                                              ?.Airport?.Terminal === "" ? (
                                              <></>
                                            ) : (
                                              <>
                                                Terminal:{" "}
                                                {
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[4]?.Destination
                                                    ?.Airport?.Terminal
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[4] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[4] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[4] &&
                                        flyhubBookData.Results[0]?.segments[4]
                                          ?.TripIndicator === "InBound" && (
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
                                                ?.segments[4]?.JourneyDuration /
                                                60
                                            )}
                                            h&nbsp;
                                            {flyhubBookData?.Results[0]
                                              ?.segments[4]?.JourneyDuration -
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
                                        flyhubBookData.Results[0]?.segments[5]
                                          ?.TripIndicator === "InBound" && (
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
                                              ?.FlightNumber).length > 4 ? (
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
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[5]?.Airline
                                                    ?.FlightNumber
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[5] &&
                                        flyhubBookData.Results[0]?.segments[5]
                                          ?.TripIndicator === "InBound" && (
                                          <td>
                                            {/* from */}(
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[5]?.Origin?.Airport
                                                ?.AirportCode
                                            }
                                            )-
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[5]?.Origin?.Airport
                                                ?.CityName
                                            }
                                            -
                                            {
                                              flyhubBookData?.Results[0]
                                                ?.segments[5]?.Origin?.Airport
                                                ?.AirportName
                                            }
                                            <br />
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5]?.Origin?.Airport
                                              ?.Terminal === "" ? (
                                              <></>
                                            ) : (
                                              <>
                                                Terminal:{" "}
                                                {
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[5]?.Origin
                                                    ?.Airport?.Terminal
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[5] &&
                                        flyhubBookData.Results[0]?.segments[5]
                                          ?.TripIndicator === "InBound" && (
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
                                              ?.Airport?.Terminal === "" ? (
                                              <></>
                                            ) : (
                                              <>
                                                Terminal:{" "}
                                                {
                                                  flyhubBookData?.Results[0]
                                                    ?.segments[5]?.Destination
                                                    ?.Airport?.Terminal
                                                }
                                              </>
                                            )}
                                          </td>
                                        )}
                                      {flyhubBookData?.Results[0]
                                        ?.segments[5] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[5] &&
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
                                      {flyhubBookData?.Results[0]
                                        ?.segments[5] &&
                                        flyhubBookData.Results[0]?.segments[5]
                                          ?.TripIndicator === "InBound" && (
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
                                                ?.segments[5]?.JourneyDuration /
                                                60
                                            )}
                                            h&nbsp;
                                            {flyhubBookData?.Results[0]
                                              ?.segments[5]?.JourneyDuration -
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

                          <Box mt={2} className="flight-queue-detail-fareInfo">
                            <span>Fare Details</span>
                            {Object.keys(fareCost).length === 0 ? (
                              <>Loading...</>
                            ) : (
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
                                          {commaNumber(infantTotalPrice)} BDT
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
                            )}
                          </Box>

                          {/* --------------------- passenger details accordion ------------------- */}

                          <Box mt={5} className="queue-detail-passenger-detail">
                            <Box my={2}>
                              <span>Passenger Details</span>
                            </Box>

                            {/* <div>
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
                                              {traveler?.gender === "Male" &&
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
                                              {traveler?.gender === "Female" &&
                                              traveler?.type === "ADT" ? (
                                                <>
                                                  MRS {traveler?.fName}{" "}
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

                                        {fareCost[0]?.journeyType ===
                                          "Outbound" &&
                                        fareCost[0]?.status !== "Hold" ? (
                                          <Box display={"flex"}>
                                            <a
                                              style={{
                                                color: "#003566",
                                                fontWeight: "500",
                                                fontSize: "12px",
                                                textDecoration: "none",
                                                marginRight: "10px",
                                              }}
                                              href={
                                                traveler?.passportCopy || ""
                                              }
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              Passport Copy
                                            </a>

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
                                              Visa Copy
                                            </a>
                                          </Box>
                                        ) : (
                                          ""
                                        )}
                                      </Box>

                                      <Box
                                        border="1px solid #DEDEDE"
                                        p="3px"
                                        mb={2}
                                      >
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
                                              {fareCost[0]?.journeyType ===
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
                                              {fareCost[0]?.journeyType ===
                                              "Outbound"
                                                ? traveler?.passEx ||
                                                  traveler?.passEx
                                                  ? format(
                                                      new Date(
                                                        traveler?.passEx ||
                                                          traveler?.passEx
                                                      ),
                                                      "dd MMM yyyy"
                                                    )
                                                  : "Passport Expire Date"
                                                : "Domestic Flight"}
                                            </h6>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </>
                                  ))}
                                </>
                              )}
                            </div> */}
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
                                              {traveler?.gender === "Male" &&
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
                                              {traveler?.gender === "Female" &&
                                              traveler?.type === "ADT" ? (
                                                <>
                                                  MRS {traveler?.fName}{" "}
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
                                              {traveler?.gender === "Male" ? (
                                                <>
                                                  {traveler?.gender ===
                                                    "Male" &&
                                                  traveler?.type === "ADT" ? (
                                                    <>MR</>
                                                  ) : (
                                                    <>MSTR</>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  {traveler?.gender ===
                                                    "Female" &&
                                                  traveler?.type === "ADT" ? (
                                                    <>MRS</>
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
                                              {fareCost[0]?.journeyType ===
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
                                              {fareCost[0]?.journeyType ===
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
                                          {fareCost[0]?.journeyType ===
                                            "Outbound" &&
                                          fareCost[0]?.status !== "Hold" ? (
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
                                                    href={
                                                      traveler?.passportCopy ||
                                                      ""
                                                    }
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
                                                    href={
                                                      traveler?.visaCopy || ""
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {" "}
                                                    View
                                                  </a>
                                                </h6>
                                              </Grid>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                      </Box>
                                    </>
                                  ))}
                                </>
                              )}
                            </div>
                          </Box>
                        </Grid>

                        <Grid item sm={12} md={2.5}>
                          <Box mt={5}>
                            <div>
                              <Accordion
                                expanded={downExpanded === "panel1"}
                                onChange={handleChangeDown("panel1")}
                                style={{
                                  boxShadow:
                                    "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
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
                                  {fareCost[0]?.activity?.map((data) => (
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
                                            {data?.status === "Ticketed" ||
                                            data?.status === "Refunded" ||
                                            data?.status === "Reissued" ||
                                            data?.status === "Voided" ||
                                            data?.status ===
                                              "Issue Rejected" ? (
                                              <>Fly Far International</>
                                            ) : (
                                              <>
                                                {data?.actionBy},{" "}
                                                {userData[0]?.company}
                                              </>
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
                                                  new Date(
                                                    data?.actionAt?.toString()
                                                  ),
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
                                            {data?.remarks === "" ||
                                            data?.remarks === " " ? (
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
                              <Accordion
                                expanded={downExpanded === "panel8"}
                                onChange={handleChangeDown("panel8")}
                                style={{
                                  boxShadow:
                                    "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
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
                                      fontFamily: "poppies",
                                      fontWeight: "500",
                                      fontSize: "15px",
                                    }}
                                  >
                                    Download / PDF
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {fareCost[0]?.status === "Ticketed" ? (
                                    <>
                                      {/* <ClientInvoiceF allData={allData} /> */}
                                      {/* <AgentInvoiceF allData={allData} /> */}
                                      {/* <ClientTicketWithPriceF
                                        allData={allData}
                                      /> */}
                                      {/* <EticketWithoutPriceF allData={allData} /> */}
                                    </>
                                  ) : (
                                    <>
                                      {/* <BookingConfirWithPriceF
                                        allData={allData}
                                      />
                                      <BookingConfirWithoutPriceF
                                        allData={allData}
                                      /> */}
                                    </>
                                  )}
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
                                      No automatic fare rules available, Please
                                      mail us for fare rules.
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
                                      No automatic fare rules available, Please
                                      mail us for fare rules.
                                    </>
                                  )}
                                </AccordionDetails>
                              </Accordion>
                            </div>

                            {fareCost[0]?.status === "Ticketed" ? (
                              <>
                                <Box className="queues-detail-calcel-btn">
                                  <button
                                    style={{
                                      backgroundColor: "#003566",
                                      color: "#fff",
                                      border: "none",
                                    }}
                                    onClick={() => setOpenModalReIssue(true)}
                                  >
                                    Re-Issue
                                  </button>
                                  <Modal
                                    open={openModalReIssue}
                                    onClose={() => setOpenModalReIssue(false)}
                                    className="custom-modal-r modal-table-0"
                                  >
                                    <Box
                                      className="modalStyler"
                                      bgcolor="#fff"
                                      p="25px"
                                    >
                                      <Box className="modal-table">
                                        <Typography
                                          sx={{
                                            color: "#033566",
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            mb: "10px",
                                          }}
                                        >
                                          Re-Issue
                                        </Typography>
                                        <table>
                                          <tr>
                                            <th width="5%">Select</th>
                                            <th width="35%">Passenger Name</th>
                                            <th width="20%">Gender</th>
                                            <th width="20%">Passenger Type</th>
                                            <th width="30%">Ticket No</th>
                                          </tr>
                                          {invoiceId.map((ticket, index) => (
                                            <tr key={index}>
                                              <td
                                                width="10px"
                                                style={{ border: "none" }}
                                              >
                                                <FormGroup
                                                  style={{
                                                    padding: "0px",
                                                    margin: "0px",
                                                  }}
                                                >
                                                  <FormControlLabel
                                                    control={
                                                      <Checkbox
                                                        style={{
                                                          padding: "0px",
                                                          margin: "auto",
                                                          marginLeft: "20px",
                                                        }}
                                                        onChange={() =>
                                                          handleCheckBox(index)
                                                        }
                                                      />
                                                    }
                                                  />
                                                </FormGroup>
                                              </td>
                                              <td>
                                                {ticket?.gender === "Female" ? (
                                                  <>
                                                    {ticket?.gender ===
                                                      "Female" &&
                                                    ticket?.pType === "ADT" ? (
                                                      <>
                                                        MRS{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MISS{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    )}
                                                  </>
                                                ) : (
                                                  <>
                                                    {ticket?.gender ===
                                                      "Male" &&
                                                    ticket?.pType === "ADT" ? (
                                                      <>
                                                        MR{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    ) : (
                                                      <>
                                                        MSTR{" "}
                                                        {ticket?.passengerName}
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                              </td>
                                              <td>{ticket?.gender}</td>
                                              <td>
                                                {ticket?.pType === "ADT" ? (
                                                  <>Adult</>
                                                ) : ticket?.pType === "CNN" ? (
                                                  <>Child</>
                                                ) : (
                                                  <>Infant</>
                                                )}
                                              </td>
                                              <td>{ticket?.ticketno}</td>
                                            </tr>
                                          ))}
                                        </table>
                                        <Grid
                                          container
                                          justifyContent={"space-between"}
                                          alignItems="center"
                                        >
                                          <Grid item mt={2}>
                                            <Box>
                                              <label htmlFor="date">
                                                Select Date
                                              </label>{" "}
                                              <br />
                                              <input
                                                style={{
                                                  border: "2px solid #C4C4C4",
                                                  padding: "5px",
                                                  fontSize: "14px",
                                                  cursor: "pointer",
                                                }}
                                                required
                                                type="text"
                                                name="date"
                                                readOnly
                                                value={format(
                                                  new Date(date),
                                                  "dd MMM yyyy"
                                                )}
                                                onClick={() => {
                                                  setOpenDate((prev) => !prev);
                                                }}
                                              />
                                              {openDate && (
                                                <Calendar
                                                  color={"#dc143c"}
                                                  date={new Date(date)}
                                                  onChange={(date) => {
                                                    setDate(
                                                      new Date(
                                                        date
                                                      ).toLocaleDateString("sv")
                                                    );
                                                    setOpenDate(false);
                                                  }}
                                                  minDate={new Date(date)}
                                                  months={1}
                                                  direction="horizontal"
                                                  className="new-dashboard-calendar"
                                                  name="dashboard-calendar"
                                                />
                                              )}
                                            </Box>
                                          </Grid>
                                          <Grid item mt={4}>
                                            <>
                                              <button
                                                style={{
                                                  padding: "6px 20px",
                                                  marginRight: "20px",
                                                  color: "#fff",
                                                  backgroundColor: "#003566",
                                                  border: "none",
                                                  cursor: "pointer",
                                                }}
                                                disabled={!checkBox === true}
                                                onClick={handleReissue}
                                              >
                                                Submit
                                              </button>

                                              <button
                                                style={{
                                                  padding: "6px 20px",
                                                  color: "#fff",
                                                  backgroundColor: "crimson",
                                                  border: "none",
                                                  cursor: "pointer",
                                                }}
                                                type="reset"
                                                onClick={() =>
                                                  setOpenModalReIssue(false)
                                                }
                                              >
                                                Cancel
                                              </button>
                                            </>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </Box>
                                    {/* </from> */}
                                  </Modal>
                                </Box>

                                {flyhubBookData?.Results[0]?.IsRefundable ===
                                undefined ? (
                                  <></>
                                ) : (
                                  <>
                                    {flyhubBookData?.Results[0]
                                      ?.IsRefundable === true ? (
                                      <Box className="queues-detail-calcel-btn">
                                        <button
                                          style={{
                                            backgroundColor: "#003566",
                                            color: "#fff",
                                            border: "none",
                                          }}
                                          onClick={() =>
                                            setOpenModalRefund(true)
                                          }
                                        >
                                          Refund
                                        </button>
                                        <Modal
                                          open={openModalRefund}
                                          onClose={() =>
                                            setOpenModalRefund(false)
                                          }
                                          className="custom-modal-r modal-table-0"
                                        >
                                          <Box
                                            className="modalStyler"
                                            bgcolor="#fff"
                                            p="25px"
                                          >
                                            <Box className="modal-table">
                                              <Typography
                                                sx={{
                                                  color: "#033566",
                                                  fontSize: "20px",
                                                  fontWeight: "bold",
                                                  mb: "10px",
                                                }}
                                              >
                                                Refund
                                              </Typography>
                                              <table>
                                                <tr>
                                                  <th width="5%">Select</th>
                                                  <th width="35%">
                                                    Passenger Name
                                                  </th>
                                                  <th width="20%">Gender</th>
                                                  <th width="20%">
                                                    Passenger Type
                                                  </th>
                                                  <th width="30%">Ticket No</th>
                                                </tr>
                                                {invoiceId.map(
                                                  (ticket, index) => (
                                                    <tr key={index}>
                                                      <td
                                                        width="10px"
                                                        style={{
                                                          border: "none",
                                                        }}
                                                      >
                                                        <FormGroup
                                                          style={{
                                                            padding: "0px",
                                                            margin: "0px",
                                                          }}
                                                        >
                                                          <FormControlLabel
                                                            control={
                                                              <Checkbox
                                                                style={{
                                                                  padding:
                                                                    "0px",
                                                                  margin:
                                                                    "auto",
                                                                  marginLeft:
                                                                    "20px",
                                                                }}
                                                                onChange={() =>
                                                                  handleCheckBox(
                                                                    index
                                                                  )
                                                                }
                                                              />
                                                            }
                                                          />
                                                        </FormGroup>
                                                      </td>
                                                      <td>
                                                        {ticket?.gender ===
                                                        "Female" ? (
                                                          <>
                                                            {ticket?.gender ===
                                                              "Female" &&
                                                            ticket?.pType ===
                                                              "ADT" ? (
                                                              <>
                                                                MRS{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            ) : (
                                                              <>
                                                                MISS{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            )}
                                                          </>
                                                        ) : (
                                                          <>
                                                            {ticket?.gender ===
                                                              "Male" &&
                                                            ticket?.pType ===
                                                              "ADT" ? (
                                                              <>
                                                                MR{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            ) : (
                                                              <>
                                                                MSTR{" "}
                                                                {
                                                                  ticket?.passengerName
                                                                }
                                                              </>
                                                            )}
                                                          </>
                                                        )}
                                                      </td>
                                                      <td>{ticket?.gender}</td>
                                                      <td>
                                                        {ticket?.pType ===
                                                        "ADT" ? (
                                                          <>Adult</>
                                                        ) : ticket?.pType ===
                                                          "CNN" ? (
                                                          <>Child</>
                                                        ) : (
                                                          <>Infant</>
                                                        )}
                                                      </td>
                                                      <td>
                                                        {ticket?.ticketno}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </table>
                                              <Grid
                                                container
                                                justifyContent={"space-between"}
                                                alignItems="center"
                                              >
                                                <Grid item mt={2}></Grid>
                                                <Grid item mt={4}>
                                                  <>
                                                    <button
                                                      style={{
                                                        padding: "6px 20px",
                                                        marginRight: "20px",
                                                        color: "#fff",
                                                        backgroundColor:
                                                          "#003566",
                                                        border: "none",
                                                        cursor: "pointer",
                                                      }}
                                                      disabled={
                                                        !checkBox === true
                                                      }
                                                      onClick={handleRefund}
                                                    >
                                                      Submit
                                                    </button>
                                                    <button
                                                      style={{
                                                        padding: "6px 20px",
                                                        color: "#fff",
                                                        backgroundColor:
                                                          "crimson",
                                                        border: "none",
                                                        cursor: "pointer",
                                                      }}
                                                      type="reset"
                                                      onClick={() =>
                                                        setOpenModalRefund(
                                                          false
                                                        )
                                                      }
                                                    >
                                                      Cancel
                                                    </button>
                                                  </>
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          </Box>
                                          {/* </from> */}
                                        </Modal>
                                      </Box>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}

                                {fareCost[0]?.status === "Ticketed" &&
                                todaydate <= voideDate ? (
                                  <Box className="queues-detail-calcel-btn">
                                    <button
                                      style={{
                                        backgroundColor: "#003566",
                                        color: "#fff",
                                        border: "none",
                                      }}
                                      onClick={() => setOpenModalVoid(true)}
                                    >
                                      Void
                                    </button>
                                    <Modal
                                      open={openModalVoid}
                                      onClose={() => setOpenModalVoid(false)}
                                      className="custom-modal-r modal-table-0"
                                    >
                                      <Box
                                        className="modalStyler"
                                        bgcolor="#fff"
                                        p="25px"
                                      >
                                        <Box className="modal-table">
                                          <Typography
                                            sx={{
                                              color: "#033566",
                                              fontSize: "20px",
                                              fontWeight: "bold",
                                              mb: "10px",
                                            }}
                                          >
                                            Void
                                          </Typography>
                                          <table>
                                            <tr>
                                              <th width="5%">Select</th>
                                              <th width="35%">
                                                Passenger Name
                                              </th>
                                              <th width="20%">Gender</th>
                                              <th width="20%">
                                                Passenger Type
                                              </th>
                                              <th width="30%">Ticket No</th>
                                            </tr>
                                            {invoiceId.map((ticket, index) => (
                                              <tr key={index}>
                                                <td
                                                  width="10px"
                                                  style={{ border: "none" }}
                                                >
                                                  <FormGroup
                                                    style={{
                                                      padding: "0px",
                                                      margin: "0px",
                                                    }}
                                                  >
                                                    <FormControlLabel
                                                      control={
                                                        <Checkbox
                                                          style={{
                                                            padding: "0px",
                                                            margin: "auto",
                                                            marginLeft: "20px",
                                                          }}
                                                          onChange={() =>
                                                            handleCheckBox(
                                                              index
                                                            )
                                                          }
                                                        />
                                                      }
                                                    />
                                                  </FormGroup>
                                                </td>
                                                <td>
                                                  {ticket?.gender ===
                                                  "Female" ? (
                                                    <>
                                                      {ticket?.gender ===
                                                        "Female" &&
                                                      ticket?.pType ===
                                                        "ADT" ? (
                                                        <>
                                                          MRS{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      ) : (
                                                        <>
                                                          MISS{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <>
                                                      {ticket?.gender ===
                                                        "Male" &&
                                                      ticket?.pType ===
                                                        "ADT" ? (
                                                        <>
                                                          MR{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      ) : (
                                                        <>
                                                          MSTR{" "}
                                                          {
                                                            ticket?.passengerName
                                                          }
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                                </td>
                                                <td>{ticket?.gender}</td>
                                                <td>
                                                  {ticket?.pType === "ADT" ? (
                                                    <>Adult</>
                                                  ) : ticket?.pType ===
                                                    "CNN" ? (
                                                    <>Child</>
                                                  ) : (
                                                    <>Infant</>
                                                  )}
                                                </td>
                                                <td>{ticket?.ticketno}</td>
                                              </tr>
                                            ))}
                                          </table>
                                          <Grid
                                            container
                                            justifyContent={"space-between"}
                                            alignItems="center"
                                          >
                                            <Grid item mt={2}></Grid>
                                            <Grid item mt={4}>
                                              <>
                                                <button
                                                  style={{
                                                    padding: "6px 20px",
                                                    marginRight: "20px",
                                                    color: "#fff",
                                                    backgroundColor: "#003566",
                                                    border: "none",
                                                    cursor: "pointer",
                                                  }}
                                                  disabled={!checkBox === true}
                                                  onClick={handleVoid}
                                                >
                                                  Submit
                                                </button>
                                                <button
                                                  style={{
                                                    padding: "6px 20px",
                                                    color: "#fff",
                                                    backgroundColor: "crimson",
                                                    border: "none",
                                                    cursor: "pointer",
                                                  }}
                                                  type="reset"
                                                  onClick={() =>
                                                    setOpenModalVoid(false)
                                                  }
                                                >
                                                  Cancel
                                                </button>
                                              </>
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      </Box>
                                      {/* </from> */}
                                    </Modal>
                                  </Box>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : fareCost[0]?.status ===
                              "Issue In Processing" ? (
                              <>
                                <Box className="queues-detail-wait-btn">
                                  <button>Wait For Ticketed</button>
                                </Box>
                              </>
                            ) : fareCost[0]?.status ===
                              "Refund In Processing" ? (
                              <Box className="queues-detail-wait-btn">
                                <button>Wait For Refunded</button>
                              </Box>
                            ) : fareCost[0]?.status === "Void In Processing" ? (
                              <Box className="queues-detail-wait-btn">
                                <button>Wait For Voided</button>
                              </Box>
                            ) : fareCost[0]?.status ===
                              "Reissue In Processing" ? (
                              <Box className="queues-detail-wait-btn">
                                <button>Wait For Reissued</button>
                              </Box>
                            ) : (
                              <>
                                {fareCost[0]?.status === "Hold" &&
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
                                          onClick={() => {
                                            if (
                                              passengerData[0]?.passportCopy ===
                                                "" &&
                                              passengerData[0]?.visaCopy ===
                                                "" &&
                                              triptype === "Outbound"
                                            ) {
                                              handleOpenUpdateModal();
                                            } else if (
                                              passengerData[0]?.passportCopy !==
                                                "" &&
                                              passengerData[0]?.visaCopy !==
                                                "" &&
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
                                      ) : (
                                        <CircularProgress />
                                      )}
                                    </Box>
                                  </>
                                ) : fareCost[0]?.status === "Hold" &&
                                  parseInt(balance[0]?.lastAmount) +
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
                                          // onClick={handleIssueTicket}
                                          onClick={() => {
                                            if (
                                              passengerData[0]?.passportCopy ===
                                                "" &&
                                              passengerData[0]?.visaCopy ===
                                                "" &&
                                              triptype === "Outbound"
                                            ) {
                                              handleOpenUpdateModal();
                                            } else if (
                                              passengerData[0]?.passportCopy !==
                                                "" &&
                                              passengerData[0]?.visaCopy !==
                                                "" &&
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
                                      ) : (
                                        <CircularProgress />
                                      )}
                                    </Box>
                                  </>
                                ) : fareCost[0]?.status === "Hold" &&
                                  parseInt(balance[0]?.lastAmount) +
                                    parseInt(balance[0]?.credit) <=
                                    parseInt(fareCost[0]?.netCost) ? (
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
                                            you have insufficient balance,
                                            please make deposit to issue this
                                            ticket
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
                                    </Box>
                                  </>
                                ) : (
                                  <Typography
                                    fontSize="16px"
                                    textAlign="center"
                                  ></Typography>
                                )}

                                {fareCost[0]?.status === "Hold" && (
                                  <Box className="queues-detail-calcel-btn">
                                    <button
                                      onClick={() => cancelBooking(gds, pnr)}
                                    >
                                      Cancel Flight
                                    </button>
                                  </Box>
                                )}
                              </>
                            )}
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
      {/* //todo: Update Document Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box sx={updateModalStyle}>
          {/* <UpdateDocument
            setState={setState}
            passengerData={passengerData}
            handleIssueTicket={handleIssueTicket}
            handleCloseUpdateModal={handleCloseUpdateModal}
          /> */}
        </Box>
      </Modal>
    </>
  );
};

export default QueuesDetail;
