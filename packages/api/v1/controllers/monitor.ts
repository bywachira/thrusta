import RandomString from "randomstring";
import Monitor, { ICPU, IMemory, IDisk, INetwork, IServerData } from "../../models/monitors";
import Node from "../../models/node"

class MonitorController {
    private node_id: string;
    constructor(node_id: string) {
        this.node_id = node_id;
    }

    private async getNode() {
        const get_node = await Node.findOne({
            node_id: this.node_id
        })

        if (get_node) {
            return {
                node: get_node
            }
        } else {
            return {
                node: null
            }
        }
    }

    public async getMonitorData(params?: any) {
        const node = await this.getNode();

        if (node.node._id) {

            const monitor = await Monitor.find({ node_id: node }).sort({
                createdAt: "asc"
            })

            return this.formatData(monitor)
        } else {
            return {
                cpu: [],
                memory: [],
                network: [],
                disk: [],
                uptime: []
            }
        }
    }

    private formatData(data: any) {
        let cpuData: ICPU[] = [];
        let memoryData: IMemory[] = []
        let networkData: INetwork[] = []
        let diskData: IDisk[] = []
        let uptimeData: string[] = []

        for (let i = 0; i < data.length; i++) {
            cpuData.push(data[i].cpu)
            memoryData.push(data[i].memory)
            networkData.push(data[i].network)
            diskData.push(data[i].disk)
            uptimeData.push(data[i].uptime)
        }

        return {
            cpu: cpuData,
            memory: memoryData,
            network: networkData,
            disk: diskData,
            uptime: uptimeData
        }
    }

    public async createMonitorData(data: IServerData) {
        const node = await this.getNode()

        const newMonitor = Monitor.build({
            ...data,
            node: node.node._id
        })

        await newMonitor.save()

        return {
            monitor: newMonitor
        }
    }
}

export default MonitorController;