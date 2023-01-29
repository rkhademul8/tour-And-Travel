import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./RefreashBtn.css";

const RefreashBtn = ({ setState }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(true);
    setTimeout(() => {
      setClick(false);
    }, 3600);
  };
  return (
    <Button
      style={{
        marginTop: "0px",
        border: "none",
        cursor: "pointer",
      }}
      onClick={() => {
        handleClick();
        setState((prev) => !prev);
      }}
    >
      <Tooltip title="Click To Refresh">
        <RefreshIcon className={click ? "loading" : "no-loading"} />
      </Tooltip>
    </Button>
  );
};

export default RefreashBtn;
