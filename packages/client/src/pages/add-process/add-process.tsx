import { getNodes } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Back from "../../components/back";
import Dropdown from "../../components/dropdown";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";

function AddProcess(): React.ReactElement {
  const dispatch = useDispatch();
  const [node, setNode] = useState<{ label: string; id: string | number }>({
    label: "",
    id: "",
  });

  React.useEffect(() => {
    dispatch(getNodes());
  }, []);

  const { nodes } = useSelector((state: IUseSelector) => state.app);

  function onNodeSelect(item: { label: string; id: string }) {
    setNode(item);
    return;
  }

  function renderNodes(): any {
    if (nodes.length > 0) {
      return nodes.map((item: any): { label: string; id: string | number } => {
        return {
          label: `[${item.node_id}]-${item.node_name || "No name"}`,
          id: item._id,
        };
      });
    } else {
      return [];
    }
  }

  return (
    <div className="text-white">
      <Back />
      <>
        <p className="text-left font-extrabold text-2xl">Create New Process</p>
        <div>
          <Dropdown
            onSelectItem={(item: any) => onNodeSelect(item)}
            label="Select Node"
            items={renderNodes()}
          />
        </div>
      </>
    </div>
  );
}

export const AddProcessPage = withNav(AddProcess);
