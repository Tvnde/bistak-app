import React from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"


import './sidebar.scss'

import { Dashboard, Store, NotificationsNone, Assessment, Logout, PersonOutline, PeopleOutline, AppSettingsAltOutlined } from "@mui/icons-material"
import { getProducts } from '../../../actions/products'



const Sidebar = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    const logout1 = () => {
        console.log("Hello")
        dispatch({type: 'LOGOUT_SUCCESS'})
        navigate('/login')
    }
    let clickProducts = () => {
        dispatch(getProducts(""))
        navigate('/products')
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <Link to="/" style={{textDecoration: "none"}}>
                <span className="logo">
                    <img src="https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png" alt='' className='logoImg'/>
                </span>
            </Link>
        </div>
        <hr/>
        <div className="centre">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/" style={{textDecoration: "none"}}>
                    <li>
                        <Dashboard className='icon' />
                        <span>Home</span>
                    </li>
                </Link>
                <p className="title">LISTS and STATS</p>
                <div className="link-side" onClick={()=> clickProducts()}>
                    <li>
                        <Store className='icon' />
                        <span>Products</span>
                    </li>
                </div>
                <Link to = "/stats" style={{textDecoration: "none"}}>
                    <li>
                        <Assessment className='icon' />
                        <span>Reports</span>
                    </li>
                </Link>
                <Link to="/notifications" style={{textDecoration: "none"}}>
                    <li>
                        <NotificationsNone className = 'icon' />
                        <span>Notifications</span>
                    </li>
                </Link>
                <p className="title">ADMIN</p>
                    <Link to="/users" style={{textDecoration: "none"}}>
                        <li>
                            <PersonOutline className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/settings" style={{textDecoration: "none"}}>
                        <li>
                            <AppSettingsAltOutlined className='icon' />
                            <span>Settings</span>
                        </li>
                    </Link>
{/*                 <p className="title">CRM</p>
                <li>
                    <PeopleOutline className='icon'/>
                    <span>Clients</span>
                </li> */}
                <p className="title">SETTINGS</p>
                <li onClick={logout1}>
                    <Logout className='icon'/>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="mode"></div>
            <div className="mode"></div>
        </div>
    </div>
  )
}

export default Sidebar