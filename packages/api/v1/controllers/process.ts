import randomString from "randomstring";
import Process, { ProcessDoc } from "../../models/process";
import Command, { CommandDoc } from "../../models/command";
import Logs from "../../models/logs";
import Node, { NodeDoc } from "../../models/node";

export const fetchActiveProcesses = async (user_id: string) => {
    const processes = await Process.find({ asleep: false, developer: user_id })
        .populate("commands")
        .populate("logs");
    return { processes, count: processes.length };
};

export const fetchAllProcesses = async (user_id: string) => {
    const processes = await Process.find({ developer: user_id })
        .populate("commands")
        .populate("logs");

    return { processes, count: processes.length };
};

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

export const createProcess = async (process_name: string | undefined, commands: Array<any> | undefined, user_id: string | undefined) => {
    const newProcess = new Process({
        process_id: randomString.generate(8),
        process_name,
        developer: user_id,
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
        process.commands?.map(async (command: string) => {
            const $command: CommandDoc | null = await Command.findOne({ _id: command });

            await $command?.remove();
        });

        await process.remove();

        return { process };
    } else {
        throw {
            status: 404,
            message: "Process was not found",
        };
    }
};

export const addLog = async (process_id: string, log: string, node: string, type: string) => {
    const fetchNode: NodeDoc | null = await Node.findOne({ node_id: node });

    const newLog = new Logs({
        log,
        process: process_id,
        node: fetchNode?._id,
        type,
    });

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