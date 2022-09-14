import React, { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import Navbar from '../partials/navbar/Navbar'
import Sidebar from '../partials/sidebar/Sidebar'

import { getProduct, saveProduct } from "../../actions/products"

import './create.scss'

import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { getUser, saveUser } from '../../actions/users'

const Create = ({inputs, title, entity}) => {
    const [file, setFile] = useState("")
    let products = useSelector((state) => state.products)
    console.log(products)
    let users = useSelector((state) => state.users)
    console.log(users)
    const [values, setValues] = useState({
        name: products ? (products.name) : "",
        quantity: products ? products.quantity : "",
        category: products ? products.category : "",
        id: products ? products.id : "",
        SKU: products ? products.SKU : "",
        sell: products ? products.sell : "",
        expiry_date: products ? products.expiry_date : "",
    })
    const [valuet, setValuet] = useState({
        firstname: users ? users.firstname : "",
        lastname: users ? users.lastname : "",
        email: users ? users.email : "",
        phonenumber: users ? users.phonenumber : "",
        id: users ? users.id : "",
    })
    const [loading, setLoading] = useState(false)
    let {id} = useParams()
    console.log(id)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    useEffect(() => {
        setLoading(false)
        {entity == "product" ? dispatch(getProduct(id)) : dispatch(getUser(id))}
        console.log(users)
    }, [dispatch])


    const handleProductEdit = async(e) => {
        console.log("Here")
        e.preventDefault()
        setLoading(true)
        let imageInput = document.querySelector("#file").files[0]
        console.log(imageInput)
        let imgUrl = ""
        if(imageInput) {
        let { url } = await fetch("https://bistak-api.herokuapp.com/s3Url").then(res => res.json())
        console.log(url)
    
        await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: imageInput
        })
        imgUrl = url.split('?')[0]
    } else{
        console.log("No image input")
    }
        let name = document.querySelector("#name").value
        let quantity = document.querySelector("#quantity").value
        let category = document.querySelector("#category").value
        let id = document.querySelector("#id").value
        let sell = document.querySelector("#sell").value
        let SKU = document.querySelector("#SKU").value
        let expiry_date = ""
        console.log(document.querySelector("#expiry_date").value.length)
        if(document.querySelector("#expiry_date").value !=null && document.querySelector("#expiry_date").value != ""){
            expiry_date = document.querySelector("#expiry_date").value
        }
        let _id = document.querySelector("#productId").value
        let image = imgUrl
    
        dispatch(saveProduct({name, quantity, category, id, sell, SKU, expiry_date, image, _id }))
        navigate('/products')
    }

    const handleUserEdit = async(e) => {
        e.preventDefault()
        let imageInput = document.querySelector("#file").files[0]
        console.log(imageInput)
        let imgUrl = ""
        if(imageInput) {
        let { url } = await fetch("https://bistak-api.herokuapp.com/s3Url").then(res => res.json())
        console.log(url)
    
        await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: imageInput
        })
        imgUrl = url.split('?')[0]
    } else{
        console.log("No image input")
    }
        let firstname = document.querySelector("#firstname").value
        let lastname = document.querySelector("#lastname").value
        let email = document.querySelector("#email").value
        let phone = document.querySelector("#phonenumber").value
        let password = document.querySelector("#password").value
        let role = document.querySelector("#role").value

        let _id = document.querySelector("#userId").value

        console.log({firstname, lastname, email, phone, password, role, _id, image: imgUrl})
        dispatch(saveUser({firstname, lastname, email, phone, role, password, _id, image: imgUrl}))
        navigate('/users')
    }
  return (
    <div className='create'>
        <Sidebar />
        <div className="newContainer">
            <Navbar />
            <div className="top">
                <h1>{title}</h1>
            </div>
            <div className="bottom">
                <div className="left">
                    <img src={
                        file
                            ? URL.createObjectURL(file)
                            : "https://bistakstore.s3.amazonaws.com/images/no-image-icon.png"
                    } alt="" />
                </div>
                <div className="right">
                    <form>
                        {entity=="product" ? (<input type="hidden" id="productId" defaultValue={id? id : ""} />) : (<input type="hidden" id="userId" defaultValue={id? id : ""} />) }
                        <div className="formInput">
                            <label className="create-label" htmlFor="file">Image: <DriveFolderUploadOutlined className="icon" /></label>
                            <input type="file" className='file-input' id="file" style={{display: "none"}} onChange =  { e => setFile(e.target.files[0])} />
                        </div>
                        {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            {input.type =="date" ? (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={entity == "product" ? values[input.target].split("T") : valuet[input.target]} placeholder=" " />) : (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={entity == "product" ? values[input.target] : valuet[input.target]} placeholder=" " />)}
                            
                            <label className="create-label" htmlFor={input.target}>{input.label}</label>
                        </div>
                        ))}
                        {entity == "user" ? (
                            <div className="formInput" key={7}>
                                <select id='role' className='select-input'>
                                    <option value={"Stock Officer"}>Stock Officer</option>
                                    <option value={"Warehouse Manager"}>Warehouse Manager</option>
                                </select>
                                <label className='create-label' htmlFor="role">Role</label>
                            </div>
                        ) : null}
                        {entity == "product" ? (<button type='button' onClick={handleProductEdit}>Send</button>) : (<button type='button' onClick={handleUserEdit}>Send</button>)}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create