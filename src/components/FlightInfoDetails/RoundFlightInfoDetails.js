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
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";

const RoundFlightInfoDetails = ({
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
  inTotalBaseFare,
  totalTax,
  totalFare,
  totalBaseFare,
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
  goAdultBagage,
  setGoAdultBagage,
  goChildBagage,
  setGoChildBagage,
  goInfatBagage,
  setGoInfatBagage,
  backAdultBagage,
  setBackAdultBagage,
  backChildBagage,
  setBackChildBagage,
  backInfantBagage,
  setBackInfantBagage,
}) => {
  useEffect(() => {
    if (searchData?.roundData?.system === "FlyHub") {
      const [adultBag = "", childBag = "", infantBag = ""] =
        loadData?.Results[0]?.segments[0]?.baggageDetails;
      setGoAdultBagage(adultBag.Checkin);
      setBackAdultBagage(adultBag.Checkin);
      setGoChildBagage(childBag.Checkin || "");
      setBackChildBagage(childBag.Checkin || "");
      setGoInfatBagage(infantBag.Checkin || "");
      setBackInfantBagage(infantBag.Checkin || "");
    }
    const baggagefunction = () => {
      if (searchData?.roundData?.system === "Sabre") {
        if (adultCount > 0 && childCount > 0 && infant > 0) {
          const goadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const goadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.pieceCount;
          setGoAdultBagage(goadultBag);

          const gochildBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance.ref || 0;

          const gochildBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              gochildBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              gochildBagRef - 1
            ]?.pieceCount ||
            0;
          setGoChildBagage(gochildBag);

          const goinfantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[2]?.passengerInfo
              ?.baggageInformation[0]?.allowance?.ref || 0;

          const goinfantBag =
            loadData?.groupedItineraryResponse?.baggageAllowanceDescs[
              goinfantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goinfantBagRef - 1
            ]?.pieceCount;
          setGoInfatBagage(goinfantBag);
        } else if (adultCount > 0 && childCount > 0) {
          const goadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const goadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.pieceCount;
          setGoAdultBagage(goadultBag);

          const gochildBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance.ref || 0;

          const gochildBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              gochildBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              gochildBagRef - 1
            ]?.pieceCount ||
            0;
          setGoChildBagage(gochildBag);
        } else if (adultCount > 0 && infant > 0) {
          const goadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const goadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.pieceCount;
          setGoAdultBagage(goadultBag);

          const goinfantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[0]?.allowance?.ref || 0;

          const goinfantBag =
            loadData?.groupedItineraryResponse?.baggageAllowanceDescs[
              goinfantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goinfantBagRef - 1
            ]?.pieceCount;
          setGoInfatBagage(goinfantBag);
        } else {
          const goadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[0]?.allowance?.ref || 0;
          const goadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              goadultBagRef - 1
            ]?.pieceCount;
          setGoAdultBagage(goadultBag);
        }

        if (adultCount > 0 && childCount > 0 && infant > 0) {
          const backadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[1]?.allowance?.ref;
          const backadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.pieceCount;
          setBackAdultBagage(backadultBag);
          const backchildBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0]
              ?.itineraries[0].pricingInformation[0]?.fare?.passengerInfoList[1]
              ?.passengerInfo?.baggageInformation[1]?.allowance?.ref;

          const backchildBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backchildBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backchildBagRef - 1
            ]?.pieceCount;
          setBackChildBagage(backchildBag);

          const backinfantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[2]?.passengerInfo
              ?.baggageInformation[1]?.allowance?.ref;

          const backinfantBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backinfantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backinfantBagRef - 1
            ]?.pieceCount;
          setBackInfantBagage(backinfantBag);
        } else if (adultCount > 0 && childCount > 0) {
          const backadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[1]?.allowance?.ref;
          const backadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.pieceCount;
          setBackAdultBagage(backadultBag);

          const backchildBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0]
              ?.itineraries[0].pricingInformation[0]?.fare?.passengerInfoList[1]
              ?.passengerInfo?.baggageInformation[1]?.allowance?.ref;

          const backchildBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backchildBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backchildBagRef - 1
            ]?.pieceCount;
          setBackChildBagage(backchildBag);
        } else if (adultCount > 0 && infant > 0) {
          const backadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[1]?.allowance?.ref;
          const backadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.pieceCount;
          setBackAdultBagage(backadultBag);

          const backinfantBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[1]?.passengerInfo
              ?.baggageInformation[1]?.allowance?.ref;

          const backinfantBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backinfantBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backinfantBagRef - 1
            ]?.pieceCount;
          setBackInfantBagage(backinfantBag);
        } else {
          const backadultBagRef =
            loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare?.passengerInfoList[0]?.passengerInfo
              .baggageInformation[1]?.allowance?.ref;
          const backadultBag =
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.weight ||
            loadData?.groupedItineraryResponse.baggageAllowanceDescs[
              backadultBagRef - 1
            ]?.pieceCount;
          setBackAdultBagage(backadultBag);
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
    <Box
      sx={{
        marginTop: "0px",
        width: "100%",
        height: "80vh",
        overflow: "auto",
      }}
      className="no-scrollbar"
    >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {searchData?.roundData?.godeparture?.trim()} -{" "}
              {searchData?.roundData?.goarrival?.trim()}
            </Typography>
          </Box>
          <Box>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography color="var(--secondary-color)" fontSize="14px">
                  {adultCount > 0 && (
                    <>
                      Adult <br />
                    </>
                  )}

                  {childCount > 0 && (
                    <>
                      Child
                      <br />
                    </>
                  )}

                  {infant > 0 && (
                    <>
                      Infant <br />
                    </>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="var(--secondary-color)" fontSize="14px">
                  {searchData?.roundData?.system === "Sabre" ? (
                    <>
                      {goAdultBagage === 0 && (
                        <>
                          "0Kg"
                          <br />
                        </>
                      )}
                      {goChildBagage === 0 && (
                        <>
                          "0Kg"
                          <br />
                        </>
                      )}
                      {goInfatBagage === 0 && "0Kg"}
                      {goAdultBagage ? (
                        <>
                          {goAdultBagage > 5 ? (
                            <>{goAdultBagage || 0}Kg </>
                          ) : goAdultBagage < 0 ? (
                            <>0 Kg</>
                          ) : (
                            <>{goAdultBagage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : null}
                      {goChildBagage ? (
                        <>
                          {goChildBagage > 5 ? (
                            <>{goChildBagage || 0}Kg </>
                          ) : (
                            <>{goChildBagage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : null}
                      {goInfatBagage ? (
                        <>
                          {goInfatBagage > 5 ? (
                            <>{goInfatBagage || 0}Kg </>
                          ) : (
                            <>{goInfatBagage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : null}
                    </>
                  ) : searchData?.roundData?.system === "FlyHub" ? (
                    <>
                      <Typography
                        color="var(--secondary-color)"
                        fontSize="14px"
                      >
                        {loadData?.Results[0].segments[0].Baggage === null && (
                          <>
                            {adultCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {childCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {infant > 0 && <>0Kg</>}
                          </>
                        )}
                        {loadData?.Results[0]?.segments[0]?.baggageDetails.map(
                          (bag) => (
                            <>
                              {bag?.Checkin || "0"} <br />
                            </>
                          )
                        )}
                      </Typography>
                    </>
                  ) : null}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              {searchData?.roundData?.backdeparture?.trim()} -{" "}
              {searchData?.roundData?.backarrival?.trim()}
            </Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography color="var(--secondary-color)" fontSize="14px">
                  {adultCount > 0 && (
                    <>
                      Adult <br />
                    </>
                  )}

                  {childCount > 0 && (
                    <>
                      Child
                      <br />
                    </>
                  )}

                  {infant > 0 && (
                    <>
                      Infant <br />
                    </>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color="var(--secondary-color)" fontSize="14px">
                  {searchData?.roundData?.system === "Sabre" ? (
                    <>
                      {backAdultBagage === 0 && (
                        <>
                          0Kg
                          <br />
                        </>
                      )}
                      {backChildBagage === 0 && (
                        <>
                          0Kg
                          <br />
                        </>
                      )}
                      {backInfantBagage === 0 && "0Kg"}
                      {backAdultBagage ? (
                        <>
                          {backAdultBagage > 5 ? (
                            <>{backAdultBagage || 0}Kg </>
                          ) : (
                            <>{backAdultBagage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                      {backChildBagage ? (
                        <>
                          {backChildBagage > 5 ? (
                            <>{backChildBagage || 0}Kg </>
                          ) : (
                            <>{backChildBagage || 0}Piece </>
                          )}
                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                      {backInfantBagage ? (
                        <>
                          {backInfantBagage > 5 ? (
                            <>{backInfantBagage || 0}Kg </>
                          ) : (
                            <>{backInfantBagage || 0}Piece </>
                          )}

                          <br />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : searchData?.roundData?.system === "FlyHub" ? (
                    <>
                      <Typography
                        color="var(--secondary-color)"
                        fontSize="14px"
                      >
                        {loadData?.Results[0].segments[0]?.Baggage === null && (
                          <>
                            {adultCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {childCount > 0 && (
                              <>
                                0Kg <br />{" "}
                              </>
                            )}
                            {infant > 0 && <>0Kg</>}
                          </>
                        )}
                        {loadData?.Results[0]?.segments[1]?.TripIndicator ===
                        "InBound" ? (
                          <>
                            {loadData?.Results[0]?.segments[1]?.baggageDetails.map(
                              (bag) => (
                                <>
                                  {bag?.Checkin || "0"} <br />
                                </>
                              )
                            )}
                          </>
                        ) : loadData?.Results[0]?.segments[2]?.TripIndicator ===
                          "InBound" ? (
                          <>
                            {" "}
                            {loadData?.Results[0]?.segments[2]?.baggageDetails.map(
                              (bag) => (
                                <>
                                  {bag?.Checkin || "0"} <br />
                                </>
                              )
                            )}
                          </>
                        ) : (
                          <>
                            {loadData?.Results[0]?.segments[3]?.baggageDetails.map(
                              (bag) => (
                                <>
                                  {bag?.Checkin || "0"} <br />
                                </>
                              )
                            )}
                          </>
                        )}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
  );
};

export default RoundFlightInfoDetails;
