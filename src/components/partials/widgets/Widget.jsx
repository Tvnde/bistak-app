import React from 'react'

import { useDispatch } from "react-redux";

import { Link, useNavigate } from 'react-router-dom'

import { getProduct, getProducts } from "../../../actions/products"

import './widget.scss'

import { CategoryOutlined, InventoryOutlined, KeyboardArrowUp, MonetizationOnOutlined, Store, StorefrontOutlined } from '@mui/icons-material'
import { loadBatches, loadShelf } from '../../../actions/batches';
import { getClients } from '../../../actions/clients';
import { loadDispatches } from '../../../actions/dispatches';



const Widget = ({type, value}) => {

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let clickProducts = () => {
    dispatch(getProducts(""))
    navigate('/products')
  }

  let clickExpiredProducts = () => {
    dispatch(getProducts("expiring"))
    navigate('/products')
  }

  let clickLowProducts = () => {
    dispatch(getProducts("low-on-stock"))
    navigate('/products')
  }

  let clickBatches = () => {
    dispatch(loadBatches())
    navigate('/batches')
  }

  let clickShelves = () => {
    dispatch(loadShelf())
    navigate('/shelves')

  }

  let clickClients = () => {
    dispatch(getClients())
    navigate('/clients')
  }

  let clickDispatches = () => {
    dispatch(loadDispatches())
    navigate('/dispatches')
  }

  let data;

  switch (type) {
    case "products":
    data = {
      id: "product",
      image: "https://bistakstore.s3.amazonaws.com/images/product-3d.png",
      title: "PRODUCTS",
      link: 'See all products',
      function: () => clickProducts(),
      value: value,
      goto: "/products",
      icon: (
        <StorefrontOutlined className='icon' style={{color: '#fb501b', background: 'rgba(255, 0, 0, 0.2)', borderRadius: '20%', padding: '1%'}}/>
      )
    }
    break;
    case "categories":
    data = {
      id: "category",
      image: "https://bistakstore.s3.amazonaws.com/images/perspective-3d.png",
      title: "EXPIRING",
      link: 'expiring products',
      function: () => clickExpiredProducts(),
      value: value,
      goto: "/products",
      icon: (
        <CategoryOutlined className='icon' style={{color: 'goldenrod', background: 'rgba(218, 165, 32, 0.2'}}/>
      )
    }
    break;
    case "sales":
    data = {
      id: "sale",
      title: "LOW-STOCK",
      link: 'low-stocked',
      function: () => clickLowProducts(),
      goto: "/products",
      value: value,
      icon: (
        <MonetizationOnOutlined className='icon' style={{color: 'green', background: 'rgba(0, 128, 0, 0.2'}}/>
      )
    }
    break;
    case "stock":
    data = {
      id: "stock",
      title: "IN-STOCK",
      image: "https://bistakstore.s3.amazonaws.com/images/comparison-3d.png",
      isPercentage: true,
      link: 'See all products',
      function: ()=>clickProducts(),
      goto: "/products",
      value: value,
      icon: (
        <InventoryOutlined className='icon' style={{color: 'purple', background: 'rgba(128, 0, 128, 0.2'}}/>
      )
    }
    break;
    case 'batches':
    data = {
      id: "batches",
      title: "BATCHES",
      image: "https://bistakstore.s3.amazonaws.com/images/perspective_matte-489-128x128.png",
      link: "See all batches",
      function: () =>clickBatches(),
      goto: "/batches",
      value,
      icon: (
        <InventoryOutlined className='icon' style={{color: 'purple', background: 'rgba(128, 0, 128, 0.2'}}/>
      )

    }
    break;
    case 'dispatches':
    data = {
      id: "dispatches",
      title: "DISPATCHES",
      image: "https://bistakstore.s3.amazonaws.com/images/perspective_matte-487-128x128.png",
      link: "See all dispatches",
      function: () => clickDispatches(),
      goto: "/dispatches",
      value,
      icon: (
        <InventoryOutlined className='icon' style={{color: 'purple', background: 'rgba(128, 0, 128, 0.2'}}/>
      )

    }
    break;
    case 'shelves':
    data = {
      id: "shelves",
      title: "SHELVES",
      image: "https://bistakstore.s3.amazonaws.com/images/Bookshelf_perspective_matte-128x128.png",
      link: "See all shelves",
      goto: "/shelves",
      function: () => clickShelves(),
      value,
      icon: (
        <InventoryOutlined className='icon' style={{color: 'purple', background: 'rgba(128, 0, 128, 0.2'}}/>
      )

    }
    break;
    case 'clients':
    data = {
      id: "clients",
      title: "CLIENTS",
      image: "https://bistakstore.s3.amazonaws.com/images/comparison-3d.png",
      link: "See all clients",
      goto: "/clients",
      function: () => clickClients(),
      value,
      icon: (
        <InventoryOutlined className='icon' style={{color: 'purple', background: 'rgba(128, 0, 128, 0.2'}}/>
      )

    }
    break;
    default:
    break;
  }
  return (
    <div className={`widget widget-${data.id}`}>
        <div className="left">
            <span className='widget-icon'>{data.icon}</span>
            <span className="counter">{data.value}{data.isPercentage && "%"}</span>
            <span className="title">{data.title}</span>
            <div className='button-widget' onClick={data.function}>{data.link}</div>{/* 
            <Link to ={data.goto}><span className="link">{data.link}</span></Link> */}
        </div>
        <div className="right">
{/*             <div className="percentage positive">
                <KeyboardArrowUp />
                20%
            </div> */}
            <span className="image"><img src={data.image} /></span>
        </div>
    </div>
  )
}

export default Widget