import { combineReducers } from "redux"

import auth from './auth'
import products from "./products"
import users from './users'
import notifications from './notifications'
import reports from "./reports"
import settings from "./settings"
import batches from './batches'
import dispatches from "./dispatches"
import clients from "./clients"
import shelves from './shelves'

export default combineReducers({
    auth, products, users, notifications, reports, settings, batches, dispatches, clients, shelves
})