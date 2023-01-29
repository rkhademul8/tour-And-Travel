import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import commaNumber from "comma-number";
import AddIcon from "@mui/icons-material/Add";
import secureLocalStorage from "react-secure-storage";
import { useEffect } from "react";
import { Container } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import "./FlightInfoDetails.css";
import { useState } from "react";

const FlightInfoDetails = ({
  loadData,
  searchData,
  adultCount,
  childCount,
  infant,
  adultPrice,
  childPrice,
  infPrice,
  adultTaxPrice,
  childTaxPrice,
  infTaxPrice,
  totalBaseFare,
  inTotalBaseFare,
  totalTax,
  totalFare,
  clientFare,
  serviceFeeAdult,
  serviceFeeChild,
  serviceFeeInfant,
  agentTotal,
  discount,
  coupon,
  setCoupon,
  couponAppliedMessage,
  setCouponAppliedMessage,
  adultBaggage,
  setAdultBaggage,
  childBaggage,
  setChildBaggage,
  infantBaggage,
  setInfantBaggage,
  cabin,
}) => {
  const users = secureLocalStorage.getItem("user-info");

  useEffect(() => {
    if (searchData?.flightData?.system === "FlyHub") {
      const [adultBag = "", childBag = "", infantBag = ""] =
        loadData?.Results[0]?.segments[0]?.baggageDetails;
      setAdultBaggage(adultBag.Checkin);
      setChildBaggage(childBag.Checkin || "");
      setInfantBaggage(infantBag.Checkin || "");
    }
    const baggagefunction = () => {
      if (searchData?.flightData?.system === "Sabre") {
        if (adultCount > 0 && childCount > 0 && infant > 0) {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);

          const childBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance.ref || 0;

          const childBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.pieceCount ||
            0;
          setChildBaggage(childBag);

          const infantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[2]?.passengerInfo
              ?.baggageInformation[0]?.allowance?.ref || 0;

          const infantBag =
            loadData?.groupedItineraryResponse?.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.pieceCount;
          setInfantBaggage(infantBag);
        } else if (adultCount > 0 && childCount > 0) {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);

          const childBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance.ref || 0;

          const childBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              childBagRef - 1
            ]?.pieceCount ||
            0;
          setChildBaggage(childBag);
        } else if (adultCount > 0 && infant > 0) {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);

          const infantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance?.ref || 0;

          const infantBag =
            loadData?.groupedItineraryResponse?.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              infantBagRef - 1
            ]?.pieceCount;
          setInfantBaggage(infantBag);
        } else {
          const adultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const adultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              adultBagRef - 1
            ]?.pieceCount;
          setAdultBaggage(adultBag);
        }
      }
    };
    baggagefunction();
  }, []);

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Box style={{ marginTop: "20px" }}>
        {/*  //TODO:price break down start here */}
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
                  color: "var(--white)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Price Breakdown
              </Typography>
              <Box>
                {expanded === "panel1" ? (
                  <RemoveIcon style={{ color: "#fff", fontSize: "25px" }} />
                ) : (
                  <AddIcon style={{ color: "#fff", fontSize: "25px" }} />
                )}
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails className="flight-accordian2">
            <Box>
              <Typography
                style={{
                  color: "var(--black)",
                  fontFamily: "poppins",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Total Payable
              </Typography>
              <Typography
                style={{
                  color: "var(--black)",
                  fontFamily: "poppins",
                  fontSize: "22px",
                  fontWeight: "500",
                }}
              >
                BDT {commaNumber(totalFare)} ৳
              </Typography>
            </Box>

            {adultCount >= 1 && childCount >= 1 && infant >= 1 ? (
              <Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "var(-third-color)",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Adult x{adultCount}
                  </Typography>

                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(-third-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(adultPrice)}৳
                    </Typography>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(adultTaxPrice)}৳
                    </Typography>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#22222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {serviceFeeAdult}৳
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>

                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Child x{childCount}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(childPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(childTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {serviceFeeChild}৳
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>

                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Infant x{infant}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(infPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(infTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#22222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {serviceFeeInfant}৳
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            ) : adultCount >= 1 && childCount >= 1 ? (
              <Box>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Adult x{adultCount}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "var(secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(adultPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(adultTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {serviceFeeAdult}৳
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>
                <Box>
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    Child x{childCount}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(childPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {commaNumber(childTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      sx={{
                        color: "var(--secondary-color)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      sx={{
                        color: "var(--black)",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {serviceFeeChild}৳
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>
              </Box>
            ) : adultCount >= 1 && infant >= 1 ? (
              <Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Adult x{adultCount}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(adultPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(adultTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {serviceFeeAdult}৳
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>
                <Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      color: "#222222",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    Infant x{infant}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Base
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(infPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(infTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {serviceFeeInfant}৳
                    </Typography>
                  </Grid>
                </Box>
                <Box className="eticket-hr-line"></Box>
              </Box>
            ) : (
              <Box>
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
                      Adult x{adultCount}
                    </Typography>
                  </Box>
                  <Grid container justifyContent="space-between">
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
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(adultPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Taxes
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {commaNumber(adultTaxPrice)}৳
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "#222222",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      Service Fee
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "var(--secondary-color)",
                        fontFamily: "poppins",
                        fontWeight: "500",
                      }}
                    >
                      {serviceFeeAdult}৳
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            )}

            <Box my={2} height="2px" bgcolor="#DEDEDE"></Box>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Total PAX
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {adultCount + childCount + infant}&#128100;
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Total Base Fare
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(totalBaseFare)}৳
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Total TAX
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(totalTax)}৳
              </Typography>
            </Grid>

            {couponAppliedMessage.status === "success" && (
              <Grid container justifyContent="space-between">
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "#222222",
                    fontFamily: "poppins",
                    fontWeight: "500",
                  }}
                >
                  Coupon
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "var(--secondary-color)",
                    fontFamily: "poppins",
                    fontWeight: "500",
                  }}
                >
                  {commaNumber(-100)}৳
                </Typography>
              </Grid>
            )}
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Agent Total
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {couponAppliedMessage.status === "success"
                  ? commaNumber(agentTotal - 100)
                  : commaNumber(agentTotal)}
                ৳
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Customer Total
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(totalFare)}৳
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography
                style={{
                  fontSize: "12px",
                  color: "#222222",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                Discount
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  color: "var(--secondary-color)",
                  fontFamily: "poppins",
                  fontWeight: "500",
                }}
              >
                {commaNumber(discount)}৳
              </Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
        {/* //TODO: price break down end here */}
        {/* //TODO: Baggage Policy */}
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
                  <RemoveIcon style={{ color: "#fff", fontSize: "25px" }} />
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
              {adultBaggage ? (
                <tr>
                  <td>Adult</td>
                  <td>{adultBaggage} KG</td>
                  <td>{cabin}</td>
                </tr>
              ) : (
                ""
              )}

              {childBaggage ? (
                <tr style={{ background: "#fff" }}>
                  <td>Child</td>
                  <td>{childBaggage} KG</td>
                  <td>{cabin}</td>
                </tr>
              ) : (
                ""
              )}

              {infantBaggage ? (
                <tr>
                  <td>Infant</td>
                  <td>{infantBaggage} KG</td>
                  <td>{cabin}</td>
                </tr>
              ) : (
                ""
              )}
            </table>
          </AccordionDetails>
        </Accordion>
        {/* //TODO: End Baggage Policy */}
        {/* //Todo: Cancellation Policy Section */}
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
                  <RemoveIcon style={{ color: "#fff", fontSize: "25px" }} />
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
        {/* //Todo: End Cancellation Policy Section */}
      </Box>
    </Container>
  );
};

export default FlightInfoDetails;
