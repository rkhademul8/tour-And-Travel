import React from "react";
import { Container, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentManagement = () => {
  return (
    <Box>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography
          variant="span"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            margin: "30px 0px",
            color: "#222222",
            fontFamily: "poppins",
          }}
        >
          Payment Management
        </Typography>
        <Box className="balance-transaction" marginTop={"20px"}>
          <table>
            <tr>
              <th>SL.No</th>
              <th>Deposit ID</th>
              <th>Status</th>
              <th>Company Name</th>
              <th>Payment Type</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date </th>
              <th>Attachment </th>
              <th>Operation </th>
              <th>Contact </th>
            </tr>
            <tr>
              <td>01</td>
              <td>FFI5655</td>
              <td>Approved </td>
              <td>Syed Afridi</td>
              <td>Bank transfer</td>
              <td>Syed Afridi</td>
              <td>Sohan Islam</td>
              <td>FF1542</td>
              <td>50,000 TK</td>
              <td>21 Oct 2022</td>
              <td>View</td>
              <td>
                <IconButton sx={{ color: "#0E8749" }}>
                  <CheckCircleIcon />
                </IconButton>
                <IconButton sx={{ color: "#C4161C" }}>
                  <CancelIcon />
                </IconButton>
              </td>
              <td>
                <IconButton sx={{ color: "var(--primary-color)" }}>
                  <LocalPhoneIcon />
                </IconButton>
                <IconButton sx={{ color: "#0E8749" }}>
                  <WhatsAppIcon />
                </IconButton>
                <IconButton sx={{ color: "#2564B8" }}>
                  <EventNoteIcon />
                </IconButton>
              </td>
            </tr>
          </table>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentManagement;
