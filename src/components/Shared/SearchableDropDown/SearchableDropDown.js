import React from "react";
import Select from "react-select";
import "./SearchableDropDown.css";

const SearchableDropDown = ({ handler, options, index }) => {
  return (
    <Select
      placeholder="Select Traveler"
      onChange={(item) => {
        handler(item.value, index);
      }}
      options={options}
      className="custom-select"
    />
  );
};

export default SearchableDropDown;
