import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import commaNumber from "comma-number";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import seat1 from "../../images/Icon/bag.svg";
import bag from "../../images/Icon/seat.svg";
import anemy from "../../images/anemy.png";
import FlightUserInfo from "../../components/FlightUserinfo/FlightUserInfo";
import FlightUserInfoFlyHub from "../../components/FlightUserinfo/FlightUserInfoFlyHub";
import FlightUserInfoSabre from "../../components/FlightUserinfo/FlightUserInfoSabre";
import Loader from "../../images/loader/Render.gif";
import NotFound from "../../images/undraw/undraw_not_found_re_bh2e.svg";
import FlightInfoDetails from "../../components/FlightInfoDetails/FlightInfoDetails";
import FlightIcon from "@mui/icons-material/Flight";
import "./FlightInformation.css";

const HtmlTooltip = styled(({ className, ...propss }) => (
  <Tooltip {...propss} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "crimson",
    maxWidth: 220,
    fontSize: "5px",
    borderRadius: "8px 0px 8px 0px",
  },
}));

const FlightInformation = (props) => {
  const location = useLocation();
  const [loadData, setLoadData] = useState([]);
  const { adultCount, childCount, infant } = location.state;
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  //todo: cupon
  const [coupon, setCoupon] = useState("");
  const [couponAppliedMessage, setCouponAppliedMessage] = useState({});
  //todo:end cupon
  //todo: Baggage Information
  const [adultBaggage, setAdultBaggage] = useState(0);
  const [childBaggage, setChildBaggage] = useState(0);
  const [infantBaggage, setInfantBaggage] = useState(0);
  //todo: End Baggage Information end

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //console.log(location.state?.flightData);

  let url;
  let body;
  if (location.state?.flightData?.system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state.flightData.segment,
      tripType: location.state.tripType === "oneway" ? "1" : "2",
      segments:
        location.state?.flightData?.segment === "3"
          ? [
              {
                departure: location.state.flightData.segments[0].departure,
                arrival: location.state.flightData.segments[0].arrival,
                dpTime: location.state.flightData.segments[0].departureTime,
                arrTime: location.state.flightData.segments[0].arrivalTime,
                bCode: location.state.flightData.segments[0].bookingcode,
                mCarrier: location.state.flightData.segments[0].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[0].marketingflight,
                oCarrier: location.state.flightData.segments[0].marketingcareer,
                oCarrierFN:
                  location.state.flightData.segments[0].operatingflight,
              },
              {
                departure: location.state.flightData.segments[1].departure,
                arrival: location.state.flightData.segments[1].arrival,
                dpTime: location.state.flightData.segments[1].departureTime,
                arrTime: location.state.flightData.segments[1].arrivalTime,
                bCode: location.state.flightData.segments[1].bookingcode,
                mCarrier: location.state.flightData.segments[1].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[1].marketingflight,
                oCarrier: location.state.flightData.segments[1].marketingcareer,
                oCarrierFN:
                  location.state.flightData.segments[1].operatingflight,
              },
              {
                departure: location.state.flightData.segments[2].departure,
                arrival: location.state.flightData.segments[2].arrival,
                dpTime: location.state.flightData.segments[2].departureTime,
                arrTime: location.state.flightData.segments[2].arrivalTime,
                bCode: location.state.flightData.segments[2].bookingcode,
                mCarrier: location.state.flightData.segments[2].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[2].marketingflight,
                oCarrier: location.state.flightData.segments[2].marketingcareer,
                oCarrierFN:
                  location.state.flightData.segments[2].operatingflight,
              },
            ]
          : location.state?.flightData?.segment === "2"
          ? [
              {
                departure: location.state.flightData.segments[0].departure,
                arrival: location.state.flightData.segments[0].arrival,
                dpTime: location.state.flightData.segments[0].departureTime,
                arrTime: location.state.flightData.segments[0].arrivalTime,
                bCode: location.state.flightData.segments[0].bookingcode,
                mCarrier: location.state.flightData.segments[0].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[0].marketingflight,
                oCarrier: location.state.flightData.segments[0].marketingcareer,
                oCarrierFN:
                  location.state.flightData.segments[0].operatingflight,
              },
              {
                departure: location.state.flightData.segments[1].departure,
                arrival: location.state.flightData.segments[1].arrival,
                dpTime: location.state.flightData.segments[1].departureTime,
                arrTime: location.state.flightData.segments[1].arrivalTime,
                bCode: location.state.flightData.segments[1].bookingcode,
                mCarrier: location.state.flightData.segments[1].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[1].marketingflight,
                oCarrier: location.state.flightData.segments[1].marketingcareer,
                oCarrierFN:
                  location.state.flightData.segments[1].operatingflight,
              },
            ]
          : [
              {
                departure: location.state.flightData.segments[0].departure,
                arrival: location.state.flightData.segments[0].arrival,
                dpTime: location.state.flightData.segments[0].departureTime,
                arrTime: location.state.flightData.segments[0].arrivalTime,
                bCode: location.state.flightData.segments[0].bookingcode,
                mCarrier: location.state.flightData.segments[0].marketingcareer,
                mCarrierFN:
                  location.state.flightData.segments[0].marketingflight,
                oCarrier: location.state.flightData.segments[0].marketingcareer,
                oCarrierFN:
                  location.state.flightData.segments[0].operatingflight,
              },
            ],
    };
  } else if (location.state?.flightData.system === "FlyHub") {
    url = "https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php";
    body = {
      SearchID: location.state?.flightData?.SearchID,
      ResultID: location.state?.flightData?.ResultID,
    };
  } else if (location.state?.flightData.system === "Galileo") {
    url = "https://api.flyfarint.com/v.1.0.0/Galileo/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state?.flightData?.segment,
      tripType: location.state.tripType === "oneway" ? "1" : "2",
      segments:
        location.state?.flightData?.segment === "2"
          ? [
              {
                AirSegmentKey:
                  location.state.flightData.segments[0].SegmentDetails.key,
                Group:
                  location.state.flightData.segments[0].SegmentDetails.Group,
                Carrier:
                  location.state.flightData.segments[0].SegmentDetails.Carrier,
                FareBasisCode: location.state.flightData.FareBasisCode,
                FlightNumber:
                  location.state.flightData.segments[0].SegmentDetails
                    .FlightNumber,
                Origin:
                  location.state.flightData.segments[0].SegmentDetails.Origin,
                Destination:
                  location.state.flightData.segments[0].SegmentDetails
                    .Destination,
                DepartureTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .DepartureTime,
                ArrivalTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .ArrivalTime,
                BookingCode: location.state.flightData.segments[0].bookingcode,
              },
              {
                AirSegmentKey:
                  location.state.flightData.segments[1].SegmentDetails.key,
                Group:
                  location.state.flightData.segments[1].SegmentDetails.Group,
                Carrier:
                  location.state.flightData.segments[1].SegmentDetails.Carrier,
                FareBasisCode: location.state.flightData.FareBasisCode,
                FlightNumber:
                  location.state.flightData.segments[1].SegmentDetails
                    .FlightNumber,
                Origin:
                  location.state.flightData.segments[1].SegmentDetails.Origin,
                Destination:
                  location.state.flightData.segments[1].SegmentDetails
                    .Destination,
                DepartureTime:
                  location.state.flightData.segments[1].SegmentDetails
                    .DepartureTime,
                ArrivalTime:
                  location.state.flightData.segments[1].SegmentDetails
                    .ArrivalTime,
                BookingCode: location.state.flightData.segments[1].bookingcode,
              },
            ]
          : [
              {
                AirSegmentKey:
                  location.state.flightData.segments[0].SegmentDetails.key,
                Group:
                  location.state.flightData.segments[0].SegmentDetails.Group,
                Carrier:
                  location.state.flightData.segments[0].SegmentDetails.Carrier,
                FareBasisCode: location.state.flightData.FareBasisCode,
                FlightNumber:
                  location.state.flightData.segments[0].SegmentDetails
                    .FlightNumber,
                Origin:
                  location.state.flightData.segments[0].SegmentDetails.Origin,
                Destination:
                  location.state.flightData.segments[0].SegmentDetails
                    .Destination,
                DepartureTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .DepartureTime,
                ArrivalTime:
                  location.state.flightData.segments[0].SegmentDetails
                    .ArrivalTime,
                BookingCode: location.state.flightData.segments[0].bookingcode,
              },
            ],
    };
  }

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.status !== "error" || data?.Error === null) {
          setLoadData(data);
        } else {
          throw new Error(data);
        }
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          imageUrl: NotFound,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "No Data Found",
          confirmButtonText: "Search Another Flights...",
          confirmButtonColor: "var(--primary-color)",
        }).then(function () {
          navigate(-1);
        });
      });
  }, [
    body.adultCount,
    body.childCount,
    body.infant,
    body.segment,
    body.tripType,
    navigate,
  ]);

  let adultPrice = 0,
    adultTaxPrice = 0,
    childPrice = 0,
    childTaxPrice = 0,
    infTaxPrice = 0,
    infPrice = 0,
    inTotalBaseFare = 0,
    totalTax = 0,
    totalFare = 0,
    totalBaseFare = 0,
    serviceFeeAdult = 0,
    serviceFeeChild = 0,
    serviceFeeInfant = 0,
    discount = 0,
    agentTotal = 0,
    limitTime;

  if (Object.keys(loadData).length !== 0) {
    if (adultCount > 0) {
      adultPrice =
        location.state?.flightData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[0].passengerInfo
              .passengerTotalFare.equivalentAmount * location?.state?.adultCount
          : location?.state?.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
              3
            ) * location?.state?.adultCount
          : loadData?.Results[0].Fares[0].BaseFare * adultCount;

      adultTaxPrice =
        location.state?.flightData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[0].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.adultCount
          : location.state?.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.adultCount +
            adultPrice
          : loadData?.Results[0].Fares[0].Tax * adultCount;
      serviceFeeAdult =
        location.state?.flightData?.system === "Sabre"
          ? 0
          : location.state?.flightData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[0]?.ServiceFee
          ? loadData?.Results[0]?.Fares[0]?.ServiceFee
          : 0 * location.state?.adultCount;
      // //console.log(loadData);
    }
    if (childCount > 0) {
      childPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.equivalentAmount * location.state?.childCount
          : location.state.flightData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.childCount
          : loadData?.Results[0].Fares[1].BaseFare * childCount;
      childTaxPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.childCount
          : location.state.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.childCount +
            childPrice
          : loadData?.Results[0]?.Fares[1]?.Tax * location.state?.childCount;
      serviceFeeChild =
        location.state?.flightData?.system === "Sabre"
          ? 0
          : location.state?.flightData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[1]?.ServiceFee
          ? loadData?.Results[0]?.Fares[1]?.ServiceFee
          : 0 * location.state?.childCount;
    }

    if (infant > 0) {
      infPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[2]
              ?.passengerInfo?.passengerTotalFare?.equivalentAmount ||
            loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[1]
              ?.passengerInfo.passengerTotalFare.equivalentAmount *
              location.state?.infant
          : location.state.flightData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.infant
          : loadData?.Results[0]?.Fares[2]?.BaseFare ||
            loadData?.Results[0]?.Fares[1]?.BaseFare * location.state?.infant;

      infTaxPrice =
        location.state.flightData?.system === "Sabre"
          ? loadData.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare
              ?.passengerInfoList[2]?.passengerInfo?.passengerTotalFare
              ?.totalTaxAmount ??
            loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0].pricingInformation[1]?.fare?.passengerInfoList[1]
              ?.passengerInfo?.passengerTotalFare?.totalTaxAmount *
              location.state?.infant
          : location.state.flightData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.infant +
            infPrice
          : loadData?.Results[0]?.Fares[2]?.Tax ??
            loadData?.Results[0]?.Fares[1]?.Tax * location.state?.infant;
      serviceFeeInfant =
        location.state?.flightData?.system === "Sabre"
          ? 0
          : location.state?.flightData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[2]?.ServiceFee
          ? loadData?.Results[0]?.Fares[2]?.ServiceFee
          : 0 * location.state?.infant;
    }

    totalTax =
      location.state?.flightData?.system === "Sabre"
        ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
            .pricingInformation[0].fare.totalFare.totalTaxAmount
        : location.state.flightData?.system === "Galileo"
        ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.Taxes?.slice(
            3
          )
        : adultTaxPrice + childTaxPrice + infTaxPrice;
    totalBaseFare =
      location.state.flightData?.system === "Sabre"
        ? adultPrice + childPrice + infPrice
        : location.state.flightData?.system === "Galileo"
        ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
            3
          )
        : adultPrice + childPrice + infPrice;
    totalFare =
      location.state.flightData?.system === "Sabre"
        ? totalBaseFare + totalTax
        : location.state.flightData?.system === "Galileo"
        ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
            3
          )
        : totalBaseFare +
          totalTax +
          serviceFeeAdult +
          serviceFeeChild +
          serviceFeeInfant;

    agentTotal =
      couponAppliedMessage?.status === "success"
        ? Number(location.state.agentFare - 100)
        : Number(location.state.agentFare);
    discount = Number(location.state.commission);

    limitTime =
      location.state.roundData?.system === "Sabre"
        ? new Date()
        : location.state.roundData?.system === "Galileo"
        ? new Date()
        : loadData?.Results
        ? loadData?.Results[0]?.LastTicketDate
        : new Date();
  }
  const timeconvarta1 = location?.state?.flightData?.segments[0]?.departureTime;
  const departureTime1 = new Date(timeconvarta1).toUTCString();
  const timeconvarta2 = location?.state?.flightData?.segments[1]?.departureTime;
  const departureTime2 = new Date(timeconvarta2).toUTCString();

  if (!isLoaded) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {Object.keys(loadData).length !== 0 ? (
        <Container>
          <Grid container mt={5}>
            <Grid item xs={12} sm={9} md={12} lg={12}>
              <Grid container>
                <Grid item xs={12} sm={3} md={6} lg={6}>
                  <Box className="flight-accordian1">
                    <Box
                      style={{ padding: "0px" }}
                      className="flight-accordian2"
                    >
                      {location.state?.flightData.segment === "3" ? (
                        <Box>
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
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "var(--primary-color)",
                              }}
                            >
                              {
                                location.state?.flightData?.segments[0]
                                  ?.marketingcareerName
                              }{" "}
                              ,{" "}
                              {
                                location.state?.flightData?.segments[1]
                                  ?.marketingcareerName
                              }{" "}
                              &{" "}
                              {
                                location.state?.flightData?.segments[2]
                                  ?.marketingcareerName
                              }
                            </Typography>
                          </Box>

                          {/* segment start */}

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
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.departureTime}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.departure}
                                </span>
                                <FlightIcon
                                  style={{
                                    transform: "rotate(90deg)",
                                    fontSize: "25px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.arrivalTime}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.arrival}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "12px",
                                    color: "#003566",
                                  }}
                                >
                                  2 Stop(s){" "}
                                  {location.state?.flightData?.flightduration}
                                </span>
                              </Box>
                            </Box>

                            <Box
                              style={{
                                borderLeft: "2px solid var(--primary-color)",
                                position: "absolute",
                              }}
                              mt={2}
                            >
                              <Box
                                style={{ display: "flex", marginLeft: "10px" }}
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.departure
                                      }
                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[0]?.departureTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.departureAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[0]?.departureLocation?.split(
                                          ","
                                        )[1]
                                      }
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
                                      {new Date(
                                        location?.state?.flightData?.segments[0]?.departureTime
                                      )?.toDateString()}
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
                                    <Box sx={{ width: "50px", height: "50px" }}>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                        className={`${location.state?.flightData?.system.toLowerCase()}`}
                                        alt={`${location.state?.flightData?.segment?.marketingcareer}`}
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
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.marketingcareerName
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "12px",
                                          fontWeight: "500",
                                          color: "var(--primary-color)",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.marketingcareer
                                        }{" "}
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.marketingflight
                                        }{" "}
                                        || Flight Duration:
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.flightduration
                                        }
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.arrival
                                      }

                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[0]?.arrivalTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.arrivalAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[0]?.arrivalLocation?.split(
                                          ","
                                        )[1]
                                      }
                                    </Typography>

                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#282E2C",
                                      }}
                                    >
                                      Arrival Date:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[0]?.arrivalTime
                                      )?.toDateString()}
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
                                      {
                                        location?.state?.flightData?.transit
                                          ?.transit1
                                      }
                                    </Typography>

                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#222222",
                                      }}
                                    >
                                      Departure Date & Time:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[1]?.departureTime
                                      )?.toDateString()}{" "}
                                      ||{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[1]?.departureTime
                                      )
                                        ?.toTimeString()
                                        ?.split(" ")
                                        ?.at(0)
                                        .slice(0, 5)}
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
                                    <Box sx={{ width: "50px", height: "50px" }}>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[1]?.marketingcareer}.png`}
                                        className={`${location.state?.flightData?.system.toLowerCase()}`}
                                        alt={`${location.state?.flightData?.segment?.marketingcareer}`}
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
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.marketingcareerName
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "12px",
                                          fontWeight: "500",
                                          color: "var(--primary-color)",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.marketingcareer
                                        }{" "}
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.marketingflight
                                        }{" "}
                                        || Flight Duration:
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.flightduration
                                        }
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
                                      {
                                        location.state?.flightData?.segments[1]
                                          ?.arrival
                                      }

                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[1]?.arrivalTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[1]
                                          ?.arrivalAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[1]?.arrivalLocation?.split(
                                          ","
                                        )[1]
                                      }
                                    </Typography>

                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#282E2C",
                                      }}
                                    >
                                      Arrival Date:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[1]?.arrivalTime
                                      )?.toDateString()}
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
                                      {
                                        location?.state?.flightData?.transit
                                          ?.transit2
                                      }
                                    </Typography>

                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#222222",
                                      }}
                                    >
                                      Departure Date & Time:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[2]?.departureTime
                                      )?.toDateString()}{" "}
                                      ||{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[2]?.departureTime
                                      )
                                        ?.toTimeString()
                                        ?.split(" ")
                                        ?.at(0)
                                        .slice(0, 5)}
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
                                    <Box sx={{ width: "50px", height: "50px" }}>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[2]?.marketingcareer}.png`}
                                        className={`${location.state?.flightData?.system.toLowerCase()}`}
                                        alt={`${location.state?.flightData?.segment?.marketingcareer}`}
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
                                        {
                                          location.state?.flightData
                                            ?.segments[2]?.marketingcareerName
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "12px",
                                          fontWeight: "500",
                                          color: "var(--primary-color)",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.segments[2]?.marketingcareer
                                        }{" "}
                                        {
                                          location.state?.flightData
                                            ?.segments[2]?.marketingflight
                                        }{" "}
                                        || Flight Duration:
                                        {
                                          location.state?.flightData
                                            ?.segments[2]?.flightduration
                                        }
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
                                      {
                                        location.state?.flightData?.segments[2]
                                          ?.arrival
                                      }
                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[2]?.arrivalTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[2]
                                          ?.arrivalAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[2]?.arrivalLocation?.split(
                                          ","
                                        )[1]
                                      }
                                    </Typography>
                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#282E2C",
                                      }}
                                    >
                                      Arrival Date:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[2]?.arrivalTime
                                      )?.toDateString()}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          {/* segment end */}

                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            mt={4}
                          >
                            <Typography
                              style={{
                                color: "#222222",
                                fontSize: "15px",
                                fontFamily: "poppins",
                                fontWeight: "500",
                              }}
                            >
                              {location.state?.flightData?.refundable}
                            </Typography>
                            <Box style={{ display: "flex", gap: "10px" }}>
                              <WorkIcon
                                style={{
                                  fontSize: "20px",
                                  color: "#222222",
                                }}
                              />
                              <Typography
                                style={{
                                  color: "#222222",
                                  fontSize: "15px",
                                  fontFamily: "poppins",
                                  fontWeight: "500",
                                }}
                              >
                                {location.state?.flightData?.bags === "1" ||
                                "2" ||
                                "3" ? (
                                  <>{location.state?.flightData?.bags} Piece </>
                                ) : (
                                  <> {location.state?.flightData?.bags} kg</>
                                )}
                              </Typography>
                            </Box>
                            <Typography
                              style={{
                                color: "#222222",
                                fontSize: "15px",
                                fontFamily: "poppins",
                                fontWeight: "500",
                              }}
                            >
                              {location.state?.flightData?.seat} Seats
                            </Typography>
                          </Box>
                        </Box>
                      ) : location.state?.flightData.segment === "2" ? (
                        <Box>
                          <Box style={{ padding: "5px 0" }}>
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
                              {
                                location.state?.flightData?.segments[0]
                                  ?.marketingcareerName
                              }
                            </Typography>
                          </Box>
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
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.departureTime}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.departure}
                                </span>
                                <FlightIcon
                                  style={{
                                    transform: "rotate(90deg)",
                                    fontSize: "25px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.arrivalTime}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.arrival}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "12px",
                                    color: "#003566",
                                  }}
                                >
                                  1 Stop(s){" "}
                                  {location.state?.flightData?.flightduration}
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
                              <Box
                                style={{ display: "flex", marginLeft: "10px" }}
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.departure
                                      }
                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[0]?.departureTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.departureAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[0]?.departureLocation?.split(
                                          ","
                                        )[1]
                                      }
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
                                      {new Date(
                                        location?.state?.flightData?.segments[0]?.departureTime
                                      )?.toDateString()}
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
                                    <Box sx={{ width: "50px", height: "50px" }}>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                        className={`${location.state?.flightData?.system.toLowerCase()}`}
                                        alt={`${location.state?.flightData?.segment?.marketingcareer}`}
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
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.marketingcareerName
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "12px",
                                          fontWeight: "500",
                                          color: "var(--primary-color)",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.marketingcareer
                                        }{" "}
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.marketingflight
                                        }{" "}
                                        || Flight Duration:
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.flightduration
                                        }
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.arrival
                                      }

                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[0]?.arrivalTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[0]
                                          ?.arrivalAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[0]?.arrivalLocation?.split(
                                          ","
                                        )[1]
                                      }
                                    </Typography>

                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#282E2C",
                                      }}
                                    >
                                      Arrival Date:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[0]?.arrivalTime
                                      )?.toDateString()}
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
                                      {
                                        location?.state?.flightData?.transit
                                          ?.transit1
                                      }
                                    </Typography>

                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#222222",
                                      }}
                                    >
                                      Departure Date & Time:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[1]?.departureTime
                                      )?.toDateString()}{" "}
                                      ||{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[1]?.departureTime
                                      )
                                        ?.toTimeString()
                                        ?.split(" ")
                                        ?.at(0)
                                        .slice(0, 5)}
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
                                    <Box sx={{ width: "50px", height: "50px" }}>
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[1]?.marketingcareer}.png`}
                                        className={`${location.state?.flightData?.system.toLowerCase()}`}
                                        alt={`${location.state?.flightData?.segment?.marketingcareer}`}
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
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.marketingcareerName
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "12px",
                                          fontWeight: "500",
                                          color: "var(--primary-color)",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.marketingcareer
                                        }{" "}
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.marketingflight
                                        }{" "}
                                        || Flight Duration:
                                        {
                                          location.state?.flightData
                                            ?.segments[1]?.flightduration
                                        }
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
                                      {
                                        location.state?.flightData?.segments[1]
                                          ?.arrival
                                      }
                                      <span
                                        style={{
                                          color: "#282E2C",
                                          padding: "0px 10px",
                                        }}
                                      >
                                        {new Date(
                                          location?.state?.flightData?.segments[1]?.arrivalTime
                                        )
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
                                      {
                                        location.state?.flightData?.segments[1]
                                          ?.arrivalAirport
                                      }
                                      ,
                                      {
                                        location.state?.flightData?.segments[1]?.arrivalLocation?.split(
                                          ","
                                        )[1]
                                      }
                                    </Typography>
                                    <Typography
                                      style={{
                                        fontFamily: "Poppins",
                                        fontWeight: "500",
                                        fontSize: "12px",
                                        color: "#282E2C",
                                      }}
                                    >
                                      Arrival Date:{" "}
                                      {new Date(
                                        location?.state?.flightData?.segments[1]?.arrivalTime
                                      )?.toDateString()}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            mt={2}
                          >
                            <Typography
                              style={{
                                color: "#2564b8",
                                fontSize: "12px",
                                fontFamily: "poppins",
                                fontWeight: "500",
                              }}
                            >
                              {location.state?.flightData?.refundable}
                            </Typography>
                            <Box style={{ display: "flex", gap: "10px" }}>
                              <WorkIcon
                                style={{
                                  fontSize: "18px",
                                  color: "#2564b8",
                                }}
                              />
                              <Typography
                                style={{
                                  color: "#2564b8",
                                  fontSize: "12px",
                                  fontFamily: "poppins",
                                  fontWeight: "500",
                                }}
                              >
                                {location.state?.flightData?.bags}
                              </Typography>
                            </Box>
                            <Typography
                              style={{
                                color: "#2564b8",
                                fontSize: "12px",
                                fontFamily: "poppins",
                                fontWeight: "500",
                              }}
                            >
                              {location.state?.flightData?.seat} Seats
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box mb={2}>
                          <Grid container justifyContent={"space-between"}>
                            <Box>
                              <Box style={{ padding: "5px 0" }}>
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
                                  {
                                    location.state?.flightData?.segments[0]
                                      ?.marketingcareerName
                                  }
                                </Typography>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.departureTime}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.departure}
                                </span>
                                <FlightIcon
                                  style={{
                                    transform: "rotate(90deg)",
                                    fontSize: "25px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.arrivalTime}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                  }}
                                >
                                  {location.state?.flightData?.arrival}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    fontSize: "12px",
                                    color: "#003566",
                                  }}
                                >
                                  Non Stop(s){" "}
                                  {location.state?.flightData?.flightduration}
                                </span>
                              </Box>
                              <Box
                                style={{
                                  borderLeft: "2px solid var(--primary-color)",
                                  position: "absulote",
                                }}
                                mt={2}
                              >
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
                                        {location.state?.flightData?.departure}
                                        <span
                                          style={{
                                            color: "#282E2C",
                                            padding: "0px 10px",
                                          }}
                                        >
                                          {
                                            location.state?.flightData
                                              ?.departureTime
                                          }
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
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.departureAirport
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontWeight: "500",
                                          fontSize: "12px",
                                          color: "#282E2C",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.departureDate
                                        }
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
                                      <Box
                                        sx={{ width: "50px", height: "50px" }}
                                      >
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                          className={`${location.state?.flightData?.system.toLowerCase()}`}
                                          alt={`${location.state?.flightData?.segment?.marketingcareer}`}
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
                                          {
                                            location.state?.flightData
                                              ?.segments[0]?.marketingcareerName
                                          }
                                        </Typography>
                                        <Typography
                                          style={{
                                            fontFamily: "Poppins",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            color: "var(--primary-color)",
                                          }}
                                        >
                                          {
                                            location.state?.flightData
                                              ?.segments[0]?.marketingcareer
                                          }
                                          &nbsp;
                                          {
                                            location.state?.flightData
                                              ?.segments[0]?.marketingflight
                                          }{" "}
                                          || Flight Duration:{" "}
                                          {
                                            location.state?.flightData
                                              ?.flightduration
                                          }
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
                                        {location.state?.flightData?.arrival} -{" "}
                                        <span
                                          style={{
                                            color: "#282E2C",
                                            padding: "0px 10px",
                                          }}
                                        >
                                          {
                                            location.state?.flightData
                                              ?.arrivalTime
                                          }
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
                                        {
                                          location.state?.flightData
                                            ?.segments[0]?.arrivalAirport
                                        }
                                      </Typography>
                                      <Typography
                                        style={{
                                          fontFamily: "Poppins",
                                          fontWeight: "500",
                                          fontSize: "12px",
                                          color: "#282E2C",
                                        }}
                                      >
                                        {
                                          location.state?.flightData
                                            ?.arrivalDate
                                        }
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                                mt={2}
                              >
                                <Typography
                                  style={{
                                    color: "#2564b8",
                                    fontSize: "12px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  {location.state?.flightData?.refundable}
                                </Typography>
                                <Box style={{ display: "flex", gap: "10px" }}>
                                  <WorkIcon
                                    style={{
                                      fontSize: "18px",
                                      color: "#2564b8",
                                    }}
                                  />
                                  <Typography
                                    style={{
                                      color: "#2564b8",
                                      fontSize: "12px",
                                      fontFamily: "poppins",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {location.state?.flightData?.bags}
                                  </Typography>
                                </Box>
                                <Typography
                                  style={{
                                    color: "#2564b8",
                                    fontSize: "12px",
                                    fontFamily: "poppins",
                                    fontWeight: "500",
                                  }}
                                >
                                  {location.state?.flightData?.seat} Seats
                                </Typography>
                              </Box>
                            </Box>

                            {/* ---------------------- ------------------------------------ */}
                          </Grid>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} md={6} lg={6}>
                  {/*// todo: price breakdown section */}
                  <FlightInfoDetails
                    loadData={loadData}
                    searchData={location?.state}
                    adultCount={location?.state?.adultCount}
                    childCount={location?.state?.childCount}
                    infant={location?.state?.infant}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    totalBaseFare={totalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    inTotalBaseFare={inTotalBaseFare}
                    limitTime={limitTime}
                    clientFare={location.state.clientFare}
                    agentTotal={agentTotal}
                    discount={discount}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                    cabin={location.state?.flightData?.segments[0]?.bookingcode}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9} md={12} lg={12}>
              <Box mt={3}>
                {location.state?.flightData?.system === "Galileo" ? (
                  <FlightUserInfo
                    loadData={loadData}
                    userData={location.state}
                    searchResult={loadData}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    totalBaseFare={totalBaseFare}
                    inTotalBaseFare={inTotalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                  />
                ) : location.state?.flightData?.system === "FlyHub" ? (
                  <FlightUserInfoFlyHub
                    loadData={loadData}
                    userData={location.state}
                    searchResult={loadData}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    inTotalBaseFare={inTotalBaseFare}
                    totalBaseFare={totalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                  />
                ) : (
                  <FlightUserInfoSabre
                    loadData={loadData}
                    userData={location.state}
                    searchResult={loadData}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    infTaxPrice={infTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    inTotalBaseFare={inTotalBaseFare}
                    totalBaseFare={totalBaseFare}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    adultBaggage={adultBaggage}
                    setAdultBaggage={setAdultBaggage}
                    childBaggage={childBaggage}
                    setChildBaggage={setChildBaggage}
                    infantBaggage={infantBaggage}
                    setInfantBaggage={setInfantBaggage}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            width: "70vw",
            marginInline: "auto",
          }}
        >
          <Box
            style={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Loader}
              alt="loader"
              style={{
                width: "40%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default FlightInformation;
