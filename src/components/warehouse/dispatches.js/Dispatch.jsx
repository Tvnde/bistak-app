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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadDispatches())
  }, [dispatch])
  
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
                        <Link to = "/dispatches/send" style={{textDecoration: "none", color: 'white'}}>Export Dispatches</Link>
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