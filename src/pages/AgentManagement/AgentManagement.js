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
import "./AgentParent.css";
import AllAgent from "./AllAgent";
import PendingAgent from "./PendingAgent";
import ActiveAgent from "./ActiveAgent";
import RejectAgent from "./RejectAgent";
import DeactiveAgent from "./DeactiveAgent";
import AgentFailed from "./AgentFailed";

const AgentManagement = () => {
  const [optionValue, setOptionValue] = useState("");
  const handleChangeOption = (e) => {
    setOptionValue(e.target.value);
  };
  return (
    <Box>
      <Container style={{ marginTop: "20px", padding: "0" }}>
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
              Agent Management
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} textAlign="right">
            <select
              onChange={handleChangeOption}
              className="searchList1-select"
            >
              <option value="All">&nbsp;All</option>
              <option value="Pending">&nbsp;Pending</option>
              <option value="Active">&nbsp;Active</option>
              <option value="Reject">&nbsp;Reject</option>
              <option value="Deactivate">&nbsp;Deactivate</option>
              {/* <option value="AgentFailed">&nbsp;Agent Failed</option> */}
              {/* <option value="CreditAgent">&nbsp;Credit Agent</option> */}
            </select>
          </Grid>
        </Grid>

        {(optionValue === "All" || optionValue === "") && (
          <>
            <AllAgent />
          </>
        )}

        {optionValue === "Pending" && (
          <>
            <PendingAgent />
          </>
        )}

        {optionValue === "Active" && (
          <>
            <ActiveAgent />
          </>
        )}

        {optionValue === "Reject" && (
          <>
            <RejectAgent />
          </>
        )}
        {optionValue === "Deactivate" && (
          <>
            <DeactiveAgent />
          </>
        )}
        {optionValue === "AgentFailed" && (
          <>
            <AgentFailed />
          </>
        )}
      </Container>
    </Box>
  );
};

export default AgentManagement;
