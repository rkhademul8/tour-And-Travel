import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import humanizeDuration from "humanize-duration";
import CircularProgress from "@mui/material/CircularProgress";

const BookingCancelled = () => {
  const [cancelledData, setCanceledData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  // //console.log(cancelledData);
  useEffect(() => {
    setIsloading(false);
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        const cancellDataFilter = data?.TotalBookingData.filter(
          (refundData) => {
            return refundData.status === "Cancelled";
          }
        );
        // //console.log(cancellDataFilter);
        cancellDataFilter?.map((item, index) => (item.serial = index + 1));
        setCanceledData(cancellDataFilter);
        setIsloading(true);
      });

    // const interval = setInterval(() => {
    //   const url = "https://api.flyfarint.com/v.1.0.0/Admin/Booking/all.php?all";
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       data?.map((item, index) => (item.serial = index + 1));
    //       setCanceledData(data);
    //       setIsloading(true);
    //     });
    // }, [500]);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    round: true,
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
      },
    },
  });
  return (
    <Box className="DestinaTionWise1">
      <table>
        <tr>
          <th>Sl no</th>
          <th>Booking Id</th>
          <th>Status</th>
          <th>System</th>
          <th>PNR</th>
          <th>Company</th>
          <th>Time</th>
          <th>Route</th>
          <th>Type</th>
        </tr>

        {isLoading === true ? (
          <>
            {cancelledData.length !== 0 ? (
              <>
                {cancelledData.map((data) => (
                  <tr>
                    <td>{data?.serial}</td>
                    <td>{data?.bookingId}</td>
                    <td>
                      <button
                        style={{
                          border: "none",
                          borderRadius: "5px",
                          width: "90%",
                        }}
                        className={`${data?.status
                          ?.toLowerCase()
                          ?.split(" ")
                          ?.join("-")}-btn`}
                      >
                        {data?.status}
                      </button>
                    </td>
                    <td>{data?.gds}</td>
                    <td>{data?.pnr}</td>

                    <td>
                      <Tooltip
                        title={data?.companyname}
                        style={{ width: "50px", margin: "auto" }}
                      >
                        <span>
                          {data?.companyname?.slice(0, 10)}
                          ...
                        </span>
                      </Tooltip>
                    </td>

                    <td>
                      {data?.bookedAt
                        ? shortEnglishHumanizer(
                            Math.abs(new Date(data?.bookedAt) - new Date())
                          )
                        : "Not Found"}
                    </td>
                    <td>{data?.deptFrom + "-" + data?.arriveTo}</td>
                    <td>{data?.tripType}</td>
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
    </Box>
  );
};

export default BookingCancelled;
