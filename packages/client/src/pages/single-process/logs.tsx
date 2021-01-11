/* eslint-disable */

import React from "react";

type LogsProps = {
  logs: { log: string; type: string }[];
};

function Logs(props: LogsProps): React.ReactElement {
  return (
    <div className="w-1/2 p-2">
      <div className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 rounded-xl">
        <p className="text-lg font-extrabold mb-2 text-white">Recent Logs</p>
        <ul className="list-reset">
          {props.logs.length === 0 ? (
            <>
              <li className="text-gray-300 relative w-full mb-4">
                <pre className="p-4 bg-black rounded-xl">
                  <code>// No logs from this process</code>
                </pre>
              </li>
            </>
          ) : (
            <>
              {props.logs?.map((log, idx: number) => {
                return (
                  <li
                    className={`${
                      log.type === "info"
                        ? "text-yellow-400"
                        : log.type === "final"
                        ? "text-green-400"
                        : log.type === "fail"
                        ? "text-red-600"
                        : ""
                    } relative w-full mb-4`}
                    key={idx}
                  >
                    <pre className="p-4 bg-black rounded-xl break-all overflow-x-scroll no-scrollbar">
                      <code className="break-all">{log.log}</code>
                    </pre>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Logs;
