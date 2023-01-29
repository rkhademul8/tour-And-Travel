import { Box, Grid, Modal, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventNoteIcon from "@mui/icons-material/EventNote";
import commaNumber from "comma-number";
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

const DepositReject = () => {
  const user = secureLocalStorage.getItem("user-info");
  const [rejectData, setRejectData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(false);
    fetch("https://api.flyfarint.com/v.1.0.0/Admin/Stats/Dashboard.php")
      .then((res) => res.json())
      .then((data) => {
        const rejectDataFilter = data?.TotalDepositData.filter((data) => {
          return data.status === "rejected";
        });
        rejectDataFilter?.map((item, index) => (item.serial = index + 1));
        setRejectData(rejectDataFilter);
        setIsloading(true);
      });
  }, []);

  //  modal
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = useState("");
  const [depositId, setDepositId] = useState("");

  // data get from note api
  const [noteData, setNoteData] = useState([]);

  const handleOpen = async (depositId) => {
    setOpen(true);
    setDepositId(depositId);
    await fetch(
      `https://api.flyfarint.com/v.1.0.0/Admin/Notes/allNote.php?ref=${depositId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNoteData(data);
      });
  };

  const handleClose = () => setOpen(false);

  const sendNote = () => {
    // //console.log(depositId, note, user?.user?.username);
    let url = `https://api.flyfarint.com/v.1.0.0/Admin/Notes/addNote.php`;

    let body = JSON.stringify({
      ref: depositId,
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
          <th>SL No</th>
          <th>Deposit Id</th>
          <th>Status</th>
          <th>Company</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Reject By</th>
          <th>Contact</th>
        </tr>

        {isLoading === true ? (
          <>
            {rejectData.length !== 0 ? (
              <>
                {rejectData.map((data) => (
                  <tr>
                    <td>{data?.serial}</td>
                    <td>{data?.depositId}</td>
                    <td>
                      {" "}
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
                    <td>{data?.rejectBy}</td>
                    <td>
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
                          onClick={() => handleOpen(data?.depositId)}
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
              marginTop: "10px",
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

export default DepositReject;
