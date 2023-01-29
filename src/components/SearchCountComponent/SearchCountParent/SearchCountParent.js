import React from "react";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Box, Container, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import "./SearchCountParent.css";
import TotalStateCount from "../StateSearch/TotalStateCount";
import YesterdayCount from "../StateSearch/YesterdayCount";
import Last7DaysCount from "../StateSearch/Last7DaysCount";
import Last15DaysCount from "../StateSearch/Last15DaysCount";
import Last1MonthCount from "../StateSearch/Last1MonthCount";

const SearchCountParent = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Container style={{ marginTop: "20px" }}>
        <Box>
          <Box>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "30px",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Search Count
            </Typography>
          </Box>
          <Box sx={{ width: "100%"}}>
            <TabContext value={value}>
              <Box
                sx={{
                  width: "100%",
                  background: "var(--white)",
                  minHeight: { md: "40px", sm: "40px", xs: "40px" },
                  borderRadius: "0px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  opacity: "1",
                  ".MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                    gap: "5px",
                    padding: {
                      lg: "0px",
                      md: "0px",
                      sm: "0px 20px",
                      xs: "0px 20px",
                    },
                  },
                  "& button": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                    opacity: "1",
                    borderRadius: "5px",
                  },

                  "& button.Mui-selected": {
                    background: "var(--primary-color)",
                    color: "var(--white)",
                    opacity: "1",
                  },
                }}
              >
                <TabList
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { display: "none" },
                  }}
                >
                  <Tab label="Today State" value="1" />
                  <Tab label="Yesterday State" value="2" />
                  <Tab label="Last 7 Days" value="3" />
                  <Tab label="Last 15 Days" value="4" />
                  <Tab label="Last 1 Month" value="5" />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ padding: "0px" }}>
                <TotalStateCount />
              </TabPanel>
              <TabPanel value="2" style={{ padding: "0px" }}>
                <YesterdayCount />
              </TabPanel>
              <TabPanel value="3" style={{ padding: "0px" }}>
                <Last7DaysCount />
              </TabPanel>
              <TabPanel value="4">
                <Last15DaysCount />
              </TabPanel>
              <TabPanel value="5">
                <Last1MonthCount />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchCountParent;
