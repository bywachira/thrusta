import RandomString from "randomstring";
import bcrypt from "bcrypt";
import Node from "../../models/node";
import Log from "../../models/logs";
import Account from "../../models/account";
import AuthController from "./authentication";
import * as jwtHelpers from "../helpers/jwt";

class NodeController {

    private account: any
    private data: any
    constructor(account: any, data: any) {
        this.account = account;
        this.data = data || {};
    }

    verifyNode = async (token: string, nodeid: string) => {
        const result = await this.fetchAccount(token);
        if (result.result) {
            const node = await Node.findOne({
                node_id: nodeid,
                account: result.account_id,
            });

            if (node) {
                if (node.active) {
                    return { node, ...result };
                } else {
                    throw {
                        message: "Node is inactive",
                    };
                }
            } else {
                throw {
                    message: "Node was not found",
                };
            }
        } else {
            throw {
                message: "Something went wrong",
            };
        }
    };

    editNodeName = async (nodeId: string, node_name: string) => {
        const node = await Node.findOne({
            node_id: nodeId
        })

        if (node) {
            Object.assign(node, {
                node_name,
            })

            await node.save()

            return {
                node,
                message: "Node updated"
            }
        } else {
            throw {
                message: "Something went wrong"
            }
        }
    }

    fetchAccount = async (token: string): Promise<any> => {
        if (token) {
            const result: any = await jwtHelpers.decode_token(token);

            if (result) {
                const account = await Account.findOne({
                    _id: result.id
                });

                if (account) {
                    return {
                        name: account.name,
                        email: account.email,
                        account_id: result.id,
                        result: true,
                    };
                } else {
                    return {
                        result: false,
                    };
                }
            }
        } else {
            return {
                result: false,
            };
        }
    };

    fetchAllNodes = async () => {
        const nodes = await Node.find({
            account: this.account._id,
        }).populate("account", ["name", "email"]);

        return {
            nodes,
        };
    };

    getNode = async (node_id: string) => {
        const node = await Node.findOne({
            account: this.account._id,
            _id: node_id
        }).populate("account", ["name", "email"])

        return {
            node
        }
    }

    deleteNode = async (node_id: string) => {
        const node = await Node.findOne({
            account: this.account._id,
            node_id,
        }).populate("account", ["name", "email"]);

        if (node) {
            await node.remove();

            return {
                node,
            };
        } else {
            throw {
                status: 404,
                message: "Node was not found",
            };
        }
    };

    loginNode = async () => {
        if (this.validateValues()) {
            const account = await Account.findOne({ email: this.data.email });

            if (account) {
                if (bcrypt.compareSync(this.data.password, account.password)) {
                    if (account.has_password && account.is_verified) {
                        const token = new AuthController(this.data).generateToken(
                            account.has_password,
                            account.removeListener,
                            account.is_verified,
                            account._id
                        );

                        const findNode = await Node.findOne({ account: account._id });

                        if (findNode) {
                            return { token, nodeID: findNode.node_id };
                        } else {
                            const newNode = new Node({
                                node_id: RandomString.generate(7),
                                account: account._id,
                            });

                            await newNode.save();

                            return { token, nodeID: newNode };
                        }
                    } else {
                        throw {
                            status: 409,
                            message: "Error logging you in",
                        };
                    }
                } else {
                    throw {
                        status: 423,
                        message: "Passwords do not match",
                    };
                }
            } else {
                throw {
                    status: 404,
                    message: "Account not found",
                };
            }
        } else {
            throw {
                status: 400,
                message: "Invalid credentials",
            };
        }
    };

    validateValues = async () => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(this.data.email)) {
            return false;
        } else if (this.data.password.length < 6) {
            return false;
        } else {
            return true;
        }
    };

    saveLog = async (logs: string, process: string, node: string | string[] | undefined) => {
        const newLog = new Log({ log: logs, process, node });

        await newLog.save();

        return newLog;
    };
}

export default NodeController;