/* eslint-disable */

import { Action } from "../../../interfaces/redux";
import * as TYPES from "../../actions/constants";

const AuthReducer = (state: any = {
    isLoading: false,
    account: {},
    message: "",
    error: ""
}, action: Action) => {
    switch (action.type) {
        case TYPES.ACCOUNT:
            return {
                ...state,
                account: action.payload.account,
                isLoading: false
            }
        case TYPES.AUTH:
            return {
                ...state,
                account: action.payload.account,
                message: "Access granted"
            }
        case TYPES.LOADING:
            return {
                ...state,
                isLoading: true,
                message: "",
                error: ""
            }
        case TYPES.ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }
        default:
            return state
    }
}

export default AuthReducer