import { Box, Container } from "@mui/material";
import TabContext from "@material-ui/lab/TabContext";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const AddDepositRoute = () => {
  const [desire, setDesire] = useState(0);
  return (
    <Box>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Box className=" DestinaTionWise1">
          <Box className="parent-DestinaTionWise1">
            <Box>
              <Tabs
                selectedIndex={desire}
                onSelect={(index) => setDesire(index)}
              >
                <TabList
                  style={{
                    paddingLeft: "0px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "15px",
                    marginBottom: "5px",
                  }}
                >
                  <Box>
                    <span style={{ color: "#70a5d8", fontSize: "17px" }}>
                      Destination Wise
                    </span>
                  </Box>
                  <Box>
                    <Tab>One Way</Tab>
                    <Tab>Round Way</Tab>
                  </Box>
                </TabList>

                <TabPanel>
                  <TabContext>
                    <Box className="DestinaTionWise1" marginTop={"20px"}>
                      <table>
                        <tr>
                          <th>From</th>
                          <th>To</th>
                          <th>Count</th>
                        </tr>
                      </table>

                      <Box
                        sx={{
                          width: "100%",
                          my: 3,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      ></Box>
                    </Box>
                  </TabContext>
                </TabPanel>
                <TabPanel>
                  <TabContext>
                    {" "}
                    <TabContext>
                      <Box className="DestinaTionWise1" marginTop={"20px"}>
                        <table>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Count</th>
                          </tr>
                        </table>

                        <Box
                          sx={{
                            width: "100%",
                            my: 3,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        ></Box>
                      </Box>
                    </TabContext>
                  </TabContext>
                </TabPanel>
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddDepositRoute;
