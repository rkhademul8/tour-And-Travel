import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  Grid,
  Modal,
  Skeleton,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "50vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  outline: "none",
};

export const UPdateWebsiteInfo = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [previewImage, setPreviewImage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [favicon1, setFavIcon1] = useState(null);
  const [favicon2, setFavIcon2] = useState(null);
  const [favicon3, setFavIcon3] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [siteConfig, setSiteConfig] = useState({});

  useEffect(() => {
    //todo: fetching the data
    axios
      .get(
        `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/all.php?website=${window.location.hostname.replace(
          "www.",
          ""
        )}`
      )
      .then((res) => {
        setSiteConfig(res?.data);
        setAgentId(res?.data?.agentId);
        setCompanyName(res?.data?.company_name);
        setFavIcon1(res?.data?.favicon1);
        setFavIcon2(res?.data?.favicon2);
        setFavIcon3(res?.data?.favicon3);
      });
  }, []);

  //todo: update Text field
  const updateData = async (name, value) => {
    setIsLoading(true);
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/add.php?option=${name}&agentId=${agentId}`;
    const body = {
      method: "POST",
      "application-type": "application/json",
      body: JSON.stringify({
        data: value,
      }),
    };
    await fetch(url, body)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status.toLowerCase() === "success") {
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire({
          imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err.message,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(function () {
          caches
            .keys()
            .then((keyList) =>
              Promise.all(keyList.map((key) => caches.delete(key)))
            );
          window.location.reload(true);
        });
      });
  };

  //todo:file upload section
  const handleUpdateImage = (name, value) => {
    const url = `https://api.flyfarint.com/v.1.0.0/WhiteLabel/MyAccount/add.php?option=${name}&agentId=${agentId}`;
    const formData = new FormData();
    formData.append("file", value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      axios.post(url, formData, config).then((res) => {
        if (res?.data?.status.toLowerCase() === "success") {
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: res.data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: Invalid,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: res.data.message,
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            caches
              .keys()
              .then((keyList) =>
                Promise.all(keyList.map((key) => caches.delete(key)))
              );
            window.location.reload(true);
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      Swal.fire({
        imageUrl: ServerDown,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: err.message,
        confirmButtonColor: "var(--primary-color)",
        confirmButtonText: "Ok",
      }).then(function () {
        caches
          .keys()
          .then((keyList) =>
            Promise.all(keyList.map((key) => caches.delete(key)))
          );
        window.location.reload(true);
      });
    }
  };

  return (
    <Grid container sx={{ margin: "30px 0px 10px", height: "fit-content" }}>
      <Grid item md={12} sm={12} xs={12}>
        <Typography
          sx={{
            color: "var(--black)",
            fontSize: "calc(16px + 0.390625vw)",
            fontWeight: 400,
            margin: "10px 0px",
          }}
        >
          Update Website Title And Favicon
        </Typography>
      </Grid>
      <Grid item md={6} sm={6} xs={6}>
        <Box
          sx={{
            width: "100%",
            height: {
              md: "fit-content",
              sm: "fit-content",
              xs: "fit-content",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* //todo:Website Title input */}
          <label
            htmlFor="title"
            style={{
              textAlign: "left",
              width: "100%",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Website Title
          </label>
          <Box
            sx={{
              width: "100%",
              height: {
                md: "fit-content",
                sm: "fit-content",
                xs: "fit-content",
              },
              display: "flex",
              justifyContent: "flex-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box sx={{ width: "80%", height: "40px" }}>
              <input
                id="title"
                type="text"
                name="companyname"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                placeholder="Website Title"
                style={{
                  border: "none",
                  outline: "none",
                  width: "calc(100% - 20px)",
                  height: "100%",
                  padding: "0px 10px 0px 10px",
                  backgroundColor: "var(--input-bgcolor)",
                  borderRadius: "5px",
                }}
              />
            </Box>
            <Box>
              <Button
                sx={{
                  background: "var(--secondary-color)",
                  color: "var(--white)",
                  fontSize: "14px",
                  "&:hover": {
                    background: "var(--secondary-color)",
                    color: "var(--white)",
                  },
                }}
                onClick={() => updateData("companyname", companyName)}
              >
                {isLoading ? (
                  <CircularProgress style={{ width: "20px", height: "20px" }} />
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid md={12} sm={12} xs={12}>
        <Typography
          sx={{
            marginTop: "20px",
            marginBottom: "5px",
            color: "var(--black)",
            fontWeight: 400,
            fontSize: "16px",
          }}
        >
          Choose Your Favicon
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            gap: "10px",
          }}
        >
          {/* //todo:fabicon62 */}
          <Box
            sx={{
              width: { md: "150px", sm: "150px", xs: "150px" },
              height: { md: "150px", sm: "150px", xs: "150px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="fabicon62"
              style={{
                width: "100%",
                height: "100%",
                border: favicon1 ? "2px solid var(--secondary-color)" : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="fabicon62"
                type="file"
                accept=".ico"
                onChange={(e) => {
                  handleUpdateImage("favicon62", e.target.files[0]);
                }}
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {favicon1 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${favicon1}`}
                  alt="fabicon62"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" width={150} height={150} />
              )}
            </label>
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                display: "flex",
                gap: "5px",
              }}
            >
              <Tooltip title="Click To Preview">
                <RemoveRedEyeIcon
                  style={{
                    padding: "3px 4px",
                    borderRadius: "3px",
                    color: "var(--white)",
                    backgroundColor: "var(--green-color)",
                    display: favicon1 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      favicon1 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${favicon1}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          {/* //todo:fabicon192 */}
          <Box
            sx={{
              width: { md: "150px", sm: "150px", xs: "150px" },
              height: { md: "150px", sm: "150px", xs: "150px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="fabicon192"
              style={{
                width: "100%",
                height: "100%",
                border: favicon1 ? "2px solid var(--secondary-color)" : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="fabicon192"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("favicon192", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {favicon2 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${favicon2}`}
                  alt="logo192"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" width={150} height={150} />
              )}
            </label>
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                display: "flex",
                gap: "5px",
              }}
            >
              <Tooltip title="Click To Preview">
                <RemoveRedEyeIcon
                  style={{
                    padding: "3px 4px",
                    borderRadius: "3px",
                    color: "var(--white)",
                    backgroundColor: "var(--green-color)",
                    display: favicon2 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      favicon2 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${favicon2}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          {/* //todo:fabicon512 */}
          <Box
            sx={{
              width: { md: "150px", sm: "150px", xs: "150px" },
              height: { md: "150px", sm: "150px", xs: "150px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="fabicon512"
              style={{
                width: "100%",
                height: "100%",
                border: favicon1 ? "2px solid var(--secondary-color)" : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="fabicon512"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("favicon512", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {favicon3 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${favicon3}`}
                  alt="logo512"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" width={150} height={150} />
              )}
            </label>
            <Box
              sx={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                display: "flex",
                gap: "5px",
              }}
            >
              <Tooltip title="Click To Preview">
                <RemoveRedEyeIcon
                  style={{
                    padding: "3px 4px",
                    borderRadius: "3px",
                    color: "var(--white)",
                    backgroundColor: "var(--green-color)",
                    display: favicon3 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      favicon3 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${favicon3}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            marginTop: "10px",
            color: "var(--tomato-color)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          *Image Must below 2MB each and First Image (ico) and other have to
          (png or jpg) file only
        </Typography>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="Image-Modal"
        aria-describedby="Image-Modal-Description"
      >
        <Box sx={modalStyle}>
          <img
            src={previewImage}
            alt="previewImage"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Modal>
    </Grid>
  );
};
