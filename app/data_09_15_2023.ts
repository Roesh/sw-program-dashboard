import { IProjectStatusUpdate } from "./interfaces/project-status-update.interface";


export const data_09_15_2023: IProjectStatusUpdate[] = [
  {
    projectId: "1",
    projectName: "Gold Widow Site",
    programName: "Gold Widow Program",
    agileMetricStatus: "Green",
    staffingMetricStatus: "Green",
    modernizationMetricStatus: "Green",
    escalationMetricStatus: "Yellow",
    overallStatus: "Red",
    dateOfLastMetricStatusUpdate: new Date(),
    contact: "no-reply@goldwidow.io",
    projectUpdateNotes:
      "Gold Widow Website creation in progress",
  },
  {
    projectId: "2",
    projectName: "Aurum Path",
    programName: "Gold Widow",
    agileMetricStatus: "Green",
    staffingMetricStatus: "Green",
    modernizationMetricStatus: "Green",
    escalationMetricStatus: "Yellow",
    overallStatus: "Yellow",
    dateOfLastMetricStatusUpdate: new Date(),
    contact: "no-reply@usda.gov",
  },
  {
    projectId: "3",
    projectName: "Widow Hunt",
    programName: "Gold Widow",
    agileMetricStatus: "Green",
    staffingMetricStatus: "Green",
    modernizationMetricStatus: "Yellow",
    escalationMetricStatus: "Green",
    overallStatus: "Green",
    dateOfLastMetricStatusUpdate: new Date(),
    contact: "no-reply@usda.gov",
  },
];