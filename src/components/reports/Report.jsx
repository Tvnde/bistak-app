import { FeedbackOutlined } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Featured from '../partials/featured/Featured'
import Navbar from '../partials/navbar/Navbar'
import Sidebar from '../partials/sidebar/Sidebar'
import { CSVLink } from "react-csv";

import './report.scss'
import { loadReport } from '../../actions/reports'

const Report = () => {
    const dispatch = useDispatch()
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
                    <div className="button">
                        <button type='button'><CSVLink {...csvReport} className="csv-link">Export Products</CSVLink></button>
                    </div>
                </div>
                <div className="productContent">
                    <div className="stockReport">
                        <div className="stockIcon">
                            <FeedbackOutlined className='icon' />
                        </div>
                        <div className="stockText">
                            You currently have <span className='text-bold'>{reports.products_out_of_stock.length}</span> of <span className='text-bold'>{reports.products.length}</span> products unavailable
                        </div>
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