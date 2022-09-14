import { DISPATCH_SEND, DISPATCH_FETCH, DISPATCH_FAIL } from "../constants/types"
import * as api from '../api'

export const loadDispatches = () => async(dispatch) => {
    try {
        const {data} = await api.fetchDispatches()
        dispatch({type: DISPATCH_FETCH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const sendDispatch = (values, navigate) => async(dispatch) => {
    try {
        const {data} = await api.sendDispatch(values)
        console.log(data)
        dispatch({type: DISPATCH_SEND, payload: data})
        navigate('/dispatches')
    } catch (error) {
        console.log(error.message)
    }
}