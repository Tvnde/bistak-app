export default (settings = {maximum_stock: 0, maximum_days: 0}, action) => {
    switch (action.type) {
        case 'GET_SETTINGS':
            return action.payload.settings
        case 'SAVE_SETTINGS':
            return action.payload.settings
        default:
            return settings
    }
}