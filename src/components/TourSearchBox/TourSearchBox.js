import { Box, Button, Collapse, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SearchIcon from "@mui/icons-material/Search";
import secureLocalStorage from "react-secure-storage";
import CountryList from "../Shared/CountryList";

const TourSearchBox = () => {
  const data = CountryList; // json data from flight Data
  const [countryCode, setCountryCode] = useState("BD");
  const [country, setCountry] = useState("Bangladesh");

  //  show the form data when click input field
  const initialData = [
    { name: "Bangladesh", code: "BD" },
    { name: "China", code: "CN" },
    { name: "India", code: "IN" },
    { name: "Mexico", code: "MX" },
    { name: "Nepal", code: "NP" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Spain", code: "ES" },
    { name: "Sri Lanka", code: "LK" },
  ];

  const [fromSuggest, setFromSuggest] = useState(initialData);

  const navigate = useNavigate();
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");
  const [openFrom, setOpenFrom] = useState(false);

  //formOnChange Filter
  const formOnChange = (e) => {
    const searchvalue = e.target.value;
    let suggestion = [];
    if (searchvalue.length > 2 && searchvalue.length !== 0) {
      suggestion = data.filter(
        (item) =>
          item.code.toLowerCase().includes(searchvalue.toLowerCase()) ||
          item.name.toLowerCase().includes(searchvalue.toLowerCase())
      );
      setFromSuggest(suggestion);
    } else {
      setFromSuggest(initialData);
    }
  };

  const fromSuggestedText = (name, code, address) => {
    setCountryCode(code);
    setFromSuggest([]);
    setCountry(name);
    setOpenFrom(false);
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
          {fromSuggest.length !== 0 ? (
            fromSuggest.map((item, index) => {
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
                      fromSuggestedText(` ${item.name}`, ` ${item.code} `);
                    }}
                  >
                    <Box>
                      <Typography
                        style={{
                          fontSize: "16px",
                          display: "block",
                          textAlign: "left",
                          color: "var(--primary-color)",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "18px",
                          display: "block",
                          textAlign: "left",
                          paddingRight: "5px",
                          color: "var(--secondary-color)",
                          fontWeight: "600",
                        }}
                      >
                        {item.code}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box>
              <Typography
                variant="subtitle-2"
                sx={{
                  color: "var(--primary-color)",
                  fontWidth: "bold",
                  padding: "10px 10px 0px",
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
  };

  async function handleSearch(e) {
    e.preventDefault();
    navigate("/tourpackages");
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="search-body-trip" sx={{ position: "relative" }}>
        <form onSubmit={handleSearch}>
          <Grid
            sx={{ justifyContent: "center", mt: "20px" }}
            container
            rowSpacing={{ lg: 0, md: 0, sm: 1, xs: 1 }}
            columnSpacing={0}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              style={{
                position: "relative",
                border: "1px solid #DEDEDE",
                borderRadius: "5px",
                height: "82px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setOpenFrom((prev) => !prev);
                }}
              >
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "24px",
                    }}
                  >
                    Select Country
                  </Typography>

                  <Typography
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--secondary-color)",
                    }}
                  >
                    {`${country} (${countryCode})`}
                  </Typography>
                </Box>
              </Box>
              <Collapse
                in={openFrom}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: "90%",
                    left: "0",
                    right: "0",
                    width: "98%",
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
                        fontWeight: 600,
                        paddingLeft: "10px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: "16px",
                      }}
                    />
                  </Box>
                  <Box>{fromGetSuggetion()}</Box>
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
                  startIcon={<SearchIcon style={{ fontSize: "30px" }} />}
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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mt: { md: "10px", sm: "10px", xs: "10px" } }}
        >
          <Grid item md={4} sm={12} xs={12}>
            <Button
              onClick={() => {
                navigate("/tourpackages");
              }}
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "#fff",
                padding: "8px 50px ",
                width: "100%",
                "&:hover": {
                  background: "var(--primary-color)",
                  color: "var(--white)",
                },
              }}
            >
              See All Group Fare
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
};

export default TourSearchBox;
