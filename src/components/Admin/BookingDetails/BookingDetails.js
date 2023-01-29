import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../../Header/Header";
import FlightIcon from "@mui/icons-material/Flight";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./BookingDetails.css";
import flightImg from "../../../images/BookingManagement/flight.png";

const BookingDetails = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      {/* <Container maxWidth="lg">
        <Header></Header>
      </Container> */}
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Grid container columnSpacing={2}>
          <Grid item md={9}>
            <Box
              style={{
                backgroundColor: "#D1E9FF",
                padding: "5px 15px",
                display: "flex",
              }}
            >
              <span
                style={{
                  color: "#003566",
                  fontSize: "13px",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
              >
                Reference Id: FFB1687
              </span>
            </Box>

            <Box
              style={{
                marginTop: "13px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                // sx={{ fontWeight: 500 }}
              >
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  18.40
                </span>
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  DAC
                </span>
                <FlightIcon
                  style={{ transform: "rotate(90deg)", fontSize: "20px" }}
                />
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  18.40
                </span>
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  DXB
                </span>
                <span
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "11px",
                    color: "#003566",
                  }}
                >
                  2 Stop(s) 5h 35min
                </span>
              </Box>
              <Box className="returnFlight1">
                <button
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "12px",
                  }}
                >
                  Return Flight
                </button>
              </Box>
            </Box>

            <Box
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                padding: "12px 0px",
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                }}
              >
                Dhaka
              </span>
              <FlightIcon
                style={{
                  transform: "rotate(90deg)",
                  fontSize: "25px",
                  color: "#2D669B",
                }}
              />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                }}
              >
                Dubai
              </span>
            </Box>

            {/*  flight information  */}
            <Grid container spacing={1.5}>
              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <img
                      style={{
                        width: "45px",
                        height: "45px",
                        display: "block",
                      }}
                      src={flightImg}
                    />
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#222222",
                      }}
                    >
                      Bangladesh Biman
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        fontWeight: "500",
                      }}
                    >
                      <span style={{ color: "#2D669B", paddingRight: "11px" }}>
                        BG 78514 | W
                      </span>{" "}
                      Flight Duration : 5h 30min
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  style={{
                    color: "#222222",
                    fontFamily: "Poppins",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  Cabin: 7 KG, Baggage : ADT 35 KG
                </Typography>
              </Grid>

              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Box>
                  <Box>
                    <Typography
                      style={{
                        color: "#888888",
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      Departure Time
                    </Typography>
                    <Typography
                      style={{
                        color: "#888888",
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      Airport
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2D669B",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Fri 28 Oct 2022 04:00 AM
                </Typography>
                <Typography
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  DAC - Dhaka-Hazrat Shahjalal International Airport Terminal: 1
                </Typography>
              </Grid>

              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Box>
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#888888",
                      }}
                    >
                      Arrival Time
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#888888",
                      }}
                    >
                      Airport
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2D669B",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Fri 28 Oct 2022 04:00 AM
                </Typography>
                <Typography
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  DAC - Dhaka-Hazrat Shahjalal International Airport Terminal: 1
                </Typography>
              </Grid>
            </Grid>
            {/*  flight information  */}

            <Box
              style={{
                backgroundColor: "#D1E9FF",
                padding: "5px 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              my={3}
            >
              <span
                style={{
                  color: "#003566",
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
              >
                Layover Time : 4h 30min
              </span>
            </Box>

            {/*  flight information  */}
            <Grid container spacing={1.5}>
              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box>
                    <img
                      style={{
                        width: "45px",
                        height: "45px",
                        display: "block",
                      }}
                      src={flightImg}
                      alt=".../..."
                    />
                  </Box>
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#222222",
                      }}
                    >
                      Bangladesh Biman
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        fontWeight: "500",
                      }}
                    >
                      <span style={{ color: "#2D669B", paddingRight: "11px" }}>
                        BG 78514 | W
                      </span>{" "}
                      Flight Duration : 5h 30min
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  style={{
                    color: "#222222",
                    fontFamily: "Poppins",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  Cabin: 7 KG, Baggage : ADT 35 KG
                </Typography>
              </Grid>

              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Box>
                  <Box>
                    <Typography
                      style={{
                        color: "#888888",
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      Departure Time
                    </Typography>
                    <Typography
                      style={{
                        color: "#888888",
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      Airport
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2D669B",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Fri 28 Oct 2022 04:00 AM
                </Typography>
                <Typography
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  DAC - Dhaka-Hazrat Shahjalal International Airport Terminal: 1
                </Typography>
              </Grid>

              <Grid
                item
                md={6}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Box>
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#888888",
                      }}
                    >
                      Arrival Time
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#888888",
                      }}
                    >
                      Airport
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "right" }}>
                <Typography
                  style={{
                    color: "#2D669B",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Fri 28 Oct 2022 04:00 AM
                </Typography>
                <Typography
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  DAC - Dhaka-Hazrat Shahjalal International Airport Terminal: 1
                </Typography>
              </Grid>
            </Grid>
            {/*  flight information  */}

            <Box
              style={{
                backgroundColor: "#D1E9FF",
                padding: "5px 15px",
                display: "flex",
              }}
              mt={4}
            >
              <span
                style={{
                  color: "#003566",
                  fontSize: "12px",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
              >
                Passenger Details
              </span>
            </Box>

            {/* passenger information  */}

            <Box mt={5} className="queue-detail-passenger-detail">
              <div>
                <>
                  <>
                    <Box
                      padding="6px 15px"
                      backgroundColor="var(--primary-color)"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        style={{
                          color: "#003566",
                          fontSize: "13px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                        }}
                      >
                        MR KHADEMUL ISLAM RIFAT
                      </Typography>
                    </Box>
                    <Box border="1px solid var(--primary-color)" p="3px" mb={2}>
                      <Grid
                        container
                        spacing={2}
                        style={{ padding: "5px 10px" }}
                      >
                        <Grid item xs={4} md={2}>
                          <h5 style={{}}>Title</h5>
                          <h6>hgdhgfh</h6>
                        </Grid>
                        <Grid item xs={4} md={2}>
                          <h5>First Name</h5>
                          <h6>djkfjd</h6>
                        </Grid>
                        <Grid item xs={4} md={2}>
                          <h5>Last Name</h5>
                          <h6>dfdf</h6>
                        </Grid>
                        <Grid item xs={4} md={2}>
                          <h5>Nationality</h5>
                          <h6>dfdf</h6>
                        </Grid>

                        <Grid item xs={4} md={2}>
                          <h5>Date of Birth</h5>
                          <h6>dfdf</h6>
                        </Grid>

                        <Grid item xs={4} md={2}>
                          <h5>Gender</h5>
                          <h6>dfdf</h6>
                        </Grid>

                        <Grid item xs={4} md={2}>
                          <h5>Pax Type</h5>
                          <h6>dfdf</h6>
                        </Grid>

                        <Grid item xs={4} md={2}>
                          <h5>Passport Number</h5>
                          <h6>dfdf</h6>
                        </Grid>
                        <Grid item xs={2} md={3}>
                          <h5>Passport Expire Date</h5>

                          <h6>dfdf</h6>
                        </Grid>

                        <>
                          <Grid item xs={2} md={2}>
                            <h5>Passport Copy</h5>

                            <h6>
                              <a
                                style={{
                                  color: "#003566",
                                  fontWeight: "500",
                                  fontSize: "12px",
                                  textDecoration: "none",
                                  marginRight: "10px",
                                }}
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            </h6>
                          </Grid>
                          <Grid item xs={2} md={2}>
                            <h5>Visa Copy</h5>

                            <h6>
                              <a
                                style={{
                                  color: "#003566",
                                  fontWeight: "500",
                                  fontSize: "12px",
                                  textDecoration: "none",
                                }}
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {" "}
                                View
                              </a>
                            </h6>
                          </Grid>
                        </>
                      </Grid>
                    </Box>
                  </>
                </>
              </div>
            </Box>

            {/* passenger information end */}
          </Grid>

          <Grid item md={3}>
            <Box
              style={{
                backgroundColor: "#FFE9D2",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  color: "var(--primary-color)",
                  fontSize: "18px",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                }}
              >
                HOLD
              </Typography>
            </Box>

            {/* accordion start here */}
            <div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  boxShadow: "none",
                  boxShadow: "0px 0px 4px rgba(255, 168, 77, 0.78)",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      height: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Fare Details
                    </Typography>
                    <Box>
                      {expanded === "panel1" ? (
                        <RemoveIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      ) : (
                        <AddIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography
                      style={{
                        color: "#000000",
                        fontFamily: "poppins",
                        fontSize: "13px",
                        fontWeight: "400",
                      }}
                    >
                      Total Payable
                    </Typography>
                    <Typography
                      style={{
                        color: "#000000",
                        fontFamily: "poppins",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      BDT 144,447
                    </Typography>
                  </Box>

                  <Box
                    style={{
                      background: "rgba(217, 217, 217, 0.39)",
                      padding: "2px 10px",
                      display: "flex",
                      alignItems: "center",
                      margin: "8px 0px",
                    }}
                  >
                    <Typography
                      style={{
                        color: "#2D669B",
                        fontFamily: "poppins",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Price Breakdown
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Adult x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Child x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Infant x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>

                        <Typography
                          my={1.5}
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Total Base & Tax
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Customer Invoice Total
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Discount
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Agent Invoice Total
                        </Typography>

                        <Typography
                          mt={2}
                          style={{
                            fontSize: "13px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Agent Saving
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>

                        <Typography
                          my={1.5}
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>

                        <Typography
                          mt={1.5}
                          style={{
                            fontSize: "13px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                style={{
                  marginBottom: "10px",
                  boxShadow: "none",
                  boxShadow: "0px 0px 4px rgba(255, 168, 77, 0.78)",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      height: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      PNR History
                    </Typography>
                    <Box>
                      {expanded === "panel2" ? (
                        <RemoveIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      ) : (
                        <AddIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className="lineParentBox">
                    <Grid container spacing={4}>
                      <Grid item xs={1}>
                        <Box className="note-line">
                          <Box
                            style={{
                              width: "18px",
                              height: "18px",
                              backgroundColor: "var(--primary-color)",
                              position: "absolute",
                              left: "-10px",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item mt="-3px" xs={10}>
                        <Typography
                          style={{
                            color: "#2564B8",
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "poppins",
                          }}
                        >
                          Hold
                        </Typography>
                        <Box py={1}>
                          <Typography
                            sx={{
                              color: "var(--primary-color)",
                              fontSize: "11px",
                              fontWeight: 500,
                            }}
                          >
                            Syed Afridi, Zinga Lala Travel
                          </Typography>
                          <Typography
                            sx={{
                              color: "#767676",
                              fontSize: "11px",
                              fontWeight: 500,
                            }}
                          >
                            22 Dec 2023
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                style={{
                  marginBottom: "10px",
                  boxShadow: "none",
                  boxShadow: "0px 0px 4px rgba(255, 168, 77, 0.78)",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      height: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Download PDF
                    </Typography>
                    <Box>
                      {expanded === "panel3" ? (
                        <RemoveIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      ) : (
                        <AddIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Download PDF</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel4"}
                onChange={handleChange("panel4")}
                style={{
                  boxShadow: "none",
                  boxShadow: "0px 0px 4px rgba(255, 168, 77, 0.78)",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                      height: "20px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Fare Rules
                    </Typography>
                    <Box>
                      {expanded === "panel4" ? (
                        <RemoveIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      ) : (
                        <AddIcon
                          style={{
                            color: "var(--primary-color)",
                            fontSize: "25px",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    style={{
                      background: "rgba(217, 217, 217, 0.39)",
                      padding: "2px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      style={{
                        color: "#2D669B",
                        fontFamily: "poppins",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Refund Penalties
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Adult x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Child x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    style={{
                      background: "rgba(217, 217, 217, 0.39)",
                      padding: "2px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    mt={2}
                  >
                    <Typography
                      style={{
                        color: "#2D669B",
                        fontFamily: "poppins",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Re-issue Penalties
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Adult x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      style={{
                        color: "#110F0F",
                        fontSize: "15px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Child x1
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      mt={0.7}
                    >
                      <Box>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Base Fare x1
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#888888",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Tax x1
                        </Typography>
                      </Box>
                      <Box style={{ textAlign: "right" }}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          500 ৳
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "12px",
                            color: "#2D669B",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          420 ৳
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* accordion end here */}

            <Box className="issueTicket" mt={2}>
              <button>Issue Ticket</button>
            </Box>

            <Box className="issueCancel" mt={1}>
              <button>Cancel Ticket</button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookingDetails;
