import React, {useState, useEffect} from 'react'

import './navbar.scss'

import { DarkModeOutlined, LanguageOutlined, NotificationsNone, SearchOutlined } from '@mui/icons-material'
import Dropdown from '../dropdown/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { loadNotifications } from '../../../actions/notifications'
import { searchProduct } from '../../../actions/products'
import { useNavigate } from 'react-router-dom'
import { searchBatches } from '../../../actions/batches'

const Navbar = () => {
    const notifications = useSelector((state) => state.notifications)
    const [open, setOpen] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    if(JSON.parse(localStorage.getItem('profile'))) {
        navigate('/login')
    }
    const searchProduct1 = () => {
        console.log(document.getElementById('search-text').value)
        let query = (document.getElementById('search-text').value)
        let role = JSON.parse(localStorage.getItem('profile')).role
        if(role == "Warehouse Manager") dispatch(searchBatches(query))
        else dispatch(searchProduct(query))
    }
  return (
    <div className='dashboard-navbar'>
        <div className="dashboard-wrapper">
            <div className="search">
                {JSON.parse(localStorage.getItem('profile')).role == "Stock Officer" ? <input type='text' className='searchText' id='search-text' placeholder="Search Users and Products" onChange={searchProduct1}/> : <input type='text' className='searchText' id='search-text' placeholder="Search Batches and Dispatches" onChange={searchProduct1}/>}
                <SearchOutlined className='icon' />
            </div>
            <div className="dashboard-items">
                <div className="dashboard-item">
                    <LanguageOutlined className='icon' />
                    English
                </div>
                <div className="dashboard-item">
                    <DarkModeOutlined className='icon' />
                </div>
                <div className="dashboard-item" onClick={() => setOpen(!open)}>
                    <NotificationsNone className='icon' />
                    {!open ? (<div className="counter">{notifications.length}</div>) : <Dropdown notifications = {notifications} />}
                </div>
                <div className="dashboard-item">
                    <img
                        src='https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGltZXxlbnwwfHwwfHw%3D&w=1000&q=80'
                        alt=''
                        className='avatar'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar