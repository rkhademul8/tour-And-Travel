import React from "react";
import { Grid, Modal, Skeleton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import sliderImg from "../../images/SliderImg/s1.png";
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
export const UpdateGroupFareDeal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [isFetching, setIsFetching] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [hotdealgroupfareimg1, setHotDealGroupFareImg1] = useState("");
  const [hotdealgroupfareimg2, setHotDealGroupFareImg2] = useState("");
  const [hotdealgroupfareimg3, setHotDealGroupFareImg3] = useState("");
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
        setHotDealGroupFareImg1(res?.data?.hotdealgroupfareimg1);
        setHotDealGroupFareImg2(res?.data?.hotdealgroupfareimg2);
        setHotDealGroupFareImg3(res?.data?.hotdealgroupfareimg3);
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
              htmlFor="hotdealgroupfareimg1"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealgroupfareimg1
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealgroupfareimg1"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealgroupfareimg1", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealgroupfareimg1 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealgroupfareimg1}`}
                  alt="hotdealgroupfareimg1"
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
                    display: hotdealgroupfareimg1 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealgroupfareimg1 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealgroupfareimg1}`
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
              htmlFor="hotdealgroupfareimg2"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealgroupfareimg2
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealgroupfareimg2"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealgroupfareimg2", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealgroupfareimg2 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealgroupfareimg2}`}
                  alt="hotdealgroupfareimg2"
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
                    display: hotdealgroupfareimg2 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealgroupfareimg2 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealgroupfareimg2}`
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
              htmlFor="hotdealgroupfareimg3"
              style={{
                width: "100%",
                height: "100%",
                border: hotdealgroupfareimg3
                  ? "2px solid var(--secondary-color)"
                  : "none",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <input
                id="hotdealgroupfareimg3"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) =>
                  handleUpdateImage("hotdealgroupfareimg3", e.target.files[0])
                }
                style={{ height: "100%", width: "100%", display: "none" }}
              />
              {hotdealgroupfareimg3 ? (
                <img
                  src={`http://cdn.flyfarint.com/WL/${agentId}/${hotdealgroupfareimg3}`}
                  alt="hotdealgroupfareimg3"
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
                    display: hotdealgroupfareimg3 ? "block" : "none",
                  }}
                  onClick={() => {
                    handleOpenModal();
                    setPreviewImage(
                      hotdealgroupfareimg3 !== ""
                        ? `http://cdn.flyfarint.com/WL/${agentId}/${hotdealgroupfareimg3}`
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
