import React from "react";

type CommandProps = {
  commands: any[];
};

function Commands(props: CommandProps): React.ReactElement {
  return (
    <div className="w-1/2 p-2">
      <div className="w-full text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 rounded-xl">
        <p className="text-lg font-extrabold mb-2">Commands</p>
        <ul className="list-reset">
          {props.commands?.map((command: any, idx: number) => {
            return (
              <li className="relative w-full mb-4" key={idx}>
                <pre className="p-4 bg-black rounded-xl">
                  <code>{command.command}</code>
                </pre>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Commands;
