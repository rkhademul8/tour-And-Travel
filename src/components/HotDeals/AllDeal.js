import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import sliderImg from "../../images/SliderImg/s1.png";

const AllDeal = () => {
  return (
    <Box>
      <Grid
        container
        style={{ height: "100%", width: "100%" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* //todo: first  */}
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <Box style={{ height: "210px", width: "100%", position: "relative" }}>
            <img
              src={sliderImg}
              alt="..."
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                position: "relative",
              }}
            />
            <Box
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                bottom: "0px",
                right: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography
                style={{
                  background: "var(--primary-color)",
                  color: "var(--white)",
                  width: "fit-content",
                  height: "fit-content",
                  padding: "7px 20px",
                  margin: "15px 0px 0px -10px",
                }}
              >
                10% Discount
              </Typography>
              <Box style={{ marginBottom: "14px" }}>
                <Typography
                  style={{
                    color: "var(--white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "0px 10px",
                    fontSize: "14px",
                    fontFamily: "poppins",
                    fontWight: "500",
                  }}
                >
                  DAC - CXB Air Ticket on
                </Typography>
                <Typography
                  style={{
                    color: "var(--white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "0px 10px",
                    fontSize: "14px",
                    fontFamily: "poppins",
                    fontWight: "500",
                  }}
                >
                  US Bangla Airlines
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* //todo: two  */}
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <Box style={{ height: "210px", width: "100%", position: "relative" }}>
            <img
              src={sliderImg}
              alt="..."
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                position: "relative",
              }}
            />
            <Box
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                bottom: "0px",
                right: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography
                style={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  width: "fit-content",
                  height: "fit-content",
                  padding: "7px 20px",
                  margin: "15px 0px 0px -10px",
                }}
              >
                10% Discount
              </Typography>
              <Box style={{ marginBottom: "14px" }}>
                <Typography
                  style={{
                    color: "var(--white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "0px 10px",
                    fontSize: "14px",
                    fontFamily: "poppins",
                    fontWight: "500",
                  }}
                >
                  DAC - CXB Air Ticket on
                </Typography>
                <Typography
                  style={{
                    color: "var(--white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "0px 10px",
                    fontSize: "14px",
                    fontFamily: "poppins",
                    fontWight: "500",
                  }}
                >
                  US Bangla Airlines
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* //todo: third  */}
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <Box style={{ height: "210px", width: "100%", position: "relative" }}>
            <img
              src={sliderImg}
              alt="..."
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                position: "relative",
              }}
            />
            <Box
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                bottom: "0px",
                right: "0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography
                style={{
                  background: "var(--primary-color)",
                  color: "var(--white)",
                  width: "fit-content",
                  height: "fit-content",
                  padding: "7px 20px",
                  margin: "15px 0px 0px -10px",
                }}
              >
                10% Discount
              </Typography>
              <Box style={{ marginBottom: "14px" }}>
                <Typography
                  style={{
                    color: "var(--white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "0px 10px",
                    fontSize: "14px",
                    fontFamily: "poppins",
                    fontWight: "500",
                  }}
                >
                  DAC - CXB Air Ticket on
                </Typography>
                <Typography
                  style={{
                    color: "var(--white)",
                    width: "fit-content",
                    height: "fit-content",
                    padding: "0px 10px",
                    fontSize: "14px",
                    fontFamily: "poppins",
                    fontWight: "500",
                  }}
                >
                  US Bangla Airlines
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllDeal;
