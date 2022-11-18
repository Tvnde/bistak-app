import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux"
import Navbar from '../../partials/navbar/Navbar'

import Sidebar from '../sidebar/Sidebar'
import Widget from '../../partials/widgets/Widget'

import './warehouse.scss'
import { fetchClients } from '../../../api'
import { loadBatches, loadShelf } from '../../../actions/batches'
import { loadDispatches } from '../../../actions/dispatches'
import { dashboard } from '../../../actions/auth'

import '../../partials/widgets/widget.scss'

const Warehouse = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  let auth = useSelector((state) => state.auth)

  console.log(auth)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(() => {
    const token = user?.token
    if(token) {
        const decodeToken = decode(token)
        if(decodeToken.exp * 1000 < new Date().getTime()) Logout()
        else setUser(JSON.parse(localStorage.getItem("profile")))/* 
        if(!socket){
            setSocket(io("https://bistak-api.herokuapp.com"))
            socket.emit("newUser", user)
        } */
    } else Logout()
    dispatch(dashboard(user.id))
}, [location, dispatch])

const Logout = () => {
  console.log("Logout")
  dispatch({type: 'LOGOUT'})
  navigate('/login')
}
  return (
    <div className='warehouse'>
    <Sidebar />
    <div className="warehouseContainer">
        <Navbar />
        <div className="pageheader">
                <div className="title">Dashboard</div>
            </div>
        <div className="widgets">
            <Widget type="batches" value = {auth.batches}/>
            <Widget type="dispatches" value = {auth.dispatches}/>
            <Widget type="shelves" value = {auth.shelves}/>
            <Widget type="clients" value = {auth.clients}/>
        </div>
{/*         <div className="charts">
            <Featured title={"Products"} value={parseInt(auth.per_stock.toFixed(2))} subTitle={"Products-In-Stock"} desc={"Percentage of Products currently in stock"} valueAmount={parseInt(auth.per_stock.toFixed(2))} />
            <Chart aspect={ 2.4 / 1 }/>
        </div> */}
        {/* <div className="listContainer">
            <div className="listTitle">Latest Products</div>
            <List />
        </div> */}
    </div>
    </div>
  )
}

export default Warehouse
