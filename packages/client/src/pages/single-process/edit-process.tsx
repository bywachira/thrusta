/* eslint-disable */

import { getNodes, updateProcess } from "@thrusta/core/redux/actions/app";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Dropdown from "../../components/dropdown";
import { IUseSelector } from "../../interfaces/app";

function EditProcess(): React.ReactElement {
  const dispatch = useDispatch();

  const [node, setNode] = useState<{ label: string; id: string | number }>({
    label: "",
    id: "",
  });

  const [commands, setCommands] = useState<{ value?: string; id?: string }[]>(
    []
  );
  const [processName, setProcessName] = useState<string>("");

  useEffect(() => {
    dispatch(getNodes());
  }, []);

  const { nodes, process } = useSelector((state: IUseSelector) => state.app);

  useEffect(() => {
    if (process.process_name) {
      setProcessName(process.process_name);
      const $commands = process.commands.map((command: any) => {
        return { id: command._id, value: command.command };
      });
      setCommands([...$commands]);
      const _node = nodes.filter(
        (item: any) => item._id === process.node_id
      )[0];
      setNode((prev) => ({
        label: `[${_node?.node_id}]-${_node?.node_name || "No name"}`,
        id: _node?._id,
      }));
    }
  }, [process]);

  // function onNodeSelect(item: { label: string; id: string }) {
  //   setNode(item);
  //   return;
  // }

  // function renderNodes(): any {
  //   if (nodes.length > 0) {
  //     return nodes.map((item: any): { label: string; id: string | number } => {
  //       return {
  //         label: `[${item.node_id}]-${item.node_name || "No name"}`,
  //         id: item._id,
  //       };
  //     });
  //   } else {
  //     return [];
  //   }
  // }

  function addCommands() {
    const _commands = [...commands, { id: "", value: "" }];

    setCommands([..._commands]);
  }

  function handleCommandChange(
    idx: number,
    value: string,
    recordId: string | undefined
  ) {
    const _commands = commands;

    _commands[idx].value = value;
    _commands[idx].id = recordId;

    setCommands([..._commands]);
  }

  function removeCommand(idx: number) {
    const _commands = commands;

    if (idx > -1) {
      _commands.splice(idx, 1);
    }

    setCommands([..._commands]);
  }

  function processUpdate() {
    if (processName && commands.length > 0) {
      dispatch(
        updateProcess(process._id, {
          process_name: processName,
          commands: commands.map((item) => ({
            id: item.id,
            command: item.value,
          })),
        })
      );
    }
  }

  return (
    <div className="text-white">
      <div className="flex justify-center">
        <div>
          <p className="text-left font-extrabold text-2xl">Edit New Process</p>
          <div className="mt-2 p-2">
            {/* <div>
              <p className="text-xl mb-2">Assign process to node</p>
              <Dropdown
                onSelectItem={(item: any) => onNodeSelect(item)}
                label="Select Node"
                items={renderNodes()}
                width="w-80"
              />
            </div> */}
            <div>
              <p className="text-xl mb-2 mt-4">Process Name</p>
              <input
                type="text"
                className="border rounded py-2 w-80 px-3 text-black"
                placeholder="Process name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProcessName(e.target.value)
                }
                value={processName}
              />
            </div>
            <div>
              <p className="text-xl mb-2 mt-4">Commands</p>
              {commands.map((input, idx: number) => {
                return (
                  <div className="flex mt-2" key={idx}>
                    <input
                      type="text"
                      className={`border rounded py-2 ${
                        input.id ? "w-80" : "w-60"
                      } px-3 text-black`}
                      placeholder={`Command ${idx + 1}`}
                      value={commands[idx].value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCommandChange(idx, e.target.value, input.id)
                      }
                      autoFocus={true}
                    />
                    {input.id ? null : (
                      <button
                        onClick={() => removeCommand(idx)}
                        className="ml-2 bg-red-600 justify-center font-extrabold w-auto p-2 rounded text-grey-700 shadow-inner flex place-items-center"
                      >
                        remove
                      </button>
                    )}
                  </div>
                );
              })}
              <button
                onClick={addCommands}
                className="mt-4 text-xs bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center font-extrabold w-80 p-2 rounded text-grey-700 shadow-inner flex place-items-center mb-4"
              >
                Add Command
              </button>
            </div>
            <div>
              <button
                onClick={processUpdate}
                className="mt-4 bg-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 justify-center font-extrabold w-80 p-2 rounded text-grey-700 shadow-inner flex place-items-center mb-4"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProcess;
