import React from 'react'
import Navbar from '../../partials/navbar/Navbar'

import Sidebar from '../sidebar/Sidebar'

import './warehouse.scss'

const Warehouse = () => {
  return (
    <div className='warehouse'>
        <Sidebar/>
        <div className="warehouseContainer">
          <Navbar/>
        </div>
    </div>
  )
}

export default Warehouse