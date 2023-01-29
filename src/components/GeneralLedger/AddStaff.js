
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';

const AddStaff = () => {
  return (
    <Box>
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "30px 0px",
        gap: 4,
      }}
    >
      <Typography sx={{ fontWeight: "500px", fontSize: "23px", color: "#003566" }}>
        Add Staff Account
      </Typography>

      <Grid container spacing={2}>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", flexDirection: "column", gap: 7 }}
        >
          <TextField
            label="Staff Name"
            id="filled-start-adorment"
            variant="standard"
            focused
            placeholder="First Name"
          />
          <TextField
            label="Role"
            id="filled-start-adorment"
            variant="standard"
            focused
            placeholder="Bangladesh"
          />
        
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", flexDirection: "column", gap: 7 }}
        >
          <TextField
            label="Email"
            id="filled-start-adorment"
            variant="standard"
            focused
            placeholder="Last Name"
          />
          <TextField
            label="Username"  
            id="filled-start-adorment"
            variant="standard"
            focused
            placeholder="Adult"
          />
        
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", flexDirection: "column", gap: 7 }}
        >
          <TextField
            label="Phone Number"
            id="filled-start-adorment"
            variant="standard"
            focused
            placeholder="Gender"
          />

          <TextField
            label="Password"
            id="filled-start-adorment"
            variant="standard"
            focused
            placeholder="21 May 2022"
          />
        </Grid>
      </Grid>
      <Button
        sx={{
          background: "#222222",
          color: "#FFFFFF",
          width: "370px",
          mt: "4rem",
          "&:hover": {
            backgroundColor: "#2564B8",
          },
        }}
      >
        Add This Account
      </Button>
    </Box>
        </Container>
    </Box>
  )
}

export default AddStaff