/* eslint-disable */

import React from "react";
import moment from "moment";

type NodeProps = {
  nodes: any[];
};

const Node: React.FC<NodeProps> = (props) => {
  return (
    <div className="table w-full">
      {props.nodes.map((node: any, idx: number) => {
        return (
          <div
            key={idx}
            className="flex place-items-center flex-wrap justify-between p-2 rounded-md bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500"
          >
            <p className="text-white text-sm font-extrabold">#{node.node_id}</p>
            <p className="text-white text-sm font-extrabold bg-gray-900 p-1 rounded-xl">
              {node.active ? "active" : "inactive"}
            </p>
            <p className="text-white text-sm">
              Created: {moment(node.createdAt, "YYYYMMDD").fromNow()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Node;
