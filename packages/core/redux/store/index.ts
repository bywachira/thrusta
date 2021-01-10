/* eslint-disable */

import { createStore, applyMiddleware } from "redux"
// import { createDevTools } from "redux-devtools"
import thunk from "redux-thunk"
import axios from "axios"

import RootReducer from "../reducers"
import config from "../../config"
import { compose } from 'redux';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

axios.defaults.headers.common["X-JWT-Token"] = config.token

const store: any = createStore(
    RootReducer, {}, composeEnhancers(applyMiddleware(...middleware))
)

export default store