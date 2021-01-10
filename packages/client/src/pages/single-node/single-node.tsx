/* eslint-disable */

import { getNode } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Back from "../../components/back";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";

function SingleNode(): React.ReactElement {
  const params: any = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getNode(params.node_id));
  }, []);

  const { node, isLoading } = useSelector((state: IUseSelector) => state.app);

  //   bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500

  return (
    <div>
      <Back />
      <div className="rounded-xl text-white w-full p-4 mt-4">
        <div className="flex justify-between">
          <p className="text-white bg-black w-min p-2 font-extrabold rounded-xl">
            #{node?.node_id}
          </p>
          <button className="bg-white w-min text-black rounded-xl p-2 font-extrabold">
            Edit
          </button>
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
      </div>
    </div>
  );
}

export const SingleNodePage = withNav(SingleNode);
