import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router";
import { getProducts } from '../../../actions/products'

import { DriveFolderUploadOutlined, RemoveRedEye } from '@mui/icons-material'
import { Inventory2 } from '@mui/icons-material'

import './card.scss'

const Card = ({disp}) => {
    let products = useSelector((state) => state.products)
    let product = products.filter((product) => {return product._id == disp.product})[0]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(disp)

    useEffect(() => {
        dispatch(getProducts(""))
    }, [dispatch])
  return (
    <div className='card_dispatch'>
        <div className="card-content">
          <div className="card-above">
            <div className="product-img">
              <img src= {(product && product.image && product.image!="") ? products.filter((product) => {return product._id == disp.product})[0].image : "https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png"} alt="" />
            </div>
            <div className="product-name">
            {products.filter((product) => {return product._id == disp.product})[0] ? products.filter((product) => {return product._id == disp.product})[0].name : null}
            </div>
          </div>
          <div className="card-below">
            <div className="card-below-top">
              <div className="card-detail"><div className="card-detail-text">{disp.dispatch_count}</div><div className="card-detail-title">ITEM(S)</div></div>
            </div>
            <div className="card-below-bottom">
              {/* <div className="card-detail"><div className="card-detail-text">{batch.collection_count}</div><div className="card-detail-title">ITEMS</div></div>
              <div className="card-detail"><div className="card-detail-text">{batch.date_created.split("T")[0]}</div><div className="card-detail-title">DATE</div></div> */}
            </div>
            <div className="card-below-links">
              <div className="card-link"><span><RemoveRedEye style={{fontSize: '18px'}}/></span> View Details</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Card