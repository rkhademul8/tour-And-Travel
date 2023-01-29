import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DepositTabsItems from "./DepositTabsItems";
import { Container } from "@mui/material";
import DepositAll from "./DepositAllPage/DepositAll";
import CashData from "./DepositAllPage/CashData";
import ChequeData from "./DepositAllPage/ChequeData";
import MobileData from "./DepositAllPage/MobileData";
import BankaData from "./DepositAllPage/BankaData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DepositeTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ background: "#FFFFFF" }}
        >
          <Tab sx={{ color: "#2564B8" }} label="All" {...a11yProps(0)} />
          <Tab sx={{ color: "#2564B8" }} label="Cash" {...a11yProps(1)} />
          <Tab sx={{ color: "#2564B8" }} label="Cheque" {...a11yProps(2)} />
          <Tab
            sx={{ color: "#2564B8" }}
            label="Bank Transfer"
            {...a11yProps(3)}
          />
          <Tab
            sx={{ color: "#2564B8" }}
            label="Mobile Banking"
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DepositAll />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CashData />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChequeData />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BankaData />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MobileData />
      </TabPanel>
    </Box>
  );
};

export default DepositeTabs;
