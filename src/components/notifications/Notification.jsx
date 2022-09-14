import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../partials/navbar/Navbar'
import Pageheader from '../partials/pageheader/Pageheader'
import Sidebar from '../partials/sidebar/Sidebar'

import './notification.scss'
import { FmdBadOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material'
import { loadNotifications } from '../../actions/notifications'

const checkExpiry = (date, name) => {
  let difference = new Date(date) - new Date()
  console.log(typeof(date))
  console.log(difference)
  if(Math.sign(difference) == -1){
    return name + " has expired. Please Review Item"
  } else {
    return name + " is expiring in "+Math.ceil(difference / (1000*60*60*24))+" days"
  }
}

const Notification = () => {
  
  let dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadNotifications())
  })
  
  let notifications = useSelector((state) => state.notifications)
  return (
    <div className='notifications-all'>
        <Sidebar />
        <div className="notificationContainer">
            <Navbar />
            <Pageheader title = "Notifications"/>
            <div className="notification-content">
              {notifications.map((notification) => (
                <div className="notification-item">
                  <div className="notification-icon">
                  {notification.type == "expiry" ? <FmdBadOutlined /> : (notification.type == "stock" ? <RemoveCircleOutlineOutlined /> : null)}
                  </div>
                  <div className="notification-line">
                    <Link to ={`/products/${notification.id}`} style={{textDecoration: "none", color: 'darkgray'}}>{notification.type == "stock" ? (notification.name+" is low on stock"): (notification.type == "expiry" ? (checkExpiry(notification.date, notification.name)) : "Client's birthday")}</Link>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Notification