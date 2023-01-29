import React from "react";
import { Grid, Modal, Skeleton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useLocation } from "react-router-dom";
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

export const UpdateVisaDeal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const location = useLocation();
  const [previewImage, setPreviewImage] = useState("");
  const [hotdealvisaimg1, setHotDealVisaImg1] = useState("");
  const [hotdealvisaimg2, setHotDealVisaImg2] = useState("");
  const [hotdealvisaimg3, setHotDealVisaImg3] = useState("");
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
        setHotDealVisaImg1(res?.data?.hotdealvisaimg1);
        setHotDealVisaImg2(res?.data?.hotdealvisaimg2);
        setHotDealVisaImg3(res?.data?.hotdealvisaimg3);
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
      <Grid
        container
        style={{ height: "100%", width: "100%" }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* //todo: first  */}
        <Grid item md={4} lg={4} xs={12}>
          {/* //todo:Image-1 */}
          <Box
            sx={{
              width: "100%",
              height: { md: "210px", sm: "210px", xs: "210px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="hotdealvisaimg1"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealvisaimg1
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealvisaimg1"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealvisaimg1", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealvisaimg1 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealvisaimg1}`}
                  alt="hotdealvisaimg1"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: { md: "210px", sm: "210px", xs: "210px" },
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
                    display: hotdealvisaimg1 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealvisaimg1 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealvisaimg1}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        {/* //todo: two  */}
        <Grid item md={4} lg={4} xs={12}>
          {/* //todo:Image-1 */}
          <Box
            sx={{
              width: "100%",
              height: { md: "210px", sm: "210px", xs: "210px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="hotdealvisaimg2"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealvisaimg2
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealvisaimg2"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealvisaimg2", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealvisaimg2 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealvisaimg2}`}
                  alt="hotdealvisaimg2"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: { md: "210px", sm: "210px", xs: "210px" },
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
                    display: hotdealvisaimg2 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealvisaimg2 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealvisaimg2}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        {/* //todo: third  */}
        <Grid item md={4} lg={4} xs={12}>
          {/* //todo:Image-1 */}
          <Box
            sx={{
              width: "100%",
              height: { md: "210px", sm: "210px", xs: "210px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <label
              htmlFor="hotdealvisaimg3"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealvisaimg3
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealvisaimg3"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealvisaimg3", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealvisaimg3 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealvisaimg3}`}
                  alt="hotdealvisaimg3"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: "100%",
                    height: { md: "210px", sm: "210px", xs: "210px" },
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
                    display: hotdealvisaimg3 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealvisaimg3 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealvisaimg3}`
                        : ""
                    );
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </Grid>
        <Typography
          sx={{
            marginTop: "10px",
            color: "var(--tomato-color)",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          *Image must be below 2MB and (png or jpg) format
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
    </Box>
  );
};
