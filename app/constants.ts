import { data_09_01_2023 } from "./data_09_01_2023";
import { data_09_08_2023 } from "./data_09_08_2023";
import { data_09_15_2023 } from "./data_09_15_2023";
import { IMetricStatusLiteral } from "./interfaces/metric-status.interface";
import { IProjectStatusOverTime } from "./interfaces/project-status-over-time.interface";
import {
  IProjectStatusUpdate,
  ISubMetricsLiteral,
} from "./interfaces/project-status-update.interface";
import { IStatusCounts } from "./interfaces/status-counts.interface";
import { IWeeklyUpdate } from "./interfaces/weekly-update.interface";

// Colors:
export const redHexCode = "#D75553";
export const yellowHexCode = "#F68D4B";
export const yellowHexCodeText = "#F68D4B";
export const greenHexCode = "#5EBC58";
export const grayHexCode = "#D3D3D3";
export const grayTextHexCode = "#3D3D3D";

export const colorToHexCodeMap: { [key in IMetricStatusLiteral]: string } = {
  Green: greenHexCode,
  Yellow: yellowHexCode,
  Red: redHexCode,
};

export const metricToSortLevelMap: { [key in IMetricStatusLiteral]: number } = {
  Green: 30,
  Yellow: 20,
  Red: 10,
};

export const programIdToName = {
  pgm_gwidow: 'Gold Widow Program',
};

export const metricKeyToDisplayNameMap: {
  [key in ISubMetricsLiteral]: string;
} = {
  agileMetricStatus: "Agile",
  escalationMetricStatus: "Risk",
  modernizationMetricStatus: "Tech",
  staffingMetricStatus: "Staff",
};

const oneWeekAgo = new Date(+new Date() - 1000 * 60 * 60 * 24 * 7);

// TODO: Replace testproject timeline raw with following:
// This is the main piece of app data
export const weeklyUpdates: IWeeklyUpdate[] = [
  {
    dateOfUpdate: new Date('2023/09/01'),
    kudos: [{
      kudosTitle: "Success Story - Gold Widow",
      kudosText: `Gold Widow Update successful`
    }],
    projectUpdates: data_09_01_2023,
  },
  {
    dateOfUpdate: new Date('2023/09/08'),
    kudos: [],
    projectUpdates: data_09_08_2023,
  },
  {
    dateOfUpdate: new Date('2023/09/15'),
    kudos: [],
    projectUpdates: data_09_15_2023,
  },
];
weeklyUpdates.forEach((update, index) => {
  if (index === 0 && weeklyUpdates.length > 1) {
    update.nextWeeklyUpdate = weeklyUpdates[1]
    return
  }

  if (index === weeklyUpdates.length - 1 && weeklyUpdates.length > 1) {
    update.previousWeeklyUpdate = weeklyUpdates[index - 1]
    return
  }

  update.nextWeeklyUpdate = weeklyUpdates[index + 1]
  update.previousWeeklyUpdate = weeklyUpdates[index - 1]

})

const defaultCounts: IStatusCounts = {
  Green: 0,
  Yellow: 0,
  Red: 0,
  total: 0,
};

export const projectStatusOverTime: IProjectStatusOverTime[] =
  weeklyUpdates.map((rawData) => ({
    dateOfUpdate: +rawData.dateOfUpdate,
    ...rawData.projectUpdates.reduce<IStatusCounts>(
      (prev, current) => {
        prev[current.overallStatus]++;
        prev.total++;

        return prev;
      },
      { ...defaultCounts }
    ),
  }));
