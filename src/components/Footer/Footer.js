/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

import authorized from "../../images/footer/authorized.png";
import AtabNew from "../../images/footer/AtabNew.png";
import toabNew from "../../images/footer/ToabNew.png";
import pataNew from "../../images/footer/pataNew.png";
import bimanNew from "../../images/footer/BimanNew.png";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Box>
      <Box className="footer-bgs">
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  style={{
                    color: "var(--primary-color)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: "10px",
                  }}
                >
                  <Typography
                    style={{ fontSize: "20px", color: "var(--primary-color)" }}
                  >
                    About Us
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Eu velit libero
                    condimentum quis lacus varius turpis id. Ut ornare non
                    turpis non eget auctor.
                  </Typography>
                </Box>
              </Grid>
              {/* //todo:Discover Section */}
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  style={{
                    color: "var(--primary-color)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: "10px",
                  }}
                >
                  <Typography
                    style={{ fontSize: "20px", color: "var(--primary-color)" }}
                  >
                    Discover
                  </Typography>
                  <Box
                    style={{
                      color: "var(--primary-color)",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "var(--primary-color)",
                        }}
                      >
                        Payment Method
                      </Typography>
                    </NavLink>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "var(--primary-color)",
                        }}
                      >
                        Terms and Condition
                      </Typography>
                    </NavLink>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "var(--primary-color)",
                        }}
                      >
                        Privacy Policy
                      </Typography>
                    </NavLink>
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "var(--primary-color)",
                        }}
                      >
                        Refund Policy
                      </Typography>
                    </NavLink>
                  </Box>
                </Box>
              </Grid>

              {/* //todo:Address section */}
              <Grid item xs={6} sm={6} md={3}>
                <Box
                  style={{
                    color: "var(--primary-color)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: "10px",
                  }}
                >
                  <Typography
                    style={{ fontSize: "20px", color: "var(--primary-color)" }}
                  >
                    Need Help?
                  </Typography>
                  <Typography
                    style={{ fontSize: "14px", color: "var(--primary-color)" }}
                  >
                    2nd Floor, Ka-9, Hazi Abdul Latif Mansion, Bashundhara Road,
                    Dhaka, Bangladesh
                  </Typography>
                </Box>
              </Grid>

              {/* //todo:contact section */}
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                order={{ lg: "2", md: "2", sm: "3", xs: "3" }}
              >
                <Box
                  style={{
                    color: "var(--primary-color)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    justifyContent: "start",
                    gap: "10px",
                  }}
                >
                  <Typography
                    style={{ fontSize: "20px", color: "var(--primary-color)" }}
                  >
                    Contact
                  </Typography>

                  <Box
                    style={{
                      color: "var(--primary-color)",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      justifyContent: "start",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "var(--primary-color)",
                      }}
                    >
                      support@sixsence.tech
                    </Typography>

                    <Typography
                      style={{
                        fontSize: "14px",
                        color: "var(--primary-color)",
                      }}
                    >
                      +8801925785592
                    </Typography>
                    <Box
                      style={{
                        color: "var(--primary-color)",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        gap: "5px",
                      }}
                    >
                      <a href="" target="_blank" rel="noreferrer">
                        <FaFacebookSquare
                          style={{
                            fontSize: "30px",
                            color: "var(--primary-color)",
                          }}
                        />
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <FaWhatsappSquare
                          style={{
                            fontSize: "30px",
                            color: "var(--primary-color)",
                          }}
                        />
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <FaLinkedin
                          style={{
                            fontSize: "30px",
                            color: "var(--primary-color)",
                          }}
                        />
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <hr
          style={{
            margin: "auto",
            marginTop: "42px ",
            marginBottom: "20px",
            width: "100%",
            overflow: "hidden",
          }}
        />

        <Container>
          <Box
            style={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              justifyContent: "flex-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                width: "50%",
                backgroundColor: "transparent",
                height: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  color: "var(--primary-color)",
                  fontSize: "23px",
                  fontWeight: "600",
                }}
              >
                <span style={{ color: "var(--primary-color)" }}>
                  Farhan Travels
                </span>
              </Typography>
            </Box>
            <Typography
              style={{
                color: "var(--primary-color)",
                width: "50%",
                height: "fit-content",
                fontWeight: "normal",
                textAlign: "right",
              }}
              noWrap
            >
              &copy; Copyright {date} by Farhan Tour And Travel Develop by
              FlyFar Tech
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
