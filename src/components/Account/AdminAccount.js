import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
// import Loader from "../../../../image/loader/Render.gif";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tableRow: {
    height: "20px",
  },
});

function Row(props) {
  const navigate = useNavigate();
  const { row } = props;

  const [open, setOpen] = React.useState(false);
  const users = secureLocalStorage.getItem("user-info");
  let agentID = users?.user?.agentId;
  const [check, setChecked] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffDesignation, setStaffDesignation] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffPass, setStaffPass] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffStatus, setStaffStatus] = useState("");
  const [staffId, setStaffId] = useState("");

  const updateStaffInfoGet = async (staffId) => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0//Staff/all.php?search=id&agentId=FFA1042&staffId=FFST1006`
    )
      .then((res) => res.json())
      .then((data) => {
        setStaffName(data[0]?.name);
        setStaffEmail(data[0]?.email);
        setStaffDesignation(data[0]?.designation);
        setStaffPhone(data[0]?.phone);
        setStaffPass(data[0]?.password);
        setStaffRole(data[0]?.role);
        setStaffStatus(data[0]?.status);
        setStaffId(staffId);
      });
  };

  const updateStaffData = async () => {
    let url = `https://api.flyfarint.com/v.1.0.0/Staff/edit.php`;
    let body = JSON.stringify({
      staffId: staffId,
      Name: staffName,
      Email: staffEmail,
      Designation: staffDesignation,
      Phone: staffPhone,
      Role: staffRole,
      Status: check ? "Active" : "Deactivate",
      Password: staffPass,
    });
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire({
            // imageUrl: Success,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Staff Details Updated",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          Swal.fire({
            // imageUrl: ServerDown,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Server Error",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  // delete functionality handle here
  const deleteRequest = () => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/Staff/delete.php?staffId=${staffId}&agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        // //console.log(data);
        if (data.status === "success") {
          Swal.fire({
            // imageUrl: Delete,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Staff Deleted",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        }
      });
  };

  return (
    <React.Fragment>
      {/* visual data */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.role} </TableCell>
        <TableCell align="left">{row.designation}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.phone}</TableCell>
        <TableCell align="left">
          {row.created
            ? format(new Date(row.created), "dd MMM yyyy hh:mm a")
            : "Created Time"}
        </TableCell>
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
                onClick={() => updateStaffInfoGet(row?.staffId)}
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
              {/* <Typography variant="h6" gutterBottom component="div">
                    History
                  </Typography> */}
              <Table size="small" aria-label="purchases">
                <Box>
                  <Typography
                    color={"var(--primary-color)"}
                    style={{ fontFamily: "poppins", fontSize: "15px" }}
                    my={2}
                  >
                    Company Information
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",
                          fontFamily: "poppins",
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
                        placeholder="Staff Name"
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Agent Name
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffEmail}
                        placeholder={"Email "}
                        onChange={(e) => setStaffEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffPhone}
                        placeholder={"Phone Number "}
                        onChange={(e) => setStaffPhone(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Email
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffDesignation}
                        placeholder={"Staff Designation "}
                        onChange={(e) => setStaffDesignation(e.target.value)}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <label
                        style={{
                          color: "#2564B8",
                          fontFamily: "poppins",
                          fontWeight: "500",
                        }}
                      >
                        Company Address
                      </label>
                      <input
                        className="u-input"
                        name="name"
                        type="text"
                        value={staffRole}
                        placeholder={"Staff Role "}
                        onChange={(e) => setStaffRole(e.target.value)}
                      />
                    </Grid>

                    <Grid item md={3}>
                      <Box className="input-File2">
                        <label
                          style={{
                            color: "#2564B8",
                            fontFamily: "poppins",
                            fontWeight: "500",
                          }}
                        >
                          Company Logo
                        </label>

                        <input
                          className="u-input"
                          name="name"
                          type="file"
                          // value={staffPass}
                          placeholder={"Staff Pass "}
                          onChange={(e) => setStaffPass(e.target.value)}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box my={2} style={{ display: "none" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onClick={(e) => setChecked(e.target.checked)}
                        />
                      }
                      label={check ? "Active" : "Deactivate"}
                    />
                  </Box>

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
                        onClick={updateStaffData}
                      >
                        UPDATE
                      </Button>
                    </Grid>
                    {/* <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{
                          backgroundColor: "crimson",
                          padding: "5px 20px",
                          color: "#fff",
                          borderRadius: "0px",
                        }}
                        onClick={deleteRequest}
                      >
                        Delete
                      </Button>
                    </Grid> */}
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
  const [users, setUsers] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    const users = secureLocalStorage.getItem("user-info");
    if (users) {
      setUsers(users);
    }
  }, []);
  let agentID = users?.user?.agentId;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("880");
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let url = "https://api.flyfarint.com/v.1.0.0/Staff/add.php";
    let body = JSON.stringify({
      agentId: agentID,
      Name: name,
      Email: email,
      Designation: designation,
      Phone: phone,
      Role: role,
      Password: password,
    });
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setIsSubmit(false);
          e.target.reset();
          Swal.fire({
            //   imageUrl: AddStaff,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            title: "Staff added successfully",
            html: "If you have any queries please contact us at support@flyfarint.com or 01755-572099, 09606912912",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Ok",
          }).then(function () {
            navigate(0);
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        setIsSubmit(false);
        e.target.reset();
        Swal.fire({
          // imageUrl: Invalid,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: err.message,
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate(0);
        });
      });
    setOpen(false);
    e.target.reset();
  };
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    let url = `https://api.flyfarint.com/v.1.0.0//Staff/all.php?search=id&agentId=FFA1042&staffId=FFST1006`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setStaffs(data);
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
  }, [agentID]);

  const classes = useStyles();

  return (
    <Box>
      <Container maxWidth="xl" style={{ marginTop: "50px" }}>
        <Box>
          <Grid container justifyContent={"space-between"}>
            <Typography
              color={"var(--mateBlack)"}
              fontSize="22px"
              fontWeight={500}
            >
              Company Information
            </Typography>
            {/* <Typography
              bgcolor="var(--primary-color)"
              color={"#fff"}
              p={"7px 30px"}
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            >
              <Link
                to={"/addstaff"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Add Staff
              </Link>
            </Typography> */}
          </Grid>

          <Box mt={2} className="Staff-table">
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
                      //   src={Loader}
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
                    }}
                  >
                    <TableRow className={classes.tableRow}>
                      {/* <TableCell align="left" style={{ color: "#fff" }}>
                    Sl no{" "}
                  </TableCell> */}
                      <TableCell align="left" style={{ color: "#fff" }}>
                        Company Name
                      </TableCell>
                      {/* <TableCell align="left" style={{ color: "#fff" }}>
                    Status{" "}
                  </TableCell> */}
                      <TableCell align="left" style={{ color: "#fff" }}>
                        Logo
                      </TableCell>
                      <TableCell align="left" style={{ color: "#fff" }}>
                        Client Name
                      </TableCell>
                      <TableCell align="left" style={{ color: "#fff" }}>
                        Phone
                      </TableCell>
                      <TableCell align="left" style={{ color: "#fff" }}>
                        Email
                      </TableCell>
                      <TableCell align="left" style={{ color: "#fff" }}>
                        Address
                      </TableCell>
                      <TableCell align="center" style={{ color: "#fff" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staffs.map((row) => (
                      <Row key={row.name} row={row} />
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
