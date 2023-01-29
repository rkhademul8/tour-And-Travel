import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import GeneralLedgerAll from "./GeneralLedgerAll";
import LedgerPurchase from "./LedgerPurchase";
import LedgerReturn from "./LedgerReturn";
import LegderDeposit from "./LegderDeposit";

const GeneralLedgerRoute = () => {
  const [optionValue, setOptionValue] = useState("");

  const handleChangeOption = (e) => {
    setOptionValue(e.target.value);
  };

  return (
    <Box>
      <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={6} sm={6} md={6}>
            <Typography sx={{ color: "#282E2C", fontSize: "23px" }} mb={2}>
              General Ledger
            </Typography>
            {/* <Box className="searchList1">
            <input
              type="text"
              placeholder="search"
              hdgfhgdhf
              onChange={handelSearchItems}
            />
          </Box> */}
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            textAlign="right"
            className="searchList1-select"
          >
            <Box>
              <select style={{ width: "30%" }} onChange={handleChangeOption}>
                <option value="all">&nbsp;All</option>
                <option value="Deposit">&nbsp;Deposit</option>
                <option value="Return">&nbsp;Return</option>
                <option value="Purchase">&nbsp;Purchase</option>
              </select>
            </Box>
          </Grid>
        </Grid>
        {(optionValue === "all" || optionValue === "") && <GeneralLedgerAll />}
        {optionValue === "Deposit" && <LegderDeposit />}
        {optionValue === "Return" && <LedgerReturn />}
        {optionValue === "Purchase" && <LedgerPurchase />}
      </Container>
    </Box>
  );
};

export default GeneralLedgerRoute;
