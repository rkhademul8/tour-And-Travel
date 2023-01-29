import React, { useEffect, useState } from "react";
import "./Quotes.css";

import DataTable from "react-data-table-component";
import { LineAxisOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { ClassNames } from "@emotion/react";
import { Box, Container } from "@mui/system";

const Quotes = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilterCountries(data);
      });
  }, []);

  const columns = [
    {
      name: (
        <div className="custom-row">
          <table>
            <td>Abc</td>
          </table>
        </div>
      ),

      selector: (row) => row.name.common,
    },

    {
      name: "Status",
      selector: (row) => row.capital,
    },

    {
      name: "Source",
      selector: (row) => <img width={50} height={50} src={row.flags.png} />,
    },

    {
      name: "Type",
      cell: (row) => (
        <Button variant="contained" onClick={() => alert("Dont try to edit")}>
          Edit
        </Button>
      ),
    },

    {
      name: (
        <div className="parent-table">
          <table>
            <tr>
              <th className="tdTicket" colSpan="3">
                Ticketed
              </th>
            </tr>

            <tr>
              <th>Date</th>
              <th>By</th>
              <th>Agent</th>
            </tr>
          </table>
        </div>
      ),
      selector: (row) => "abc fhgfhgd ,fghgdhfghdgf",
    },

    {
      name: (
        <div className="parent-table">
          <table>
            <tr>
              <th className="tdTicket" colSpan="3">
                Pax
              </th>
            </tr>

            <tr>
              <th>Prime</th>
              <th>Sum</th>
            </tr>
          </table>
        </div>
      ),
      selector: (row) => "abc fhgfhgd ,fghgdhfghdgf",
    },

    {
      name: (
        <div className="parent-table">
          <table>
            <tr>
              <th className="tdTicket" colSpan="3">
                Imported
              </th>
            </tr>

            <tr>
              <th></th>
            </tr>
          </table>
        </div>
      ),
      selector: (row) => "abc fhgfhgd ,fghgdhfghdgf",
    },
  ];

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.common.toLowerCase().match(search.toLowerCase());
    });

    setFilterCountries(result);
  }, [search]);

  return (
    <div>
      {/* <DataTable
                title="Country List"
                columns={columns}
                // data={countries}
                data={filterCountries}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='450px'
                // selectableRows
                // selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={

                    <div className='search-data'>
                        <input type="text" placeholder='search here'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                }

                subHeaderAlign='right'
            >
            </DataTable> */}

      <Container maxWidth="xxl">
        <Box className="data-table-parent">
          <Box className="data-table-parent-content">
            <select>
              <option disabled>Show All</option>
              <option>10</option>
              <option>100</option>
              <option>500</option>
            </select>
            <span> ntries</span>
          </Box>

          <Box className="data-table-child">
            <Box className="data-table-child-content">
              <select>
                <option>Show All</option>
                <option>Quotes</option>
                <option>On Hold</option>
                <option>Pending</option>
                <option>In Process</option>
                <option>Ticketed</option>
                <option>Expired</option>
                <option>Cancalled</option>
                <option>Unconfirmed</option>
                <option>Refund</option>
                <option>Void</option>
                <option>Reissue</option>
              </select>
            </Box>
            <Box className="input-data-search">
              <label>Search:</label>
              <input type="text" />
            </Box>
          </Box>
        </Box>

        <Box>
          <div style={{ overflowX: "auto" }}>
            <table className="table-parent">
              <tr>
                <th>Reference ID</th>
                <th>Status</th>
                <th>Source</th>
                <th>Type</th>
                <th className="custom-td" colSpan={3}>
                  Ticketed
                </th>
                <th colSpan={2}>Pax</th>
                <th>Imported</th>
                <th>Passport/ Visa</th>
                <th>Sales Amount</th>
              </tr>

              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="custom-td">Date</th>
                <th className="custom-td">By</th>
                <th className="custom-td">Agent Name</th>
                <th>Prime</th>
                <th>Sum</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>

              <tr>
                <td>17103335</td>
                <td>pending</td>
                <td>17103335</td>
                <td>17103335</td>
                <td>17103335</td>
                <td>17103335</td>
              </tr>
            </table>
          </div>
        </Box>

        <Box className="pre-next-btn-parent">
          <Box className="pre-next-btn">
            <button className="">Previous</button>
          </Box>
          <Box className="page-show">
            <button>1</button>
          </Box>
          <Box className="pre-next-btn">
            <button>Next</button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Quotes;
