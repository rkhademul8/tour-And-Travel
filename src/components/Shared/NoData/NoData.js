import { Box } from "@mui/material";
import React from "react";
import Empty from "../../../images/undraw/undraw_empty_re_opql.svg";

const NoData = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Box style={{ width: "50%", position: "relative" }}>
        <img src={Empty} alt="..." width="100%" />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "30px",
            color: "#9999",
          }}
        >
          {" "}
          NO DATA FOUND
        </span>
      </Box>
    </Box>
  );
};

export default NoData;
