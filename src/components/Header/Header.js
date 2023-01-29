import {
  AppBar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  ClickAwayListener,
} from "@mui/material";
import React, { useState } from "react";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import commaNumber from "comma-number";
import { Container } from "@mui/system";
import { styled } from "@mui/material/styles";
import secureLocalStorage from "react-secure-storage";
import "./Header.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 10,
    padding: "0 4px",
    backgroundColor: "var(--black)",
    color: "var(--white)",
  },
}));

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(250000);
  const [service, setService] = useState(false);
  const [manage, setManage] = useState(false);
  const [account, setAccount] = useState(false);
  const user = secureLocalStorage.getItem("user-info");

  // todo: for mobile device
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // todo: end mobile device functionality

  const handleClickAway = () => {
    setService(false);
    setManage(false);
    setAccount(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          display:
            location.pathname.includes("/signin") ||
            location.pathname.includes("/signup") ||
            location.pathname === "/admin"
              ? "none"
              : "block",
          position: "relative",
        }}
      >
        <Container>
          <Box
            style={{
              borderRadius: "0px 0px 5px 5px",
              height: "70px",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { lg: "20%", md: "20%", sm: "80%", xs: "80%" },
                background: "#265aad29",
                height: "100%",
                display: "flex",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  sm: "center",
                  xs: "center",
                },
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Typography
                style={{
                  color: "var(--secondary-color)",
                  fontSize: "23px",
                  fontWeight: "600",
                }}
              >
                Farhan
                <span style={{ color: "var(--secondary-color)" }}>
                  {" "}
                  Travels
                </span>
              </Typography>
            </Box>
            {/* //todo check user logged in or not */}
            {location.pathname === "/" ? (
              <>
                <Box
                  sx={{
                    width: "80%",
                    background: "#265aad29",
                    height: "70px",
                    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                    alignItems: "center",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <NavLink
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      width: "fit-content",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "var(--secondary-color)",
                        padding: "6px 16px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "15px",
                          color: "var(--primary-color)",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                        }}
                      >
                        Register As Agent
                      </Typography>
                    </Box>
                  </NavLink>
                  <NavLink
                    to="/signin"
                    style={{
                      textDecoration: "none",
                      width: "fit-content",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "var(--white)",
                        padding: "6px 20px",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "15px",
                          color: "var(--primary-color)",
                          fontWeight: "500",
                          fontFamily: "Poppins",
                        }}
                      >
                        Login
                      </Typography>
                    </Box>
                  </NavLink>
                </Box>
                {/* //todo:for mobile device */}
                <Box
                  sx={{
                    width: { lg: "80%", md: "80%", sm: "20%", xs: "20%" },
                    backgroundColor: "var(--white)",
                    height: "70px",
                    display: { lg: "none", md: "none", sm: "flex", xs: "flex" },
                    alignItems: "center",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <IconButton size="large" onClick={handleOpenNavMenu}>
                    <MenuIcon style={{ color: "var(--primary-color)" }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                    >
                      <NavLink
                        to="/signin"
                        style={{
                          textDecoration: "none",
                          width: "fit-content",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "var(--primary-color)",
                          padding: "10px 5px",
                        }}
                      >
                        Sign In / Login
                      </NavLink>
                      <NavLink
                        to="/signup"
                        style={{
                          textDecoration: "none",
                          width: "fit-content",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "16px",
                          fontWeight: "600",
                          padding: "10px 5px",
                          backgroundColor: "var(--primary-color)",
                          color: "var(--white)",
                          borderRadius: "5px",
                        }}
                      >
                        Sign Up / Register
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              // go to  junk.js   and line number 4417
              ""
            )}
          </Box>
        </Container>
        <Tooltip title={"Logout"}>
          <Button
            style={{
              display: user?.user?.email ? "block" : "none",
              background: "var(--mateBlack)",
              color: "var(--white)",
              fontWeight: "600",
              padding: "10px 0px",
              position: "fixed",
              bottom: "50px",
              right: "2%",
              cursor: "pointer",
            }}
            onClick={() => {
              secureLocalStorage.removeItem("user-info");
              navigate("/");
            }}
          >
            <LogoutIcon />
          </Button>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default Header;
