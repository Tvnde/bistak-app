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
            <div className="cards">
                {dispatches.map((dispatch1) => (
                    <Card disp={dispatch1}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Dispatch