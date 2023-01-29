import React, { useEffect, useState } from "react";
import { Box, Tab, Button, Grid, Typography, Modal } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import CircularProgress from "@mui/material/CircularProgress";
import addAccount from "../../images/undraw/undraw_credit_card_re_blml.svg";
import invalidInfo from "../../images/undraw/undraw_warning_re_eoyh.svg";

const AdminAddBank = () => {
  const navigate = useNavigate();
  const users = secureLocalStorage.getItem("user-info");
  const [isLoading, setIsLoading] = useState(false);

  let agentId = users?.user?.agentId;
  let staffId = users?.user?.staffId;

  // payment input data post
  const [bankname, setBankname] = useState("");
  const [accname, setAccName] = useState("");
  const [accno, setAccno] = useState("");
  const [branch, setBranch] = useState("");
  const [swift, setSwift] = useState("");
  const [routing, setRouting] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    let body = JSON.stringify({
      agentId,
      bankname,
      accname,
      accno,
      branch,
      swift,
      routing,
      address,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Deposit/addBank.php",

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
        if (data?.status === "success") {
          Swal.fire({
            // icon: "success",
            imageUrl: addAccount,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Bank Account Add Successfully !",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/bankaccount");
          });
        } else {
          Swal.fire({
            // icon: "success",
            imageUrl: invalidInfo,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            text: "Invalid Information",
            confirmButtonColor: "#dc143c",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate("/addbankaccount");
          });
        }
      });

    e.target.reset();
  };
  return (
    <Box>
      <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "30px 0px",
            // gap: 4,
          }}
        >
          <Grid container spacing={2}>
            <Box>
              <Typography
                style={{
                  fontFamily: "poppins",
                  fontWeight: "600px",
                  fontSize: "22px",
                  color: "#222222",
                }}
                mb={0.5}
              >
                Add Bank Accoount
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box className="passengerInput1">
                <Grid container spacing={4}>
                  <Grid item md={4}>
                    <Typography>Account Holder Name</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Your First Name"
                        required
                        onChange={(e) => setAccName(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Bank Name</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Your Last Name"
                        required
                        onChange={(e) => setBankname(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Account Number</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Your Last Name"
                        required
                        onChange={(e) => setAccno(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Branch Name </Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Bangladesh"
                        required
                        onChange={(e) => setBranch(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Address</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Find traveler to auto fill"
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Routing Number</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Your Passport Number"
                        required
                        onChange={(e) => setRouting(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Swift Code</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        type="text"
                        placeholder="Swift Code"
                        required
                        onChange={(e) => setSwift(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Button
                sx={{
                  fontFamily: "poppins",
                  fontWeight: "400",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  borderRadius: "2px",
                  background: "var(--mateBlack)",
                  color: "#FFFFFF",
                  width: "370px",
                  mt: "3rem",
                  "&:hover": {
                    backgroundColor: "var(--mateBlack)",
                  },
                }}
                type="submit"
              >
                {!isLoading ? (
                  "Add This Account"
                ) : (
                  <CircularProgress
                    size="1.5rem"
                    sx={{
                      color: "#fff",
                    }}
                  />
                )}
              </Button>
            </form>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminAddBank;
