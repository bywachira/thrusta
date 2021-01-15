/* eslint-disable */

import { getChartData, getNode } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Back from "../../components/back";
import Monitor from "../../features/monitor";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";
import Node from "./node";
import Tabs from "../../components/tabs";
import { TabContent } from "../../components/tabs/styles";

function SingleNode(): React.ReactElement {
  const params: any = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getNode(params.node_id));
    dispatch(getChartData(params.node_id, "past-month"));
  }, []);

  const { node, isLoading } = useSelector((state: IUseSelector) => state.app);

  //   bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500

  return (
    <div>
      <Back />
      <>
        {isLoading && !node.node_id ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="flex flex-wrap justify-center">
              <Node node={node} />
            </div>
            <div>
              <Tabs>
                <TabContent label="📝 Summary">
                  <Monitor node_id={node.node_id} />
                </TabContent>
                <TabContent label="🕵️ Monitoring">
                  <div className="monitoring"></div>
                </TabContent>
              </Tabs>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export const SingleNodePage = withNav(SingleNode);
