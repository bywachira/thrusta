/* eslint-disable */

import { combineReducers } from "redux";
import AuthReducer from "./auth"
import AppReducer from "./app"

const rootReducer: any = combineReducers({
    auth: AuthReducer,
    app: AppReducer
})

export default rootReducer