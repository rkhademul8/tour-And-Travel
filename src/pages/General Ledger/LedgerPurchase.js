import { Box, Container } from "@mui/material";
import React from "react";

const LedgerPurchase = () => {
  return (
    <Box>
      <Box className="balance-transaction" marginTop={"20px"}>
        <table>
          <tr>
            <th>Sl No</th>
            <th>Ledger Type</th>
            <th>Transaction ID</th>
            <th>Transaction Dtae</th>
            <th>Transaction Dteails</th>
            <th>Transaction Amount</th>
            <th>Last Balance</th>
          </tr>
          <tr>
            <td>01</td>
            <td>Purchase</td>
            <td>51151515355</td>
            <td>27 Nov 2022 11:53 AM</td>
            <td>oneway Air Ticket DAC - DXB - Oman Air By Agent</td>
            <td>12556</td>
            <td>44544</td>
            {/* <td style={{}}>
              <a href={`#`}>
                <PhoneIcon
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
              </a>
              <a href={`#`} target="_blank">
                <WhatsAppIcon
                  style={{
                    color: "green",
                    fontSize: "21px",
                    marginRight: "5px",
                  }}
                />
              </a>

              <a style={{ cursor: "pointer" }}>
                <EventNoteIcon
                  onClick={() => handleOpen()}
                  style={{ color: "#2564B8", fontSize: "20px" }}
                />
              </a>
            </td> */}
          </tr>
        </table>
      </Box>
    </Box>
  );
};

export default LedgerPurchase;
