import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Slider from "@mui/material/Slider";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import { AiFillCaretDown } from "react-icons/ai";
import LocalFloristSharpIcon from "@mui/icons-material/LocalFloristSharp";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// import "./FlightSearch.css";

import {
  Box,
  Checkbox,
  Grid,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import AirlinesNameSlider from "./AirlinesNameSlider/AirlinesNameSlider";
import commaNumber from "comma-number";

const RoundWayFilter = ({
  filteredData,
  setfilteredData,
  data,
  setData,
  noData,
  setNoData,
  departureDate,
  returningDate,
  setFrom,
  setTo,
}) => {
  const location = useLocation();
  const requiredSearchData =
    location.state !== null
      ? location.state
      : secureLocalStorage.getItem("search-data");

  const {
    toSendData,
    adultCount,
    childCount,
    infant,
    tripType,
    faddress,
    toAddress,
    fromSendData,
  } = requiredSearchData;

  const FromAddress = faddress?.split(",");
  const Toaddress = toAddress?.split(",");

  let arr = [];
  let flightprice = data;
  flightprice.map((dat) => {
    arr.push(dat.clientPrice || dat.baseprice);
    return arr;
  });

  const maxPrice = Math.max(...arr);
  const minPrice = Math.min(...arr);

  const [selectPrice, setSelectPrice] = useState([minPrice, maxPrice]);
  const [refundable, setRefundable] = useState(false);
  const [nonRefundable, setNonRefundable] = useState(false);
  const [directFlight, setDirectFlight] = useState(false);
  const [oneStopFlight, setOneStopFlight] = useState(false);
  const [multiStopFlight, setMultiStopFlight] = useState(false);
  const [reset, setReset] = useState(data);

  const handleRefundable = (e) => {
    let updatedflight = data;
    setNonRefundable(false);
    setRefundable(e.target.checked);
    if (e.target.checked && selectPrice) {
      updatedflight = updatedflight.filter(
        (item) => item.refundable === "Refundable"
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };

  const handleNonRefundable = (e) => {
    let updatedflight = data;
    setRefundable(false);
    setNonRefundable(e.target.checked);
    if (e.target.checked) {
      updatedflight = updatedflight.filter(
        (item) =>
          item.refundable === "Nonrefundable" ||
          item.refundable === "Non Refundable"
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };
  const handleChangePrice = (event, newPrice) => {
    setSelectPrice(newPrice);
    let updatedflight = data;
    const selectMinPrice = selectPrice[0];
    const selectMaxPrice = selectPrice[1];
    if (selectPrice) {
      updatedflight = updatedflight.filter(
        (item) =>
          item.clientPrice >= selectMinPrice &&
          item.clientPrice <= selectMaxPrice
      );
      setfilteredData(updatedflight);
    } else if (selectPrice && refundable) {
      setRefundable(true);
      updatedflight = updatedflight.filter(
        (item) =>
          item.clientPrice >= selectMinPrice &&
          item.clientPrice <= selectMaxPrice &&
          item.refundable === "Refundable"
      );
      setfilteredData(updatedflight);
    } else if (selectPrice && nonRefundable) {
      setNonRefundable(true);
      updatedflight = updatedflight.filter(
        (item) =>
          item.clientPrice >= selectMinPrice &&
          item.clientPrice <= selectMaxPrice &&
          item.refundable === "Nonrefundable"
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };

  // --------
  const handleDirectFlight = (e) => {
    let updatedflight = data;
    setDirectFlight(e.target.checked);
    setOneStopFlight(false);
    setMultiStopFlight(false);
    if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "1");
      setfilteredData(updatedflight);
    } else if (e.target.checked && refundable) {
      updatedflight = updatedflight.filter(
        (item) => item.segment === "1" && item.refundable === "Refundable"
      );
      setfilteredData(updatedflight);
    } else if (e.target.checked && nonRefundable) {
      updatedflight = updatedflight.filter(
        (item) => item.segment === "1" && item.refundable === "Nonrefundable"
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };
  const handleOneStopFlight = (e) => {
    let updatedflight = data;
    setDirectFlight(false);
    setOneStopFlight(e.target.checked);
    setMultiStopFlight(false);
    if (e.target.checked) {
      updatedflight = updatedflight.filter(
        (item) =>
          item.segment === "2" ||
          item.segment === "22" ||
          item.segment === "21" ||
          item.segment === "12"
      );
      setfilteredData(updatedflight);
    } else if (e.target.checked && refundable) {
      updatedflight = updatedflight.filter(
        (item) => item.segment === "2" && item.refundable === "Refundable"
      );
      setfilteredData(updatedflight);
    } else if (e.target.checked && nonRefundable) {
      updatedflight = updatedflight.filter(
        (item) => item.segment === "2" && item.refundable === "Nonrefundable"
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };
  const handleMultiStopFlight = (e) => {
    let updatedflight = data;
    setMultiStopFlight(e.target.checked);
    setDirectFlight(false);
    setOneStopFlight(false);
    if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "3");
      setfilteredData(updatedflight);
    } else if (e.target.checked && refundable) {
      updatedflight = updatedflight.filter(
        (item) => item.segment === "3" && item.refundable === "Refundable"
      );
      setfilteredData(updatedflight);
    } else if (e.target.checked && nonRefundable) {
      updatedflight = updatedflight.filter(
        (item) => item.segment === "3" && item.refundable === "Nonrefundable"
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };

  // Find out How many sysytem start
  // let systemArray = [];
  // data.map((name) => {
  //   systemArray.push(name.system);
  //   return systemArray;
  // });
  // let systems = [];
  // systemArray.forEach((i) => (systems[i] = false));
  // let totalSystem = Object.keys(systems).map((item) => ({ item }));
  // Find out How many sysytem End

  // Find out How many carear name star
  const [carearFlight, setCarearFlight] = useState([]);
  let carearArray = [];
  data.map((name) => {
    carearArray.push(name.careerName);
    return carearArray;
  });
  let carear = [];
  carearArray.forEach((i) => (carear[i] = false));
  let totalCarear = Object.keys(carear).map((item) => ({ name: item }));

  useEffect(() => {
    setCarearFlight(totalCarear);
  }, []);
  const [check, setCheck] = useState(false);
  const handleflightCarear = (e) => {
    let updatedflight = data;
    const { name, check } = e.target;
    if (name) {
      updatedflight = updatedflight.filter((item) => item.careerName === name);
      setCheck(check);
      setfilteredData(updatedflight);
    }
  };

  const handleResetBtn = () => {
    setSelectPrice([minPrice, maxPrice]);
    setRefundable(false);
    setNonRefundable(false);
    setDirectFlight(false);
    setOneStopFlight(false);
    setMultiStopFlight(false);
    setfilteredData(data);
  };

  return (
    <Box className="flight-filter1 filter-side-0">
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
      >
        <Typography
          sx={{
            color: "var(--secondary-color)",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Sort & FILTER
        </Typography>
        <Typography
          onClick={handleResetBtn}
          sx={{
            cursor: "pointer",
            color: "var(--white)",
            backgroundColor: "var(--primary-color)",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Reset
        </Typography>
      </Box>
      {/* //todo: price range */}
      {/* <Accordion defaultExpanded={true} className="Accordion12">
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container justifyContent={"space-between"}>
            <Typography className="fil-title">Price Range</Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className="AccordionDetails22">
          <Box px={2} sx={{ width: "100%" }}>
            <Grid item className="price-slider-line">
              <Slider
                value={selectPrice}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
              />
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Typography
                sx={{
                  color: "#000",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                ৳ {minPrice}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                {" "}
                ৳ {maxPrice}
              </Typography>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion> */}
      {/* //todo:Fare Type */}

      <Accordion
        defaultExpanded={true}
        style={{ margin: "0", padding: "0px 10px 0px 15px" }}
      >
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--secondary-color)" />}
          id="panel1a-header"
          style={{ margin: "0", padding: "0px" }}
        >
          <Typography style={{ color: "var(--secondary-color)" }}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          className="AccordionDetails22"
          style={{ margin: "0", paddingLeft: "12px" }}
        >
          <Box>
            <Grid item className="price-slider-line">
              <Slider
                value={selectPrice}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                min={minPrice}
                max={maxPrice}
              />
            </Grid>
            <Grid container justifyContent={"space-between"}>
              <Typography
                sx={{
                  color: "var(--black)",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                ৳ {commaNumber(minPrice)}
              </Typography>
              <Typography
                sx={{
                  color: "var(--black)",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                {" "}
                ৳ {commaNumber(maxPrice)}
              </Typography>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded={true}
        style={{ margin: "0", padding: "0px 10px 0px 15px" }}
      >
        <AccordionSummary
          style={{ margin: "0", padding: "0px" }}
          expandIcon={<AiFillCaretDown color="var(--secondary-color)" />}
          id="panel2a-header"
        >
          <Typography
            sx={{ color: "var(--secondary-color)", fontSize: "16px" }}
          >
            Fare Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ margin: "0", padding: "0" }}>
          <Box>
            <FormGroup className="check-box-text09">
              <FormControlLabel
                value={"refundable"}
                control={<Checkbox className="box-0" />}
                checked={refundable}
                onChange={handleRefundable}
                label="Refundable"
              />
              <FormControlLabel
                value={"NonRefundable"}
                control={<Checkbox className="box-0" />}
                checked={nonRefundable}
                onChange={handleNonRefundable}
                label="Non Refundable"
              />
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded={true}
        style={{ margin: "0", padding: "0px 10px 0px 15px" }}
      >
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--secondary-color)" />}
          id="panel2a-header"
          style={{ margin: "0", padding: "0" }}
        >
          <Typography
            sx={{ color: "var(--secondary-color)", fontSize: "16px" }}
          >
            Stops
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ margin: "0", padding: "0" }}>
          <Box sx={{ width: "100%" }}>
            <FormGroup className="check-box-text09">
              <FormControlLabel
                onChange={handleDirectFlight}
                checked={directFlight}
                control={<Checkbox className="box-0" />}
                label="Non Stop"
              />
              <FormControlLabel
                control={<Checkbox className="box-0" />}
                checked={oneStopFlight}
                onChange={handleOneStopFlight}
                label="One Stops"
              />
              <FormControlLabel
                control={<Checkbox className="box-0" />}
                checked={multiStopFlight}
                onChange={handleMultiStopFlight}
                label="One Plus Stops"
              />
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded={true}
        style={{ margin: "0", padding: "0px 10px 0px 15px" }}
      >
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="var(--secondary-color)" />}
          id="panel2a-header"
          style={{ margin: "0", padding: "0" }}
        >
          <Typography
            sx={{ color: "var(--secondary-color)", fontSize: "16px" }}
          >
            Airlines Name
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ margin: "0", padding: "0" }}>
          <Box sx={{ width: "100%" }}>
            <AirlinesNameSlider
              data={data}
              setData={setData}
              filteredData={filteredData}
              setfilteredData={setfilteredData}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fil-title">Departure Times</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontSize={"14px"} mb={1}>
            {location?.state?.fromSendData} ({FromAddress[0]})
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <LocalFloristSharpIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>

            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <LightModeOutlinedIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>
            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <WbTwilightOutlinedIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>
            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <DarkModeOutlinedIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fil-title">Arrival Times</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontSize={"14px"} mb={1}>
            {location?.state?.toSendData} ({Toaddress[0]})
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <LocalFloristSharpIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>

            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <LightModeOutlinedIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>
            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <WbTwilightOutlinedIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>
            <Grid
              container
              alignItems={"center"}
              columnGap={2}
              className="filter-bg09"
            >
              <DarkModeOutlinedIcon sx={{ color: "#235F83" }} />
              <Typography className="check-box-text09">
                00:00 - 05:59
              </Typography>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fil-title">Airlines</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%" }}>
            {carearFlight.map((carear, index) => (
              <FormControlLabel
                name={carear.name}
                control={
                  <Checkbox
                    onChange={handleflightCarear}
                    checked={carear?.check || false}
                    className="box-0"
                  />
                }
                label={carear.name}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

// export default SliderFilter;
export default RoundWayFilter;
