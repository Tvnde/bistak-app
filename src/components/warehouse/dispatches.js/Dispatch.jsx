import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { loadDispatches } from '../../../actions/dispatches'
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Card from './Card'

import { CSVLink } from "react-csv"

import './dispatch.scss'
import Datatable from '../../partials/datatable/Datatable'

const Dispatch = () => {
  let dispatches = useSelector((state) => state.dispatches)
  console.log(dispatches)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadDispatches())
  }, [dispatch])

  const headers = [
    {label: "Dispatch ID", key: 'dispatchID'},
    {label: "Batches", key: 'batches'},
    {label: "Group ID", key: 'groupID'},
    {label: "Product", key: 'product_name'},
    {label: "Dispatch Count", key: 'dispatch_count'},
    {label: "Client", key:'client_name'},
    {label: "Date", key: 'date_created'}
]
const dispatchReport = {
    filename: "Export_Dispatches.csv",
    headers,
    data: dispatches
}

const columns = [
    { field: 'id', headerName: 'Dispatch ID', width: 100 },/* 
    { field: 'shelf', headerName: 'Shelf', width: 110 }, */
    { 
        field: 'product_name',
        headerName: 'Product',
        width: 300,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img src={params.row.image ? params.row.image : ("https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png")} alt="avatar" className='cellImg' />
                    {params.row.product_name}
                </div>
            )
        }
    },
    { field: 'dispatch_count', headerName: 'Dispatch Count', width: 100 },
    { field: 'batches', headerName: 'Batch(es)', width: 100 },
    { field: 'client', headerName: 'Client', width: 140},
]

let all_dispatches = dispatches.length == 0 ? [{id: "", product_name: "", batches: "", dispatch_count: "", client: ""}] : dispatches
  
  return (
    <div className='dispatch'>
        <Sidebar/>
        <div className="dispatchContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Dispatches</div>
                <div className="actionButtons">
                    <div className="newButton">
                        <Link to = "/dispatches/send" style={{textDecoration: "none", color: 'white'}}>Send Dispatch</Link>
                    </div>
                    <div className="newButton">
                        <CSVLink {...dispatchReport} className="csv-link">Export Dispatches</CSVLink>
                    </div>
                </div>
            </div>
            <Datatable columns = {columns} rows = {all_dispatches} entity = "dispatches" />
{/*             <div className="cards">
                {dispatches.map((dispatch1) => (
                    <Card disp={dispatch1}/>
                ))}
            </div> */}
        </div>
    </div>
  )
}

export default Dispatch