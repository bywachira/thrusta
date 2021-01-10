/* eslint-disable */

import { getNode } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Back from "../../components/back";
import Monitor from "../../features/monitor";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";
import Node from "./node";

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
      <>
        {isLoading && !node.node_id ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap justify-center">
            <Node node={node} />
            <Monitor node_id={node.node_id} />
          </div>
        )}
      </>
    </div>
  );
}

export const SingleNodePage = withNav(SingleNode);
