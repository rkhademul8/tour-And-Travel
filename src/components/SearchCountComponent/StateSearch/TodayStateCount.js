import TabContext from "@material-ui/lab/TabContext";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import "./TotalStateCount.css";

const TodayStateCount = () => {
  const [desire, setDesire] = useState(0);
  const [desire1, setDesire1] = useState(0);
  const [desire2, setDesire2] = useState(0);

  const [todayCount, setTodayCount] = useState([]);
  useEffect(() => {
    fetch(`https://api.flyfarint.com/v.1.0.0/Admin/Stats/SearchHistory.php?all`)
      .then((res) => res.json())
      .then((data) => setTodayCount(data?.today));
  }, []);

  // destination wise oneway data filter
  let OneWayData = todayCount?.destinationwise?.filter((oneWay) => {
    return oneWay?.searchtype === "oneway";
  });

  // destination wise roundway data filter
  const roundWayData = todayCount?.destinationwise?.filter((roundWay) => {
    return roundWay?.searchtype === "return";
  });

  // agent  wise oneway data filter
  const agentOneWayData = todayCount?.agentwise?.filter((oneWay) => {
    return oneWay?.searchtype === "oneway";
  });

  // agent  wise roundway data filter
  const agentRoundData = todayCount?.agentwise?.filter((roundWay) => {
    return roundWay?.searchtype === "return";
  });
  //console.log(todayCount);

  return (
    <Box>
      {/* <Grid
        container
        spacing={8}
        style={{ marginTop: "1px", paddingTop: "0px" }}
      >
        <Grid item xs={6} md={4} style={{ paddingTop: "25px" }}>
          <Box
            style={{
              backgroundColor: "#EF8646",
              height: "100px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography style={{ color: "#fff", fontSize: "20px" }}>
                Today Search Count
              </Typography>
              <Typography
                style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
              >
                {todayCount?.allsearch}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} style={{ paddingTop: "25px" }}>
          <Box
            style={{
              backgroundColor: "#76C3A7",
              height: "100px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography style={{ color: "#fff", fontSize: "20px" }}>
                Today One way Search Count
              </Typography>
              <Typography
                style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
              >
                {todayCount?.oneway}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} style={{ paddingTop: "25px" }}>
          <Box
            style={{
              backgroundColor: "#9747FF",
              height: "100px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography style={{ color: "#fff", fontSize: "20px" }}>
                Today Round way Search Count
              </Typography>
              <Typography
                style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
              >
                {todayCount?.return}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid> */}

      <Grid
        container
        spacing={8}
        style={{ marginTop: "1px", paddingTop: "0px" }}
      >
        {/* --------------------- destination  section   ------------------------- */}
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
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "15px",
                      marginBottom: "5px",
                    }}
                  >
                    <Box>
                      <span
                        style={{
                          color: "#2564B8",
                          fontSize: "17px",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Destination Wise
                      </span>
                    </Box>
                    <Box style={{ display: "flex", gap: "7px" }}>
                      <Tab>One Way</Tab>
                      <Tab>Round Way</Tab>
                      <Tab>Multi City</Tab>
                    </Box>
                  </TabList>

                  <TabPanel>
                    <TabContext>
                      <Box className="DestinaTionWise" marginTop={"20px"}>
                        <table>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Count</th>
                          </tr>
                          {OneWayData?.map((data) => (
                            <tr>
                              <td>{data?.DepFrom}</td>
                              <td>{data?.ArrTo}</td>
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
                        <Box className="DestinaTionWise" marginTop={"20px"}>
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
                  <TabPanel>
                    <TabContext>
                      {" "}
                      <TabContext>
                        <Box className="DestinaTionWise" marginTop={"20px"}>
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
        </Grid>
        {/* --------------------- destination  section  end ------------------------- */}

        {/* --------------------- Agent  section   ------------------------- */}
        <Grid item xs={6} md={4} style={{ paddingTop: "1px" }}>
          <Box className=" destinationWise">
            <Box className="parent-destinationWise">
              <Box>
                <Tabs
                  selectedIndex={desire1}
                  onSelect={(index) => setDesire1(index)}
                >
                  <TabList
                    style={{
                      paddingLeft: "0px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "15px",
                      marginBottom: "1px",
                    }}
                  >
                    <Box>
                      <span
                        style={{
                          color: "#2564B8",
                          fontSize: "17px",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Agent Wise
                      </span>
                    </Box>

                    <Box style={{ display: "flex", gap: "7px" }}>
                      <Tab>One Way</Tab>
                      <Tab>Round Way</Tab>
                      <Tab>Multi City</Tab>
                    </Box>
                  </TabList>

                  <TabPanel>
                    <TabContext>
                      <Box className="DestinaTionWise" marginTop={"20px"}>
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
                        <Box className="DestinaTionWise" marginTop={"20px"}>
                          <table>
                            <tr>
                              <th>Company Name</th>
                              <th>Count</th>
                            </tr>
                            {agentRoundData?.map((data) => (
                              <tr>
                                <td>{//console.log(data)}</td>
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
                    </TabContext>
                  </TabPanel>
                  <TabPanel>
                    <TabContext>
                      {" "}
                      <TabContext>
                        <Box className="DestinaTionWise" marginTop={"20px"}>
                          <table>
                            <tr>
                              <th>Company Name</th>
                              <th>Count</th>
                            </tr>
                            {agentRoundData?.map((data) => (
                              <tr>
                                <td>{//console.log(data)}</td>
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
                    </TabContext>
                  </TabPanel>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* --------------------- Agent  section end  ------------------------- */}

        {/* --------------------------staff section---------------------- */}

        <Grid item xs={6} md={4} style={{ paddingTop: "1px" }}>
          <Box className=" staffWise1">
            <Box className="parent-staffWise1">
              <Box>
                <Tabs
                  selectedIndex={desire2}
                  onSelect={(index) => setDesire2(index)}
                >
                  <TabList
                    style={{
                      paddingLeft: "0px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "15px",
                      marginBottom: "1px",
                    }}
                  >
                    <Box mb={0.5}>
                      {" "}
                      <span
                        style={{
                          color: "#2564B8",
                          fontSize: "17px",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Inactive Agent
                      </span>
                    </Box>
                    <Box>
                      {/* <Tab>One Way</Tab>
                      <Tab>Round Way</Tab> */}
                    </Box>
                  </TabList>

                  <TabPanel>
                    <TabContext>
                      <Box className="staffWise1" marginTop={"20px"}>
                        <table>
                          <tr>
                            <th>Company Name</th>
                            <th>Phone number</th>
                          </tr>

                          {todayCount?.inactiveagentwise?.map((data) => (
                            <tr>
                              <td>{data?.company}</td>
                              <td>
                                <a href={`tel:+${data?.companyphone}`}>
                                  <PhoneIcon
                                    style={{
                                      color: "#003566",
                                      fontSize: "18px",
                                    }}
                                  />
                                </a>
                                <a
                                  href={`https://wa.me/+${data?.companyphone}`}
                                  target="_blank"
                                >
                                  <WhatsAppIcon
                                    style={{ color: "green", fontSize: "18px" }}
                                  />
                                </a>

                                <a style={{ cursor: "pointer" }}>
                                  <EventNoteIcon
                                    // onClick={() => handleOpen(data?.bookingId)}
                                    style={{
                                      color: "#003566",
                                      fontSize: "18px",
                                    }}
                                  />
                                </a>
                              </td>
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
                  {/* <TabPanel>
                    <TabContext>
                      <Box className="staffWise1" marginTop={"20px"}>
                        <table>
                          <tr>
                            <th>Company Name</th>
                            <th>Staff Name</th>
                            <th>Count</th>
                          </tr>
                          {staffRoundData?.map((data) => (
                            <tr>
                              <td>{data?.company}</td>
                              <td>{data?.searchBy}</td>
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
                  </TabPanel> */}
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* --------------------------staff section end---------------------- */}
      </Grid>
    </Box>
  );
};

export default TodayStateCount;
