import { PRODUCT_CREATE, PRODUCT_FETCH } from "../constants/types"
import * as api from '../api'

export const getProducts = (factor) => async(dispatch) => {
    try {
        if(factor == "expiring") {
            const {data} = await api.expiringProducts()
            dispatch({ type: 'PRODUCT_FETCH', payload: data })
        } else if(factor == "low-on-stock") {
            const {data} = await api.lowStockProducts()
            dispatch({ type: 'PRODUCT_FETCH', payload: data })
        } else {
            const {data} = await api.fetchProducts()
            dispatch({ type: 'PRODUCT_FETCH', payload: data })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getProduct = (product) => async(dispatch) => {
    try {
        const {data} = await api.fetchProduct({product})
        console.log(product)
        dispatch({type: 'PRODUCT_GET', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const importProducts = (products) => async(dispatch) => {
    try {
        const {data} = await api.importProducts({products: JSON.stringify(products)})
        console.log(data)
        dispatch({type: 'PRODUCT_IMPORT', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const saveProduct = (values) => async(dispatch) => {
    console.log(values)
    try {
        const {data} = await api.saveProduct(values)
        console.log(data)
        dispatch({type: 'PRODUCT_CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteProduct = (product, navigate) => async(dispatch) => {
    try {
        const {data} = await api.deleteProduct({product})
        console.log(data)
        dispatch({ type: 'PRODUCT_DELETE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const searchProduct = (query) => async(dispatch) => {
    try {
        const {data} = await api.searchProduct({query})
        console.log(data)
        dispatch({type: 'PRODUCT_SEARCH', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}