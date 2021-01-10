/* eslint-disable */

import { getLatestMonitorData } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUseSelector } from "../../interfaces/app";
import moment from "moment";
import timezone from "moment-timezone";
// import { getDiffInMinutes } from "@thrusta/core/helpers/localstorage";
// import CPUData from "./cpu-chart";

type MonitorProps = {
  node_id: string;
};

function Monitor(props: MonitorProps): React.ReactElement {
  console.log(timezone.tz.guess());

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.node_id) {
      dispatch(getLatestMonitorData(props.node_id));
    }
  }, [props.node_id]);

  const { current_status } = useSelector((state: IUseSelector) => state.app);

  return (
    <div className="text-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-4 w-1/2 rounded-xl">
      <p className="text-xl font-extrabold">Server Monitoring</p>
      <div className="flex justify-center flex-wrap">
        {/* <CPUData
          cpu={
            current_status.cpu || {
              cpu_idle: 0,
              cpu_total: 0,
              cpu_usage: 0,
            }
          }
        /> */}
        {current_status.cpu?.cpu_usage ? (
          <div className="m-2">
            <p className="text-center text-3xl">CPU</p>
            <p
              className={`text-6xl ${
                Math.round(current_status.cpu?.cpu_usage) >= 80
                  ? "text-red-700"
                  : Math.round(current_status.cpu?.cpu_usage) >= 50
                  ? "text-yellow-600"
                  : "text-green-400"
              } font-extrabold`}
            >
              {Math.round(current_status.cpu?.cpu_usage) || 0}%
            </p>
          </div>
        ) : null}
        {current_status.memory?.memory_used ? (
          <div className="m-2">
            <p className="text-center text-3xl text-grey-600">Memory</p>
            <p className="text-6xl font-extrabold">
              {Math.round(current_status.memory?.memory_used / 1000000) || 0}
              mb
            </p>
          </div>
        ) : null}
        {current_status.uptime ? (
          <div className="m-2">
            <p className="text-center text-3xl text-grey-600">Uptime</p>
            <p className={`text-6xl font-extrabold`}>
              {Math.round(
                parseInt(current_status.uptime || "0", 10) / 3600000000000
              )}
              h
            </p>
          </div>
        ) : null}
      </div>
      <div>
        {current_status.last_ping ? (
          <p className={`text-center text-xs`}>
            Last updated:{" "}
            {moment(
              timezone.tz(
                new Date(current_status.last_ping),
                timezone.tz.guess()
              ),
              "YYYYMMDD"
            ).fromNow()}{" "}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Monitor;
