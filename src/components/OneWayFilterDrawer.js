import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import OneWayFilter from "./OneWayFilter";
import { Container } from "@mui/material";

const FilterDrawer = ({
  filteredData,
  setfilteredData,
  data,
  setData,
  noData,
  setNoData,
  departureDate,
  setFrom,
}) => {
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <Box>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
            style={{ backgroundColor: "#DC143C" }}
          >
            Filter
          </Button>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <Box>
              <OneWayFilter
                data={data}
                setData={setData}
                filteredData={filteredData}
                setfilteredData={setfilteredData}
                noData={noData}
                setNoData={setNoData}
                departureDate={departureDate}
                setFrom={setFrom}
              />
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default FilterDrawer;
