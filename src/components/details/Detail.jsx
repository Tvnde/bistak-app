import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

import Chart from '../partials/charts/Chart'
import Navbar from '../partials/navbar/Navbar'
import Sidebar from "../partials/sidebar/Sidebar"

import { getProduct } from "../../actions/products"

import './detail.scss'
import { getUser } from '../../actions/users'

const Detail = ({labels, entity}) => {
    let {id} = useParams()
    const products = useSelector((state) => state.products)
    const users = useSelector((state) => state.users)
    let dispatch = useDispatch()
    useEffect(() => {
        console.log(id)
       { entity == "product" ? dispatch(getProduct(id)) : dispatch(getUser(id)) }
    }, [dispatch])
  return (
    <div className='details'>
        <Sidebar />
        <div className="detailsContainer">
            <Navbar />
            <div className="top">
                <div className="left">
                    <Link to={entity == "product" ? "/products/edit/"+products["_id"] : "/users/edit/"+users["_id"]}><div className="editButton">Edit</div></Link>
                    <h1 className="title">Information</h1>
                     <div className="item">
                        {entity == "product" ? (products["image"] ? (<img src={products["image"]} className='itemImg' />) : (<img src="https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png" alt="" className='itemImg' />)) : (users["image"] ? (<img src={users["image"]} className='itemImg' />) : (<img src="https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png" alt="" className='itemImg' />))}
                        <div className="itemDetails">
                            <h1 className="itemTitle">{entity == "product" ? (products.name) : (users.firstname+" "+users.lastname)}</h1>
                            {labels.titles.map((input) => (
                                <div className="detailItem">
                                    <span className="itemKey">{input.title}:</span>
                                    <span className="itemValue">{entity == "product" ? products[input.value] : (input.value =="status" ? users[input.value] ? "Activated" : "Not Activated" : input.value == "role" ? users[input.value] == "62e3a7ade8c533084e2f7ecb" ? "Stock Officer" : "Warehouse Manager" : users[input.value])}</span>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
                <div className="right">
                    <Chart aspect={3 / 1} title=""/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail