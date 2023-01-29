import {
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import GroupsIcon from "@mui/icons-material/Groups";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { addDays, format } from "date-fns";
import { useRef } from "react";
import { FaPassport } from "react-icons/fa";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useNavigate } from "react-router-dom";
import GroupFareSearchBox from "../GroupFareSearchBox/GroupFareSearchBox";
import FlightSearchBox from "../FlightSearchBox/FlightSearchBox";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
import "./HomeSearchBox.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const HomeSearchBox = () => {
  const navigate = useNavigate();
  //todo: state for retrigger useEffect
  const [changeState, setChangeState] = useState(null);
  //todo: End for retrigger useEffect

  //todo: state for from date change
  const [changeFrom, setChangeFrom] = useState(false);
  //todo: End state for from date change

  const [type, setType] = React.useState("flight");
  const [value, setValue] = React.useState("oneway");
  const [fromSearchText, setFromSearchText] = useState(
    "Hazrat Shahjalal Intl Airport (DAC)"
  );
  const [toSearchText, setToSearchText] = useState("Cox's Bazar Airport(CXB)");

  const [departureDate, setDepartureDate] = useState(
    format(addDays(new Date(), 1), "dd MMM yy")
  );
  const [returningDate, setReturningDate] = useState(
    format(addDays(new Date(departureDate), 3), "dd MMM yy")
  );
  const [travelDate, setTravelDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  // for multiCity
  const now = useRef(new Date());
  const [from, setFrom] = useState(addDays(now.current, 1));
  const [to, setTo] = useState(addDays(now.current, 3));

  const [faddress, setfaddress] = useState("Dhaka,BANGLADESH");
  const [toAddress, setToAddress] = useState("Cox's Bazar,Bangladesh");
  const [fromSendData, setFromSendData] = useState("DAC");
  const [toSendData, setToSendData] = useState("CXB");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);
  const [className, setClassName] = useState("Economy");

  const handleTypeChange = (event, newValue) => {
    setType(newValue);
  };

  return (
    <Container>
      <Typography
        style={{
          color: "var(--white)",
          textAlign: "center",
          fontSize: "25px",
          fontFamily: "Poppins",
        }}
        mb={3}
      >
        Welcome to Flight Booking BD! Find Flights, Hotels & Tour Packages
      </Typography>
      <Box
        sx={{
          padding: {
            lg: "20px 0px",
            md: "20px 0px",
            sm: "20px 0px",
            xs: "20px 0px",
          },
          boxShadow: "var(--primary-color) 0px .5px 3px 0px",
          borderRadius: "5px",
          background: "var(--white)",
          height: "fit-content",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Box
            style={{
              backgroundColor: "rgba(var(--primary-rgb),.2)",
              color: "var(--primary-color)",
              padding: "10px 30px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Search Flight
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <TabContext value={type}>
            <Box
              sx={{
                width: "100%",
                height: { lg: "50px", md: "50px", sm: "100%", xs: "100%" },
                borderRadius: "5px",
                overflow: "hidden",
                display: "flex",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "center",
                  xs: "center",
                },
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
                  borderRadius: "5px",
                },

                "& button.Mui-selected,& button.Mui-selected >svg": {
                  color: "var(--secondary-color) !important",
                },
              }}
            >
              <TabList
                value={type}
                onChange={handleTypeChange}
                TabIndicatorProps={{
                  style: { background: "var(--secondary-color)" },
                }}
              >
                <Tab
                  icon={
                    <FlightIcon
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "20px",
                          color: "var(--mateBlack)",
                        },
                      }}
                    />
                  }
                  iconPosition="start"
                  label="Flight"
                  value="flight"
                  sx={{
                    width: "fit-content",
                    minHeight: "50px",
                    color: "var(--primary-color)",
                    margin: { xs: "0px 0px", sm: "0px 30px" },
                    fontSize: { xs: "11px", sm: "14px" },
                    opacity: "1",
                  }}
                />
                <Tab
                  icon={
                    <GroupsIcon
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "20px",
                          color: "var(--mateBlack)",
                        },
                      }}
                    />
                  }
                  iconPosition="start"
                  label="Group Fare"
                  value="groupfare"
                  sx={{
                    width: "fit-content",
                    minHeight: "50px",
                    margin: { xs: "0px 0px", sm: "0px 30px" },
                    fontSize: { xs: "11px", sm: "14px" },
                    opacity: "1",
                    color: "var(--primary-color)",
                  }}
                />

                <Tab
                  icon={
                    <TravelExploreIcon
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "20px",
                          color: "var(--mateBlack)",
                        },
                      }}
                    />
                  }
                  iconPosition="start"
                  label="Tour"
                  value="tour"
                  sx={{
                    width: "fit-content",
                    opacity: "1",
                    minHeight: "50px",
                    margin: { xs: "0px 0px", sm: "0px 30px" },
                    fontSize: { xs: "11px", sm: "14px" },
                    color: "var(--primary-color)",
                  }}
                />

                <Tab
                  icon={
                    <AirplaneTicketIcon
                      sx={{
                        fontSize: {
                          xs: "15px",
                          sm: "20px",
                          color: "var(--mateBlack)",
                        },
                      }}
                    />
                  }
                  iconPosition="start"
                  label="Visa"
                  value="visa"
                  sx={{
                    width: "fit-content",
                    minHeight: "50px",
                    margin: { xs: "0px 0px", sm: "0px 30px" },
                    fontSize: { xs: "11px", sm: "14px" },
                    opacity: "1",
                    color: "var(--primary-color)",
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value={"flight"} style={{ padding: "20px 0px 0px 0px" }}>
              <FlightSearchBox
                type={type}
                setType={setType}
                value={value}
                setValue={setValue}
                fromSearchText={fromSearchText}
                setFromSearchText={setFromSearchText}
                toSearchText={toSearchText}
                setToSearchText={setToSearchText}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returningDate={returningDate}
                setReturningDate={setReturningDate}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                faddress={faddress}
                setfaddress={setfaddress}
                toAddress={toAddress}
                setToAddress={setToAddress}
                fromSendData={fromSendData}
                setFromSendData={setFromSendData}
                toSendData={toSendData}
                setToSendData={setToSendData}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
                infant={infant}
                setInfant={setInfant}
                result={result}
                setResult={setResult}
                className={className}
                setClassName={setClassName}
                setChangeState={setChangeState}
                changeState={changeState}
                changeFrom={changeFrom}
                setChangeFrom={setChangeFrom}
              />
            </TabPanel>
            <TabPanel
              value={"groupfare"}
              style={{ padding: "20px 20px 0px 20px" }}
            >
              <GroupFareSearchBox
                type={type}
                setType={setType}
                value={value}
                setValue={setValue}
                fromSearchText={fromSearchText}
                setFromSearchText={setFromSearchText}
                toSearchText={toSearchText}
                setToSearchText={setToSearchText}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returningDate={returningDate}
                setReturningDate={setReturningDate}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                faddress={faddress}
                setfaddress={setfaddress}
                toAddress={toAddress}
                setToAddress={setToAddress}
                fromSendData={fromSendData}
                setFromSendData={setFromSendData}
                toSendData={toSendData}
                setToSendData={setToSendData}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
                infant={infant}
                setInfant={setInfant}
                result={result}
                setResult={setResult}
                className={className}
                setClassName={setClassName}
                setChangeState={setChangeState}
                changeState={changeState}
                changeFrom={changeFrom}
                setChangeFrom={setChangeFrom}
              />
            </TabPanel>
            <TabPanel value={"tour"} style={{ padding: "20px 20px 0px 20px" }}>
              <GroupFareSearchBox
                type={type}
                setType={setType}
                value={value}
                setValue={setValue}
                fromSearchText={fromSearchText}
                setFromSearchText={setFromSearchText}
                toSearchText={toSearchText}
                setToSearchText={setToSearchText}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returningDate={returningDate}
                setReturningDate={setReturningDate}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                faddress={faddress}
                setfaddress={setfaddress}
                toAddress={toAddress}
                setToAddress={setToAddress}
                fromSendData={fromSendData}
                setFromSendData={setFromSendData}
                toSendData={toSendData}
                setToSendData={setToSendData}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
                infant={infant}
                setInfant={setInfant}
                result={result}
                setResult={setResult}
                className={className}
                setClassName={setClassName}
                setChangeState={setChangeState}
                changeState={changeState}
                changeFrom={changeFrom}
                setChangeFrom={setChangeFrom}
              />
            </TabPanel>
            <TabPanel value={"visa"} style={{ padding: "20px 20px 0px 20px" }}>
              <GroupFareSearchBox
                type={type}
                setType={setType}
                value={value}
                setValue={setValue}
                fromSearchText={fromSearchText}
                setFromSearchText={setFromSearchText}
                toSearchText={toSearchText}
                setToSearchText={setToSearchText}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returningDate={returningDate}
                setReturningDate={setReturningDate}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                faddress={faddress}
                setfaddress={setfaddress}
                toAddress={toAddress}
                setToAddress={setToAddress}
                fromSendData={fromSendData}
                setFromSendData={setFromSendData}
                toSendData={toSendData}
                setToSendData={setToSendData}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                childCount={childCount}
                setChildCount={setChildCount}
                infant={infant}
                setInfant={setInfant}
                result={result}
                setResult={setResult}
                className={className}
                setClassName={setClassName}
                setChangeState={setChangeState}
                changeState={changeState}
                changeFrom={changeFrom}
                setChangeFrom={setChangeFrom}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeSearchBox;
