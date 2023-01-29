import { Grid, Typography, Button } from "@mui/material";
import { Box, fontWeight } from "@mui/system";
import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateDocument.css";

const UpdateDocument = ({
  handleIssueTicket,
  handleCloseUpdateModal,
  passengerData,
  setState,
}) => {
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [updateDocument, setUpdateDocument] = useState(passengerData);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleUpdateDocument = (index, paxId) => {
    const e = window.event;
    const field = e.target.name;
    const value = e.target.files[0];
    let url = `https://api.flyfarint.com/v.1.0.0/AirBooking/addDocs.php?paxId=${paxId}&${field}`;
    const formData = new FormData();
    formData.append("file", value);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      axios.post(url, formData, config).then((res) => {
        // console.log(res.data);
        if (res.data.status === "success") {
          const tempData = [...updateDocument];
          tempData[index] = {
            ...updateDocument[index],
            [field]: value,
            [`${field}ErrMsg`]: res.data.status,
          };
          setUpdateDocument(tempData);
        } else {
          const tempData = [...updateDocument];
          tempData[index] = {
            ...updateDocument[index],
            [field]: value,
            [`${field}ErrMsg`]: res.data.status,
          };
          setUpdateDocument(tempData);
        }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log(updateDocument);
  const handleDocumentSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Box className="update-document" sx={{ width: "100%" }}>
      <Typography
        style={{ fontSize: "20px", color: "#d3143c", fontWeight: "bold" }}
      >
        Passenger Upload Document
      </Typography>
      <form onSubmit={handleDocumentSubmit}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "10px 0px" }}
        >
          <Grid item lg={3} md={3} xs={3}>
            <Box>Passenger Name</Box>
          </Grid>
          <Grid item lg={3} md={3} xs={3}>
            <Box>Passenger Type</Box>
          </Grid>
          <Grid item lg={2} md={2} xs={2}>
            <Box> Gender</Box>
          </Grid>
          <Grid item lg={4} md={4} xs={4}>
            <Box>Update Document</Box>
          </Grid>
          <Grid />
        </Grid>
        <Box style={{ width: "100%", maxHeight: "180px", overflowY: "auto" }}>
          {updateDocument.map((item, index) => (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "10px 0px",
              }}
            >
              <Grid item lg={3} md={3} xs={3} sx={{ paddingBottom: "10px" }}>
                <Box> {`${item.fName} ${item.lName}`}</Box>
              </Grid>
              <Grid item lg={3} md={3} xs={3}>
                <Box>
                  {" "}
                  {item.type === "ADT"
                    ? "ADULT"
                    : item.type === "CNN"
                    ? "CHILD"
                    : "INFANT"}
                </Box>
              </Grid>
              <Grid item lg={1} md={1} xs={1}>
                <Box> {item.gender}</Box>
              </Grid>
              <Grid container item lg={5} md={5} xs={5}>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  style={{
                    position: "relative",
                  }}
                >
                  <label
                    htmlFor={`passportCopy${index}`}
                    style={{
                      backgroundColor: "#d3143c",
                      color: "#FFFF",
                      fontsize: "8px",
                      textAlign: "center",
                      padding: "5px",
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <input
                      type="file"
                      name="passportCopy"
                      id={`passportCopy${index}`}
                      accept="image/*,.pdf"
                      onChange={() => handleUpdateDocument(index, item.paxId)}
                      style={{ width: "100%", height: "100%", display: "none" }}
                    />
                    Choose Passport Copy
                  </label>

                  {item.passportCopy !== "" ? (
                    item.passportCopyErrMsg ? (
                      item.passportCopyErrMsg === "success" ? (
                        <Typography
                          variant="caption text"
                          style={{
                            color: "green",
                            fontWeight: "bold",
                            position: "absolute",
                            top: "100%",
                            left: "0",
                          }}
                        >
                          Uploaded
                        </Typography>
                      ) : (
                        <Typography
                          variant="caption text"
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            position: "absolute",
                            top: "100%",
                            left: "0",
                          }}
                        >
                          Error
                        </Typography>
                      )
                    ) : null
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  style={{
                    position: "relative",
                  }}
                >
                  <label
                    htmlFor={`visaCopy${index}`}
                    style={{
                      backgroundColor: "#d3143c",
                      color: "#FFFF",
                      fontsize: "8px",
                      textAlign: "center",
                      padding: "5px",
                      height: "100%",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <input
                      name="visaCopy"
                      id={`visaCopy${index}`}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={() => handleUpdateDocument(index, item.paxId)}
                      style={{ width: "100%", height: "100%", display: "none" }}
                    />
                    Choose Visa Copy
                  </label>
                  <Typography
                    variant="caption text"
                    style={{ position: "absolute", top: "100%", left: "0" }}
                  >
                    {item.visaCopy !== "" ? (
                      item.visaCopyErrMsg ? (
                        item.visaCopyErrMsg === "success" ? (
                          <Typography
                            variant="caption text"
                            style={{
                              color: "green",
                              fontWeight: "bold",
                              position: "absolute",
                              top: "100%",
                              left: "0",
                            }}
                          >
                            Uploaded
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption text"
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              position: "absolute",
                              top: "100%",
                              left: "0",
                            }}
                          >
                            Error
                          </Typography>
                        )
                      ) : null
                    ) : null}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Grid container rowSpacing={0}>
          <Grid item lg={12} md={12} xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleCloseUpdateModal}
                style={{
                  padding: "10px",
                  backgroundColor: "#d3143c",
                  color: "#fff",
                  borderRadius: "0px",
                }}
              >
                Ok
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateDocument;
