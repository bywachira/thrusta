/* eslint-disable */

import React from "react";
import moment from "moment";
import { useHistory } from "react-router";

type NodeProps = {
  nodes: any[];
};

const Node: React.FC<NodeProps> = (props) => {
  const history = useHistory();

  function viewNode(node: string) {
    history.push(`/nodes/${node}`);
  }

  return (
    <div className="table w-full">
      {props.nodes.map((node: any, idx: number) => {
        return (
          <div
            key={idx}
            className="flex place-items-center flex-wrap justify-between p-2 rounded-md bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500"
          >
            <p className="text-white text-sm font-extrabold">#{node.node_id}</p>
            {node.node_name ? (
              <p className="text-white text-sm font-extrabold">
                {node.node_name}
              </p>
            ) : null}
            <p
              className={`text-white text-sm font-extrabold ${
                node.active ? "bg-green-400" : "bg-red-400"
              } p-1 rounded-xl`}
            >
              {node.active ? "active" : "inactive"}
            </p>
            <p className="text-white text-sm">
              Created: {moment(node.createdAt, "YYYYMMDD").fromNow()}
            </p>
            <button
              onClick={() => viewNode(node._id)}
              className="button shadow-sm relative inline-flex items-center justify-center px-2.5 py-1.5 text-xs leading-4 font-medium rounded-md text-white bg-black transition ease- fin-out transform duration-50 px-8 dark dark"
            >
              Details
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Node;
