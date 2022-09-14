import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOAD_DASHBOARD } from '../constants/types'
import * as api from '../api'


export const userAuth = (navigate) => {
   if(localStorage.getItem('profile')) (navigate('/'))
   else navigate('/login')
}

export const login = (values, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(values)
        console.log(data)
        await dispatch({type: LOGIN_SUCCESS, payload: data})
        if(JSON.parse(localStorage.getItem("profile")).role == "Warehouse Manager") navigate('/warehouse')
        else navigate('/')
    } catch (error) {
        dispatch({type: LOGIN_FAIL  })
        console.log(error.message)
    }
}

export const logout = (navigate) => {
    localStorage.removeItem('profile')
    navigate('/login');
}

export const dashboard = () => async(dispatch) => {
    try {
        const {data} = await api.load()
        console.log(data)
        dispatch({type: LOAD_DASHBOARD, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}