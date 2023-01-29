import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CashTab from "./AddDepositTabs/CashTab";
import { Button } from "@mui/material";
import ChequeTab from "./AddDepositTabs/ChequeTab";
import BankTab from "./AddDepositTabs/BankTab";
import MobileTab from "./AddDepositTabs/MobileTab";
import { Container } from "@mui/system";
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
        <Box sx={{ p: 3 }}>
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

const AddDeposite = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "25px",
              color: "#222222",
              mb: "18px",
              padding: "0px 22px",
            }}
          >
            Add Deposit
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "transparent" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Cash" {...a11yProps(0)} />
              <Tab label="Cheque" {...a11yProps(1)} />
              <Tab label="Bank Transfer" {...a11yProps(2)} />
              <Tab label="Mobile Banking" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CashTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChequeTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BankTab />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <MobileTab />
          </TabPanel>
        </Box>

        {/* <Button
          sx={{
            background: "#222222",
            color: "#FFFFFF",
            width: "370px",
            mt: "4rem",
            ml: "1rem",
            "&:hover": {
              backgroundColor: "#2564B8",
            },
          }}
        >
          Send Deposit Request
        </Button> */}
      </Container>
    </Box>
  );
};

export default AddDeposite;
