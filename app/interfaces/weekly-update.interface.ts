import { IKudos } from "./kudos.interface";
import { IProjectStatusUpdate } from "./project-status-update.interface";

export interface IWeeklyUpdate {
    kudos: IKudos[],
    dateOfUpdate: Date
    projectUpdates: IProjectStatusUpdate[],
    previousWeeklyUpdate?: IWeeklyUpdate
    nextWeeklyUpdate?: IWeeklyUpdate
}