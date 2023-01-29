import React from "react";
import "./BubbleBtn.css";

// $(".button_su_inner").mouseEnter(function (e) {
//   var parentOffset = $(this).offset();

//   var relX = e.pageX - parentOffset.left;
//   var relY = e.pageY - parentOffset.top;
//   $(this).prev(".su_button_circle").css({ left: relX, top: relY });
//   $(this).prev(".su_button_circle").removeClass("desplode-circle");
//   $(this).prev(".su_button_circle").addClass("explode-circle");
// });

// $(".button_su_inner").mouseleave(function (e) {
//   var parentOffset = $(this).offset();

//   var relX = e.pageX - parentOffset.left;
//   var relY = e.pageY - parentOffset.top;
//   $(this).prev(".su_button_circle").css({ left: relX, top: relY });
//   $(this).prev(".su_button_circle").removeClass("explode-circle");
//   $(this).prev(".su_button_circle").addClass("desplode-circle");
// });

const BubbleBtn = () => {
  return (
    <div className="content">
      <h1>Bubble hover effect</h1>
      <div className="button_container">
        <div className="button_su">
          <span className="su_button_circle"></span>
          <a href="#" className="button_su_inner">
            <span className="button_text_container">Simple button</span>
          </a>
        </div>

        <div className="button_su">
          <span className="su_button_circle"></span>
          <a href="#" className="button_su_inner">
            <span className="button_text_container">Another button</span>
          </a>
        </div>

        <div className="button_su">
          <span className="su_button_circle"></span>
          <a href="#" className="button_su_inner">
            <span className="button_text_container">A third button</span>
          </a>
        </div>

        <div className="button_su">
          <span className="su_button_circle"></span>
          <a href="#" className="button_su_inner">
            <span className="button_text_container">A forth button</span>
          </a>
        </div>
      </div>
      <p className="credit">By animation bro</p>
    </div>
  );
};

export default BubbleBtn;
