/* eslint-disable */

import { getChartData } from "@thrusta/core/redux/actions/app";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Dropdown from "../../components/dropdown";
import { IUseSelector } from "../../interfaces/app";

type ChartProps = {
  chart_data: {
    cpu: any[];
    memory: any[];
    disk: any[];
    network: any[];
  };
  node_id: string;
};

const ITEMS = [
  {
    label: "Last 30 days",
    id: "past-month",
  },
  {
    label: "Last 6 months",
    id: "6-months",
  },
  {
    label: "Last year",
    id: "past-year",
  },
  {
    label: "Last 7 days",
    id: "last-7-days",
  },
  {
    label: "Last 24 hours",
    id: "last-24hrs",
  },
];

const NodeCharts: React.FC<ChartProps> = (props): React.ReactElement => {
  const dispatch = useDispatch();

  function handleFetch(item: any) {
    dispatch(getChartData(props.node_id, item.id));
  }

  const { chart_data } = useSelector((state: IUseSelector) => state.app);

  function renderCPUChart() {
    return (
      <>
        {chart_data.cpu && (
          <LineChart
            width={document.getElementById("chart-container")?.clientWidth}
            height={300}
            data={chart_data.cpu}
            margin={{
              top: 4,
              right: 4,
              left: 4,
              bottom: 4,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0779e4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0779e4" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec0101" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec0101" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis dataKey="max" />
            <Tooltip />
            {/* <Legend /> */}
            <Line
              strokeWidth="4px"
              type="monotone"
              dataKey="average"
              stroke="#0779e4"
            />
            <Line
              strokeWidth="4px"
              type="monotone"
              dataKey="min"
              stroke="#21bf73"
            />
            <Line
              strokeWidth="4px"
              type="monotone"
              dataKey="max"
              stroke="#ec0101"
            />
          </LineChart>
        )}
      </>
    );
  }

  function renderMemoryChart() {
    return (
      <>
        {chart_data.memory && (
          <LineChart
            width={document.getElementById("chart-container")?.clientWidth}
            height={300}
            data={chart_data.memory}
            margin={{
              top: 4,
              right: 4,
              left: 4,
              bottom: 4,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#21bf73" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#21bf73" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0779e4" stopOpacity={1} />
                <stop offset="95%" stopColor="#0779e4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec0101" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec0101" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis dataKey="max" />
            <Tooltip />
            <Line
              strokeWidth="4px"
              type="monotone"
              dataKey="average"
              stroke="#0779e4"
              fill="rgba(7, 121, 228, 0.1)"
            />
            <Line
              strokeWidth="4px"
              type="monotone"
              dataKey="min"
              stroke="#21bf73"
              fill="#21bf73"
            />
            <Line
              strokeWidth="4px"
              type="monotone"
              dataKey="max"
              stroke="#ec0101"
              fill="#ec0101"
            />
          </LineChart>
        )}
      </>
    );
  }

  return (
    <div id="chart-container">
      <div className="flex justify-right">
        <Dropdown
          onSelectItem={(item: any) => handleFetch(item)}
          label="Select Period"
          items={ITEMS}
          activeItem={ITEMS.filter((item) => item.id === chart_data.period)[0]}
        />
      </div>
      <div className="flex pt-4 pb-4 mt-4 justify-between flex-wrap">
        <div>
          <p className="text-white text-center font-extrabold">CPU Usage Overtime</p>
          {renderCPUChart()}
        </div>
        <div>
          <p className="text-white text-center font-extrabold">
            Memory Usage Overtime
          </p>
          {renderMemoryChart()}
        </div>
      </div>
    </div>
  );
};

export default NodeCharts;
