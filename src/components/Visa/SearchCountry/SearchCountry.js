import React, { useState } from "react";
import "./SearchCountry.css";
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { NavLink, useNavigate, Link, Navigate } from "react-router-dom";
import useAuthentication from "../../../hooks/useAuthentication";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
  IconButton,
} from "@mui/material";
import logo from "../../../image/dsh-img/WhiteLogo.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Modal from "@mui/material/Modal";
import hamburger from "../../../image/Icon/humburger.png";
import NewRegister from "../../Register/NewRegister";
import LoginPage from "../../Login/LoginPage";
import Contact from "../../Contact/Contact";
import { AiOutlineSearch } from "react-icons/ai";

import { Container } from "@mui/system";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { HiMenuAlt1 } from "react-icons/hi";
import CountryDetails from "../CountryDetails/CountryDetails";
import LoginModal from "../../Header/LoginModal";

// const bgImg = {
//   backgroundImage: `url(${bg})`,
//   width: "100%",
//   height: "100vh",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
// };

//  fetch from rest country

const SearchCountry = ({ trigger }) => {
  const countryObj = [
    { label: "Austria" },
    { label: "Bangladesh" },
    { label: "Belgium" },
    { label: "Denmark" },
    { label: "Estonia" },
    { label: "Egypt" },
    { label: "Malaysia" },
    { label: "Singapore" },
    { label: "Thailand" },
    { label: "Turkey" },
    { label: "United Kingdom" },
    { label: "Finland" },
    { label: "France" },
    { label: "Germany" },
    { label: "Greece" },
    { label: "Hungary" },
    { label: "Iceland" },
    { label: "Italy" },
    { label: "Latvia" },
    { label: "Lithuania" },
    { label: "Luxembourg" },
    { label: "Malta" },
    { label: "Netherlands" },
    { label: "Norway" },
    { label: "Poland" },
    { label: "Portugal" },
    { label: "Slovakia" },
    { label: "Slovenia" },
    { label: "Spain" },
    { label: "Sweden" },
    { label: "Switzerland" },
  ];

  const [countryName, setCountryName] = useState("");

  const getCountryName = (value) => {
    setCountryName(value?.label);
  };

  const navigate = useNavigate();
  const visaType = (e) => {
    const visaName = e.target.value;
    navigate(`/dashboard/searchVisa/${countryName.trim()}/${visaName.trim()}`);
  };

  return (
    <Box className="bg8" style={{ overflowX: "hidden" }}>
      <Box>
        <Box className="containersx">
          <Container>
            <div className="search-box bg88">
              <div className="palianImgBG">
                <h2>VISA</h2>
                <Box className="autocomplete-drop">
                  <Autocomplete
                    onChange={(event, value) => getCountryName(value)}
                    disablePortal
                    disableClearable
                    freeSolo
                    id="combo-box-demo"
                    options={countryObj}
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Search For Country"
                        {...params}
                        sx={{
                          width: "100%",
                          color: "#fff",

                          "& label.Mui-focused": {
                            color: "#da143c",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                            "&:hover fieldset": {
                              borderColor: "transparent",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#da143c",
                            },
                            "&.MuiInputLabel-root": {
                              color: "#da143c !important",
                            },
                          },
                        }}
                      />
                    )}
                  />
                  <span>
                    <AiOutlineSearch className="visa-search-icon" />
                  </span>
                </Box>

                <Box className="parent-select">
                  {countryName && (
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          color: "#fff",
                          fontFamily: "Poppins",
                          fontSize: "15px",

                          // "&.Mui-focused": {
                          //   color: "#fff",
                          //   fontSize: "16px",
                          // },
                        }}
                        id="demo-simple-select-label"
                      >
                        Choose Visa Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={visaType}
                        sx={{
                          width: "100%",
                          background: "#da143c",
                          borderRadius: "7px",

                          "&:hover": {
                            "&& fieldset": {
                              borderColor: "transparent",
                            },
                            "&:focus": {
                              backgroundColor: "yellow !important",
                            },
                          },
                        }}
                      >
                        <MenuItem value="studentVisa">Student Visa</MenuItem>
                        <MenuItem value="workVisa">Work Visa</MenuItem>
                        <MenuItem value="touristVisa">Tourist Visa</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
              </div>
            </div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchCountry;
