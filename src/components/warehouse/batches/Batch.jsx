import React, {useEffect} from 'react'

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { loadBatches } from "../../../actions/batches";

import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

import './batch.scss'
import Card from './Card';

const Batch = () => {
    let batches = useSelector((state) => state.batches)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loadBatches())
    }, [dispatch])
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
                </div>
            </div>
            <div className="cards">
                {batches.map((batch) => (
                    <Card batch={batch}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Batch