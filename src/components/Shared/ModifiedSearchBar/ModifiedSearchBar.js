import React from "react";
import { Box, Container } from "@mui/system";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import { Grid } from "@mui/material";
import flightData from "../../Dashboard/DashboardMain/flightData";
import "./ModifiedSearchBar.css";

const ModifiedSearchBar = () => {
  // tabcontext function
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="One Way" value="1" />
              <Tab label="Round Trip" value="2" />
              <Tab label="Multi City" value="3" />
            </TabList>
          </Box>

          {/*  One Way Input Search Box */}
          <TabPanel value="1">
            <form>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Box className="modified-search-input">
                        
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}></Grid>
                  <Grid item xs={12} sm={12} md={3}></Grid>
                  <Grid item xs={12} sm={12} md={3}></Grid>

                  {/* <Grid item xs={12} sm={12} md={3}></Grid> */}
                </Grid>
              </Box>
            </form>
          </TabPanel>
          {/* Round Way Input Search Box */}
          <TabPanel value="2">Item Two</TabPanel>

          {/* Multi City Input search Box */}
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default ModifiedSearchBar;
