import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { json, Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
const BankAccount = () => {
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Deposit/allBank.php?agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => setBankData(data));
  });

  return (
    <Box>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Box
          sx={{
            margin: "0px 0px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
            Bank Account
          </Typography>

          <Box sx={{ display: "flex", gap: 5 }}>
            {/*             
            <Box className="searchList1">
              <SearchRoundedIcon
                sx={{
                  background: "#2564B8",
                  color: "#FFFFFF",
                  borderRadius: "50px",
                  fontSize: "40px",
                }}
              />
            </Box> */}

            <Button
              sx={{
                width: "161px",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                textTransform: "capitalize",

                background: "var(--primary-color)",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to={"/addbankaccount"}
              >
                Add Bank
              </Link>
            </Button>
          </Box>
        </Box>

        <Box className="balance-transaction" marginTop={"2px"}>
          <table>
            <tr>
              <th>Holder Name</th>
              <th>Bank Name</th>
              <th>Account Number</th>
              <th>Branch Name</th>
              <th>Address</th>
              <th>Swift</th>
              <th>Routing</th>
              <th>Created At</th>
            </tr>

            {bankData?.map((data) => (
              <tr>
                <td>{data?.accname}</td>
                <td>{data?.bankname}</td>
                <td>{data?.accno}</td>
                <td>{data?.branch}</td>
                <td>{data?.address}</td>
                <td>{data?.routing}</td>
                <td>{data?.swift}</td>
                <td>{data?.createdAt}</td>
              </tr>
            ))}
          </table>
        </Box>
      </Container>
    </Box>
  );
};

export default BankAccount;
