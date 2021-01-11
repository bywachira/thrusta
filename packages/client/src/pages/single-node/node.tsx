/* eslint-disable */

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNodeName } from "@thrusta/core/redux/actions/app";
import { IUseSelector } from "../../interfaces/app";
import { useEffect } from "react";

type NodeProps = {
  node: {
    node_name?: string;
    node_id: string;
    active: boolean;
  };
};

type InputProps = {
  node_id: string;
  handleHideInput: (value: boolean) => any;
  isOpen: boolean;
};

function Input(props: InputProps) {
  const [nodeName, setNodeName] = useState("");
  const dispatch = useDispatch();
  const { updating, close } = useSelector((state: IUseSelector) => state.app);

  function onSubmit() {
    if (nodeName) {
      dispatch(updateNodeName(props.node_id, nodeName));
    }
  }

  useEffect(() => {
    // if (close && props.isOpen) {
    //   props.handleHideInput(false);
    // }
  }, [close, props.isOpen]);

  return (
    <div className="flex mt-2">
      <input
        type="text"
        value={nodeName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNodeName(e.target.value)
        }
        placeholder="Enter node name"
        className="border rounded-xl py-2 px-3 text-black"
      />
      <button
        onClick={onSubmit}
        disabled={updating}
        className="ml-2 bg-green-400 text-white w-min rounded-xl p-2 font-extrabold"
      >
        {updating ? "Saving" : "Save"}
      </button>
    </div>
  );
}

const Node: React.FC<NodeProps> = ({ node }): React.ReactElement => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl text-white w-1/2 p-4 mt-4">
      <div className="flex justify-between">
        <p className="text-white bg-black w-min p-2 font-extrabold rounded-xl">
          #{node?.node_id}
        </p>
        {show ? (
          <button
            onClick={() => setShow(false)}
            className="bg-white w-min text-black rounded-xl p-2 font-extrabold"
          >
            Close
          </button>
        ) : (
          <button
            onClick={() => setShow(true)}
            className="bg-white w-min text-black rounded-xl p-2 font-extrabold"
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex place-items-center">
        <p className="text-4xl mt-2 font-extrabold">
          {node.node_name ? node.node_name : "No Name"}
        </p>
        <p
          className={`text-white text-sm ml-2 font-extrabold ${
            node.active ? "bg-green-400" : "bg-red-400"
          } p-1 rounded-xl`}
        >
          {node.active ? "active" : "inactive"}
        </p>
      </div>
      <div>
        {show ? (
          <Input
            handleHideInput={setShow}
            node_id={node.node_id}
            isOpen={show}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Node;
