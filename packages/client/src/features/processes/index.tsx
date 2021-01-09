/* eslint-disable */

import React from "react";
import moment from "moment";
import Switch from "../../components/switch";

type ProcessProps = {
  processes: any[];
};

function Processes(props: ProcessProps) {
  function handleChange(e: any) {
    console.log(e);
  }

  return (
    <div className="flex justify-left p-1 flex-wrap">
      {props.processes.map((item) => {
        return (
          <div className="text-white mr-4 w-80 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-4 rounded-2xl">
            <div className="flex flex-wrap justify-between place-items-center pb-2">
              <p className="text-xl font-extrabold">{item.process_name}</p>
              <div className="flex place-items-center">
                <p className="bg-yellow-500 mr-2 p-1 rounded-2xl text-sm font-extrabold">
                  #{item.process_id}
                </p>
                <Switch
                  value={!item.asleep}
                  handleChange={handleChange}
                  label=""
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <p className="text-white text-sm font-extrabold">
                {"⚙️"} {item.commands.length} command
                {item.commands.length === 1 ? "" : "s"}
              </p>
              <p className="text-white text-sm font-extrabold bg-gray-900 p-1 rounded-xl">
                Status: {item.status || "unknown"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-white">
                Last run:{" "}
                {moment(new Date(item.last_run), "YYYYMMDD").fromNow()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Processes;
