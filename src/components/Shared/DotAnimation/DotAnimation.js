import React from "react";
import "./DotAnimation.css";

const DotAnimation = ({ text }) => {
  return (
    <div>
      <div class="spinner">
        <span className="spinner-text">{text}</span>
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  );
};

export default DotAnimation;
