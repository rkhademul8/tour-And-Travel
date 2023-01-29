import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import commaNumber from "comma-number";
import CircularProgress from "@mui/material/CircularProgress";

const DepositApprove = () => {
  const [allDepositData, setAllDepositData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(false);
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        const approveDepositData = data?.TotalDepositData.filter((data) => {
          return (data.status = "active");
        });

        approveDepositData?.map((item, index) => (item.serial = index + 1));
        setAllDepositData(approveDepositData);
        setIsloading(true);
        // //console.log(data);
      });
  }, []);

  return (
    <Box className="DestinaTionWise1">
      <table>
        <tr>
          <th>SL No</th>
          <th>Deposit Id</th>
          <th>Status</th>
          <th>Company</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Approve By</th>
        </tr>
        {isLoading === true ? (
          <>
            {allDepositData.length !== 0 ? (
              <>
                {allDepositData.map((data) => (
                  <tr>
                    <td>{data?.serial}</td>
                    <td>{data?.depositId}</td>
                    <td>
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
                        {data?.status}
                      </button>
                    </td>
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
                    <td>{data?.paymentway}</td>
                    <td>{commaNumber(Number(data?.amount))}</td>
                    <td>{data?.approvedBy}</td>
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
              marginTop: "10px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </table>
    </Box>
  );
};

export default DepositApprove;
