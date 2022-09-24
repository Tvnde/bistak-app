import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loadShelf } from '../../../actions/batches'
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Card from './Card'

import { CSVLink } from "react-csv"

import './shelf.scss'

const Shelf = () => {
    let shelves = useSelector((state) => state.shelves)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(loadShelf())
        console.log(shelves)
    }, [dispatch])

    const headers = [
        {label: "Shelf ID", key: 'shelfID'},
        {label: "Batches", key: 'batches'},
        {label: "Products", key: 'products'},
        {label: "Items Count", key: 'count'},
        {label: "Date", key: 'date_created'}
    ]

    let shelfReport = {
        filename: "Export_Shelves.csv",
        headers,
        data: shelves
    }
  return (
    <div className='shelf'>
        <Sidebar/>
        <div className="shelfContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Shelves</div>
                <div className="actionButtons">
                    <div className="newButton">
                    <CSVLink {...shelfReport} className="csv-link">Export Shelves</CSVLink>
                    </div>
                </div>
            </div>
            <div className="cards">
                {shelves.map((shelf) => (
                    <Card shelf={shelf}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Shelf