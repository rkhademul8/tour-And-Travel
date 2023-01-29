import { Box, Tooltip, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SearchAll = () => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(false);
    fetch(`https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php`)
      .then((res) => res.json())
      .then((data) => {
        data?.allsearchlist?.map((item, index) => (item.serial = index + 1));
        setSearchData(data?.allsearchlist);
        setIsloading(true);
      });

    // const interval = setInterval(() => {
    //   const url = "https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php";
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       data?.allsearchlist?.map((item, index) => (item.serial = index + 1));
    //       setSearchData(data?.allsearchlist);
    //       setIsloading(true);
    //     });
    // }, [1000]);
    // return () => {
    //   clearInterval(interval);
    // };

    // setIsloading(false);
    // fetch(`https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     data?.allsearchlist?.map((item, index) => (item.serial = index + 1));
    //     setSearchData(data?.allsearchlist);
    //     setIsloading(true);
    //   });
  }, []);

  return (
    <Box className="DestinaTionWise1">
      <table>
        <tr>
          <th>Sl No</th>
          <th>Company </th>
          <th>Type</th>
          <th>Route</th>
          <th>Contact</th>
        </tr>

        {isLoading === true ? (
          <>
            {searchData.length !== 0 ? (
              <>
                {searchData?.map((data) => (
                  <tr>
                    <td>{data?.serial}</td>
                    <td>
                      <Tooltip
                        title={data?.company}
                        style={{ width: "50px", margin: "auto" }}
                      >
                        <span>
                          {data?.company?.slice(0, 10)}
                          ...
                        </span>
                      </Tooltip>
                    </td>
                    <td>
                      {data?.searchtype === "oneway" ? (
                        <button
                          style={{
                            border: "0",
                            borderRadius: "5px",
                            background: "#DC143C",
                            color: "#fff",
                            width: "90%",
                            height: "25px",
                            fontSize: "11px",
                          }}
                        >
                          {data?.searchtype}
                        </button>
                      ) : (
                        <button
                          style={{
                            border: "0",
                            borderRadius: "5px",
                            background: "#089326",
                            color: "#fff",
                            width: "90%",
                            height: "25px",
                            fontSize: "11px",
                          }}
                        >
                          {data?.searchtype}
                        </button>
                      )}
                    </td>

                    <td>{data?.Routes}</td>

                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <a href={`tel:+${data?.phone}`}>
                        <PhoneIcon
                          style={{
                            color: "#003566",
                            cursor: "pointer",
                            fontSize: "20px",
                            marginRight: "5px",
                          }}
                        ></PhoneIcon>
                      </a>

                      <a
                        href={`https://wa.me/+${data?.phone}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <WhatsAppIcon
                          style={{
                            color: "green",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <Typography
                style={{
                  textAlign: "center",
                  color: "#a7a7a7",
                  marginTop: "5px",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Sorry data not available
              </Typography>
            )}
          </>
        ) : (
          // <Typography
          //   style={{ textAlign: "center", color: "#dc144c", marginTop: "5px" }}
          // >
          //   Loading..
          // </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "38vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
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
  );
};

export default SearchAll;
