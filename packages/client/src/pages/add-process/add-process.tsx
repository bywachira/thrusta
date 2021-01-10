/* eslint-disable */

import { createProcess, getNodes } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Back from "../../components/back";
import Dropdown from "../../components/dropdown";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";

function AddProcess(): React.ReactElement {
  const dispatch = useDispatch();
  const [node, setNode] = useState<{ label: string; id: string | number }>({
    label: "",
    id: "",
  });

  const [commands, setCommands] = useState<string[]>([]);
  const [processName, setProcessName] = useState<string>("");

  React.useEffect(() => {
    dispatch(getNodes());
  }, []);

  const { nodes } = useSelector((state: IUseSelector) => state.app);

  function onNodeSelect(item: { label: string; id: string }) {
    setNode(item);
    return;
  }

  function renderNodes(): any {
    if (nodes.length > 0) {
      return nodes.map((item: any): { label: string; id: string | number } => {
        return {
          label: `[${item.node_id}]-${item.node_name || "No name"}`,
          id: item._id,
        };
      });
    } else {
      return [];
    }
  }

  function addCommands() {
    const _commands = [...commands, ""];

    setCommands([..._commands]);
  }

  function handleCommandChange(idx: number, value: string) {
    const _commands = commands;

    _commands[idx] = value;

    setCommands([..._commands]);
  }

  function removeCommand(idx: number) {
    const _commands = commands;

    if (idx > -1) {
      _commands.splice(idx, 1);
    }

    setCommands([..._commands]);
  }

  function saveProcess() {
    console.log("called");
    if (node.id && processName && commands.length > 0) {
      const data = {
        node_id: node.id,
        process_name: processName,
        commands: [...commands.map((command: string) => ({ command }))],
      };

      dispatch(createProcess(data));
    }
  }

  return (
    <div className="text-white">
      <Back />
      <div className="flex justify-center">
        <div>
          <p className="text-left font-extrabold text-2xl">
            Create New Process
          </p>
          <div className="mt-2 p-2">
            <div>
              <p className="text-xl mb-2">Assign process to node</p>
              <Dropdown
                onSelectItem={(item: any) => onNodeSelect(item)}
                label="Select Node"
                items={renderNodes()}
                width={"w-80"}
              />
            </div>
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
              {commands.map((input: string, idx: number) => {
                return (
                  <div className="flex mt-2" key={idx}>
                    <input
                      type="text"
                      className="border rounded py-2 w-60 px-3 text-black"
                      placeholder={`Command ${idx + 1}`}
                      value={commands[idx]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCommandChange(idx, e.target.value)
                      }
                      autoFocus={true}
                    />
                    <button
                      onClick={() => removeCommand(idx)}
                      className="ml-2 bg-white bg-red-600 justify-center font-extrabold w-auto p-2 rounded text-grey-700 shadow-inner flex place-items-center"
                    >
                      remove
                    </button>
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
                onClick={saveProcess}
                className="mt-4 bg-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 justify-center font-extrabold w-80 p-2 rounded text-grey-700 shadow-inner flex place-items-center mb-4"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AddProcessPage = withNav(AddProcess);
