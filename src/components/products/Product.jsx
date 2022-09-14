import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import Datatable from '../partials/datatable/Datatable'
import Navbar from '../partials/navbar/Navbar'
import Pageheader from '../partials/pageheader/Pageheader'
import Sidebar from '../partials/sidebar/Sidebar'

import { getProducts, importProducts } from "../../actions/products";

import * as XLSX from "xlsx";

import './product.scss'
import { loadNotifications } from '../../actions/notifications'

const Product = () => {
    let products = useSelector((state) => state.products)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleUpload = () => {
        console.log(fileUpload.current.click(), "fileUpload")
    }
    const readExcel = (file) => {
        setLoading(true)
        const promise = new Promise((resolve, reject) => {
            const fileR = new FileReader()
            fileR.readAsArrayBuffer(file)
            fileR.onload = (e) => {
                const bufferArray = e.target.result

                const wb = XLSX.read(bufferArray, {type: 'buffer'});

                const wsname = wb.SheetNames[0]

                const ws = wb.Sheets[wsname]

                const data = XLSX.utils.sheet_to_json(ws)

                resolve(data)
                console.log(data)
            }

            fileR.onerror = (error) => {
                console.log("Error")
                reject(error)
            }
        })

        promise.then((d) => {
            let array_of_products = d.map(element => {
                return ({id: element["Clover ID"], name: element.Name, cost: 0, sell: element.Price, category: element.Labels, quantity: element.Quantity, SKU: element.SKU})
            });
            console.log(array_of_products)
            dispatch(importProducts(array_of_products))
        })
    }

    useEffect(() => {
        dispatch(getProducts())
        dispatch(loadNotifications())
        setLoading(false)
    }, [dispatch])

    const rows = [
        {
            id: 12345,
            shelf: "A002",
            product: "Oraimo Shark 2",
            category: "Accessories",
            sold: 20,
            price: 30000,
            available: "available"
        },
        {
            id: 23456,
            shelf: "B001",
            product: "Oraimo Vortex 2",
            category: "Accessories",
            sold: 63,
            price: 8000,
            available: "unavailable"
        },
    ]
    
    const columns = [
        { field: 'id', headerName: 'Clover ID', width: 100 },/* 
        { field: 'shelf', headerName: 'Shelf', width: 110 }, */
        { 
            field: 'name',
            headerName: 'Product',
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        <img src={params.row.image ? params.row.image : ("https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png")} alt="avatar" className='cellImg' />
                        {params.row.name}
                    </div>
                )
            }
        },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'sell', headerName: 'Price', width: 80 },
        { field: 'quantity', headerName: 'Quantity', width: 80},
        { 
            field: 'expiry_date',
            headerName: 'Expiry Date',
            width: 100,
            renderCell: (params) => {
                return <div className={`cellWithDate`}>{params.row.expiry_date ? (new Date(params.row.expiry_date)).toDateString() : null}</div>
            }
        },
        {
            field: 'sold',
            headerName: 'Sold',
            type: 'number',
            width: 100,
        },
        {
            field: 'available',
            headerName: 'Available',/* 
            description: 'This column has a value getter and is not sortable.',
            sortable: false, */
            width: 130,
            renderCell: (params) => {
                return <div className={`cellWithStatus ${params.row.available}`}>{params.row.quantity > 0 ? "In Stock" : "Out of Stock"}</div>
            }
            /* valueGetter: (params) =>valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            `${params.row.firstName || ''} ${params.row.lastName || ''}`, */
        },
    ]
    const fileUpload = useRef(null)
    let all_products = products.length == 0 ? [{quantity:"", cost:"", sell: "", sold: "", date_created: "", id: "", name:"No Product Available", category: "", SKU:"", expiry_date: "" }] : products
    console.log(all_products)
  return (
    <div className='products'>
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <div className="pageheader">
                <div className="title">Products</div>
                <div className="actionButtons">
                    <div className="importButton" onClick={handleUpload}>Import Products</div>
                    <input type="file" ref={fileUpload} className='fileImport' onChange={(e) => {
                        const file = e.target.files[0]
                        readExcel(file)
                    }} />
                </div>
            </div>
            {/* <div className={`msg-alert`}>There seems to be a problem somewhere.</div> */}
            <Datatable columns = {columns} rows = {all_products} entity = "product" />
        </div>
    </div>
  )
}

export default Product