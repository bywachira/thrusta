/* eslint-disable */

import { createStore, applyMiddleware } from "redux"
// import { createDevTools } from "redux-devtools"
import thunk from "redux-thunk"
import axios from "axios"

import RootReducer from "../reducers"
import config from "../../config"
const middleware = [thunk];

axios.defaults.headers.common["X-JWT-Token"] = config.token

const store: any = createStore(
    RootReducer, {}, applyMiddleware(...middleware)
)

export default store