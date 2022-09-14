export default (batches = [], action) => {
    switch (action.type) {
        case 'BATCH_RECEIVE':
            batches.push(action.payload.batch)
            console.log(batches)
            return batches
        case 'BATCH_FETCH':
            return action.payload.batches
        case 'BATCH_EDIT':
            return action.payload.batches
        default:
            return batches
    }
}