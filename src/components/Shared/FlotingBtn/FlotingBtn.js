import { Button } from "@mui/material";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";

const FlotingBtn = () => {
  return (
    <Box>
      <Button
        endIcon={<LogoutIcon />}
        style={{
          background: "var(--mateBlack)",
          color: "var(--white)",
          fontWeight: "600",
          padding: "20px 10px",
          position: "fixed",
          bottom: "50px",
          right: "2%",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default FlotingBtn;
