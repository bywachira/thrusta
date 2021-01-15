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
    command: {},
    current_status: {},
    secondaryLoading: false,
    updating: false,
    deleting: false,
    chart_data: {}
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
                deleting: false
            }
        case TYPES.SLEEP_PROCESS:
        case TYPES.ACTIVATE_PROCESS:
            return {
                ...state,
                processes: [...state.processes.map((item: any) => item._id === action.payload.process._id ? action.payload.process : item)],
                isLoading: false,
                process: action.payload.process
            }
        case TYPES.NODES:
            return {
                ...state,
                nodes: action.payload.nodes,
                isLoading: false
            }
        case TYPES.NODE:
            return {
                ...state,
                node: action.payload.node,
                isLoading: false,
            }
        case TYPES.UPDATE_NODE_NAME:
            return {
                ...state,
                node: action.payload.node,
                isLoading: false,
                updating: false,
                close: true
            }
        case TYPES.MONITOR:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.CURRENT_SERVER_STATUS:
            return {
                ...state,
                current_status: action.payload.current_status,
                secondaryLoading: false
            }
        case TYPES.SIDE_LOADING:
            return {
                ...state,
                secondaryLoading: true
            }
        case TYPES.UPDATING:
            return {
                ...state,
                updating: true,
                close: false
            }
        case TYPES.PROCESS:
            return {
                ...state,
                process: action.payload.process
            }
        case TYPES.APP_DELETING:
            return {
                ...state,
                deleting: true
            }
        case TYPES.LOAD_CHART_DATA:
            return {
                ...state,
                gettingData: true
            }
        case TYPES.GET_CHART_DATA:
            return {
                ...state,
                chart_date: action.payload.chart_date,
                gettingData: false
            }
        case TYPES.CHART_DATA_ERROR:
            return {
                ...state,
                gettingData: false,
                message: action.payload.message
            }
        default:
            return state
    }
}

export default AppReducer