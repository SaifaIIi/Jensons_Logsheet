import React, { useState } from "react";

function NavBar(props) {
  const [collaps, setCollaps] = useState(false);
  const sliderOpen = () => {
    setCollaps(true);
  };
  const sliderClose = () => {
    setCollaps(false);
  };

  return (
    <div>
      <div className={`wrapper ${!collaps ? "collapse" : ""}`} id="wrapper">
        <div className="top_navbar">
          <div
            className="hamburger"
            onMouseOut={sliderClose}
            onMouseOver={sliderOpen}
          >
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
          </div>
          <div className="top_menu">
            <div className="logo">Log Sheet Report</div>
          </div>
        </div>
        <div
          className="sidebar"
          onMouseOut={sliderClose}
          onMouseOver={sliderOpen}
        ></div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default NavBar;
