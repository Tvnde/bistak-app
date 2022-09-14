import { GET_SETTINGS, SAVE_SETTINGS } from "../constants/types"
import * as api from '../api'

export const loadSettings = () => async(dispatch) => {
    try {
        const {data} = await api.getSettings()
        dispatch({type: GET_SETTINGS, payload: data})
        console.log(data.settings)
    } catch (error) {
        console.log(error.message)
    }
}

export const saveSettings = (values) => async(dispatch) => {
    try {
        const {data} = await api.saveSettings(values)
        dispatch({type: SAVE_SETTINGS, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}