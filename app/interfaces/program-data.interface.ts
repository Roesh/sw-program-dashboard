import { IBurnDown } from "./burn-down.interface";
import { IMetricStatusLiteral } from "./metric-status.interface";
import { IStaffingData } from "./staffing-graph.interface";

export interface IProgramData {
    programName: string,
    size: number,
    overallHealth: IMetricStatusLiteral,
    Schedule: IMetricStatusLiteral,
    Cost: IMetricStatusLiteral,
    Resource: IMetricStatusLiteral,
    Risk: IMetricStatusLiteral,
    Comment: string,
    Risks: string,
    Achievements: string,
    burndownData: IBurnDown[],
    staffingData: IStaffingData[]
}