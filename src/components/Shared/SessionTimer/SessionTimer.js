import React from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TimeOut from "../../../images/undraw/undraw_in_no_time_-6-igu.svg";

const SessionTimer = ({ setChangeState }) => {
  const navigate = useNavigate();
  // Random component
  const CompletionList = () => {
    // Swal.fire({
    //   imageUrl: TimeOut,
    //   imageWidth: 400,
    //   imageHeight: 200,
    //   imageAlt: "Custom image",
    //   title: "Your Session Time Is Expired",
    //   confirmButtonText: "Search Again...",
    //    confirmButtonColor: "var(--primary-color)",
    // }).then(() => {
    //   setChangeState((prev) => !prev);
    // });
    return <>Time Out</>;
  };
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      Swal.fire({
        imageUrl: TimeOut,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        title: "Your Session Time Is Expired",
        confirmButtonText: "Search Again...",
        confirmButtonColor: "var(--primary-color)",
      }).then(() => {
        setChangeState((prev) => !prev);
      });
      return <CompletionList />;
    } else {
      // Render a countdown
      return (
        <span
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {minutes}:{seconds}
        </span>
      );
    }
  };
  return <Countdown date={Date.now() + 900000} renderer={renderer} />;
};

export default SessionTimer;
