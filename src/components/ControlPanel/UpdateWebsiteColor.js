import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";

export const UpdateWebsiteColor = () => {
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [siteConfig, setSiteConfig] = useState({});
  const cdn = "https://cdn.flyfarint.com/";
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
        setPrimaryColor(res?.data?.primary_color);
        setSecondaryColor(res?.data?.secondary_color);
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
      <Grid container sx={{ margin: "30px 0px 10px" }} columnSpacing={1}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            sx={{
              color: "var(--black)",
              fontSize: "calc(16px + 0.390625vw)",
              fontWeight: 400,
            }}
          >
            Website Color
          </Typography>
        </Grid>
        {/* //todo: Left Section */}
        <Grid item md={5} sm={6} xs={6}>
          <Box
            sx={{
              width: "100%",
              height: { md: "150px", sm: "150px", xs: "150px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* //todo:primary color input */}
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
              <Box
                sx={{
                  width: "100%",
                  height: { md: "50%", sm: "50%", xs: "50%" },
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 5px",
                  gap: "10px",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    width: "80%",
                    height: "30px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  Primary Color:{primaryColor}
                </Typography>
                <Box sx={{ width: "20%", height: "30px" }}>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                    }}
                    style={{
                      outline: "none",
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </Box>
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
                  onClick={() => updateData("primarycolor", primaryColor)}
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    "Save"
                  )}
                </Button>
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
                  onClick={() => updateData("primarycolor", "#ffa84d")}
                >
                  Reset
                </Button>
              </Box>
            </Box>
            {/* //todo:second input */}
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
              <Box
                sx={{
                  width: "100%",
                  height: { md: "50%", sm: "50%", xs: "50%" },
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 5px",
                  gap: "10px",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    width: "80%",
                    height: "30px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  Secondary Color:{secondaryColor}
                </Typography>
                <Box sx={{ width: "20%", height: "30px" }}>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                    }}
                    style={{
                      outline: "none",
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </Box>
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
                  onClick={() => updateData("secondarycolor", secondaryColor)}
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    "Save"
                  )}
                </Button>
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
                  onClick={() => updateData("secondarycolor", "#2564b8")}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* //todo: Right Section */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "fit-content",
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: { md: "100px", sm: "100px", xs: "100px" },
                  background: "var(--primary-color)",
                }}
              ></Box>
              <Typography>Primary</Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "fit-content",
                  height: { md: "150px", sm: "150px", xs: "150px" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    width: "100px",
                    height: { md: "100px", sm: "100px", xs: "100px" },
                    background: "var(--secondary-color)",
                  }}
                ></Box>
                <Typography>Secondary</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
