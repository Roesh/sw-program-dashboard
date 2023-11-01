"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IProjectStatusUpdate } from "../interfaces/project-status-update.interface";
import {
  colorToHexCodeMap,
  grayTextHexCode,
  greenHexCode,
  redHexCode,
  weeklyUpdates,
  yellowHexCode,
  yellowHexCodeText,
} from "../constants";
import { useReducer } from "react";
import { IMetricStatusLiteral } from "../interfaces/metric-status.interface";
import { Box } from "@mantine/core";
import { IWeeklyUpdate } from "../interfaces/weekly-update.interface";

const CustomizedLabel = (props: any) => {
  console.log(props, "ppz");
  const { x, y, width, height, value, external, name } = props;

  const breakdown = external.displayData.find(
    (entry: any) => entry.name === name
  );

  return (
    <g>
      <text
        x={x + width / 2}
        y={y - 15}
        fill={grayTextHexCode}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {breakdown.total}
      </text>
      {/* <text
        x={x - 20 + width / 2}
        y={y - 10}
        fill={greenHexCode}
        textAnchor=''
        dominantBaseline="middle"
      >
        {breakdown.Green ?? 0}
      </text>
      <text
        x={x + width / 2}
        y={y - 10}
        fill={yellowHexCode}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {breakdown.Yellow ?? 0}
      </text>
      <text
        x={x + 20 + width / 2}
        y={y - 10}
        fill={redHexCode}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {breakdown.Red ?? 0}
      </text> */}
    </g>
  );
};

export const BarGraphBreakdown: React.FC<{
  weeklyUpdate: IWeeklyUpdate;
}> = ({ weeklyUpdate }) => {
  const projectStatuses: IProjectStatusUpdate[] = weeklyUpdate.projectUpdates;

  const emptyObject: any = {};

  let overAll;

  // const displayData: any[] = []
  const statusBreakdown: {
    [key in string]: { [key in IMetricStatusLiteral]: number };
  } = projectStatuses.reduce((prev, current) => {
    if (current.programName !== undefined && current.programName?.length > 0) {
      //@ts-ignore
      if (prev[current.programName] === undefined) {
        prev[current.programName] = {};
      }
      overAll = prev[current.programName][current.overallStatus];
      console.log(overAll, "oaa");
      if (overAll !== undefined) {
        prev[current.programName][current.overallStatus] = ++overAll;
      } else {
        prev[current.programName][current.overallStatus] = 1;
      }
    } else {
      prev.other = {};
    }
    return prev;
  }, emptyObject);

  // const statusBreakdown = projectStatuses.reduce(((prev, current) => {
  //     prev[current.overallStatus]++
  //     return prev
  // }), emptyObject)

  const displayData = Object.entries(statusBreakdown).map((entry) => {
    return {
      name: entry[0],
      Green: entry[1].Green,
      Yellow: entry[1].Yellow,
      Red: entry[1].Red,
      total:
        (entry[1].Green ?? 0) + (entry[1].Yellow ?? 0) + (entry[1].Red ?? 0),
      zero: 0,
    };
  });

  const max = displayData.reduce((prev, current) => {
    console.log(prev, 'redl')
    if (current.total > prev) {
      return current.total
    }else {
      return prev
    }
  }, 0)

  console.log(max, "max io")
  return (
    // https://github.com/recharts/recharts/issues/1618
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        layout={"horizontal"}
        data={displayData}
        {...{
          overflow: "visible",
        }}
      >
        <Tooltip />
        <YAxis type="number" hide domain={[0, max]} />
        <XAxis type="category" dataKey="name" angle={-45} textAnchor="end" />
        <Bar dataKey="Green" stackId="a" fill={greenHexCode}>
          {/* <LabelList
            dataKey="Green"
            position="center"
            style={{ fill: "#ffffff", fontSize: "1.2rem" }}
          /> */}
        </Bar>
        <Bar dataKey="Yellow" stackId="a" fill={yellowHexCode}></Bar>
        <Bar dataKey="Red" stackId="a" fill={redHexCode}></Bar>
        <Bar dataKey="zero" stackId="a" fill={"#00000000"}>
          <LabelList
            dataKey="total"
            position="top"
            style={{ fill: grayTextHexCode, fontSize: "1.2rem" }}
            content={<CustomizedLabel external={{ displayData }} />}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
