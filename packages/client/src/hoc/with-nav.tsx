import React from "react";
import Nav from "../components/nav";

const withNav = (Component: any): (() => React.ReactElement) => () => {
  return (
    <>
      <Nav />
      <div className="mt-4">
        <Component />
      </div>
    </>
  );
};

export default withNav;
