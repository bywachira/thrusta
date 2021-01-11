/* eslint-disable */

import React from "react";
import moment from "moment";
// import Switch from "../../components/switch";
import { useDispatch } from "react-redux";
// import { activateProcess, sleepProcess } from "@thrusta/core/redux/actions/app";

type ProcessProps = {
  processes: any[];
};

function Processes(props: ProcessProps) {
  const dispatch = useDispatch();

  // function handleChange(process_id: string, asleep: boolean) {
  //   // if (asleep) {
  //   dispatch(activateProcess(process_id));
  //   // } else {
  //   //   dispatch(sleepProcess({ process_id }));
  //   // }
  // }

  return (
    <div className="flex justify-left p-1 overflow-x-scroll no-scrollbar rounded-xl">
      {props.processes.map((item: any, idx: number) => {
        return (
          <div
            className="text-white mr-4 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-4 rounded-2xl"
            key={idx}
            style={{
              minWidth: "300px !important",
              maxWidth: "300px !important",
            }}
          >
            <div className="flex flex-wrap justify-between place-items-center pb-2">
              <p className="text-white mr-2 p-1 rounded text-xs font-extrabold italic bg-yellow-400">
                #{item.process_id}
              </p>
              <p className="text-xl font-extrabold break-normal">
                {item.process_name}
              </p>
            </div>
            <div className="flex flex-wrap justify-between">
              <p className="text-white text-sm font-extrabold">
                {"⚙️"} {item.commands.length} command
                {item.commands.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-white text-xs">
                {item.last_run
                  ? `Last summoned: ${moment(
                      new Date(item.last_run),
                      "YYYYMMDD"
                    ).fromNow()}`
                  : `Process hasn't been summoned`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

{
  /* <Switch
                value={!item.asleep}
                handleChange={handleChange}
                label=""
                identifier={item._id}
              /> */
}

export default Processes;
