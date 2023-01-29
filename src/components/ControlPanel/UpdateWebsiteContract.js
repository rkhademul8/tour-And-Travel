import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";

export const UpdateWebsiteContract = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [wpNumber, setWpNumber] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [siteConfig, setSiteConfig] = useState({});
  useEffect(() => {
    //todo: fetching the data
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => {
        setSiteConfig(res?.data);
        setAgentId(res?.data?.agentId);
        setEmail(res?.data?.email);
        setPhone(res?.data?.phone);
        setFbLink(res?.data?.fb_link);
        setWpNumber(res?.data?.whatsapp_num);
        setLinkedInLink(res?.data?.linkedin_link);
      });
  }, []);

  //todo: update Text field
  const updateData = async (name, value) => {
    setIsLoading(true);
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/add.php?option=${name}&agentId=${agentId}`;
    const body = {
      method: "POST",
      "application-type": "application/json",
      body: JSON.stringify({
        data: value,
      }),
    };
    await fetch(url, body)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status === "Success") {
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err.message,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(function () {
          caches
            .keys()
            .then((keyList) =>
              Promise.all(keyList.map((key) => caches.delete(key)))
            );
          window.location.reload(true);
        });
      });
  };

  return (
    <Box>
      <Grid
        container
        sx={{ margin: "30px 0px 30px" }}
        columnSpacing={1}
        rowSpacing={1}
      >
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            sx={{
              color: "var(--black)",
              fontSize: "calc(16px + 0.390625vw)",
              fontWeight: 400,
            }}
          >
            Contact
          </Typography>
        </Grid>
        {/* //todo:Enter Email input */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: { md: "50%", sm: "50%", xs: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "80%", height: "40px" }}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                style={{
                  outline: "none",
                  border: "none",
                  width: "calc(100% - 20px)",
                  height: "100%",
                  padding: "0px 10px 0px 10px",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => updateData("email", email)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* //todo:Enter Phone Number Input */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: { md: "50%", sm: "50%", xs: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "80%", height: "40px" }}>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
                style={{
                  outline: "none",
                  border: "none",
                  width: "calc(100% - 20px)",
                  height: "100%",
                  padding: "0px 10px 0px 10px",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => updateData("phone", phone)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* //todo:Enter Facebook Link Input */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: { md: "50%", sm: "50%", xs: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "80%", height: "40px" }}>
              <input
                type="text"
                name="fbLink"
                value={fbLink}
                onChange={(e) => {
                  setFbLink(e.target.value);
                }}
                style={{
                  outline: "none",
                  border: "none",
                  width: "calc(100% - 20px)",
                  height: "100%",
                  padding: "0px 10px 0px 10px",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => updateData("fblink", fbLink)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* //todo: Enter Whatsapp Link Input */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: { md: "50%", sm: "50%", xs: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "80%", height: "40px" }}>
              <input
                type="text"
                name="wpNumber"
                value={wpNumber}
                onChange={(e) => setWpNumber(e.target.value)}
                placeholder="Enter Whatsapp Link"
                style={{
                  outline: "none",
                  width: "calc(100% - 20px)",
                  height: "100%",
                  padding: "0px 10px 0px 10px",
                  border: "none",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => updateData("whatsappnum", wpNumber)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* //todo: Enter LinkedIn Link */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: { md: "50%", sm: "50%", xs: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "80%", height: "40px" }}>
              <input
                type="text"
                name="linkedInLinK"
                value={linkedInLink}
                onChange={(e) => setLinkedInLink(e.target.value)}
                placeholder="Enter LinkedIn Link"
                style={{
                  outline: "none",
                  width: "calc(100% - 20px)",
                  height: "100%",
                  padding: "0px 10px 0px 10px",
                  border: "none",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => updateData("linkedinlink", linkedInLink)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
