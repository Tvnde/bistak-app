import { BATCH_RECEIVE, BATCH_SEND, BATCH_FETCH, BATCH_FAIL, SHELF_FETCH, BATCH_SEARCH } from "../constants/types"
import * as api from '../api'

export const loadBatches = () => async(dispatch) => {
    try {
        const {data} = await api.fetchBatches()
        dispatch({type: BATCH_FETCH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const receiveBatch = (values, navigate) => async(dispatch) => {
    try {
        const {data} = await api.receiveBatch(values)
        console.log(data)
        dispatch({type: BATCH_RECEIVE, payload: data})
        navigate('/batches')
    } catch (error) {
        console.log(error.message)
    }
}

export const searchBatches = (query) => async(dispatch) => {
    try {
        console.log(query)
        const {data} = await api.searchBatches({query})
        console.log(data)
        dispatch({type: BATCH_SEARCH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const loadShelf = () => async(dispatch) => {
    try {
        const {data} = await api.fetchShelves()
        dispatch({type: SHELF_FETCH, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}