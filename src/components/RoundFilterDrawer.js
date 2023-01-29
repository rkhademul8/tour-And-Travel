import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import RoundWayFilter from "./RoundWayFilter";
const RoundFilterDrawer = ({
  data,
  setData,
  filteredData,
  setfilteredData,
  noData,
  setNoData,
  departureDate,
  returningDate,
  setFrom,
  setTo,
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
              <RoundWayFilter
                data={data}
                setData={setData}
                filteredData={filteredData}
                setfilteredData={setfilteredData}
                noData={noData}
                setNoData={setNoData}
                departureDate={departureDate}
                returningDate={returningDate}
                setFrom={setFrom}
                setTo={setTo}
              />
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default RoundFilterDrawer;
