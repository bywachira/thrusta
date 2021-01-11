/* eslint-disable */

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateProcess, sleepProcess } from "@thrusta/core/redux/actions/app";
import { IUseSelector } from "../../interfaces/app";
import { useEffect } from "react";
import moment from "moment";
import timezone from "moment-timezone";
import Switch from "../../components/switch";

type ProcessProps = {
  process: {
    process_name: string;
    process_id: string;
    last_run: string;
    last_run_status: string;
    asleep: boolean;
    commands: {
      command: string;
      command_id: string;
      process: string;
      createdAt: string;
    }[];
    logs: any[];
    createdAt: string;
    _id: string;
  };
};

const Process: React.FC<ProcessProps> = ({ process }): React.ReactElement => {
  const dispatch = useDispatch();

  function toggleSleep(process_id: string, status: boolean) {
    dispatch(activateProcess(process_id));
  }

  return (
    <div className="rounded-xl text-white w-1/2 p-4 mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="flex justify-between">
        <p className="text-white bg-black w-min p-2 font-extrabold rounded-xl">
          #{process.process_id}
        </p>
        <Switch
          label="Activate Process"
          identifier={process._id}
          value={!process.asleep}
          handleChange={toggleSleep}
        />
      </div>
      <div className="flex place-items-center">
        <p className="text-4xl mt-2 font-extrabold">{process.process_name}</p>
        <p
          className={`text-white text-sm ml-2 font-extrabold ${
            !process.asleep ? "bg-green-400" : "bg-red-400"
          } p-1 rounded-xl`}
        >
          {!process.asleep ? "active" : "inactive"}
        </p>
      </div>
      <div>
        {process.last_run_status ? (
          <div className="flex mt-2 mb-2 place-items-center">
            <p className="text-xs font-extrabold">Last Run Status</p>
            <p
              className={`text-white text-xs ml-2 font-extrabold w-auto ${
                process.last_run_status === "complete"
                  ? "bg-green-400"
                  : "bg-red-400"
              } p-1 rounded`}
            >
              {process.last_run_status}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex place-items-center justify-between">
        <p className="text-xs font-extrabold">
          Spawned:{" "}
          {moment(
            timezone.tz(process.createdAt, timezone.tz.guess()),
            "YYYYMMDD"
          ).format("ll")}
        </p>
        <p className="text-xs font-extrabold">
          {process.last_run
            ? `Last ran: ${moment(
                timezone.tz(process.last_run, timezone.tz.guess()),
                "YYYYMMDD"
              ).fromNow()}`
            : "Process not ran yet"}
        </p>
      </div>
    </div>
  );
};

export default Process;
