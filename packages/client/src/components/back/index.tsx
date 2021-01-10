import React from "react";
import { useHistory } from "react-router";

function Back(): React.ReactElement {
  const history = useHistory();

  return (
    <button
      onClick={() => history.goBack()}
      className="button flex place-items-center shadow-sm relative inline-flex items-center justify-center px-2.5 py-1.5 text-xs leading-4 font-medium rounded-md text-white bg-black transition ease-fin-out transform duration-50 px-8 dark dark"
    >
      {"🔙"} Back
    </button>
  );
}

export default Back;
