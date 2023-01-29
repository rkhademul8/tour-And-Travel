import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import commaNumber from "comma-number";
import { format } from "date-fns/esm";
import Loader from "../../../images/loader/Render.gif";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import secureLocalStorage from "react-secure-storage";
// import ReactPDF from "@react-pdf/renderer";
import NoData from "../../Shared/NoData/NoData";

const Others = () => {
  const users = secureLocalStorage.getItem("user-info");
  let agentId = users?.user?.agentId;
  let staffId = users?.user?.staffId;
  const [allData, setAllData] = useState([]);
  const [others, setOthers] = useState([]);
  const [item, setItem] = useState({});
  const [loaded, setLoaded] = useState(false);

  //todo: states for attachment view
  const [viewAttchment, setViewAttchment] = useState(false);
  const openAttchment = () => setViewAttchment(true);
  const closeAttchment = () => setViewAttchment(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 500,
    p: 5,
    backgroundColor: "#fff",
    borderRadius: "10px",
  };
  //todo: end of attachment view
  // todo:Sets the state of the const for the given page and state.
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("20");

  useEffect(() => {
    setLoaded(true);
    let url = `https://api.flyfarint.com/v.1.0.0/Queues/Booking.php?agentId=${agentId}&allother`;
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoaded(false);
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setAllData(data);
        setOthers(data);
      });
  }, [agentId, size]);

  //todo: handle view Attachments

  //todo: Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setOthers(allData?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  //todo: convert first character uppercase
  const firstCharUpper = (text) => {
    let lowerCaseText = text?.toLowerCase()?.trim()?.split(" ");
    for (const n of lowerCaseText) {
      return n.replace(n[0], n[0].toUpperCase());
    }
  };

  //todo: handle searchItem
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;

    if (searchInput !== "") {
      const filterData = allData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setOthers(filterData);
    } else if (searchInput === "") {
      setOthers(allData);
    }
  };
  //todo: end of handle searchItem
  //todo: handle search value
  const handleChangeOption = (e) => {
    const optionValue = e.target.value;
    if (optionValue !== "") {
      const filterData = allData.filter(
        (item) => item.serviceType.toLowerCase() === optionValue.toLowerCase()
      );
      setOthers(filterData);
    } else {
      setOthers(allData);
    }
  };
  //todo:end of handle search value

  //todo: loader

  if (loaded) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          width: "70vw",
          marginInline: "auto",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Loader}
            alt="loader"
            style={{
              width: "40%",
              objectFit: "center",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className={"q-box"} mt="20px">
        <Container className="queues-parent" maxWidth="xxl">
          <Box className="queues-search-box">
            <Grid
              className="queues-search-box-flied"
              container
              justifyContent="space-between"
              spacing={2}
            >
              <Grid className="queues-input-search" item xs={12} sm={6} md={4}>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handelSearchItems}
                ></input>
                <span id="search-icon5">
                  <AiOutlineSearch
                    style={{ fontSize: "24px", color: "#EB2227" }}
                  />
                </span>
              </Grid>
              <Grid
                className="queues-filter"
                item
                xs={6}
                sm={6}
                md={2}
                textAlign="right"
              >
                <select
                  onChange={handleChangeOption}
                  className="queues-select-01"
                >
                  <option value="">Show All</option>
                  <option value="Air Ticket">Air Ticket</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Work Visa">Work Visa</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Tour Package">Tour Package</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Refund">Refund</option>
                  <option value="Reissue">Reissue</option>
                  <option value="Void">Void</option>
                  <option value="Other">Other</option>
                </select>
              </Grid>
            </Grid>
          </Box>
          {Object.keys(allData).length !== 0 ? (
            <Box>
              <Box style={{ overflowX: "auto" }} className="deposite-tables">
                <table className="deposite-table ">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Reference No</th>
                      {/* <th>Company Name</th> */}
                      {/* <th>Phone</th> */}
                      <th>Description</th>
                      <th>Service Type</th>
                      {/* <th>Created By</th> */}
                      <th>Created Time</th>
                      <th>Amount</th>
                      <th>Attachment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {others?.slice(0, size)?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.serial || "No"}</td>
                        <td>{item?.reference || "Reference No"}</td>
                        {/* <td>
                          {item?.companyname ? (
                            <Tooltip
                              title={
                                <Typography
                                  variant="subtitle2"
                                  style={{ fontSize: "12px" }}
                                >
                                  {item?.companyname}
                                </Typography>
                              }
                            >
                              <Typography
                                variant="subtitle2"
                                style={{ fontSize: "12px" }}
                              >
                                {item?.companyname.slice(0, 10)}...
                              </Typography>
                            </Tooltip>
                          ) : (
                            "Company Name"
                          )}
                        </td> */}
                        {/* <td>{item?.companyphone || "Phone"}</td> */}
                        <td>
                          {item?.description ? (
                            <Tooltip
                              title={
                                <Typography
                                  variant="subtitle2"
                                  style={{ fontSize: "12px" }}
                                >
                                  {item?.description}
                                </Typography>
                              }
                            >
                              <Typography
                                variant="subtitle2"
                                style={{ fontSize: "12px" }}
                              >
                                {item?.description.slice(0, 40)}...
                              </Typography>
                            </Tooltip>
                          ) : (
                            "Description"
                          )}
                        </td>
                        <td>{item?.serviceType || "Service Type"}</td>

                        {/* <td>
                          {firstCharUpper(item?.createdBy) || "Created By"}

                        
                        </td> */}

                        <td>
                          {item.createdAt
                            ? format(
                                new Date(item?.createdAt),
                                "dd MMM yy hh:mm a"
                              )
                            : "Created By"}
                        </td>
                        <td>
                          {item?.amount
                            ? `${commaNumber(item?.amount)} BDT`
                            : "Amount"}
                        </td>
                        <td>
                          <button
                            style={{
                              width: "50%",
                              height: "100%",
                              background: "#d3143c",
                              color: "#fff",
                              padding: "5px",
                              border: "none",
                              borderRadius: "3px",
                              textTransform: "uppercase",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (item.attachment.endsWith(".pdf")) {
                                window.open(item?.attachment);
                              } else {
                                openAttchment();
                              }
                              setItem(item);
                            }}
                          >
                            view
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>

              {allData.length > size ? (
                <Grid container>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box
                      sx={{
                        width: "100%",
                        my: 3,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Stack spacing={2}>
                        <Pagination
                          count={pageCount}
                          onChange={handlePageChange}
                          shape="rounded"
                        />
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          ) : (
            <>
              <NoData />
            </>
          )}
        </Container>
      </Box>
      <Modal open={viewAttchment} onClose={closeAttchment}>
        <Box sx={style}>
          {item?.attachment ? (
            <img
              src={item?.attachment}
              alt="..."
              style={{
                width: "100%",
                height: "100%",
                // objectFit: "cover",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Others;
