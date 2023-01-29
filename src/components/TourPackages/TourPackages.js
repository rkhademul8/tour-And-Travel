import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import TourPackage from "./TourPackage";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loader from "../../images/loader/Render.gif";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Maintainence from "../../images/undraw/undraw_under_construction_-46-pa.svg";

const TourPackages = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState([]);
  useEffect(() => {
    let url = "https://api.flyfarint.com/v.1.0.0/Package/Tour.php?all";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPackageData(data);
      });
  }, []);
  Swal.fire({
    imageUrl: Maintainence,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    title: "This section is under Maintenance",
    html: "<strong>This features is now under construction, if you have any queries please contact us at support@flyfarint.com or 01755-572099, 09606912912</strong>",
    confirmButtonColor: "#ffa84d",
    confirmButtonText: "Go Home",
  }).then(() => {
    navigate("/dashboard");
  });
  return (
    <Container maxWidth="xxl">
      {Object.keys(packageData).length !== 0 ? (
        <Box>
          <Stack justifyContent="center">
            {packageData.map((data, index) => (
              <TourPackage key={index} packageData={data} />
            ))}
          </Stack>
          <Box
            sx={{
              width: "100%",
              my: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            width: "70vw",
            marginInline: "auto",
          }}
        >
          <Box
            style={{
              width: "50%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Loader}
              alt="loader"
              style={{
                width: "50%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default TourPackages;
