import * as d3 from "d3";
import React from "react";

type CPUProps = {
  cpu: {
    cpu_idle: number;
    cpu_usage: number;
    cpu_total: number;
  };
};

const CPUData: React.FC<CPUProps> = (props): React.ReactElement => {
  React.useEffect(() => {
    if (props.cpu.cpu_idle) {
      const svgDimensions = { width: 300, height: 250 };
      const margin = { left: 4, right: 4, top: 4, bottom: 4 };
      const chartDimensions = {
        width: svgDimensions.width - margin.left - margin.right,
        height: svgDimensions.height - margin.bottom - margin.top,
      };

      const COLORS = ["#21bf73", "#fd5e53"];

      const svg = d3
        .select("div#cpu")
        .append("svg")
        .attr("width", svgDimensions.width)
        .attr("height", "auto")
        .attr(
          "style",
          "background-color: inherit;border-radius: 4px;display:flex;justify-content-center"
        );

      const chartGroup = svg
        .append("g")
        .attr("width", svgDimensions.width)
        .attr("height", "auto");

      const radius =
        Math.min(chartDimensions.width, chartDimensions.height) / 2;

      chartGroup.attr("transform", `translate(${radius}, ${radius})`);

      const arc = d3
        .arc()
        .innerRadius(radius / 1.7)
        .outerRadius(radius);

      const pieChart = d3
        .pie()
        .startAngle(90 * (Math.PI / 180))
        .endAngle(-90 * (Math.PI / 180));

      const pie = pieChart([props.cpu.cpu_idle, props.cpu.cpu_usage]);

      const arcs: any = chartGroup.selectAll("slice").data(pie).enter();

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d: any, i: any) => COLORS[i]);
    }
  }, [props.cpu]);

  return <div id="cpu"></div>;
};

export default CPUData;
