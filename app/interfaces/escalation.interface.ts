export interface IEscalation {
    escalationId: string,
    escalationDescription: string,
    reportingUserId: string,

    escalationResolved: boolean
    riskSeverity: number
    riskImpact: number
}

export interface IEscalationDisplay extends IEscalation {
    reportingUserName: string

}