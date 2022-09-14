export default (products = [], action) => {
    switch (action.type) {
        case 'PRODUCT_CREATE':
            return action.payload.products
        case 'PRODUCT_FETCH':
            return action.payload.products
        case 'PRODUCT_IMPORT':
            return action.payload.products
        case 'PRODUCT_GET':
            return action.payload.products
        case 'PRODUCT_SEARCH':
            return action.payload.products
        case 'PRODUCT_DELETE':
            return action.payload.products
        default:
            return products
    }
}