import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Pagination, Stack } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2564B8",
      darker: "#2564B8",
    },
  },
});

const CashData = () => {
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;

  const [depositData, setDepositData] = useState([]);
  const [pagiNation, setPagiNation] = useState([]);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setPagiNation(depositData.slice((value - 1) * size, value * size));
  };

  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Deposit/allDeposit.php?agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        const cashFilter = data.filter((data) => data?.paymentway === "Cash");

        const count = cashFilter.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setPagiNation(cashFilter);
        setDepositData(data);
      });
  });
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

          {pagiNation?.slice(0, size).map((data) => (
            <tr>
              <td>{data?.ref}</td>
              <td>{data?.status}</td>
              <td>{data?.paymentway}</td>
              <td>{data?.amount}</td>
              <td> {data?.createdAt}</td>
              <td>{data?.requestedby}</td>
              <td>
                <a href={data?.attachment} target="_blank">
                  View
                </a>
              </td>
              <td> {data?.remarks === "" ? "N/A" : data?.remarks} </td>
            </tr>
          ))}
        </table>
      </Box>

      {/* <Box
        sx={{
          width: "100%",
          my: 3,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderTop: "1px solid #FFA84D",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            my: 3,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",

            marginTop: "8px",
          }}
        >
          <Typography style={{ fontSize: "15px" }}>
            Showing Results 1 - 10 of 20
          </Typography>
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <Pagination
                size="small"
                count={pageCount}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </ThemeProvider>
        </Box>
      </Box> */}
    </Box>
  );
};

export default CashData;
