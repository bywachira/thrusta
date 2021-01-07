/* eslint-disable @typescript-eslint/no-explicit-any */
export type Dispatch = (action: {
    type: string;
    payload?: any;
    node_id?: string;
    process_id?: string;
}) => void

export type Reducer = (state: any, action: {
    type: string, payload?: any,
    node_id?: string,
    process_id?: string,
}) => any;

export type Action = ({
    type: string, payload?: any; node_id?: string; process_id?: string;
})