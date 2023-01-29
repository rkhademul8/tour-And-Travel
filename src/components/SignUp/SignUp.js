import { Box, Button, CircularProgress, Grid, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AccCreated from "../../images/undraw/undraw_happy_announcement_re_tsm0.svg";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import "./SingUp.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [complete, setComplete] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [companyname, setCompanyName] = useState("");
  const [companyaddress, setCompanyAddress] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isError, setError] = useState(false);
  const [isErrorNum, setErrorNum] = useState(false);
  const [state, setState] = useState({
    password: "",
    cPassword: "",
  });
  const [passMatch, setPassMatch] = useState(true);
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const validatePassword = () => {
    if (!checked && state.password === state.cPassword) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  useEffect(() => {
    validatePassword();
  }, [state]);

  const registerinput = {
    fname: fname,
    lname: lname,
    contactpersonphonenumber: contactNumber,
    contactpersonemail: email,
    password: state.password,
    companyname: companyname,
    companyaddress: companyaddress,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //console.log(JSON.stringify(registerinput));
    fetch("https://api.flyfarint.com/v.1.0.0/Auth/registration.php", {
      method: "POST",
      body: JSON.stringify(registerinput),
    })
      .then((res) => res.json())
      .then((registeredData) => {
        //console.log(registeredData);
        if (registeredData.status === "success") {
          setComplete(true);
          setIsLoading(false);
          Swal.fire({
            imageUrl: AccCreated,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Account Created Successfully!",
            html: `Thank You <strong>${registerinput.fname} ${registerinput.lname}.</strong> Your Agent Account: <strong>${registerinput.companyname}</strong> is Successfully Created.Your Account will be Active within 24 Hours.If you do not receive any email, please contact us at <strong>support@flyfarint.com</strong> or <strong>01755-572099, 09606912912.</strong>`,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/");
          });
        } else {
          setComplete(true);
          setIsLoading(false);
          fetch(
            "https://api.flyfarint.com/v.1.0.0/Auth/RegistrationFailed.php",
            {
              method: "POST",
              body: JSON.stringify(registerinput),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setComplete(true);
              setIsLoading(false);
              Swal.fire({
                imageUrl: Invalid,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                title: registeredData.message,
                html: "<strong>Travel Agency Registration Failed, Please contact us at support@flyfarint.com or 01755-572099, 09606912912.</strong>",
                confirmButtonText: "Please Try Again!",
                confirmButtonColor: "var(--primary-color)",
              }).then(function () {
                navigate("/");
              });
            });
        }
      })
      .catch((err) => {
        fetch("https://api.flyfarint.com/v.1.0.0/Auth/RegistrationFailed.php", {
          method: "POST",
          body: JSON.stringify(registerinput),
        })
          .then((res) => res.json())
          .then((data) => {
            setComplete(true);
            setIsLoading(false);
            Swal.fire({
              imageUrl: ServerDown,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
              title: "Server Down",
              html: "<strong>Please contact us at support@flyfarint.com or 01755-572099, 09606912912.</strong>",
              confirmButtonColor: "var(--primary-color)",
              confirmButtonText: "Please Try Again!",
            }).then(function () {
              navigate("/");
            });
          });
      });
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
            <span style={{ color: "var(--secondary-color)" }}>FFTWL </span> alpha
          </Typography>
        </Box>

        <Box
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box className="register-Box">
            <Box className="regiter-content">
              <h2>Sign Up</h2>
            </Box>

            <form onSubmit={handleSubmit} autocomplete="off">
              <Box>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box className="signUp">
                      <input
                        required
                        type="text"
                        id="fname"
                        maxLength={20}
                        placeholder="First Name"
                        name="fname"
                        value={fname}
                        autocomplete="off"
                        onChange={(e) => {
                          const result = e.target.value;
                          setFname(result);
                        }}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                    </Box>
                  </Grid>


                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box className="signUp">
                      <input
                        required
                        type="text"
                        id="lname"
                        name="lname"
                        maxLength={20}
                        placeholder="Last Name"
                        autocomplete="off"
                        onChange={(e) => {
                          const result = e.target.value;
                          setLname(result);
                        }}
                        value={lname}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box className="signUp">
                      <input
                        required
                        type="text"
                        id="companyname"
                        placeholder="Company Name"
                        name="companyname"
                        autocomplete="off"
                        onChange={(e) => {
                          const result = e.target.value;
                          setCompanyName(result);
                        }}
                        value={companyname}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box className="signUp">
                      <input
                        required
                        id="companyaddress"
                        type="text"
                        placeholder="Company Address"
                        name="companyaddress"
                        autoComplete="off"
                        onChange={(e) => setCompanyAddress(e.target.value)}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="input-field"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box className="signUp">
                      <input
                        required
                        type="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    // className="input-field"
                    sx={{
                      paddingTop: "15px !important",
                    }}
                  >
                    <Box
                      style={{
                        background: "rgba(255, 168, 77, 0.25)",
                        height: "38px",
                      }}
                    >
                      <PhoneInput
                        required
                        country={"bd"}
                        placeholder="Contact Number"
                        id="contactNumber"
                        name="contactpersonphonenumber"
                        value={contactNumber}
                        onChange={(phone) => {
                          setContactNumber(phone);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="input-field password-00"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box
                      position={"relative"}
                      display="flex"
                      alignItems="center"
                      className="signUp"
                    >
                      <input
                        required
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password "
                        autocomplete="current-password"
                        id="password"
                        value={state.password}
                        onChange={handleChange}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                      <Box
                        position={"absolute"}
                        onClick={handleClickShowPassword}
                        mt="7px"
                        right="20px"
                      >
                        {showPassword ? (
                          <Visibility className="fonticon09" />
                        ) : (
                          <VisibilityOff className="fonticon09" />
                        )}
                      </Box>
                    </Box>
                    <Box
                      pl={1}
                      color="red"
                      style={{ fontSize: "14px" }}
                      margin="10px 0px"
                    >
                      {state.password.length < 8
                        ? "*Password at least 8 characters"
                        : null}
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    className="input-field password-00"
                    sx={{ paddingTop: "15px !important" }}
                  >
                    <Box
                      position={"relative"}
                      display="flex"
                      alignItems="center"
                      className="signUp"
                    >
                      <input
                        required
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password "
                        id="cPassword"
                        value={state.cPassword}
                        onChange={handleChange}
                        style={{
                          borderRadius: "3px",
                          background: "rgba(255, 168, 77, 0.25)",
                        }}
                      />
                      <Box
                        position={"absolute"}
                        onClick={handleClickShowPassword}
                        mt="7px"
                        right="20px"
                      >
                        {showPassword ? (
                          <Visibility className="fonticon09" />
                        ) : (
                          <VisibilityOff className="fonticon09" />
                        )}
                      </Box>
                    </Box>
                    <Box color="red">
                      {state.password === state.cPassword
                        ? ""
                        : "Passwords do not match"}
                    </Box>
                  </Grid>

                  <br />
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  margin="15px 5px"
                  fontSize={"10px"}
                >
                  <FormGroup>
                    <FormControlLabel
                      sx={{ color: "var(--primary-color)" }}
                      type="checkbox"
                      control={
                        <Checkbox
                          checked={checked}
                          onClick={() => setChecked((prev) => !prev)}
                        />
                      }
                      label="Agree Terms and Conditions"
                    />
                  </FormGroup>
                  <Link
                    style={{ color: "var(--primary-color)", fontSize: "15px" }}
                    href="/terms"
                    target="_blank"
                    variant="caption text"
                  >
                    Terms & Condition
                  </Link>
                </Box>
                {checked && state.password === state.cPassword ? (
                  <Box className="register-btnn">
                    <Button type="submit" disabled={!isLoading ? false : true}>
                      {!isLoading ? (
                        "Register"
                      ) : (
                        <CircularProgress
                          style={{ height: "10px", widht: "10px" }}
                        />
                      )}
                    </Button>
                  </Box>
                ) : (
                  <Box className="register-btnn">
                    <Button type="submit" disabled>
                      {!isLoading ? (
                        "Register"
                      ) : (
                        <CircularProgress
                          style={{ height: "10px", widht: "10px" }}
                        />
                      )}
                    </Button>
                  </Box>
                )}
              </Box>
            </form>

            <Box className="register-footer" margin="auto" mt={2}>
              <h5>
                Already have an account?
                <button
                  onClick={() => {
                    navigate("/signin");
                  }}
                >
                  Login Now
                </button>
              </h5>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default SignUp;
