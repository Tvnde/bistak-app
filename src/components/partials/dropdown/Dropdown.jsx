import { FmdBadOutlined, RemoveCircleOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from "react-redux"

import { Link, useNavigate } from "react-router-dom"
import { getProduct } from '../../../actions/products'

import './dropdown.scss'



const Dropdown = ({notifications}) => {
  console.log(notifications)
  let dispatch = useDispatch()
  let navigate = useNavigate()

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

const setProduct = (product_id) => {
  dispatch(getProduct(product_id))
  navigate('/products/'+product_id)
}
  return (
    <div className='dropdowns'>
      {notifications.slice(0, 5).map((notification) => (
        <div className="menu-item">
          <span className="menu-icon">{notification.type == "expiry" ? <FmdBadOutlined /> : (notification.type == "stock" ? <RemoveCircleOutlineOutlined /> : null)}</span>
          <div className="menu-text" onClick={() => setProduct(notification.id)}>{notification.type == "stock" ? (notification.name+" is low on stock"): (notification.type == "expiry" ? (checkExpiry(notification.date, notification.name)) : "Client's birthday")}</div>
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