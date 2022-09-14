import { FmdBadOutlined, RemoveCircleOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material'
import React from 'react'

import { Link } from "react-router-dom"

import './dropdown.scss'

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

const Dropdown = ({notifications}) => {
  return (
    <div className='dropdowns'>
      {notifications.slice(0, 5).map((notification) => (
        <div className="menu-item">
          <span className="menu-icon">{notification.type == "expiry" ? <FmdBadOutlined /> : (notification.type == "stock" ? <RemoveCircleOutlineOutlined /> : null)}</span>
          <div className="menu-text"><Link to ={`/products/${notification.id}`} style={{textDecoration: "none", color: 'darkgray'}}>{notification.type == "stock" ? (notification.name+" is low on stock"): (notification.type == "expiry" ? (checkExpiry(notification.date, notification.name)) : "Client's birthday")}</Link></div>
      </div>
      ))}
      <div className="menu-item">
        <div className="menu-text" style={{display: "flex", marginTop: "2%", justifyContent: "flex-end", alignItems: "end"}}>
          <Link to={"/notifications"} style={{textDecoration: 'none', fontWeight: '500', color: '#555'}}>See More</Link>
        </div>
      </div>
    </div>
  )
}

export default Dropdown