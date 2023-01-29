import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Footer from "../../components/Footer/Footer";
import FullScreenSlider from "../../components/FullScreenSlider/FullScreenSlider";
import Header from "../../components/Header/Header";
import HomeSearchBox from "../../components/HomeSearchBox/HomeSearchBox";
import { RecentSearch } from "../../components/RecentSearch/RecentSearch";
// import { TrendingDeals } from "../../components/TrendingDeals/TrendingDeals";
import bgImg from "../../images/SliderImg/s6.png";
import "./home.css";
import HotDeals from "../../components/HotDeals/HotDeals";

const Home = () => {
  return (
    <Box
      Box
      style={{
        background: "linear-gradient(139.69deg, #2156A6 0%, #286CB3 91.68%)",
      }}
    >
      <Header />
      <Box>
        <Box
          className="home-banner"
          sx={{
            // backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0px",
            // borderTop: "10px solid var(--secondary-color)",
            // borderBottom: "10px solid var(--secondary-color)",
            padding: {
              lg: "100px 0px 50px",
              md: "100px 0px 50px",
              sm: "20px 0px",
              xs: "20px 0px",
            },
            overflow: "auto",
          }}
        >
          <HomeSearchBox />
        </Box>
        <FullScreenSlider />
        <HotDeals />
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
