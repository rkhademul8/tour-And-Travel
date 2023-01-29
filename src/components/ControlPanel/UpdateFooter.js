import {
  Box,
  Button,
  CircularProgress,
  Grid,
  sliderClasses,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";

export const UpdateFooter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState("");
  const [address, setAddress] = useState("");
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
        setAboutUs(res?.data?.about_us?.slice(0, 250));
        setAddress(res?.data?.address);
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
        if (data.status.toLowerCase() === "success") {
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
        sx={{ margin: "30px 0px 100px" }}
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
            Footer
          </Typography>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Box
            sx={{
              width: "80%",
              height: "fit-content",
            }}
          >
            <label
              htmlFor="about-us"
              style={{
                fontSize: "14px",
                fontWeight: "600px",
                color: "var(--secondary-color)",
                margin: "0px 0px 10px 10px",
              }}
            >
              Short About us(250 Character)
            </label>
            <TextareaAutosize
              name="aboutUsText"
              id="about-us"
              value={aboutUs}
              onChange={(e) => setAboutUs(e.target.value)}
              minRows={3}
              maxRows={3}
              placeholder="Write About Us..."
              style={{
                width: "calc(100% - 10px)",
                outline: "none",
                border: "none",
                paddingLeft: "10px",
                backgroundColor: "var(--input-bgcolor)",
                borderRadius: "5px",
              }}
            />
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
                  margin: "5px 0px",
                }}
                onClick={() => updateData("aboutus", aboutUs)}
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
        <Grid item md={6} sm={12} xs={12}>
          <Box
            sx={{
              width: "80%",
              height: "fit-content",
            }}
          >
            <label
              htmlFor="address"
              style={{
                fontSize: "14px",
                fontWeight: "600px",
                color: "var(--secondary-color)",
                margin: "0px 0px 10px 10px",
              }}
            >
              Address
            </label>
            <TextareaAutosize
              name="addressText"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              minRows={3}
              maxRows={3}
              placeholder="Write Address..."
              style={{
                width: "calc(100% - 10px)",
                outline: "none",
                border: "none",
                paddingLeft: "10px",
                backgroundColor: "var(--input-bgcolor)",
                borderRadius: "5px",
              }}
            />
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
                onClick={() => updateData("address", address)}
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
