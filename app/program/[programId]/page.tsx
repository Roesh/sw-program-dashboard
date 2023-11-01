'use client';
import { OverlayPanel } from 'primereact/overlaypanel';
import { BurnDownGraph } from '../../components/burn-down-graph';
import { ProjectMetricsTable } from '../../components/project-metrics-table';
import { StaffingGraph } from '../../components/staffing-graph';
import { Button } from 'primereact/button';
import { programIdToName, weeklyUpdates } from '../../constants';
import { dashboardData } from '../../dashboard_data';
import { useRef } from 'react';
import { encode } from 'punycode';
import { Textarea } from '@mantine/core';

export default function Page({ params }: { params: { programId: string } }) {
    const data = dashboardData.find((program) => encodeURI(program.programName) === params.programId);
    const tempStaffingArray = [...(data?.staffingData ?? [])];
    tempStaffingArray.sort((a, b) => b.dateOfUpdate - a.dateOfUpdate);
    const latestStaffingData = tempStaffingArray[0];
    const op = useRef(null);

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        {/* @ts-ignore */}
                        <h2 className="text-900 font-medium text-xxl">{data?.programName}</h2>
                        <span className="text-green-500 font-large text-xl">Green</span>
                    </div>
                    <span className="block text-500 font-medium mb-3">Overview:</span>
                    <div className="flex">
                        {/* TODO: Update metrics w */}
                        {/* <h4 className="mt-0 mr-5">Staff: {data?.staffingData} </h4> */}
                        {/* <h4 className="mt-0 mr-5">Projects: {data?.} </h4>
                        <h4 className="mt-0 mr-5">Budget: 100 </h4> */}
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total Number of Resources</span>
                            <div className="text-900 font-medium text-xl">{latestStaffingData?.grandTotal}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            {/* @ts-ignore */}
                            <Button icon="pi pi-info-circle" severity="info" aria-label="Notification" style={{ width: '2.5rem', height: '2.5rem' }} onClick={(e) => op?.current?.toggle?.(e)} />
                            <OverlayPanel ref={op}>
                                Grand Total: {latestStaffingData?.grandTotal}
                                <ul>
                                    <li>Total Accepted Offers: {latestStaffingData?.totalAcceptedOffers}</li>
                                    <li>Billable Employees: {latestStaffingData?.billableEmployees}</li>
                                    <li>Employees yet to onboard: {latestStaffingData?.employeesYetToOnboard}</li>
                                    <li>Open positions: {latestStaffingData?.openPositions}</li>
                                </ul>
                            </OverlayPanel>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">%52+ </span>
                            <span className="text-500">since last week</span> */}
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Open Positions</span>
                            <div className="text-900 font-medium text-xl">{latestStaffingData?.openPositions}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            {/* <i className="pi pi-inbox text-cyan-500 text-xl" /> */}
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">520 </span>
                            <span className="text-500">newly registered</span> */}
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="card mb-0">
                    <h3>Details of Staffing</h3>
                    <StaffingGraph staffingData={data?.staffingData ?? []} />
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="card mb-0">
                    <h3>Details of Burndown</h3>
                    <BurnDownGraph />
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="card mb-0 h-100">
                    <h3>Risks</h3>
                    <Textarea styles={{input: {border: 'none'}}} size="xl" autosize value={data?.Risks}></Textarea>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="card mb-0">
                    <h3>Achievements</h3>
                    <Textarea styles={{input: {border: 'none'}}} size="xl" autosize value={data?.Achievements}></Textarea>
                </div>
            </div>
            <div className="col-12">
                <div className="card mb-0">
                    <h3>Agile Metrics</h3>
                    <img src={`/files/${data?.programName}_Agile.jpeg`} width="100%" />
                    {/* <ProjectMetricsTable weeklyUpdate={weeklyUpdates[0]} /> */}
                </div>
            </div>
        </div>
    );
}
