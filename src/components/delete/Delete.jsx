import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteProduct } from '../../actions/products';
import { deleteUser } from '../../actions/users';

import './delete.scss'

const Delete = ({entity}) => {
    let {id} = useParams()
    console.log(id)
    console.log(entity)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const deleteFunc = () => {
        entity == "product" ? dispatch(deleteProduct(id)) : dispatch(deleteUser(id))
        entity == "product" ? navigate('/products') : navigate('/users')
    }

    const goBack = () => {
        entity == "product" ? navigate('/products') : navigate('/users')
    }
  return (
    <div className='delete'>
        <div className="deleteContainer">
            <div className="close-button" onClick={goBack}>Close</div>
            <div className="delete-image">
                <img src="https://bistakstore.s3.amazonaws.com/images/trashcan.jpg" alt="" className='deleteImg' />
            </div>
            <div className="delete-content">
                <div className="delete-text">
                    Are you sure you want to delete this {entity == "product" ? "Product" : "User"}?
                </div>
                <div className="delete-button">
                    <button onClick={deleteFunc}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Delete