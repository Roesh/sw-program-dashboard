import { MRT_SortingFn } from "mantine-react-table";
import {
  IProjectStatusUpdate,
  ISubMetricsLiteral,
} from "../interfaces/project-status-update.interface";
import { IMetricStatusLiteral } from "../interfaces/metric-status.interface";
import { metricToSortLevelMap } from "../constants";
import { IProgramData } from "../interfaces/program-data.interface";

export const healthSortingFunction: MRT_SortingFn<IProgramData> = (
  rowA,
  rowB,
  columnId
) => {
  //@ts-ignore
  const valueA = rowA.original[columnId];
  //@ts-ignore
  const valueB = rowB.original[columnId];

  //@ts-ignore
  return metricToSortLevelMap[valueA] - metricToSortLevelMap[valueB];
};
