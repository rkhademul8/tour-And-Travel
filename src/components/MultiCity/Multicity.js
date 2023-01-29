import {
  Box,
  ClickAwayListener,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format } from "date-fns";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineSwap } from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import flightData from "../flightData";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto var(--secondary-color)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--primary-color)",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "radial-gradient(var(--white),var(--white) 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "var(--secondary-color)",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        "&:hover": {
          bgcolor: "transparent",
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
const Multicity = ({
  tripType,
  faddress,
  setfaddress,
  toAddress,
  setToAddress,
  fromSearchText,
  setFromSearchText,
  fromSendData,
  setFromSendData,
  toSendData,
  setToSendData,
  toSearchText,
  setToSearchText,
  departureDate,
  setDepartureDate,
  setValue,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infant,
  setInfant,
  result,
  setResult,
  className,
  handleClassName,
  from,
  setFrom,
  to,
  setTo,
}) => {
  const data = flightData; // json data from flight Data
  const navigate = useNavigate();
  // todo: multiCity search Body
  const [searchData, setSearchData] = useState({
    adultCount: adultCount,
    childCount: childCount,
    infantCount: infant,
    CityCount: 2,
    segments: [
      {
        id: 0,
        openFrom: false,
        DepFrom: fromSendData.trim(),
        depFromText: fromSearchText,
        ArrTo: toSendData.trim(),
        arrToText: toSearchText,
        openTo: false,
        Date: new Date().toLocaleDateString("sv"),
        openDate: false,
        open: false,
      },
      {
        id: 1,
        openFrom: false,
        DepFrom: toSendData.trim(),
        depFromText: toSearchText,
        ArrTo: "DXB",
        arrToText: "Dubai Intl Airport (DXB)",
        openTo: false,
        Date: new Date().toLocaleDateString("sv"),
        openDate: false,
        open: false,
      },
    ],
  });
  // console.log(searchData);
  const addCity = () => {
    const tempSearchData = [...searchData.segments];
    tempSearchData.push({
      id: tempSearchData.length,
      DepFrom: tempSearchData[tempSearchData.length - 1].ArrTo,
      depFromText: tempSearchData[tempSearchData.length - 1].arrToText,
      ArrTo: "DXB",
      arrToText: "Dubai Intl Airport (DXB)",
      openTo: false,
      Date: new Date().toLocaleDateString("sv"),
      openDate: false,
      open: false,
    });
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };
  const removeCity = (id) => {
    const tempSearchData = searchData.segments.filter((item) => item.id !== id);
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };
  // todo: end multiCity search Body

  const initialData = [
    {
      code: "DAC",
      name: "Hazrat Shahjalal Intl Airport",
      Address: "Dhaka,BANGLADESH",
    },
    {
      code: "DXB",
      name: "Dubai Intl Airport",
      Address: "Dubai,UNITED ARAB EMIRATES",
    },
    {
      code: "CXB",
      name: "Cox's Bazar Airport",
      Address: "Cox's Bazar,Bangladesh",
    },
    {
      code: "JSR",
      name: "Jashore Airport",
      Address: "Jashore,Bangladesh",
    },
    {
      code: "BZL",
      name: "Barishal Airport",
      Address: "Barishal,Bangladesh",
    },
    {
      code: "RJH",
      name: "Shah Makhdum Airport",
      Address: "Rajshahi,Bangladesh",
    },
    {
      code: "SPD",
      name: "Saidpur Airport",
      Address: "Saidpur,Bangladesh",
    },
  ];
  //todo: users section
  const [users, setUsers] = useState("");
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  // todo: end of users section
  //todo: is Click state
  const [click, setClick] = useState(false);
  //todo: end of click state
  const [fromSuggest, setFromSuggest] = useState(initialData);
  const [toSuggest, setToSuggest] = useState(initialData);

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  // Opens the dialog when the user clicks.
  const handleClickOpen = (index, segment) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      openTo: false,
      openDate: false,
      open: !segment.open,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
  };

  // Closes the child process.
  const handleClose = (index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      openTo: false,
      openDate: false,
      open: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    setOpen(false);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setResult(adultCount + childCount + infant);
  };

  // Sets the number of children.
  function adultInclement(e) {
    e.preventDefault();
    if (adultCount < 9 - (childCount + infant)) {
      setAdultCount(adultCount + 1);
      setSearchData({ ...searchData, adultCount: adultCount + 1 });
    }
  }

  // Decrement the count of children.
  function adultDecrement(e) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      setSearchData({ ...searchData, adultCount: adultCount - 1 });
      if (infant === adultCount) {
        if (infant > 1) {
          setInfant(infant - 1);
          setSearchData({ ...searchData, infant: infant - 1 });
        }
      }
    }
  }

  function childInclement(e) {
    e.preventDefault();
    if (childCount < 9 - (adultCount + infant)) {
      setChildCount(childCount + 1);
      setSearchData({ ...searchData, childCount: childCount + 1 });
    }
  }

  function childDecrement(e) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
      setSearchData({ ...searchData, childCount: childCount - 1 });
    }
  }

  // Increment the default value if the value is not a child.
  function infantIncrement(e) {
    e.preventDefault();
    if (infant < 9 - (adultCount + childCount)) {
      if (infant < adultCount) {
        setInfant(infant + 1);
        setSearchData({ ...searchData, infantCount: infant + 1 });
      }
    }
  }

  // Decrement the infant by 1.
  function infantDecrement(e) {
    e.preventDefault();
    if (infant > 0) {
      setInfant(infant - 1);
      setSearchData({ ...searchData, infantCount: infant - 1 });
    }
  }

  // const handleSwapBtn = () => {
  //   setfaddress(toAddress);
  //   setToAddress(faddress);
  //   setFromSendData(toSendData);
  //   setToSendData(fromSendData);
  //   setFromSearchText(toSearchText);
  //   setToSearchText(fromSearchText);
  // };

  const formOnChange = (e) => {
    setOpen(false);
    const searchvalue = e.target.value;

    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setFromSuggest(suggestion);
      }
    } else {
      setFromSuggest(initialData);
    }
  };

  const fromGetSuggetion = (index) => {
    const fromSuggestedText = (name, code, address) => {
      const tempSearchData = [...searchData.segments];
      if (index === 0) {
        tempSearchData[index] = {
          ...tempSearchData[index],
          DepFrom: code.trim(),
          depFromText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: true,
        };
      } else {
        tempSearchData[index] = {
          ...tempSearchData[index],
          DepFrom: code.trim(),
          depFromText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: true,
        };
        tempSearchData[index - 1] = {
          ...tempSearchData[index - 1],
          arrTo: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: true,
        };
      }

      setSearchData({ ...searchData, segments: tempSearchData });
      setFromSendData(code);
      setFromSearchText(`${name} (${code})`);
      setFromSuggest([]);
      setfaddress(address);
      setOpen(false);
      setOpenFrom(false);
      setOpenTo(true);
    };
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          className="box-index-oneway"
          sx={{
            maxHeight: "230px",
            overflowY: "auto",
            background: "var(--white)",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
              return (
                <Box
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "10px",
                    backgroundColor: "var(--white)",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--white)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {
                      fromSuggestedText(
                        ` ${item.name}`,
                        ` ${item.code} `,
                        `${item.Address}`
                      );
                    }}
                  >
                    <Box>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--secondary-color)",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "500",
                        }}
                      >
                        {item.Address}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          textAlign: "left",
                          color: "var(--gray)",
                        }}
                      >
                        {item.name}
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          display: "block",
                          textAlign: "left",
                          paddingRight: "5px",
                          color: "var(--gray)",
                          fontWeight: "600",
                        }}
                      >
                        {item.code}
                      </span>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box>
              <Typography
                variant="subtitle-2"
                style={{
                  color: "var(--primary-color)",
                  fontWidth: "bold",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    if (searchvalue.length > 2) {
      const suggestion = data.filter((item) =>
        item.code.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setToSuggest(suggestion);
      if (suggestion.length === 0) {
        const suggestion = data.filter(
          (item) =>
            item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
            item.Address.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setToSuggest(suggestion);
      }
    } else {
      setToSuggest(initialData);
    }
  };

  const toGetSuggetion = (index) => {
    const toSuggestedText = (name, code, address) => {
      const tempSearchData = [...searchData.segments];
      if (index === tempSearchData.length - 1) {
        tempSearchData[index] = {
          ...tempSearchData[index],
          ArrTo: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: false,
          openDate: true,
        };
      } else {
        tempSearchData[index] = {
          ...tempSearchData[index],
          ArrTo: code.trim(),
          arrToText: `${name} (${code.trim()})`,
          openFrom: false,
          openTo: false,
          openDate: true,
        };
        tempSearchData[index + 1] = {
          ...tempSearchData[index + 1],
          DepFrom: code.trim(),
          depFromText: `${name} (${code.trim()})`,
        };
      }
      setSearchData({ ...searchData, segments: tempSearchData });
      setToSendData(code);
      setToSearchText(`${name} (${code})`);
      setToSuggest([]);
      setToAddress(address);
      setOpenTo(false);
      setTimeout(() => setOpenDate(true), 200);
    };
    return (
      <Box
        style={{
          height: "fit-content",
          position: "relative",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          className="box-index-oneway"
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            maxHeight: "230px",
            overflowY: "auto",
            background: "var(--white)",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {toSuggest.length !== 0 ? (
            toSuggest.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "5px",
                    backgroundColor: "var(--white)",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--white)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      margin: "0px 0px",
                      padding: "5px 0px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    onClick={() =>
                      toSuggestedText(
                        ` ${item.name}`,
                        `${item.code}`,
                        `${item.Address}`
                      )
                    } //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--secondary-color)",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {item.Address}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          display: "block",
                          color: "var(--gray)",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          paddingRight: "10px",
                          display: "block",
                          textAlign: "left",
                          color: "var(--gray)",
                          fontWeight: "600",
                        }}
                      >
                        {item.code}
                      </span>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box>
              <Typography
                variant="subtitle2"
                style={{
                  color: "var(--primary-color)",
                  fontWidth: "bold",
                  paddingLeft: "10px",
                }}
              >
                Not found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  };
  // SearchingField End
  //   Flight Search button Start
  async function handleSearch(e) {
    e.preventDefault();
    // console.log(searchData);
    let body = JSON.stringify({
      agentid: users?.user?.agentId || "FFA1926",
      searchtype: tripType,
      DepFrom: searchData.segments.map((item) => item.DepFrom).join("\r\n"),
      ArrTo: searchData.segments.map((item) => item.ArrTo).join("\r\n"),
      depTime: searchData.segments.map((item) => item.Date).join("\r\n"),
      returnTime: null,
      adult: adultCount,
      child: childCount,
      infant: infant,
      class: className,
    });
    // console.log(searchData);
    // console.log(body);
    await fetch(
      "https://api.flyfarint.com/v.1.0.0/SearchHistory/addHistory.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/multicityaftersearch", {
            state: {
              faddress,
              toAddress,
              fromSearchText,
              toSearchText,
              departureDate: format(new Date(from), "dd MMM yy"),
              adultCount,
              childCount,
              infant,
              tripType,
              fromSendData,
              toSendData,
              className,
              searchData,
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonText: "Search Again...",
          }).then(function () {
            navigate("/");
          });
        }
      });
  }

  const handleSelect = (date, index) => {
    const tempSearchData = [...searchData.segments];
    tempSearchData[index] = {
      ...tempSearchData[index],
      Date: new Date(date).toLocaleDateString("sv"),
      openDate: false,
      openFrom: false,
      openTo: false,
    };
    setSearchData({ ...searchData, segments: tempSearchData });
    setFrom(date);
    setTo(addDays(date, 3));
    setOpenDate(false);
    index === 0 && setOpen(true);
  };

  const handleClickAway = (index) => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpen(false);
    setResult(adultCount + childCount + infant);
    const tempSegment = [...searchData.segments];
    tempSegment[index] = {
      ...tempSegment[index],
      openFrom: false,
      openTo: false,
      openDate: false,
      open: false,
    };
    setSearchData({
      ...searchData,
      segments: tempSegment,
    });
  };

  return (
    <Box style={{ position: "relative" }}>
      <form onSubmit={handleSearch}>
        <Grid container rowGap={1}>
          {searchData.segments.map((segment, index, arr) => (
            <>
              <ClickAwayListener onClickAway={() => handleClickAway(index)}>
                <Grid
                  key={index}
                  sx={{
                    height: "fit-content",
                    width: "100%",
                    position: "relative",
                    mt: { lg: "0px", md: "0px", sm: "5px", xs: "5px" },
                  }}
                  container
                  alignItems="center"
                  rowSpacing={{ lg: 0, md: 0, sm: 1, xs: 1 }}
                  columnSpacing={0}
                >
                  <Grid
                    container
                    alignContent="center"
                    lg={6}
                    style={{
                      border: "1px solid rgba(var(--third-rgb),.3)",
                      borderRadius: "10px",
                      height: "100%",
                    }}
                  >
                    {/* //todo: Departure City section */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      style={{
                        position: "relative",
                        borderRight: "1px solid #DEDEDE",
                        padding: "5px",
                        height: "82px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                        }}
                        onClick={() => {
                          const tempSegment = [...searchData.segments];
                          tempSegment[index] = {
                            ...tempSegment[index],
                            openFrom: !segment.openFrom,
                            openTo: false,
                            openDate: false,
                          };
                          console.log(tempSegment);
                          setSearchData({
                            ...searchData,
                            segments: tempSegment,
                          });
                          setOpenFrom((prev) => !prev);
                          setOpenTo(false);
                          setOpenDate(false);
                          setOpen(false);
                        }}
                      >
                        <Box
                          style={{
                            width: "30%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                            }}
                          >
                            <FlightTakeoffIcon />
                          </Box>
                        </Box>
                        <Box style={{ width: "70%", height: "100%" }}>
                          <Box style={{ position: "relative" }}>
                            <p
                              style={{
                                color: "var(--secondary-color)",
                                fontWeight: "bold",
                              }}
                            >
                              Departure City
                            </p>
                          </Box>

                          <Box style={{ width: "90%" }}>
                            <span style={{ width: "100%" }}>
                              {segment.depFromText}
                            </span>
                          </Box>
                        </Box>

                        {/* <Box
                      onClick={handleSwapBtn}
                      sx={{
                        display: {
                          lg: "flex",
                          md: "flex",
                          sm: "none",
                          xs: "none",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                        width: "25px",
                        height: "25px",
                        padding: "5px",
                        border: "1px solid var(--gray)",
                        backgroundColor: "var(--white)",
                        borderRadius: "50%",
                        position: "absolute",
                        left: "93%",
                        zIndex: 11,
                      }}
                    >
                      <AiOutlineSwap
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "20px",
                        }}
                      />
                    </Box> */}
                      </Box>
                      {segment.openFrom ? (
                        <Box
                          style={{
                            position: "absolute",
                            top: "105%",
                            left: "0",
                            right: "0",
                            width: "100%",
                            backgroundColor: "var(--white)",
                            height: "fit-content",
                            border: "1px solid var(--primary-color)",
                            borderRadius: "5px",
                            zIndex: "999",
                            padding: "5px 5px 0px",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "var(--secondary-color)",
                              zIndex: 10,
                            }}
                            backgroundColor="var(--white)"
                          >
                            <input
                              autoComplete="off"
                              autoFocus
                              onChange={formOnChange}
                              placeholder="Search a airport..."
                              className="customPlaceholder"
                              style={{
                                color: "var(--secondary-color)",
                                fontWeight: 500,
                                paddingLeft: "20px",
                                width: "100%",
                                height: "40px",
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                              }}
                            />
                          </Box>
                          <Box>{fromGetSuggetion(index)}</Box>
                        </Box>
                      ) : null}
                    </Grid>
                    {/* //todo: Arrival City section */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      style={{
                        position: "relative",
                        padding: "5px",
                        height: "82px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                        }}
                        onClick={() => {
                          const tempSegment = [...searchData.segments];
                          tempSegment[index] = {
                            ...tempSegment[index],
                            openFrom: false,
                            openTo: !segment.openTo,
                            openDate: false,
                          };
                          setSearchData({
                            ...searchData,
                            segments: tempSegment,
                          });
                          setOpenFrom(false);
                          setOpenTo((prev) => !prev);
                          setOpenDate(false);
                          setOpen(false);
                        }}
                      >
                        <Box
                          style={{
                            width: "30%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              backgroundColor: "var(--primary-color)",
                              color: "var(--white)",
                            }}
                          >
                            <FlightLandIcon />
                          </Box>
                        </Box>
                        <Box style={{ width: "70%", height: "100%" }}>
                          <Box style={{ position: "relative" }}>
                            <p
                              style={{
                                color: "var(--secondary-color)",
                                fontWeight: "bold",
                              }}
                            >
                              Arrival City
                            </p>
                          </Box>
                          <Box
                            style={{
                              width: "90%",
                            }}
                          >
                            <span style={{ width: "100%" }}>
                              {segment.arrToText}
                            </span>
                          </Box>
                        </Box>
                      </Box>
                      {segment.openTo && (
                        <Box
                          style={{
                            position: "absolute",
                            top: "105%",
                            left: "0",
                            width: "100%",
                            backgroundColor: "var(--white)",
                            border: "1px solid var(--primary-color",
                            height: "fit-content",
                            borderRadius: "5px",
                            zIndex: "999",
                            padding: "5px 5px 0",
                          }}
                        >
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "var(--secondary-color)",
                              zIndex: 10,
                            }}
                            backgroundColor="var(--white)"
                          >
                            <input
                              autoComplete="off"
                              autoFocus
                              onChange={toOnChange}
                              className="customPlaceholder"
                              placeholder="Search a airport..."
                              style={{
                                color: "var(--secondary-color)",
                                fontWeight: 500,
                                paddingLeft: "20px",
                                width: "100%",
                                height: "40px",
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                              }}
                            />
                          </Box>
                          <Box>{toGetSuggetion(index)}</Box>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  {/* //todo:Travel Date */}
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={3}
                    lg={3}
                    sx={{
                      position: "relative",
                      padding: {
                        lg: "0px 30px",
                        md: "0px 30px",
                        sm: "0px",
                        xs: "0px",
                      },
                      height: "82px",
                    }}
                  >
                    <Box
                      style={{
                        border: "1px solid rgba(var(--third-rgb),.3)",
                        borderRadius: "10px",
                        height: "100%",
                        width: "100%",
                      }}
                      onClick={() => {
                        const tempSearchData = [...searchData.segments];
                        tempSearchData[index] = {
                          ...tempSearchData[index],
                          openFrom: false,
                          openTo: false,
                          openDate: !segment.openDate,
                        };
                        setSearchData({
                          ...searchData,
                          segments: tempSearchData,
                        });
                        setTimeout(() => setOpenDate((prev) => !prev), 200);
                        setOpenFrom(false);
                        setOpenTo(false);
                        setOpen(false);
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          width: "100%",
                        }}
                      >
                        <Box
                          style={{
                            width: "30%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              border: "1px solid rgba(var(--third-rgb),.3)",
                              borderRadius: "100%",
                              color: "var(--secondary-color)",
                              height: "40px",
                              width: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CalendarMonthIcon />
                          </Box>
                        </Box>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "70%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <p
                            style={{
                              color: "var(--secondary-color)",
                              fontWeight: "bold",
                            }}
                          >
                            Travel Date
                          </p>
                          <span style={{ fontSize: "14px" }}>{`${format(
                            new Date(segment.Date),
                            "dd MMM yy"
                          )}`}</span>

                          <span
                            style={{
                              color: "var(--mateBlack)",
                              fontsize: "14px",
                            }}
                          >
                            [Multi City]
                          </span>
                        </Box>
                      </Box>
                    </Box>
                    {segment.openDate && (
                      <Box>
                        <Calendar
                          color="#ffa84d"
                          // date={new Date(from)}
                          onChange={(date) => handleSelect(date, index)}
                          months={1}
                          direction="horizontal"
                          minDate={new Date()}
                          className={"dashboard-calendar"}
                        />
                      </Box>
                    )}
                  </Grid>

                  {/* //todo: Passenger Box section */}
                  {index === 0 ? (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={3}
                      sx={{
                        position: "relative",
                        padding: {
                          lg: "0 10px 0 0",
                          md: "0 10px 0 0",
                          sm: "0px",
                          xs: "0px",
                        },
                        height: "82px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          border: "1px solid rgba(var(--third-rgb),.3)",
                          borderRadius: "10px",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: {
                              lg: "start",
                              md: "start",
                              sm: "center",
                              xs: "center",
                            },
                            alignItems: "center",
                          }}
                          onClick={() => handleClickOpen(index, segment)}
                        >
                          <Box
                            sx={{
                              padding: {
                                lg: "0px 10px",
                                md: "0px 10px",
                                sm: "0px",
                                xs: "0px",
                              },
                            }}
                          >
                            <Box
                              style={{
                                border: "1px solid rgba(var(--third-rgb),.3)",
                                borderRadius: "100%",
                                color: "var(--secondary-color)",
                                height: "40px",
                                width: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <GroupsIcon />
                            </Box>
                          </Box>
                          <Button
                            sx={{
                              justifyContent: "flex-start",
                              color: "#000",
                              display: "block",
                            }}
                          >
                            <p
                              style={{
                                color: "var(--secondary-color)",
                                fontWeight: "bold",
                              }}
                            >
                              Passenger
                            </p>
                            <span> {result} Traveler</span>
                            <Typography
                              variant="subtitle2"
                              style={{
                                color: "var(--mateBlack)",
                                fontSize: "14px",
                              }}
                            >
                              {`[ ${className} ]`}
                            </Typography>
                          </Button>
                        </Box>

                        {segment.open && (
                          <Box
                            style={{
                              position: "absolute",
                              top: "110%",
                              right: "0px",
                              zIndex: "999",
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: "#FFF",
                                padding: "10px",
                                overflow: "hidden",
                                width: "300px",
                                border: "1px solid var(--primary-color)",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                              }}
                            >
                              <Box
                                style={{
                                  textAlign: "center",
                                  marginBottom: "5px",
                                  color: "var(--mateBlack)",
                                }}
                              >
                                <h3>Passenger</h3>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "10px",
                                    width: "50%",
                                  }}
                                >
                                  <button
                                    onClick={adultDecrement}
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                      border: "none",
                                      width: "20px",
                                      height: "20px",
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    -
                                  </button>
                                  <h5
                                    style={{ color: "var(--secondary-color)" }}
                                  >
                                    {adultCount}
                                  </h5>
                                  <button
                                    onClick={adultInclement}
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                      border: "none",
                                      width: "20px",
                                      height: "20px",
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    +
                                  </button>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "50%",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                  }}
                                >
                                  <h5>Adult</h5>
                                  <span style={{ fontSize: "13px" }}>
                                    12+ yrs
                                  </span>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "10px",
                                    justifyContent: "flex-start",
                                    width: "50%",
                                  }}
                                >
                                  <button
                                    onClick={childDecrement}
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                      border: "none",
                                      width: "20px",
                                      height: "20px",
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    -
                                  </button>
                                  <h5
                                    style={{ color: "var(--secondary-color)" }}
                                  >
                                    {childCount}
                                  </h5>
                                  <button
                                    onClick={childInclement}
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                      border: "none",
                                      width: "20px",
                                      height: "20px",
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    +
                                  </button>
                                </Box>

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "50%",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                  }}
                                >
                                  <h5>Children</h5>
                                  <span style={{ fontSize: "13px" }}>
                                    2- less than 12 yrs
                                  </span>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "10px",
                                    width: "50%",
                                  }}
                                >
                                  <button
                                    onClick={infantDecrement}
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                      border: "none",
                                      width: "20px",
                                      height: "20px",
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    -
                                  </button>
                                  <h5
                                    style={{ color: "var(--secondary-color)" }}
                                  >
                                    {infant}
                                  </h5>
                                  <button
                                    onClick={infantIncrement}
                                    style={{
                                      backgroundColor: "var(--primary-color)",
                                      color: "var(--white)",
                                      border: "none",
                                      width: "20px",
                                      height: "20px",
                                      fontSize: "14px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    +
                                  </button>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "50%",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                  }}
                                >
                                  <h5>Infant</h5>
                                  <span style={{ fontSize: "13px" }}>
                                    0 - 23 month{" "}
                                  </span>
                                </Box>
                              </Box>
                              <hr />
                              <Box>
                                <Box>
                                  <FormControl>
                                    <RadioGroup
                                      value={className}
                                      row
                                      onChange={handleClassName}
                                    >
                                      <FormControlLabel
                                        value="Economy"
                                        control={<BpRadio />}
                                        label="Economy"
                                        sx={{
                                          mr: "21px",
                                        }}
                                      />
                                      <FormControlLabel
                                        value="Business"
                                        control={<BpRadio />}
                                        label="Business"
                                      />
                                      <FormControlLabel
                                        value="First Class"
                                        control={<BpRadio />}
                                        label="First Class"
                                      />
                                      <FormControlLabel
                                        value="Premium Economy "
                                        control={<BpRadio />}
                                        label="Premium Economy"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Box>
                                <Button
                                  size="small"
                                  onClick={() => handleClose(index)}
                                  className="shine-effect"
                                  style={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "var(--mateBlack)",
                                  }}
                                >
                                  DONE
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        {/* </Grow> */}
                      </Box>
                    </Grid>
                  ) : (
                    <Grid
                      lg={3}
                      md={3}
                      sm={6}
                      xs={6}
                      justifyContent="center"
                      alignItems={"center"}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Button
                          disabled={arr.length > 4 ? true : false}
                          sx={{
                            fontSize: "14px",
                            height: "fit-content",
                            width: "fit-content",
                            backgroundColor: "var(--primary-color)",
                            color: "var(--white)",
                            textTransform: "capitalize",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": {
                              backgroundColor: "var(--primary-color)",
                              cursor: "pointer",
                            },
                          }}
                          onClick={addCity}
                        >
                          <Box>ADD</Box>
                          <Box>CITY</Box>
                        </Button>
                        <Button
                          disabled={arr.length === 2 ? true : false}
                          sx={{
                            fontSize: "14px",
                            height: "fit-content",
                            width: "fit-content",
                            backgroundColor: "var(--primary-color)",
                            color: "var(--white)",
                            textTransform: "capitalize",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": {
                              backgroundColor: "var(--primary-color)",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => removeCity(segment.id)}
                        >
                          <Box>REMOVE</Box>
                          <Box>CITY</Box>
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </ClickAwayListener>
            </>
          ))}
          {/* //todo: Search Button */}
          <Grid md={12} lg={12} sm={12} xs={12} style={{ height: "100%" }}>
            <Box
              sx={{
                height: { lg: "100%", md: "100%", sm: "70%", xs: "70%" },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                className="shine-effect"
                sx={{
                  fontSize: "16px",
                  height: "60px",
                  width: {
                    lg: "20%",
                    md: "20%",
                    sm: "100%",
                    xs: "100%",
                  },
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white)",
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                  "&:hover": {
                    backgroundColor: "var(--primary-color)",
                    cursor: "pointer",
                  },
                }}
              >
                <SearchIcon style={{ fontSize: "30px" }} />
                {click ? "Wait..." : "Search"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Multicity;
