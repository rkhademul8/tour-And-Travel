import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import secureLocalStorage from "react-secure-storage";
import useAuthentication from "../../hooks/useAuthentication";
import "./SignIn.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");
  const agentID = user?.user?.agentId;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
  }, [agentID]);

  const rememberUser = secureLocalStorage.getItem("remember");
  const [loginData, setLoginData] = useState({
    email: rememberUser?.email || "",
    password: rememberUser?.password || "",
  });

  const { loginUser, isLoading, error, adminLogin } = useAuthentication();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [checkBox, setCheckBox] = useState(rememberUser?.isChecked);
  const handleCheckBox = (e) => {
    setCheckBox(e.target.checked);
    if (e.target.checked) {
      secureLocalStorage.setItem("remember", {
        email: loginData.email,
        password: loginData.password,
        isChecked: e.target.checked,
      });
    } else {
      secureLocalStorage.removeItem("remember");
    }
  };

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <Box>
      <Container>
        <Box
          sx={{
            width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
            backgroundColor: "var(--white)",
            display: "flex",
            justifyContent: {
              lg: "start",
              md: "start",
              sm: "center",
              xs: "center",
            },
            alignItems: "center",
            cursor: "pointer",
            overflow: "hidden",
            marginTop: "20px",
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            style={{
              color: "var(--primary-color)",
              fontSize: "23px",
              fontWeight: "600",
            }}
          >
            <span style={{ color: "var(--secondary-color)" }}>Ticket</span>
            Factory
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          width: "100vw",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Box sx={{ textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <Typography
                  style={{
                    color: "var(--black)",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  Sign In
                </Typography>
              </Box>
              <input
                className="email"
                placeholder="Enter Your Email"
                value={loginData.email}
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={handleOnChange}
                sx={{
                  width: "100%",
                  borderRadius: "3px",
                }}
              />
              <br></br>
              <br></br>
              <FormControl>
                <Box
                  position={"relative"}
                  display="flex"
                  justifyContent={"flex-end"}
                  alignItems="center"
                >
                  <input
                    className="email"
                    placeholder="Enter Your Password"
                    required
                    name="password"
                    id="password-label"
                    value={loginData.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleOnChange}
                    sx={{
                      width: "460px",
                      borderRadius: "3px",
                    }}
                  />
                  <Box
                    position={"absolute"}
                    onClick={handleClickShowPassword}
                    mt="7px"
                    mr="5px"
                  >
                    {showPassword ? (
                      <Visibility className="fonticon09" />
                    ) : (
                      <VisibilityOff className="fonticon09" />
                    )}
                  </Box>
                </Box>
              </FormControl>
              <br />
              <Box className="pass-forget">
                <Box margin="5px 1px 0px 1px" fontSize={"8px"}>
                  <FormGroup>
                    <FormControlLabel
                      sx={{ color: "var(--primary-color)" }}
                      control={
                        rememberUser?.isChecked === true ? (
                          <Checkbox defaultChecked onChange={handleCheckBox} />
                        ) : (
                          <Checkbox onChange={handleCheckBox} />
                        )
                      }
                      label="Remember"
                    />
                  </FormGroup>
                </Box>
                <Box>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/resetpassword"
                  >
                    <Typography
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "16px",
                      }}
                    >
                      Forget Password ?
                    </Typography>
                  </NavLink>
                </Box>
              </Box>
              <br></br>
              <Box className="login-btn">
                <Button
                  type="submit"
                  onClick={() => {
                    loginUser(loginData, location, navigate);
                    adminLogin(loginData, location, navigate);
                  }}
                  disabled={!isLoading ? true : false}
                  style={{
                    width: "100%",
                    height: "35px",
                    background: "var(--primary-color)",
                    color: "var(--white)",
                  }}
                >
                  {isLoading ? (
                    "Log In"
                  ) : (
                    <CircularProgress
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                  )}
                </Button>
              </Box>
            </form>
          </Box>
          <Box mt={1}>
            <h5>
              <Box>
                {error && (
                  <Alert
                    severity="error"
                    style={{
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    <AlertTitle color="red" m={0} p={0}>
                      Error !
                    </AlertTitle>{" "}
                    <strong textAlign={"center"}>{error} !</strong>
                  </Alert>
                )}
              </Box>
              <Typography style={{ color: "var(--primary-color)" }}>
                Don't have an account?
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{ color: "var(--secondary-color)" }}
                >
                  Register Now
                </Button>
              </Typography>
            </h5>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default SignIn;
