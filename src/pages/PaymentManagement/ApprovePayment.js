import React, { useEffect, useState } from "react";

import {
  Pagination,
  Stack,
  Tooltip,
  CircularProgress,
  Grid,
  Modal,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Container, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import commaNumber from "comma-number";
import { format } from "date-fns";
import PhoneIcon from "@mui/icons-material/Phone";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./AllPayment.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2564b8",
      darker: "#2564b8",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

const ApprovePayment = () => {
  const user = secureLocalStorage.getItem("admin-info");
  const agentID = user?.user?.agentId;

  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState([]);
  const [mainAgentData, setMainAgentData] = useState([]);
  //  pagination handle
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);

  let size = 20;
  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setMainAgentData(paymentData.slice((value - 1) * size, value * size));
  };

  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgentDeposit/allDeposit.php?agentId=${agentID}&status=approved&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data?.number_of_page);
        setMainAgentData(data);
        setPaymentData(data);
        setIsloading(true);
      });
  }, [page]);

  //  search functionality handle
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = paymentData.filter((item) => {
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

  // modal
  const [open, setOpen] = React.useState(false);

  const [id, setId] = useState("");
  const [reason, setReason] = useState("");

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // payment approved function
  const handleApprove = (id) => {
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgentDeposit/approved.php`;
    let body = JSON.stringify({
      id: id,
      actionBy: "Agent",
    });
    // console.log(body);
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
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Payment Approved Successfully",
            confirmButtonText: "ok",
          }).then(() => {
            navigate(0);
          });
        }
      });
  };

  // payment reject function
  const handleReject = () => {
    let url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgentDeposit/rejected.php?`;

    let body = JSON.stringify({
      id: id,
      agentId: agentID,
      actionBy: user?.user?.name,
      reason: reason,
    });

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
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "Payment Reject Successfully",
            confirmButtonText: "ok",
          }).then(() => {
            navigate(0);
          });
        }
      });

    handleClose();
  };

  return (
    <Box>
      <Box className="searchList1" mb={2}>
        <input type="text" placeholder="search" onChange={handelSearchItems} />
      </Box>
      <Box className="balance-transaction" marginTop={"20px"}>
        {isLoading === true ? (
          <table>
            <thead>
              <tr>
                <th>Agent Id</th>
                <th>Status</th>
                <th>Company Name</th>
                <th>Payment Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Transaction Id</th>
                <th>Amount </th>
                <th>Date </th>
                <th>Attachment </th>
                <th>Operation</th>
                <th>Contact</th>
              </tr>
              {mainAgentData.map((data) => (
                <tr>
                  <td>{data?.agentId}</td>
                  <td>{data?.status}</td>

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
                      title={data?.paymentway}
                      style={{ width: "50px", margin: "auto" }}
                    >
                      <span>
                        {data?.paymentway?.slice(0, 10)}
                        ...
                      </span>
                    </Tooltip>
                  </td>

                  <td>
                    <Tooltip
                      title={data?.sender}
                      style={{ width: "50px", margin: "auto" }}
                    >
                      <span>
                        {data?.sender?.slice(0, 10)}
                        ...
                      </span>
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip
                      title={data?.receiver}
                      style={{ width: "50px", margin: "auto" }}
                    >
                      <span>
                        {data?.receiver?.slice(0, 10)}
                        ...
                      </span>
                    </Tooltip>
                  </td>
                  <td>{data?.transactionId}</td>
                  <td>
                    {commaNumber(Number(parseInt(parseInt(data?.amount))))} ৳
                  </td>
                  <td>
                    {data?.createdAt
                      ? format(new Date(data?.createdAt), "dd MMM yyyy hh:mm a")
                      : "Action By"}
                  </td>
                  <td>
                    {" "}
                    <a
                      href={`https://cdn.flyfarint.com/WL/${data?.subagentId}/Deposit/${data?.attachment}`}
                      target="_blank"
                    >
                      View
                    </a>
                  </td>
                  <td>
                    {data?.status === "rejected" ? (
                      <button
                        disabled
                        style={{
                          background: "var(--void)",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "3px",
                          width: "73px",
                          height: "30px",
                          fontSize: "12px",
                        }}
                      >
                        Reject
                      </button>
                    ) : data?.status === "approved" ? (
                      <>
                        <button
                          disabled
                          style={{
                            background: "var(--tomato-color)",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "3px",
                            width: "73px",
                            height: "30px",
                            fontSize: "12px",
                          }}
                        >
                          Approved
                        </button>
                      </>
                    ) : (
                      <>
                        <IconButton
                          sx={{ color: "#0E8749" }}
                          onClick={() => handleApprove(data?.id)}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "var(--remove-color)" }}
                          onClick={() =>
                            handleClickOpen(data?.id, data?.agentId)
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    )}
                  </td>

                  <td>
                    <td style={{ display: "flex" }}>
                      <a href={`tel:+${data?.phone}`}>
                        <PhoneIcon
                          style={{ color: "#003566", fontSize: "18px" }}
                        />
                      </a>
                      <a href={`https://wa.me/+${data?.phone}`} target="_blank">
                        <WhatsAppIcon
                          style={{ color: "green", fontSize: "18px" }}
                        />
                      </a>
                    </td>
                  </td>
                </tr>
              ))}
            </thead>
            <tbody></tbody>
          </table>
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

        {/* Rejection model star here */}

        <div>
          <form>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Rejection Reason"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <input
                    required
                    style={{
                      width: "100%",
                      outline: "none",
                      padding: "6px 5px",
                      border: "1px solid var(--flyhub)",
                      borderRadius: "3px",
                    }}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleReject}>Save</Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>

        {/* Rejection model end here */}

        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
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
                <Typography style={{ fontSize: "15px", color: "#222222" }}>
                  Showing Results {page} - {pageCount}
                </Typography>
                <ThemeProvider theme={theme}>
                  <Stack spacing={2}>
                    <Pagination
                      size="small"
                      count={pageCount}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </ThemeProvider>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ApprovePayment;
