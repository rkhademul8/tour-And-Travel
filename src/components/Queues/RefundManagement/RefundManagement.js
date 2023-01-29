import React, { useEffect, useState } from 'react';
import './RefundManagement.css'
import DataTable from 'react-data-table-component'
import { LineAxisOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'



const RefundManagement = () => {
    const [search, setSearch] = useState("")
    const [countries, setCountries] = useState([])
    const [filterCountries, setFilterCountries] = useState([])


    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                setCountries(data)
                setFilterCountries(data)
            })
    }, [])

    const columns = [

        {
            name: "Country Name",
            selector: (row) => row.name.common
        },

        {
            name: "Capital",
            selector: (row) => row.capital
        },
        {
            name: "Country Image",
            selector: (row) => <img width={50} height={50} src={row.flags.png} />
        },

        {
            name: 'Action',
            cell: (row) => <Button variant='contained' onClick={() => alert('Dont try to edit')}>Edit</Button>
        }
    ]






    useEffect(() => {
        const result = countries.filter(country => {
            return country.name.common.toLowerCase().match(search.toLowerCase())
        })

        setFilterCountries(result)

    }, [search])


    return (
        <div>

            <DataTable

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
                    <input type="text" placeholder='search here'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }

                subHeaderAlign='right'
            >

            </DataTable>
        </div>
    );
};

export default RefundManagement;