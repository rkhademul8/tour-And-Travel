import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import secureLocalStorage from "react-secure-storage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { format } from "date-fns";
import commaNumber from "comma-number";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import humanizeDuration from "humanize-duration";

const theme = createTheme({
  palette: {
    primary: {
      main: "#dc143c",
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

const AgentFailed = () => {
  const user = secureLocalStorage.getItem("admin-info");
  const navigate = useNavigate();
  const [agentFailed, setAgentFailed] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [state, setState] = useState(false);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchData(agentFailed.slice((value - 1) * size, value * size));
  };

  useEffect(() => {
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Agent/failedAgent.php?all")
      .then((res) => res.json())
      .then((data) => {
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setSearchData(data);
        setAgentFailed(data);
        setIsloading(true);
      });
  }, [state]);

  //    handle search
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = agentFailed.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setSearchData(filterData);
    } else if (searchInput === "") {
      setSearchData(agentFailed);
    }
  };

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

  const handleAgentDelete = (agentId) => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Admin/Agent/failedDelete.php?id=${agentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Agent has been Deleted!",
            confirmButtonText: "Ok",
          }).then(function () {
            setState((prev) => !prev);
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "Agent Delete Failed!",
            confirmButtonText: "Try again",
          }).then(function () {
            setState((prev) => !prev);
          });
        }
      });
  };

  //  modal
  const [open2, setOpen2] = React.useState(false);
  const [note, setNote] = useState("");
  const [agentId, setAgentId] = useState("");

  // data get from note api
  const [noteData, setNoteData] = useState([]);

  const handleOpen2 = async (agentId) => {
    setOpen2(true);
    setAgentId(agentId);
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Admin/Notes/allNote.php?ref=${agentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNoteData(data);
      });
  };

  const handleClose2 = () => setOpen2(false);

  const sendNote = () => {
    let url = `https://api.flyfarint.com/v.1.0.0/Admin/Notes/addNote.php`;

    let body = JSON.stringify({
      ref: agentId,
      note: note,
      actionBy: user?.user?.username,
      actionFrom: "ERP",
    });
    // console.log("body", body);

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
        // console.log(data);
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Note added Successfully",
            confirmButtonText: "ok",
          });
        }
      });
    handleClose2(false);
  };
  return (
    <Box>
      <Box className="searchList1" my={2}>
        <input type="text" placeholder="search" onChange={handelSearchItems} />
      </Box>
      <Box className="balance-transaction" marginTop={"20px"}>
        {isLoading === true ? (
          <>
            <table>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Company Name</th>
                <th>Company Address</th>
                <th>Sign up At</th>
                <th>Action</th>
                <th>Call</th>
              </tr>
              {searchData.slice(0, size).map((data) => (
                <tr>
                  <td>{data?.name}</td>
                  <td>{data?.status}</td>
                  <td>{data?.email}</td>
                  <td>{data?.phone}</td>
                  <td>{data?.password}</td>
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
                    <Tooltip
                      title={data?.companyadd}
                      style={{ width: "50px", margin: "auto" }}
                    >
                      <span>
                        {data?.companyadd?.slice(0, 10)}
                        ...
                      </span>
                    </Tooltip>
                  </td>
                  <td>
                    {" "}
                    {data?.joinAt
                      ? shortEnglishHumanizer(
                          Math.abs(new Date(data?.joinAt) - new Date())
                        )
                      : "Not Found"}
                  </td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "var(--remove-color)",
                        color: "white",
                        fontSize: "12px",
                      }}
                      onClick={() => handleAgentDelete(data?.id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td style={{ display: "flex" }}>
                    <a href={`tel:+${data?.phone}`}>
                      <PhoneIcon
                        style={{ color: "#003566", fontSize: "18px" }}
                      />
                    </a>
                    <a
                      href={`https://wa.me/+${data?.phone}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsAppIcon
                        style={{ color: "green", fontSize: "18px" }}
                      />
                    </a>
                    <a style={{ cursor: "pointer" }}>
                      <EventNoteIcon
                        onClick={() => handleOpen2(data?.id)}
                        style={{ color: "#003566", fontSize: "18px" }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </table>
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

        <Box>
          <Modal
            open={open2}
            onClose={handleClose2}
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
                style={{
                  marginTop: "22px",
                  height: "200px",
                  overflowY: "auto",
                }}
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
                            fontWeight: 400,
                          }}
                        >
                          {data?.note}
                        </Typography>
                        <Box py={1}>
                          <Typography
                            sx={{
                              color: "#70A5D8",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {data?.actionBy}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#767676",
                              fontSize: "12px",
                              fontWeight: 400,
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

        <Box
          sx={{
            width: "100%",
            my: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
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

export default AgentFailed;
