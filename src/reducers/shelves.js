export default (shelves = [], action) => {
    switch (action.type) {
        case 'SHELF_FETCH':
            return action.payload.shelves
        default:
            return shelves
    }
}