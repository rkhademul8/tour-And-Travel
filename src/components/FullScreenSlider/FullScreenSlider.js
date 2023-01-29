import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Slider from "react-slick";
import sliderImg from "../../images/SliderImg/s1.png";
import "./FullScreenSlider.css";

const FullScreenSlider = () => {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };
  return (
    <Container>
      <Box
        sx={{
          margin: "50px 0px",
        }}
        className="full-screen-slider"
      >
        <Slider {...settings}>
          {[...new Array(5)].map((item, index) => (
            <Box key={index} sx={{ borderRadius: "5px", overflow: "hidden" }}>
              <Box sx={{ display: "flex", height: "300px" }}>
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    background: "var(--mateBlack)",
                  }}
                >
                  <Typography sx={{ padding: "20px", color: "var(--white)" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam eveniet voluptatem sint. Accusantium autem rem quos
                    dolores, quibusdam quasi impedit saepe ullam eaque quaerat
                    praesentium, suscipit omnis officiis? Et, cum!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    background: "var(--primary-color)",
                  }}
                >
                  <img
                    src={sliderImg}
                    alt="..."
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default FullScreenSlider;
