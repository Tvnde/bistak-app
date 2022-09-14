import React, { useEffect } from 'react'

import Home from "./components/home/Home"
import Login from './components/login/Login'
import Product from './components/products/Product'
import User from './components/users/User'

import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from './components/details/Detail'
import Create from './components/create/Create'
import { productInputs, userInputs, sendDispatch, receiveBatch, clientInputs } from './forms'
import { productDetails, userDetails } from './details'
import Delete from './components/delete/Delete'
import Report from './components/reports/Report'
import Notification from './components/notifications/Notification'
import Settings from './components/settings/Settings'
import Warehouse from './components/warehouse/home/Warehouse'
import Batch from './components/warehouse/batches/Batch'
import Send from './components/warehouse/form/Send'
import Receive from './components/warehouse/form/Receive'
import Client from './components/warehouse/clients/Client'
import CreateForm from './components/warehouse/clients/CreateForm'
import Dispatch from './components/warehouse/dispatches.js/Dispatch'
import Shelf from './components/warehouse/shelves/Shelf'

let role = JSON.parse(localStorage.getItem('profile'))
const App = () => (
        <Router>
                <div className="app-container">
                <Routes>
                        <Route path='/'>
                                <Route index element={role ? (role.role == "Stock Officer" ? <Home /> : <Warehouse/>) : <Home/>} />
                                <Route path='login' element={<Login />} />
                        </Route>
                        <Route path='products'>
                                <Route index element={<Product />} />
                                <Route path=':id' element={<Detail labels = {productDetails} entity="product" />} />
                                <Route path='new' element={<Create inputs = {productInputs} title="Add New Product" entity="product"/>} />
                                <Route path="edit/:id" element={<Create inputs = {productInputs} title="Edit Product" entity="product" />} />
                                <Route path='delete/:id' element={<Delete entity = "product" />} />
                        </Route>
                        <Route path='users'>
                                <Route index element={<User />} />
                                <Route path=':id' element={<Detail labels = {userDetails} entity="user" />} />
                                <Route path='new' element={<Create inputs = {userInputs} title="Add New User" entity="user"/>} />
                                <Route path="edit/:id" element={<Create inputs = {userInputs} title="Edit User" entity="user" />} />
                                <Route path='delete/:id' element={<Delete entity = "user" />} />
                        </Route>
                        <Route path='stats'>
                                <Route index element = {<Report />} />
                        </Route>
                        <Route path='notifications'>
                                <Route index element={<Notification/>} />
                        </Route>
                        <Route path='settings'>
                                <Route index element={<Settings/>} />
                        </Route>
                        <Route path='warehouse'>
                                <Route index element={<Warehouse/>} />
                        </Route>
                        <Route path="batches">
                                <Route index element={<Batch/>} />
                                <Route path='receive' element={<Receive inputs={receiveBatch}/>} />
                        </Route>
                        <Route path='dispatches'>
                                <Route index element={<Dispatch/>} />
                                <Route path='send' element={<Send inputs={sendDispatch} />} />
                        </Route>
                        <Route path='clients'>
                                <Route index element={<Client/>} />
                                <Route path='new' element={<CreateForm inputs={clientInputs}/>} />
                        </Route>
                        <Route path='shelves'>
                                <Route index element={<Shelf/>} />
                        </Route>
                </Routes>
                </div>
        </Router>
)

export default App;
