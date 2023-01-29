import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TourDetails = () => {
  const { id } = useParams();
  const [singlePackage, setSinglePackage] = useState({});
  useEffect(() => {
    let url = `https://api.flyfarint.com/v.1.0.0/Package/Tour.php?id=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSinglePackage(data);
      });
  }, [id]);
  return <Container></Container>;
};

export default TourDetails;
