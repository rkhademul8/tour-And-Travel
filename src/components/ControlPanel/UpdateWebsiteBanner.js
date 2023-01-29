import {
  Box,
  Button,
  Grid,
  Modal,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
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
export const UpdateWebsiteBanner = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [isFetching, setIsFetching] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [mainBannerImage, setMainBannerImage] = useState("");
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
        setMainBannerImage(res?.data?.mainbannerimg);
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
      <Grid container sx={{ margin: "30px 0px 10px" }} columnSpacing={1}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            sx={{
              color: "var(--black)",
              fontSize: "calc(16px + 0.390625vw)",
              fontWeight: 400,
            }}
          >
            Upload Main Banner Image
          </Typography>
        </Grid>
        {/* //todo: Image Upload Section */}
        <Grid item md={4} sm={6} xs={6}>
          <Box
            sx={{
              width: { md: "400px", sm: "200px", xs: "200px" },
              height: { md: "150px", sm: "150px", xs: "150px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="mainBannerImage"
              style={{
                width: "100%",
                height: "100%",
                border: mainBannerImage
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="mainBannerImage"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("mainbannerimg", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {mainBannerImage ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${mainBannerImage}`}
                  alt="mainBannerImage"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: { md: "400px", sm: "200px", xs: "200px" },
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
                    display: mainBannerImage ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      mainBannerImage !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${mainBannerImage}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
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
            *Image must be below 5MB and (png or jpg) format
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
