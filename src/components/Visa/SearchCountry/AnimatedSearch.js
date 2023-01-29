import { Box } from "@mui/system";
import React, { useState } from "react";
import "./AnimatedSearch.css";
const AnimatedSearch = ({ handleFilter, filterData, handleClick }) => {
  const [click, setClick] = useState(false);
  return (
    <Box className="animated-search-container">
      <Box className=" custom-search-container">
        <h2>VISA</h2>
        <Box
          className={
            click ? "search-bar-container active" : "search-bar-container"
          }
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/magnifier-512.png"
            alt="magnifier"
            className="magnifier"
            onClick={() => setClick(!click)}
          />
          <input
            type="text"
            className="input"
            placeholder="Search ..."
            onChange={handleFilter}
          />
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-25-512.png"
            alt="mic-icon"
            className="mic-icon"
          />
        </Box>
      </Box>
      <Box className="search-results-container">
        {filterData.length !== 0 && (
          <div className="dataResult">
            {filterData.map((value) => {
              return (
                <div className="dataResultBtn">
                  <button onClick={() => handleClick(`${value.name.common}`)}>
                    {value.name.common}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default AnimatedSearch;
