import { ISubMetricsLiteral } from "./project-status-update.interface";
import { IStatusCounts } from "./status-counts.interface";

// type projectMetricKeysType = { [key in IStatusCounts]: number };

export interface IProjectStatusOverTime extends IStatusCounts {
  dateOfUpdate: number; //Timestamp of date
}
