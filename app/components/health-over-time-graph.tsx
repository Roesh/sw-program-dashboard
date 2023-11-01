import React from "react";
import {
  greenHexCode,
  projectStatusOverTime,
  redHexCode,
  yellowHexCode,
} from "../constants";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { dateFormat } from "../utils/date-format";
import { Card } from "@mantine/core";
import { IProjectStatusOverTime } from "../interfaces/project-status-over-time.interface";

const ProjectHealthToolTip = (props: any) => {
  const { active, payload } = props;
  const data: IProjectStatusOverTime = payload?.[0]?.payload;

  if (active && data) {
    // const currData = payload && payload.length ? payload[0].payload : null;
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <span>{dateFormat(data.dateOfUpdate)}</span>
        <p style={{ color: greenHexCode }}>Green: {data.Green}</p>
        <p style={{ color: yellowHexCode }}>Yellow: {data.Yellow} </p>
        <p style={{ color: redHexCode }}>Red:{data.Red} </p>
        ---
        <p>Total: {data.total}</p>
      </Card>
    );
  }
  return null;
};
export const HealthOverTimeGraph = () => {
  const healthOverTime = projectStatusOverTime;
  console.debug(healthOverTime, "hotz");
  const start = +new Date() - 1000 * 60 * 60 * 24 * 120;
  const end = +new Date() + 1000 * 60 * 60 * 24 * 7;

  const domain: number[] = [start, end]; // TODO: COnvert to prop

  return (
    <>
      <h1>Project Health Over Time</h1>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={healthOverTime}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dateOfUpdate"
            scale="time"
            tickFormatter={dateFormat}
            type="number"
            domain={domain}
          />
          <YAxis />
          <Tooltip content={<ProjectHealthToolTip />} />
          <Legend />
          <Line type="monotone" dataKey="Green" stroke={greenHexCode} />
          <Line type="monotone" dataKey="Yellow" stroke={yellowHexCode} />
          <Line type="monotone" dataKey="Red" stroke={redHexCode} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
