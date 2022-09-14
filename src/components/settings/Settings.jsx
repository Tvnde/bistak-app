import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loadNotifications } from '../../actions/notifications'
import { loadSettings, saveSettings } from '../../actions/settings'
import Navbar from '../partials/navbar/Navbar'
import Sidebar from '../partials/sidebar/Sidebar'

import './settings.scss'

const Settings = () => {
    let settings = useSelector((state) => state.settings)
    console.log(settings)
    let [values, setValues] = useState({
        maximum_stock: settings.maximum_stock,
        maximum_days: settings.maximum_days
    })
    let dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(loadNotifications())
        dispatch(loadSettings())
    }, [dispatch])

    const saveSetting = () => {
        dispatch(saveSettings(values))
        navigate('/')
    }
  return (
    <div className='settings'>
        <Sidebar />
        <div className="settingsContainer">
            <Navbar />
            <div className="pageheader">
                <div className="title">Settings</div>
            </div>
            <div className="settingsForm">
                <form>
                    <div className="formInput">
                        <input type="text" className='settings-input maximum-stock' id="maximum-stock" placeholder=' ' defaultValue={values.maximum_stock} onChange={(e) => setValues({...values, maximum_stock: e.target.value})} />
                        <label htmlFor="maximum-stock" className='settings-label'>Maximum Quantity Before Low Stock Alert</label>
                    </div>
                    <div className="formInput">
                        <input type="number" className='settings-input maximum-days' id="maximum-days" placeholder=' ' defaultValue={values.maximum_days} onChange={(e) => setValues({...values, maximum_days: e.target.value})} />
                        <label htmlFor="maximum-days" className='settings-label'>Maximum Days Before Expiry Alert</label>
                    </div>
                    <button type='button' onClick={saveSetting}>Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Settings