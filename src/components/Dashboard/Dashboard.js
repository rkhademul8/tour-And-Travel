import { Box } from "@mui/material";
import React from "react";
import FullScreenSlider from "../FullScreenSlider/FullScreenSlider";
import HomeSearchBox from "../HomeSearchBox/HomeSearchBox";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <Box style={{ marginTop: "50px" }}>
      {/* <HomeSearchBox /> */}
      <FullScreenSlider />
    </Box>
  );
};

export default Dashboard;
