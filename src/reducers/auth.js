export default (data = null, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log(action.payload)
            localStorage.setItem('profile', JSON.stringify({...action?.payload.user}))
            return {products: 0, categories: 0, per_stock: 0, users: 0}
        case 'LOGIN_FAILURE':
            console.log(action.payload)
            return {products: 0, categories: 0, per_stock: 0, users: 0}
        case 'REGISTER':
            return {products: 0, categories: 0, per_stock: 0, users: 0}
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem('profile')
            return {products: 0, categories: 0, per_stock: 0, users: 0}
        case 'LOAD_DASHBOARD':
            return action.payload.data
        default:
            return {products: 0, categories: 0, per_stock: 0, users: 0, expired_count: 0, low_stock: 0, batches: 0, dispatches: 0, clients: 0, shelves: 0}
    }
}