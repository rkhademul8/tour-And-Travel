import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import {
  Box,
  Grid,
  Button,
  Typography,
  Stack,
  Pagination,
  ClickAwayListener,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import Swal from "sweetalert2";
import { addDays } from "date-fns/esm";
import { format } from "date-fns";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import secureLocalStorage from "react-secure-storage";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Search from "../../images/undraw/undraw_web_search_re_efla.svg";
import SingleFlight from "../../components/SingleFlight/SingleFlight";
import OneWayFilter from "../../components/OneWayFilter";
import OneWayFilterDrawer from "../../components/OneWayFilterDrawer";
import FlightSearchBox from "../../components/FlightSearchBox/FlightSearchBox";
import Commission from "../../components/Commission";
import Preloader from "../../components/Preloader/Preloader";
import SessionTimer from "../../components/Shared/SessionTimer/SessionTimer";
import styled from "@emotion/styled";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AirlinesNameSlider from "../../components/AirlinesNameSlider/AirlinesNameSlider";
import "../SearchReslut/SearchResult.css";

// const HtmlTooltip = styled(({ className, ...propss }) => (
//   <Tooltip {...propss} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: "#dc143c",
//     maxWidth: 220,
//     fontSize: "20px",
//     borderRadius: "8px 0px 8px 0px",
//   },
// }));

const modalStyle = {
  position: "absolute",
  top: { lg: "34%", md: "34%", sm: "50%", xs: "50%" },
  left: { lg: "57%", md: "57%", sm: "50%", xs: "50%" },
  transform: {
    lg: "translate(-50%, -57%)",
    md: "translate(-50%, -57%)",
    sm: "translate(-50%, -50%)",
    xs: "translate(-50%, -50%)",
  },
  width: { lg: "80vw", md: "80vw", sm: "100vw", xs: "100vw" },
  height: "fit-content",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
};

const SearchResult = () => {
  const commissionData = secureLocalStorage.getItem("commissionData");
  const [noData, setNoData] = useState("No Data");
  const searchData = secureLocalStorage.getItem("search-data");
  const navigate = useNavigate();
  const location = useLocation();
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const {
    toSendData,
    adultCount,
    childCount,
    departureDate,
    infant,
    tripType,
    faddress,
    toAddress,
    fromSearchText,
    toSearchText,
    fromSendData,
    className,
  } = requiredSearchData;

  //all states that i have to send to modify search
  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for retrigger useEffect
  const [changeStateSession, setChangeStateSession] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState(tripType);
  const [oneWayFromSearchText, setOneWayFromSearchText] =
    useState(fromSearchText);
  const [oneWayToSearchText, setOneWayToSearchText] = useState(toSearchText);

  const now = useRef(new Date(departureDate));
  const [from, setFrom] = useState(now.current);
  const [to, setTo] = useState(addDays(now.current, 3));
  const [fromSearchDate, setFromSearchDate] = useState(new Date(departureDate));
  const [oneWayFaddress, setOneWayFaddress] = useState(faddress);
  const [oneWayToAddress, setOneWayToAddress] = useState(toAddress);
  const [oneWayFromSendData, setOneWayFromSendData] = useState(fromSendData);
  const [oneWayToSendData, setOneWayToSendData] = useState(toSendData);
  const [oneWayAdultCount, setOneWayAdultCount] = useState(adultCount);
  const [oneWayChildCount, setOneWayChildCount] = useState(childCount);
  const [oneWayInfant, setOneWayInfant] = useState(infant);
  const [result, setResult] = useState(adultCount + childCount + infant);
  const [oneWayClassName, setOneWayClassName] = useState(className);
  const [isPrevClicked, setIsPrevCliked] = useState(false);
  const [isNextClicked, setIsNextCliked] = useState(false);
  //end

  //CM Box States

  const [openCm, setOpenCm] = useState(false);
  const [agentFarePrice, setAgentFarePrice] = useState(true);
  const [commisionFarePrice, setCommisionFarePrice] = useState(true);
  const [defaultCommissionRate, setDefaultCommissionRate] = useState(7);
  const [defaultCommissionRateAmount, setDefaultCommissionRateAmount] =
    useState(0);
  const [customerFare, setCustomerFare] = useState(true);

  //end
  const [modifyOpen, setModifyOpen] = useState(false);
  const modifyHandleOpen = () => setModifyOpen(true);
  const modifyHandleClose = () => setModifyOpen(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchDate, setSearchDate] = useState(
    new Date(from).toLocaleDateString("sv")
  );
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [departureLocation, setDepartureLocation] = useState("");
  const departureLocationCode =
    location?.state?.fromSendData?.slice(1, 5) ||
    searchData.fromSendData?.slice(1, 5);

  const [arrivalLocation, setArrivalLocation] = useState("");

  // todo:next day previous day variables
  let tomorrow = new Date(fromSearchDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let yesterday = new Date(fromSearchDate);
  yesterday.setDate(yesterday.getDate() - 1);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 30;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setData2(data?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // get the target element to toggle
  const handleClickAway = () => {};
  // on date change, store date in state
  // Handle the previous date change
  const handlePreviousDateChange = () => {
    setFromSearchDate(yesterday);
    setIsPrevCliked(true);
    setIsLoaded(false);
    modifyHandleClose();
    let url = `https://api.flyfarint.com/v.1.0.0/AirSearch/oneway.php?tripType=${tripType}&journeyfrom=${fromSendData?.trim()}&journeyto=${toSendData}&departuredate=${new Date(
      yesterday
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          setIsLoaded(true);
          const uniqueData = data;
          const count = uniqueData.length;
          const pageNumber = Math.ceil(count / size);
          setPageCount(pageNumber);
          setData(uniqueData);
          setData2(uniqueData);
        } else {
          Swal.fire({
            imageUrl: Search,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "No Flights Found",
            confirmButtonText: "Search Again...",
            confirmButtonColor: "var(--primary-color)",
          }).then(function () {
            navigate("/");
          });
        }
      })
      .catch(async (err) => {
        //console.log(err.message);
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate("/");
        });
      });
  };

  // Handles the next date change.
  const handleNextDateChange = () => {
    setIsNextCliked(true);
    setFromSearchDate(tomorrow);
    setIsLoaded(false);
    modifyHandleClose();
    let url = `https://api.flyfarint.com/v.1.0.0/AirSearch/oneway.php?tripType=${tripType}&journeyfrom=${fromSendData?.trim()}&journeyto=${toSendData}&departuredate=${new Date(
      tomorrow
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          setIsLoaded(true);
          const uniqueData = data;
          const count = uniqueData.length;
          const pageNumber = Math.ceil(count / size);
          setPageCount(pageNumber);
          setData(uniqueData);
          setData2(uniqueData);
        } else {
          Swal.fire({
            imageUrl: Search,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "No Flights Found",
            confirmButtonText: "Search Again...",
            confirmButtonColor: "var(--primary-color)",
          }).then(function () {
            navigate("/");
          });
        }
      })
      .catch(async (err) => {
        //console.log(err.message);
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate("/");
        });
      });
  };

  // Flyfarint. com s departure location
  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/AirMaterials/airports.php?search=${departureLocationCode}`
    )
      .then((res) => res.json())
      .then((data) => setDepartureLocation(data[0]));
  }, [departureLocationCode]);

  // Send the airport location.
  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/AirMaterials/airports.php?search=${
        location?.state?.toSendData || searchData.toSendData
      }`
    )
      .then((res) => res.json())
      .then((data) => setArrivalLocation(data[0]));
  }, [location?.state?.toSendData || searchData.toSendData]);

  //todo Searches for flights today's date.
  useEffect(() => {
    let unSubscribed = false;
    setIsPrevCliked(false);
    setIsNextCliked(false);
    setIsLoaded(false);
    modifyHandleClose();
    let url = `https://api.flyfarint.com/v.1.0.0/AirSearch/oneway.php?tripType=${tripType}&journeyfrom=${fromSendData?.trim()}&journeyto=${toSendData}&departuredate=${new Date(
      departureDate
    ).toLocaleDateString(
      "sv"
    )}&adult=${adultCount}&child=${childCount}&infant=${infant}`;
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!unSubscribed) {
          if (data.length !== 0) {
            //console.log(data);
            setIsLoaded(true);
            const uniqueData = data;
            const count = uniqueData.length;
            const pageNumber = Math.ceil(count / size);
            setPageCount(pageNumber);
            setData(uniqueData);
            setData2(uniqueData);
          } else {
            Swal.fire({
              imageUrl: Search,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "No Flights Found",
              confirmButtonText: "Search Again...",
              confirmButtonColor: "var(--primary-color)",
            }).then(function () {
              navigate("/");
            });
          }
        }
      })
      .catch(async (err) => {
        //console.log(err.message);
        await Swal.fire({
          imageUrl: Search,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Flights Found",
          confirmButtonText: "Search Again...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate("/");
        });
      });
    return () => {
      unSubscribed = true;
    };
  }, [
    changeState,
    changeStateSession,
    size,
    departureDate,
    fromSendData,
    toSendData,
    adultCount,
    childCount,
    infant,
    tripType,
    navigate,
  ]);

  // if (!isLoaded || Object.keys(data).length === 0) {
  // if (!isLoaded) {
  //   return (
  //     <Preloader
  //       isNextClicked={isNextClicked}
  //       isPrevClicked={isPrevClicked}
  //       fromSearchDate={fromSearchDate}
  //       departureDate={departureDate}
  //       fromSendData={fromSendData}
  //       className={className}
  //       toSendData={toSendData}
  //       adultCount={adultCount}
  //       childCount={childCount}
  //       infant={infant}
  //       tripType={tripType}
  //     />
  //   );
  // }

  return (
    <Container style={{ padding: "0px" }}>
      <Box sx={{ position: "relative" }}>
        <Box className="flightSearchParent">
          <Box className="filter-parent01">
            <Grid
              sm={12}
              mt={4}
              className="modify-search modify-search-oneway"
              container
              spacing={2}
              display="flex"
              alignItems="center"
              style={{ paddingLeft: "18px", display: "none" }}
              position="static"
              top="20px"
            >
              <Grid className="modify-search-info" container md={6}>
                <Box style={{ width: "100%" }}>
                  <FlightTakeoffIcon />
                  <Typography style={{ color: "var(--secondary-color)" }}>
                    Flight Search Result
                  </Typography>
                </Box>
                <h5>
                  {tripType === "oneway"
                    ? "One Way"
                    : tripType === "return"
                    ? "Return"
                    : "Multi City"}{" "}
                  Flight <span>|</span>{" "}
                  {adultCount > 0 && `Adult(${adultCount})`}
                  {childCount > 0 && `Children(${childCount})`}
                  {infant > 0 && `Infant(${infant})`} <span>|</span> {className}{" "}
                  <span>|</span>{" "}
                  {format(
                    new Date(
                      isNextClicked || isPrevClicked
                        ? fromSearchDate
                        : departureDate
                    ),
                    "dd MMM yyyy"
                  )}
                </h5>
                <h6>
                  {fromSearchText.trim()} <span>|</span> {toSearchText.trim()}
                </h6>
              </Grid>
              <Grid container columnGap={1} rowGap={1} md={6}>
                <Grid xs={2} sm={1} md={1.5} lg={1.5}>
                  <Tooltip title="Session Time">
                    <Button
                      style={{
                        border: "1.2px solid #DC143C",
                        color: "#dc143c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      {/* <SessionTimer
                            setChangeState={setChangeStateSession}
                          /> */}
                    </Button>
                  </Tooltip>
                </Grid>
                {/* <Grid xs={4} sm={2} md={2.5} lg={2.5}>
                      <HtmlTooltip
                        title={format(new Date(yesterday), "dd MMM")}
                      >
                        <Button
                          style={{
                            backgroundColor: "#003566",
                            color: "#FFF",
                            fontSize: "10px",
                          }}
                          disabled={
                            new Date(from).toDateString() ===
                            new Date().toDateString()
                              ? true
                              : false
                          }
                          onClick={handlePreviousDateChange}
                        >
                          Previous Day
                        </Button>
                      </HtmlTooltip>
                    </Grid> */}
                {/* <Grid xs={3} sm={1.5} md={2} lg={2}>
                      <HtmlTooltip title={format(new Date(tomorrow), "dd MMM")}>
                        <Button
                          style={{
                            backgroundColor: "#DC143C",
                            color: "#FFF",
                            fontSize: "10px",
                          }}
                          onClick={handleNextDateChange}
                        >
                          Next Day
                        </Button>
                      </HtmlTooltip>
                    </Grid> */}
                {/*  cm button popup work here */}
                {/* <Grid xs={2} sm={1} md={2} lg={2} className="cm-parent-box">
                      <Commission
                        agentFarePrice={agentFarePrice}
                        setAgentFarePrice={setAgentFarePrice}
                        commisionFarePrice={commisionFarePrice}
                        setCommisionFarePrice={setCommisionFarePrice}
                      />
                    </Grid> */}
                {/*  cm button popup work end here */}
                <Grid xs={5} sm={2} md={3} lg={3}>
                  <button
                    onClick={modifyHandleOpen}
                    style={{ backgroundColor: "#DC143C" }}
                  >
                    Modify Search
                  </button>

                  <Modal open={modifyOpen} onClose={modifyHandleClose}>
                    <Container>
                      <Box sx={modalStyle}>
                        <FlightSearchBox />
                      </Box>
                    </Container>
                  </Modal>
                </Grid>
              </Grid>
            </Grid>
            <Grid container columnSpacing={2} justifyContent="space-between">
              <Grid
                item
                lg={2.7}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "block",
                  },
                  boxShadow:
                    "-0.452679px 4.97947px 36px rgba(0, 0, 0, 0.09), -0.0905357px 0.995893px 5.85px rgba(0, 0, 0, 0.045)",
                }}
              >
                {isLoaded ? (
                  <OneWayFilter
                    data={data}
                    setData={setData}
                    filteredData={data2}
                    setfilteredData={setData2}
                    noData={noData}
                    setNoData={setNoData}
                    departureDate={departureDate}
                    setFrom={setFrom}
                  />
                ) : (
                  <Box
                    style={{
                      height: "100%",
                      width: "100%",
                      margin: "10px 0px",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={9.3}>
                <Grid container>
                  {/* //todo: show search result section*/}
                  <Grid
                    container
                    className="modify-search"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    mt={4}
                    style={{ paddingLeft: "18px" }}
                  >
                    <Grid className="modify-search-info" item md={8} lg={8}>
                      <Box>
                        <Box
                          style={{
                            width: "100%",
                            height: "fit-content",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <FlightTakeoffIcon
                            style={{
                              width: "25px",
                              height: "25px",
                              padding: "5px",
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                              borderRadius: "100%",
                            }}
                          />
                          <Typography
                            style={{
                              color: "var(--secondary-color)",
                              fontSize: "24px",
                            }}
                          >
                            Flight Search Result
                          </Typography>
                        </Box>
                        <h6>
                          {fromSearchText.trim()}
                          <span> - </span>
                          {toSearchText.trim()} ({className})
                        </h6>
                        <h5>
                          {/* {tripType === "oneway"
                          ? "One Way"
                          : tripType === "return"
                          ? "Return"
                          : "Multi City"}{" "}
                        Flight<span> | </span> */}
                          {format(
                            new Date(
                              isNextClicked || isPrevClicked
                                ? fromSearchDate
                                : departureDate
                            ),
                            "dd MMM yyyy"
                          )}
                          <span> | </span>{" "}
                          {adultCount > 0 && `Adult(${adultCount})`}
                          {childCount > 0 && `Children(${childCount})`}
                          {infant > 0 && `Infant(${infant})`}
                        </h5>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      md={4}
                      lg={4}
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      {/* //todo:session timer  */}
                      <Grid
                        xs={6}
                        sm={6}
                        md={6}
                        lg={3}
                        style={{ padding: "0px 5px" }}
                      >
                        <Tooltip title="Session Time">
                          <Button
                            style={{
                              border: "1.2px solid var(--secondary-color)",
                              color: "var(--secondary-color)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            {/* <SessionTimer
                              setChangeState={setChangeStateSession}
                            /> */}
                          </Button>
                        </Tooltip>
                      </Grid>
                      {/* <Grid xs={3} sm={1.5} md={2} lg={2}>
                        <HtmlTooltip
                          title={format(new Date(yesterday), "dd MMM")}
                        >
                          <Button
                            style={{
                              backgroundColor: "#003566",
                              color: "#FFF",
                              fontSize: "10px",
                            }}
                            disabled={
                              new Date(from).toDateString() ===
                              new Date().toDateString()
                                ? true
                                : false
                            }
                            onClick={handlePreviousDateChange}
                          >
                            Previous Day
                          </Button>
                        </HtmlTooltip>
                      </Grid> */}
                      {/* <Grid xs={3} sm={1.5} md={2} lg={2}>
                        <HtmlTooltip
                          title={format(new Date(tomorrow), "dd MMM")}
                        >
                          <Button
                            style={{
                              backgroundColor: "#DC143C",
                              color: "#FFF",
                              fontSize: "10px",
                            }}
                            onClick={handleNextDateChange}
                          >
                            Next Day
                          </Button>
                        </HtmlTooltip>
                      </Grid> */}
                      {/*  cm button popup work here */}
                      {/* <Grid
                        xs={2}
                        sm={1}
                        md={2}
                        lg={2}
                        className="cm-parent-box"
                      >
                        <Commission
                          openCm={openCm}
                          setOpenCm={setOpenCm}
                          agentFarePrice={agentFarePrice}
                          setAgentFarePrice={setAgentFarePrice}
                          commisionFarePrice={commisionFarePrice}
                          setCommisionFarePrice={setCommisionFarePrice}
                          defaultCommissionRate={defaultCommissionRate}
                          setDefaultCommissionRate={setDefaultCommissionRate}
                          defaultCommissionRateAmount={
                            defaultCommissionRateAmount
                          }
                          setDefaultCommissionRateAmount={
                            setDefaultCommissionRateAmount
                          }
                          customerFare={customerFare}
                          setCustomerFare={setCustomerFare}
                        />
                      </Grid> */}
                      {/*  cm button popup work end here */}
                      {/* //todo: modify search button */}
                      <Grid xs={6} sm={6} md={6} lg={6}>
                        <Button
                          onClick={modifyHandleOpen}
                          style={{
                            backgroundColor: "var(--secondary-color)",
                            color: "var(--white)",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Modify Search
                        </Button>

                        <Modal open={modifyOpen} onClose={modifyHandleClose}>
                          <Container>
                            <Box sx={modalStyle}>
                              <FlightSearchBox
                                type={type}
                                setType={setType}
                                value={value}
                                setValue={setValue}
                                fromSearchText={oneWayFromSearchText}
                                setFromSearchText={setOneWayFromSearchText}
                                toSearchText={oneWayToSearchText}
                                setToSearchText={setOneWayToSearchText}
                                from={from}
                                setFrom={setFrom}
                                to={to}
                                setTo={setTo}
                                faddress={oneWayFaddress}
                                setfaddress={setOneWayFaddress}
                                toAddress={oneWayToAddress}
                                setToAddress={setOneWayToAddress}
                                fromSendData={oneWayFromSendData}
                                setFromSendData={setOneWayFromSendData}
                                toSendData={oneWayToSendData}
                                setToSendData={setOneWayToSendData}
                                adultCount={oneWayAdultCount}
                                setAdultCount={setOneWayAdultCount}
                                childCount={oneWayChildCount}
                                setChildCount={setOneWayChildCount}
                                infant={oneWayInfant}
                                setInfant={setOneWayInfant}
                                result={result}
                                setResult={setResult}
                                className={oneWayClassName}
                                setClassName={setOneWayClassName}
                                changeState={changeState}
                                setChangeState={setChangeState}
                                changeFrom={changeFrom}
                                setChangeFrom={setChangeFrom}
                              />
                            </Box>
                          </Container>
                        </Modal>
                      </Grid>
                      {/* <Grid item xs={5.8} sm={2} md={3} lg={3} sx={{
                            display: {
                              xs: "block",
                              sm: "block",
                              md: "block",
                              lg: "none",
                            },
                          }}>
                        <Box
                          sx={{
                            display: {
                              xs: "block",
                              sm: "block",
                              md: "block",
                              lg: "none",
                            },
                          }}
                        >
                          <OneWayFilterDrawer
                            data={data}
                            setData={setData}
                            filteredData={data2}
                            setfilteredData={setData2}
                            noData={noData}
                            setNoData={setNoData}
                            departureDate={departureDate}
                            setFrom={setFrom}
                          />
                        </Box>
                      </Grid> */}
                    </Grid>
                  </Grid>
                  {/* //todo:airline slider */}
                  {/* <Grid
                    my={2}
                    mx={"auto"}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{
                      width: "100%",
                      height: "50px",
                    }}
                  >
                    {isLoaded ? (
                      <AirlinesNameSlider
                        data={data}
                        setData={setData}
                        filteredData={data2}
                        setfilteredData={setData2}
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                      />
                    )}
                  </Grid> */}
                  {/* //todo:main search result */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                      height: "fit-content",
                    }}
                  >
                    {isLoaded
                      ? data2?.slice(0, size).map((data, index) => {
                          return (
                            <SingleFlight
                              key={index}
                              flightData={data}
                              tripType={tripType}
                              adultCount={adultCount}
                              childCount={childCount}
                              infant={infant}
                              from={fromSendData}
                              to={toSendData}
                              fromAddress={faddress}
                              toAddress={toAddress}
                              dDate={searchDate}
                              agentFarePrice={agentFarePrice}
                              setAgentFarePrice={setAgentFarePrice}
                              commisionFarePrice={commisionFarePrice}
                              setCommisionFarePrice={setCommisionFarePrice}
                              customerFare={customerFare}
                              setCustomerFare={setCustomerFare}
                            />
                          );
                        })
                      : [...new Array(5)].map((data, index) => (
                          <Box
                            key={index}
                            style={{
                              width: "100%",
                              height: "150px",
                              margin: "10px 0px",
                              borderRadius: "5px",
                              overFlow: "hidden",
                            }}
                          >
                            <Skeleton
                              variant="rectangular"
                              width={"100%"}
                              height={"100%"}
                            />
                          </Box>
                        ))}
                  </Grid>
                  {/* //todo: pagination*/}
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box
                      sx={{
                        width: "100%",
                        my: 3,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Stack spacing={2}>
                        <Pagination
                          count={pageCount}
                          onChange={handlePageChange}
                          shape="rounded"
                          color="primary"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchResult;
