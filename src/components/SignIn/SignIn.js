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
    loginUser(loginData, location, navigate);
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
            <span style={{ color: "var(--secondary-color)" }}>Travel</span>
            Factory
          </Typography>
        </Box>
        <Box
          sx={{
            width: { md: "50%" },
            margin: "20px auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container rowGap="10px">
              <Grid item md={12} sm={12} xs={12}>
                <Box
                  my={2}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{
                      color: "var(--secondary-color)",
                      fontSize: "30px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Sign In
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <input
                  placeholder="Enter Your Email"
                  value={loginData.email}
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={handleOnChange}
                  style={{
                    height: "40px",
                    width: "calc(100% - 20px)",
                    border: "none",
                    outline: "none",
                    borderRadius: "5px",
                    padding: "0px 10px",
                    color: "var(--secondary-color)",
                    backgroundColor: "rgba(var(--primary-rgb),0.4)",
                    fontSize: "16px",
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Box sx={{ position: "relative" }}>
                  <input
                    placeholder="Enter Your Password"
                    required
                    name="password"
                    value={loginData.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleOnChange}
                    style={{
                      height: "40px",
                      width: "calc(100% - 20px)",
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                      padding: "0px 10px",
                      color: "var(--secondary-color)",
                      backgroundColor: "rgba(var(--primary-rgb),0.4)",
                      fontSize: "16px",
                    }}
                  />
                  <Box
                    onClick={handleClickShowPassword}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "5px",
                      transform: "translate(0,-50%)",
                    }}
                  >
                    {showPassword ? (
                      <Visibility className="fonticon09" />
                    ) : (
                      <VisibilityOff className="fonticon09" />
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <FormGroup>
                  <FormControlLabel
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
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Box>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/resetpassword"
                  >
                    <Typography
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "16px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Forget Password ?
                    </Typography>
                  </NavLink>
                </Box>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Button
                  type="submit"
                  disabled={!isLoading ? true : false}
                  sx={{
                    width: "100%",
                    height: "40px",
                    background: "var(--primary-color)",
                    color: "var(--white)",
                    "&:hover": {
                      background: "var(--primary-color)",
                      color: "var(--white)",
                    },
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
              </Grid>
            </Grid>
            <Box mt={1}>
              <Box>
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
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default SignIn;
