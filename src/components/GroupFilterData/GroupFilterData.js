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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Select,
  Typography,
  Drawer,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const GroupFilterData = ({
  filteredData,
  setfilteredData,
  groupData,
  setGroupData,
  noData,
  setNoData,
}) => {
  const location = useLocation();

  let arr = [];
  let flightprice = groupData;

  flightprice.map((dat) => {
    const price = parseInt(dat.price);
    const clientPrice = price + price * 0.07;
    arr.push(dat.price || dat.BasePrice);
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

  const handleRefundable = (e) => {
    let updatedflight = groupData;
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
    let updatedflight = groupData;
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
    let updatedflight = groupData;
    const selectMinPrice = selectPrice[0];
    const selectMaxPrice = selectPrice[1];
    if (selectPrice) {
      updatedflight = updatedflight.filter(
        (item) => item.price >= selectMinPrice && item.price <= selectMaxPrice
      );
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };

  const handleDirectFlight = (e) => {
    let updatedflight = groupData;
    setDirectFlight(e.target.checked);
    setOneStopFlight(false);
    setMultiStopFlight(false);
    if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "1");
      setfilteredData(updatedflight);
    } else if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "1");
      setfilteredData(updatedflight);
    } else if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "1");
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };
  const handleOneStopFlight = (e) => {
    let updatedflight = groupData;
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
    } else if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "2");
      setfilteredData(updatedflight);
    } else if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "2");
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };
  const handleMultiStopFlight = (e) => {
    let updatedflight = groupData;
    setMultiStopFlight(e.target.checked);
    setDirectFlight(false);
    setOneStopFlight(false);
    if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "3");
      setfilteredData(updatedflight);
    } else if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "3");
      setfilteredData(updatedflight);
    } else if (e.target.checked) {
      updatedflight = updatedflight.filter((item) => item.segment === "3");
      setfilteredData(updatedflight);
    } else {
      setNoData(noData);
    }
  };

  const [carearFlight, setCarearFlight] = useState([]);
  let carearArray = [];
  groupData.map((name) => {
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
    let updatedflight = groupData;
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
    setfilteredData(groupData);
  };

  return (
    <Box
      borderRadius={"8px"}
      boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
      mt={3}
      ml={3}
    >
      <Grid container justifyContent={"space-between"} px={2} pt={2}>
        <Typography
          sx={{
            color: "#003566",
            fontSize: "18px",
          }}
        >
          FILTER
        </Typography>
        <Typography
          onClick={handleResetBtn}
          sx={{
            cursor: "pointer",
            color: "#003566",
          }}
        >
          Reset
        </Typography>
      </Grid>
      <Box px={2} py={2}>
        <hr style={{ border: "2px solid #DC143C" }} />
      </Box>
      <Accordion defaultExpanded={true} className="Accordion12">
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
          <Box sx={{ width: "100%" }}>
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
      </Accordion>
      {/* <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fil-title">Fare Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%" }}>
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
      </Accordion> */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fil-title">Stops</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
      {/* <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<AiFillCaretDown color="#003566" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="fil-title">Layover Airport</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%" }}>
            <FormGroup className="check-box-text09">
              <FormControlLabel
                control={<Checkbox className="box-0" />}
                label="Empty"
              />
              <FormControlLabel
                control={<Checkbox className="box-0" />}
                label="Empty"
              />
              <FormControlLabel
                control={<Checkbox className="box-0" />}
                label="Empty"
              />
            </FormGroup>
          </Box>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

export default GroupFilterData;
