/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";
import {
  getNodes,
  getActiveProcess,
  getProcess,
} from "@thrusta/core/redux/actions/app";
import Processes from "../../features/processes";
import Node from "../../features/nodes";

function Home() {
  const { nodes, processes, isLoading } = useSelector(
    (state: IUseSelector) => state.app
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNodes());
    dispatch(getActiveProcess());
    dispatch(getProcess());
  }, []);

  return (
    <div>
      <p className="text-white font-extrabold text-xl">Processes</p>
      <Processes processes={processes} />
      <p className="text-white font-extrabold text-xl">Nodes</p>
      <Node nodes={nodes} />
    </div>
  );
}

export const HomePage = withNav(Home);
