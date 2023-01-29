import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import flightImg from "../../../images/BookingManagement/flight.png";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import "./FlightDetails.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FlightDetails = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box style={{ padding: "20px 0px" }}>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Box>
          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "22px",
              fontWeight: "500",
              color: "#222222",
            }}
          >
            Flight Information Details
          </Typography>
          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "13px",
              fontWeight: "500",
              color: "var(--primary-color)",
            }}
          >
            Biman Bangladeh Airlines & Malayshia Airlines
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box>
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
                >
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "20px",
                    }}
                  >
                    18.40
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "20px",
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
                      fontSize: "20px",
                    }}
                  >
                    18.40
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "400",
                      fontSize: "20px",
                    }}
                  >
                    DXB
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "#003566",
                    }}
                  >
                    2 Stop(s) 5h 35min
                  </span>
                </Box>
              </Box>
              <Box
                style={{
                  borderLeft: "2px solid var(--primary-color)",
                  position: "absulote",
                }}
                mt={2}
              >
                <Box style={{ display: "flex", marginLeft: "10px" }}>
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

                  <Box>
                    <Box>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#2564B8",
                        }}
                      >
                        DAC{" "}
                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          15.00
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
                        Hazrat Shajalal International Airport, BD
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        3rd june 2022
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      my={4}
                    >
                      <Box>
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
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
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "#222222",
                          }}
                        >
                          Bangladesh Biman
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "var(--primary-color)",
                          }}
                        >
                          BG 452 || Flight Duration: 5h 35Min
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
                        DAC{" "}
                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          15.00
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
                        Hazrat Shajalal International Airport, BD
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        3rd june 2022
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                      my={4}
                    >
                      <Box>
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
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
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "#222222",
                          }}
                        >
                          Bangladesh Biman
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "var(--primary-color)",
                          }}
                        >
                          BG 452 || Flight Duration: 5h 35Min
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
                        DAC{" "}
                        <span
                          style={{
                            color: "#282E2C",
                            padding: "0px 10px",
                          }}
                        >
                          15.00
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
                        Hazrat Shajalal International Airport, BD
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#282E2C",
                        }}
                      >
                        3rd june 2022
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item md={6}>
            {/* accordion start here */}
            {/* */}
            <div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  boxShadow: "none",
                  borderRadius: "0px",
                  border: "2px solid #2564B8",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  style={{
                    background: "#2564B8",
                  }}
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
                        color: "#fff",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Price Breakdown
                    </Typography>
                    <Box>
                      {expanded === "panel1" ? (
                        <RemoveIcon
                          style={{ color: "#fff", fontSize: "25px" }}
                        />
                      ) : (
                        <AddIcon style={{ color: "#fff", fontSize: "25px" }} />
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
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Total Payable
                    </Typography>
                    <Typography
                      style={{
                        color: "#000000",
                        fontFamily: "poppins",
                        fontSize: "22px",
                        fontWeight: "500",
                      }}
                    >
                      BDT 144,447
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        background: "#2564B8",
                        padding: "2px 10px",
                        display: "flex",
                        alignItems: "center",
                        margin: "8px 0px",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#fff",
                          fontFamily: "poppins",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        Adult x1
                      </Typography>
                    </Box>
                    <Box mt={1} style={{ padding: "0px 10px" }}>
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
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            Base Fare x1
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
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
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            500 ৳
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            420 ৳
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        background: "#2564B8",
                        padding: "2px 10px",
                        display: "flex",
                        alignItems: "center",
                        margin: "8px 0px",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#fff",
                          fontFamily: "poppins",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        Child x1
                      </Typography>
                    </Box>
                    <Box mt={1} style={{ padding: "0px 10px" }}>
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
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            Base Fare x1
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
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
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            500 ৳
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            420 ৳
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        background: "var(--primary-color)",
                        padding: "2px 10px",
                        display: "flex",
                        alignItems: "center",
                        margin: "8px 0px",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#fff",
                          fontFamily: "poppins",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        Total & Saving
                      </Typography>
                    </Box>
                    <Box mt={1} style={{ padding: "0px 10px" }}>
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
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            Total Base & Tax
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            Discount & Saving
                          </Typography>
                        </Box>
                        <Box style={{ textAlign: "right" }}>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            500 ৳
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#222222",
                              fontFamily: "poppins",
                              fontWeight: "500",
                            }}
                          >
                            420 ৳
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  boxShadow: "none",
                  borderRadius: "0px",
                  borderLeft: "2px solid #2564B8",
                  borderRight: "2px solid #2564B8",
                  borderBottom: "2px solid #2564B8",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  style={{
                    background: "#2564B8",
                  }}
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
                        color: "#fff",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Baggage
                    </Typography>
                    <Box>
                      {expanded === "panel2" ? (
                        <RemoveIcon
                          style={{ color: "#fff", fontSize: "25px" }}
                        />
                      ) : (
                        <AddIcon style={{ color: "#fff", fontSize: "25px" }} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails
                  className="baggageTable1"
                  style={{ marginTop: "15px" }}
                >
                  <table>
                    <tr>
                      <th>Baggage</th>
                      <th>Check in</th>
                      <th>Cabin</th>
                    </tr>
                    <tr>
                      <td>Adult</td>
                      <td>20 KG</td>
                      <td>M</td>
                    </tr>
                    <tr style={{ background: "#fff" }}>
                      <td>Adult</td>
                      <td>20 KG</td>
                      <td>M</td>
                    </tr>
                    <tr>
                      <td>Adult</td>
                      <td>20 KG</td>
                      <td>M</td>
                    </tr>
                  </table>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  boxShadow: "none",
                  borderRadius: "0px",
                  borderLeft: "2px solid #2564B8",
                  borderRight: "2px solid #2564B8",
                  borderBottom: "2px solid #2564B8",
                }}
              >
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  style={{
                    background: "#2564B8",
                  }}
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
                        color: "#fff",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Policy
                    </Typography>

                    <Box>
                      {expanded === "panel3" ? (
                        <RemoveIcon
                          style={{ color: "#fff", fontSize: "25px" }}
                        />
                      ) : (
                        <AddIcon style={{ color: "#fff", fontSize: "25px" }} />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box mt={2}>
                    <Box
                      style={{
                        width: "130px",
                        background: "rgba(255, 168, 77, 0.23)",
                        padding: "5px 15px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "13px",
                          color: "var(--primary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Cancellation
                      </Typography>
                    </Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginTop: "5px",
                        paddingLeft: "15px",
                      }}
                    >
                      Refund Amount = Paid Amount - Airline Cancellation Fee
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Box
                      style={{
                        width: "130px",
                        background: "rgba(255, 168, 77, 0.23)",
                        padding: "5px 15px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "13px",
                          color: "var(--primary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Re-issue
                      </Typography>
                    </Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginTop: "5px",
                        paddingLeft: "15px",
                      }}
                    >
                      Re-issue Fee = Airline’s Fee + Fare Difference
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Box
                      style={{
                        width: "130px",
                        background: "rgba(255, 168, 77, 0.23)",
                        padding: "5px 15px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "13px",
                          color: "var(--primary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Refund
                      </Typography>
                    </Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginTop: "5px",
                        paddingLeft: "15px",
                      }}
                    >
                      Refund Amount = Paid Amount - Airline Cancellation Fee
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Box
                      style={{
                        width: "130px",
                        background: "rgba(255, 168, 77, 0.23)",
                        padding: "5px 15px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "13px",
                          color: "var(--primary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Void
                      </Typography>
                    </Box>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#2564B8",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        marginTop: "5px",
                        paddingLeft: "15px",
                      }}
                    >
                      Re-issue Fee = Airline’s Fee + Fare Difference
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
            {/* accordion end here */}
          </Grid>
        </Grid>

        <Box mt={8}>
          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "22px",
              fontWeight: "500",
              color: "#222222",
            }}
          >
            Passenger Information Details
          </Typography>
          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--primary-color)",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            ADULT: 02 | CHILD: 01
          </Typography>
          <Box
            style={{
              background: "rgba(37, 100, 184, 0.5)",
              padding: "5px 15px",
              display: "flex",
            }}
            mb={3}
          >
            <span
              style={{
                color: "#003566",
                fontSize: "15px",
                fontFamily: "Poppins",
                fontWeight: "500",
              }}
            >
              ADULT : 01
            </span>
          </Box>

          <Box style={{ padding: "0px 15px" }}>
            <form>
              <Box className="passengerInput1">
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <Typography>Find Traveler</Typography>
                    <Box style={{ display: "flex", marginTop: "5px" }}>
                      <input
                        required
                        type="text"
                        placeholder="Find traveler to auto fill"
                      />
                      <SearchIcon
                        style={{
                          position: "relative",
                          left: "-25px",
                          color: "#2d669b",
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={4} mt={1}>
                  <Grid item md={4}>
                    <Typography>First/Given Name</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        required
                        type="text"
                        placeholder="Your First Name"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Last/Surname</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        required
                        type="text"
                        placeholder="Your Last Name"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Gender</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <select required name="python" id="django">
                        <option value="Python  ">Python </option>
                        <option value="Django">Django</option>
                      </select>
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Nationality</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input required type="text" placeholder="Bangladesh" />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Date of Birth</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        required
                        type="text"
                        placeholder="Find traveler to auto fill"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Passport No</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        required
                        type="text"
                        placeholder="Your Passport Number"
                      />
                    </Box>
                  </Grid>
                  <Grid item md={4}>
                    <Typography>Expires On</Typography>
                    <Box style={{ marginTop: "5px" }}>
                      <input
                        required
                        type="text"
                        placeholder="Find traveler to auto fill"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box style={{ display: "flex", alignItems: "center" }} mt={2}>
                <Checkbox required {...label} />
                <label
                  for="vehicle1"
                  style={{ color: "#72AFD3", fontSize: "13px" }}
                >
                  Add these travelers to My Traveler List.{" "}
                </label>
              </Box>
            </form>
          </Box>
        </Box>

        <Box className="bookBtn">
          <button>BOOK & HOLD</button>
        </Box>
      </Container>
    </Box>
  );
};

export default FlightDetails;
