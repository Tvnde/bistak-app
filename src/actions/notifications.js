import { LOAD_NOTIFICATIONS } from "../constants/types"
import * as api from '../api'

export const loadNotifications = () => async(dispatch) => {
    try {
        const {data} = await api.loadNotifications()
        dispatch({ type: LOAD_NOTIFICATIONS, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const filterNotifications = (filters) => async(dispatch) => {
    try {
        const {data} = await api.filterNotifications(filters)
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}