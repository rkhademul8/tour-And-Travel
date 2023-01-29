import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import {
  Box,
  Button,
  Container,
  Input,
  Pagination,
  Stack,
} from "@mui/material";
import { Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { format } from "date-fns";

const Traveller = () => {
  const users = secureLocalStorage.getItem("user-info");
  const agentID = users?.user?.agentId;
  const [travellers, setTravellers] = useState([]);
  const [search, setSearch] = useState([]);
  // todo: pagination handle
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  let size = 20;

  useEffect(() => {
    fetch(
      `https://api.flyfarint.com/v.1.0.0/AirMaterials/AllTraveler.php?search=all&agentId=${agentID}`
    )
      .then((res) => res.json())
      .then((data) => {
        data.map((item, index) => (item.serial = index + 1));
        const count = data.length;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setTravellers(data);
        setSearch(data);
      });
  }, [agentID, size]);
  //todo: Handle a page change.
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearch(travellers?.slice((value - 1) * size, value * size));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  //  todo:search functionality handle
  const handelSearchItems = (e) => {
    let searchInput = e.target.value;
    if (searchInput !== "") {
      const filterData = travellers.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setSearch(filterData);
    } else if (searchInput === "") {
      setSearch(travellers);
    }
  };

  return (
    <Box style={{ marginTop: "50px" }}>
      <Container maxWidth="xl" >
        <Typography
          variant="span"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            margin: "30px 0px",
            color: "#222222",
            fontFamily: "poppins",
          }}
        >
          Travelers
        </Typography>
        <Box
          sx={{
            margin: "30px 0px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="span"
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              color: "var(--primary-color)",
              fontFamily: "poppins",
            }}
          >
            You can find your all travelers here
          </Typography>

          <Box sx={{ display: "flex", gap: 5 }}>
            <Button
              sx={{
                width: "161px",
                fontSize: "14px",
                textTransform: "capitalize",
                height: "36px",
                background: "var(--primary-color)",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                },
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#fff" }}
                to={"/dashboardhome/addtraveller"}
              >
                Add Travelers
              </Link>
            </Button>
          </Box>
        </Box>
        <Box className="balance-transaction" marginTop={"20px"}>
          <table>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Type</th>
              <th>DOB</th>
              <th>Nationality</th>
              <th>Passport No</th>
              <th>Passport Expire Date</th>
              <th>Passport Copy</th>
              <th>Emali</th>
              <th>Phone </th>
            </tr>
            {search?.slice(0, size).map((traveller) => (
              <tbody>
                <tr>
                  {console.log(traveller)}
                  <td>{traveller?.serial}</td>
                  <td className="fixed-table-row">
                    {traveller?.fName || "Name"} {traveller?.lName}{" "}
                  </td>
                  <td>{traveller?.gender || "gender"}</td>
                  <td>
                    {traveller?.type === "ADT" ? (
                      <>Adult</>
                    ) : traveller?.type === "CNN" ? (
                      <>Child</>
                    ) : (
                      <>Infant</> || "Type"
                    )}
                  </td>
                  <td>
                    {traveller?.dob !== "0000-00-00"
                      ? traveller?.dob
                        ? format(new Date(traveller?.dob), "dd MMM yyyy")
                        : "DOB"
                      : "Invalid Date"}
                  </td>
                  <td>{traveller?.passNation || "Nationality"}</td>
                  <td>{traveller?.passNo || "Passport No"}</td>
                  <td>
                    {traveller?.passEx !== "0000-00-00"
                      ? traveller?.passEx
                        ? format(new Date(traveller?.passEx), "dd MMM yyyy")
                        : "Expire Date"
                      : "Invalid Date"}
                  </td>
                  <td></td>
                  <td>{traveller?.email || "Email"}</td>
                  <td>{traveller?.phone || "Phone"}</td>
                </tr>
              </tbody>
            ))}
          </table>

          <Box
            sx={{
              width: "100%",
              my: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                onChange={handlePageChange}
                shape="rounded"
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Traveller;
