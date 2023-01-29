import TabContext from "@material-ui/lab/TabContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AgentAll from "./AgentManagement/AgentAll";
import AgentApprove from "./AgentManagement/AgentApprove";
import AgentCredit from "./AgentManagement/AgentCredit";
import AgentFailed from "./AgentManagement/AgentFailed";
import AgentIactive from "./AgentManagement/AgentIactive";
import AgentPending from "./AgentManagement/AgentPending";
import AgentReject from "./AgentManagement/AgentReject";
import BookingAll from "./BookingManagement/BookingAll";
import BookingCancelled from "./BookingManagement/BookingCancelled";
import BookingFailed from "./BookingManagement/BookingFailed";
import BookingHold from "./BookingManagement/BookingHold";
import BookingIssuseProcess from "./BookingManagement/BookingIssuseProcess";
import BookingRefund from "./BookingManagement/BookingRefund";
import BookingRefundProcess from "./BookingManagement/BookingRefundProcess";
import BookingReissued from "./BookingManagement/BookingReissued";
import BookingReissueProcess from "./BookingManagement/BookingReissueProcess";
import BookingTicketed from "./BookingManagement/BookingTicketed";
import BookingVoided from "./BookingManagement/BookingVoided";
import BookingVoidProcess from "./BookingManagement/BookingVoidProcess";
import "./DashboardTrack.css";
import DepositAll from "./DepositManagement/DepositAll";
import DepositApprove from "./DepositManagement/DepositApprove";
import DepositApproveAmount from "./DepositManagement/DepositApproveAmount";
import DepositFailed from "./DepositManagement/DepositFailed";
import DepositPending from "./DepositManagement/DepositPending";
import DepositPendingAmount from "./DepositManagement/DepositPendingAmount";
import DepositRejcetAmount from "./DepositManagement/DepositRejcetAmount";
import DepositReject from "./DepositManagement/DepositReject";
import SearchAgency from "./SearchManagement/SearchAgency";
import SearchAll from "./SearchManagement/SearchAll";
import SearchOneWay from "./SearchManagement/SearchOneWay";
import SearchRetunt from "./SearchManagement/SearchRetunt";
import SearchTop from "./SearchManagement/SearchTop";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

const DashboardTrack = () => {
  const [desire1, setDesire1] = useState(0);
  const [desire2, setDesire2] = useState(0);
  const [desire3, setDesire3] = useState(0);

  const [searchCount, setSearchCount] = useState([]);

  useEffect(() => {
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        setSearchCount(data);
      });
  }, []);

  return (
    <Box>
      <Container style={{ marginTop: "20px" }}>
        {/* At a glance box start here*/}
        <Box>
          <Grid container spacing={8}>
            <Grid item xs={12} md={3}>
              <Box
                style={{
                  background: "var(--secondary-color)",
                  height: "100px",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                <Box>
                  <CrisisAlertIcon
                    style={{
                      backgroundColor: "var(--primary-color)",
                      padding: "2px 20px",
                      color: "#fff",
                      borderRadius: "0px 0px 2px 2px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "poppins",
                    }}
                  >
                    Today Total Sale
                  </Typography>
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    50000 BDT
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                style={{
                  background: "var(--primary-color)",
                  height: "100px",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                <Box>
                  <CrisisAlertIcon
                    style={{
                      backgroundColor: "var(--secondary-color) ",
                      padding: "2px 20px",
                      color: "#fff",
                      borderRadius: "0px 0px 2px 2px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "poppins",
                    }}
                  >
                    Today Total Booking
                  </Typography>
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    100
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                style={{
                  background: "var(--secondary-color)",
                  height: "100px",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                <Box>
                  <CrisisAlertIcon
                    style={{
                      backgroundColor: "var(--primary-color)",
                      padding: "2px 20px",
                      color: "#fff",
                      borderRadius: "0px 0px 2px 2px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "poppins",
                    }}
                  >
                    Today Total Deposit
                  </Typography>
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    50000 BDT
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                style={{
                  background: "var(--primary-color)",
                  height: "100px",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              >
                <Box>
                  <CrisisAlertIcon
                    style={{
                      backgroundColor: "var(--secondary-color) ",
                      padding: "2px 20px",
                      color: "#fff",
                      borderRadius: "0px 0px 2px 2px",
                    }}
                  />
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      fontFamily: "poppins",
                    }}
                  >
                    Today Total Register Agent
                  </Typography>
                  <Typography
                    style={{
                      color: "#fff",
                      fontSize: "22px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                    }}
                  >
                    50
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* At a glance box end here*/}

        <Typography
          mb={1}
          mt={1}
          style={{
            color: "var(--black)",
            fontSize: "20px",
            fontFamily: "poppins",
            fontWeight: "500",
          }}
        >
          Booking Management
        </Typography>
        <Grid container spacing={2}>
          {/*----------- Booking Management  section--------------*/}
          <Grid item xs={12} md={12}>
            <Box className=" dashboardTrack1">
              <Box className="parent-dashboardTrack1">
                <Box>
                  <Tabs
                    selectedIndex={desire1}
                    onSelect={(index) => setDesire1(index)}
                  >
                    <TabList
                      style={{
                        paddingLeft: "0px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "11px",
                        marginBottom: "8px",
                      }}
                    >
                      <Box style={{ display: "flex", gap: "15px" }}>
                        <Tab>All {searchCount?.TotalBooking}</Tab>
                        <Tab>Hold {searchCount?.Hold} </Tab>
                        <Tab>
                          Issue on Process {searchCount?.IssueOnProcessing}
                        </Tab>
                        <Tab>Ticketed {searchCount?.Ticketed}</Tab>

                        <Tab>
                          Reissue on Process {searchCount?.ReissueOnProcessing}
                        </Tab>
                        <Tab>
                          Void on Process {searchCount?.VoidOnProcessing}
                        </Tab>
                        <Tab>
                          Refund on Process {searchCount?.RefundOnProcessing}
                        </Tab>

                        <Tab>Reissued {searchCount?.Reissued}</Tab>
                        <Tab>Refund {searchCount?.Refunded}</Tab>
                        <Tab>Voided {searchCount?.Void}</Tab>
                        <Tab>Canceled {searchCount?.Cancelled}</Tab>

                        <Tab>Booking Failed 50</Tab>

                        {/* 
                          
                      */}
                      </Box>
                    </TabList>

                    <TabPanel>
                      <TabContext>
                        <BookingAll />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingHold />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingIssuseProcess />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingTicketed />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingReissueProcess />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingVoidProcess />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingRefundProcess />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingReissued />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingRefund />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingVoided />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingCancelled />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <BookingFailed />
                      </TabContext>
                    </TabPanel>
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/*----------- Booking Management  section end--------------*/}
        </Grid>
        <Grid container spacing={2} className="customMargin1">
          <Grid item xs={12} md={6}>
            <Typography
              my={1}
              style={{
                color: "var(--black)",
                fontSize: "20px",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Agent Management
            </Typography>
            <Box className=" dashboardTrack2">
              <Box className="parent-dashboardTrack2">
                <Box>
                  <Tabs
                    selectedIndex={desire2}
                    onSelect={(index) => setDesire2(index)}
                  >
                    <TabList
                      style={{
                        paddingLeft: "0px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      <Box style={{ display: "flex", gap: "15px" }}>
                        <Tab>All {searchCount?.TotalDeposit}</Tab>
                        <Tab>Pending {searchCount?.TotalPending}</Tab>
                        <Tab>Approved {searchCount?.TotalApproved}</Tab>

                        <Tab>Reject {searchCount?.TotalRejected}</Tab>
                      </Box>
                    </TabList>

                    <TabPanel>
                      <TabContext>
                        <DepositAll />
                      </TabContext>
                    </TabPanel>

                    <TabPanel>
                      <TabContext>
                        <DepositPending />
                      </TabContext>
                    </TabPanel>

                    <TabPanel>
                      <TabContext>
                        <DepositApprove />
                      </TabContext>
                    </TabPanel>

                    <TabPanel>
                      <TabContext>
                        <DepositReject />
                      </TabContext>
                    </TabPanel>
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              my={1}
              style={{
                color: "var(--black)",
                fontSize: "20px",
                fontFamily: "poppins",
                fontWeight: "500",
              }}
            >
              Payment Management
            </Typography>
            <Box className=" dashboardTrack2">
              <Box className="parent-dashboardTrack2">
                <Box>
                  <Tabs
                    selectedIndex={desire3}
                    onSelect={(index) => setDesire3(index)}
                  >
                    <TabList
                      style={{
                        paddingLeft: "0px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      <Box style={{ display: "flex", gap: "15px" }}>
                        <Tab>All {searchCount?.TotalAgent}</Tab>
                        <Tab>Pending {searchCount?.AgentPending}</Tab>
                        <Tab>Approved {searchCount?.AgentActive} </Tab>
                        <Tab>Reject {searchCount?.AgentRejected}</Tab>
                        <Tab>Credit {searchCount?.AgentCredit}</Tab>
                        <Tab>Deactivate Agent {searchCount?.DeactiveAgent}</Tab>
                        <Tab>Agent Failed {searchCount?.TotalAgentFailed}</Tab>
                      </Box>
                    </TabList>

                    <TabPanel>
                      <TabContext>
                        <AgentAll />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <AgentPending />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <AgentApprove />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <AgentReject />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <AgentCredit />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <AgentIactive />
                      </TabContext>
                    </TabPanel>
                    <TabPanel>
                      <TabContext>
                        <AgentFailed />
                      </TabContext>
                    </TabPanel>
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardTrack;
