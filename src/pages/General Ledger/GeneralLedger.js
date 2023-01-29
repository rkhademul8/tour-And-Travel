import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const GeneralLedger = () => {
  const [select, setSelect] = React.useState("");

  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  return (
    <Box>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Box
          sx={{
            margin: "30px 0px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="span"
            sx={{ fontWeight: 500, fontSize: "23px", color: "#003566" }}
          >
            General Ledger
          </Typography>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Box className="searchList1">
              <SearchRoundedIcon
                sx={{
                  background: "#2564B8",
                  color: "#FFFFFF",
                  borderRadius: "50px",
                  fontSize: "40px",
                }}
              />
            </Box>
            <FormControl>
              <Select
                value={select}
                onChange={handleChange}
                displayEmpty
                sx={{ height: "45px" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Show All</em>
                </MenuItem>
                <MenuItem value={10}>Pending</MenuItem>
                <MenuItem value={20}>Approved</MenuItem>
                <MenuItem value={30}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box className="balance-transaction" marginTop={"20px"}>
          <table>
            <tr>
              <th>SI No</th>
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
      </Container>
    </Box>
  );
};

export default GeneralLedger;
