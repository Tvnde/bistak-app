import { USER_CREATE, USER_FETCH } from "../constants/types"
import * as api from '../api'

export const getUsers = () => async(dispatch) => {
    try {
        const {data} = await api.fetchUsers()
        console.log(data)
        dispatch({type: 'USER_FETCH', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getUser = (user) => async(dispatch) => {
    try {
        const {data} = await api.fetchUser({user})
        console.log(data)
        dispatch({type: 'USER_GET', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const saveUser = (values) => async(dispatch) => {
    console.log(values)
    try {
        const {data} = await api.saveUser(values)
        console.log(data)
        dispatch({type: 'USER_CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteUser = (user) => async(dispatch) => {
    try {
        const {data} = api.deleteUser({user})
        console.log(data)
        dispatch({ type: 'USER_DELETE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}