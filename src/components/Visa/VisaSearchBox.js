import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import CountryList from "../Shared/CountryList";

const VisaSearchBox = () => {
  const data = CountryList; // json data from flight Data
  const [faddress, setfaddress] = useState("Bangladesh");
  const [toAddress, setToAddress] = useState("Tourist Visa");

  const navigate = useNavigate();
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

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
            background: "var(--white)",
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
                    backgroundColor: "var(--white)",
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
                          color: "var(--secondary-color)",
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
            background: "var(--white)",
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
                    backgroundColor: "var(--white)",
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
                          color: "var(--secondary-color)",
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
  const handleClickAway = () => {
    setOpenFrom(false);
    setOpenTo(false);
  };
  // Search Flight button click
  let fromaddress = faddress;
  let toaddress = toAddress;

  async function handleSearch(e) {
    e.preventDefault();
    secureLocalStorage.setItem("search-data", {
      fromaddress,
      toaddress,
    });
    if (data) {
      navigate(`/searchVisa/${fromaddress.trim()}/${toaddress.trim()}`, {
        state: { fromaddress, toaddress },
      });
    } else {
      Swal.fire({
        imageUrl: ServerDown,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Server Down!",
        confirmButtonColor: "#ffa84d",
        confirmButtonText: "Search Again...",
      }).then(function () {
        navigate("/dashboard");
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
            columnGap={1}
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
                border: "1px solid #DEDEDE",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Box
                onClick={() => {
                  setOpenFrom((prev) => !prev);
                  setOpenTo(false);
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "var(--white)",
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  Country
                </Typography>
                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {faddress}
                </Typography>
              </Box>
              <Collapse
                in={openFrom}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "90%",
                    left: "0",
                    right: "0",
                    width: "96%",
                    backgroundColor: "var( --secondary-color)",
                    height: "fit-content",
                    borderBottom: "1px solid var(  --gray)",
                    borderLeft: "1px solid var(  --gray)",
                    borderRight: "2px solid var(  --gray)",
                    borderRadius: "0px 0px 5px 5px",
                    zIndex: "999",
                    padding: "3px 5px 0px",
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
                    backgroundColor="#fff"
                  >
                    <input
                      autoComplete="off"
                      autoFocus
                      onChange={formOnChange}
                      placeholder="Search a Country..."
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
                  <Box width={"full"}>{fromGetSuggetion()}</Box>
                </Box>
              </Collapse>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={3}
              style={{
                position: "relative",
                height: "82px",
                border: "1px solid #DEDEDE",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Box
                onClick={() => {
                  setOpenTo((prev) => !prev);
                  setOpenFrom(false);
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "var(--white)",
                  overflow: "hidden",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  Visa Type
                </Typography>

                <Typography
                  sx={{
                    color: "var(--secondary-color)",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {toAddress}
                </Typography>
              </Box>
              <Collapse
                in={openTo}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "90%",
                    left: "0",
                    width: "96%",
                    backgroundColor: "var( --secondary-color)",
                    height: "fit-content",
                    borderBottom: "1px solid var(  --gray)",
                    borderLeft: "1px solid var(  --gray)",
                    borderRight: "2px solid var(  --gray)",
                    borderRadius: "0px 0px 5px 5px",
                    zIndex: "999",
                    padding: "5px 5px 0",
                  }}
                >
                  <Box
                    sx={{
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
                      placeholder="Search a Visa Type..."
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
                  <Box>{toGetSuggetion()}</Box>
                </Box>
              </Collapse>
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
                  startIcon={<SearchIcon />}
                  className="shine-effect"
                  sx={{
                    fontSize: "16px",
                    height: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
                    width: {
                      lg: "90%",
                      md: "90%",
                      sm: "100%",
                      xs: "100%",
                    },
                    mt: { lg: "0px", md: "0px", sm: "10px", xs: "10px" },
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white)",
                    textTransform: "capitalize",
                    display: {
                      lg: "inline-block",
                      md: "inline-block",
                      sm: "flex",
                      xs: "flex",
                    },
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
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
