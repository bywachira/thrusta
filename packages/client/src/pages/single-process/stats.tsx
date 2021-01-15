/* eslint-disable */

import React from "react";

type StatProps = {
  logs: any[];
  commands: any[];
};

function Stats(props: StatProps): React.ReactElement {
  return (
    <div className="text-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-4 w-1/4 rounded-xl ml-2 mt-4">
      {/* <p className="text-xl font-extrabold">With this process</p> */}
      <div className="flex justify-center flex-wrap">
        {/* <div className="m-2">
          <p className="text-center text-xl font-extrabold">{"🪵"}Logs</p>
          <p className="text-4xl text-white text-center font-extrabold">
            {props.logs?.length}
          </p>
        </div> */}
        <div className="m-2">
          <p className="text-center text-xl font-extrabold">{"⚙️"}Commands</p>
          <p className="text-4xl text-white text-center font-extrabold">
            {props.commands?.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
