import TabContext from "@material-ui/lab/TabContext";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SearchCountParent from "../SearchCountParent/SearchCountParent";
import "./TotalStateCount.css";

const TotalStateCount = () => {
  const [desire, setDesire] = useState(0);
  const [desire1, setDesire1] = useState(0);
  const [desire2, setDesire2] = useState(0);
  const [totalSate, setTotalSate] = useState([]);

  useEffect(() => {
    fetch(`https://api.flyfarint.com/v.1.0.0/Admin/Stats/SearchHistory.php?all`)
      .then((res) => res.json())
      .then((data) => setTotalSate(data.total));
  }, []);

  // destination wise oneway data filter
  let oneWayData = totalSate?.destinationwise?.filter((oneWay) => {
    return oneWay?.searchtype === "oneway";
  });

  // destination wise roundway data filter
  const roundWayData = totalSate?.destinationwise?.filter((roundWay) => {
    return roundWay?.searchtype === "return";
  });

  // agent  wise oneway data filter
  const agentOneWayData = totalSate?.agentwise?.filter((oneWay) => {
    return oneWay?.searchtype === "oneway";
  });

  // agent  wise roundway data filter
  const agentRoundData = totalSate?.agentwise?.filter((roundWay) => {
    return roundWay?.searchtype === "return";
  });

  return (
    <Box>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "1px", paddingTop: "0px" }}
      >
        {/*----------- destination wise  section--------------*/}
        <Grid item xs={6} md={4} style={{ paddingTop: "1px" }}>
          <Box className=" destinationWise">
            <Box className="parent-destinationWise">
              <Box>
                <Tabs
                  selectedIndex={desire}
                  onSelect={(index) => setDesire(index)}
                >
                  <TabList
                    style={{
                      paddingLeft: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "20px",
                      gap: "5px",
                    }}
                  >
                    <Box>
                      <span
                        style={{
                          color: "var(--secondary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Destination Wise
                      </span>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      <Tab>One Way</Tab>
                      <Tab>Round Way</Tab>
                      <Tab>Multi City</Tab>
                    </Box>
                  </TabList>

                  <TabPanel>
                    <TabContext>
                      <Box className="DestinaTionWise" marginTop={"10px"}>
                        <table>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Count</th>
                          </tr>

                          {oneWayData?.map((data) => (
                            <tr>
                              <td>{data?.DepFrom}</td>
                              <td>{data?.ArrTo}</td>
                              <td>{data?.Search}</td>
                            </tr>
                          ))}
                        </table>
                      </Box>
                    </TabContext>
                  </TabPanel>
                  <TabPanel>
                    <TabContext>
                      <TabContext>
                        <Box className="DestinaTionWise" marginTop={"10px"}>
                          <table>
                            <tr>
                              <th>From</th>
                              <th>To</th>
                              <th>Count</th>
                            </tr>
                            {roundWayData?.map((data) => (
                              <tr>
                                <td>{data?.DepFrom}</td>
                                <td>{data?.ArrTo}</td>
                                <td>{data?.Search}</td>
                              </tr>
                            ))}
                          </table>
                        </Box>
                      </TabContext>
                    </TabContext>
                  </TabPanel>
                  <TabPanel>
                    <TabContext>
                      <Box className="DestinaTionWise" marginTop={"10px"}>
                        <table>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Count</th>
                          </tr>

                          {oneWayData?.map((data) => (
                            <tr>
                              <td>{data?.DepFrom}</td>
                              <td>{data?.ArrTo}</td>
                              <td>{data?.Search}</td>
                            </tr>
                          ))}
                        </table>
                      </Box>
                    </TabContext>
                  </TabPanel>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/*----------- destination wise  section end--------------*/}

        {/*----------- agent wise  section--------------*/}
        <Grid item xs={6} md={4} style={{ paddingTop: "1px" }}>
          <Box className=" agentWise1">
            <Box className="parent-agentWise1">
              <Box>
                <Tabs
                  selectedIndex={desire1}
                  onSelect={(index) => setDesire1(index)}
                >
                  <TabList
                    style={{
                      paddingLeft: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "20px",
                      gap: "5px",
                    }}
                  >
                    <Box>
                      <span
                        style={{
                          color: "var(--secondary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Agent Wise
                      </span>
                    </Box>

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      <Tab>One Way</Tab>
                      <Tab>Round Way</Tab>
                      <Tab>Multi City</Tab>
                    </Box>
                  </TabList>

                  <TabPanel>
                    <TabContext>
                      <Box className="agentWise1" marginTop={"10px"}>
                        <table>
                          <tr>
                            <th>Company Name</th>
                            <th>Count</th>
                          </tr>

                          {agentOneWayData?.map((data) => (
                            <tr>
                              <td>{data?.company}</td>
                              <td>{data?.Search}</td>
                            </tr>
                          ))}
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
                        <Box className="agentWise1" marginTop={"20px"}>
                          <table>
                            <tr>
                              <th>Company Name</th>
                              <th>Count</th>
                            </tr>

                            {agentRoundData?.map((data) => (
                              <tr>
                                <td>{data?.company}</td>
                                <td>{data?.Search}</td>
                              </tr>
                            ))}
                          </table>
                        </Box>
                      </TabContext>
                    </TabContext>
                  </TabPanel>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/*----------- agent wise  section end--------------*/}

        {/*----------- inactive  section--------------*/}
        <Grid item xs={6} md={4} style={{ paddingTop: "1px" }}>
          <Box className=" agentWise1">
            <Box className="parent-agentWise1">
              <Box>
                <Tabs
                  selectedIndex={desire2}
                  onSelect={(index) => setDesire2(index)}
                >
                  <TabList
                    style={{
                      paddingLeft: "0px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "20px",
                      gap: "5px",
                    }}
                  >
                    <Box>
                      <span
                        style={{
                          color: "var(--secondary-color)",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Inactive Agent Wise
                      </span>
                    </Box>

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "5px",
                        width: "100%",
                      }}
                    >
                      <Tab>One Way</Tab>
                      <Tab>Round Way</Tab>
                      <Tab>Multi City</Tab>
                    </Box>
                  </TabList>

                  <TabPanel>
                    <TabContext>
                      <Box className="agentWise1" marginTop={"10px"}>
                        <table>
                          <tr>
                            <th>Company Name</th>
                            <th>Number</th>
                          </tr>

                          {totalSate.inactiveagentwise?.map((data) => (
                            <tr>
                              <td>{data?.company}</td>
                              <td>+{data?.phone}</td>
                            </tr>
                          ))}
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
                        <Box className="agentWise1" marginTop={"10px"}>
                          <table>
                            <tr>
                              <th>Company Name</th>
                              <th>Count</th>
                            </tr>

                            {agentRoundData?.map((data) => (
                              <tr>
                                <td>{data?.company}</td>
                                <td>{data?.Search}</td>
                              </tr>
                            ))}
                          </table>
                        </Box>
                      </TabContext>
                    </TabContext>
                  </TabPanel>
                  <TabPanel>
                    <TabContext>
                      {" "}
                      <TabContext>
                        <Box className="agentWise1" marginTop={"10px"}>
                          <table>
                            <tr>
                              <th>Company Name</th>
                              <th>Count</th>
                            </tr>

                            {agentRoundData?.map((data) => (
                              <tr>
                                <td>{data?.company}</td>
                                <td>{data?.Search}</td>
                              </tr>
                            ))}
                          </table>
                        </Box>
                      </TabContext>
                    </TabContext>
                  </TabPanel>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/*----------- staff wise  section end--------------*/}
      </Grid>
    </Box>
  );
};

export default TotalStateCount;
