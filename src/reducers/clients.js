export default (clients = [], action) => {
    switch (action.type) {
        case 'CLIENT_CREATE':
            clients.push(action.payload.client)
            console.log(clients)
            return clients
        case 'CLIENT_FETCH':
            return action.payload.clients
        case 'CLIENT_GET':
            return action.payload.clients
        case 'CLIENT_DELETE':
            return action.payload.clients
        default:
            return clients
    }
}