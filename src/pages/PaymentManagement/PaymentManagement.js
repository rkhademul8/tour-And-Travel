import React, { useState } from "react";
import { Container, Grid, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AllPayment from "./AllPayment";
import PendingPayment from "./PendingPayment";
import ApprovePayment from "./ApprovePayment";
import RejectPayment from "./RejectPayment";

const PaymentManagement = () => {
  const [optionValue, setOptionValue] = useState("");
  const handleChangeOption = (e) => {
    setOptionValue(e.target.value);
  };
  return (
    <Box>
      {/* <AdminHeader /> */}
      <Container style={{ marginTop: "50px", padding: "0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="span"
              sx={{
                fontWeight: 400,
                fontSize: "24px",
                margin: "30px 0px",
                color: "#222222",
              }}
            >
              Payment Management
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="right">
            <select
              onChange={handleChangeOption}
              className="searchList1-select"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </Grid>
        </Grid>

        {(optionValue === "All" || optionValue === "") && (
          <>
            <AllPayment />
          </>
        )}

        {optionValue === "Pending" && (
          <>
            <PendingPayment />
          </>
        )}

        {optionValue === "Approved" && (
          <>
            <ApprovePayment />
          </>
        )}

        {optionValue === "Rejected" && (
          <>
            <RejectPayment />
          </>
        )}
      </Container>
    </Box>
  );
};

export default PaymentManagement;
