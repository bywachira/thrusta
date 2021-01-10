import * as TYPES from "../constants";
import client from "../../client";
import { Dispatch } from "redux";

export const getActiveProcess = () => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.get(`/process/active`)
        .then(res => {
            dispatch({
                type: TYPES.ACTIVE_PROCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const getProcess = () => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING,
    })

    await client.get("/process")
        .then(res => {
            dispatch({
                type: TYPES.PROCESSES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const editProcess = (payload: any) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING,
    })

    await client.patch("/process", payload)
        .then(res => {
            dispatch({
                type: TYPES.EDIT_PROCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const createProcess = (payload: any) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.post("/process", payload)
        .then(res => {
            dispatch({
                type: TYPES.CREATE_PROCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const addCommand = (payload: any) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.post("/process/add-command", payload)
        .then(res => {
            dispatch({
                type: TYPES.ADD_COMMAND,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const deleteCommand = (payload: any) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.delete("/process/delete-command", payload)
        .then(res => {
            dispatch({
                type: TYPES.DELETE_COMMAND,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const deleteProcess = (payload: any) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.delete("/process/delete-process", payload)
        .then(res => {
            dispatch({
                type: TYPES.DELETE_PROCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const sleepProcess = (payload: any) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.patch("/process/sleep", payload)
        .then(res => {
            dispatch({
                type: TYPES.SLEEP_PROCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const getNodes = () => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING,
    })

    await client.get("/nodes")
        .then(res => {
            dispatch({
                type: TYPES.NODES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const getNode = (node_id: string) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING,
    })

    await client.get(`/nodes/${node_id}`)
        .then(res => {
            dispatch({
                type: TYPES.NODE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}

export const updateNodeName = (node_id: string, node_name: string) => async (dispatch: Dispatch): Promise<any> => {
    dispatch({
        type: TYPES.APP_LOADING
    })

    await client.patch(`/node-name/${node_id}`, { node_name })
        .then(res => {
            dispatch({
                type: TYPES.UPDATE_NODE_NAME,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: TYPES.APP_ERROR,
                payload: err.response.data
            })
        })
}