export interface IUseSelector {
    app: {
        nodes: any[],
        node: {
            node_name?: string;
            node_id: string;
            active: boolean;
            _id: string;
        },
        processes: any[],
        process: any,
        commands: any[],
        command: Object,
        isLoading: boolean;
        error: string;
        secondaryLoading: boolean;
        current_status: {
            cpu: {
                cpu_idle: number;
                cpu_usage: number;
                cpu_total: number;
            },
            memory: {
                memory_cached: number;
                memory_used: number;
                memory_free: number;
                memory_total: number;
            },
            uptime: string;
            last_ping: number;
        },
        updating: boolean;
        close: boolean;
        deleting: boolean;
        chart_data: {
            cpu: any[],
            memory: any[],
            network: any[],
            disk: any[],
            period: string;
        }
    }
}