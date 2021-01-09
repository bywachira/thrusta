/* eslint-disable */
import * as TYPES from "../../actions/constants";
import { Action } from "@thrusta/core/interfaces/redux"

const AppReducer = (state: any = {
    isLoading: false,
    processes: [],
    process: {},
    nodes: [],
    node: {},
    error: "",
    message: "",
    active_processes: [],
    commands: [],
    command: {}
}, action: Action) => {
    switch (action.type) {
        case TYPES.APP_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.APP_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.message
            }
        case TYPES.ACTIVE_PROCESS:
            return {
                ...state,
                active_processes: action.payload.processes,
                isLoading: false,
            }
        case TYPES.PROCESSES:
            return {
                ...state,
                processes: action.payload.processes,
                isLoading: false,
            }
        case TYPES.EDIT_PROCESS:
            return {
                ...state,
                process: action.payload.process,
                isLoading: false,
            }
        case TYPES.CREATE_PROCESS:
            return {
                ...state,
                process: action.payload.process,
                processes: [...state.processes, action.payload.process],
                isLoading: false
            }
        case TYPES.ADD_COMMAND:
            return {
                ...state,
                commands: action.payload.commands,
                isLoading: false
            }
        case TYPES.DELETE_COMMAND:
            return {
                ...state,
                commands: state.commands.filter((item: any) => item._id !== action.payload.process._id),
                isLoading: false,
            }
        case TYPES.DELETE_PROCESS:
            return {
                ...state,
                processes: state.processes.filter((item: any) => item._id !== action.payload.process._id),
                isLoading: false,
            }
        case TYPES.SLEEP_PROCESS:
            return {
                ...state,
                processes: state.processes.map((item: any) => item._id !== action.payload.process._id ? action.payload.process : item),
                isLoading: false,
                process: action.payload.process
            }
        case TYPES.NODES:
            return {
                ...state,
                nodes: action.payload.nodes,
                isLoading: false
            }
        default:
            return state
    }
}

export default AppReducer