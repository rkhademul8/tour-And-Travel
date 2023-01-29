import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
// import Loader from "../../../../image/loader/Render.gif";
import Success from "../../images/undraw/undraw_completed_tasks_vs6q.svg";
import Invalid from "../../images/undraw/undraw_warning_re_eoyh.svg";
import ServerDown from "../../images/undraw/undraw_server_down_s-4-lk.svg";
import ReConfirm from "../../images/undraw/undraw_confirmation_re_b6q5.svg";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../Header/Header";
import Loader from "./../../images/loader/Render.gif";

const useStyles = makeStyles({
  tableRow: {
    height: "20px",
  },
});

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;

  const [open, setOpen] = React.useState(false);
  const user = secureLocalStorage.getItem("admin-info");

  //todo: row secion
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyadd, setCompanyadd] = useState("");

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const [file, setFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [isLoadingbtn, setIsLoadingbtn] = useState(true);
  //todo: state change
  let agentID = user?.user.agentId;
  const [stateChange, setStateChange] = useState(false);

  const onChangeProfile = (e) => {
    setImage(fileInputRef.current.click());
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image, stateChange]);

  const onSubmitProfile = async (e) => {
    e.preventDefault();
    setIsLoadingbtn(false);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `https://api.flyfarint.com/v.1.0.0/Accounts/CompanyLogo.php?agentId=${agentID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { fileName, filePath } = res.data;
      if (res.data.status === "success") {
        setIsLoadingbtn(true);
        setUploadedFile({ fileName, filePath });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //todo:end

  const updateStaffInfoGet = async (agentID) => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCompanyName(data[0]?.company);
        setClientName(data[0]?.name);
        setEmail(data[0]?.email);
        setPhone(data[0]?.phone);
        setCompanyadd(data[0]?.companyadd);
      });
  };

  const handleSubmit = async (e) => {
    onSubmitProfile(e);
    setIsLoadingbtn(false);
    e.preventDefault();

    let body = JSON.stringify({
      agentId: agentID,
      name: clientName,
      phone: phone,
      company: companyName,
      companyadd: companyadd,
    });

    await fetch(
      "https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?action=update",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsLoadingbtn(true);
          Swal.fire({
            imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Account Updated",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            setStateChange((prev) => !prev);
            window.location.reload(true);
          });
        } else {
          Swal.fire({
            imageUrl: ServerDown,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Server Error!",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then((err) => {
            setStateChange((prev) => !prev);
          });
        }
      });
  };

  // delete functionality handle here

  return (
    <React.Fragment>
      {/* visual data */}

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.company} </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.companyadd}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Typography color="var(--secondary-color)" fontWeight={500}>
                Cancel
              </Typography>
            ) : (
              <Typography
                color="var(--secondary-color)"
                fontWeight={500}
                onClick={() => updateStaffInfoGet(row?.agentId)}
              >
                Change
              </Typography>
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      {/* end */}
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "#D1E9FF",
          }}
          colSpan={7}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <Box>
                  <Typography
                    color={"var(--primary-color)"}
                    sx={{ fontSize: "15px" }}
                    my={2}
                  >
                    Company Information
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",

                          fontWeight: "500",
                        }}
                      >
                        Company Name
                      </label>
                      <input
                        required
                        className="u-input"
                        name="name"
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",

                          fontWeight: "500",
                        }}
                      >
                        Client Name
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={clientName}
                        placeholder={"Client Name"}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",

                          fontWeight: "500",
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={phone}
                        placeholder={"Phone Number "}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",

                          fontWeight: "500",
                        }}
                      >
                        Email
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={email}
                        placeholder={"Staff Designation "}
                        // onChange={(e) => setStaffDesignation(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",

                          fontWeight: "500",
                        }}
                      >
                        Company Address
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={companyadd}
                        placeholder={"Company Address"}
                        onChange={(e) => setCompanyadd(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} justifyContent="flex-end" my={2}>
                    <Grid item>
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "var( --mateBlack)",
                          padding: "5px 20px",
                          color: "#fff",
                          borderRadius: "0px",
                        }}
                        onClick={handleSubmit}
                      >
                        UPDATE
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const AdminAccount = () => {
  const user = secureLocalStorage.getItem("admin-info");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agentData, setAgentData] = useState([]);
  let agentID = user?.user.agentId;

  useEffect(() => {
    setIsLoading(false);
    let url = `https://api.flyfarint.com/v.1.0.0/Accounts/MyAccount.php?agentId=${agentID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setAgentData(data);
      })
      .catch((err) => {
        setIsLoading(true);
        Swal.fire({
          // imageUrl: ServerDown,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: "Server Down",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(function () {
          navigate(-1);
        });
      });
  }, []);

  const classes = useStyles();

  return (
    <Box>
      {/* <AdminHeader /> */}
      <Container style={{ marginTop: "20px", padding: "0" }}>
        <Box>
          <Grid container justifyContent={"space-between"}>
            <Typography
              variant="span"
              sx={{
                fontWeight: 400,
                fontSize: "24px",
                color: "var(--mateBlack)",
              }}
            >
              Company Information Details
            </Typography>
          </Grid>

          <Box mt={3} className="Staff-table">
            {!isLoading ? (
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "70vh",
                    width: "70vw",
                    marginInline: "auto",
                  }}
                >
                  <Box
                    style={{
                      width: "50%",
                      height: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={Loader}
                      alt="loader"
                      style={{
                        width: "40%",
                        objectFit: "center",
                      }}
                    />
                  </Box>
                </Box>
              </>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      height: "0px !important",
                      width: "100%",
                    }}
                  >
                    <TableRow
                      className={classes.tableRow}
                      style={{
                        color: "red",
                        margin: "0px",
                        padding: "0",
                        minHeight: "0px",
                      }}
                    >
                      <TableCell
                        align="left"
                        style={{ color: "#fff", width: "20%" }}
                      >
                        Company Name
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{ color: "#fff", width: "15%" }}
                      >
                        Client Name
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "#fff", width: "10%" }}
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "#fff", width: "15%" }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "#fff", width: "30%" }}
                      >
                        Address
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: "#fff", width: "10%" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agentData?.map((row) => (
                      <Row key={row.id} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminAccount;
