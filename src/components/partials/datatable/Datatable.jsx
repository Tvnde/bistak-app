import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router'

import './datatable.scss'

import { DataGrid } from "@mui/x-data-grid"
import Modal from '../modals/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../../actions/products'

const Datatable = ({columns, rows, entity}) => {
    console.log(entity)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [rows1, setRows1] = useState(rows)
    let products = useSelector((state) => state.products)
    let users = useSelector((state) => state.users)

/*     const openModal = () => {
        setShowModal(prev => !prev)
    } */

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={entity == "user" ? "/users/"+params.row._id : "/products/"+params.row._id} style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <Link to={entity == "user" ? "/users/delete/"+params.row._id : "/products/delete/"+params.row._id} style={{textDecoration: "none"}}>
                            <div className="deleteButton">Delete</div>
                        </Link>
                    </div>
                )
            }
        }
    ]
  return (
    <div className='datatable'>
        <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
        />
    </div>
  )
}

export default Datatable