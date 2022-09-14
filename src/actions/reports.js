import { LOAD_REPORT } from "../constants/types"
import * as api from '../api'

export const loadReport = () => async(dispatch) => {
    try {
        const {data} = await api.loadReport()
        dispatch({ type: LOAD_REPORT, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}