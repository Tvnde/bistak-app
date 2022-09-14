import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getProducts } from '../../../actions/products'

import './card.scss'

const Card = ({shelf}) => {
    let products = useSelector((state) => state.products)
    let shelf_products = JSON.parse(shelf.products).map((product) => {
        console.log(product)
        return products.filter((one_product) => {return one_product._id == product})[0]
    })
    console.log(shelf_products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
  return (
    <div className='card-shelf'>
        <div className="card-content">
          <div className="card-above">
            <div className="product-imgs">{
              shelf_products.map((product) => (
                <div className="product-img">
                  <img src={product.image!="" ? product.image : "https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png"} />
                </div>
              ))}
            </div>
            <div className="product-name">{/* 
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
          </div>
        </div>
    </div>
  )
}

export default Card