import axios from "axios";
import * as TYPES from "../constants";
import config from "../../../config";
import { setToken, fetchToken } from "../../../helpers/localstorage"
import { Dispatch } from "../../../interfaces/redux";
import client from "../../client";

interface IAuthPayload {
    email: string;
    has_password: boolean;
    password: string;
}

export const loginUser = (payload: IAuthPayload) => async (dispatch: (...args) => void): Promise<any> => {
    dispatch({
        type: TYPES.LOADING
    })

    return await axios.post(`${config.api}/api/v1/login`, payload)
        .then(res => {
            dispatch({
                type: TYPES.AUTH,
                payload: res.data
            })
            setToken(res.data.token)
        })
        .catch(err => {
            dispatch({
                type: TYPES.ERROR,
                payload: err.response.data
            })
        })
}

export const signupUser = (payload: IAuthPayload) => async (dispatch: (...args) => void): Promise<any> => {
    dispatch({
        type: TYPES.LOADING
    })

    return await axios.post(`${config.api}/api/v1/signup`, payload)
        .then(res => {
            dispatch({
                type: TYPES.AUTH,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.ERROR,
                payload: err.response.data
            })
        })
}

export const getAccount = () => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.LOADING,
    })

    return await client.get(`/account`)
        .then(res => {
            dispatch({
                type: TYPES.ACCOUNT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.ERROR,
                payload: err.response.data
            })
        })
}