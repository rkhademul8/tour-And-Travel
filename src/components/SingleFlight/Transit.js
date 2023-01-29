/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { Box, Button, Grid, Tab, Tabs, Container } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--gray)",
    maxWidth: 300,
    padding: "10px",
  },
}));


const Transit = ({ flightData }) => {
  return (
    <Box textAlign={"center"} padding="0px 7px">
      <Typography>
        {flightData?.segment === "3" ? (
          <HtmlTooltip
            title={
              <React.Fragment>
                <Box display="flex">
                  <Box borderRight="2px solid var(--primary-color)" px={1}>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "10px",
                        textAlign: "center",
                      }}
                    >
                      Transit: {flightData?.transit?.transit1} <br />
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {flightData?.segments[1].departure}{" "}
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "10px",
                      }}
                    >
                      {flightData?.segments[1]?.departureLocation} <br />
                      {flightData?.segments[1]?.marketingcareer}{" "}
                      {flightData?.segments[1]?.marketingflight}
                      {" & "}
                      {flightData?.segments[1]?.flightduration}
                      <br />
                      {format(
                        new Date(
                          flightData?.segments[1]?.departureTime?.toString()
                        ),
                        "dd MMM yyyy hh:mm a"
                      )}
                    </Typography>
                  </Box>

                  <Box px={1}>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "10px",
                        textAlign: "center",
                      }}
                    >
                      Transit: {flightData?.transit?.transit2} <br />
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {flightData?.segments[2].departure}{" "}
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--primary-color)",
                        fontSize: "10px",
                      }}
                    >
                      {flightData?.segments[2]?.departureLocation} <br />
                      {flightData?.segments[2]?.marketingcareer}{" "}
                      {flightData?.segments[2]?.marketingflight}
                      {" & "}
                      {flightData?.segments[2]?.flightduration}
                      <br />
                      {format(
                        new Date(
                          flightData?.segments[2]?.departureTime?.toString()
                        ),
                        "dd MMM yyyy hh:mm a"
                      )}
                    </Typography>
                  </Box>
                </Box>
              </React.Fragment>
            }
            followCursor
          >
            <Box>
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "12px",
                    sm: "10px",
                    md: "12px",
                  },
                }}
              >
                {flightData?.segments[0].flightduration} |{" "}
                {flightData?.segments[1].flightduration} |{" "}
                {flightData?.segments[2].flightduration}
              </Typography>
              <Box className="stop-bar-parent">
                <CircleIcon sx={{ color: "var(--gray)", fontSize: "15px" }} />
                <CircleIcon
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "12px",
                  }}
                />
                <CircleIcon
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "12px",
                  }}
                />
                <CircleIcon sx={{ color: "var(--gray)", fontSize: "15px" }} />
                <Box className="stop-bar-line"></Box>
              </Box>
              <Typography
                sx={{
                  color: "var(--third-color)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "12px",
                    sm: "10px",
                    md: "12px",
                  },
                }}
              >
                2 STOP
              </Typography>
            </Box>
          </HtmlTooltip>
        ) : flightData?.segment === "2" ? (
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  Transit: {flightData?.transit?.transit1} <br />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {flightData?.segments[1].departure}{" "}
                  </span>
                </Typography>

                <Typography
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "10px",
                  }}
                >
                  {flightData?.segments[1]?.departureLocation} <br />
                  {flightData?.segments[1]?.marketingcareer}{" "}
                  {flightData?.segments[1]?.marketingflight}
                  {" & "}
                  {flightData?.segments[1]?.flightduration}
                  <br />
                  {format(
                    new Date(
                      flightData?.segments[1]?.departureTime?.toString()
                    ),
                    "dd MMM yyyy hh:mm a"
                  )}
                  <br />
                </Typography>
              </React.Fragment>
            }
            followCursor
          >
            <Box>
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "12px",
                    sm: "10px",
                    md: "12px",
                  },
                }}
              >
                {flightData?.segments[0].flightduration} |{" "}
                {flightData?.segments[1].flightduration}
              </Typography>
              <Box className="stop-bar-parent">
                <CircleIcon sx={{ color: "var(--gray)", fontSize: "15px" }} />
                <CircleIcon
                  sx={{
                    color: "var(--primary-color)",
                    fontSize: "12px",
                  }}
                />

                <CircleIcon sx={{ color: "var(--gray)", fontSize: "15px" }} />
                <Box className="stop-bar-line"></Box>
              </Box>
              <Typography
                sx={{
                  color: "var(--third-color)",
                  fontWeight: 500,
                  fontSize: {
                    xs: "12px",
                    sm: "10px",
                    md: "12px",
                  },
                }}
              >
                1 STOP
              </Typography>
            </Box>
          </HtmlTooltip>
        ) : (
          <Box>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontWeight: 500,
                fontSize: {
                  xs: "12px",
                  sm: "10px",
                  md: "12px",
                },
              }}
            >
              {flightData?.segments[0].flightduration}
            </Typography>
            <Box className="stop-bar-parent">
              <CircleIcon sx={{ color: "var(--gray)", fontSize: "15px" }} />
              <Box className="stop-bar-line"></Box>
              <CircleIcon sx={{ color: "var(--gray)", fontSize: "15px" }} />
            </Box>
            <Typography
              sx={{
                color: "var(--third-color)",
                fontWeight: 500,
                fontSize: {
                  xs: "12px",
                  sm: "10px",
                  md: "12px",
                },
              }}
            >
              NO STOP
            </Typography>
          </Box>
        )}
      </Typography>
    </Box>
  );
};

export default Transit;
