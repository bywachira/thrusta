import React from "react";

const Nav: React.FC<{}> = (): React.ReactElement => {
  return (
    <header className="mb-8">
      <div className="flex justify-center place-items-center fixed max-w-7xl background-black">
        <div className="flex-auto">
          <img src="./thrusta.svg" className="w-16" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Nav;
