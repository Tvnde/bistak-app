import React, {useState, useEffect} from 'react'

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { loadBatches } from "../../../actions/batches";

import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

import { CSVLink } from "react-csv"

import './batch.scss'
import Card from './Card';
import Datatable from '../../partials/datatable/Datatable';

const Batch = () => {
    let batches = useSelector((state) => state.batches)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loadBatches())
    }, [dispatch])

    const headers = [
        {label: "Batch ID", key: "id"},
        {label: "Group ID", key: 'groupID'},
        {label: "Product", key: 'product_name'},
        {label: "Production Date", key: 'production_date'},
        {label: "Expiry Date", key: 'expiry_date'},
        {label: "Batch Count", key: 'batch_count'},
        {label: "Collection Count", key: 'collection_count'},
    ]
    const batchReport = {
        filename: "Export_Batches.csv",
        headers,
        data: batches
    }
    const columns = [
        { field: 'id', headerName: 'Batch ID', width: 100 },/* 
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
        { field: 'batch_count', headerName: 'Batch Count', width: 100 },
        { field: 'collection_count', headerName: 'ItemsInBatch', width: 100 },
        { field: 'current_count', headerName: 'CurrentItemsCount', width: 140},
        { 
            field: 'expiry_date',
            headerName: 'Expiry Date',
            width: 150,
            renderCell: (params) => {
                return <div className={`cellWithDate`}>{params.row.expiry_date ? (new Date(params.row.expiry_date)).toDateString() : null}</div>
            }
        },
    ]
    let all_batches = batches.length == 0 ? [{id: "", product_name: "", batch_count: "", collection_count: "", current_count: "", expiry_date: ""}] : batches
    const [viewType, setViewType] = useState("list")
  return (
    <div className='batches'>
        <Sidebar/>
        <div className="batchContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Batches</div>
                <div className="actionButtons">
                    <div className="newButton">
                        <Link to = "/batches/receive" style={{textDecoration: "none", color: 'white'}}>Receive Batch</Link>
                    </div>
                    <div className="newButton">
                        <CSVLink {...batchReport} className="csv-link">Export Batches</CSVLink>
                    </div>
                    {viewType == "list" ? <div className="newButton" onClick={() => setViewType("grid")}>Grid View</div> : <div className="newButton" onClick={() => setViewType("list")}>List View</div>}
                </div>
            </div>
            {viewType == "list" ? (<Datatable columns = {columns} rows = {all_batches} entity = "batches" />) : (<div className="cards">
                {batches.map((batch) => (
                    <Card batch={batch}/>
                ))}
            </div>)}
            {/* <div className="cards">
                {batches.map((batch) => (
                    <Card batch={batch}/>
                ))}
            </div> */}
            
            
        </div>
    </div>
  )
}

export default Batch