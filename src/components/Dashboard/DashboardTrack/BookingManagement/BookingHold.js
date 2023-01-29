import { Box, Grid, Modal, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#fff",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const BookingHold = () => {
  const user = secureLocalStorage.getItem("user-info");
  const navigate = useNavigate();
  const [bookingHoldData, setBookingHoldData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(false);
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        const holdData = data?.TotalBookingData.filter((data) => {
          return data?.status === "Hold";
        });
        // //console.log(holdData);
        holdData?.map((item, index) => (item.serial = index + 1));
        setBookingHoldData(holdData);
        setIsloading(true);
      });

    // const interval = setInterval(() => {
    //   const url =
    //     "https://api.flyfarint.com/v.1.0.0/Admin/Booking/all.php?status=Hold";
    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {

    //       data?.map((item, index) => (item.serial = index + 1));
    //       setBookingHoldData(data);
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

  const sendToQueuesDetails = (data) => {
    navigate("/dashboard/manageWebsite/flyfarint/booking/queuesdetails", {
      state: {
        data,
      },
    });
  };

  //  modal
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = useState("");
  const [bookingId, setBookingId] = useState("");

  // data get from note api
  const [noteData, setNoteData] = useState([]);

  const handleOpen = async (bookingId) => {
    setOpen(true);
    setBookingId(bookingId);
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Admin/Notes/allNote.php?ref=${bookingId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNoteData(data);
      });
  };

  const handleClose = () => setOpen(false);

  const sendNote = () => {
    // //console.log(bookingId, note, user?.user?.username);
    let url = `https://api.flyfarint.com/v.1.0.0/Admin/Notes/addNote.php`;

    let body = JSON.stringify({
      ref: bookingId,
      note: note,
      actionBy: user?.user?.username,
      actionFrom: "ERP",
    });
    // //console.log("body", body);

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        // //console.log(data);
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Note added Successfully",
            confirmButtonText: "ok",
          });
        }
      });
    handleClose(false);
  };

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
          <th>Contact</th>
        </tr>

        {isLoading === true ? (
          <>
            {bookingHoldData.length !== 0 ? (
              <>
                {bookingHoldData?.map((data) => (
                  <tr>
                    <td>{data?.serial}</td>
                    <td>
                      {data?.status === "Cancelled" ? (
                        <button
                          disabled
                          style={{
                            background: "transparent",
                            border: "none",
                            backgroundColor: "#DEDEDE",
                            padding: "5px 15px",
                            color: "#003566",
                            textDecoration: "underline",
                          }}
                        >
                          {data?.bookingId}
                        </button>
                      ) : (
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "#d1e9ff",
                            padding: "5px 15px",
                            color: "#003566",
                            textDecoration: "underline",
                          }}
                          onClick={() => sendToQueuesDetails((data = data))}
                        >
                          {data?.bookingId}
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        style={{
                          border: "none",
                          borderRadius: "5px",
                          width: "90%",
                          fontSize: "10px",
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
                    <td>
                      <a href={`tel:+${data?.companyphone}`}>
                        <PhoneIcon
                          style={{ color: "#003566", fontSize: "18px" }}
                        />
                      </a>
                      <a
                        href={`https://wa.me/+${data?.companyphone}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <WhatsAppIcon
                          style={{ color: "green", fontSize: "18px" }}
                        />
                      </a>
                      <a style={{ cursor: "pointer" }}>
                        <EventNoteIcon
                          onClick={() => handleOpen(data?.bookingId)}
                          style={{ color: "#003566", fontSize: "18px" }}
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

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="noteParent">
            <Box>
              <Typography
                style={{
                  color: "#003566",
                  fontSize: "20px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}
              >
                Add Note
              </Typography>
            </Box>
            <form onSubmit={sendNote}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Create a new note"
                  style={{
                    border: "none",
                    width: "100%",
                    backgroundColor: "#e0ecfb",
                    height: "42px",
                    color: "black",
                    padding: "0px 10px",
                  }}
                  onChange={(e) => setNote(e.target.value)}
                />

                <button
                  style={{
                    backgroundColor: "#003566",
                    color: "white",
                    border: "none",
                    padding: "5px",
                    width: "140px",
                    height: "40px",
                    fontSize: "14px",
                  }}
                  type="submit"
                >
                  Save
                </button>
              </Box>
            </form>
            <Box
              className="lineParentBox"
              style={{ marginTop: "22px", height: "200px", overflowY: "auto" }}
            >
              {noteData &&
                noteData?.map((data) => (
                  <Grid container>
                    <Grid item xs={1}>
                      <Box className="note-line">
                        <Box
                          style={{
                            width: "14px",
                            height: "14px",
                            backgroundColor: "#DC143C",
                            position: "absolute",
                            left: "-8px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item mt="-3px" xs={11}>
                      <Typography
                        sx={{
                          color: "#003566",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        {data?.note}
                      </Typography>
                      <Box py={1}>
                        <Typography
                          sx={{
                            color: "#70A5D8",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {data?.actionBy}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#767676",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {data?.actionAt !== ""
                            ? format(
                                new Date(data?.actionAt),
                                "dd MMM yyyy hh:mm a"
                              )
                            : "Transaction Date"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default BookingHold;
