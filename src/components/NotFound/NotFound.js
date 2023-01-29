import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Box className="not-found-wrapper">
      <Box className="not-found">
        <Typography variant="h1" className="not-found-title">
          404
        </Typography>
        <Typography variant="h3" className="not-found-subtitle">
          PAGE NOT FOUND
        </Typography>
        <Typography variant="h5" className="not-found-paragraph">
          There is nothing here maybe the page you're looking for is not found
          or never existed
        </Typography>
        <Button variant="contained" className="not-found-btn">
          <Link to="/" className="not-found-link">
            Back to Home
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
