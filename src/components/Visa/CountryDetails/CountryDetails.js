import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlaceIcon from "@mui/icons-material/Place";
import { useReactToPrint } from "react-to-print";
import secureLocalStorage from "react-secure-storage";
import "./CountryDetails.css";

function TableRowData({ data }) {
  const {
    entryType,
    maximumStay,
    duration,
    processingTime,
    cost,
    interview,
    embassyFee,
    agentFee,
    agencyFee,
    FFIServiceCharge,
    total,
    visaType,
  } = data;
  const arrayData = [data];

  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "& tr,td": {
            padding: "6px 10px",
            color: "var(--secondary-color)",
          },
        }}
      >
        <TableCell>{entryType}</TableCell>
        <TableCell>{duration}&nbsp;Months</TableCell>
        <TableCell>{maximumStay}&nbsp;Days</TableCell>
        <TableCell>{processingTime}&nbsp;Working&nbsp;Days</TableCell>
        <TableCell>{interview}</TableCell>
        <TableCell>
          {parseInt(embassyFee) +
            parseInt(agentFee) +
            parseInt(agencyFee) +
            parseInt(FFIServiceCharge)}
          &nbsp;BDT
        </TableCell>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Typography
                sx={{
                  width: "100px",
                  color: "var(--white)",
                  bgcolor: "var(--primary-color)",
                  fontSize: "14px",
                }}
              >
                hide
              </Typography>
            ) : (
              <Typography
                sx={{
                  width: "100px",
                  color: "var(--white)",
                  background: "var(--secondary-color)",
                  fontSize: "14px",
                  textDecoration: "capitalize",
                }}
              >
                show
              </Typography>
            )}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#D1E9FF",
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="p"
                color="var(--primary-color)"
                gutterBottom
                component="div"
              >
                *Depends on embassy
              </Typography>
              <Typography
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "18px",
                  fontWeight: 500,
                  mb: "10px",
                }}
              >
                Price Break Down
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                style={{ border: "none" }}
              >
                <TableHead style={{ backgroundColor: "#88BAEB" }}>
                  <TableRow style={{ border: "none" }}>
                    <TableCell align="center">Embassy&nbsp;Fee</TableCell>
                    <TableCell align="center">Agent&nbsp;Fee</TableCell>
                    <TableCell align="center">Agency&nbsp;Fee</TableCell>
                    <TableCell align="center">
                      FFI&nbsp;Service&nbsp;Charge
                    </TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayData?.map((price, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor: "#D1E9FF",
                        border: "none",
                      }}
                    >
                      <TableCell align="center">
                        {price?.embassyFee}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {price?.agentFee}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {price?.agencyFee}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {price?.FFIServiceCharge}&nbsp;BDT
                      </TableCell>
                      <TableCell align="center">
                        {parseInt(price?.embassyFee) +
                          parseInt(price?.agentFee) +
                          parseInt(price?.agencyFee) +
                          parseInt(price?.FFIServiceCharge)}
                        &nbsp;BDT
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CountryDetails = () => {
  let { countryName, visaType } = useParams();
  const location = useLocation();
  const [optionValue, setOptionValue] = useState("JobHolder");
  const [users, setUsers] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  let agentID = users?.user?.agentId;

  const [visaDetails, setVisaDetails] = useState({});
  // console.log("visaDetails", visaDetails);

  // header added
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Visa/all.php?singleVisa`;
    let body = JSON.stringify({
      country: countryName.trim(),
      category: visaType.trim(),
    });

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        setVisaDetails(data);
      });
  }, [countryName, visaType]);

  // console.log("visadetails", visaDetails);
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]));
  }, [agentID]);

  return (
    <Container>
      <Box sx={{ margin: "10px 0px" }}>
        <Grid container justifyContent="space-between">
          <Grid item sm={12} md={9}>
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "28px",
                fontWeight: 600,
                mb: "10px",
              }}
            >
              Required Documents for {countryName.trim()} {visaType.trim()}
            </Typography>
            <Typography>
              Visa Type:
              {Object.keys(visaDetails).length !== 0
                ? visaDetails?.visainfo[0]?.visaType || ""
                : "Loading..."}
            </Typography>
            <Typography
              my={3}
              color={"var(--primary-color)"}
              fontSize="20px"
              fontWeight={600}
            >
              Duration and Cost Details
            </Typography>
            <Box my={3}>
              <TableContainer>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "var(--secondary-color)",
                      }}
                    >
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        Entry
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        Duration
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        Maximum&nbsp;Stay
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        Processing&nbsp;Time
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        Interview
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        Cost
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "6px 10px",
                          color: "var(--white)",
                        }}
                      >
                        View&nbsp;Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visaDetails?.visainfo?.map((row) => (
                      <TableRowData data={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box display={"flex"} alignItems="center" my={2}>
              <Typography
                color="var(--secondary-color)"
                fontSize="16px"
                fontWeight={500}
                mr={2}
              >
                Select Your Profession:{" "}
              </Typography>
              <select
                style={{
                  width: "150px",
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--white)",
                  padding: "6px",
                  outline: "none",
                }}
                onChange={(e) => setOptionValue(e.target.value)}
              >
                <option value="JobHolder">Job Holder</option>
                <option value="BusinessMan">Business Man</option>
                <option value="GovtJobHolder">Govt Job Holder</option>
                <option value="Doctor">Doctor</option>
                <option value="AdvocateLawyer">Advocate Lawyer</option>
                <option value="Student">Student</option>
                <option value="NonStudentChild">Non Student Child</option>
                <option value="Housewife">House Wife</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "var(--primary-color)",
                  fontSize: "20px",
                  fontWeight: 600,
                  my: "40px",
                }}
              >
                {optionValue === "JobHolder" ? (
                  <>Job Holder</>
                ) : optionValue === "BusinessMan" ? (
                  <>Business Man</>
                ) : optionValue === "GovtJobHolder" ? (
                  <>Govt. Job Holder</>
                ) : optionValue === "Doctor" ? (
                  <>Doctor</>
                ) : optionValue === "AdvocateLawyer" ? (
                  <>Advocate Lawyer</>
                ) : optionValue === "Student" ? (
                  <>Student</>
                ) : optionValue === "NonStudentChild" ? (
                  <>Non Student Child</>
                ) : optionValue === "Housewife" ? (
                  <>House Wife</>
                ) : optionValue === "Unemployed" ? (
                  <>Unemployed</>
                ) : (
                  <></> || "Select Visa Type"
                )}
              </Typography>
              {/* {console.log("uzzal", visaDetails?.checklist)} */}
              {visaDetails?.checklist?.map((check, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "14px",
                    color: "var(--secondary-color)",
                    mb: "10px",
                  }}
                >
                  {optionValue === check?.passengertype ? (
                    <>
                      {"💠 "}
                      {check?.checkList}
                    </>
                  ) : null}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item sm={12} md={2.7}>
            <Paper sx={{ padding: "15px 10px" }}>
              <Typography
                fontSize="16px"
                color="var(--primary-color)"
                borderBottom="1px solid #000000"
                mb={2}
              >
                Download / PDF
              </Typography>
              <Button size="small" sx={{ color: "var(--secondary-color)" }}>
                PDF Dynamic Name
              </Button>
            </Paper>
            <br />
            <Paper sx={{ padding: "15px 10px" }}>
              <Typography
                fontSize="16px"
                color="var(--primary-color)"
                borderBottom="1px solid #000000"
                mb={2}
              >
                Visa Submission Location
              </Typography>
              <Typography display={"flex"}>
                <PlaceIcon style={{ color: "var(--primary-color)" }} />
                <Typography fontSize="12px" paddingLeft="10px">
                  Ka 11/2A, Bashundhora R/A Road, Jagannathpur, Dhaka 1229
                </Typography>
              </Typography>
            </Paper>
            <br />
            <Box
              sx={{
                color: "var(--white)",
                background: "var(--primary-color)",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "center",
                cursor: "pointer",
                mb: 1,
                p: 1,
              }}
            >
              Apply Visa
            </Box>

            <Box
              sx={{
                color: "var(--white)",
                background: "var(--secondary-color)",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "center",
                cursor: "pointer",
                mb: 1,
                p: 1,
              }}
            >
              Notes
            </Box>

            <Box
              sx={{
                color: "var(--white)",
                background: "var(--secondary-color)",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "center",
                p: 1,
              }}
            >
              Exception
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CountryDetails;
