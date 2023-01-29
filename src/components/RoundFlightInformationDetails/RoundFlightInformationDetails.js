import { useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import FlightIcon from "@mui/icons-material/Flight";
import React from "react";
import { format } from "date-fns";
import "./RoundFlightInformationDetails.css";

const RoundFlightInformationDetails = ({ flightData }) => {
  const [showGo, setShowGo] = useState(true);
  // console.log(flightData);
  //todo: calculate total flight duration
  const calDuration = (arr) => {
    const convertTime = arr.map(
      (item) =>
        parseInt(item.split(" ")[0]) * 3600 * 1000 +
        parseInt(item.split(" ")[1]) * 60 * 1000
    );
    const milliseconds = convertTime.reduce((cur, acc) => cur + acc, 0);
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${hours.toString().padStart(2, 0)}H:${minutes
      .toString()
      .padStart(2, 0)}Min`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="no-scrollbar"
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        {/* //todo:Flight Information text part */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              style={{
                fontSize: "22px",
                fontWeight: "500",
                color: "var(--black)",
              }}
            >
              Flight Information Details
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "var(--primary-color)",
              }}
            >
              {`${flightData.segments.go
                .map((item) => item.marketingcareerName)
                .join(",")}`}
            </Typography>
          </Box>
          <Tooltip
            title={
              showGo ? "Click to See Return Flight" : "Click to See Go Flight"
            }
          >
            <Button
              sx={{
                background: "var(--primary-color)",
                color: "var(--white)",
                fontWeight: "600",
                "&:hover": {
                  background: "var(--primary-color)",
                  color: "var(--white)",
                  fontWeight: "600",
                },
              }}
              onClick={() => setShowGo((prev) => !prev)}
            >
              {showGo ? "Go Flight" : "Return Flight"}
            </Button>
          </Tooltip>
        </Box>
        {/* //todo:header part */}
        <Box
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Typography className="flight-details-title">
            {`${flightData.segments.go[0].departure}:${format(
              new Date(flightData.segments.go[0].departureTime),
              "hh:mm"
            )}`}
          </Typography>
          <FlightIcon sx={{ transform: "rotate(90deg)" }} />
          <Typography className="flight-details-title">
            {`${
              flightData.segments.go[flightData.segments.go.length - 1].arrival
            }:${format(
              new Date(
                flightData.segments.go[
                  flightData.segments.go.length - 1
                ].arrivalTime
              ),
              "hh:mm"
            )}`}
          </Typography>
          <Typography className="flight-details-title">
            {flightData.segment} Stop(s){" "}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", color: "var(--secondary-color)" }}
          >
            {flightData.segments.go[0].flightduration}
          </Typography>
        </Box>
        {/* //todo: segment part */}
        <Box
          sx={{
            height: "60vh",
            width: "100%",
            overflow: "auto",
            padding: "0px 15px",
          }}
          className="no-scrollbar"
        >
          {/* //todo: go Section */}
          <Box
            sx={{
              position: "relative",
              top: "0px",
              height: "fit-content",
              width: "100%",
              visibility: showGo ? "visible" : "hidden",
              opacity: showGo ? "1" : "0",
              transition: "all .5s ease-in-out",
            }}
          >
            <Box
              style={{
                borderLeft: "2px solid var(--primary-color)",
                position: "absolute",
                height: "fit-content",
              }}
            >
              {flightData.segments.go.map((segment) => (
                <Box
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                  }}
                >
                  <Box className="circle1">
                    <FlightIcon
                      style={{
                        transform: "rotate(180deg)",
                        fontSize: "35px",
                        position: "relative",
                        top: "40px",
                        left: "-10px",
                        color: "#9C9797",
                      }}
                    />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <Box>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.departure}
                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          {new Date(segment.departureTime)
                            ?.toTimeString()
                            ?.split(" ")
                            ?.at(0)
                            .slice(0, 5)}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "13px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.departureAirport},
                        {segment.departureLocation?.split(",")[1]}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        Departure Date:{" "}
                        {new Date(segment.departureTime)?.toDateString()}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      my={2}
                    >
                      <Box sx={{ width: "50px", height: "50px" }}>
                        <img
                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment.marketingcareer}.png`}
                          className={`${flightData.system.toLowerCase()}`}
                          alt="..."
                        />
                      </Box>
                      <Box>
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "var(--black)",
                          }}
                        >
                          {segment.marketingcareerName}
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "var(--primary-color)",
                          }}
                        >
                          {segment.marketingcareer} {segment.marketingflight} ||
                          Flight Duration:
                          {segment.flightduration}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.arrival}

                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          {new Date(segment.arrivalTime)
                            ?.toTimeString()
                            ?.split(" ")
                            ?.at(0)
                            .slice(0, 5)}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "13px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.arrivalAirport},
                        {segment.arrivalLocation?.split(",")[1]}
                      </Typography>

                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        Arrival Date:
                        {new Date(segment.arrivalTime)?.toDateString()}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "var(--primary-color)",
                        }}
                      >
                        Transit Time :
                      </Typography>

                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "var(--black)",
                        }}
                      >
                        {`Departure Date & Time: ${format(
                          new Date(segment.departureTime),
                          "EE MM dd yyyy || hh:mm"
                        )}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* //todo:back section */}
          <Box
            sx={{
              position: "relative",
              top: "0px",
              width: "100%",
              height: "fit-content",
              visibility: showGo ? "hidden" : "visible",
              opacity: showGo ? "0" : "1",
              transition: "all .5s ease-in-out",
            }}
          >
            <Box
              style={{
                borderLeft: "2px solid var(--primary-color)",
                position: "absolute",
                height: "fit-content",
              }}
            >
              {flightData.segments.back.map((segment) => (
                <Box
                  style={{
                    display: "flex",
                    marginLeft: "10px",
                  }}
                >
                  <Box className="circle1">
                    <FlightIcon
                      style={{
                        transform: "rotate(180deg)",
                        fontSize: "35px",
                        position: "relative",
                        top: "40px",
                        left: "-10px",
                        color: "#9C9797",
                      }}
                    />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <Box>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.departure}
                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          {new Date(segment.departureTime)
                            ?.toTimeString()
                            ?.split(" ")
                            ?.at(0)
                            .slice(0, 5)}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "13px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.departureAirport},
                        {segment.departureLocation?.split(",")[1]}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        Departure Date:{" "}
                        {new Date(segment.departureTime)?.toDateString()}
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      my={2}
                    >
                      <Box sx={{ width: "50px", height: "50px" }}>
                        <img
                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segment.marketingcareer}.png`}
                          className={`${flightData.system.toLowerCase()}`}
                          alt="..."
                        />
                      </Box>
                      <Box>
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "var(--black)",
                          }}
                        >
                          {segment.marketingcareerName}
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "var(--primary-color)",
                          }}
                        >
                          {segment.marketingcareer} {segment.marketingflight} ||
                          Flight Duration:
                          {segment.flightduration}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.arrival}

                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          {new Date(segment.arrivalTime)
                            ?.toTimeString()
                            ?.split(" ")
                            ?.at(0)
                            .slice(0, 5)}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "13px",
                          color: "#2564B8",
                        }}
                      >
                        {segment.arrivalAirport},
                        {segment.arrivalLocation?.split(",")[1]}
                      </Typography>

                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        Arrival Date:
                        {new Date(segment.arrivalTime)?.toDateString()}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "var(--primary-color)",
                        }}
                      >
                        Transit Time :
                      </Typography>

                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "var(--black)",
                        }}
                      >
                        {`Departure Date & Time: ${format(
                          new Date(segment.departureTime),
                          "EE MM dd yyyy || hh:mm"
                        )}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* //todo:baggage and seat information */}
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          background: "rgba(var(--secondary-rgb),.4)",
          padding: "10px 0px",
        }}
      >
        <Typography
          style={{
            color: "var(--black)",
            fontSize: "15px",
            fontWeight: "500",
            padding: "0px 10px",
          }}
        >
          {flightData.refundable}
        </Typography>
        <Box style={{ display: "flex", gap: "10px" }}>
          <WorkIcon
            style={{
              fontSize: "20px",
              color: "var(--black)",
            }}
          />
          <Typography
            style={{
              color: "var(--black)",
              fontSize: "15px",

              fontWeight: "500",
            }}
          >
            {flightData.bags === "1" || "2" || "3" ? (
              <>{flightData.bags} Piece </>
            ) : (
              <> {flightData.bags} kg</>
            )}
          </Typography>
        </Box>
        <Typography
          style={{
            color: "var(--black)",
            fontSize: "15px",
            fontWeight: "500",
            padding: "0px 10px",
          }}
        >
          {flightData.segments.go[0].seat} Seats
        </Typography>
      </Box>
    </Box>
  );
};

export default RoundFlightInformationDetails;
