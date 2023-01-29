import React from "react";
import { Box, Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
const GeneralLedgerReport = () => {
  return (
    <Box>
        <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Box>
              <Typography
                style={{
                  fontFamily: "poppins",
                  fontWeight: "600px",
                  fontSize: "22px",
                  color: "#222222",
                }}
                mb={2}
              >
                Report
              </Typography>
            </Box>

     <form>
     <Box className="passengerInput1">
    <Grid container spacing={4}>
        <Grid item md={4}>
        <Typography>Start Date</Typography>
        <Box style={{ marginTop: "5px" }}>
          <input
            type="date"
            placeholder="Find traveler to auto fill"
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        <Typography>End Date</Typography>
        <Box style={{ marginTop: "5px" }}>
          <input
            type="date"
            placeholder="Find traveler to auto fill"
          />
        </Box>
      </Grid>
      <Grid item md={4}>
        
      <Button
                sx={{
                  fontFamily: "poppins",
                  fontWeight: "400",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  borderRadius: "2px",
                  background: "#222222",
                  color: "#FFFFFF",
                  width: "370px",
                  mt:'1rem',
                  "&:hover": {
                    backgroundColor: "#222222",
                  },
                }}
              >
                Proceed
              </Button>
      
      </Grid>
    </Grid>
  </Box>

     </form>
        
        </Container>
    </Box>
  
  )
}

export default GeneralLedgerReport