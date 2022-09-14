export default (users = [], action) => {
    switch (action.type) {
        case 'USER_CREATE':
            return users.push(action.payload.user)
        case 'USER_FETCH':
            return action.payload.users
        case 'USER_GET':
            return action.payload.users
        case 'USER_DELETE':
            return action.payload.users
        default:
            return users
    }
}