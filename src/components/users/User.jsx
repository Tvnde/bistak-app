import {React, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Datatable from '../partials/datatable/Datatable'
import Navbar from '../partials/navbar/Navbar'
import Pageheader from '../partials/pageheader/Pageheader'
import Sidebar from '../partials/sidebar/Sidebar'

import { getUsers } from "../../actions/users";

import './user.scss'

const User = () => {
    let users = useSelector((state) => state.users)
    console.log(users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const columns = [
        { field: 'id', headerName: 'User ID', width: 100 },
        { field: 'firstname', headerName: 'First Name', width: 110 },
        { field: 'lastname', headerName: 'Last Name', width: 110 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phonenumber', headerName: 'Phone Number', width: 130 },
    ]
    let all_users = users.length == 0 ? [{firstname:"No User Available", lastname:"", email: "", phonenumber: "", role: "", id: ""}] : users
  return (
    <div className='user'>
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <div className="pageheader">
                <div className="title">Users</div>
                <div className="actionButtons">
                    <div className="newButton">
                        <Link to = "/users/new" style={{textDecoration: "none", color: 'white'}}>Add New User</Link>
                    </div>
                </div>
            </div>
            <Datatable columns = {columns} rows = {all_users} entity = "user" />
        </div>
    </div>
  )
}

export default User