import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { LandingHeader } from "../LandingHeader/LandingHeader";
import ReactHtmlParser from "react-html-parser";
import { DefaultTermsAndConditon } from "./DefaultTermsAndConditon";

const TermsAndCondition = () => {
  const [termsAndCondition, setTermsAndCondition] = useState({});
  useEffect(() => {
    //todo: fetching the data
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => {
        setTermsAndCondition(res?.data?.terms_condition);
      });
  }, []);

  return (
    <Box>
      <LandingHeader />
      {termsAndCondition?.length > 500 ? (
        <Container style={{ padding: "0" }}>
          <Box>{ReactHtmlParser(termsAndCondition)}</Box>
        </Container>
      ) : (
        <DefaultTermsAndConditon />
      )}
      <Footer />
    </Box>
  );
};

export default TermsAndCondition;
