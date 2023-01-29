import React, { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Tab, Typography } from "@mui/material";
import axios from "axios";
import { UpdateFlightDeal } from "./UpdateFlightDeal";
import { UpdateGroupFareDeal } from "./UpdateGroupFareDeal";
import { UpdateTourDeal } from "./UpdateTourDeal";
import { UpdateVisaDeal } from "./UpdateVisaDeal";

export const UpdateHotDeals = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [siteConfig, setSiteConfig] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => setSiteConfig(res.data));
  }, []);
  return (
    <Box>
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
                borderRadius: "5px 5px 0px 0px",
                height: "40px",
                fontWeight: 400,
                margin: "0px 5px 5px 0px",
              },
              ".MuiTabs-flexContainer": { flexWrap: "wrap" },
              "& button.Mui-selected": {
                backgroundColor: "var(--primary-color)",
                color: "var(--white) !important",
                borderRadius: "5px 5px 0px 0px",
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
                fontWeight: 400,
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
                <Tab label="Flight" value="1" />
                <Tab label="Group Fare" value="2" />
                <Tab label="Tour" value="3" />
                <Tab label="Visa" value="4" />
              </TabList>
            </Box>
          </Box>
          <TabPanel value="1" style={{ padding: "20px 0px" }}>
            <UpdateFlightDeal />
          </TabPanel>
          <TabPanel value="2" style={{ padding: "20px 0px" }}>
            <UpdateGroupFareDeal />
          </TabPanel>
          <TabPanel value="3" style={{ padding: "20px 0px" }}>
            <UpdateTourDeal siteConfig={siteConfig} />
          </TabPanel>
          <TabPanel value="4" style={{ padding: "20px 0px" }}>
            <UpdateVisaDeal siteConfig={siteConfig} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
