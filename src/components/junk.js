/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";

const junk = () => {
  return (
    <div>
      {/* <Grid sm={2} md={2.7} padding="15px">
          <Grid
            container
            sx={{
              alignItems: "center",
              height: "fit-content",
            }}
          >
            <Grid md={12} lg={12} xl={4}>
              <Box>
                {flightData?.system === "Sabre" ? (
                  <Box style={{ width: "60px", height: "60px" }}>
                    {flightData.segment === "3" ? (
                      <>
                        {flightData.career ===
                          flightData.segments[0]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[1]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[2]?.marketingcareer ? (
                          <>
                            <img
                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                              className={`${flightData?.system?.toLowerCase()}`}
                              alt={`${flightData.career}`}
                            />
                          </>
                        ) : flightData.segments[0]?.marketingcareer !==
                            flightData.segments[1]?.marketingcareer &&
                          flightData.segments[1]?.marketingcareer ===
                            flightData.segments[2]?.marketingcareer ? (
                          <>
                            <Box
                              border={"2px solid red"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : flightData.segments[0]?.marketingcareer ===
                            flightData.segments[1]?.marketingcareer &&
                          flightData.segments[1]?.marketingcareer !==
                            flightData.segments[2]?.marketingcareer ? (
                          <>
                            <Box
                              border={"2px solid red"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[2]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[2]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box className="mercedes-sape-s">
                              <Box className="first-1"></Box>
                              <Box className="img-first-1">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box className="first-2"></Box>
                              <Box className="img-first-2">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                              <Box className="first-3"></Box>
                              <Box className="img-first-3">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[2]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[2]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    ) : flightData.segment === "2" ? (
                      <>
                        {flightData.career ===
                          flightData.segments[0]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[1]?.marketingcareer ? (
                          <>
                            <img
                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                              className={`${flightData?.system?.toLowerCase()}`}
                              alt={`${flightData.career}`}
                            />
                          </>
                        ) : (
                          <>
                            <Box
                              border={"2px solid red"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    ) : (
                      <img
                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                        className={`${flightData?.system?.toLowerCase()}`}
                        alt={`${flightData.career}`}
                      />
                    )}
                  </Box>
                ) : 
                flightData.system === "Galileo" ? (
                  <Box style={{ width: "60px", height: "60px" }}>
                    {flightData.segment === "3" ? (
                      <>
                        {flightData.career ===
                          flightData.segments[0]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[1]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[2]?.marketingcareer ? (
                          <>
                            <img
                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                              className={`${flightData?.system?.toLowerCase()}`}
                              alt={`${flightData.career}`}
                            />
                          </>
                        ) : flightData.segments[0]?.marketingcareer !==
                            flightData.segments[1]?.marketingcareer &&
                          flightData.segments[1]?.marketingcareer ===
                            flightData.segments[2]?.marketingcareer ? (
                          <>
                            <Box
                              border={"2px solid #0b8634"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : flightData.segments[0]?.marketingcareer ===
                            flightData.segments[1]?.marketingcareer &&
                          flightData.segments[1]?.marketingcareer !==
                            flightData.segments[2]?.marketingcareer ? (
                          <>
                            <Box
                              border={"2px solid #0b8634"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[2]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[2]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box className="mercedes-sape-g">
                              <Box className="first-1"></Box>
                              <Box className="img-first-1">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box className="first-2"></Box>
                              <Box className="img-first-2">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                              <Box className="first-3"></Box>
                              <Box className="img-first-3">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[2]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[2]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    ) : flightData.segment === "2" ? (
                      <>
                        {flightData.career ===
                          flightData.segments[0]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[1]?.marketingcareer ? (
                          <>
                            <img
                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                              className="flight-icon-sab2"
                              alt={`${flightData.career}`}
                            />
                          </>
                        ) : (
                          <>
                            <Box
                              border={"2px solid #0b8634"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    ) : (
                      <img
                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                        className="flight-icon-sab2"
                        alt={`${flightData.career}`}
                      />
                    )}
                  </Box>
                ) : (
              
                  <Box style={{ width: "60px", height: "60px" }}>
                    {flightData.segment === "3" ? (
                      <>
                        {flightData.career ===
                          flightData.segments[0]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[1]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[2]?.marketingcareer ? (
                          <>
                            <img
                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                              className={`${flightData?.system?.toLowerCase()}`}
                              alt={`${flightData.career}`}
                            />
                          </>
                        ) : flightData.segments[0]?.marketingcareer !==
                            flightData.segments[1]?.marketingcareer &&
                          flightData.segments[1]?.marketingcareer ===
                            flightData.segments[2]?.marketingcareer ? (
                          <>
                            <Box
                              border={"2px solid #4169e1"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : flightData.segments[0]?.marketingcareer ===
                            flightData.segments[1]?.marketingcareer &&
                          flightData.segments[1]?.marketingcareer !==
                            flightData.segments[2]?.marketingcareer ? (
                          <>
                            <Box
                              border={"2px solid #4169e1"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[2]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[2]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box className="mercedes-sape-f">
                              <Box className="first-1"></Box>
                              <Box className="img-first-1">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box className="first-2"></Box>
                              <Box className="img-first-2">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                              <Box className="first-3"></Box>
                              <Box className="img-first-3">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[2]?.marketingcareer}.png`}
                                  width="25px"
                                  height="25px"
                                  alt={`${flightData.segments[2]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    ) : flightData.segment === "2" ? (
                      <>
                        {flightData.career ===
                          flightData.segments[0]?.marketingcareer &&
                        flightData.career ===
                          flightData.segments[1]?.marketingcareer ? (
                          <>
                            <img
                              src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                              className={`${flightData?.system?.toLowerCase()}`}
                              alt={`${flightData.career}`}
                            />
                          </>
                        ) : (
                          <>
                            <Box
                              border={"2px solid #4169e1"}
                              borderRadius="50%"
                              width="71px"
                              height="71px"
                              display="flex"
                              flexDirection="column"
                              overflow="hidden"
                              justifyContent="center"
                              alignItems="center"
                              pt="8px"
                              className="round-rotation"
                            >
                              <Box mb="-7px">
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[0]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[0]?.marketingcareer}`}
                                />
                              </Box>
                              <Box
                                borderBottom={"2px solid #D9D9D9"}
                                width="100%"
                              ></Box>
                              <Box>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.segments[1]?.marketingcareer}.png`}
                                  width="30px"
                                  height="30px"
                                  alt={`${flightData.segments[1]?.marketingcareer}`}
                                />
                              </Box>
                            </Box>
                          </>
                        )}
                      </>
                    ) : (
                      <img
                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData.career}.png`}
                        className={`${flightData?.system?.toLowerCase()}`}
                        alt={`${flightData.career}`}
                      />
                    )}
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid md={12} lg={12} xl={8}>
              <Box pl={1}>
                <Typography
                  sx={{
                    color: "#DC143C",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "14px",
                      lg: "15px",
                    },
                  }}
                >
                  {flightData?.segments[0]?.marketingcareerName}
                </Typography>
                <Typography
                  sx={{
                    color: "#003566",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "10px",
                      md: "12px",
                      lg: "12px",
                    },
                  }}
                >
                  {flightData?.segment === "3" ? (
                    <>
                      {flightData?.segments[0]?.marketingcareer}
                      {flightData?.segments[0]?.marketingflight.length === 5 ? (
                        <>
                          {flightData?.segments[0]?.marketingflight?.slice(
                            2,
                            5
                          )}
                        </>
                      ) : (
                        <>{flightData?.segments[0]?.marketingflight}</>
                      )}
                      <span style={{ color: "crimson", fontSize: "15px" }}>
                        {" | "}
                      </span>
                      {flightData?.segments[1]?.marketingcareer}
                      {flightData?.segments[1]?.marketingflight.length === 5 ? (
                        <>
                          {flightData?.segments[1]?.marketingflight?.slice(
                            2,
                            5
                          )}
                        </>
                      ) : (
                        <>{flightData?.segments[1]?.marketingflight}</>
                      )}
                      <span style={{ color: "crimson", fontSize: "15px" }}>
                        {" | "}
                      </span>
                      <br />
                      {flightData?.segments[2]?.marketingcareer}
                      {flightData?.segments[2]?.marketingflight.length === 5 ? (
                        <>
                          {flightData?.segments[2]?.marketingflight?.slice(
                            2,
                            5
                          )}
                        </>
                      ) : (
                        <>{flightData?.segments[2]?.marketingflight}</>
                      )}
                    </>
                  ) : flightData?.segment === "2" ? (
                    <>
                      {flightData?.segments[0]?.marketingcareer}
                      {flightData?.segments[0]?.marketingflight.length === 5 ? (
                        <>
                          {flightData?.segments[0]?.marketingflight?.slice(
                            2,
                            5
                          )}
                        </>
                      ) : (
                        <>{flightData?.segments[0]?.marketingflight}</>
                      )}
                      <span style={{ color: "crimson", fontSize: "15px" }}>
                        {" | "}
                      </span>
                      {flightData?.segments[1]?.marketingcareer}
                      {flightData?.segments[1]?.marketingflight.length === 5 ? (
                        <>
                          {flightData?.segments[1]?.marketingflight?.slice(
                            2,
                            5
                          )}
                        </>
                      ) : (
                        <>{flightData?.segments[1]?.marketingflight}</>
                      )}
                    </>
                  ) : (
                    <>
                      {flightData?.segments[0]?.marketingcareer}
                      {flightData?.segments[0]?.marketingflight.length === 5 ? (
                        <>
                          {flightData?.segments[0]?.marketingflight?.slice(
                            2,
                            5
                          )}
                        </>
                      ) : (
                        <>{flightData?.segments[0]?.marketingflight}</>
                      )}
                    </>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box mt={0.5}>
            {flightData?.segment === "3" ? (
              <Box>
                <Grid container justifyContent="left">
                  <Typography
                    sx={{
                      color: "#003566",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {flightData?.flightduration}&nbsp;|&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      color: "#DC143C",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    Two Stops
                  </Typography>
                </Grid>
              </Box>
            ) : flightData?.segment === "2" ? (
              <Box>
                <Grid container justifyContent="left">
                  <Typography
                    sx={{
                      color: "#003566",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {flightData?.flightduration}&nbsp;|&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      color: "#DC143C",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    One Stops
                  </Typography>
                </Grid>
              </Box>
            ) : (
              <Box>
                <Grid container justifyContent="left">
                  <Typography
                    sx={{
                      color: "#003566",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {flightData?.flightduration}&nbsp;|&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      color: "#DC143C",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    Non Stops
                  </Typography>
                </Grid>
              </Box>
            )}
          </Box>
        </Grid> */}
      //todo:------------
      {/* <Grid container justifyContent={"space-between"} pt={3}>
            <Grid md={3}>
              {flightData.system === "Sabre" ? (
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    fontSize: {
                      xs: "14px",
                      sm: "14px",
                      md: "14px",
                      lg: "16px",
                    },
                  }}
                >
                  {flightData?.class}
                </Typography>
              ) : flightData.system === "Galileo" ? (
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                  }}
                >
                  {flightData?.class}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                  }}
                >
                  Economy
                </Typography>
              )}
            </Grid>
            <Grid md={4}>
              {(() => {
                if (flightData?.refundable === "Refundable") {
                  return (
                    <Typography
                      sx={{
                        color: "green",
                        fontWeight: 500,
                        fontSize: {
                          xs: "14px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      {flightData?.refundable}
                    </Typography>
                  );
                } else if (flightData?.refundable === "Nonrefundable") {
                  return (
                    <Typography
                      sx={{
                        color: "#DC143C",
                        fontWeight: 500,
                        fontSize: {
                          xs: "12px",
                          sm: "12px",
                          md: "14px",
                          lg: "16px",
                        },
                      }}
                    >
                      Non Refundable
                    </Typography>
                  );
                }
              })()}
            </Grid>
            <Grid md={2.5}>
              <Box className="img-text-bag-0">
                <img src={bag} alt="seat" /> &nbsp;{" "}
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                  }}
                >
                  {flightData?.bags === "3" ||
                  flightData?.bags === "2" ||
                  flightData?.bags === "1" ? (
                    <>{flightData?.bags?.split(" ")[0]} Piece</>
                  ) : flightData?.bags === " " ? (
                    <>0 Kg</>
                  ) : (
                    <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid md={2.5}>
              <Box className="img-text-0">
                <img src={seat} alt="bag" />
                &nbsp;
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                    fontSize: {
                      xs: "12px",
                      sm: "12px",
                      md: "14px",
                      lg: "16px",
                    },
                  }}
                >
                  {flightData?.seat || 9} Seat
                </Typography>
              </Box>
            </Grid>
          </Grid> */}
      //todo:------------
      {/* <Typography>

                  {flightData?.segment === "3" ? (
                    <Box>
                      <Grid container justifyContent="center">
                        <Typography
                          sx={{
                            color: "#003566",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                            },
                          }}
                        >
                          {flightData?.segments[0].flightduration} |{" "}
                          {flightData?.segments[1].flightduration} |{" "}
                          {flightData?.segments[2].flightduration}
                        </Typography>
                      </Grid>
                      <Box px={1}>
                        <div className="segment03">
                          <div className="segment-circle">
                            <div className="circle-0">
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      {flightData?.departure}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </HtmlTooltip>
                            </div>
                            <div className="segment-stop"></div>
                            <div className="segment-stop"></div>
                            <div className="circle-0">
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      {flightData?.arrival}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </HtmlTooltip>
                            </div>
                          </div>
                          <div className="segment-flight03">
                            <FlightIcon />
                          </div>
                        </div>
                      </Box>
                      <Typography className="arival-seg-3">
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography
                                sx={{ color: "#fff", fontSize: "10px" }}
                              >
                                <span style={{ fontSize: "12px" }}>
                                  {
                                    flightData?.segments[0]?.arrivalLocation?.split(
                                      ","
                                    )[0]
                                  }
                                </span>
                                <br />
                                {flightData?.segments[1]?.marketingcareer}
                                &nbsp;
                                {flightData?.segments[1]?.marketingflight}{" "}
                                <span> | </span>
                                {flightData?.transit.transit1}
                              </Typography>
                            </React.Fragment>
                          }
                          followCursor
                        >
                          <Box className="arival-text">
                            {flightData?.segments[0]?.arrival}
                          </Box>
                        </HtmlTooltip>
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography
                                sx={{ color: "#fff", fontSize: "10px" }}
                              >
                                <span style={{ fontSize: "12px" }}>
                                  {
                                    flightData?.segments[1]?.arrivalLocation?.split(
                                      ","
                                    )[0]
                                  }
                                </span>
                                <br />
                                {flightData?.segments[2]?.marketingcareer}
                                &nbsp;
                                {flightData?.segments[2]?.marketingflight}
                                <span> | </span>
                                {flightData?.transit.transit2}
                              </Typography>
                            </React.Fragment>
                          }
                          followCursor
                        >
                          <Box className="arival-text">
                            {" "}
                            {flightData?.segments[1]?.arrival}
                          </Box>
                        </HtmlTooltip>
                      </Typography>
                    </Box>
                  ) : flightData?.segment === "2" ? (
                    <Box>
                      <Grid container justifyContent="center">
                        {" "}
                        <Typography
                          sx={{
                            color: "#003566",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                            },
                          }}
                        >
                          {flightData?.segments[0].flightduration} |{" "}
                          {flightData?.segments[1].flightduration}
                        </Typography>
                      </Grid>
                      <Box px={1}>
                        <div className="segment02">
                          <div className="segment-circle">
                            <div className="circle-0">
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      {flightData?.departure}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </HtmlTooltip>
                            </div>
                            <div className="segment-stop"></div>
                            <div className="circle-0">
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      {flightData?.arrival}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </HtmlTooltip>
                            </div>
                          </div>
                          <div className="segment-flight02">
                            <FlightIcon />
                          </div>
                        </div>
                      </Box>
                      <Typography className="arival-seg2">
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography
                                sx={{ color: "#fff", fontSize: "10px" }}
                              >
                                <span style={{ fontSize: "12px" }}>
                                  {
                                    flightData?.segments[0]?.arrivalLocation?.split(
                                      ","
                                    )[0]
                                  }{" "}
                                </span>
                                <br />
                                {flightData?.segments[1]?.marketingcareer}
                                &nbsp;
                                {flightData?.segments[1]?.marketingflight}
                                <span> | </span>
                                {flightData?.transit.transit1}
                              </Typography>
                            </React.Fragment>
                          }
                          followCursor
                        >
                          <Box className="arival-text2">
                            {flightData?.segments[0]?.arrival}
                          </Box>
                        </HtmlTooltip>
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Grid container justifyContent="center">
                        {" "}
                        <Typography
                          sx={{
                            color: "#003566",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                            },
                          }}
                        >
                          {flightData?.segments[0].flightduration}
                        </Typography>
                        
                      </Grid>
                      <Box px={1}>
                        <div className="segment-1">
                          <div className="segment-circle">
                            <div className="circle-0">
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      {flightData?.departure}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </HtmlTooltip>
                            </div>
                            <div className="circle-0">
                              <HtmlTooltip
                                title={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ color: "#fff", fontSize: "10px" }}
                                    >
                                      {flightData?.arrival}
                                    </Typography>
                                  </React.Fragment>
                                }
                                followCursor
                              >
                                <span>
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </span>
                              </HtmlTooltip>
                            </div>
                          </div>
                          <div className="segment-flight1">
                            <FlightIcon />
                          </div>
                        </div>
                      </Box>
                    </Box>
                  )}
          </Typography> */}
      //todo:-------
      {/* <Typography
                            sx={{
                              color: "#DC143C",
                              fontWeight: 500,
                              fontSize: {
                                xs: "12px",
                                sm: "10px",
                                md: "12px",
                              },
                            }}
                          >
                            Non Stops
                          </Typography> */}
      //todo:-------
      {/* <Container>
            <Box style={{ width: "100%", marginTop: "10px" }}>
              <TabContext value={value} sx={{ bgcolor: "red" }}>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Flight Details" value="1" />
                  <Tab label="Fare Summery" value="2" />
                  <Tab label="Commission & Invoice" value="3" />
                  <Tab label="reIssue" value="4" />
                  <Tab label="Refund" value="5" />
                  <Tab label="Baggage" value="7" />
                </Tabs>

                <TabPanel className="tabs-details" value="1">
                  {flightData?.segment === "3" ? (
                    // 3  segment data show here
                    <Box className="segment-2">
                      <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        pb={2}
                        gap={2}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#003566",
                            fontWeight: 600,
                          }}
                        >
                          {
                            flightData?.segments[0]?.departureLocation?.split(
                              ","
                            )[0]
                          }
                        </Typography>
                        <img src={toimg} alt="to" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#003566",
                            fontWeight: 600,
                          }}
                        >
                          {
                            flightData?.segments[2]?.arrivalLocation?.split(
                              ","
                            )[0]
                          }
                        </Typography>
                      </Box>
                      <Box className="single-flight-parent">
                        <Grid
                          className="single-flight-details"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          container
                          spacing={{ xs: 2, md: 3, lg: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                            item
                            xs={2}
                            sm={3}
                            md={4.5}
                            className="flight-content-gap"
                          >
                            <Box textAlign="center" paddingRight={2}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.segments[0].marketingcareer}.png`}
                                alt={`${flightData?.segments[0].marketingcareer}`}
                              />
                              <Typography
                                width="100px"
                                fontSize="12px"
                                fontWeight={500}
                                textAlign="center"
                                paddingRight={2}
                              >
                                {flightData?.segments[0]?.marketingcareerName}
                              </Typography>
                            </Box>

                            <Box className="flight-content-detail">
                              <h4>Departure From</h4>
                              <h5>
                                ({flightData?.segments[0]?.departure})-
                                {flightData?.segments[0]?.departureAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[0]?.departureLocation}
                              </h5>
                              <h5>
                                {format(
                                  new Date(
                                    flightData?.segments[0]?.departureTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>

                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Arrival To</h4>
                              <h5>
                                ({flightData?.segments[0]?.arrival})-
                                {flightData?.segments[0].arrivalAirport}
                              </h5>
                              <h5>{flightData?.segments[0].arrivalLocation}</h5>
                              <h5>
                                {" "}
                               
                                {format(
                                  new Date(
                                    flightData?.segments[0]?.arrivalTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Duration</h4>

                              <h5>{flightData?.segments[0].flightduration}</h5>
                              <h5>
                                <span style={{ color: "tomato" }}>
                                  {" "}
                                  {flightData?.segments[0].marketingcareer}{" "}
                                  {flightData?.segments[0].marketingflight}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                Class: {flightData?.segments[0]?.bookingcode}
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                <span>
                                  Seat: {flightData?.segments[0].seat || 9}
                                </span>
                              </h5>
                              <h5>
                                Baggage:{" "}
                                {flightData?.bags === "3" ||
                                flightData?.bags === "2" ||
                                flightData?.bags === "1" ? (
                                  <>{flightData?.bags?.split(" ")[0]} Piece</>
                                ) : flightData?.bags === " " ? (
                                  <>0 Kg</>
                                ) : (
                                  <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                )}
                              </h5>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box className="border-content">
                        <span>
                          Transit Time<>: </>
                          {flightData?.transit.transit1}{" "}
                        </span>
                      </Box>

                      <Box className="single-flight-parent">
                        <Grid
                          className="single-flight-details"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                            item
                            xs={2}
                            sm={3}
                            md={4.5}
                          >
                            <Box textAlign="center" paddingRight={2}>
                              {" "}
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.segments[1].marketingcareer}.png`}
                                alt={`${flightData?.segments[1].marketingcareer}`}
                              />
                              <Typography
                                width="100px"
                                fontSize="12px"
                                fontWeight={500}
                                textAlign="center"
                                paddingRight={2}
                              >
                                {flightData?.segments[1]?.marketingcareerName}
                              </Typography>
                            </Box>
                            <Box className="flight-content-detail">
                              <h4>Departure From</h4>
                              <h5>
                                ({flightData?.segments[1]?.departure})-
                                {flightData?.segments[1]?.departureAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[1]?.departureLocation}
                              </h5>
                              <h5>
                      
                                {format(
                                  new Date(
                                    flightData?.segments[1]?.departureTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Arrival To</h4>
                              <h5>
                                ({flightData?.segments[1]?.arrival})-
                                {flightData?.segments[1].arrivalAirport}
                              </h5>
                              <h5>{flightData?.segments[1].arrivalLocation}</h5>
                              <h5>
                                {" "}
                              
                                {format(
                                  new Date(
                                    flightData?.segments[1]?.arrivalTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Duration</h4>
                              <h5>{flightData?.segments[1].flightduration}</h5>
                              <h5>
                                <span style={{ color: "tomato" }}>
                                  {flightData?.segments[1].marketingcareer}{" "}
                                  {flightData?.segments[1].marketingflight}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                Class: {flightData?.segments[1]?.bookingcode}
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                <span>
                                  Seat: {flightData?.segments[1].seat || 9}
                                </span>
                              </h5>
                              <h5>
                                Baggage:{" "}
                                {flightData?.bags === "3" ||
                                flightData?.bags === "2" ||
                                flightData?.bags === "1" ? (
                                  <>{flightData?.bags?.split(" ")[0]} Piece</>
                                ) : flightData?.bags === " " ? (
                                  <>0 Kg</>
                                ) : (
                                  <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                )}
                              </h5>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box className="border-content">
                        <span>
                          Transit Time<>: </>
                          {flightData?.transit.transit2}{" "}
                        </span>
                      </Box>
                      <Box className="single-flight-parent">
                        <Grid
                          className="single-flight-details"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                            item
                            xs={2}
                            sm={3}
                            md={4.5}
                          >
                            <Box textAlign="center" paddingRight={2}>
                              {" "}
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.segments[2]?.marketingcareer}.png`}
                                alt={`${flightData?.segments[2]?.marketingcareer}`}
                              />
                              <Typography
                                width="100px"
                                fontSize="12px"
                                fontWeight={500}
                                textAlign="center"
                                paddingRight={2}
                              >
                                {flightData?.segments[2]?.marketingcareerName}
                              </Typography>
                            </Box>
                            <Box className="flight-content-detail">
                              <h4>Departure From</h4>
                              <h5>
                                ({flightData?.segments[2]?.departure})-
                                {flightData?.segments[2]?.departureAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[2]?.departureLocation}
                              </h5>
                              <h5>
                                {format(
                                  new Date(
                                    flightData?.segments[2]?.departureTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Arrival To</h4>
                              <h5>
                                ({flightData?.segments[2]?.arrival})-
                                {flightData?.segments[2]?.arrivalAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[2]?.arrivalLocation}
                              </h5>
                              <h5>
                                {" "}
                                {format(
                                  new Date(
                                    flightData?.segments[2]?.arrivalTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Duration</h4>
                              <h5>{flightData?.segments[2]?.flightduration}</h5>
                              <h5>
                                <span style={{ color: "tomato" }}>
                                  {flightData?.segments[2]?.marketingcareer}{" "}
                                  {flightData?.segments[2]?.marketingflight}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                Class: {flightData?.segments[2]?.bookingcode}
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                <span>
                                  Seat: {flightData?.segments[2].seat || 9}
                                </span>
                              </h5>
                              <h5>
                                Baggage:{" "}
                                {flightData?.bags === "3" ||
                                flightData?.bags === "2" ||
                                flightData?.bags === "1" ? (
                                  <>{flightData?.bags?.split(" ")[0]} Piece</>
                                ) : flightData?.bags === " " ? (
                                  <>0 Kg</>
                                ) : (
                                  <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                )}
                              </h5>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  ) : flightData?.segment === "2" ? (
                    <Box className="segment-2">
                      <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        pb={2}
                        gap={2}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#003566",
                            fontWeight: 600,
                          }}
                        >
                          {
                            flightData?.segments[0]?.departureLocation?.split(
                              ","
                            )[0]
                          }
                        </Typography>
                        <img src={toimg} alt="to" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#003566",
                            fontWeight: 600,
                          }}
                        >
                          {
                            flightData?.segments[1]?.arrivalLocation?.split(
                              ","
                            )[0]
                          }
                        </Typography>
                      </Box>
                      <Box className="single-flight-parent">
                        <Grid
                          className="single-flight-details"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                            item
                            xs={2}
                            sm={3}
                            md={4.5}
                          >
                            <Box textAlign="center" paddingRight={2}>
                              {" "}
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.segments[0].marketingcareer}.png`}
                                alt={`${flightData?.segments[0].marketingcareer}`}
                              />
                              <Typography
                                width="100px"
                                fontSize="12px"
                                fontWeight={500}
                                textAlign="center"
                                paddingRight={2}
                              >
                                {flightData?.segments[0]?.marketingcareerName}
                              </Typography>
                            </Box>
                            <Box className="flight-content-detail">
                              <h4>Departure From</h4>
                              <h5>
                                ({flightData?.segments[0]?.departure})-
                                {flightData?.segments[0]?.departureAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[0]?.departureLocation}
                              </h5>
                              <h5>
                                
                                {format(
                                  new Date(
                                    flightData?.segments[0]?.departureTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Arrival To</h4>
                              <h5>
                                ({flightData?.segments[0]?.arrival})-
                                {flightData?.segments[0].arrivalAirport}
                              </h5>
                              <h5>{flightData?.segments[0].arrivalLocation}</h5>
                              <h5>
                                {" "}
                               
                                {format(
                                  new Date(
                                    flightData?.segments[0]?.arrivalTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Duration</h4>
                              <h5>{flightData?.segments[0].flightduration}</h5>
                              <h5>
                                <span style={{ color: "tomato" }}>
                                  {flightData?.segments[0].marketingcareer}{" "}
                                  {flightData?.segments[0].marketingflight}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                Class: {flightData?.segments[0]?.bookingcode}
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                <span>
                                  Seat: {flightData?.segments[0].seat || 9}
                                </span>
                              </h5>
                              <h5>
                                Baggage:{" "}
                                {flightData?.bags === "3" ||
                                flightData?.bags === "2" ||
                                flightData?.bags === "1" ? (
                                  <>{flightData?.bags?.split(" ")[0]} Piece</>
                                ) : flightData?.bags === " " ? (
                                  <>0 Kg</>
                                ) : (
                                  <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                )}
                              </h5>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box className="border-content">
                        <span>
                          Transit Time<>: </>
                          {flightData?.transit.transit
                            ? flightData?.transit.transit
                            : flightData?.transit.transit1}{" "}
                        </span>
                      </Box>

                      <Box className="single-flight-parent">
                        <Grid
                          className="single-flight-details"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                            item
                            xs={2}
                            sm={3}
                            md={4.5}
                          >
                            <Box textAlign="center" paddingRight={2}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.segments[1].marketingcareer}.png`}
                                alt={`${flightData?.segments[1].marketingcareer}`}
                              />
                              <Typography
                                width="100px"
                                fontSize="12px"
                                fontWeight={500}
                                textAlign="center"
                                paddingRight={2}
                              >
                                {flightData?.segments[1]?.marketingcareerName}
                              </Typography>
                            </Box>
                            <Box className="flight-content-detail">
                              <h4>Departure From</h4>
                              <h5>
                                ({flightData?.segments[1]?.departure})-
                                {flightData?.segments[1]?.departureAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[1]?.departureLocation}
                              </h5>
                              <h5>
                                {format(
                                  new Date(
                                    flightData?.segments[1]?.departureTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Arrival To</h4>
                              <h5>
                                ({flightData?.segments[1]?.arrival})-
                                {flightData?.segments[1]?.arrivalAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[1]?.arrivalLocation}
                              </h5>
                              <h5>
                                {format(
                                  new Date(
                                    flightData?.segments[1]?.arrivalTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Duration</h4>
                              <h5>{flightData?.segments[1].flightduration}</h5>
                              <h5>
                                <span style={{ color: "tomato" }}>
                                  {flightData?.segments[1].marketingcareer}{" "}
                                  {flightData?.segments[1].marketingflight}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                Class: {flightData?.segments[1]?.bookingcode}
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                <span>
                                  Seat: {flightData?.segments[1].seat || 9}
                                </span>
                              </h5>
                              <h5>
                                Baggage:{" "}
                                {flightData?.bags === "3" ||
                                flightData?.bags === "2" ||
                                flightData?.bags === "1" ? (
                                  <>{flightData?.bags?.split(" ")[0]} Piece</>
                                ) : flightData?.bags === " " ? (
                                  <>0 Kg</>
                                ) : (
                                  <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                )}
                              </h5>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  ) : (
                    <Box className="segment-2">
                      <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        pb={2}
                        gap={2}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#003566",
                            fontWeight: 600,
                          }}
                        >
                          {
                            flightData?.segments[0]?.departureLocation?.split(
                              ","
                            )[0]
                          }
                        </Typography>
                        <img src={toimg} alt="to" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#003566",
                            fontWeight: 600,
                          }}
                        >
                          {
                            flightData?.segments[0]?.arrivalLocation?.split(
                              ","
                            )[0]
                          }
                        </Typography>
                      </Box>
                      <Box className="single-flight-parent">
                        <Grid
                          className="single-flight-details"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                            item
                            xs={2}
                            sm={3}
                            md={4.5}
                          >
                            <Box textAlign="center" paddingRight={2}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${flightData?.segments[0].marketingcareer}.png`}
                                alt={`${flightData?.segments[0].marketingcareer}`}
                              />
                              <Typography
                                width="100px"
                                fontSize="12px"
                                fontWeight={500}
                                textAlign="center"
                                paddingRight={2}
                              >
                                {flightData?.segments[0]?.marketingcareerName}
                              </Typography>
                            </Box>
                            <Box className="flight-content-detail">
                              <h4>Departure From</h4>
                              <h5>
                                ({flightData?.segments[0]?.departure})-
                                {flightData?.segments[0]?.departureAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[0]?.departureLocation}
                              </h5>
                              <h5>
                                {format(
                                  new Date(
                                    flightData?.segments[0]?.departureTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Arrival To</h4>
                              <h5>
                                ({flightData?.segments[0]?.arrival})-
                                {flightData?.segments[0]?.arrivalAirport}
                              </h5>
                              <h5>
                                {flightData?.segments[0]?.arrivalLocation}
                              </h5>
                              <h5>
                                {" "}
                               
                                {format(
                                  new Date(
                                    flightData?.segments[0]?.arrivalTime.toString()
                                  ),
                                  "dd MMM yyyy hh:mm a"
                                )}
                              </h5>
                            </Box>
                          </Grid>
                          <Grid item xs={2} sm={2} md={3}>
                            <Box className="flight-content-detail">
                              <h4>Duration</h4>
                              <h5>{flightData?.segments[0].flightduration}</h5>
                              <h5>
                                <span style={{ color: "tomato" }}>
                                  {flightData?.segments[0].marketingcareer}{" "}
                                  {flightData?.segments[0].marketingflight}{" "}
                                </span>
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                Class: {flightData?.segments[0]?.bookingcode}
                                <span
                                  style={{
                                    color: "crimson",
                                    fontSize: "15px",
                                  }}
                                >
                                  {" | "}
                                </span>
                                <span>
                                  Seat: {flightData?.segments[0].seat || 9}
                                </span>
                              </h5>
                              <h5>
                                Baggage:{" "}
                                {flightData?.bags === "3" ||
                                flightData?.bags === "2" ||
                                flightData?.bags === "1" ? (
                                  <>{flightData?.bags?.split(" ")[0]} Piece</>
                                ) : flightData?.bags === " " ? (
                                  <>0 Kg</>
                                ) : (
                                  <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                                )}
                              </h5>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}
                </TabPanel>

                <TabPanel value="2" className="tab-class">
                  <Box className="tab-table" sx={{ m: "5px 0px" }}>
                    <Box className="flight-search-table">
                      <table>
                        <tr>
                          <th>Pax Type</th>
                          <th>Base Fare</th>
                          <th>Tax</th>
                          <th>Total</th>
                          <th>Pax Count</th>
                          <th>Service Fee</th>
                          <th>Sub Total</th>
                        </tr>

                        {adultCount > 0 && childCount > 0 && infant > 0 ? (
                          <>
                            <tr>
                              <td>Adult</td>
                              <td>{flightData?.pricebreakdown[0]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[0]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[0]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[0]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[0]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[0]?.PaxCount}
                              </td>
                            </tr>
                            <tr>
                              <td>Child</td>
                              <td>{flightData?.pricebreakdown[1]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[1]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[1]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[1]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[1]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[1]?.PaxCount}
                              </td>
                            </tr>
                            <tr>
                              <td>Infant</td>
                              <td>{flightData?.pricebreakdown[2]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[2]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[2]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[2]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[2]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[2]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[2]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[2]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[2]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[2]?.PaxCount}
                              </td>
                            </tr>
                          </>
                        ) : adultCount > 0 && childCount > 0 ? (
                          <>
                            <tr>
                              <td>Adult</td>
                              <td>{flightData?.pricebreakdown[0]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[0]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[0]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[0]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[0]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[0]?.PaxCount}
                              </td>
                            </tr>
                            <tr>
                              <td>Child</td>
                              <td>{flightData?.pricebreakdown[1]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[1]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[1]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[1]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[1]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[1]?.PaxCount}
                              </td>
                            </tr>
                          </>
                        ) : adultCount > 0 && infant > 0 ? (
                          <>
                            <tr>
                              <td>Adult</td>
                              <td>{flightData?.pricebreakdown[0]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[0]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[0]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[0]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[0]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[0]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[0]?.PaxCount}
                              </td>
                            </tr>
                            <tr>
                              <td>Infant</td>
                              <td>{flightData?.pricebreakdown[1]?.BaseFare}</td>
                              <td>{flightData?.pricebreakdown[1]?.Tax}</td>
                              <td>
                                {parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax)}
                              </td>
                              <td>{flightData?.pricebreakdown[1]?.PaxCount}</td>

                              <td>
                                {flightData?.pricebreakdown[1]?.ServiceFee}
                              </td>
                              <td>
                                {(parseInt(
                                  flightData?.pricebreakdown[1]?.BaseFare
                                ) +
                                  parseInt(flightData?.pricebreakdown[1]?.Tax) +
                                  parseInt(
                                    flightData?.pricebreakdown[1]?.ServiceFee
                                  )) *
                                  flightData?.pricebreakdown[1]?.PaxCount}
                              </td>
                            </tr>
                          </>
                        ) : (
                          <tr>
                            <td>Adult</td>
                            <td>{flightData?.pricebreakdown[0]?.BaseFare}</td>
                            <td>{flightData?.pricebreakdown[0]?.Tax}</td>
                            <td>
                              {parseInt(
                                flightData?.pricebreakdown[0]?.BaseFare
                              ) + parseInt(flightData?.pricebreakdown[0]?.Tax)}
                            </td>
                            <td>{flightData?.pricebreakdown[0]?.PaxCount}</td>

                            <td>{flightData?.pricebreakdown[0]?.ServiceFee}</td>
                            <td>
                              {(parseInt(
                                flightData?.pricebreakdown[0]?.BaseFare
                              ) +
                                parseInt(flightData?.pricebreakdown[0]?.Tax) +
                                parseInt(
                                  flightData?.pricebreakdown[0]?.ServiceFee
                                )) *
                                flightData?.pricebreakdown[0]?.PaxCount}
                            </td>
                          </tr>
                        )}
                      </table>
                    </Box>
                  </Box>
                </TabPanel>

                <TabPanel value="3" className="tab-class">
                  <Box className="tab-table" sx={{ m: "5px 0px" }}>
                    <Box className="flight-search-table">
                      <table>
                        <tr>
                          <th>Customer Invoice</th>
                          <th>Commission</th>
                          <th>Agent Invoice</th>
                          <th>Profit Amount</th>
                        </tr>

                        <tr>
                          <td>{clientFare}</td>
                          <td>7%</td>
                          <td>{agentFare}</td>
                          <td>{commission}</td>
                        </tr>
                      </table>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="4" className="cancelation-1">
                  <Grid
                    className="cancellation-content "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">Time Frame </Typography>
                      <Typography variant="h4">
                        (From Scheduled Flight Departure)
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Airline Fee + Flyfarint Fee{" "}
                      </Typography>
                      <Typography variant="h4">(Per Passenger)</Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    className=" cancellation-content-cus "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">0 hours to 72 hours</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Adult : Airline Policy + 200 BDT
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    className=" cancellation-content-cus2  "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        72 hours to 335 hours
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Adult : Airline Policy + 200 BDT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    className="cancellation-content"
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">Time Frame </Typography>
                      <Typography variant="h4">
                        (From Scheduled Flight Departure)
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Airline Fee + Flyfarint Fee{" "}
                      </Typography>
                      <Typography variant="h4">(Per Passenger)</Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    className="cancellation-content-cus3 "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">All Flight Departure</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Adult : Airline Policy + No-Show Charge + 200 BDT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        fontSize={"12px"}
                        border="1px solid red"
                        py={1}
                        px={2}
                        my={1}
                      >
                        *Important: This destination may have COVID-19 travel
                        restriction in place, including specific restriction for
                        loading Check any nation,local and health advisories for
                        this destination before you book.
                      </Typography>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="5" className="cancelation-1">
                  <Grid
                    className="cancellation-content "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">Time Frame </Typography>
                      <Typography variant="h4">
                        (From Scheduled Flight Departure)
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Airline Fee + Flyfarint Fee{" "}
                      </Typography>
                      <Typography variant="h4">(Per Passenger)</Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    className=" cancellation-content-cus "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">0 hours to 72 hours</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Adult : Airline Policy + 200 BDT
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    className=" cancellation-content-cus2  "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        72 hours to 335 hours
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Adult : Airline Policy + 200 BDT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    className="cancellation-content"
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">Time Frame </Typography>
                      <Typography variant="h4">
                        (From Scheduled Flight Departure)
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Airline Fee + Flyfarint Fee{" "}
                      </Typography>
                      <Typography variant="h4">(Per Passenger)</Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    className="cancellation-content-cus3 "
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">All Flight Departure</Typography>
                    </Grid>

                    <Grid item xs={4} sm={4} md={6}>
                      <Typography variant="h4">
                        Adult : Airline Policy + No-Show Charge + 200 BDT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography
                        fontSize={"12px"}
                        border="1px solid red"
                        py={1}
                        px={2}
                        my={1}
                      >
                        *Important: This destination may have COVID-19 travel
                        restriction in place, including specific restriction for
                        loading Check any nation,local and health advisories for
                        this destination before you book.
                      </Typography>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value="6" className="tab-class">
                  <Box className="tab-table" sx={{ m: "5px 0px" }}>
                    <Box className="flight-search-table">
                      <table>
                        <tr>
                          <th>Flight</th>
                          <th>Cabin</th>
                          <th>Check-In</th>
                        </tr>

                        <tr>
                          <td>
                            {to}-{from}
                          </td>
                          <td>
                            {flightData.system === "Sabre" ? (
                              <>Economy</>
                            ) : flightData.system === "FlyHub" ? (
                              <>Economy</>
                            ) : (
                              <>{flightData.class}</>
                            )}
                          </td>
                          <td>{adultCount + childCount + infant}</td>
                        </tr>
                      </table>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="7" className="tab-class">
                  <Box className="tab-table" sx={{ m: "5px 0px" }}>
                    <Box className="flight-search-table">
                      <table>
                        <tr>
                          <th>Baggage</th>
                          <th>Check-In</th>
                          <th>Cabin</th>
                        </tr>

                        <tr>
                          <td>Adult</td>
                          <td>
                            {flightData?.bags === "3" ||
                            flightData?.bags === "2" ||
                            flightData?.bags === "1" ? (
                              <>{flightData?.bags?.split(" ")[0]} Piece</>
                            ) : flightData?.bags === " " ? (
                              <>0 Kg</>
                            ) : (
                              <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                            )}
                          </td>
                          <td>{flightData?.class}</td>
                        </tr>
                        {childCount > 0 && (
                          <tr>
                            <td>Child</td>
                            <td>
                              {flightData?.bags === "3" ||
                              flightData?.bags === "2" ||
                              flightData?.bags === "1" ? (
                                <>{flightData?.bags?.split(" ")[0]} Piece</>
                              ) : flightData?.bags === " " ? (
                                <>0 Kg</>
                              ) : flightData?.bags.length === 6 ? (
                                <>{flightData?.bags?.slice(2, 4) || 0} Kg </>
                              ) : (
                                <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                              )}
                            </td>
                            <td>{flightData?.class}</td>
                          </tr>
                        )}
                        {infant > 0 && (
                          <tr>
                            <td>Infant</td>
                            <td>
                              {flightData?.bags === "3" ||
                              flightData?.bags === "2" ||
                              flightData?.bags === "1" ? (
                                <>{flightData?.bags?.split(" ")[0]} Piece</>
                              ) : flightData?.bags === " " ? (
                                <>0 Kg</>
                              ) : flightData?.bags.length === 6 ? (
                                <>{flightData?.bags?.slice(4, 6) || 0} Kg </>
                              ) : (
                                <>{flightData?.bags?.slice(0, 2) || 0} Kg</>
                              )}
                            </td>
                            <td>{flightData?.class}</td>
                          </tr>
                        )}
                      </table>
                    </Box>
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Container> */}
      //todo:-------
      {/* <Grid item sm={3} md={4} px="15px" pt="15px">
                  <Grid
                    container
                    sx={{
                      alignItems: "start",
                    }}
                  >
                    <Grid item sm={12} md={12} lg={4}>
                      <Box>
                        {system === "Sabre" ? (
                          <Box
                            sx={{
                              width: "60px",
                              height: "60px",
                            }}
                          >
                            {segment === "3" ? (
                              <>
                                {career === segments?.go[0]?.marketingcareer &&
                                career === segments?.go[1]?.marketingcareer &&
                                career === segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : segments?.go[0]?.marketingcareer !==
                                    segments?.go[1]?.marketingcareer &&
                                  segments?.go[1]?.marketingcareer ===
                                    segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid red"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                      className="round-rotation"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : segments?.go[0]?.marketingcareer ===
                                    segments?.go[1]?.marketingcareer &&
                                  segments?.go[1]?.marketingcareer !==
                                    segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid red"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                      className="round-rotation"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[2]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box className="mercedes-sape-s">
                                      <Box className="first-1"></Box>
                                      <Box className="img-first-1">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-2"></Box>
                                      <Box className="img-first-2">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-3"></Box>
                                      <Box className="img-first-3">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[2]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : segment === "2" ||
                              segment === "22" ||
                              segment === "21" ? (
                              <>
                                {career === segments?.go[0]?.marketingcareer &&
                                career === segments?.go[1]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      border={"2px solid red"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                      className="round-rotation"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                className={`${system.toLowerCase()}`}
                                alt={`${career}`}
                              />
                            )}
                          </Box>
                        ) : system === "Galileo" ? (
                          <Box
                            sx={{
                              width: "60px",
                              height: "60px",
                            }}
                          >
                            {segment === "3" ? (
                              <>
                                {career === segments?.[0]?.marketingcareer &&
                                career === segments?.go[1]?.marketingcareer &&
                                career === segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : segments?.go[0]?.marketingcareer !==
                                    segments?.go[1]?.marketingcareer &&
                                  segments?.go[1]?.marketingcareer ===
                                    segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #0b8634"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : segments?.go[0]?.marketingcareer ===
                                    segments?.go[1]?.marketingcareer &&
                                  segments?.go[1]?.marketingcareer !==
                                    segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #0b8634"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[2]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box className="mercedes-sape-g">
                                      <Box className="first-1"></Box>
                                      <Box className="img-first-1">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-2"></Box>
                                      <Box className="img-first-2">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-3"></Box>
                                      <Box className="img-first-3">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[2]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : segment === "2" ||
                              segment === "22" ||
                              segment === "21" ? (
                              <>
                                {career === segments?.go[0]?.marketingcareer &&
                                career === segments?.go[1]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      border={"2px solid #0b8634"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                className={`${system.toLowerCase()}`}
                                alt={`${career}`}
                              />
                            )}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: "60px",
                              height: "60px",
                            }}
                          >
                            {segment === "3" ? (
                              <>
                                {career === segments?.go[0]?.marketingcareer &&
                                career === segments?.go[1]?.marketingcareer &&
                                career === segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      cclassName={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (career ===
                                    !segments?.go[0]?.marketingcareer &&
                                    career ===
                                      segments?.go[1]?.marketingcareer) ||
                                  (career ===
                                    segments?.go[0]?.marketingcareer &&
                                    career ===
                                      !segments?.go[1]?.marketingcareer) ? (
                                  <>
                                    <Box
                                      border={"2px solid #4169e1"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : career ===
                                    segments?.go[0]?.marketingcareer ||
                                  career ===
                                    !segments?.go[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #4169e1"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[2]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box className="mercedes-sape-f">
                                      <Box className="first-1"></Box>
                                      <Box className="img-first-1">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-2"></Box>
                                      <Box className="img-first-2">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-3"></Box>
                                      <Box className="img-first-3">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[2]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.go[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : segment === "2" ||
                              segment === "22" ||
                              segment === "21" ? (
                              <>
                                {career === segments?.go[0]?.marketingcareer &&
                                career === segments?.go[1]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      border={"2px solid #4169e1"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.go[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.go[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                className={`${system.toLowerCase()}`}
                                alt={`${career}`}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid item sm={12} md={12} lg={8}>
                      <Box pl={1}>
                        <Typography
                          sx={{
                            color: "#DC143C",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "14px",
                              lg: "14px",
                            },
                          }}
                        >
                          {segments.go[0]?.marketingcareerName || careerName}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#003566",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                              lg: "12px",
                            },
                          }}
                        >
                          {segment === "3" ? (
                            <>
                              {segments.go[0]?.marketingcareer}&nbsp;
                              {segments.go[0]?.marketingflight} {" | "}
                              {segments.go[1]?.marketingcareer}&nbsp;
                              {segments.go[1]?.marketingflight} {" | "}
                              {segments.go[2]?.marketingcareer}&nbsp;
                              {segments.go[2]?.marketingflight}
                            </>
                          ) : segment === "2" ||
                            segment === "21" ||
                            segment === "22" ? (
                            <>
                              {segments.go[0]?.marketingcareer}&nbsp;
                              {segments.go[0]?.marketingflight} {" | "}
                              {segments.go[1]?.marketingcareer}&nbsp;
                              {segments.go[1]?.marketingflight}
                            </>
                          ) : (
                            <>
                              {segments.go[0]?.marketingcareer}&nbsp;
                              {segments.go[0]?.marketingflight}
                            </>
                          )}
                        </Typography>
                      </Box>
                      <Box pl={1}>
                        {segment === "3" ? (
                          <Typography color="#003566" fontSize="12px">
                            {goflightduration}&nbsp;|&nbsp;
                            <spans style={{ color: "#dc143c" }}>Two Stop</spans>
                          </Typography>
                        ) : segment === "2" ||
                          segment === "12" ||
                          segment === "22" ? (
                          <Typography color="#003566" fontSize="12px">
                            {goflightduration}&nbsp;|&nbsp;
                            <spans style={{ color: "#dc143c" }}>One Stop</spans>
                          </Typography>
                        ) : (
                          <Typography color="#003566" fontSize="12px">
                            {goflightduration}&nbsp;|&nbsp;
                            <spans style={{ color: "#dc143c" }}>Non Stop</spans>
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid> */}
      {/* //todo:--------- */}
      {/* <Grid item sm={3} md={4} px="15px" pt="15px">
                  <Grid
                    container
                    sx={{
                      alignItems: "start",
                    }}
                  >
                    <Grid item sm={12} md={12} lg={4}>
                      <Box>
                        {system === "Sabre" ? (
                          <Box
                            sx={{
                              width: {
                                xs: "50px",
                                sm: "50px",
                                md: "71px",
                                lg: "71px",
                              },
                            }}
                          >
                            {segment === "3" ? (
                              <>
                                {career ===
                                  segments?.back[0]?.marketingcareer &&
                                career === segments?.back[1]?.marketingcareer &&
                                career ===
                                  segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : segments?.back[0]?.marketingcareer !==
                                    segments?.back[1]?.marketingcareer &&
                                  segments?.back[1]?.marketingcareer ===
                                    segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid red"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : segments?.back[0]?.marketingcareer ===
                                    segments?.back[1]?.marketingcareer &&
                                  segments?.back[1]?.marketingcareer !==
                                    segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid red"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[2]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box className="mercedes-sape-s">
                                      <Box className="first-1"></Box>
                                      <Box className="img-first-1">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-2"></Box>
                                      <Box className="img-first-2">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-3"></Box>
                                      <Box className="img-first-3">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[2]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : segment === "2" ||
                              segment === "22" ||
                              segment === "12" ? (
                              <>
                                {career ===
                                  segments?.back[0]?.marketingcareer &&
                                career ===
                                  segments?.back[1]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      border={"2px solid red"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                className={`${system.toLowerCase()}`}
                                alt={`${segments?.back[0]?.marketingcareer}`}
                              />
                            )}
                          </Box>
                        ) : system === "Galileo" ? (
                          <Box
                            sx={{
                              width: {
                                xs: "50px",
                                sm: "50px",
                                md: "71px",
                                lg: "71px",
                              },
                            }}
                          >
                            {segment === "3" ? (
                              <>
                                {career ===
                                  segments?.back[0]?.marketingcareer &&
                                career === segments?.back[1]?.marketingcareer &&
                                career ===
                                  segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : segments?.back[0]?.marketingcareer !==
                                    segments?.back[1]?.marketingcareer &&
                                  segments?.back[1]?.marketingcareer ===
                                    segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #0b8634"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : segments?.back[0]?.marketingcareer ===
                                    segments?.back[1]?.marketingcareer &&
                                  segments?.back[1]?.marketingcareer !==
                                    segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #0b8634"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[2]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box className="mercedes-sape-g">
                                      <Box className="first-1"></Box>
                                      <Box className="img-first-1">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-2"></Box>
                                      <Box className="img-first-2">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-3"></Box>
                                      <Box className="img-first-3">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[2]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : segment === "2" ||
                              segment === "22" ||
                              segment === "12" ? (
                              <>
                                {career ===
                                  segments?.back[0]?.marketingcareer &&
                                career ===
                                  segments?.back[1]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      border={"2px solid #0b8634"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                className={`${system.toLowerCase()}`}
                                alt={`${segments?.back[0]?.marketingcareer}`}
                              />
                            )}
                          </Box>
                        ) : (
                          // ----- gali end
                          <Box
                            sx={{
                              width: {
                                xs: "50px",
                                sm: "50px",
                                md: "71px",
                                lg: "71px",
                              },
                            }}
                          >
                            {segment === "3" ? (
                              <>
                                {career ===
                                  segments?.back[0]?.marketingcareer &&
                                career === segments?.back[1]?.marketingcareer &&
                                career ===
                                  segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : segments?.back[0]?.marketingcareer !==
                                    segments?.back[1]?.marketingcareer &&
                                  segments?.back[1]?.marketingcareer ===
                                    segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #4169e1"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : segments?.back[0]?.marketingcareer ===
                                    segments?.back[1]?.marketingcareer &&
                                  segments?.back[1]?.marketingcareer !==
                                    segments?.back[2]?.marketingcareer ? (
                                  <>
                                    <Box
                                      border={"2px solid #4169e1"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[2]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box className="mercedes-sape-f">
                                      <Box className="first-1"></Box>
                                      <Box className="img-first-1">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-2"></Box>
                                      <Box className="img-first-2">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box className="first-3"></Box>
                                      <Box className="img-first-3">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[2]?.marketingcareer}.png`}
                                          width="25px"
                                          height="25px"
                                          alt={`${segments?.back[2]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : segment === "2" ||
                              segment === "22" ||
                              segment === "12" ? (
                              <>
                                {career ===
                                  segments?.back[0]?.marketingcareer &&
                                career ===
                                  segments?.back[1]?.marketingcareer ? (
                                  <>
                                    <img
                                      src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${career}.png`}
                                      className={`${system.toLowerCase()}`}
                                      alt={`${career}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      border={"2px solid #4169e1"}
                                      borderRadius="50%"
                                      width="71px"
                                      height="71px"
                                      display="flex"
                                      flexDirection="column"
                                      overflow="hidden"
                                      justifyContent="center"
                                      alignItems="center"
                                      pt="8px"
                                    >
                                      <Box mb="-7px">
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[0]?.marketingcareer}`}
                                        />
                                      </Box>
                                      <Box
                                        borderBottom={"2px solid #D9D9D9"}
                                        width="100%"
                                      ></Box>
                                      <Box>
                                        <img
                                          src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[1]?.marketingcareer}.png`}
                                          width="30px"
                                          height="30px"
                                          alt={`${segments?.back[1]?.marketingcareer}`}
                                        />
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </>
                            ) : (
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${segments?.back[0]?.marketingcareer}.png`}
                                className={`${system.toLowerCase()}`}
                                alt={`${segments?.back[0]?.marketingcareer}`}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid item sm={12} md={12} lg={8}>
                      <Box pl={1}>
                        <Typography
                          sx={{
                            color: "#DC143C",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "14px",
                              lg: "14px",
                            },
                          }}
                        >
                          {segments.back[0]?.marketingcareerName || careerName}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#003566",
                            fontWeight: 500,
                            fontSize: {
                              xs: "12px",
                              sm: "10px",
                              md: "12px",
                              lg: "12px",
                            },
                          }}
                        >
                          {segment === "3" ? (
                            <>
                              {segments.back[0]?.marketingcareer}&nbsp;
                              {segments.back[0]?.marketingflight} {" | "}
                              {segments.back[1]?.marketingcareer}&nbsp;
                              {segments.back[1]?.marketingflight} {" | "}
                              {segments.back[2]?.marketingcareer}&nbsp;
                              {segments.back[2]?.marketingflight}
                            </>
                          ) : segment === "2" ||
                            segment === "12" ||
                            segment === "22" ? (
                            <>
                              {segments.back[0]?.marketingcareer}&nbsp;
                              {segments.back[0]?.marketingflight} {" | "}
                              {segments.back[1]?.marketingcareer}&nbsp;
                              {segments.back[1]?.marketingflight}
                            </>
                          ) : (
                            <>
                              {segments.back[0]?.marketingcareer}&nbsp;
                              {segments.back[0]?.marketingflight}
                            </>
                          )}
                        </Typography>
                      </Box>
                      <Box pl={1}>
                        {segment === "3" ? (
                          <Typography color="#003566" fontSize="12px">
                            {backflightduration}&nbsp;|&nbsp;
                            <spans style={{ color: "#dc143c" }}>Two Stop</spans>
                          </Typography>
                        ) : segment === "2" ||
                          segment === "12" ||
                          segment === "22" ? (
                          <Typography color="#003566" fontSize="12px">
                            {backflightduration}&nbsp;|&nbsp;
                            <spans style={{ color: "#dc143c" }}>One Stop</spans>
                          </Typography>
                        ) : (
                          <Typography color="#003566" fontSize="12px">
                            {backflightduration}&nbsp;|&nbsp;
                            <spans style={{ color: "#dc143c" }}>Non Stop</spans>
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid> */}
      {/* //todo:flight information */}
      {/* <Grid item xs={6}>
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: 600,
                                  color: "#000",
                                }}
                              >
                                {location.state?.flightData?.departure} -{" "}
                                {location.state?.flightData?.departureTime}
                              </Typography>
                            </Grid>

                            <Grid item xs={6} textAlign="end">
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: 600,
                                  color: "#000",
                                }}
                              >
                                {location.state?.flightData?.arrival} -{" "}
                                {location.state?.flightData?.arrivalTime}
                              </Typography>
                            </Grid> */}
      {/* //todo:---------- */}
      {/* <Grid container justifyContent={"space-between"}>
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "#003566",
                                }}
                              >
                                {
                                  location.state?.flightData?.segments[0]?.departureLocation?.split(
                                    ","
                                  )[0]
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  color: "#C7C7C7",
                                }}
                              >
                                {location.state?.flightData?.departureDate}
                              </Typography>
                            </Grid>

                            <Grid textAlign="end">
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  color: "#003566",
                                }}
                              >
                                {
                                  location.state?.flightData?.segments[0]?.arrivalLocation?.split(
                                    ","
                                  )[0]
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  color: "#C7C7C7",
                                }}
                              >
                                {location.state?.flightData?.arrivalDate}
                              </Typography>
                            </Grid>
                        </Grid> */}
      {/* //todo:----------- */}
      {/* <Grid container justifyContent={"space-around"}>
                            <Typography
                              sx={{
                                color: "#003566",
                                fontSize: "13px",
                                fontWeight: 500,
                              }}
                            >
                              {location.state?.flightData?.flightduration}
                            </Typography>
                          </Grid> */}
      {/* <Box py={2} className="roundway-animation">
                            <div className="round-segment-line0">
                              <div className="round-segment-circle">
                                <div className="circle-0">
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                                <div className="circle-0">
                                  <CircleIcon
                                    sx={{
                                      color: "#c7c7c7",
                                      fontSize: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="round-segment-flight01">
                                <img src={anemy} width="50px" alt="flight" />
                              </div>
                            </div>
                          </Box> */}
      {/* <Grid
                            container
                            justifyContent={"space-around"}
                            mb={2}
                          >
                            <Grid>
                              <Grid container alignItems={"center"}>
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${location.state?.flightData?.segments[0]?.marketingcareer}.png`}
                                  width="40px"
                                  height="40px"
                                  className={
                                    location.state?.flightData?.system ===
                                    "Sabre"
                                      ? "img-border-sabre"
                                      : location.state?.flightData?.system ===
                                        "FlyHub"
                                      ? "img-border-flyhub"
                                      : "img-border-galileo"
                                  }
                                  alt="flight icon"
                                />
                                &nbsp;
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.flightData?.segments[0]
                                        ?.marketingcareerName
                                    }
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "#003566",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {
                                      location.state?.flightData?.segments[0]
                                        ?.marketingcareer
                                    }
                                    &nbsp;
                                    {
                                      location.state?.flightData?.segments[0]
                                        ?.marketingflight
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid> */}
      {/* <Grid container justifyContent={"space-between"}>
                            <Grid
                              md={6}
                              container
                              justifyContent={"space-between"}
                              alignItems="end"
                            >
                              <Typography
                                sx={{
                                  color: "#000",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                {location.state?.flightData?.class ===
                                "Sabre" ? (
                                  <>Economy</>
                                ) : location.state?.flightData?.class ===
                                  "FlyHub" ? (
                                  <>Economy</>
                                ) : (
                                  <>
                                    Class: {location.state?.flightData?.class}
                                  </>
                                )}
                              </Typography>
                              <Typography>
                                {location.state?.flightData?.refundable ===
                                "Refundable" ? (
                                  <Typography
                                    sx={{
                                      color: "green",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <>Refundable</>
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{
                                      color: "#DC143C",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Non Refundable
                                  </Typography>
                                )}
                              </Typography>

                              <Typography
                                sx={{
                                  color: "#000",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}
                              >
                                <img src={seat1} width="18px" alt="seat" />{" "}
                                {location.state?.flightData?.segments[0]?.seat}{" "}
                                Seat
                              </Typography>
                            </Grid>
                            <Grid item md={2.5} textAlign={"center"}>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  bgcolor: "#003566",
                                  borderRadius: "12px 0px",
                                  padding: "8px",
                                }}
                              >
                                Flight Duration{" "}
                                {location.state?.flightData?.flightduration}
                              </Typography>
                            </Grid>
                          </Grid> */}
      {/* //todo:----------- */}
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
                Total Search Count
              </Typography>
              <Typography
                style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
              >
                {totalSate?.allsearch}
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
                Total One way Search Count
              </Typography>
              <Typography
                style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
              >
                {totalSate?.oneway}
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
                Total Round way Search Count
              </Typography>
              <Typography
                style={{ color: "#fff", fontSize: "25px", fontWeight: "600" }}
              >
                {totalSate?.return}
              </Typography>
            </Box>
          </Box>
        </Grid>
       



      </Grid> */}



      {/* admin header */}

      <>
                {/* //todo:normal header */}

                

                {!location.pathname.includes("/admin") ? (
                  <>
                    <Box
                      style={{
                        background: "var(--primary-color)",
                        width: "80%",
                        height: "60px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        padding: "10px 20px 0px",
                      }}
                    >
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <HouseboatIcon />
                          Dashboard
                        </Box>
                      </NavLink>
                      <Box
                        style={{
                          backgroundColor: "transparent",
                          width: "fit-content",
                          height: "100%",
                          borderRadius: "5px 5px 0px 0px",
                          color: "var(--white)",
                          position: "relative",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <NavLink
                          to="/queues"
                          className={({ isActive }) =>
                            isActive ? "active-nav" : "normal-nav"
                          }
                        >
                          <Box
                            style={{
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ManageAccountsIcon />
                            Bookings
                          </Box>
                        </NavLink>
                        {/* {service ? (
                        <Box
                          style={{
                            position: "absolute",
                            top: "90%",
                            left: "0",
                            width: "400px",
                            height: "fit-content",
                            background: "var(--white)",
                            border: "1px solid var(--primary-color)",
                            borderRadius: "10px",
                            zIndex: "999",
                          }}
                        >
                          <Grid
                            container
                            spacing={2}
                            style={{ padding: "8px" }}
                          >
                            <Grid item md={12}>
                              <Box
                                style={{
                                  gap: "5px",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "start",
                                  color: "var(--secondary-color)",
                                }}
                              >
                                <ManageAccountsIcon />
                                Service
                              </Box>
                            </Grid>
                            <Grid item md={4}>
                              <NavLink
                                to="/bookingroute"
                                style={{
                                  textDecoration: "none",
                                  gap: "1px",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  padding: "0px 5px",
                                  alignItems: "start",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  color: "var(--secondary-color)",
                                  boxShadow:
                                    "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                  borderRadius: "5px",
                                }}
                                onClick={() => setService((prev) => !prev)}
                              >
                                <Typography
                                  style={{
                                    color: "var(--primary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Air Ticket
                                </Typography>
                                <Typography
                                  style={{
                                    color: "var(--secondary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  102
                                </Typography>
                              </NavLink>
                            </Grid>
                            <Grid item md={4}>
                              <NavLink
                                to="/"
                                style={{
                                  textDecoration: "none",
                                  gap: "5px",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "start",
                                  justifyContent: "start",
                                  flexDirection: "column",
                                  color: "var(--secondary-color)",
                                  boxShadow:
                                    "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                  padding: "0px 5px",
                                  borderRadius: "5px",
                                }}
                                onClick={() => {
                                  setService(false);
                                }}
                              >
                                <Typography
                                  style={{
                                    color: "var(--primary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Other
                                </Typography>
                                <Typography
                                  style={{
                                    color: "var(--secondary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  102
                                </Typography>
                              </NavLink>
                            </Grid>
                            <Grid item md={4}>
                              <NavLink
                                to="/"
                                style={{
                                  textDecoration: "none",
                                  gap: "5px",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "start",
                                  justifyContent: "start",
                                  flexDirection: "column",
                                  color: "var(--secondary-color)",
                                  boxShadow:
                                    "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                  padding: "0px 4px",
                                  borderRadius: "5px",
                                }}
                                onClick={() => {
                                  setService(false);
                                }}
                              >
                                <Typography
                                  style={{
                                    color: "var(--primary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Group Fare
                                </Typography>
                                <Typography
                                  style={{
                                    color: "var(--secondary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  102
                                </Typography>
                              </NavLink>
                            </Grid>
                            <Grid item md={4}>
                              <NavLink
                                to="/"
                                style={{
                                  textDecoration: "none",
                                  gap: "5px",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "start",
                                  justifyContent: "start",
                                  flexDirection: "column",
                                  color: "var(--secondary-color)",
                                  boxShadow:
                                    "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                  padding: "0px 4px",
                                  borderRadius: "5px",
                                }}
                                onClick={() => {
                                  setService(false);
                                }}
                              >
                                <Typography
                                  style={{
                                    color: "var(--primary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Tour
                                </Typography>
                                <Typography
                                  style={{
                                    color: "var(--secondary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  102
                                </Typography>
                              </NavLink>
                            </Grid>
                            <Grid item md={4}>
                              <NavLink
                                to="/"
                                style={{
                                  textDecoration: "none",
                                  gap: "5px",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "start",
                                  justifyContent: "start",
                                  flexDirection: "column",
                                  color: "var(--secondary-color)",
                                  boxShadow:
                                    "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                  padding: "0px 4px",
                                  borderRadius: "5px",
                                }}
                                onClick={() => {
                                  setService(false);
                                }}
                              >
                                <Typography
                                  style={{
                                    color: "var(--primary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Visa
                                </Typography>
                                <Typography
                                  style={{
                                    color: "var(--secondary-color)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  102
                                </Typography>
                              </NavLink>
                            </Grid>
                          </Grid>
                        </Box>
                      ) : null} */}
                      </Box>
                      <Box
                        style={{
                          textDecoration: "none",
                          backgroundColor: "transparent",
                          width: "15%",
                          height: "100%",
                          borderRadius: "5px 5px 0px 0px",
                          // padding: "10px 10px 0px",
                          color: "var(--white)",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          style={{
                            gap: "5px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setManage((prev) => !prev);
                            setService(false);
                            setAccount(false);
                          }}
                        >
                          <ManageSearchIcon />
                          Manage
                        </Box>
                        {manage ? (
                          <Box
                            style={{
                              position: "absolute",
                              top: "90%",
                              left: "0",
                              width: "300px",
                              height: "fit-content",
                              background: "var(--white)",
                              border: "1px solid var(--primary-color)",
                              borderRadius: "10px",
                              zIndex: "999",
                            }}
                          >
                            <Grid
                              container
                              spacing={2}
                              style={{ padding: "8px" }}
                            >
                              <Grid item md={12}>
                                <Box
                                  style={{
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    color: "var(--secondary-color)",
                                  }}
                                >
                                  <ManageSearchIcon />
                                  Manage
                                </Box>
                              </Grid>
                              <Grid item md={6}>
                                <NavLink
                                  to="/traveller"
                                  style={{
                                    textDecoration: "none",
                                    gap: "1px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setManage(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Travelers
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "var(--secondary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    102
                                  </Typography>
                                </NavLink>
                              </Grid>
                              <Grid item md={6}>
                                <NavLink
                                  to="/dashboard"
                                  style={{
                                    textDecoration: "none",
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setManage(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Flight Markup
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "var(--secondary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    102
                                  </Typography>
                                </NavLink>
                              </Grid>
                            </Grid>
                          </Box>
                        ) : null}
                      </Box>
                      <Box
                        style={{
                          backgroundColor: "transparent",
                          width: "15%",
                          height: "100%",
                          borderRadius: "5px 5px 0px 0px",
                          // padding: "10px 10px 0px",
                          color: "var(--white)",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setAccount((prev) => !prev);
                            setService(false);
                            setManage(false);
                          }}
                        >
                          <AccountBalanceIcon />
                          Account
                        </Box>
                        {account ? (
                          <Box
                            style={{
                              position: "absolute",
                              top: "90%",
                              left: "0",
                              width: "400px",
                              height: "fit-content",
                              background: "var(--white)",
                              border: "1px solid var(--primary-color)",
                              borderRadius: "10px",
                              zIndex: "999",
                            }}
                          >
                            <Grid
                              container
                              spacing={2}
                              style={{ padding: "8px" }}
                            >
                              <Grid item md={12}>
                                <Box
                                  style={{
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    color: "var(--secondary-color)",
                                  }}
                                >
                                  <AccountBalanceIcon />
                                  Account
                                </Box>
                              </Grid>
                              <Grid item md={4}>
                                <NavLink
                                  to="/deposite"
                                  style={{
                                    textDecoration: "none",
                                    gap: "1px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setAccount(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Deposit Request
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "var(--secondary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    102
                                  </Typography>
                                </NavLink>
                              </Grid>
                              <Grid item md={4}>
                                <NavLink
                                  to="/bankaccount"
                                  style={{
                                    textDecoration: "none",
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setAccount(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Bank Account
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "var(--secondary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    102
                                  </Typography>
                                </NavLink>
                              </Grid>
                              <Grid item md={4}>
                                <NavLink
                                  to="/generalledger"
                                  style={{
                                    textDecoration: "none",
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setAccount(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    General Ledger
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "var(--secondary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    102
                                  </Typography>
                                </NavLink>
                              </Grid>
                              <Grid item md={4}>
                                <NavLink
                                  to="/account"
                                  style={{
                                    textDecoration: "none",
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setAccount(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    My Account
                                  </Typography>
                                  <Typography
                                    style={{
                                      color: "var(--secondary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    102
                                  </Typography>
                                </NavLink>
                              </Grid>
                            </Grid>
                          </Box>
                        ) : null}
                      </Box>
                      <NavLink
                        to="/generalLedgerReport"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AssessmentIcon />
                          Report
                        </Box>
                      </NavLink>
                    </Box>
                    <Box
                      style={{
                        backgroundColor: "var(--secondary-color)",
                        color: "var(--white)",
                        width: "20%",
                        height: "100%",
                        display: "flex",
                        fontSize: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Box>
                        Balance <br />
                        {commaNumber(balance)} BDT
                      </Box>
                      <NavLink
                        to="/adddeposite"
                        style={{ color: "var(--white)", cursor: "pointer" }}
                      >
                        <Tooltip title="Click to Deposit">
                          <AddIcon style={{ fontSize: "30px" }} />
                        </Tooltip>
                      </NavLink>
                    </Box>
                    <Box
                      style={{
                        background: "var(--primary-color)",
                        width: "10%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton>
                        <StyledBadge color="primary" badgeContent={0} max={9}>
                          <NotificationsIcon
                            fontSize="large"
                            style={{ color: "var(--white)" }}
                          />
                        </StyledBadge>
                      </IconButton>
                    </Box>
                  </>
                ) : (

                  <>
                    {/* //todo:admin header */}

                    <Box
                      style={{
                        background: "var(--primary-color)",
                        width: "80%",
                        height: "60px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        padding: "10px 20px 0",
                      }}
                    >
                      <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <HouseboatIcon />
                          Dashboard
                        </Box>
                      </NavLink>
                      <NavLink
                        to="/admin/agentManagement"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            gap: "5px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ManageAccountsIcon />
                          Agent
                        </Box>
                      </NavLink>
                      <NavLink
                        to="/admin/bookingManagement"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            gap: "5px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ManageAccountsIcon />
                          Booking
                        </Box>
                      </NavLink>
                      <NavLink
                        to="/admin/paymentManagement"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ManageSearchIcon />
                          Payment
                        </Box>
                      </NavLink>

                      <Box
                        style={{
                          textDecoration: "none",
                          backgroundColor: "transparent",
                          width: "15%",
                          height: "100%",
                          borderRadius: "5px 5px 0px 0px",
                          // padding: "10px 10px 0px",
                          color: "var(--white)",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          style={{
                            gap: "5px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setManage((prev) => !prev);
                            setService(false);
                            setAccount(false);
                          }}
                        >
                          <ManageSearchIcon />
                          Manage
                        </Box>
                        {manage ? (
                          <Box
                            style={{
                              position: "absolute",
                              top: "90%",
                              left: "0",
                              width: "300px",
                              height: "fit-content",
                              background: "var(--white)",
                              border: "1px solid var(--primary-color)",
                              borderRadius: "10px",
                              zIndex: "999",
                            }}
                          >
                            <Grid
                              container
                              spacing={2}
                              style={{ padding: "8px" }}
                            >
                              <Grid item md={12}>
                                <Box
                                  style={{
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    color: "var(--secondary-color)",
                                  }}
                                >
                                  <ManageSearchIcon />
                                  Manage
                                </Box>
                              </Grid>
                              <Grid item md={6}>
                                <NavLink
                                  to="admin/traveller"
                                  style={{
                                    textDecoration: "none",
                                    gap: "1px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setManage(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Home content
                                  </Typography>
                                </NavLink>
                              </Grid>
                              <Grid item md={6}>
                                <NavLink
                                  to="admin/addbank"
                                  style={{
                                    textDecoration: "none",
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setManage(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Add Bank
                                  </Typography>
                                </NavLink>
                              </Grid>
                              <Grid item md={6}>
                                <NavLink
                                  to="/admin/searchManagement"
                                  style={{
                                    textDecoration: "none",
                                    gap: "5px",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "start",
                                    flexDirection: "column",
                                    color: "var(--secondary-color)",
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    padding: "0px 4px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    setManage(false);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      color: "var(--primary-color)",
                                      fontWeight: "bold",
                                      height: "50px",
                                    }}
                                  >
                                    Search Count
                                  </Typography>
                                </NavLink>
                              </Grid>
                            </Grid>
                          </Box>
                        ) : null}
                      </Box>

                      <NavLink
                        to="/admin/generalledgerroute"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AssessmentIcon />
                          Report
                        </Box>
                      </NavLink>
                      <NavLink
                        to="admin/account"
                        className={({ isActive }) =>
                          isActive ? "active-nav" : "normal-nav"
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AssessmentIcon />
                          Account
                        </Box>
                      </NavLink>
                    </Box>

                  </>
                )}
              </>
    </div>
  );
};

export default junk;
