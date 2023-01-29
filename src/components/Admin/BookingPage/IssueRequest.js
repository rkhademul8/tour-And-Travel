import {
  Box,
  Typography,
  Button,
  Pagination,
  Stack,
  Tooltip,
  Modal,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import commaNumber from "comma-number";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../BookingManagement/BookingRoute.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2564B8",
      darker: "#dc143c",
    },
  },
});

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

const IssueRequest = () => {
  const user = secureLocalStorage.getItem("user-info");
  const navigate = useNavigate();
  const [issueData, setIssueData] = useState([]);
  const [mainAgentData, setMainAgentData] = useState([]);
  //  pagination handle
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;
  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setMainAgentData(issueData.slice((value - 1) * size, value * size));
  };

  useEffect(() => {
    const url = "https://api.flyfarint.com/v.1.0.0/Admin/Booking/all.php?all";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setMainAgentData(data);
        setIssueData(data);
      });
  }, []);

  //  search functionality handle
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;

    if (searchInput !== "") {
      const filterData = issueData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setMainAgentData(filterData);
    } else if (searchInput === "") {
      setMainAgentData(mainAgentData);
    }
  };

  //  send to issue details page
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
    <Box>
      <Box className="searchList1" my={2}>
        <input type="text" placeholder="search" onChange={handelSearchItems} />
      </Box>
      <Box className="balance-transaction" marginTop={"20px"}>
        <table>
          <tr>
            <th>Sl no</th>
            <th>Booking ID</th>
            <th>Status</th>
            <th>System</th>
            <th>PNR</th>
            <th>Company</th>
            <th>Book At</th>
            <th>PAX</th>
            <th>Balance</th>
            <th>PAX</th>
            <th>Contact </th>
          </tr>
          <tr>
            <td>1</td>
            <td>FF1563</td>
            <td>Hold</td>
            <td>Sabre</td>
            <td>XAGHUDA</td>
            <td>Zinga lala Travel</td>
            <td>21 Oct 2022</td>
            <td>DAC - DXB</td>
            <td>Round</td>
            <td>02</td>
            <td style={{}}>
              <a href={`#`}>
                <PhoneIcon
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "20px",
                    marginRight: "5px",
                  }}
                />
              </a>
              <a href={`#`} target="_blank" rel="noreferrer">
                <WhatsAppIcon
                  style={{
                    color: "green",
                    fontSize: "21px",
                    marginRight: "5px",
                  }}
                />
              </a>

              <a style={{ cursor: "pointer" }}>
                <EventNoteIcon
                  onClick={() => handleOpen()}
                  style={{ color: "#2564B8", fontSize: "20px" }}
                />
              </a>
            </td>
          </tr>
        </table>
      </Box>

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

      {/* 
      <p> </p>
  */}

      <Box
        sx={{
          width: "100%",
          my: 3,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderTop: "1px solid var(--primary-color)",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            my: 3,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",

            marginTop: "8px",
          }}
        >
          <Typography style={{ fontSize: "15px" }}>
            Showing Results 1 - 10 of 20
          </Typography>
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <Pagination
                size="small"
                //   count={pageCount}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default IssueRequest;
