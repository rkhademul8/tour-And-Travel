import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import "./FileUploadSection.css";

const FileUploadSection = ({ handleCloseUpdateModal, passengerData }) => {
  const navigate = useNavigate();
  const [updateDocument, setUpdateDocument] = useState(passengerData);
  // const [selectedImages, setSelectedImages] = useState([]);

  const handleUpdateDocument = (index, paxId) => {
    const e = window.event;
    const field = e.target.name;
    const value = e.target.files[0];
    //todo: preview image
    // const selectedFiles = e.target.files;
    // //console.log(typeof URL.createObjectURL(value));
    // const selectedFilesArray = Array.from(selectedFiles);
    // const imagesArray = selectedFilesArray.map((file) => {
    //   return URL.createObjectURL(file);
    // });
    // //console.log(imagesArray);
    // setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    //todo: end preview images
    const newDocument = updateDocument.map((i, ind) => {
      if (ind === index) {
        i[field] = value;
        i[`${field}Preview`] = URL.createObjectURL(value);
      }
      return i;
    });
    setUpdateDocument(newDocument);

    let url = `https://api.flyfarint.com/v.1.0.0/AirBooking/addDocs.php?paxId=${paxId}&${field}`;
    // //console.log(url);
    const formData = new FormData();
    formData.append("file", value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      axios.post(url, formData, config).then((res) => {
        // //console.log(res.data);
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
    // FOR BUG IN CHROME
    e.target.value = "";
  };
  const handleDocumentSubmit = (e) => {
    e.preventDefault();
  };

  function deleteHandler(field, value, index) {
    const image = URL.revokeObjectURL(value);
    const newDocument = updateDocument.map((i, ind) => {
      if (ind === index) {
        i[field] = "";
      }
      return i;
    });
    setUpdateDocument(newDocument);
  }

  //console.log(updateDocument);
  // //console.log(selectedImages);

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
        <Box style={{ width: "100%", height: "140px", overflowY: "auto" }}>
          {passengerData.map((item, index) => (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{
                padding: "10px 0px",
                height: "100%",
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
              <Grid
                container
                item
                lg={5}
                md={5}
                xs={5}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  style={{
                    position: "relative",
                    height: "100px",
                    top: "50%",
                    border: "dotted 1px #9999",
                    padding: "5px",
                  }}
                >
                  <label
                    htmlFor={`passportCopy${index}`}
                    style={{
                      backgroundColor: "transparent",
                      color: "#999",
                      fontsize: "8px",
                      position: "relative",
                      display: "inline-block",
                      height: "100%",
                      width: "100%",
                      textAlign: "center",
                      verticalAlign: "middle",
                      lineHeight: "100%",
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

                    <img
                      src={
                        updateDocument[index].passportCopyPreview ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="..."
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </label>
                  <Typography
                    variant="caption text"
                    style={{ position: "absolute", top: "100%", left: "0" }}
                  >
                    {updateDocument[index].passportCopy !== "" ? (
                      updateDocument[index].passportCopyErrMsg ? (
                        updateDocument[index].passportCopyErrMsg ===
                        "success" ? (
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
                  <CancelIcon
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "-10px",
                    }}
                    onClick={() =>
                      deleteHandler(
                        "passportCopyPreview",
                        updateDocument[index].passportCopyPreview,
                        index
                      )
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  xs={6}
                  style={{
                    position: "relative",
                    height: "100px",
                    top: "50%",
                    border: "dotted 1px #9999",
                    padding: "5px",
                  }}
                >
                  <label
                    htmlFor={`visaCopy${index}`}
                    style={{
                      backgroundColor: "transparent",
                      color: "#999",
                      fontsize: "8px",
                      position: "relative",
                      display: "inline-block",
                      height: "100%",
                      width: "100%",
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
                    <img
                      src={
                        updateDocument[index].visaCopyPreview ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="..."
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </label>
                  <Typography
                    variant="caption text"
                    style={{ position: "absolute", top: "100%", left: "0" }}
                  >
                    {updateDocument[index].visaCopy !== "" ? (
                      updateDocument[index].visaCopyErrMsg ? (
                        updateDocument[index].visaCopyErrMsg === "success" ? (
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
                  <CancelIcon
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "-10px",
                    }}
                    onClick={() =>
                      deleteHandler(
                        "visaCopyPreview",
                        updateDocument[index].visaCopyPreview,
                        index
                      )
                    }
                  />
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
                onClick={() => {
                  handleCloseUpdateModal();
                  navigate(0);
                }}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#d3143c",
                  color: "#fff",
                  borderRadius: "5px",
                }}
              >
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FileUploadSection;
