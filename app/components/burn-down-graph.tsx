"use client"
import React from 'react';
import { greenHexCode, projectStatusOverTime, redHexCode, yellowHexCode } from '../constants';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { dateFormat } from '../utils/date-format';
import { Card } from '@mantine/core';
import { IProjectStatusOverTime } from '../interfaces/project-status-over-time.interface';
import { IBurnDown } from '../interfaces/burn-down.interface';

const ProjectHealthToolTip = (props: any) => {
    const { active, payload } = props;
    const data: IBurnDown = payload?.[0]?.payload;

    if (active && data) {
        // const currData = payload && payload.length ? payload[0].payload : null;
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <span>{dateFormat(data.dateOfUpdate)}</span>
                <p>Actual Remaining: ${data.actualRemainingBudget}</p>
                <p>Anticipated Remaining: ${data.anticipatedRemainingBudget}</p>
                {/* <p style={{ color: greenHexCode }}>actualRemaningBudget: {data.Green}</p>
                <p style={{ color: yellowHexCode }}>Yellow: {data.Yellow} </p>
                <p style={{ color: redHexCode }}>Red:{data.Red} </p> */}
                {/* --- */}
            </Card>
        );
    }
    return null;
};

export const BurnDownGraph = () => {
    const burndownGraph: IBurnDown[] = [
        {
            dateOfUpdate: +new Date('08-01-2023'),
            actualRemainingBudget: 10000,
            anticipatedRemainingBudget: 10000
        },
        {
            dateOfUpdate: +new Date('09-01-2023'),
            actualRemainingBudget: 8500,
            anticipatedRemainingBudget: 9000
        },
        {
            dateOfUpdate: +new Date('10-01-2023'),
            actualRemainingBudget: 7000,
            anticipatedRemainingBudget: 8000
        }
    ];

    // const healthOverTime = projectStatusOverTime;

    const start = +new Date() - 1000 * 60 * 60 * 24 * 120;
    const end = +new Date() + 1000 * 60 * 60 * 24 * 7;

    const domain: number[] = [start, end]; // TODO: COnvert to prop

    return (
        <>
            {/* <h2>Budget Burndown Details</h2> */}
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={burndownGraph} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateOfUpdate" scale="time" tickFormatter={dateFormat} type="number" domain={domain} />
                    <YAxis />
                    <Tooltip content={<ProjectHealthToolTip />} />
                    <Legend  />
                    <Line name="Actual Remaining Budget" type="monotone" dataKey="actualRemainingBudget" stroke='#3d3d3d'/>
                    <Line name="Anticipated Remaining Budget" type="monotone" dataKey="anticipatedRemainingBudget" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};
