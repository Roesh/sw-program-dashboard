import { IMetricStatusLiteral } from "./metric-status.interface";

export type statusCountsType = { [key in IMetricStatusLiteral]: number };

export interface IStatusCounts extends statusCountsType {
  total: number;
}
