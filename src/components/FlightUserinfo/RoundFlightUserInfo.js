import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CircleIcon from "@mui/icons-material/Circle";
import FlightIcon from "@mui/icons-material/Flight";
import seat1 from "../../images/Icon/bag.svg";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import commaNumber from "comma-number";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import { AiFillCaretDown } from "react-icons/ai";
import anemy from "../../images/anemy.png";
import Loader from "../../images/loader/Render.gif";
import NotFound from "../../images/undraw/undraw_web_search_re_efla.svg";
import RoundFlightInfoDetails from "../FlightInfoDetails/RoundFlightInfoDetails";
import RoundFlightUserInfoGalileo from "./RoundFlightUserInfoGalileo";
import RoundFlightUserInfoSabre from "./RoundFlightUserInfoSabre";
import RoundFlightUserInfoFlyHub from "./RoundFlightUserInfoFlyHub";
import RoundFlightInformationDetails from "../RoundFlightInformationDetails/RoundFlightInformationDetails";
import "./RoundFlightUserInfo.css";

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

const RoundFlightUserInfo = () => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(true);
  const [progress, setProgress] = useState(0);

  //todo: Baggage Information
  const [goAdultBagage, setGoAdultBagage] = useState();
  const [goChildBagage, setGoChildBagage] = useState();
  const [goInfatBagage, setGoInfatBagage] = useState();
  const [backAdultBagage, setBackAdultBagage] = useState();
  const [backChildBagage, setBackChildBagage] = useState();
  const [backInfantBagage, setBackInfantBagage] = useState();
  //todo: End Baggage Information end

  //todo: cupon
  const [coupon, setCoupon] = useState("");
  const [couponAppliedMessage, setCouponAppliedMessage] = useState({});
  //todo:end cupon

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

  const { adultCount, childCount, infant } = location.state;

  const [loadData, setLoadData] = useState([]);

  const timeconvarta1 =
    location?.state?.roundData?.segments?.go[0]?.arrivalTime;
  const ArrivalTime1 = new Date(timeconvarta1).toUTCString();
  const timeconvarta2 =
    location?.state?.roundData?.segments?.go[1]?.arrivalTime;
  const ArrivalTime2 = new Date(timeconvarta2).toUTCString();

  const navigate = useNavigate();

  let url;
  let body;

  if (location.state?.roundData?.system === "Sabre") {
    url = "https://api.flyfarint.com/v.1.0.0/Sabre/AirPrice.php";
    body = {
      adultCount: location.state.adultCount,
      childCount: location.state.childCount,
      infantCount: location.state.infant,
      segment: location.state?.roundData?.segment,
      tripType: location.state?.tripType === "oneway" ? "1" : "2",
      segments: {
        go:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
                {
                  departure: location.state.roundData.segments.go[1].departure,
                  arrival: location.state.roundData.segments.go[1].arrival,
                  dpTime: location.state.roundData.segments.go[1].departureTime,
                  arrTime: location.state.roundData.segments.go[1].arrivalTime,
                  bCode: location.state.roundData.segments.go[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "21"
            ? [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
                {
                  departure: location.state.roundData.segments.go[1].departure,
                  arrival: location.state.roundData.segments.go[1].arrival,
                  dpTime: location.state.roundData.segments.go[1].departureTime,
                  arrTime: location.state.roundData.segments.go[1].arrivalTime,
                  bCode: location.state.roundData.segments.go[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "12"
            ? [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
              ]
            : [
                {
                  departure: location.state.roundData.segments.go[0].departure,
                  arrival: location.state.roundData.segments.go[0].arrival,
                  dpTime: location.state.roundData.segments.go[0].departureTime,
                  arrTime: location.state.roundData.segments.go[0].arrivalTime,
                  bCode: location.state.roundData.segments.go[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.go[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.go[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.go[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.go[0].operatingflight,
                },
              ],
        back:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
                {
                  departure:
                    location.state.roundData.segments.back[1].departure,
                  arrival: location.state.roundData.segments.back[1].arrival,
                  dpTime:
                    location.state.roundData.segments.back[1].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[1].arrivalTime,
                  bCode: location.state.roundData.segments.back[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "12"
            ? [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
                {
                  departure:
                    location.state.roundData.segments.back[1].departure,
                  arrival: location.state.roundData.segments.back[1].arrival,
                  dpTime:
                    location.state.roundData.segments.back[1].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[1].arrivalTime,
                  bCode: location.state.roundData.segments.back[1].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[1].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[1].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[1].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[1].operatingflight,
                },
              ]
            : location.state?.roundData?.segment === "21"
            ? [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
              ]
            : [
                {
                  departure:
                    location.state.roundData.segments.back[0].departure,
                  arrival: location.state.roundData.segments.back[0].arrival,
                  dpTime:
                    location.state.roundData.segments.back[0].departureTime,
                  arrTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  bCode: location.state.roundData.segments.back[0].bookingcode,
                  mCarrier:
                    location.state.roundData.segments.back[0].marketingcareer,
                  mCarrierFN:
                    location.state.roundData.segments.back[0].marketingflight,
                  oCarrier:
                    location.state.roundData.segments.back[0].operatingcareer,
                  oCarrierFN:
                    location.state.roundData.segments.back[0].operatingflight,
                },
              ],
      },
    };
  } else if (location.state?.roundData.system === "FlyHub") {
    url = "https://api.flyfarint.com/v.1.0.0/FlyHub/AirPrice.php";
    body = {
      SearchID: location.state?.roundData?.SearchID,
      ResultID: location.state?.roundData?.ResultID,
    };
  } else if (location.state?.roundData.system === "Galileo") {
    url = "https://api.flyfarint.com/v.1.0.0/Galileo/AirPrice.php";
    body = {
      adultCount: adultCount,
      childCount: childCount,
      infantCount: infant,
      segment: location.state?.roundData?.segment,
      tripType: location.state.tripType === "oneway" ? "1" : "2",
      segments: {
        go:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.go[0].segmentDetails.key,
                  Group:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.goFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.go[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .DepartureTime,
                  ArrivalTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .ArrivalTime,
                  BookingCode:
                    location.state.roundData.segments.go[0].bookingcode,
                },
                {
                  AirSegmentKey:
                    location.state.roundData.segments.go[1].segmentDetails.key,
                  Group:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.goFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.go[1].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.go[1].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.go[1].segmentDetails
                      .DepartureTime,
                  ArrivalTime:
                    location.state.roundData.segments.go[1].segmentDetails
                      .ArrivalTime,
                  BookingCode:
                    location.state.roundData.segments.go[1].bookingcode,
                },
              ]
            : [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.go[0].segmentDetails.key,
                  Group:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.goFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.go[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.go[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .DepartureTime,
                  ArrivalTime:
                    location.state.roundData.segments.go[0].segmentDetails
                      .ArrivalTime,
                  BookingCode:
                    location.state.roundData.segments.go[0].bookingcode,
                },
              ],
        back:
          location.state?.roundData?.segment === "2"
            ? [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.back[0].segmentDetails
                      .key,
                  Group:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.backFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.back[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.back[0].departureTime,
                  ArrivalTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  BookingCode:
                    location.state.roundData.segments.back[0].bookingcode,
                },
                {
                  AirSegmentKey:
                    location.state.roundData.segments.back[1].segmentDetails
                      .key,
                  Group:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.backFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.back[1].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.back[1].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.back[1].departureTime,
                  ArrivalTime:
                    location.state.roundData.segments.back[1].arrivalTime,
                  BookingCode:
                    location.state.roundData.segments.back[1].bookingcode,
                },
              ]
            : [
                {
                  AirSegmentKey:
                    location.state.roundData.segments.back[0].segmentDetails
                      .key,
                  Group:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Group,
                  Carrier:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Carrier,
                  FareBasisCode: location.state.roundData.backFareBasisCode,
                  FlightNumber:
                    location.state.roundData.segments.back[0].segmentDetails
                      .FlightNumber,
                  Origin:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Origin,
                  Destination:
                    location.state.roundData.segments.back[0].segmentDetails
                      .Destination,
                  DepartureTime:
                    location.state.roundData.segments.back[0].departureTime,
                  ArrivalTime:
                    location.state.roundData.segments.back[0].arrivalTime,
                  BookingCode:
                    location.state.roundData.segments.back[0].bookingcode,
                },
              ],
      },
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
      .then((res) => res.json())
      .then((data) => {
        if (data?.status !== "error" || data?.Error === null) {
          setLoadData(data);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
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
    totalBaseFare = 0,
    totalTax = 0,
    totalFare = 0,
    serviceFeeAdult = 0,
    serviceFeeChild = 0,
    serviceFeeInfant = 0,
    discount = 0,
    agentTotal = 0,
    limitTime;

  if (Object.keys(loadData).length !== 0) {
    if (adultCount > 0) {
      adultPrice =
        location.state?.roundData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare
              ?.passengerInfoList[0]?.passengerInfo?.passengerTotalFare
              ?.equivalentAmount * location?.state?.adultCount
          : location?.state?.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
              3
            ) * location?.state?.adultCount
          : loadData?.Results[0].Fares[0].BaseFare *
            location?.state?.adultCount;

      adultTaxPrice =
        location.state?.roundData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[0].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.adultCount
          : location.state?.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.adultCount +
            adultPrice
          : loadData?.Results[0]?.Fares[0]?.Tax * location.state?.adultCount;
      serviceFeeAdult =
        location.state?.roundData?.system === "Sabre"
          ? 0
          : location.state?.roundData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[0]?.ServiceFee
          ? loadData?.Results[0]?.Fares[0]?.ServiceFee
          : 0 * location.state?.adultCount;
    }

    if (childCount > 0) {
      childPrice =
        location?.state?.roundData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.equivalentAmount * location.state?.childCount
          : location.state.roundData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.childCount
          : loadData?.Results[0]?.Fares[1]?.BaseFare *
            location.state?.childCount;
      childTaxPrice =
        location.state.roundData?.system === "Sabre"
          ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
              .pricingInformation[0].fare.passengerInfoList[1].passengerInfo
              .passengerTotalFare.totalTaxAmount * location.state?.childCount
          : location.state.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) *
              location.state?.childCount +
            childPrice
          : loadData?.Results[0]?.Fares[1]?.Tax * location.state?.childCount;
      serviceFeeChild =
        location.state?.roundData?.system === "Sabre"
          ? 0
          : location.state?.roundData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[1]?.ServiceFee
          ? loadData?.Results[0]?.Fares[1]?.ServiceFee
          : 0 * location.state?.childCount;
    }

    if (infant > 0) {
      infPrice =
        location.state?.roundData?.system === "Sabre"
          ? loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[1]?.fare.passengerInfoList[2]
              ?.passengerInfo?.passengerTotalFare?.equivalentAmount ||
            loadData?.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[1]
              ?.passengerInfo?.passengerTotalFare?.equivalentAmount *
              location.state?.infant
          : location.state.roundData?.system === "Galileo"
          ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.EquivalentBasePrice?.slice(
              3
            ) * location.state?.infant
          : loadData?.Results[0]?.Fares[2]?.BaseFare ||
            loadData?.Results[0]?.Fares[1]?.BaseFare * location.state?.infant;

      infTaxPrice =
        location?.state?.roundData?.system === "Sabre"
          ? loadData.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[1]?.fare.passengerInfoList[2]
              ?.passengerInfo?.passengerTotalFare?.totalTaxAmount ??
            loadData.groupedItineraryResponse?.itineraryGroups[0]
              ?.itineraries[0]?.pricingInformation[0]?.fare.passengerInfoList[1]
              ?.passengerInfo?.passengerTotalFare?.totalTaxAmount *
              location.state?.infant
          : location.state.roundData?.system === "Galileo"
          ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.Taxes?.slice(
              3
            ) * location.state?.infant
          : loadData?.Results[0]?.Fares[2]?.Tax ??
            loadData?.Results[0]?.Fares[1]?.Tax * location.state?.infant;
      serviceFeeInfant =
        location.state?.roundData?.system === "Sabre"
          ? 0
          : location.state?.roundData?.system === "Galileo"
          ? 0
          : loadData?.Results[0]?.Fares[2]?.ServiceFee
          ? loadData?.Results[0]?.Fares[2]?.ServiceFee
          : 0 * location.state?.infant;
    }

    totalTax =
      location.state?.roundData?.system === "Sabre"
        ? loadData.groupedItineraryResponse.itineraryGroups[0].itineraries[0]
            .pricingInformation[0].fare.totalFare.totalTaxAmount
        : location.state.roundData?.system === "Galileo"
        ? loadData.airAirPriceResult?.airAirPricingSolution[0]?.attributes.Taxes?.slice(
            3
          )
        : adultTaxPrice + childTaxPrice + infTaxPrice;

    totalBaseFare =
      location.state.roundData?.system === "Sabre"
        ? adultPrice + childPrice + infPrice
        : location.state.roundData?.system === "Galileo"
        ? loadData?.airAirPriceResult?.airAirPricingSolution[0]?.attributes?.EquivalentBasePrice?.slice(
            3
          )
        : adultPrice + childPrice + infPrice;

    totalFare =
      location.state.roundData?.system === "Sabre"
        ? totalBaseFare +
          totalTax +
          serviceFeeAdult +
          serviceFeeChild +
          serviceFeeInfant
        : location.state.roundData?.system === "Galileo"
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
        ? Number(location.state.roundData.price - 100)
        : Number(location.state.roundData.price);

    discount = Number(location.state.roundData.comission);

    limitTime =
      location.state.roundData?.system === "Sabre"
        ? new Date()
        : location.state.roundData?.system === "Galileo"
        ? new Date()
        : new Date();
  }

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
          <Grid container mt={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid
                container
                sx={{ height: "75vh" }}
                className="no-scrollbar"
                spacing={"5px"}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{ width: "100%", height: "100%" }}
                >
                  <RoundFlightInformationDetails
                    flightData={location.state.roundData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  sx={{ width: "100%", height: "100%" }}
                >
                  <RoundFlightInfoDetails
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
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    clientFare={location.state.clientFare}
                    agentTotal={agentTotal}
                    discount={discount}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBagage={goAdultBagage}
                    setGoAdultBagage={setGoAdultBagage}
                    goChildBagage={goChildBagage}
                    setGoChildBagage={setGoChildBagage}
                    goInfatBagage={goInfatBagage}
                    setGoInfatBagage={setGoInfatBagage}
                    backAdultBagage={backAdultBagage}
                    setBackAdultBagage={setBackAdultBagage}
                    backChildBagage={backChildBagage}
                    setBackChildBagage={setBackChildBagage}
                    backInfantBagage={backInfantBagage}
                    setBackInfantBagage={setBackInfantBagage}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box mt={3}>
                {location.state?.roundData.system === "Galileo" ? (
                  <RoundFlightUserInfoGalileo
                    tripType={location.state?.tripType}
                    userData={location.state}
                    searchResult={loadData}
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
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBaggage={goAdultBagage}
                    setGoAdultBaggage={setGoAdultBagage}
                    goChildBaggage={goChildBagage}
                    setGoChildBaggage={setGoChildBagage}
                    goInfantBaggage={goInfatBagage}
                    setGoInfatBaggage={setGoInfatBagage}
                    backAdultBaggage={backAdultBagage}
                    setBackAdultBaggage={setBackAdultBagage}
                    backChildBaggage={backChildBagage}
                    setBackChildBaggage={setBackChildBagage}
                    backInfantBaggage={backInfantBagage}
                    setBackInfantBaggage={setBackInfantBagage}
                  />
                ) : location.state?.roundData.system === "Sabre" ? (
                  <RoundFlightUserInfoSabre
                    tripType={location.state?.tripType}
                    userData={location.state}
                    searchResult={loadData}
                    adultCount={location?.state?.adultCount}
                    childCount={location?.state?.childCount}
                    infant={location?.state?.infant}
                    adultPrice={adultPrice}
                    childPrice={childPrice}
                    infPrice={infPrice}
                    adultTaxPrice={adultTaxPrice}
                    childTaxPrice={childTaxPrice}
                    serviceFeeAdult={serviceFeeAdult}
                    serviceFeeChild={serviceFeeChild}
                    serviceFeeInfant={serviceFeeInfant}
                    infTaxPrice={infTaxPrice}
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBaggage={goAdultBagage}
                    setGoAdultBaggage={setGoAdultBagage}
                    goChildBaggage={goChildBagage}
                    setGoChildBaggage={setGoChildBagage}
                    goInfantBaggage={goInfatBagage}
                    setGoInfatBaggage={setGoInfatBagage}
                    backAdultBaggage={backAdultBagage}
                    setBackAdultBaggage={setBackAdultBagage}
                    backChildBaggage={backChildBagage}
                    setBackChildBaggage={setBackChildBagage}
                    backInfantBaggage={backInfantBagage}
                    setBackInfantBaggage={setBackInfantBagage}
                  />
                ) : (
                  <RoundFlightUserInfoFlyHub
                    tripType={location.state?.tripType}
                    userData={location.state}
                    searchResult={loadData}
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
                    totalTax={totalTax}
                    totalFare={totalFare}
                    totalBaseFare={totalBaseFare}
                    limitTime={limitTime}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    clientFare={location.state.clientFare}
                    coupon={coupon}
                    setCoupon={setCoupon}
                    couponAppliedMessage={couponAppliedMessage}
                    setCouponAppliedMessage={setCouponAppliedMessage}
                    goAdultBaggage={goAdultBagage}
                    setGoAdultBaggage={setGoAdultBagage}
                    goChildBaggage={goChildBagage}
                    setGoChildBaggage={setGoChildBagage}
                    goInfantBaggage={goInfatBagage}
                    setGoInfatBaggage={setGoInfatBagage}
                    backAdultBaggage={backAdultBagage}
                    setBackAdultBaggage={setBackAdultBagage}
                    backChildBaggage={backChildBagage}
                    setBackChildBaggage={setBackChildBagage}
                    backInfantBaggage={backInfantBagage}
                    setBackInfantBaggage={setBackInfantBagage}
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

export default RoundFlightUserInfo;
