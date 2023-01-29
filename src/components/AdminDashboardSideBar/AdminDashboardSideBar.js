import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate, Outlet, Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import TollIcon from "@mui/icons-material/Toll";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
// import QueuesPage from "../Queues/QueuesPage";
import AuthProvider from "../Contexts/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../../App";
import { borderRadius, color, width } from "@mui/system";
import useAuthentication from "../../hooks/useAuthentication";
import "./AdminDashboardSideBar.css";

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminDashboardSideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [subManu, setSubmenu] = useState("");
  const [subManuActive, setSubMenuActive] = useState("");
  const [active, setactive] = useState("");

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const { logout } = useAuthentication();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            background: "var(--secondary-color)",
            display: "block",
            borderRight: "5px solid var(--primary-color)",
          }}
        >
          <Box onClick={() => setOpen(!open)}>
            <MenuIcon
              style={{
                color: "var(--primary-color)",
                fontSize: "28px",
                margin: "20px 15px 10px 15px",
              }}
            />
          </Box>
        </DrawerHeader>

        <List
          style={{
            height: "100vh",
            overflowY: "hidden",
            overflowX: "hidden",
            background: "var(--secondary-color)",
            borderRight: "5px solid var(--primary-color)",
          }}
        >
          {/* dashboard  home */}

          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/dashboardhome/dashboard"
              className={({ isActive }) =>
                isActive ? "active-nav" : "normal-nav"
              }
              onClick={() => setSubmenu("Dashboard")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "90%",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon
                    id="NavIcon"
                    style={{
                      fontSize: "28px",
                      margin: "10px 0px",
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id="NavText"
                  primary="Dashboard"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "var(--primary-color)",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* manage  */}
          <Box>
            <ListItem disablePadding sx={{ display: "block" }}>
              <NavLink
                to={"/dashboardhome/traveller"}
                className={({ isActive }) =>
                  isActive ? "active-nav" : "normal-nav"
                }
                onClick={() => {
                  setSubmenu("Manage");
                  setSubMenuActive("HomeContent");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    width: "90%",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ManageAccountsIcon
                      onClick={() => setOpen(!open)}
                      id="NavIcon"
                      style={{
                        fontSize: "28px",
                        margin: "10px 0px",
                        color: "var(--primary-color)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id="NavText"
                    primary="Manage"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <Box
              style={{
                display: subManu === "Manage" ? "" : "none",
                background: open ? "var(--primary-color)" : "",
              }}
              className="admin-DashSubManu"
            >
              <Box
                className="admin-DashSubManuChild"
                sx={{ opacity: open ? 1 : 0 }}
              >
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "HomeContent"
                        ? "var(--secondary-color)"
                        : "",
                    color:
                      subManuActive === "HomeContent"
                        ? "var(--primary-color)"
                        : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("HomeContent");
                  }}
                >
                  Home Content
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "GroupFare"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "GroupFare"
                        ? "var(--primary-color)"
                        : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("GroupFare");
                  }}
                >
                  Group Fare
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Umrah"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "Umrah" ? "var(--primary-color)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Umrah");
                  }}
                >
                  Umrah
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Tour" ? "var( --secondary-color)" : "",
                    color:
                      subManuActive === "Tour" ? "var(--primary-color)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Tour");
                  }}
                >
                  Tour
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Others"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "Others" ? "var(--primary-color)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Others");
                  }}
                >
                  Others
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Control"
                        ? "var( --secondary-color)"
                        : "",
                    color:
                      subManuActive === "Control" ? "var(--primary-color)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Control");
                  }}
                >
                  Control
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Visa" ? "var( --secondary-color)" : "",
                    color:
                      subManuActive === "Visa" ? "var(--primary-color)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Visa");
                  }}
                >
                  Visa
                </NavLink>
              </Box>
            </Box>
          </Box>

          {/* search */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/abc"
              className={({ isActive }) =>
                isActive ? "active-nav" : "normal-nav"
              }
              onClick={() => setSubmenu("Search")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "90%",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ContentPasteSearchIcon
                    id="NavIcon"
                    style={{
                      fontSize: "28px",
                      margin: "10px 0px",
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id="NavText"
                  primary="Search"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "var(--primary-color)",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Agent */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/dhgf"
              className={({ isActive }) =>
                isActive ? "active-nav" : "normal-nav"
              }
              onClick={() => setSubmenu("Agent")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "90%",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SupervisorAccountIcon
                    id="NavIcon"
                    style={{
                      fontSize: "28px",
                      margin: "10px 0px",
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id="NavText"
                  primary="Agent"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "var(--primary-color)",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Booking  */}
          <Box>
            <ListItem disablePadding sx={{ display: "block" }}>
              <NavLink
                to={"/dashboardhome/queues"}
                className={({ isActive }) =>
                  isActive ? "active-nav" : "normal-nav"
                }
                onClick={() => {
                  setSubmenu("Booking");
                  setSubMenuActive("HomeContent");
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    width: "90%",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <TollIcon
                      onClick={() => setOpen(!open)}
                      id="NavIcon"
                      style={{
                        fontSize: "28px",
                        margin: "10px 0px",
                        color: "var(--primary-color)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id="NavText"
                    primary="Booking"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
            <Box
              style={{
                display: subManu === "Booking" ? "" : "none",
                background: open ? "var(--primary-color)" : "",
              }}
              className="admin-DashSubManu"
            >
              <Box
                className="admin-DashSubManuChild"
                sx={{ opacity: open ? 1 : 0 }}
              >
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "HomeContent"
                        ? "var(--secondary-color)"
                        : "",
                    color:
                      subManuActive === "HomeContent" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("HomeContent");
                  }}
                >
                  Home Content
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "GroupFare"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "GroupFare" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("GroupFare");
                  }}
                >
                  Group Fare
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Umrah"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "Umrah" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Umrah");
                  }}
                >
                  Umrah
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Tour" ? "var( --secondary-color)" : "",
                    color: subManuActive === "Tour" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Tour");
                  }}
                >
                  Tour
                </NavLink>
                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Others"
                        ? "var( --secondary-color)"
                        : "",
                    color: subManuActive === "Others" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Others");
                  }}
                >
                  Others
                </NavLink>

                <NavLink
                  style={{
                    display: "block",
                    background:
                      subManuActive === "Visa" ? "var( --secondary-color)" : "",
                    color: subManuActive === "Visa" ? "var(--white)" : "",
                  }}
                  onClick={() => {
                    setSubMenuActive("Visa");
                  }}
                >
                  Visa
                </NavLink>
              </Box>
            </Box>
          </Box>

          {/* Payment */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/dashboardhome/admin/addbank"
              className={({ isActive }) =>
                isActive ? "active-nav" : "normal-nav"
              }
              onClick={() => setSubmenu("Payment")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "90%",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PriceCheckIcon
                    id="NavIcon"
                    style={{
                      fontSize: "28px",
                      margin: "10px 0px",
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id="NavText"
                  primary="Payment"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "var(--primary-color)",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Account */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to="/dashboardhome/admin/account"
              className={({ isActive }) =>
                isActive ? "active-nav" : "normal-nav"
              }
              onClick={() => setSubmenu("Account")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "90%",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccountBalanceIcon
                    id="NavIcon"
                    style={{
                      fontSize: "26px",
                      margin: "10px 0px",
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id="NavText"
                  primary="Account"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "var(--primary-color)",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* logout */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active-nav" : "normal-nav"
              }
              to={"/"}
              onClick={() => {
                setSubMenuActive("Logout");
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  width: "90%",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon
                    id="NavIcon"
                    style={{
                      fontSize: "28px",
                      margin: "10px 0px",
                      color: "var(--primary-color)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id="NavText"
                  primary="Logout"
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "var(--primary-color)",
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default AdminDashboardSideBar;
