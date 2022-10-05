import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getProducts } from '../../../actions/products'
import { DriveFolderUploadOutlined, RemoveRedEye } from '@mui/icons-material'

import './card.scss'

const Card = ({shelf}) => {/* 
    let products = useSelector((state) => state.products)
    let batches = useSelector((state) => state.batches) */
    let shelf_images = shelf.images.split(",")
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    useEffect(() => {
        dispatch(getProducts(""))
    }, [dispatch])
  return (
    <div className='card-shelf'>
        <div className="card-content">
          <div className="card-above">
            <div className="product-imgs">{
              shelf_images.map((image) => (
                <div className="product-img">
                  <img src={(image!="") ? image : "https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png"} />
                </div>
              ))}
            </div>
            <div className="product-name">{
                shelf.products
              /* 
            {products.filter((product) => {return product._id == shelf.product})[0] ? products.filter((product) => {return product._id == shelf.product})[0].name : null} */}
            </div>
          </div>
          <div className="card-below">
            <div className="card-below-top">
              <div className="card-detail"><div className="card-detail-text">{shelf.count}</div><div className="card-detail-title">ITEM(S)</div></div>
            </div>
            <div className="card-below-bottom">{/* 
              <div className="card-detail"><div className="card-detail-text">{batch.collection_count}</div><div className="card-detail-title">ITEMS</div></div>
              <div className="card-detail"><div className="card-detail-text">{batch.date_created.split("T")[0]}</div><div className="card-detail-title">DATE</div></div> */}
            </div>
            <div className="card-below-links">
              <div className="card-link"><span><RemoveRedEye style={{fontSize: '18px'}}/></span> Edit</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Card