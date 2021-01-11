/* eslint-disable */

import { getSingleProcess } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Back from "../../components/back";
import Tabs from "../../components/tabs";
import { TabContent } from "../../components/tabs/styles";
import withNav from "../../hoc/with-nav";
import { IUseSelector } from "../../interfaces/app";
import Commands from "./commands";
import EditProcess from "./edit-process";
import Logs from "./logs";
import Process from "./process";
import Stats from "./stats";

function SingleProcess(): React.ReactElement {
  const params: any = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProcess(params.process_id));
  }, []);

  const { process, isLoading } = useSelector(
    (state: IUseSelector) => state.app
  );

  return (
    <div>
      <Back />
      <>
        {isLoading && !process.process_id ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex flex-wrap justify-left place-items-center">
              <Process process={process} />
              <Stats logs={process.logs} commands={process.commands} />
            </div>
            <Tabs>
              <TabContent label="⚙️Commands & 🪵 Logs">
                <div className="flex flex-wrap justify-left mt-2">
                  {process._id && <Commands commands={process.commands} />}
                  {process._id && <Logs logs={process.logs} />}
                </div>
              </TabContent>
              <TabContent label="✍️ Edit Process">
                <EditProcess />
              </TabContent>
              <TabContent label="⚠️ Danger Zone">Delete Process</TabContent>
            </Tabs>
          </>
        )}
      </>
    </div>
  );
}

export const SingleProcessPage = withNav(SingleProcess);
