import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SearchAgency = () => {
  const [agencyData, setAgencyData] = useState([]);
  const [isLoading, setIsloding] = useState(false);

  useEffect(() => {
    setIsloding(false);
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        data?.agentwise?.map((item, index) => (item.serial = index + 1));
        setAgencyData(data?.agentwise);
        setIsloding(true);
      });
  }, []);

  return (
    <Box className="DestinaTionWise1">
      <table>
        <tr>
          <th>Sl no</th>
          <th>Company Name</th>
          <th>Count</th>
          <th>Type</th>
        </tr>

        {isLoading === true ? (
          <>
            {agencyData.length !== 0 ? (
              <>
                {agencyData?.map((data) => (
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
                    <td>{data?.Search}</td>

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

export default SearchAgency;
