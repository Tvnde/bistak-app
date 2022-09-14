import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router"
import { Link, useParams } from 'react-router-dom'
import { getClients } from '../../../actions/clients'
import Datatable from '../../partials/datatable/Datatable'
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

import './client.scss'

const Client = () => {
    let clients = useSelector((state) => state.clients)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const columns = [
        { field: 'id', headerName: 'Client ID', width: 100 },
        { field: 'type', headerName: 'Client Type', width: 100 },
        { field: 'Name', headerName: 'Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'phonenumber', headerName: 'Phone Number', width: 130 },
    ]

    useEffect(() => {
        dispatch(getClients())
    }, [dispatch])
  return (
    <div className='clients'>
        <Sidebar />
        <div className="clientContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Clients</div>
                <div className="actionButtons">
                    <div className="newButton">
                        <Link to = "/clients/new" style={{textDecoration: "none", color: 'white'}}>Add New Client</Link>
                    </div>
                </div>
            </div>
            <Datatable columns={columns} rows={clients} entity="clients" />
        </div>
    </div>
  )
}

export default Client