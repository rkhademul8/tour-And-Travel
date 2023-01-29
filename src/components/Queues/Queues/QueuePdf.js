import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "hammerjs";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import logo from "../../../../image/pdf-logo.png";
import pdfFooter from "../../../../image/pdfFooter.png";
import { Box, Container } from "@mui/system";
import pdf1 from "../../../../image//pdf1.png";
import qr from "../../../../image//qr.png";
import thai from "../../../../image//thai.png";
import directionFlight from "../../../../image/directionFlight.png";
import barCode from "../../../../image//barCode.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { Padding } from "@mui/icons-material";
import { Grid } from "@mui/material";
import "./QueuePdf.css";

import { useReactToPrint } from "react-to-print";

const footer = {
  backgroundImage: `url(${pdfFooter})`,
  backgroundSize: "cover",
  height: "10vh",
};

const bg = {
  backgroundImage: `url(${pdf1})`,
  backgroundRepeat: "no-repeat",
};

const QueuePdf = () => {
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  // React To Print

  const componentRef = useRef();

  const handleToPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-dara",
    // onAfterPrint: () => alert("print success"),
  });

  const location = useLocation();
  const modalDetails = location.state;

  return (
    <div>
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
                  {/* <Box className="booking-header">
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

                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <p>Ka 11/12,Jagannathpur, Bashundhara Road </p>
                            <p>Standard Chartered Bank, Dhaka 1229 </p>
                          </Box>

                          <Box>
                            <HiOutlineLocationMarker
                              style={{
                                fontSize: "18px",
                                color: "red",
                                Padding: "0px 0px !important",
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
                            
                            justifyContent: "end",
                          }}
                        >
                          <p style={{ padding: "0px 24px" }}>
                            support@flyfarint.com{" "}
                          </p>
                          <HiOutlineMail
                            style={{ fontSize: "15px", color: "red" }}
                          />
                        </Box>
                      </Box>

                      <Box>
                        <img src={qr} />
                      </Box>
                    </Box>
                  </Box> */}

                  <Grid container spacing={2}>
                    <Grid item md={3}>
                      <img
                        style={{
                          width: "150px",
                          position: "relative",
                          left: "-15px",
                        }}
                        src={logo}
                      />
                    </Grid>
                    <Grid
                      display="flex"
                      justifyContent="end"
                      gap="20px"
                      item
                      alignItems="center"
                      xs={9}
                    >
                      <Box>
                        <Box>
                          <p style={{ textAlign: "right" }}>
                            Ka 11/12,Jagannathpur, Bashundhara Road{" "}
                          </p>
                          <p style={{ textAlign: "right", padding: "0px 5px" }}>
                            Standard Chartered Bank, Dhaka 1229{" "}
                          </p>
                        </Box>
                        <Box
                          style={{ textAlign: "right", padding: "0px 20px" }}
                        >
                          <p>+8801774975164, 09639205205 </p>
                        </Box>
                        <Box
                          style={{ textAlign: "right", padding: "0px 24px" }}
                        >
                          <p>support@flyfarint.com </p>
                        </Box>
                      </Box>
                      <Box>
                        <img src={qr} />
                      </Box>
                    </Grid>
                  </Grid>
                </div>

                <div className="pdf-body">
                  <Box className="pdf-headingh3">
                    <h3>
                      {"Passenger Detail: " + modalDetails?.modalDetails?.name}
                    </h3>
                    <Box>
                      <h3 style={{ padding: "2px 0px" }}>
                        {" Agent Id:  " + modalDetails?.modalDetails?.agentId}
                      </h3>
                      <h3 style={{ padding: "2px 0px" }}>
                        {" Booking Id: " +
                          modalDetails?.modalDetails?.BookingId}
                      </h3>
                    </Box>
                  </Box>

                  <Box className="ITINERARIES">
                    <h4>FLIGHT ITINERARIES</h4>

                    <Box className="ITINERARIES-details">
                      <Box>
                        <Box className="ITINERARIES-details-img">
                          <img src={thai} />
                          <span>THAI airways</span>
                        </Box>

                        <Box className="pdf-flight-det">
                          <Box className="pdf-flight-det-left">
                            <h2>{modalDetails?.modalDetails?.deptFrom}</h2>
                            <h3>
                              {modalDetails?.modalDetails?.dateTime?.slice(
                                10,
                                16
                              )}
                            </h3>
                            <span>
                              {modalDetails?.modalDetails?.dateTime?.slice(
                                0,
                                10
                              )}
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
                              1h 25m
                            </span>
                          </Box>
                          <Box className="pdf-flight-det-left">
                            <h2>{modalDetails?.modalDetails?.arriveTo}</h2>
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
                          <span>{modalDetails?.modalDetails?.pnr}</span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* <Box className="ITINERARIES">
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
                  </Box> */}

                  <Box className="pdf-preferance">
                    <Box>
                      <span>Seat Preference —</span>
                    </Box>
                    <Box>
                      <span>Meal Preference —</span>
                    </Box>
                  </Box>
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
    </div>
  );
};

export default QueuePdf;

// <Box className="pdf-body">
//   <Container maxWidth="xl">
//     <Box
//       ref={componentRef}
//       style={{ width: "100%", height: window.innerHeight }}
//     >
//       <Box className="pdf-content">
//         <Box className="pdf-details">
//           <Box className="pdfLogo">
//             <img src={logo} />
//           </Box>

//           <Box className="qr-img">
//             <Box className="pdf-header-right">
//               <Box>
//                 <Box display="flex" alignItems="center" gap="10px">
//                   <Box>
//                     <p>Ka 11/12,Jagannathpur, Bashundhara Road </p>
//                     <p>bove Standard Chartered Bank, Dhaka 1229 </p>
//                   </Box>
//                   <HiOutlineLocationMarker
//                     style={{
//                       fontSize: "25px",
//                       color: "red",
//                     }}
//                   />
//                 </Box>
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   gap="10px"
//                   justifyContent="end"
//                 >
//                   <p>+8801774975164, 09639205205 </p>
//                   <FiPhone style={{ fontSize: "22px", color: "red" }} />
//                 </Box>
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   gap="10px"
//                   justifyContent="end"
//                 >
//                   <p>support@flyfarint.com </p>
//                   <HiOutlineMail
//                     style={{ fontSize: "22px", color: "red" }}
//                   />
//                 </Box>
//               </Box>
//               <Box>
//                 <img src={qr} />
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         <Box className="pdf-body-content">
//           <Box
//             display={"flex"}
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <h5>
//                 Passanger Detail <strong>MR SAURAV K NAG ARGO</strong>{" "}
//               </h5>
//             </Box>
//             <Box>
//               <h5>Agent ID: BRT-5654</h5>
//               <h5>Booking Id:BID-985412</h5>
//             </Box>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid item md={6}></Grid>
//             <Grid item md={6}></Grid>
//           </Grid>
//         </Box>

//         <Box className="ITINERARIES">
//           <h4>FLIGHT ITINERARIES</h4>

//           <Box className="ITINERARIES-details">
//             <Box>
//               <Box className="ITINERARIES-details-img">
//                 <img src={thai} />
//                 <span>THAI airways</span>
//               </Box>

//               <Box className="pdf-flight-det">
//                 <Box className="pdf-flight-det-left">
//                   <h2>{modalDetails?.modalDetails?.deptFrom}</h2>
//                   <h3>
//                     {modalDetails?.modalDetails?.dateTime?.slice(10, 16)}
//                   </h3>
//                   <span>
//                     {modalDetails?.modalDetails?.dateTime?.slice(0, 10)}
//                   </span>
//                 </Box>
//                 <Box style={{ position: "relative" }}>
//                   <img src={directionFlight} />
//                   <span
//                     style={{
//                       position: "absolute",
//                       left: "26px",
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       top: "15px",
//                     }}
//                   >
//                     1h 25m
//                   </span>
//                 </Box>
//                 <Box className="pdf-flight-det-left">
//                   <h2>{modalDetails?.modalDetails?.arriveTo}</h2>
//                   <h3>17:35</h3>
//                   <span>22, Apr, 2022</span>
//                 </Box>
//               </Box>
//             </Box>
//             <Box className="pdf-flight-right-det">
//               <h2>TG 322 • ECONOMY / L • 788</h2>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "10px" }}
//               >
//                 <p>DEPARTURE </p>
//                 <span>
//                   Dhaka, Shahjalal intl. Airport (DAC), Terminal 2
//                 </span>
//               </Box>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "25px" }}
//               >
//                 <p>LANDS IN </p>
//                 <span>Bangkok, Suvarnabhumi Intl.</span>
//               </Box>
//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "19px" }}
//               >
//                 <p>BAGGAGE </p>
//                 <span>Adult - Check in: 20K Cabin</span>
//               </Box>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "40px" }}
//               >
//                 <p>A-PNR </p>
//                 <span>WQOHG9</span>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//         <Box className="ITINERARIES">
//           <h4>FLIGHT ITINERARIES</h4>

//           <Box className="ITINERARIES-details">
//             <Box>
//               <Box className="ITINERARIES-details-img">
//                 <img src={thai} />
//                 <span>THAI airways</span>
//               </Box>

//               <Box className="pdf-flight-det">
//                 <Box className="pdf-flight-det-left">
//                   <h2>{modalDetails?.modalDetails?.deptFrom}</h2>
//                   <h3>
//                     {modalDetails?.modalDetails?.dateTime?.slice(10, 16)}
//                   </h3>
//                   <span>
//                     {modalDetails?.modalDetails?.dateTime?.slice(0, 10)}
//                   </span>
//                 </Box>
//                 <Box style={{ position: "relative" }}>
//                   <img src={directionFlight} />
//                   <span
//                     style={{
//                       position: "absolute",
//                       left: "26px",
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       top: "15px",
//                     }}
//                   >
//                     1h 25m
//                   </span>
//                 </Box>
//                 <Box className="pdf-flight-det-left">
//                   <h2>{modalDetails?.modalDetails?.arriveTo}</h2>
//                   <h3>17:35</h3>
//                   <span>22, Apr, 2022</span>
//                 </Box>
//               </Box>
//             </Box>
//             <Box className="pdf-flight-right-det">
//               <h2>TG 322 • ECONOMY / L • 788</h2>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "10px" }}
//               >
//                 <p>DEPARTURE </p>
//                 <span>
//                   Dhaka, Shahjalal intl. Airport (DAC), Terminal 2
//                 </span>
//               </Box>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "25px" }}
//               >
//                 <p>LANDS IN </p>
//                 <span>Bangkok, Suvarnabhumi Intl.</span>
//               </Box>
//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "19px" }}
//               >
//                 <p>BAGGAGE </p>
//                 <span>Adult - Check in: 20K Cabin</span>
//               </Box>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "40px" }}
//               >
//                 <p>A-PNR </p>
//                 <span>WQOHG9</span>
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//         <Box className="ITINERARIES">
//           <h4>FLIGHT ITINERARIES</h4>

//           <Box className="ITINERARIES-details">
//             <Box>
//               <Box className="ITINERARIES-details-img">
//                 <img src={thai} />
//                 <span>THAI airways</span>
//               </Box>

//               <Box className="pdf-flight-det">
//                 <Box className="pdf-flight-det-left">
//                   <h2>{modalDetails?.modalDetails?.deptFrom}</h2>
//                   <h3>
//                     {modalDetails?.modalDetails?.dateTime?.slice(10, 16)}
//                   </h3>
//                   <span>
//                     {modalDetails?.modalDetails?.dateTime?.slice(0, 10)}
//                   </span>
//                 </Box>
//                 <Box style={{ position: "relative" }}>
//                   <img src={directionFlight} />
//                   <span
//                     style={{
//                       position: "absolute",
//                       left: "26px",
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       top: "15px",
//                     }}
//                   >
//                     1h 25m
//                   </span>
//                 </Box>
//                 <Box className="pdf-flight-det-left">
//                   <h2>{modalDetails?.modalDetails?.arriveTo}</h2>
//                   <h3>17:35</h3>
//                   <span>22, Apr, 2022</span>
//                 </Box>
//               </Box>
//             </Box>
//             <Box className="pdf-flight-right-det">
//               <h2>TG 322 • ECONOMY / L • 788</h2>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "10px" }}
//               >
//                 <p>DEPARTURE </p>
//                 <span>
//                   Dhaka, Shahjalal intl. Airport (DAC), Terminal 2
//                 </span>
//               </Box>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "25px" }}
//               >
//                 <p>LANDS IN </p>
//                 <span>Bangkok, Suvarnabhumi Intl.</span>
//               </Box>
//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "19px" }}
//               >
//                 <p>BAGGAGE </p>
//                 <span>Adult - Check in: 20K Cabin</span>
//               </Box>

//               <Box
//                 className="departure-details5"
//                 sx={{ display: "flex", gap: "40px" }}
//               >
//                 <p>A-PNR </p>
//                 <span>WQOHG9</span>
//               </Box>
//             </Box>
//           </Box>
//         </Box>

//       </Box>
//     </Box>
//     <button onClick={handleToPrint}>Print </button>
//   </Container>
// </Box>
