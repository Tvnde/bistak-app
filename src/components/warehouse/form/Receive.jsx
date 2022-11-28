import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router"
import { getProducts } from '../../../actions/products'
import { receiveBatch } from "../../../actions/batches"
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

import './receive.scss'

const Receive = ({inputs}) => {
    let batches = useSelector((state) => state.batches)
    let products = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        product: batches ? batches.product : "",
        production_date: batches ? batches.production_date : "",
        expiry_date: batches ? batches.expiry_date : "",
        id: batches ? batches.id : "",
        groupID: batches ? batches.groupID : "",
        collection_count: batches ? batches.collection_count : "",
        batch_count: batches ? batches.batch_count : "",
    })

    const [productv, setProductv] = useState(false)
    const [groupid, setGroupid] = useState(false)

    const batchReceive = (e) => {
        e.preventDefault()
        let groupID = document.querySelector("#groupID").value
        let group_array = groupID.replace(/\s/g, "").split(",")
        let production_date = document.querySelector('#production_date').value
        let product = document.querySelector("#product").value
        let expiry_date = document.querySelector('#expiry_date').value
        let batch_count = document.querySelector('#batch_count').value
        let collection_count = document.querySelector('#collection_count').value
        let batchID = document.querySelector('#batchID').value
        console.log({groupID, batchID, production_date, product, expiry_date, batch_count, collection_count})
    
        dispatch(receiveBatch({groupID, batchID, production_date, product, expiry_date, batch_count, collection_count}, navigate))
    }
    let validateProduct = (product) => {
        console.log(product)
        setProductv(true)
    }

    let validateGroupIDs = (input) => {

    }

    let validateExpiry = (inputDate) => {
        
    }

    let validateBatchCount = (input) => {

    }

    let validateCollectionCount = (input) => {

    }

    useEffect(() => {
        dispatch(getProducts(""))
    }, [dispatch])
  return (
    <div className='receive'>
        <Sidebar/>
        <div className="receiveContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Receive New Batch</div>
            </div>
            <div className="alert-msg">Fill in necessary Fields</div>
            <div className="formContainer">
                <form>
                    <input type="hidden" name="batchID" id='batchID' value="" />
                    <div className="formInput" key={7}>
                        <select id='product' className='select-input' onChange={(e) => validateProduct(e.target.value)}>
                            {products.map((input) => (
                                <option value={input._id}>{input.name}</option>
                            ))}
                        </select>
                        <label className='create-label' htmlFor="role">Product Name</label>
                    </div>
                    {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            {input.type =="date" ? (<input type={input.type} className={`create-input ${input.target}`} id={input.target} onChange = {(e) => {console.log(e.target.value)}} defaultValue={values[input.target]} placeholder=" " />) : (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={values[input.target]} onChange = {(e) => {console.log(e.target.value)}} placeholder=" " />)}                            
                            <label className="create-label" htmlFor={input.target}>{input.label}</label>
                        </div>
                    ))}
                    <button type='button' onClick={batchReceive}>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Receive