import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux"
import Sidebar from '../partials/sidebar/Sidebar'

import './home.scss'
import Navbar from '../partials/navbar/Navbar'
import Widget from '../partials/widgets/Widget'
import Featured from '../partials/featured/Featured'
import Chart from '../partials/charts/Chart'
import Pageheader from '../partials/pageheader/Pageheader'
import { dashboard } from '../../actions/auth'
import { loadNotifications } from '../../actions/notifications'
/* 
import { io } from "socket.io-client" */

const Home = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    let auth = useSelector((state) => state.auth)
    console.log(auth)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))/* 
    const [socket, setSocket] = useState(JSON.parse(localStorage.getItem('socket'))) */
    const Logout = () => {
        console.log("Logout")
        dispatch({type: 'LOGOUT'})
        navigate('/login')
    }
    useEffect(() => {
        const token = user?.token
        if(token) {
            const decodeToken = decode(token)
            if(decodeToken.exp * 1000 < new Date().getTime()) Logout()
            else setUser(JSON.parse(localStorage.getItem("profile")))
            if(JSON.parse(localStorage.getItem("profile")).role !== "Stock Officer") {
                console.log(localStorage.getItem("profile").role)
                navigate('/warehouse')   
            }/* 
            if(!socket){
                setSocket(io("https://bistak-api.herokuapp.com"))
                socket.emit("newUser", user)
            } */
            dispatch(loadNotifications())
            dispatch(dashboard(user.id))
        } else Logout()
    }, [location, dispatch, Logout, navigate, user.id, user?.token])
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="dashboard-container">
                <Navbar />
                <Pageheader title="Home" />
                <div className="widgets">
                    <Widget type="products" value = {auth.products}/>
                    <Widget type="categories" value = {auth.expired_count ? auth.expired_count.length : 0}/>
                    <Widget type="sales" value = {auth.low_stock}/>
                    <Widget type="stock" value = {auth.per_stock.toFixed(2)}/>
                </div>
                <div className="charts">
                    <Featured title={"Products"} value={parseInt(auth.per_stock.toFixed(2))} subTitle={"Products-In-Stock"} desc={"Percentage of Products currently in stock"} valueAmount={parseInt(auth.per_stock.toFixed(2))} />
                    <Chart aspect={ 2.4 / 1 }/>
                </div>
                {/* <div className="listContainer">
                    <div className="listTitle">Latest Products</div>
                    <List />
                </div> */}
            </div>
        </div>
    )
    
}

export default Home