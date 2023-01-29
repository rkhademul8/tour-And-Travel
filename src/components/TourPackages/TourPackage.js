import { Box, Button, Modal, Typography } from "@mui/material";
import commaNumber from "comma-number";
import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TourPackage = ({ packageData }) => {
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [openInclusion, setOpenInclusion] = useState(false);
  const [openExclusion, setOpenExclusion] = useState(false);
  const [openTiming, setOpenTiming] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenLocation = () => setOpenLocation(true);
  const handleOpenDescription = () => setOpenDescription(true);
  const handleOpenInclusion = () => setOpenInclusion(true);
  const handleOpenExclusion = () => setOpenExclusion(true);
  const handleOpenTiming = () => setOpenTiming(true);
  const handleClose = () => setOpen(false);
  const handleCloseLocation = () => setOpenLocation(false);
  const handleCloseDescription = () => setOpenDescription(false);
  const handleCloseInclusion = () => setOpenInclusion(false);
  const handleCloseExclusion = () => setOpenExclusion(false);
  const handleCloseTiming = () => setOpenTiming(false);
  return (
    <Box
      style={{
        display: "flex",
        borderRadius: "10px",
        margin: "10px 0px 5px",
        padding: "10px",
        border: "1px solid #003566",
        height: "250px",
      }}
    >
      <Box style={{ width: "40%", height: "100%", borderRadius: "10px" }}>
        <Box
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            src={packageData.coverimage}
            alt="...leftphoto"
          />
        </Box>
      </Box>

      <Box
        style={{
          height: "100%",
          width: "60%",
          paddingLeft: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box style={{ height: "100%", width: "70%" }}>
          <Typography
            style={{ fontSize: "24px", mt: "5px", fontWeight: "semibold" }}
          >
            {packageData.titleEN}
          </Typography>

          <Typography
            mt={"3"}
            fontSize={"14px"}
            color={"gray.600"}
            style={{ mt: "10px", fontSize: "14px", color: "#999" }}
          >
            {packageData.locationEN}
          </Typography>

          <Box
            style={{
              display: "flex",
              alignImtems: "center",
              fontSize: "14px",
              mt: "10px",
            }}
          >
            {packageData.durationEN}
          </Box>
          <Box>
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
                margin: "5px",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  color: "var(--primary-color)",
                },
              }}
              onClick={handleOpen}
            >
              Overview
            </Button>
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
                margin: "5px",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  color: "var(--primary-color)",
                },
              }}
              onClick={handleOpenLocation}
            >
              Location
            </Button>
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
                margin: "5px",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  color: "var(--primary-color)",
                },
              }}
              onClick={handleOpenDescription}
            >
              Description
            </Button>

            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
                margin: "5px",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  color: "var(--primary-color)",
                },
              }}
              onClick={handleOpenInclusion}
            >
              Inclusion
            </Button>
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
                margin: "5px",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  color: "var(--primary-color)",
                },
              }}
              onClick={handleOpenExclusion}
            >
              Exclusion
            </Button>
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white)",
                margin: "5px",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--white)",
                  color: "var(--primary-color)",
                },
              }}
              onClick={handleOpenTiming}
            >
              Timing
            </Button>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="overview-modal-title"
            aria-describedby="overview-modal-description"
          >
            <Box sx={style}>
              <Typography id="overview-modal" sx={{ mt: 2 }}>
                {packageData.shortDescriptionEN}
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={openLocation}
            onClose={handleCloseLocation}
            aria-labelledby="location-modal-title"
            aria-describedby="location-modal-description"
          >
            <Box sx={style}>
              <Typography id="location-modal" sx={{ mt: 2 }}>
                {packageData.placevisitEN}
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={openDescription}
            onClose={handleCloseDescription}
            aria-labelledby="description-modal-title"
            aria-describedby="description-modal-description"
          >
            <Box sx={style}>
              <Typography id="description-modal" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={openInclusion}
            onClose={handleCloseInclusion}
            aria-labelledby="inclusion-modal"
            aria-describedby="inclusion-modal-description"
          >
            <Box sx={style}>
              <Typography id="inclusion-modal" sx={{ mt: 2 }}>
                {packageData.inclusionEN}
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={openExclusion}
            onClose={handleCloseExclusion}
            aria-labelledby="exclusion-modal-title"
            aria-describedby="exclusion-modal-description"
          >
            <Box sx={style}>
              <Typography id="exclusion-modal" sx={{ mt: 2 }}>
                {packageData.exclusionEN}
              </Typography>
            </Box>
          </Modal>
          <Modal
            open={openTiming}
            onClose={handleCloseTiming}
            aria-labelledby="timing-modal-title"
            aria-describedby="timing-modal-description"
          >
            <Box sx={style}>
              <Typography id="timing-modal" sx={{ mt: 2 }}>
                {packageData.detailsEN}
              </Typography>
            </Box>
          </Modal>
        </Box>

        <Box
          style={{
            height: "100%",
            width: "30%",
            display: "flex",
            alignImtems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignImtems: "center",
              backgroundColor: "var(--white)",
              padding: "10px",
              fontSize: "11px",
            }}
          >
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "20px",
                color: "var(--primary-color)",
                me: "10px",
              }}
            >
              {commaNumber(packageData.price)}&#2547;
            </Typography>
          </Box>
          <Button
            className="shine-effect"
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white)",
              textTransform: "uppercase",
              width: "100px",
              height: "40px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--white)",
                color: "var(--primary-color)",
              },
            }}
          >
            Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default TourPackage;
