import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Swal from "sweetalert2";
import { IoIosPaperPlane } from "react-icons/io";
import "../Dashboard/DashboardMain/DashboardMain.css";
import "../HomeSearchBox/NewRoundTrip/NewRoundTrip.css";
import CountryList from "../CountryList";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";

const VisaSearchBox = () => {
  const data = CountryList; // json data from flight Data
  const [faddress, setfaddress] = useState("Dubai");
  const [toAddress, setToAddress] = useState("Tourist Visa");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infant, setInfant] = useState(0);
  const [result, setResult] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  // Date picker
  const [openDate, setOpenDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  // handle click function

  //  show the form data when click input field
  //For Country api
  const [fromSuggest, setFromSuggest] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [toSuggest, setToSuggest] = useState([]);
  const [toFilteredData, setToFilteredData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const resFromSuggest = await axios(
        `https://api.flyfarint.com/v.1.0.0/Visa/all.php?allcountry`
      );
      setFromSuggest(resFromSuggest.data);
      setFilteredData(resFromSuggest.data);

      resFromSuggest.data.map(async (item, index) => {
        const restoSuggest = await axios(
          `https://api.flyfarint.com/v.1.0.0/Visa/all.php?country=${item.country.trim()}`
        );

        setToSuggest(restoSuggest.data);
        setToFilteredData(restoSuggest.data);
      });
    };

    fetchAllData();
  }, []);

  //formOnChange Filter
  const formOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    suggestion = fromSuggest.filter((item) =>
      item.country.toLowerCase().includes(searchvalue.toLowerCase())
    );
    if (suggestion.length !== 0) {
      setFilteredData(suggestion);
    } else if (searchvalue.length > 0 && suggestion.length === 0) {
      setFilteredData(suggestion);
    } else {
      setFilteredData(fromSuggest);
    }
  };

  const fromSuggestedText = async (name) => {
    const restoSuggest = await axios(
      `https://api.flyfarint.com/v.1.0.0/Visa/all.php?country=${name.trim()}`
    );
    setToSuggest(restoSuggest.data);
    setToFilteredData(restoSuggest.data);
    setfaddress(name);
    setOpenFrom(false);
    setOpenTo(true);
  };
  //ToOnChange filter
  const toOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    suggestion = toSuggest.filter((item) =>
      item.visatype.toLowerCase().includes(searchvalue.toLowerCase())
    );
    if (suggestion.length !== 0) {
      setToFilteredData(suggestion);
    } else if (searchvalue.length > 0 && suggestion.length === 0) {
      setToFilteredData(suggestion);
    } else {
      setToFilteredData(toSuggest);
    }
  };

  const toSuggestedText = (name) => {
    // setToSearchText(name);
    // setToSendData(name);
    setToAddress(name);
    setOpenTo(false);
  };
  //FromgetSuggetion
  const fromGetSuggetion = () => {
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
            background: "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {filteredData.length !== 0 ? (
            filteredData.map((item, index) => {
              return (
                <Box
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "5px",
                    backgroundColor: "#fff",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
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
                      fromSuggestedText(` ${item.country}`);
                    }} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#003566",
                          display: "block",
                          textAlign: "left",
                          fontWeight: "500",
                        }}
                      >
                        {item.country}
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
                  color: "#DC143C",
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

  const toGetSuggetion = () => {
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
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
            overflowY: "auto",
            background: "#fff",
            "&::-webkit-scrollbar": { width: "5px" },
          }}
        >
          {toFilteredData.length !== 0 ? (
            toFilteredData.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    paddingLeft: "20px",
                    paddingRight: "5px",
                    backgroundColor: "#fff",
                    transition: "all .5s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#D1E9FF",
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
                    onClick={() => toSuggestedText(` ${item.visaCategory}`)} //suggest to display name select with multiple data pass parameter
                  >
                    <Box>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#003566",
                          display: "block",
                          textAlign: "left",
                        }}
                      >
                        {item.visaCategory}
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
                  color: "#DC143C",
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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen((prev) => !prev);
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
  };
  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
    setOpenDate(false);
    setOpenReturnDate(false);
    setOpen(false);
    setResult(adultCount + childCount + infant);
  };
  // Search Flight button click
  let fromaddress = faddress;
  let toaddress = toAddress;

  async function handleSearch(e) {
    e.preventDefault();
    // show notification if user is not found
    // !user?.user?.email && Notify.warning("Please Sign in");
    secureLocalStorage.setItem("search-data", {
      fromaddress,
      toaddress,
    });

    if (data) {
      navigate(
        `/dashboard/searchVisa/${fromaddress.trim()}/${toaddress.trim()}`,
        {
          state: { fromaddress, toaddress },
        }
      );
    } else {
      Swal.fire({
        imageUrl: ServerDown,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Server Down!",
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Search Again...",
      }).then(function () {
        navigate("/");
      });
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="search-body-trip" sx={{ position: "relative" }}>
        <form onSubmit={handleSearch}>
          <Grid
            sx={{ justifyContent: "center", mt: "20px" }}
            container
            rowSpacing={0}
            columnSpacing={0}
          >
            <Grid
              item
              className="dashboard-main-input-parent"
              xs={12}
              sm={12}
              md={6}
              lg={3}
              style={{
                position: "relative",
                height: "82px",
                borderRight: "1px solid #DEDEDE",
              }}
            >
              <Box
                className="update-search1"
                bgcolor="#fff"
                onClick={() => {
                  setOpenFrom((prev) => !prev);
                  setOpenTo(false);
                  setOpenDate(false);
                  setOpenReturnDate(false);
                  setOpen(false);
                }}
              >
                <Box>
                  <p>Country</p>
                  <span className="addressTitle">{faddress}</span>
                </Box>
                {/* <Box
                    style={{
                      lineHeight: "0px",
                    }}
                  >
                    <input
                      autoFocus
                      required
                      readOnly
                      value={fromSearchText}
                      placeholder="Country Code"
                    />
                  </Box> */}
              </Box>
              {/* <Grow in={openFrom}> */}
              {openFrom && (
                <Box
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    width: "100%",
                    backgroundColor: "#fff",
                    height: "fit-content",
                    marginTop: "-5px",
                    borderRadius: "5px",

                    zIndex: "10",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingLeft: "10px",
                      color: "#003566",
                      zIndex: 10,
                    }}
                    backgroundColor="#fff"
                    mt={"-55px"}
                  >
                    {/* <SearchIcon /> */}
                    <input
                      autoFocus
                      autoComplete="off"
                      onChange={formOnChange}
                      placeholder="Search a country..."
                      className="crimsonPlaceholder"
                      style={{
                        color: "#DC143C",
                        fontWeight: 500,
                        paddingLeft: "20px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    />
                  </Box>
                  <Box width={"full"}>{fromGetSuggetion()}</Box>
                </Box>
              )}
            </Grid>

            <Grid
              className="dashboard-main-input-parent"
              item
              xs={12}
              sm={12}
              md={6}
              lg={3}
              style={{
                position: "relative",
                height: "82px",
                borderRight: "1px solid #DEDEDE",
              }}
            >
              <Box
                className="update-search1"
                bgcolor="#fff"
                onClick={() => {
                  setOpenTo((prev) => !prev);
                  setOpenFrom(false);
                  setOpenDate(false);
                  setOpenReturnDate(false);
                  setOpen(false);
                }}
              >
                <Box style={{ position: "relative" }}>
                  <p>Visa Type</p>

                  <span className="addressTitle">{toAddress}</span>
                </Box>
              </Box>
              {/* <Grow in={openTo}> */}
              {openTo && (
                <Box
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    width: "100%",
                    backgroundColor: "#fff",
                    height: "fit-content",
                    marginTop: "-5px",
                    borderRadius: "5px",
                    zIndex: "10",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingLeft: "12px",
                      color: "#003566",
                      zIndex: 10,
                    }}
                    backgroundColor="#fff"
                    mt={"-55px"}
                  >
                    {/* <SearchIcon /> */}
                    <input
                      autoComplete="off"
                      autoFocus
                      onChange={toOnChange}
                      className="crimsonPlaceholder"
                      placeholder="Search a visa."
                      style={{
                        color: "#DC143C",
                        fontWeight: 500,
                        paddingLeft: "20px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    />
                  </Box>
                  <Box>{toGetSuggetion()}</Box>
                </Box>
              )}
            </Grid>

            <Grid
              lg={1}
              md={2}
              sm={12}
              xs={12}
              justifyContent="center"
              alignItems={"center"}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<IoIosPaperPlane />}
                  className="shine-effect"
                  sx={{
                    height: "100%",
                    width: {
                      lg: "90%",
                      md: "90%",
                      sm: "100%",
                      xs: "100%",
                    },
                    mt: { lg: "0px", md: "0px", sm: "10px", xs: "10px" },
                    backgroundColor: "#dc143c",
                    color: "#fff",
                    textTransform: "capitalize",
                    display: "inline-block",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "#dc143c",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Box>Search</Box>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ClickAwayListener>
  );
};

export default VisaSearchBox;
