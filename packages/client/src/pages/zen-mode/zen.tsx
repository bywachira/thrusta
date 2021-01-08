import React from "react";
// import InputComponent from "../../components/input";
import { CommandHistory } from "../../features/commands";
import withNav from "../../hoc/with-nav";

function Zen() {
  return (
    <div className="text-white">
      <CommandHistory />
    </div>
  );
}

export const ZenMode = withNav(Zen);
