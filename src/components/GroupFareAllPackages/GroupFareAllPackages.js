import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../../images/loader/Render.gif";
import { addDays } from "date-fns/esm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Maintainence from "../../images/undraw/undraw_under_construction_-46-pa.svg";
import GroupFilterData from "../GroupFilterData/GroupFilterData";
import GroupFare from "../GroupFare/GroupFare";
const GroupFareAllPackages = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groupData, setGroupData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const navigate = useNavigate();
  const [noData, setNoData] = useState("No Data");

  useEffect(() => {}, []);
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
    <Box style={{ display: "none" }}>
      {!isLoaded ? (
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
                width: "40%",
                objectFit: "center",
              }}
            />
          </Box>
        </Box>
      ) : (
        <Grid container columnSpacing={2}>
          <Grid item lg={2.7}>
            <Box>
              <GroupFilterData
                groupData={groupData}
                setGroupData={setGroupData}
                filteredData={filteredData}
                setfilteredData={setfilteredData}
                noData={noData}
                setNoData={setNoData}
              />
            </Box>
          </Grid>
          <Grid item lg={9.3} p={"24px"}>
            {filteredData.length === 0 ? (
              <Typography
                position="absolute"
                top="50%"
                left="50%"
                fontSize={"50px"}
                textAlign="center"
              >
                No Data Found
              </Typography>
            ) : (
              <>
                {filteredData.map((data, index) => {
                  return <GroupFare data={data} key={index} />;
                })}
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default GroupFareAllPackages;
