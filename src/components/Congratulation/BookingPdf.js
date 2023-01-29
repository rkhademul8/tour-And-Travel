import React, { useRef, useState } from "react";
import "./BookingPdf.css";
import "hammerjs";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import logo from "../../../image/pdf-logo.png";
import pdfFooter from "../../../image/pdfFooter.png";
import { useLocation } from "react-router-dom";
import { Box, Container } from "@mui/system";
import pdf1 from "../../../image/pdf1.png";
import qr from "../../../image/qr.png";
import thai from "../../../image/thai.png";
import directionFlight from "../../../image/directionFlight.png";
import barCode from "../../../image/barCode.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { Padding } from "@mui/icons-material";
import { Grid } from "@mui/material";

const footer = {
  backgroundImage: `url(${pdfFooter})`,
  backgroundSize: "cover",
  height: "10vh",
};

const bg = {
  backgroundImage: `url(${pdf1})`,
  backgroundRepeat: "no-repeat",
};

const BookingPdf = () => {
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const location = useLocation();
  const [data, setData] = useState(location);

  const result = data?.state?.location?.state;

  return (

    <div id="example">
      <Container>
        <div
          style={{ textAlign: "right", position: "fixed" }}
          className="box-col"
        >
          <Button primary={true} onClick={handleExportWithComponent}>
            Print pdf
          </Button>
        </div>
      </Container>

      <div className="page-container hidden-on-narrow">
        <PDFExport ref={pdfExportComponent}>
          <div style={bg} className="pdf-page size-a5">
            <div className="inner-page">
              <div className="pdf-header">
                <Box className="booking-header">
                  <Box>
                    <img
                      style={{
                        width: "150px",
                        position: "relative",
                        left: "-15px",
                      }}
                      src={logo}
                    />
                  </Box>
                  <Box className="booking-head-contact">
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <p>Ka 11/12,Jagannathpur, Bashundhara Road </p>
                          <p>bove Standard Chartered Bank, Dhaka 1229 </p>
                        </Box>
                        <Box>
                          <HiOutlineLocationMarker
                            style={{
                              fontSize: "18px",
                              color: "red",
                              Padding: "0px 5px !important",
                            }}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "end",
                        }}
                      >
                        <p>+8801774975164, 09639205205 </p>
                        <FiPhone style={{ fontSize: "15px", color: "red" }} />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "end",
                        }}
                      >
                        <p>support@flyfarint.com </p>
                        <HiOutlineMail
                          style={{ fontSize: "15px", color: "red" }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <img src={qr} />
                    </Box>
                  </Box>
                </Box>
              </div>

              <div className="pdf-body">
                <Box className="pdf-headingh3">
                  <h3>{"Passenger Detail:" + result?.bookingInfo?.name}</h3>
                  <Box>
                    <h3 style={{ padding: "2px 0px" }}>
                      {" Agent Id:" + result?.bookingInfo?.agentId}
                    </h3>
                    <h3 style={{ padding: "2px 0px" }}>{" Booking Id: "}</h3>
                  </Box>
                </Box>

                <Box className="ITINERARIES">
                  <h4>FLIGHT ITINERARIES</h4>

                  <Box className="ITINERARIES-details">
                    <Box>
                      <Box className="ITINERARIES-details-img">
                        {/* <img src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${result?.allFlightData?.userData?.flightData?.segments[0].marketingcareer}.png`} /> */}
                        <span>THAI airways</span>
                      </Box>

                      <Box className="pdf-flight-det">
                        <Box className="pdf-flight-det-left">
                          <h2>
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.departure
                            }
                          </h2>
                          <h3>
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.departureTime
                            }
                          </h3>
                          <span>
                            {" "}
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.departureDate
                            }
                          </span>
                        </Box>
                        <Box style={{ position: "relative" }}>
                          <img src={directionFlight} />
                          <span
                            style={{
                              position: "absolute",
                              left: "26px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              top: "15px",
                            }}
                          >
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.flightduration
                            }
                          </span>
                        </Box>
                        <Box className="pdf-flight-det-left">
                          <h2>
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.arrival
                            }
                          </h2>
                          <h3>
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.arrivalTime
                            }
                          </h3>
                          <span>
                            {
                              result?.allFlightData?.userData?.flightData
                                ?.arrivalTime
                            }
                          </span>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="pdf-flight-right-det">
                      <h2>
                        {
                          result?.allFlightData?.userData?.flightData
                            ?.segments[0]?.operatingcareer
                        }{" "}
                        {
                          result?.allFlightData?.userData?.flightData
                            ?.segments[0]?.operatingflight
                        }{" "}
                        • ECONOMY / L • 788
                      </h2>

                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "10px" }}
                      >
                        <p>DEPARTURE </p>
                        <span>
                          Dhaka, Shahjalal intl. Airport (DAC), Terminal 2
                        </span>
                      </Box>

                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "25px" }}
                      >
                        <p>LANDS IN </p>
                        <span>Bangkok, Suvarnabhumi Intl.</span>
                      </Box>
                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "19px" }}
                      >
                        <p>BAGGAGE </p>
                        <span>Adult - Check in: 20K Cabin</span>
                      </Box>

                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "40px" }}
                      >
                        <p>A-PNR </p>
                        <span>WQOHG9</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="ITINERARIES">
                  <Box className="ITINERARIES-details">
                    <Box>
                      <Box className="ITINERARIES-details-img">
                        <img src={thai} />
                        <span>THAI airways</span>
                      </Box>

                      <Box className="pdf-flight-det">
                        <Box className="pdf-flight-det-left">
                          <h2>DAC</h2>
                          <h3>13:35</h3>
                          <span>22, Apr, 2022</span>
                        </Box>
                        <Box style={{ position: "relative" }}>
                          <img src={directionFlight} />
                          <span
                            style={{
                              position: "absolute",
                              left: "26px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              top: "15px",
                            }}
                          >
                            1h 25m
                          </span>
                        </Box>
                        <Box className="pdf-flight-det-left">
                          <h2>BKK</h2>
                          <h3>17:35</h3>
                          <span>22, Apr, 2022</span>
                        </Box>
                      </Box>
                    </Box>
                    <Box className="pdf-flight-right-det">
                      <h2>TG 322 • ECONOMY / L • 788</h2>

                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "10px" }}
                      >
                        <p>DEPARTURE </p>
                        <span>
                          Dhaka, Shahjalal intl. Airport (DAC), Terminal 2
                        </span>
                      </Box>

                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "25px" }}
                      >
                        <p>LANDS IN </p>
                        <span>Bangkok, Suvarnabhumi Intl.</span>
                      </Box>
                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "19px" }}
                      >
                        <p>BAGGAGE </p>
                        <span>Adult - Check in: 20K Cabin</span>
                      </Box>

                      <Box
                        className="departure-details5"
                        sx={{ display: "flex", gap: "40px" }}
                      >
                        <p>A-PNR </p>
                        <span>WQOHG9</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="pdf-preferance">
                  <Box>
                    <span>Seat Preference —</span>
                  </Box>
                  <Box>
                    <span>Meal Preference —</span>
                  </Box>
                </Box>

                {/*  another section */}

                {/* <Box className="body-content">
                  <h3>
                    Passanger Name: <span> MR SAURAV K NAG ARGO</span>
                  </h3>
                  <Box className="body-content-details1">

                    <Box>
                      <Box sx={{ display: "flex" }}>
                        <p>TICKET NUMBER</p>
                        <span>2175862608184</span>
                      </Box>

                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <p>REFERENCE ID </p>
                        <span>FHB220404350630</span>
                      </Box>

                      <Box sx={{ display: "flex", gap: "42px" }}>
                        <p> A-PNR </p>
                        <span>WQOHG9</span>
                      </Box>
                    </Box>
                    <Box>
                  
                      <Box sx={{ display: "flex",gap:'22px' }}>
                        <p>STATUS</p>
                        <span>2175862608184</span>
                      </Box>
                      <Box sx={{ display: "flex",gap:'5px' }}>
                        <p>ISSUE DATE</p>
                        <span>FHB220404350630</span>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <p>FLIGHT TYPE</p>
                        <span>WQOHG9</span>
                      </Box>

              
          
                    </Box>
                    <Box>
                      {" "}
                      <img src={barCode} />
                    </Box>
                  </Box>
                </Box> */}
              </div>
            </div>

            <div className="pdf-footer">
              <Box className="footer-pdf2" style={footer}>
                <p>01755543442, 09639205205</p>
                <span>WWW.FLYFARINT.COM</span>
              </Box>
            </div>
          </div>
        </PDFExport>
      </div>
    </div>
    
  );
};

export default BookingPdf;
