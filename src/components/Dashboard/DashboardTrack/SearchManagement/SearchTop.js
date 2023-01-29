import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SearchTop = () => {
  const [topSearch, setTOpSearch] = useState([]);
  const [isLoading, setIsloding] = useState(false);
  // //console.log(topSearch);

  useEffect(() => {
    setIsloding(false);
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        data?.DestinaTionWise1?.map((item, index) => (item.serial = index + 1));
        setTOpSearch(data?.DestinaTionWise1);
        setIsloding(true);
      });
  }, []);

  return (
    <Box className="DestinaTionWise1">
      <table>
        <tr>
          <th>Sl no</th>
          <th>Count</th>
          <th>Route</th>
          <th>Type</th>
        </tr>

        {isLoading === true ? (
          <>
            {topSearch.length !== 0 ? (
              <>
                {" "}
                {topSearch.map((data) => (
                  <tr>
                    <td>{data?.serial}</td>
                    <td>{data?.Search}</td>
                    <td>
                      {data?.DepFrom}-{data?.ArrTo}
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

export default SearchTop;
