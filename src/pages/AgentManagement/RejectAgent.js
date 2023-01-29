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

const theme = createTheme({
  palette: {
    primary: {
      main: "#2564b8",
      darker: "#2564b8",
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
const RejectAgent = () => {
  const [isLoading, setIsloading] = useState(false);
  const [subAgentData, setSubAgentData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const [agentId, setAgentId] = useState([]);

  // Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  // Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchData(subAgentData.slice((value - 1) * size, value * size));
  };

  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
        "www.",
        ""
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgent/all.php?agentId=${data?.agentId}&all`
        )
          .then((res) => res.json())
          .then((data) => {
            const rejectData = data?.filter((filterRejectData) => {
              return filterRejectData?.status === "reject";
            });
            // console.log(rejectData);
            const count = rejectData.length;
            const pageNumber = Math.ceil(count / size);
            setPageCount(pageNumber);
            setSearchData(rejectData);
            setSubAgentData(rejectData);
            setIsloading(true);
          });
      });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgent/all.php?agentId=${agentId}&all`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const rejectData = data.filter((filterRejectData) => {
  //           return filterRejectData?.status === "reject";
  //         });

  //         const count = rejectData.length;
  //         const pageNumber = Math.ceil(count / size);
  //         setPageCount(pageNumber);
  //         setSearchData(rejectData);
  //         setSubAgentData(rejectData);
  //         setIsloading(true);
  //       });
  //   };

  //   fetchData();
  // }, [agentId]);

  //    Sub-agent Active function
  const handleActive = async (subAgentId) => {
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgent/status.php?status=active&subagentId=${subAgentId}`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "SubAgent Activate Successfully",
            confirmButtonText: "ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  // Sub-agent deactivate function
  const handleDeactivate = async (subAgentId) => {
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgent/status.php?status=deactivate&subagentId=${subAgentId}`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "SubAgent Deactivate Successfully",
            confirmButtonText: "ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  // Sub-agent reject function
  const handleReject = async (subAgentId) => {
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/SubAgent/status.php?status=reject&subagentId=${subAgentId}`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "success",
            text: "SubAgent Reject Successfully",
            confirmButtonText: "ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  // handle search

  //  handle search
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = subAgentData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSearchData(filterData);
    } else if (searchInput === "") {
      setSearchData(subAgentData);
    }
  };

  return (
    <Box>
      <Box className="searchList1" my={2}>
        <input type="text" placeholder="search" onChange={handelSearchItems} />
      </Box>
      <Box className="balance-transaction agentModal" marginTop={"20px"}>
        {isLoading === true ? (
          <>
            <table>
              <tr>
                <th> SubAgent Id</th>
                <th>Status</th>
                <th>Agent Name</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Balance</th>
                <th>Operation</th>
                <th>Call</th>
              </tr>
              {searchData?.slice(0, size)?.map((data) => (
                <tr>
                  <td>{data?.subagentId}</td>
                  <td>{data?.status}</td>
                  <td>{data?.name}</td>
                  <td>
                    {" "}
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
                    {" "}
                    <Tooltip
                      title={data?.address}
                      style={{ width: "50px", margin: "auto" }}
                    >
                      <span>
                        {data?.address?.slice(0, 10)}
                        ...
                      </span>
                    </Tooltip>
                  </td>

                  <td>{data?.email}</td>
                  <td>{data?.phone}</td>

                  <td>
                    {/* {commaNumber(Number(parseInt(data?.lastBalance)))} ৳  */}
                    No data
                  </td>

                  <td>
                    {data?.status === "active" ? (
                      <button
                        style={{
                          backgroundColor: "#E1241A",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "3px",
                          width: "73px",
                          height: "30px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                        onClick={() => handleDeactivate(data?.subagentId)}
                      >
                        Deactivate
                      </button>
                    ) : data?.status === "reject" ? (
                      <button
                        disabled
                        style={{
                          backgroundColor: "var(--gray)",
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
                    ) : (
                      <Box>
                        <IconButton
                          sx={{ color: "#0E8749" }}
                          onClick={() => handleActive(data?.subagentId)}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          sx={{ color: "var(--remove-color)" }}
                          onClick={() => handleReject(data?.subagentId)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Box>
                    )}
                  </td>
                  <td>
                    <a
                      href={`tel:+${data?.phone}`}
                      style={{ marginRight: "5px" }}
                    >
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

                    {/* <a style={{ cursor: "pointer" }}>
                      <EventNoteIcon
                        // onClick={() => handleOpen2(data?.agentId)}
                        style={{ color: "#003566", fontSize: "18px" }}
                      />
                    </a> */}
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

export default RejectAgent;
