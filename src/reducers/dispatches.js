export default (dispatches = [], action) => {
    switch (action.type) {
        case 'DISPATCH_SEND':
            dispatches.push(action.payload.dispatch)
            return dispatches
        case 'DISPATCH_FETCH':
            return action.payload.dispatches
        case 'DISPATCH_FAIL':
            return action.payload.dispatches
        default:
            return dispatches
    }
}