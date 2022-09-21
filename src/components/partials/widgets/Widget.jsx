import React from 'react'

import { Link } from 'react-router-dom'

import './widget.scss'

import { CategoryOutlined, InventoryOutlined, KeyboardArrowUp, MonetizationOnOutlined, Store, StorefrontOutlined } from '@mui/icons-material'

const Widget = ({type, value}) => {
  let data;

  switch (type) {
    case "products":
    data = {
      id: "product",
      image: "https://bistakstore.s3.amazonaws.com/images/product-3d.png",
      title: "PRODUCTS",
      link: 'See all products',
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
      link: 'See expiring products',
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
      title: "LOW-ON-STOCK",
      link: 'View low-stocked products',
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
      goto: "/products",
      value: value,
      icon: (
        <InventoryOutlined className='icon' style={{color: 'purple', background: 'rgba(128, 0, 128, 0.2'}}/>
      )
    }
    default:
    break;
  }
  return (
    <div className={`widget widget-${data.id}`}>
        <div className="left">
            <span className='widget-icon'>{data.icon}</span>
            <span className="counter">{data.value}{data.isPercentage && "%"}</span>
            <span className="title">{data.title}</span>
            <Link to ={data.goto}><span className="link">{data.link}</span></Link>
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