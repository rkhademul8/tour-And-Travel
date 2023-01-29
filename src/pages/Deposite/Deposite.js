import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Header from "./../../components/Header/Header";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DepositeTabs from "../../components/Deposit/DepositeTabs";
import { Link } from "react-router-dom";

const Deposite = () => {
  const [select, setSelect] = React.useState("");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  return (
    <Box>
      <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Box
          sx={{
            margin: "30px 0px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="span" sx={{ fontWeight: 500, fontSize: "32px" }}>
            Deposit
          </Typography>

          <Box sx={{ display: "flex", gap: 5 }}>
            <Box className="searchList1"></Box>
            <FormControl>
              <Select
                value={select}
                onChange={handleChange}
                displayEmpty
                sx={{ height: "45px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Show All</em>
                </MenuItem>
                <MenuItem value={10}>Pending</MenuItem>
                <MenuItem value={20}>Approved</MenuItem>
                <MenuItem value={30}>Rejected</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{
                textTransform: "capitalize",
                width: "161px",
                height: "42px",
                background: "var(--primary-color)",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
            >
              <Link
                to={"/dashboardhome/adddeposite"}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Add Deposit
              </Link>
            </Button>
          </Box>
        </Box>
        <Box>
          <DepositeTabs />
        </Box>
      </Container>
    </Box>
  );
};

export default Deposite;
