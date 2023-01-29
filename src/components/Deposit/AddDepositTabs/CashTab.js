import { Box, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import "./CashTab.css";

const CashTab = () => {
  const navigate = useNavigate();
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  const [isLoading, setIsLoading] = useState(true);

  const [sender, setSender] = useState("");
  const [reciver, setReciver] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState("");

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(sender, reciver, reference, amount, file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      let res = await axios.post(
        `https://api.flyfarint.com/v.1.0.0/Deposit/addDeposit.php?agentId=${agentID}&sender=${sender}&receiver=${reciver}&way=Cash&method=&transactionId=&amount=${amount}&ref=${reference}&staffId=&ckDate=`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        swal({
          icon: "success",
          title: "Deposit Successfully!",
          html: "Your Deposit request is submitted successfully Please wait for a response, if you do not receive any email, please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
          button: "Done!",
        }).then(function () {
          setIsLoading(true);
          navigate("/deposite");
        });
      } else {
        Swal({
          icon: "error",
          title: "Deposit Failed!",
          html: "Your Deposit request is Failed.Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
          button: "Done!",
        }).then(function () {
          setIsLoading(true);
          navigate("/deposite");
        });
      }
    } catch (err) {
      Swal({
        icon: "error",
        title: "Deposit Failed!",
        html: "Your Deposit request is Failed.Please contact us at <strong>support@flyfarint.com or 01755-572099, 09606912912</strong>",
        button: "Done!",
      }).then(function () {
        setIsLoading(true);
        navigate("/deposite");
      });
    }
    e.target.reset();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box className="passengerInput1">
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Typography>Sender Name</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  required
                  type="text"
                  placeholder="Sender Name"
                  onChange={(e) => setSender(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Receiver Name</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  required
                  type="text"
                  placeholder="Receiver Name"
                  onChange={(e) => setReciver(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Reference</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  required
                  type="text"
                  placeholder="Reference"
                  onChange={(e) => setReference(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography>Enter Amount</Typography>
              <Box style={{ marginTop: "5px" }}>
                <input
                  required
                  type="text"
                  placeholder="Enter amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item md={4}>
              <Typography>Choose Passport Copy</Typography>
              <Box style={{ marginTop: "5px" }} className="input-File1">
                <input
                  required
                  style={{
                    backgroundColor: "#2564B8",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 10px",
                    boxSizing: "border-box",
                  }}
                  onChange={onChangeFile}
                  className="customFileType"
                  type="file"
                  title="Choose a Image png and jpg please"
                  accept="image/*"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
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
            mt: "3rem",
            "&:hover": {
              backgroundColor: "#222222",
            },
          }}
          type="submit"
        >
          {isLoading ? (
            "Send Deposit Request"
          ) : (
            <CircularProgress
              size="1.5rem"
              sx={{
                color: "#fff",
              }}
            />
          )}
        </Button>
      </form>
    </Box>
  );
};

export default CashTab;
