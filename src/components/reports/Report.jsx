import { FeedbackOutlined, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Featured from '../partials/featured/Featured'
import Navbar from '../partials/navbar/Navbar'
import Sidebar from '../partials/sidebar/Sidebar'
import { CSVLink } from "react-csv";

import './report.scss'
import { loadReport } from '../../actions/reports'

const Report = () => {
    const dispatch = useDispatch()
    const [openButtons, setOpenButtons] = useState(false)
    useEffect(() => {
        dispatch(loadReport())
    }, [dispatch])
    const reports = useSelector((state) => state.reports)
    console.log(reports)

    const headers = [
        {label: "Clover ID", key: 'id'},
        {label: "Product Name", key: 'name'},
        {label: "Alternate Name", key: ''},
        {label: "Price", key: "sell"},
        {label: "Cost", key: "cost"},
        {label: "SKU", key: "SKU"},
        {label: "Quantity", key: "quantity"},
        {label: "Label", key: "category"}
    ]
    const csvReport = {
        filename: "Export.csv",
        headers,
        data: reports.products
    }
  return (
    <div className='report'>
        <Sidebar />
        <div className="reportContainer">
            <Navbar />
            <div className="pageheader">
                <div className="title">Reports</div>
            </div>
            <div className="productReport">
                <div className="productHeader">
                    <div className="title">Product Stats</div>
                    <div className="report-button-area">
                        <div className="report-button">
                            <button type='button'>Export Products<span onClick={() => setOpenButtons(!openButtons)}>{openButtons ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}</span></button>
                        </div>
                        { openButtons ? (
                        <div className="report-buttons">
                            <button type='button'><CSVLink {...csvReport} className="csv-link">Export All Products</CSVLink></button>
                            <button type='button'><CSVLink {...csvReport} className="csv-link">Export Expiring Products</CSVLink></button>
                            <button type='button'><CSVLink {...csvReport} className="csv-link">Export Products Low in Stock</CSVLink></button>
                        </div>) : null
                        }
                    </div>
                </div>
                <div className="productContent">
                    <div className="stockReport">
                        <div className="stockText">
                            <div className="stockIcon">
                                <FeedbackOutlined className='icon' />
                            </div>
                            You currently have {reports.products_out_of_stock.length} of {reports.products.length} products unavailable
                        </div>{/* 
                        <div className="stockText">
                            <div className="stockIcon">
                                <FeedbackOutlined className='icon' />
                            </div>
                            You currently have {reports.products_expiring.length} of {reports.products.length} products expiring soon
                        </div> */}
                    </div>
                    <div className="stockChart">
                        <Featured title={"Products"} value={parseInt((((reports.products.length - reports.products_out_of_stock.length) / reports.products.length) * 100).toFixed(2))} subTitle={"Products-In-Stock"} desc={"Percentage of Products currently in stock"} valueAmount={reports.products.length - reports.products_out_of_stock.length} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Report