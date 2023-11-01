"use client"
import React from 'react';
import { greenHexCode, projectStatusOverTime, redHexCode, yellowHexCode } from '../constants';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { dateFormat } from '../utils/date-format';
import { Card } from '@mantine/core';
import { IProjectStatusOverTime } from '../interfaces/project-status-over-time.interface';
import { IBurnDown } from '../interfaces/burn-down.interface';
import { IStaffingData } from '../interfaces/staffing-graph.interface';

const ProjectHealthToolTip = (props: any) => {
    const { active, payload } = props;
    const data: IStaffingData = payload?.[0]?.payload;

    if (active && data) {
        // const currData = payload && payload.length ? payload[0].payload : null;
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <span>{dateFormat(data.dateOfUpdate)}</span>
                <p>Total Positions: {data.grandTotal}</p>
                <p>---</p>
                <p>Total Accepted Offers: {data.totalAcceptedOffers}</p>
                <p>Open Positions: {data.openPositions}</p>
                <p>Billable Employees: {data.billableEmployees}</p>
                <p>Employees Yet To Onboard: {data.employeesYetToOnboard}</p>                
            </Card>
        );
    }
    return null;
};

export const StaffingGraph:React.FC<{staffingData: IStaffingData[]}> = ({staffingData}) => {

    const start = +new Date() - 1000 * 60 * 60 * 24 * 120;
    const end = +new Date() + 1000 * 60 * 60 * 24 * 7;

    const domain: number[] = [start, end]; // TODO: COnvert to prop

    return (
        <>
            {/* <h2>Budget Burndown Details</h2> */}
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={staffingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateOfUpdate" scale="time" tickFormatter={dateFormat} type="number" domain={domain} />
                    <YAxis />
                    <Tooltip content={<ProjectHealthToolTip />} />
                    <Legend  />
                    <Line name="Total Positions" type="monotone" dataKey="grandTotal"/>
                    <Line name="Open Positions" type="monotone" dataKey="openPositions"  stroke={yellowHexCode}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};
