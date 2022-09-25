import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router"
import { getClients } from '../../../actions/clients'
import { sendDispatch } from '../../../actions/dispatches'
import { getProducts } from '../../../actions/products'
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

import './send.scss'

const Send = ({inputs}) => {
  let dispatches = useSelector((state) => state.dispatches)
  let products = useSelector((state) => state.products)
  let clients = useSelector((state) => state.clients)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    client: dispatches ? (dispatches.client) : "",
    dispatchID: dispatches ? (dispatches.dispatchID) : "",
    dispatch_count: dispatches ? (dispatches.dispatch_count) : 0,
    product: dispatches ? (dispatches.product) : ""
})

const dispatchSend = (e) => {
  e.preventDefault()
  let client = document.querySelector("#client").value
  let product = document.querySelector("#product").value
  let dispatch_count = document.querySelector('#dispatch_count').value
  let dispatchID = document.querySelector('#dispatchID').value
  dispatch(sendDispatch({client, product, dispatch_count, dispatchID}, navigate))
  console.log({client, product, dispatch_count, dispatchID})

}

useEffect(() => {
  dispatch(getProducts(""))
  dispatch(getClients())
}, [dispatch])
  return (
    <div className='send'>
        <Sidebar/>
        <div className="sendContainer">
            <Navbar/>
            <div className="pageheader">
                <div className="title">Dispatch Items</div>
            </div>
            <div className="formContainer">
                <form>
                    <input type="hidden" name="dispatchID" id='dispatchID' value="" />
                    <div className="formInput">
                      <select id='product' className='select-input'>
                          {products.map((input) => (
                              <option value={input._id}>{input.name}</option>
                          ))}
                      </select>
                      <label className='create-label' htmlFor="product">Product Name</label>
                    </div>

                    <div className="formInput">
                      <select id='client' className='select-input'>
                          {clients.map((input) => (
                              <option value={input._id}>{input.name}</option>
                          ))}
                      </select>
                      <label className='create-label' htmlFor="client">Client</label>
                    </div>
                    {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                          {input.type =="date" ? (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={values[input.target]} placeholder=" " />) : (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={values[input.target]} placeholder=" " />)}                            
                          <label className="create-label" htmlFor={input.target}>{input.label}</label>
                        </div>
                    ))}
                    <button type='button' onClick={dispatchSend}>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Send