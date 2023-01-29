import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Container,
} from "@mui/material";
import commaNumber from "comma-number";
import { useEffect, useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import { styled } from "@mui/material/styles";
import seat from "../../images/Icon/bag.svg";
import bag from "../../images/Icon/seat.svg";
import toimg from "../../images/Icon/to.svg";
import FlightIcon from "@mui/icons-material/Flight";
import { useNavigate } from "react-router-dom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "crimson",
    maxWidth: 220,
    fontSize: "5px",
    borderRadius: "8px 0px 8px 0px",
  },
}));

const GroupFare = ({ data }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const price = parseInt(data.price);
  const clientPrice = price + price * 0.07;
  const commisionFarePrice = clientPrice - price;

  const [flightDetails, setFlightDetails] = useState(false);

  const FlightInformation = () => {
    navigate("/dashboard/groupfinfo", {
      state: {
        data,
      },
    });
  };

  return (
    <Box
      borderRadius={"8px"}
      boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
    >
      <Grid container mb={2}>
        <Grid lg={3} p={2}>
          <Grid container>
            <Grid item width="70px" height="70px">
              <img
                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data.career}.png`}
                alt="img-not-found"
                className="flight-icon-sab1"
              />
            </Grid>
            <Grid item pl={1}>
              <Typography
                sx={{
                  color: "#DC143C",
                  fontWeight: 500,
                  fontSize: {
                    xs: "12px",
                    sm: "10px",
                    md: "14px",
                    lg: "15px",
                  },
                }}
              >
                {data?.segment === "3" ? (
                  <>
                    {data.career === data.segments[0]?.marketingcareer &&
                    data.career === data.segments[1]?.marketingcareer &&
                    data.career === data.segments[2]?.marketingcareer ? (
                      <>{data?.careerName}</>
                    ) : data.segments[0]?.marketingcareer !==
                        data.segments[1]?.marketingcareer &&
                      data.segments[1]?.marketingcareer ===
                        data.segments[2]?.marketingcareer ? (
                      <>
                        {data?.segments[0]?.marketingcareerName}
                        <br />
                        {data?.segments[1]?.marketingcareerName}
                      </>
                    ) : data.segments[0]?.marketingcareer ===
                        data.segments[1]?.marketingcareer &&
                      data.segments[1]?.marketingcareer !==
                        data.segments[2]?.marketingcareer ? (
                      <>
                        {" "}
                        {data?.careerName}
                        <br />
                        {data?.segments[2]?.marketingcareerName}
                      </>
                    ) : (
                      <>
                        {data?.segments[0]?.marketingcareerName} <br />
                        {data?.segments[1]?.marketingcareerName} <br />
                        {data?.segments[2]?.marketingcareerName}
                      </>
                    )}
                  </>
                ) : data?.segment === "2" &&
                  data?.segments[0]?.marketingcareerName ===
                    data?.segments[1]?.marketingcareerName ? (
                  <>{data?.careerName}</>
                ) : data?.segment === "2" &&
                  data?.segments[0]?.marketingcareerName !==
                    data?.segments[1]?.marketingcareerName ? (
                  <>
                    {data?.segments[0]?.marketingcareerName}
                    {data?.segments[1]?.marketingcareerName}
                  </>
                ) : (
                  <>{data?.careerName}</>
                )}
              </Typography>
              <Typography
                sx={{
                  color: "#003566",
                  fontWeight: 500,
                  fontSize: {
                    xs: "12px",
                    sm: "10px",
                    md: "12px",
                    lg: "12px",
                  },
                }}
              >
                {data?.segment === "3" ? (
                  <>
                    {data?.segments[0]?.marketingcareer}&nbsp;
                    {data?.segments[0]?.marketingflight}&nbsp;
                    {data?.segments[1]?.marketingcareer}&nbsp;
                    {data?.segments[1]?.marketingflight}&nbsp; <br />
                    {data?.segments[2]?.marketingcareer}&nbsp;
                    {data?.segments[2]?.marketingflight}
                  </>
                ) : data?.segment === "2" ? (
                  <>
                    {data?.segments[0]?.marketingcareer}&nbsp;
                    {data?.segments[0]?.marketingflight}&nbsp;
                    {data?.segments[1]?.marketingcareer}&nbsp;
                    {data?.segments[1]?.marketingflight}
                  </>
                ) : (
                  <>
                    {data?.segments[0]?.marketingcareer}&nbsp;
                    {data?.segments[0]?.marketingflight}
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={6} p={2}>
          <Grid container>
            <Grid lg={12}>
              <Grid container justifyContent={"space-between"}>
                <Grid md={4}>
                  <Box>
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "15px",
                          lg: "16px",
                        },
                      }}
                    >
                      {data?.departure}
                      <span> - </span>

                      {data?.departureTime.length > 5
                        ? `${
                            new Date(data?.departureTime)
                              .toTimeString()
                              ?.split(":")[0]
                          }:${
                            new Date(data?.departureTime)
                              .toTimeString()
                              ?.split(":")[1]
                          }`
                        : `${data?.departureTime?.split(":")[0]}:${
                            data?.departureTime?.split(":")[1]
                          }`}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#003566",
                        fontWeight: 600,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      {data?.segments[0]?.departureLocation}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      {data?.departureDate}
                    </Typography>
                  </Box>
                </Grid>

                <Grid md={4}>
                  <Box textAlign={"center"}>
                    <Typography>
                      {/* ---------stops------ */}

                      {data?.segment === "3" ? (
                        <Box>
                          <Grid container justifyContent="center">
                            <Typography
                              sx={{
                                color: "#003566",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                  sm: "10px",
                                  md: "12px",
                                },
                              }}
                            >
                              {data?.flightduration} |&nbsp;
                            </Typography>
                            <Typography
                              sx={{
                                color: "#DC143C",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                  sm: "11px",
                                  md: "12px",
                                },
                              }}
                            >
                              Two Stops
                            </Typography>
                          </Grid>
                          <Box px={1}>
                            <div className="segment03">
                              <div className="segment-circle">
                                <div className="circle-0">
                                  <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {data?.departure}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    followCursor
                                  >
                                    <span>
                                      <CircleIcon
                                        sx={{
                                          color: "#c7c7c7",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </span>
                                  </HtmlTooltip>
                                </div>
                                <div className="segment-stop"></div>
                                <div className="segment-stop"></div>
                                <div className="circle-0">
                                  <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {data?.arrival}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    followCursor
                                  >
                                    <span>
                                      <CircleIcon
                                        sx={{
                                          color: "#c7c7c7",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </span>
                                  </HtmlTooltip>
                                </div>
                              </div>
                              <div className="segment-flight03">
                                <FlightIcon />
                              </div>
                            </div>
                          </Box>
                          <Typography className="arival-seg-3">
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography
                                    sx={{
                                      color: "#fff",
                                      fontSize: "10px",
                                    }}
                                  >
                                    <span style={{ fontSize: "12px" }}>
                                      {
                                        data?.segments[0]?.arrivalLocation?.split(
                                          ","
                                        )[0]
                                      }
                                    </span>
                                    <br />
                                    {data?.segments[1]?.marketingcareer}
                                    &nbsp;
                                    {data?.segments[1]?.marketingflight}{" "}
                                    <span> | </span>
                                    {data?.segments[1]?.flightduration}
                                  </Typography>
                                </React.Fragment>
                              }
                              followCursor
                            >
                              <Box className="arival-text">
                                {data?.segments[0]?.arrival}
                              </Box>
                            </HtmlTooltip>
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography
                                    sx={{
                                      color: "#fff",
                                      fontSize: "10px",
                                    }}
                                  >
                                    <span style={{ fontSize: "12px" }}>
                                      {
                                        data?.segments[1]?.arrivalLocation?.split(
                                          ","
                                        )[0]
                                      }
                                    </span>
                                    <br />
                                    {data?.segments[2]?.marketingcareer}
                                    &nbsp;
                                    {data?.segments[2]?.marketingflight}
                                    <span> | </span>
                                    {data?.segments[2]?.flightduration}
                                  </Typography>
                                </React.Fragment>
                              }
                              followCursor
                            >
                              <Box className="arival-text">
                                {" "}
                                {data?.segments[1]?.arrival}
                              </Box>
                            </HtmlTooltip>
                          </Typography>
                        </Box>
                      ) : data?.segment === "2" ? (
                        <Box>
                          <Grid container justifyContent="center">
                            {" "}
                            <Typography
                              sx={{
                                color: "#003566",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                  sm: "10px",
                                  md: "12px",
                                },
                              }}
                            >
                              {data?.flightduration} |&nbsp;
                            </Typography>
                            <Typography
                              sx={{
                                color: "#DC143C",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                  sm: "11px",
                                  md: "12px",
                                },
                              }}
                            >
                              One Stops
                            </Typography>
                          </Grid>
                          <Box px={1}>
                            <div className="segment02">
                              <div className="segment-circle">
                                <div className="circle-0">
                                  <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {data?.departure}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    followCursor
                                  >
                                    <span>
                                      <CircleIcon
                                        sx={{
                                          color: "#c7c7c7",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </span>
                                  </HtmlTooltip>
                                </div>
                                <div className="segment-stop"></div>
                                <div className="circle-0">
                                  <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {data?.arrival}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    followCursor
                                  >
                                    <span>
                                      <CircleIcon
                                        sx={{
                                          color: "#c7c7c7",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </span>
                                  </HtmlTooltip>
                                </div>
                              </div>
                              <div className="segment-flight02">
                                <FlightIcon />
                              </div>
                            </div>
                          </Box>
                          <Typography className="arival-seg2">
                            <HtmlTooltip
                              title={
                                <React.Fragment>
                                  <Typography
                                    sx={{
                                      color: "#fff",
                                      fontSize: "10px",
                                    }}
                                  >
                                    <span style={{ fontSize: "12px" }}>
                                      {
                                        data?.segments[0]?.arrivalLocation?.split(
                                          ","
                                        )[0]
                                      }{" "}
                                    </span>
                                    <br />
                                    {data?.segments[1]?.marketingcareer}
                                    &nbsp;
                                    {data?.segments[1]?.marketingflight}
                                    <span> | </span>
                                    {data?.segments[1]?.flightduration}
                                  </Typography>
                                </React.Fragment>
                              }
                              followCursor
                            >
                              <Box className="arival-text2">
                                {data?.segments[0]?.arrival}
                              </Box>
                            </HtmlTooltip>
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Grid container justifyContent="center">
                            {" "}
                            <Typography
                              sx={{
                                color: "#003566",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                  sm: "10px",
                                  md: "12px",
                                },
                              }}
                            >
                              {data?.flightduration} |&nbsp;
                            </Typography>
                            <Typography
                              sx={{
                                color: "#DC143C",
                                fontWeight: 500,
                                fontSize: {
                                  xs: "12px",
                                  sm: "10px",
                                  md: "12px",
                                },
                              }}
                            >
                              Non Stops
                            </Typography>
                          </Grid>
                          <Box px={1}>
                            <div className="segment-1">
                              <div className="segment-circle">
                                <div className="circle-0">
                                  <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {data?.departure}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    followCursor
                                  >
                                    <span>
                                      <CircleIcon
                                        sx={{
                                          color: "#c7c7c7",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </span>
                                  </HtmlTooltip>
                                </div>
                                <div className="circle-0">
                                  <HtmlTooltip
                                    title={
                                      <React.Fragment>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {data?.arrival}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    followCursor
                                  >
                                    <span>
                                      <CircleIcon
                                        sx={{
                                          color: "#c7c7c7",
                                          fontSize: "15px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </span>
                                  </HtmlTooltip>
                                </div>
                              </div>
                              <div className="segment-flight1">
                                <FlightIcon />
                              </div>
                            </div>
                          </Box>
                        </Box>
                      )}
                    </Typography>
                  </Box>
                </Grid>

                <Grid md={4}>
                  <Box textAlign={"end"}>
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "15px",
                          lg: "16px",
                        },
                      }}
                    >
                      {data?.arrival}
                      <span> - </span>
                      {data?.arrivalTime.length > 5
                        ? `${
                            new Date(data?.arrivalTime)
                              .toTimeString()
                              ?.split(":")[0]
                          }:${
                            new Date(data?.arrivalTime)
                              .toTimeString()
                              ?.split(":")[1]
                          }`
                        : `${data?.arrivalTime?.split(":")[0]}:${
                            data?.arrivalTime?.split(":")[1]
                          }`}
                    </Typography>
                    {data?.segment === "3" ? (
                      <Typography
                        sx={{
                          color: "#003566",
                          fontWeight: 600,
                          fontSize: {
                            xs: "12px",
                            sm: "11px",
                            md: "13px",
                          },
                        }}
                      >
                        {data?.segments[2]?.arrivalLocation}
                      </Typography>
                    ) : data?.segment === "2" ? (
                      <Typography
                        sx={{
                          color: "#003566",
                          fontWeight: 600,
                          fontSize: {
                            xs: "12px",
                            sm: "11px",
                            md: "13px",
                          },
                        }}
                      >
                        {data?.segments[1]?.arrivalLocation}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "#003566",
                          fontWeight: 600,
                          fontSize: {
                            xs: "12px",
                            sm: "11px",
                            md: "13px",
                          },
                        }}
                      >
                        {data?.segments[0]?.arrivalLocation}
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        color: "#6c757d",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "11px",
                          md: "13px",
                        },
                      }}
                    >
                      {data?.arrivalDate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid lg={12}>
              <Grid container justifyContent={"space-between"} pt={3}>
                <Grid md={3}>
                  {data.system === "Sabre" ? (
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "14px",
                          sm: "14px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {data?.class}
                    </Typography>
                  ) : data.system === "Galileo" ? (
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {data?.class}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      Economy
                    </Typography>
                  )}
                </Grid>
                <Grid md={4}>
                  {(() => {
                    if (data?.refundable === "Refundable") {
                      return (
                        <Typography
                          sx={{
                            color: "green",
                            fontWeight: 500,
                            fontSize: {
                              xs: "14px",
                              sm: "12px",
                              md: "14px",
                              lg: "16px",
                            },
                          }}
                        >
                          {data?.refundable}
                        </Typography>
                      );
                    } else if (data?.refundable === "Nonrefundable") {
                      return (
                        <Typography
                          sx={{
                            color: "#DC143C",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "12px",
                              md: "14px",
                              lg: "16px",
                            },
                          }}
                        >
                          Non Refundable
                        </Typography>
                      );
                    }
                  })()}
                </Grid>
                <Grid md={2.5}>
                  <Box className="img-text-bag-0">
                    <img src={bag} alt="seat" /> &nbsp;{" "}
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {data?.bags === "2" ? (
                        <>{data?.bags?.split(" ")[0]} Piece</>
                      ) : (
                        <>{data?.bags?.split(" ")[0]} Kg</>
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid md={2.5}>
                  <Box className="img-text-0">
                    <img src={seat} alt="bag" />
                    &nbsp;
                    <Typography
                      sx={{
                        color: "#000",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {data?.seat} Seat
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={3}>
          <Box className="updatebooknowbtn" style={{ paddingLeft: "12px" }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "12.5px",
                    md: "17px",
                  },
                  color: "#fff",
                  pt: {
                    sm: "5px",
                  },
                }}
              >
                CF
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "12.5px",
                    md: "17px",
                  },
                  color: "#fff",
                  pt: {
                    sm: "5px",
                  },
                }}
              >
                {commaNumber(Math.round(clientPrice))} &#2547;
              </Typography>
            </Box>
            <Box
              sx={{
                borderBottom: "0.5px solid rgba(209, 233, 255, 0.52)",
              }}
            ></Box>
            <Box height={"40px"}>
              {price && (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "13px",
                      },
                      color: "#D1E9FF",
                    }}
                  >
                    AF
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "13px",
                      },
                      color: "#D1E9FF",
                    }}
                  >
                    {commaNumber(Math.round(price))} &#2547;
                  </Typography>
                </Box>
              )}
              {commisionFarePrice && (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "13px",
                      },
                      color: "#D1E9FF",
                      pb: {
                        sm: "7px",
                      },
                    }}
                  >
                    CM
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "13px",
                      },
                      color: "#D1E9FF",
                      pb: {
                        sm: "7px",
                      },
                    }}
                  >
                    {commaNumber(Math.round(commisionFarePrice))} &#2547;
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              className="booknow-btn-0 shine-effect"
              sx={{
                color: "#fff",
                fontWeight: 600,
                bgcolor: "#DC143C",
                borderRadius: "12px  0px",
                mt: { xs: "5px" },
                p: {
                  xs: "5px 20px",
                  sm: "5px 10px",
                  md: "5px 15px",
                },
                fontSize: {
                  xs: "12px",
                  sm: "10px",
                  md: "16px",
                },
              }}
              disabled
              onClick={FlightInformation}
            >
              BOOK NOW
            </Button>
            <br />
            <Button
              sx={{
                color: "#fff",
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: {
                  xs: "10px",
                  sm: "10px",
                  md: "12px",
                },
              }}
              onClick={() => setFlightDetails(!flightDetails)}
            >
              {!flightDetails ? <> Flight Details</> : <> Hide Details</>}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin={"auto"} width="80%" mb={2}>
        {flightDetails && (
          <Box
            className="accordion-cursor flight-search-accordion flight-details-btn"
            Accordion
            style={{ boxShadow: "none" }}
          >
            <Box className="tabs-details" value="1">
              {data?.segment === "3" ? (
                <Box className="segment-2">
                  <Box
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    pt={1}
                    gap={2}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#003566",
                        fontWeight: 600,
                      }}
                    >
                      {data?.segments[0]?.departureLocation?.split(",")[0]}
                    </Typography>
                    <img src={toimg} alt="to" />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#003566",
                        fontWeight: 600,
                      }}
                    >
                      {data?.segments[2]?.arrivalLocation?.split(",")[0]}
                    </Typography>
                  </Box>
                  <Box className="single-flight-parent">
                    <Grid
                      className="single-flight-details"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      container
                      spacing={{ xs: 0, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                        item
                        xs={2}
                        sm={3}
                        md={4.5}
                        className="flight-content-gap"
                      >
                        <Box>
                          {" "}
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.segments[0]?.marketingcareer}.png`}
                            alt="img-not-found"
                          />
                        </Box>

                        <Box className="flight-content-detail">
                          <h4>Departure From</h4>
                          <h5>{data?.segments[0]?.departureAirport}</h5>
                          <h5>{data?.segments[0]?.departureLocation}</h5>
                          <h5>{data?.departureDate}</h5>
                        </Box>
                      </Grid>

                      <Grid item xs={2} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Arrival To</h4>
                          <h5>{data?.segments[0]?.arrivalAirport}</h5>
                          <h5>{data?.segments[0]?.arrivalLocation}</h5>
                          <h5>{data?.arrivalDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Duration</h4>
                          <h5>{data?.segments[0]?.flightduration}</h5>
                          <Grid container>
                            <Grid>
                              <h5 style={{ color: "tomato" }}>
                                {data?.segments[0]?.marketingcareer}
                                {data?.segments[0]?.marketingflight}
                              </h5>
                            </Grid>
                            <Grid>
                              <h5>
                                &nbsp;Class: {data?.segments[0]?.bookingcode}{" "}
                                &nbsp;
                                <span style={{ color: "crimson" }}>
                                  Seat: {data?.segments[0]?.seat}
                                </span>
                              </h5>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box className="border-content">
                    <span>
                      Layover Time<>: </>
                      {data?.transit?.transit1}{" "}
                    </span>
                  </Box>

                  <Box className="single-flight-parent">
                    <Grid
                      className="single-flight-details"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      container
                      spacing={{ xs: 0, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        item
                        xs={2}
                        sm={3}
                        md={4.5}
                      >
                        <Box>
                          {" "}
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.segments[1]?.marketingcareer}.png`}
                            alt="img-not-found"
                          />
                        </Box>
                        <Box className="flight-content-detail">
                          <h4>Departure From</h4>
                          <h5>{data?.segments[1]?.departureAirport}</h5>
                          <h5>{data?.segments[1]?.departureLocation}</h5>
                          <h5>{data?.departureDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Arrival To</h4>
                          <h5>{data?.segments[1]?.arrivalAirport}</h5>
                          <h5>{data?.segments[1]?.arrivalLocation}</h5>
                          <h5>{data?.arrivalDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Duration</h4>
                          <h5>{data?.segments[1]?.flightduration}</h5>
                          <Grid container>
                            <Grid>
                              <h5 style={{ color: "tomato" }}>
                                {data?.segments[1]?.marketingcareer}
                                {data?.segments[1]?.marketingflight}
                              </h5>
                            </Grid>
                            <Grid>
                              <h5>
                                &nbsp;Class: {data?.segments[1]?.bookingcode}{" "}
                                &nbsp;
                                <span style={{ color: "crimson" }}>
                                  Seat: {data?.segments[1]?.seat}
                                </span>
                              </h5>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className="border-content">
                    <span>
                      Layover Time<>: </>
                      {data?.transit.transit2}{" "}
                    </span>
                  </Box>
                  <Box className="single-flight-parent">
                    <Grid
                      className="single-flight-details"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      container
                      spacing={{ xs: 0, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        item
                        xs={2}
                        sm={3}
                        md={4.5}
                      >
                        <Box>
                          {" "}
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.segments[2]?.marketingcareer}.png`}
                            alt="img-not-found"
                          />
                        </Box>
                        <Box className="flight-content-detail">
                          <h4>Departure From</h4>
                          <h5>{data?.segments[2]?.departureAirport}</h5>
                          <h5>{data?.segments[2]?.departureLocation}</h5>
                          <h5>{data?.departureDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Arrival To</h4>
                          <h5>{data?.segments[2]?.arrivalAirport}</h5>
                          <h5>{data?.segments[2]?.arrivalLocation}</h5>
                          <h5>{data?.arrivalDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Duration</h4>
                          <h5>{data?.segments[2]?.flightduration}</h5>
                          <Grid container>
                            <Grid>
                              <h5 style={{ color: "tomato" }}>
                                {data?.segments[2]?.marketingcareer}
                                {data?.segments[2]?.marketingflight}
                              </h5>
                            </Grid>
                            <Grid>
                              <h5>
                                &nbsp;Class: {data?.segments[2]?.bookingcode}{" "}
                                &nbsp;
                                <span style={{ color: "crimson" }}>
                                  Seat: {data?.segments[2]?.seat}
                                </span>
                              </h5>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              ) : data?.segment === "2" ? (
                <Box className="segment-2">
                  <Box
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    pt={1}
                    gap={2}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#003566",
                        fontWeight: 600,
                      }}
                    >
                      {data?.segments[0]?.departureLocation?.split(",")[0]}
                    </Typography>
                    <img src={toimg} alt="to" />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#003566",
                        fontWeight: 600,
                      }}
                    >
                      {data?.segments[1]?.arrivalLocation?.split(",")[0]}
                    </Typography>
                  </Box>
                  <Box className="single-flight-parent">
                    <Grid
                      className="single-flight-details"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      container
                      spacing={{ xs: 0, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        item
                        xs={2}
                        sm={3}
                        md={4.5}
                      >
                        <Box>
                          {" "}
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.segments[0]?.marketingcareer}.png`}
                            alt="img-not-found"
                          />
                        </Box>
                        <Box className="flight-content-detail">
                          <h4>Departure From</h4>
                          <h5>{data?.segments[0]?.departureAirport}</h5>
                          <h5>{data?.segments[0]?.departureLocation}</h5>
                          <h5>{data?.departureDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Arrival To</h4>
                          <h5>{data?.segments[0]?.arrivalAirport}</h5>
                          <h5>{data?.segments[0]?.arrivalLocation}</h5>
                          <h5>{data?.arrivalDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Duration</h4>
                          <h5>{data?.segments[0]?.flightduration}</h5>
                          <Grid container>
                            <Grid>
                              <h5 style={{ color: "tomato" }}>
                                {data?.segments[0]?.marketingcareer}
                                {data?.segments[0]?.marketingflight}
                              </h5>
                            </Grid>
                            <Grid>
                              <h5>
                                &nbsp;Class: {data?.segments[0]?.bookingcode}{" "}
                                &nbsp;
                                <span style={{ color: "crimson" }}>
                                  Seat: {data?.segments[0]?.seat}
                                </span>
                              </h5>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box className="border-content">
                    <span>
                      Layover Time<>: </>
                      {data?.transit?.transit
                        ? data?.transit?.transit
                        : data?.transit?.transit1}{" "}
                    </span>
                  </Box>

                  <Box className="single-flight-parent">
                    <Grid
                      className="single-flight-details"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      container
                      spacing={{ xs: 0, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        item
                        xs={2}
                        sm={3}
                        md={4.5}
                      >
                        <Box>
                          {" "}
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.segments[1]?.marketingcareer}.png`}
                            alt="img-not-found"
                          />
                        </Box>
                        <Box className="flight-content-detail">
                          <h4>Departure From</h4>
                          <h5>{data?.segments[1]?.departureAirport}</h5>
                          <h5>{data?.segments[1]?.departureLocation}</h5>
                          <h5>{data?.departureDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Arrival To</h4>
                          <h5>{data?.segments[1]?.arrivalAirport}</h5>
                          <h5>{data?.segments[1]?.arrivalLocation}</h5>
                          <h5>{data?.arrivalDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Duration</h4>
                          <h5>{data?.segments[1]?.flightduration}</h5>
                          <Grid container>
                            <Grid>
                              <h5 style={{ color: "tomato" }}>
                                {data?.segments[1]?.marketingcareer}
                                {data?.segments[1]?.marketingflight}
                              </h5>
                            </Grid>
                            <Grid>
                              <h5>
                                &nbsp;Class: {data?.segments[1]?.bookingcode}{" "}
                                &nbsp;
                                <span style={{ color: "crimson" }}>
                                  Seat: {data?.segments[1]?.seat}
                                </span>
                              </h5>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              ) : (
                <Box className="segment-2">
                  <Box
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    pt={1}
                    gap={2}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#003566",
                        fontWeight: 600,
                      }}
                    >
                      {data?.segments[0]?.departureLocation?.split(",")[0]}
                    </Typography>
                    <img src={toimg} alt="to" />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#003566",
                        fontWeight: 600,
                      }}
                    >
                      {data?.segments[0]?.arrivalLocation?.split(",")[0]}
                    </Typography>
                  </Box>
                  <Box className="single-flight-parent">
                    <Grid
                      className="single-flight-details"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                      container
                      spacing={{ xs: 0, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        item
                        xs={2}
                        sm={3}
                        md={4.5}
                      >
                        <Box>
                          {" "}
                          <img
                            src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${data?.segments[0]?.marketingcareer}.png`}
                            alt="img-not-found"
                          />
                        </Box>
                        <Box className="flight-content-detail">
                          <h4>Departure From</h4>
                          <h5>{data?.segments[0]?.departureAirport}</h5>
                          <h5>{data?.segments[0]?.departureLocation}</h5>
                          <h5>{data?.departureDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={2} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Arrival To</h4>
                          <h5>{data?.segments[0]?.arrivalAirport}</h5>
                          <h5>{data?.segments[0]?.arrivalLocation}</h5>
                          <h5>{data?.arrivalDate}</h5>
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={2} md={3}>
                        <Box className="flight-content-detail">
                          <h4>Duration</h4>
                          <h5>{data?.segments[0]?.flightduration}</h5>
                          <Grid container>
                            <Grid>
                              <h5 style={{ color: "tomato" }}>
                                {data?.segments[1]?.marketingcareer}
                                {data?.segments[1]?.marketingflight}
                              </h5>
                            </Grid>
                            <Grid>
                              <h5>
                                &nbsp;Class: {data?.segments[1]?.bookingcode}{" "}
                                &nbsp;
                                <span style={{ color: "crimson" }}>
                                  Seat: {data?.segments[1]?.seat}
                                </span>
                              </h5>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GroupFare;
