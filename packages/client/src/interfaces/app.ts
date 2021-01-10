export interface IUseSelector {
    app: {
        nodes: any[],
        node: {
            node_name?: string;
            node_id: string;
            active: boolean;
        },
        processes: any[],
        process: Object,
        commands: any[],
        command: Object,
        isLoading: boolean;
        error: string;
    }
}