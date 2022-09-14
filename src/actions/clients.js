import { CLIENT_CREATE, CLIENT_FETCH } from "../constants/types"
import * as api from '../api'

export const getClients = () => async(dispatch) => {
    try {
        const {data} = await api.fetchClients()
        console.log(data)
        dispatch({type: CLIENT_FETCH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

/* export const getUser = (user) => async(dispatch) => {
    try {
        const {data} = await api.fetchUser({user})
        console.log(data)
        dispatch({type: 'USER_GET', payload: data})
    } catch (error) {
        console.log(error.message)
    }
} */

export const saveClient = (values) => async(dispatch) => {
    console.log(values)
    try {
        const {data} = await api.createClients(values)
        console.log(data)
        dispatch({type: CLIENT_CREATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
/* 
export const deleteUser = (user) => async(dispatch) => {
    try {
        const {data} = api.deleteUser({user})
        console.log(data)
        dispatch({ type: 'USER_DELETE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
} */