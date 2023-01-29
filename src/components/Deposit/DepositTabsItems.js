import React from "react";
import { Box, Container } from "@mui/material";

const DepositTabsItems = () => {
  return (
    <Box>
      <Box
        className="balance-transaction"
        marginTop={"20px"}
        style={{ padding: "0px !important" }}
      >
        <table>
          <tr>
            <th>Reff No</th>
            <th>Status</th>
            <th>Type </th>
            <th>Amount</th>
            <th>Transaction Date</th>
            <th>Requested By</th>
            <th>Attachment</th>
            <th>Rejection Reason</th>
          </tr>
          <tr>
            <td>FFD1147</td>
            <td>PENDING</td>
            <td>Cash</td>
            <td>493</td>
            <td>28 Nov 2022 06:51 AM</td>
            <td>Uzzal Hossain</td>
            <td>syedafridi0@gmail.com</td>
            <td>N/A</td>
          </tr>
        </table>
      </Box>
    </Box>
  );
};

export default DepositTabsItems;
