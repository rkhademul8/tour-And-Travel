import {
  Box,
  Button,
  Grid,
  Modal,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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

export const UpdateSliderImages = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [previewImage, setPreviewImage] = useState("");
  const [sliderImage1, setSliderImage1] = useState("");
  const [sliderImage2, setSliderImage2] = useState("");
  const [sliderImage3, setSliderImage3] = useState("");
  const [sliderImage4, setSliderImage4] = useState("");
  const [sliderImage5, setSliderImage5] = useState("");
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
        setSliderImage1(res?.data?.slider_img1);
        setSliderImage2(res?.data?.slider_img2);
        setSliderImage3(res?.data?.slider_img3);
        setSliderImage4(res?.data?.slider_img4);
        setSliderImage5(res?.data?.slider_img5);
      });
  }, []);

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
    <Box>
      <Grid container sx={{ margin: "30px 0px 10px" }}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            sx={{
              color: "var(--black)",
              fontSize: "calc(16px + 0.390625vw)",
              fontWeight: 400,
            }}
          >
            Upload Slider Image(5 Images)
          </Typography>
        </Grid>
        {/* //todo: Slider Images Section */}
        <Grid item md={12} sm={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              marginTop: { md: "10px", sm: "10px", xs: "10px" },
            }}
          >
            {/* //todo:Image-1 */}
            <Box
              sx={{
                width: { md: "200px", sm: "200px", xs: "200px" },
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="sliderImage1"
                style={{
                  width: "100%",
                  height: "100%",
                  border: sliderImage1
                    ? "2px solid var(--secondary-color)"
                    : "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <input
                  id="sliderImage1"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    handleUpdateImage("sliderimg1", e.target.files[0])
                  }
                  style={{ height: "100%", width: "100%", display: "none" }}
                />
                {sliderImage1 ? (
                  <img
                    src={`http://cdn.flyfarint.com/WL/${agentId}/${sliderImage1}`}
                    alt="sliderImage1"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: { md: "200px", sm: "200px", xs: "200px" },
                      height: { md: "150px", sm: "150px", xs: "150px" },
                    }}
                  />
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
                      display: sliderImage1 ? "block" : "none",
                    }}
                    onClick={() => {
                      handleOpenModal();
                      setPreviewImage(
                        sliderImage1 !== ""
                          ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage1}`
                          : ""
                      );
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
            {/* //todo:Image-2 */}
            <Box
              sx={{
                width: { md: "200px", sm: "200px", xs: "200px" },
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="sliderImage2"
                style={{
                  width: "100%",
                  height: "100%",
                  border: sliderImage2
                    ? "2px solid var(--secondary-color)"
                    : "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <input
                  id="sliderImage2"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    handleUpdateImage("sliderimg2", e.target.files[0])
                  }
                  style={{ height: "100%", width: "100%", display: "none" }}
                />
                {sliderImage2 ? (
                  <img
                    src={
                      sliderImage1 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage2}`
                        : ""
                    }
                    alt="sliderImage2"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: { md: "200px", sm: "200px", xs: "200px" },
                      height: { md: "150px", sm: "150px", xs: "150px" },
                    }}
                  />
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
                      display: sliderImage2 ? "block" : "none",
                    }}
                    onClick={() => {
                      handleOpenModal();
                      setPreviewImage(
                        sliderImage2 !== ""
                          ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage2}`
                          : ""
                      );
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
            {/* //todo:Image-3 */}
            <Box
              sx={{
                width: { md: "200px", sm: "200px", xs: "200px" },
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="sliderImage3"
                style={{
                  width: "100%",
                  height: "100%",
                  border: sliderImage3
                    ? "2px solid var(--secondary-color)"
                    : "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <input
                  id="sliderImage3"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    handleUpdateImage("sliderimg3", e.target.files[0])
                  }
                  style={{ height: "100%", width: "100%", display: "none" }}
                />
                {sliderImage3 ? (
                  <img
                    src={
                      sliderImage3 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage3}`
                        : ""
                    }
                    alt="sliderImage2"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: { md: "200px", sm: "200px", xs: "200px" },
                      height: { md: "150px", sm: "150px", xs: "150px" },
                    }}
                  />
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
                      display: sliderImage3 ? "block" : "none",
                    }}
                    onClick={() => {
                      handleOpenModal();
                      setPreviewImage(
                        sliderImage3 !== ""
                          ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage3}`
                          : ""
                      );
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
            {/* //todo:Image-4 */}
            <Box
              sx={{
                width: { md: "200px", sm: "200px", xs: "200px" },
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="sliderImage4"
                style={{
                  width: "100%",
                  height: "100%",
                  border: sliderImage4
                    ? "2px solid var(--secondary-color)"
                    : "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <input
                  id="sliderImage4"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    handleUpdateImage("sliderimg4", e.target.files[0])
                  }
                  style={{ height: "100%", width: "100%", display: "none" }}
                />
                {sliderImage4 ? (
                  <img
                    src={
                      sliderImage4 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage4}`
                        : ""
                    }
                    alt="sliderImage4"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: { md: "200px", sm: "200px", xs: "200px" },
                      height: { md: "150px", sm: "150px", xs: "150px" },
                    }}
                  />
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
                      display: sliderImage4 ? "block" : "none",
                    }}
                    onClick={() => {
                      handleOpenModal();
                      setPreviewImage(
                        sliderImage4 !== ""
                          ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage4}`
                          : ""
                      );
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
            {/* //todo:Image-5 */}
            <Box
              sx={{
                width: { md: "200px", sm: "200px", xs: "200px" },
                height: { md: "150px", sm: "150px", xs: "150px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="sliderImage5"
                style={{
                  width: "100%",
                  height: "100%",
                  border: sliderImage5
                    ? "2px solid var(--secondary-color)"
                    : "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <input
                  id="sliderImage5"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) =>
                    handleUpdateImage("sliderimg5", e.target.files[0])
                  }
                  style={{ height: "100%", width: "100%", display: "none" }}
                />
                {sliderImage5 ? (
                  <img
                    src={
                      sliderImage5 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage5}`
                        : ""
                    }
                    alt="sliderImage5"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                ) : (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: { md: "200px", sm: "200px", xs: "200px" },
                      height: { md: "150px", sm: "150px", xs: "150px" },
                    }}
                  />
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
                      display: sliderImage5 ? "block" : "none",
                    }}
                    onClick={() => {
                      handleOpenModal();
                      setPreviewImage(
                        sliderImage5 !== ""
                          ? `http://cdn.flyfarint.com/WL/${agentId}/${sliderImage5}`
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
            *All Image must be below 2MB and (png or jpg) format
          </Typography>
        </Grid>
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
    </Box>
  );
};
