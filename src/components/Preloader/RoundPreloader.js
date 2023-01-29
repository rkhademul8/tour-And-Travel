import React from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import Loader from "../../images/loader/Render.gif";
import "./RoundPreloader.css";

const RoundPreloader = ({
  fromSendData,
  fromSearchDate,
  toSearchDate,
  className,
  toSendData,
  adultCount,
  childCount,
  infant,
  tripType,
  isPrevClicked,
  isNextClicked,
  departureDate,
  returningDate,
}) => {
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
  // return (
  //   <Box className="round-preloader-wrapper">
  //     <Box className="wrapper">
  //       <div className="body">
  //         <span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //         </span>
  //         <div className="base">
  //           <span></span>
  //           <div className="face"></div>
  //         </div>
  //       </div>
  //       <div className="longfazers">
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //         <span></span>
  //       </div>
  //       <Box className="search-details">
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             color: "#003566",
  //           }}
  //         >
  //           <Typography variant="h4">{fromSendData}</Typography>
  //           <SwapHorizIcon fontSize="large" />
  //           <Typography variant="h4">{toSendData}</Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Typography variant="h6" sx={{ color: "#999" }}>
  //             {format(
  //               new Date(
  //                 isNextClicked || isPrevClicked
  //                   ? fromSearchDate
  //                   : departureDate
  //               ),
  //               "dd MMM yyyy"
  //             )}
  //           </Typography>
  //           <SwapHorizIcon
  //             fontSize="large"
  //             sx={{ color: "#999", mx: "10px" }}
  //           />
  //           <Typography variant="h6" sx={{ color: "#999" }}>
  //             {format(
  //               new Date(
  //                 isNextClicked || isPrevClicked ? toSearchDate : returningDate
  //               ),
  //               "dd MMM yyyy"
  //             )}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             noWrap: true,
  //             fontSize: "max(20px)",
  //             flexDirection: "column",
  //           }}
  //         >
  //           <Box>
  //             <Typography
  //               variant="h6"
  //               sx={{ color: "#222222", textAlign: "center" }}
  //             >
  //               {adultCount > 0 && `Adult(${adultCount})`}
  //               {childCount > 0 && `Children(${childCount})`}
  //               {infant > 0 && `Infant(${infant})`}
  //             </Typography>
  //           </Box>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               justifyContent: "center",
  //               noWrap: true,
  //               fontSize: "max(20px)",
  //             }}
  //           >
  //             <Typography variant="h6" sx={{ color: "#222222" }}>
  //               {className}
  //             </Typography>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </Box>

  //     {/* <Box>
  //       <DotAnimation text="Loading" />
  //     </Box> */}
  //   </Box>
  // );
};

export default RoundPreloader;
