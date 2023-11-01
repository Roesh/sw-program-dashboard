"use client";
import {
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  Tooltip,
} from "recharts";
import {
  IProjectStatusUpdate,
  ISubMetricsLiteral,
} from "../interfaces/project-status-update.interface";
import {
  colorToHexCodeMap,
  grayTextHexCode,
  greenHexCode,
  metricKeyToDisplayNameMap,
  redHexCode,
  weeklyUpdates,
  yellowHexCode,
  yellowHexCodeText,
} from "../constants";
import { useReducer } from "react";
import { IMetricStatusLiteral } from "../interfaces/metric-status.interface";
import { Box, Grid, ScrollArea } from "@mantine/core";
import { IWeeklyUpdate } from "../interfaces/weekly-update.interface";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
  const {
    cx,
    cy,
    width,
    height,
    name,
    value,
    innerRadius,
    outerRadius,
    midAngle,
  } = props;
  // const radius = 10;
  if (props.payload?.value === 0) {
    return "";
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

export default function RadialMetricsTable({
  weeklyUpdate,
}: {
  weeklyUpdate: IWeeklyUpdate;
}) {
  const pie1Cx = 100
  const projectStatuses: IProjectStatusUpdate[] = weeklyUpdate.projectUpdates;

  // const displayData: any[] = []
  const initialData: { [key in IMetricStatusLiteral]: number } = {
    Green: 0,
    Yellow: 0,
    Red: 0,
  };
  const initialSubMetricsData: {
    [key in ISubMetricsLiteral]: { [key in IMetricStatusLiteral]: number };
  } = {
    escalationMetricStatus: { ...initialData },
    modernizationMetricStatus: { ...initialData },
    staffingMetricStatus: { ...initialData },
    agileMetricStatus: { ...initialData },
  };

  const statusBreakdown = projectStatuses.reduce((prev, current) => {
    prev[current.overallStatus]++;
    return prev;
  }, initialData);

  const displayData = Object.entries(statusBreakdown).map((entry) => {
    return {
      name: entry[0],
      value: entry[1],
    };
  });

  const subMetricsstatusBreakdown = projectStatuses.reduce((prev, current) => {
    prev["agileMetricStatus"][current.agileMetricStatus]++;
    prev["escalationMetricStatus"][current.agileMetricStatus]++;
    prev["modernizationMetricStatus"][current.agileMetricStatus]++;
    prev["staffingMetricStatus"][current.staffingMetricStatus]++;
    return prev;
  }, initialSubMetricsData);

  const subMetricsstatusBreakdownDisplayData: {
    [key in keyof typeof initialSubMetricsData]: typeof displayData;
  } = {
    escalationMetricStatus: Object.entries(
      subMetricsstatusBreakdown.escalationMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),
    modernizationMetricStatus: Object.entries(
      subMetricsstatusBreakdown.escalationMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),

    staffingMetricStatus: Object.entries(
      subMetricsstatusBreakdown.staffingMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),
    agileMetricStatus: Object.entries(
      subMetricsstatusBreakdown.agileMetricStatus
    ).map((entry) => {
      return {
        name: entry[0],
        value: entry[1],
      };
    }),
  };

  return (
    <ScrollArea style={{ width: '100%' }}>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ marginTop: 0 }}>Projects by overall health</h2>
        <PieChart width={400} height={250}>
          <Tooltip />
          <Pie
            data={displayData}
            dataKey="value"
            cx={pie1Cx}
            cy="125"
            innerRadius={65}
            outerRadius={100}
            startAngle={45}
            endAngle={405}
            legendType="circle"
          >
            <LabelList content={renderCustomizedLabel} position={"outside"} />
            {displayData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  colorToHexCodeMap[
                  (entry.name as IMetricStatusLiteral) ?? "Yellow"
                  ]
                }
              />
            ))}
          </Pie>
          <text
            x={pie1Cx}
            y={125}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={28}
            fill={grayTextHexCode}
          >
            {projectStatuses.length} Total
          </text>
          {Object.keys(subMetricsstatusBreakdown).map((key, i) => {
            // Calculate angle for this index
            const angle = (i / 4) * 145 * (Math.PI / 180); // Radians

            // Get x & y for this angle
            let x = pie1Cx + Math.cos(angle) * 150;
            let y = 125 + Math.sin(angle) * 150;

            // Overriding circle:
            x = pie1Cx + 170 + ((i % 2 === 0) ? -25 : 75)
            y = 125 + ((i < 2) ? -50 : 50)
            return (
              <>
                <Pie
                  cx={x}
                  cy={y}
                  data={
                    subMetricsstatusBreakdownDisplayData[
                    key as keyof typeof subMetricsstatusBreakdown
                    ]
                  }
                  dataKey="value"
                  innerRadius={30}
                  outerRadius={45}
                >
                  {subMetricsstatusBreakdownDisplayData[
                    key as keyof typeof subMetricsstatusBreakdown
                  ].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        colorToHexCodeMap[
                        (entry.name as IMetricStatusLiteral) ?? "Yellow"
                        ]
                      }
                    />
                  ))}
                </Pie>
                <text
                  x={x + 4}
                  y={y + 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={16}
                  fill={grayTextHexCode}
                >
                  {
                    metricKeyToDisplayNameMap[
                    key as keyof typeof subMetricsstatusBreakdown
                    ]
                  }
                </text>
              </>
            );
          })}
        </PieChart>
        <Box
          sx={{
            fontSize: "2rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <span style={{ color: greenHexCode }}>{initialData.Green}</span>{" "}
            <span style={{ color: greenHexCode, fontSize: "1.5rem" }}>Green</span>
          </div>
          {initialData.Yellow > 0 && (
            <div>
              <span style={{ color: yellowHexCodeText }}>
                {initialData.Yellow}
              </span>{" "}
              <span style={{ color: yellowHexCodeText, fontSize: "1.5rem" }}>
                Yellow
              </span>
            </div>
          )}
          {initialData.Red > 0 && (
            <div>
              <span style={{ color: redHexCode }}>{initialData.Red}</span>{" "}
              <span style={{ color: redHexCode, fontSize: "1.5rem" }}>Red</span>
            </div>
          )}
        </Box>
      </Box>
    </ScrollArea>

  );
}
