import React from "react";
import { Grid, Modal, Skeleton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import sliderImg from "../../images/SliderImg/s1.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
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
export const UpdateTourDeal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const location = useLocation();
  const [isFetching, setIsFetching] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [hotdealtourimg1, setHotDealTourImg1] = useState("");
  const [hotdealtourimg2, setHotDealTourImg2] = useState("");
  const [hotdealtourimg3, setHotDealTourImg3] = useState("");
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
        setHotDealTourImg1(res?.data?.hotdealtourimg1);
        setHotDealTourImg2(res?.data?.hotdealtourimg2);
        setHotDealTourImg3(res?.data?.hotdealtourimg3);
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
              htmlFor="hotdealtourimg1"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealtourimg1
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealtourimg1"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealtourimg1", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealtourimg1 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealtourimg1}`}
                  alt="hotdealtourimg1"
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
                    display: hotdealtourimg1 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealtourimg1 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealtourimg1}`
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
              htmlFor="hotdealtourimg2"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealtourimg2
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealtourimg2"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealtourimg2", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealtourimg2 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealtourimg2}`}
                  alt="hotdealtourimg2"
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
                    display: hotdealtourimg2 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealtourimg2 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealtourimg2}`
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
              htmlFor="hotdealtourimg3"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealtourimg3
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealtourimg3"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealtourimg3", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealtourimg3 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealtourimg3}`}
                  alt="hotdealtourimg3"
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
                    display: hotdealtourimg3 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealtourimg3 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealtourimg3}`
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
