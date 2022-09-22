import axios from 'axios'

const base = axios.create({baseURL: 'http://localhost:7070'})

base.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))}`
    return req
})

export const login = (credentials) => base.post('/auth/login', credentials, {withCredentials: true})

export const load = (credentials) => base.post('/auth/dashboard', credentials, {withCredentials: true})

export const fetchProducts = (credentials) => base.post('/products', credentials, {withCredentials: true})

export const fetchProduct = (credentials) => base.post('/products/view', credentials, {withCredentials: true})

export const getProduct = (credentials) => base.get('/products/view', credentials, {withCredentials: true})

export const importProducts = (credentials) => base.post('/products/import', credentials, {withCredentials: true})

export const saveProduct = (credentials) => base.post('/products/save', credentials, {withCredentials: true})

export const deleteProduct = (credentials) => base.post('/products/delete', credentials, {withCredentials: true})

export const searchProduct = (credentials) => base.post('/products/search', credentials, {withCredentials: true})

export const fetchUsers = (credentials) => base.post('/users', credentials, {withCredentials: true})

export const fetchUser = (credentials) => base.post('/users/view', credentials, {withCredentials: true})

export const saveUser = (credentials) => base.post('/users/create', credentials, {withCredentials: true})

export const deleteUser = (credentials) => base.post('/users/delete', credentials, {withCredentials: true})

export const userProduct = (credentials) => base.post('/users/delete', credentials, {withCredentials: true})

export const loadReport = (credentials) => base.post('/reports', credentials, {withCredentials: true})

export const loadNotifications = (credentials) => base.post('/notifications', credentials, {withCredentials: true})

export const filterNotifications = (credentials) => base.post('/notifications/filter', credentials, {withCredentials: true})

export const getSettings = (credentials) => base.get('/settings', credentials, {withCredentials: true})

export const saveSettings = (credentials) => base.post('/settings', credentials, {withCredentials: true})

export const receiveBatch = (credentials) => base.post('/batches/create', credentials, {withCredentials: true})

export const fetchBatches = (credentials) => base.post('/batches', credentials, {withCredentials: true})

export const fetchClients = (credentials) => base.post('/clients', credentials, {withCredentials: true})

export const createClients = (credentials) => base.post('/clients/create', credentials, {withCredentials: true})

export const sendDispatch = (credentials) => base.post('/dispatches/create', credentials, {withCredentials: true})

export const fetchDispatches = (credentials) => base.post('/dispatches', credentials, {withCredentials: true})

export const fetchShelves = (credentials) => base.post('/shelves', credentials, {withCredentials: true})