import { Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { addDays } from "date-fns/esm";
import { Typography } from "@mui/material";
import Slider from "react-slick";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import "./RecentSearch.css";

export const RecentSearch = () => {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Sets the state of the const for the given page and state.
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  useEffect(() => {
    setIsLoaded(false);
    fetch(
      `https://api.flyfarint.com/v.1.0.0/SearchHistory/allHistory.php?agentId=FFA1926&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.data);
        if (data?.data?.length > 0) {
          setIsLoaded(true);
          setSearchHistory(data?.data);
        }
      });
  }, [agentID]);
  const handleSearchBtn = (searchData) => {
    searchData.searchtype === "oneway"
      ? navigate("/dashboard/allflight", {
          state: {
            faddress: searchData?.DepFrom,
            toAddress: searchData?.ArrTo,
            fromSearchText: searchData?.DepAirport,
            toSearchText: searchData?.ArrAirport,
            departureDate:
              new Date(searchData?.depTime) <= new Date()
                ? addDays(new Date(), 1)
                : new Date(searchData?.depTime),
            adultCount: Number(searchData?.adult),
            childCount: Number(searchData?.child),
            infant: Number(searchData?.infant),
            tripType: searchData?.searchtype,
            fromSendData: searchData?.DepFrom,
            toSendData: searchData?.ArrTo,
            className: searchData?.class,
          },
        })
      : navigate("/dashboard/roundtrip", {
          state: {
            faddress: searchData?.DepFrom,
            toAddress: searchData?.ArrTo,
            fromSearchText: searchData.DepAirport,
            toSearchText: searchData.ArrAirport,
            departureDate:
              new Date(searchData?.depTime) <= new Date()
                ? addDays(new Date(), 1)
                : new Date(searchData?.depTime),
            returningDate:
              new Date(searchData?.returnTime) <= new Date()
                ? addDays(new Date(), 3)
                : new Date(searchData?.returnTime),
            adultCount: Number(searchData?.adult),
            childCount: Number(searchData?.child),
            infant: Number(searchData?.infant),
            tripType: searchData?.searchtype,
            fromSendData: searchData?.DepFrom,
            toSendData: searchData?.ArrTo,
            className: searchData?.class,
          },
        });
  };
  return (
    <Container>
      <Box className="history-item-wrapper">
        <Typography
          sx={{
            fontSize: "26px",
            color: "var(--secondary-color)",
            fontWeight: "600",
          }}
        >
          Recent Search
        </Typography>
        <Slider {...settings}>
          {searchHistory.map((item, index) => (
            <Box key={index}>
              <Box sx={{ height: "fit-content" }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box style={{ width: "80%", height: "100%" }}>
                    <Typography
                      style={{
                        width: "fit-content",
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "10px 0px 0px 10px",
                      }}
                    >
                      {item?.searchtype?.toUpperCase() || "SearchType"}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "20%",
                      height: "calc(100% - 10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <FlightTakeoffIcon
                      sx={{
                        fontSize: "10px",
                        height: "25px",
                        width: "25px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "var(--primary-color)",
                        color: "var(--white)",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography
                    style={{
                      width: "fit-content",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "var(--secondary-color)",
                      padding: "0px 0px 0px 10px",
                    }}
                  >
                    {`${item?.DepFrom} - ${item?.ArrTo}`}
                  </Typography>
                </Box>
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Typography
                    style={{
                      width: "fit-content",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "var(--primary-color)",
                      padding: "0px 0px 0px 10px",
                    }}
                  >
                    {`${item?.depTime} ${
                      item?.returnTime ? "- " + item?.returnTime : ""
                    }`}
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box style={{ width: "70%", height: "100%" }}>
                    <Typography
                      style={{
                        width: "fit-content",
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: "0px 0px 10px 10px",
                      }}
                    >
                      {item?.adult > 0 ? `${item.adult} ADULT` : null}
                      {item?.child > 0 ? `${item?.child} CHILDREN` : null}
                      {item?.infant > 0 ? `${item?.infant} INFANT` : null}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        color: "var(--primary-color)",
                        textDecoration: "underline",
                        padding: "0px 0px 10px 10px",
                      }}
                      onClick={() => handleSearchBtn(item)}
                    >
                      Search
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};
