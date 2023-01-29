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

const AgentManagement = () => {
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
          Agent Management
        </Typography>
        <Box className="balance-transaction" marginTop={"20px"}>
          <table>
            <tr>
              <th>SL. No</th>
              <th>Agent ID</th>
              <th>Status</th>
              <th>Agent Name</th>
              <th>Company Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>ACC Access</th>
              <th>Ledger</th>
              <th>Operation </th>
              <th>Contact </th>
            </tr>
            <tr>
              <td>01</td>
              <td>FFI5655</td>
              <td>Approved </td>
              <td>Syed Afridi</td>
              <td>Zinga Lala</td>
              <td>Mirpur, Dhaka</td>
              <td>syedafridi0@gmail.com</td>
              <td>894189984</td>

              <td>
                <button
                  style={{
                    backgroundColor: "#2564B8",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "3px",
                    width: "73px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </td>
              <td>view</td>
              <td>
                <button
                  style={{
                    backgroundColor: "#E1241A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "3px",
                    width: "73px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                >
                  Deactivate
                </button>
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
            <tr>
              <td>01</td>
              <td>FFI5655</td>
              <td>Approved </td>
              <td>Syed Afridi</td>
              <td>Zinga Lala</td>
              <td>Mirpur, Dhaka</td>
              <td>syedafridi0@gmail.com</td>
              <td>894189984</td>

              <td>
                <button
                  style={{
                    backgroundColor: "rgba(37, 100, 184, 0.6)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "3px",
                    width: "73px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </td>
              <td>view</td>
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

export default AgentManagement;
