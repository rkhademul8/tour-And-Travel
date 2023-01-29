import React from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./HotDeals.css";
import AllDeal from "./AllDeal";
import FlightDeal from "./FlightDeal";
import GroupFareDeal from "./GroupFareDeal";
import TourDeal from "./TourDeal";
import VisaDeal from "./VisaDeal";

const HotDeals = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ width: "100%", height: "100%", flexWrap: "wrap" }}>
        <TabContext value={value}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              display: "flex",
              justifyContent: "flex-between",
              alignItems: "center",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },

              "& button": {
                opacity: "1",
                color: "var(--secondary-color)",
                // borderRadius: "5px",
                height: "40px",
                fontWeight: "600",
                margin: "0px 5px 5px 0px",
                transition: "all 0.5s linear",
              },
              ".MuiTabs-flexContainer": { flexWrap: "wrap" },
              "& button.Mui-selected,& button.Mui-selected >svg": {
                backgroundColor: "var(--primary-color)",
                color: "var(--white) !important",
              },
            }}
          >
            <Typography
              sx={{
                width: { lg: "30%", md: "30%", sm: "100%", xs: "100%" },
                height: "100%",
                display: "flex",
                justifyContent: {
                  lg: "start",
                  md: "start",
                  sm: "center",
                  xs: "center",
                },
                alignItems: "center",
                fontSize: "22px",
                fontWeight: "600",
                color: "var(--mateBlack)",
              }}
            >
              Hot Deals
            </Typography>
            <Box
              sx={{
                width: { lg: "70%", md: "70%", sm: "100%", xs: "100%" },
                height: "100%",

                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
                style={{
                  padding: "0px 20px",
                  borderBottom: "2px solid var(--primary-color)",
                  height: "42px",
                }}
              >
                <Tab label="All" value="1" />
                <Tab label="Flight" value="2" />
                <Tab label="Group Fare" value="3" />
                <Tab label="Tour" value="4" />
                <Tab label="Visa" value="5" />
              </TabList>
            </Box>
          </Box>
          <TabPanel value="1" style={{ padding: "20px 0px" }}>
            <AllDeal />
          </TabPanel>
          <TabPanel value="2" style={{ padding: "20px 0px" }}>
            <FlightDeal />
          </TabPanel>
          <TabPanel value="3" style={{ padding: "20px 0px" }}>
            <GroupFareDeal />
          </TabPanel>
          <TabPanel value="4" style={{ padding: "20px 0px" }}>
            <TourDeal />
          </TabPanel>
          <TabPanel value="5" style={{ padding: "20px 0px" }}>
            <VisaDeal />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default HotDeals;
