export default (notifications = [], action) => {
    switch (action.type) {
        case 'NOTIFICATION_CREATE':
            return action.payload.notifications
        case 'LOAD_NOTIFICATION':
            return action.payload.notifications
        case 'NOTIFICATION_GET':
            return action.payload.notifications
        default:
            return notifications
    }
}