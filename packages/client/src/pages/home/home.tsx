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
import Callout from "../../components/callout";
import { useHistory } from "react-router";

function Home() {
  const { nodes, processes, isLoading } = useSelector(
    (state: IUseSelector) => state.app
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getNodes());
    dispatch(getActiveProcess());
    dispatch(getProcess());
  }, []);

  return (
    <div>
      <p className="text-white font-extrabold text-xl">Processes</p>
      {!isLoading && processes.length === 0 ? (
        <Callout
          emoji={"⚠️"}
          message={"No processes created"}
          header={"No Processes"}
          renderContent={() => (
            <div className="place-items-center flex">
              <button
                onClick={() => history.push("/add-process")}
                className="button shadow-sm relative inline-flex items-center justify-center px-2.5 py-1.5 text-xs leading-4 font-medium rounded-md text-white bg-pink-600 transition ease- fin-out transform duration-50 px-8 dark dark font-extrabold"
              >
                Add Process
              </button>
            </div>
          )}
        />
      ) : (
        <Processes processes={processes} />
      )}
      <p className="text-white font-extrabold text-xl">Nodes</p>
      <Node nodes={nodes} />
    </div>
  );
}

export const HomePage = withNav(Home);
