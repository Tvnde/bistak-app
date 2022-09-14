export default (data = null, action) => {
    switch(action.type) {
        case 'LOAD_REPORT':
            return action.payload.data
        default:
            return {products: [], products_out_of_stock: []}
    }
}