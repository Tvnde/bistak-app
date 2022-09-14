import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loadShelf } from '../../../actions/batches'
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Card from './Card'

import './shelf.scss'

const Shelf = () => {
    let shelves = useSelector((state) => state.shelves)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(loadShelf())
        console.log(shelves)
    }, [dispatch])
  return (
    <div className='shelf'>
        <Sidebar/>
        <div className="shelfContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Shelves</div>
{/*                 <div className="actionButtons">
                    <div className="newButton">
                        <Link to = "/shelves/receive" style={{textDecoration: "none", color: 'white'}}>Receive Batch</Link>
                    </div>
                </div> */}
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