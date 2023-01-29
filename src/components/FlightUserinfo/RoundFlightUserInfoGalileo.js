import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../images/loader/Render.gif";
import Swal from "sweetalert2";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import "./FlightUserInfo.css";
import secureLocalStorage from "react-secure-storage";

const RoundFlightUserInfoGalileo = ({
  userData,
  searchResult,
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
  limitTime,
  isLoaded,
  setIsLoaded,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [passPhone, setPassengerPhone] = useState("");
  const [email, setEmail] = useState("");
  const users = secureLocalStorage.getItem("user-info");

  const [flightPassengerData, setFlightPassengerData] = useState({
    adult: new Array(userData.adultCount).fill({
      type: "ADT",
      fareInfoKey:
        adultCount >= 1 && childCount >= 1 && infant >= 1
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
          : userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo.airFareInfo[0].attributes.Key
          : !Array.isArray(
              searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo
            )
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo.airFareInfo[0].attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo[0].attributes.Key,

      airPriceInfoKey:
        adultCount >= 1 && childCount >= 1 && infant >= 1
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].attributes.Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
          : userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo.attributes.Key
          : !Array.isArray(
              searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo
            )
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo.attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.Key,

      afName: "",
      alName: "",
      agender: "",
      apassNation: "",
      apassNo: "",
      apassEx: "",
    }),
    child: new Array(userData.childCount).fill({
      type: "CNN",
      fareInfoKey:
        adultCount >= 1 && childCount >= 1 && infant >= 1
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[1].airFareInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[1].airFareInfo[0].attributes.Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
          : userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[1]
              .airAirPricingInfo.airFareInfo[0].attributes.Key
          : !Array.isArray(
              searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo
            )
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo.airFareInfo[0].attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo[0].attributes.Key,

      airPriceInfoKey:
        adultCount >= 1 && childCount >= 1 && infant >= 1
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[1]
                .airAirPricingInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].attributes.Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[1]
                .airAirPricingInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
          : userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[1]
              .airAirPricingInfo.attributes.Key
          : !Array.isArray(
              searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo
            )
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo.attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.Key,
      cfName: "",
      clName: "",
      cgender: "",
      cpassNation: "",
      cpassNo: "",
      cpassEx: "",
    }),
    infant: new Array(userData.infant).fill({
      type: "INF",
      fareInfoKey:
        adultCount >= 1 && childCount >= 1 && infant >= 1
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[0]
                .airAirPricingInfo[2].airFareInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].attributes.Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[1]
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].airFareInfo[0].attributes.Key
          : userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[2]
              .airAirPricingInfo.airFareInfo[0].attributes.Key
          : !Array.isArray(
              searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo
            )
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo.airFareInfo[0].attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[1].airFareInfo[0].attributes.Key,

      airPriceInfoKey:
        adultCount >= 1 && childCount >= 1 && infant >= 1
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[2]
                .airAirPricingInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution.attributes
                .Key
          : adultCount >= 1 && childCount >= 1 && infant === 0
          ? userData.roundData.segment === "2"
            ? searchResult.airAirPriceResult.airAirPricingSolution[2]
                .airAirPricingInfo[0].attributes.Key
            : searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo[0].attributes.Key
          : userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[2]
              .airAirPricingInfo.attributes.Key
          : !Array.isArray(
              searchResult.airAirPriceResult.airAirPricingSolution
                .airAirPricingInfo
            )
          ? searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo.attributes.Key
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.Key,

      ifName: "",
      ilName: "",
      igender: "",
      ipassNation: "",
      ipassNo: "",
      ipassEx: "",
    }),
    adultCount: userData.adultCount,
    childCount: userData.childCount,
    infantCount: userData.infant,
    tripType: userData.tripType === "oneway" ? "1" : "2",
    segment: userData.roundData.segment,
    segments: {
      go:
        userData.roundData.segment === "1"
          ? [
              {
                cr: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[0].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .ArrivalTime,
              },
            ]
          : [
              {
                cr: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[0].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[0].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[0].attributes
                    .ArrivalTime,
              },
              {
                cr: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[1].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[1].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[1].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[1].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[1].attributes
                    .ArrivalTime,
              },
            ],
      back:
        userData.roundData.segment === "1"
          ? [
              {
                cr: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[2].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .ArrivalTime,
              },
            ]
          : [
              {
                cr: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[2].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .ArrivalTime,
              },
              {
                cr: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Carrier,
                airSegKey:
                  searchResult.airAirItinerary.airAirSegment[2].attributes.Key,
                bcode:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .ClassOfService,
                dep: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Origin,
                arr: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Destination,
                Fno: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .FlightNumber,
                G: searchResult.airAirItinerary.airAirSegment[2].attributes
                  .Group,
                DepTime:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .DepartureTime,
                ArrTime:
                  searchResult.airAirItinerary.airAirSegment[2].attributes
                    .ArrivalTime,
              },
            ],
    },

    tDate:
      adultCount >= 1 && childCount >= 1 && infant >= 1
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].attributes.LatestTicketingTime
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.LatestTicketingTime
        : adultCount >= 1 && childCount >= 1 && infant === 0
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].attributes.LatestTicketingTime
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].attributes.LatestTicketingTime
        : userData.roundData.segment === "2"
        ? searchResult.airAirPriceResult.airAirPricingSolution[0]
            .airAirPricingInfo.attributes.LatestTicketingTime
        : !Array.isArray(
            searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo
          )
        ? searchResult.airAirPriceResult.airAirPricingSolution.airAirPricingInfo
            .attributes.LatestTicketingTime
        : searchResult.airAirPriceResult.airAirPricingSolution
            .airAirPricingInfo[0].attributes.LatestTicketingTime,

    eDate:
      adultCount >= 1 && childCount >= 1 && infant >= 1
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].airFareInfo[0].attributes.EffectiveDate
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo[0].attributes.EffectiveDate
        : adultCount >= 1 && childCount >= 1 && infant === 0
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].airFareInfo[0].attributes.EffectiveDate
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo[0].attributes.EffectiveDate
        : userData.roundData.segment === "2"
        ? searchResult.airAirPriceResult.airAirPricingSolution[0]
            .airAirPricingInfo.airFareInfo[0].attributes.EffectiveDate
        : !Array.isArray(
            searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo
          )
        ? searchResult.airAirPriceResult.airAirPricingSolution.airAirPricingInfo
            .airFareInfo[0].attributes.EffectiveDate
        : searchResult.airAirPriceResult.airAirPricingSolution
            .airAirPricingInfo[0].airFareInfo[0].attributes.EffectiveDate,

    fbcode:
      adultCount >= 1 && childCount >= 1 && infant >= 1
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].airFareInfo[0].attributes.FareBasis
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo[0].attributes.FareBasis
        : adultCount >= 1 && childCount >= 1 && infant === 0
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0]
              .airAirPricingInfo[0].airFareInfo[0].attributes.FareBasis
          : searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo[0].airFareInfo[0].attributes.FareBasis
        : userData.roundData.segment === "2"
        ? searchResult.airAirPriceResult.airAirPricingSolution[0]
            .airAirPricingInfo.airFareInfo[0].attributes.FareBasis
        : !Array.isArray(
            searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo
          )
        ? searchResult.airAirPriceResult.airAirPricingSolution.airAirPricingInfo
            .airFareInfo[0].attributes.FareBasis
        : searchResult.airAirPriceResult.airAirPricingSolution
            .airAirPricingInfo[0].airFareInfo[0].attributes.FareBasis,

    airPriceSKey:
      adultCount >= 1 && childCount >= 1 && infant >= 1
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0].attributes
              .Key
          : searchResult.airAirPriceResult.airAirPricingSolution.attributes.Key
        : adultCount >= 1 && childCount >= 1 && infant === 0
        ? userData.roundData.segment === "2"
          ? searchResult.airAirPriceResult.airAirPricingSolution[0].attributes
              .Key
          : searchResult.airAirPriceResult.airAirPricingSolution.attributes.Key
        : userData.roundData.segment === "2"
        ? searchResult.airAirPriceResult.airAirPricingSolution[0].attributes.Key
        : !Array.isArray(
            searchResult.airAirPriceResult.airAirPricingSolution
              .airAirPricingInfo
          )
        ? searchResult.airAirPriceResult.airAirPricingSolution.attributes.Key
        : searchResult.airAirPriceResult.airAirPricingSolution.attributes.Key,
  });
  const handleOnChange = (e, type, index) => {
    if (type === "adult") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.adult];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        adult: tempFlightData,
      });
    }
    if (type === "child") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.child];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        child: tempFlightData,
      });
    }
    if (type === "infant") {
      const value = e.target.value;
      const field = e.target.name;
      //copying data to temp variable so that we do not directly mutate original state
      const tempFlightData = [...flightPassengerData.infant];
      // -1 check to see if we found that object in working hours
      if (index !== -1) {
        tempFlightData[index] = {
          ...tempFlightData[index], //keeping existing values in object
          [field]: value, //here property can be "price" or "description"
        };
      }
      setFlightPassengerData({
        ...flightPassengerData,
        infant: tempFlightData,
      });
    }
  };

  function subtractHours(numOfHours, date = new Date()) {
    date.setHours(date.getHours() - numOfHours);
    return date;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoaded(false);
    let url = "https://api.flyfarint.com/v.1.0.0/Galileo/AirBooking.php";
    e.target.reset();
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: JSON.stringify(flightPassengerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.universalUniversalRecord["@attributes"].LocatorCode) {
          let bookingInfo = {
            agentId: users?.user?.agentId,
            system: userData.roundData.system,
            from: userData.from,
            to: userData.to,
            airlines: userData.roundData.careerName,
            type: userData.tripType,
            name: `${flightPassengerData.adult[0].afName} ${flightPassengerData.adult[0].alName} `,
            phone: flightPassengerData.passengerPhoneNumber,
            email: flightPassengerData.passengerEmail,
            pnr: data.universalUniversalRecord["@attributes"].LocatorCode,
            pax: adultCount + childCount + infant,
            adultcount: adultCount,
            childcount: childCount,
            infantcount: infant,
            netcost:
              Number(totalBaseFare) * 0.93 +
              Number(totalTax) +
              Number(totalFare) * 0.003,
            adultcostbase: adultPrice,
            childcostbase: childPrice,
            infantcostbase: infPrice,
            adultcosttax: adultTaxPrice,
            childcosttax: childTaxPrice,
            infantcosttax: infTaxPrice,
            grosscost: totalFare,
            basefare: totalBaseFare,
            tax: totalTax,
            timelimit: subtractHours(3, new Date(limitTime)),
          };
          let url =
            "https://api.flyfarint.com/v.1.0.0/AirBooking/PreBooking.php";

          fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: JSON.stringify(bookingInfo),
          })
            .then((res) => res.json())
            .then((bookingDetails) => {
              if (bookingDetails.status === "success") {
                setIsLoaded(true);
                let url =
                  "https://api.flyfarint.com/v.1.0.0/AirMaterials/AddPax.php";
                let body = {
                  ...flightPassengerData,
                  bookingId: bookingDetails.BookingId,
                  agentId: users?.user?.agentId,
                };
                fetch(url, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type":
                      "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                  body: JSON.stringify(body),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setIsLoaded(true);
                    if (data.status === "success") {
                      setIsLoaded(true);
                      navigate("/dashboard/queues/Round", {
                        state: {
                          bookingData: data,
                          bookingInfo: bookingInfo,
                          allFlightData: { userData, searchResult },
                          bookingDetails,
                        },
                      });
                    } else {
                      setIsLoaded(true);
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Booking done but Travelers not saved",
                        confirmButtonText: "OK",
                      }).then(function () {
                        navigate("/dashboard/congratulation", {
                          state: {
                            bookingData: data,
                            bookingInfo: bookingInfo,
                            allFlightData: { userData, searchResult },
                            bookingDetails,
                          },
                        });
                      });
                    }
                  })
                  .catch((err) => {
                    setIsLoaded(true);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Booking Failed",
                      confirmButtonText: "Search Another Flights...",
                    }).then(function () {
                      navigate(-2);
                    });
                  });
              } else {
                setIsLoaded(true);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Booking Failed",
                  confirmButtonText: "Search Another Flights...",
                }).then(function () {
                  navigate(-2);
                });
              }
            });
        }
      })
      .catch((err) => {
        setIsLoaded(true);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Booking Failed",
          confirmButtonText: "Search Another Flights...",
        }).then(function () {
          navigate(-2);
        });
      });
  };

  const handleEmailChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newPassengerData = { ...flightPassengerData };
    newPassengerData[field] = value;
    setFlightPassengerData(newPassengerData);
    setEmail(e.target.value);
  };
  const validateNumber = (e) => {
    const field = e.target.name;
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newPassengerData = { ...flightPassengerData };
    newPassengerData[field] = value;
    setFlightPassengerData(newPassengerData);
    setPassengerPhone(e.target.value.replace(/[^0-9]/g, ""));
  };

  return (
    <>
      <Container>
        <h4 className="flight-h4"> Flight Information Details</h4>
        <form onSubmit={handleSubmit}>
          {flightPassengerData.adult.map((item, index) => (
            <Box key={index}>
              <Box className="adult-h4">
                <h4>Adult-{index + 1}</h4>
              </Box>

              <Box className="adult-info">
                <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      // value={item.afName}
                      type="text"
                      name="afName"
                      placeholder="Enter First Name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      name="alName"
                      // value={item.alName}
                      placeholder="Enter Last Name"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <select
                      required
                      name="agender"
                      // value={item.agender}
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <select
                      required
                      name="apassNation"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    >
                      <option value="">Enter Nationality</option>
                      <option value="BD">BD</option>
                    </select>
                    {/* <CountryDropdown
                                id="UNIQUE_ID"
                                name="apassNation"
                                preferredCountries={["gb", "us"]}
                                value={item.apassNation}
                                onChange={(e) => handleOnChange(e, item.type, index)}
                              /> */}
                  </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      placeholder="Enter Date of Birth"
                      name="adob"
                      // value={item.dob}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      type="text"
                      placeholder="Enter Passport Number"
                      name="apassNo"
                      // value={item.apassNo}
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      placeholder="Enter Passport Expire Date"
                      name="apassEx"
                      // value={item.apassEx}
                    />
                  </Grid>
                </Grid>

                {/* <Box className="checkBox">
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="checkboxAdult"
                            onChange={(e) => handleOnChange(e, item.type, index)}
                          />
                          <label htmlFor="vehicle1">
                            {" "}
                            Add this Person to traveled list
                          </label>
                          <br></br>
                        </Box> */}
              </Box>
            </Box>
          ))}
          {/*  Adult Details end  */}

          {/* Child details */}
          {/* {test?.child?.map((item, index) => ( */}
          {flightPassengerData.child.map((item, index) => (
            <Box mt={4}>
              <Box className="adult-h4">
                <h4>Child-{index + 1}</h4>
              </Box>

              <Box className="adult-info">
                <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      type="text"
                      name="cfName"
                      placeholder="Enter First Name"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      type="text"
                      name="clName"
                      placeholder="Enter Last Name"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <select
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      name="cgender"
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <select
                      required
                      name="cpassNation"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    >
                      <option value="">Enter Nationality</option>
                      <option value="BD">BD</option>
                    </select>
                    {/* <CountryDropdown
                                id="UNIQUE_ID"
                                name="apassNation"
                                preferredCountries={["gb", "us"]}
                                value={item.apassNation}
                                onChange={(e) => handleOnChange(e, item.type, index)}
                              /> */}
                  </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      name="cdob"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      placeholder="Enter Passport Number"
                      name="cpassNo"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      placeholder="Enter Passport Expire Date"
                      name="cpassEx"
                    />
                  </Grid>
                </Grid>

                {/* <Box className="checkBox">
                          <input type="checkbox" id="traveled" />
                          <label htmlFor="traveled">
                            {" "}
                            Add this Person to traveled list
                          </label>
                          <br></br>
                        </Box> */}
              </Box>
            </Box>
          ))}
          {/* Child details end*/}

          {/* infant details start  */}
          {flightPassengerData.infant.map((item, index) => (
            <Box mt={4}>
              <Box className="adult-h4">
                <h4>Infant-{index + 1}</h4>
              </Box>

              <Box className="adult-info">
                <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      type="text"
                      name="ifName"
                      placeholder="Enter First Name"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      type="text"
                      name="ilName"
                      placeholder="Enter Last Name"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <select
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      name="igender"
                    >
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <select
                      required
                      name="ipassNation"
                      onChange={(e) => handleOnChange(e, item.type, index)}
                    >
                      <option value="">Enter Nationality</option>
                      <option value="BD">BD</option>
                    </select>
                    {/* <CountryDropdown
                                id="UNIQUE_ID"
                                name="apassNation"
                                preferredCountries={["gb", "us"]}
                                value={item.apassNation}
                                onChange={(e) => handleOnChange(e, item.type, index)}
                              /> */}
                  </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ padding: "26px 0px" }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      name="idob"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      placeholder="Enter Passport Number"
                      name="ipassNo"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={6}>
                    <input
                      required
                      onChange={(e) => handleOnChange(e, item.type, index)}
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      placeholder="Enter Passport Expire Date"
                      name="ipassEx"
                    />
                  </Grid>
                </Grid>

                {/* <Box className="checkBox">
                          <input type="checkbox" id="ctraveled" />
                          <label htmlFor="ctraveled">
                            {" "}
                            Add this Person to traveled list
                          </label>
                          <br></br>
                        </Box> */}
              </Box>
            </Box>
          ))}
          {/* infant details end  */}
          <Box className="conatct-detail">
            <p>Contact Details (Airlines will send updates to this contact)</p>
            <Box className="adult-info" mt={2}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={6}>
                  <input
                    required
                    onChange={handleEmailChange}
                    type="text"
                    name="passengerEmail"
                    value={email}
                    placeholder="Enter Your Email"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <input
                    required
                    type="text"
                    name="passengerPhoneNumber"
                    placeholder="Enter Phone Number"
                    maxLength="11"
                    value={passPhone}
                    onChange={validateNumber}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className="booking-btn">
              <button type="submit">Book Ticket</button>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default RoundFlightUserInfoGalileo;
