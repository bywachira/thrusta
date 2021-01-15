/* eslint-disable */

import { deleteProcess } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUseSelector } from "../../interfaces/app";

type DeleteProps = {
  process_id: string;
};

const DeleteProcess: React.FC<DeleteProps> = (props): React.ReactElement => {
  const dispatch = useDispatch();

  function handleDeleteProcess() {
    dispatch(deleteProcess(props.process_id));
  }

  const { deleting } = useSelector((state: IUseSelector) => state.app);

  return (
    <div className="p-4">
      <button
        onClick={handleDeleteProcess}
        className="ml-2 bg-red-300 justify-center text-red-700 font-medium w-auto p-3 rounded text-grey-700 shadow-inner text-sm flex place-items-center"
      >
        {deleting ? "💣 Boom!!!!" : "Delete Process"}
      </button>
      <p className="text-gray-200 mt-2 text-xs">
        This is irreversible. Nothing related to this process will be kept
      </p>
    </div>
  );
};

export default DeleteProcess;
