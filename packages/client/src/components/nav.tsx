import React from "react";
import { Link } from "react-router-dom";

const Nav: React.FC<{}> = (): React.ReactElement => {
  return (
    <header className="mb-8">
      <div className="flex justify-between place-items-center max-w-7xl background-black">
        <div className="flex-auto">
          <img src="/thrusta.svg" className="w-16" alt="" />
        </div>

        <div className="flex justify-evenly place-items-center">
          <Link
            to="/your-processes"
            className="mr-4 hover:opacity-60 transition-opacity"
          >
            <p className="text-sm font-extrabold text-brown-lighter">
              Processes
            </p>
          </Link>
          {/* <Link to="/apps" className="mr-4 hover:opacity-60 transition-opacity">
          <p className="text-sm font-extrabold text-brown-lighter">Apps</p>
        </Link> */}
          <Link
            to="/your-nodes"
            className="mr-4 hover:opacity-60 transition-opacity"
          >
            <p className="text-sm font-extrabold text-brown-lighter">Nodes</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
