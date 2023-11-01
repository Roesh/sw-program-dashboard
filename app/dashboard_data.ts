//@ts-nocheck
import { IProgramData } from "./interfaces/program-data.interface";

export const dashboardData: IProgramData[] = [
    {
        programName: 'Gold Widow',
        size: 100,
        overallHealth: 'Green',
        Schedule: 'Green',
        Cost: 'Green',
        Resource: 'Green',
        Risk: 'Green',
        Comment: 'Projects are on track',
        Risks: 'None',
        Achievements: 'None',
        burndownData: [
            { dateOfUpdate: +new Date('2023-10-01'), actualRemainingBudget: 10000, anticipatedRemainingBudget: 10000 },
            {
                dateOfUpdate: +new Date('2023-09-01'),
                actualRemainingBudget: 10000,
                anticipatedRemainingBudget: 10000
            }
        ],
        staffingData: [
            {
                dateOfUpdate: +new Date('2023-10-01'),
                totalAcceptedOffers: 5,
                billableEmployees: 4,
                employeesYetToOnboard: 1,
                openPositions: 1,
                grandTotal: 6
            }
        ]
    },
];