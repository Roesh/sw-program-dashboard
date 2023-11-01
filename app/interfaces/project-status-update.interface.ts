import { IMetricStatusLiteral } from "./metric-status.interface";

/** Combines multiple tables if needed. Can use Nosql to keep data duplicated */
export interface IProjectStatusUpdate {
  projectId: string;
  projectName: string;
  programName: string;

  agileMetricStatus: IMetricStatusLiteral;
  staffingMetricStatus: IMetricStatusLiteral;
  modernizationMetricStatus: IMetricStatusLiteral;
  escalationMetricStatus: IMetricStatusLiteral;
  overallStatus: IMetricStatusLiteral;

  dateOfLastMetricStatusUpdate: Date;

  projectUpdateNotes?: string
  contact: string
}

export type ISubMetricsLiteral = keyof Pick<
  IProjectStatusUpdate,
  | "escalationMetricStatus"
  | "agileMetricStatus"
  | "modernizationMetricStatus"
  | "staffingMetricStatus"
>;
