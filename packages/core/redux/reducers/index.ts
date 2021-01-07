/* eslint-disable */

import { combineReducers } from "redux";
import AuthReducer from "./auth"

const rootReducer: any = combineReducers({
    auth: AuthReducer
})

export default rootReducer