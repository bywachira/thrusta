import randomString from "randomstring";
import Process, { ProcessDoc } from "../../models/process";
import Command, { CommandDoc } from "../../models/command";
import Logs from "../../models/logs";
import Node, { NodeDoc } from "../../models/node";
import Monitor from "../../models/monitors";
import { formatDate } from "../helpers/date-format";
import { washChartData } from "../helpers/clean-chart-data";

export const fetchActiveProcesses = async (user_id: string) => {
    const processes = await Process.find({ asleep: false, developer: user_id })
        .populate("commands")
        .populate("logs");
    return { processes, count: processes.length };
};

export const fetchAllProcesses = async (user_id: string) => {
    const processes = await Process.find({ developer: user_id })
        .populate("commands")
        .populate("logs")

    return { processes, count: processes.length };
};

export const getSingleProcess = async (developer: string, process_id: string) => {
    const process = await Process.findOne({ developer, _id: process_id }).populate("commands").populate({
        path: "logs",
        options: {
            limit: 10,
            sort: { createdAt: -1 },
        }
    });

    if (process) {
        return {
            process
        }
    } else {
        throw {
            status: 404,
            message: "Process was not found",
        }
    }
}

export const updateProcessStatus = async (
    user_id: string | undefined,
    process_id: string | undefined,
    status: string | undefined,
    finished = false
) => {
    const process = await Process.findOne({ developer: user_id, _id: process_id })
        .populate("commands")
        .populate("logs");

    if (process) {
        if (finished) {
            Object.assign(process, {
                last_run_status: status,
                last_run: `${new Date()}`,
                asleep: true,
            });
            await process.save();
        } else {
            Object.assign(process, {
                asleep: false,
            });

            await process.save();
        }

        return { process };
    } else {
        throw {
            message: "Process not found",
            status: 404,
        };
    }
};

export const saveLog = async (node_id: string | undefined, process_id: string | undefined, logs: string | undefined) => {
    const process: any = await Process.findOne({ process_id });

    const node: NodeDoc | null = await Node.findOne({ node_id });

    const newLog = new Logs({
        node: node?._id,
        process: process._id,
        log: logs,
    });

    await newLog.save();

    const updatedProcess = await Process.findOneAndUpdate(
        { _id: process._id },
        { $push: { logs: newLog._id } },
        { new: true }
    );

    await updatedProcess?.save();

    return { log: newLog, process: updatedProcess };
};

export const createProcess = async (process_name: string | undefined, commands: Array<any> | undefined, user_id: string | undefined, node_id: string | undefined) => {
    const newProcess = new Process({
        process_id: randomString.generate(8),
        process_name,
        developer: user_id,
        node_id
    });

    await newProcess.save();

    commands?.map(async (command) => {
        const newCommand = new Command({
            process: newProcess._id,
            command: command.command,
            command_id: randomString.generate(8),
        });

        await newCommand.save();

        const updatedProcess = await Process.findOneAndUpdate(
            { _id: newProcess._id },
            { $push: { commands: newCommand._id } },
            { new: true }
        );

        updatedProcess?.save();
    });

    return { process: newProcess };
};

export const editProcess = async (process_name: string | undefined, commands: any[] | undefined, process_id: string | undefined, user_id: string | undefined) => {
    const process = await Process.findOne({
        _id: process_id,
        developer: user_id
    })

    if (process) {
        Object.assign(process, {
            process_name
        })

        await process.save()

        await commands?.forEach(async (command: any, idx: number) => {
            if (command.id) {
                const _command = await Command.findOne({ _id: command.id })

                Object.assign(_command, {
                    command: command.command
                })

                await _command.save()
            } else {
                const newCommand = new Command({
                    process: process._id,
                    command: command.command,
                    command_id: randomString.generate(8)
                })

                await newCommand.save()

                const updatedProcess = await Process.findOneAndUpdate({ _id: process._id }, { $push: { commands: newCommand._id } }, { new: true })

                updatedProcess?.save()
            }
        })

        const getNewProcess = await Process.findOne({ _id: process_id })
            .populate("commands")
            .populate("logs")

        return {
            process: getNewProcess
        }
    } else {
        throw {
            status: 404,
            message: "Process was not found"
        }
    }
}

export const addCommand = async (process_id: string | undefined, command: string | undefined) => {
    const newCommand = new Command({
        process: process_id,
        command,
        command_id: randomString.generate(8),
    });

    await newCommand.save();

    const updateProcess = await Process.findOneAndUpdate(
        { _id: process_id },
        { $push: { commands: newCommand._id } },
        { new: true }
    );

    await updateProcess?.save();

    return {
        command: newCommand,
        process: updateProcess,
    };
};

export const deleteCommand = async (command_id: string | undefined) => {
    const command: CommandDoc | null = await Command.findOne({ _id: command_id }).populate(
        "process",
        ["process_name", "_id"]
    );

    if (command) {
        await command.remove();

        const process: any = await Process.findOneAndUpdate(
            { _id: command?.process?._id },
            { $pullAll: { commands: [command?._id] } }
        );

        return { process, command };
    } else {
        throw {
            status: 404,
            message: "Command not found",
        };
    }
};

export const deleteProcess = async (process_id: string | undefined) => {
    const process: ProcessDoc | null = await Process.findOne({ _id: process_id });

    if (process) {
        process.commands?.map(async (command: any) => {
            const $command: CommandDoc | null = await Command.findOne({ _id: command._id });

            await $command?.remove();
        });

        process.logs?.map(async (log: any) => {
            const $log = await Logs.findOne({ _id: log._id });

            await $log.remove();
        })

        await process.remove();

        return { process };
    } else {
        throw {
            status: 404,
            message: "Process was not found",
        };
    }
};

export const addLog = async (process_id: string, log: string, node: string, type: string, account: string) => {
    const fetchNode: NodeDoc | null = await Node.findOne({ node_id: node });

    const newLog = new Logs({
        log,
        process: process_id,
        node: fetchNode?._id,
        type,
        account
    });

    const updatedProcess = await Process.findOneAndUpdate({ _id: process_id }, { $push: { logs: newLog._id } }, { new: true })

    await updatedProcess.save();

    await newLog.save();

    return {
        log: newLog,
    };
};

export const makeProcessSleep = async (process_id: string) => {
    const process: ProcessDoc | null = await Process.findOne({
        _id: process_id,
    });

    Object.assign(process, {
        asleep: true,
        last_run_status: "complete",
        last_run: `${new Date()}`,
    });

    await process?.save();

    return {
        process,
    };
};

export const getChartData = async (node_id: string, start_date: DateConstructor | any, end_date: DateConstructor | any, timezone: string, period: string) => {
    const monitors = await Monitor.find({ node: node_id, last_ping: { $gte: start_date, $lte: end_date } }).sort({ createdAt: 1 })

    let network = []
    let disk = []
    let _cpu: any[] = []
    let _memory: any[] = []

    for (let i = 0; i < monitors.length; i++) {
        let record = monitors[i]
        const date = formatDate(period, timezone, record.last_ping)


        // const _cpu = record.cpu.map((cpu_record: any) => {
        //     return {
        //         usage: cpu_record.cpu.cpu_usage
        //     }
        // })

        // const cleanCPUData = filterByPeriod(date, _cpu)

        _cpu.push({ usage: record.cpu.cpu_usage, period: date })


        // const _memory = record.memory.map((memory_record: any) => {
        //     return {
        //         usage: memory_record.memory.memory_used
        //     }
        // })


        _memory.push({
            usage: record.memory.memory_used,
            period: date
        })

        let _network = record.network.map((item: any) => {
            return {
                name: item.name || 0,
                transmit: item.transmit || 0,
                received: item.received || 0,
                period: date
            }
        })

        network.push(_network)

        let _disk = record.disk.map((item: any) => {
            return {
                name: item.name || 0,
                reads: item.reads || 0,
                writes: item.received || 0,
                period: date
            }
        })
        disk.push(_disk)
    }

    const cleanCPUData = washChartData(_cpu)

    // cpu.push(
    //     {
    //         values: [Math.round(cleanCPUData.min), Math.round(cleanCPUData.average), Math.round(cleanCPUData.max)],
    //         period: cleanCPUData.period
    //     }
    // )

    const cleanMemoryData = washChartData(_memory, 1000000);

    return {
        chart_data: {
            cpu: cleanCPUData,
            network,
            memory: cleanMemoryData,
            disk,
            period
        },
    }
}