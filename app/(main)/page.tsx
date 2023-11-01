/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/service/ProductService';
import { LayoutContext } from '../../layout/context/layoutcontext';
import Link from 'next/link';
import { Demo } from '../../types/types';
import { ChartData, ChartOptions } from 'chart.js';
import RadialMetricsTable from '../components/radial-metrics-breakdown';
import { weeklyUpdates } from '../constants';
import { ProgramPieSummary } from '../components/program-pie-summary';
import { BarGraphBreakdown } from '../components/bar-graph-breakdown';
import { ProjectMetricsTable } from '../components/project-metrics-table';
import { KudosAndUpdates } from '../components/kudos-and-updates';
import { OverlayPanel } from 'primereact/overlaypanel';

const lineData: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

const Dashboard = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    const menu1 = useRef<Menu>(null);
    const menu2 = useRef<Menu>(null);
    const [staffDetailsVisible, setStaffDetailsVisible] = useState(false);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const dashboardData = {
        totalAcceptedOffers: 375,
        billableEmployees: 366,
        employeesYetToOnboard: 9,
        openPositions: 29
    };

    const applyLightTheme = () => {
        const lineOptions: ChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const op = useRef(null);

    return (
        <div className="grid">
            <div className="col-12 lg:col-6">
                <div className="grid">
                    <div className="col-12 lg:col-4">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total Number of Programs</span>
                                    <div className="text-900 font-medium text-xl">13</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    {/* <i className="pi pi-shopping-cart text-blue-500 text-xl" /> */}
                                </div>
                            </div>
                            {/* <span className="text-green-500 font-medium">24 new </span>
                            <span className="text-500">since last visit</span> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total Number of Resources</span>
                                    <div className="text-900 font-medium text-xl">{dashboardData.totalAcceptedOffers + dashboardData.openPositions}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    {/* @ts-ignore */}
                                    <Button icon="pi pi-info-circle" severity="info" aria-label="Notification" style={{ width: '2.5rem', height: '2.5rem' }} onClick={(e) => op?.current?.toggle?.(e)} />
                                    <OverlayPanel ref={op}>
                                        Grand Total: {dashboardData.totalAcceptedOffers + dashboardData.openPositions}
                                        <ul>
                                            <li>Total Accepted Offers: {dashboardData.totalAcceptedOffers}</li>
                                            <li>Billable Employees: {dashboardData.billableEmployees}</li>
                                            <li>Employees yet to onboard: {dashboardData.employeesYetToOnboard}</li>
                                            <li>Open positions: {dashboardData.openPositions}</li>
                                        </ul>
                                    </OverlayPanel>
                                </div>
                            </div>
                            {/* <span className="text-green-500 font-medium">%52+ </span>
                            <span className="text-500">since last week</span> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Open Positions</span>
                                    <div className="text-900 font-medium text-xl">{dashboardData.openPositions}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    {/* <i className="pi pi-inbox text-cyan-500 text-xl" /> */}
                                </div>
                            </div>
                            {/* <span className="text-green-500 font-medium">520 </span>
                            <span className="text-500">newly registered</span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="grid">
                    <div className="col-12 lg:col-4">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Programs in Risk</span>
                                    <div className="text-900 font-medium text-xl">2</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    {/* <i className="pi pi-shopping-cart text-blue-500 text-xl" /> */}
                                </div>
                            </div>
                            {/* <span className="text-green-500 font-medium">24 new </span>
                            <span className="text-500">since last visit</span> */}
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Blank</span>
                                    <div className="text-900 font-medium text-xl">blank</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    {/* <i className="pi pi-map-marker text-orange-500 text-xl" /> */}
                                </div>
                            </div>
                            {/* <span className="text-green-500 font-medium">%52+ </span>
                            <span className="text-500">since last week</span> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card flex flex-column align-items-center">
                    <h5 className="text-left w-full">Program Status Breakdown</h5>
                    <ProgramPieSummary weeklyUpdate={weeklyUpdates[0]} />
                    {/* <RadialMetricsTable weeklyUpdate={weeklyUpdates[0]} /> */}
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card h-100">
                    <h5>Program Highlights</h5>
                    <KudosAndUpdates weeklyUpdate={weeklyUpdates[0]} type='positive' />
                    <h5>Hot Topics</h5>
                    <KudosAndUpdates weeklyUpdate={weeklyUpdates[0]} type='alert' />
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <ProjectMetricsTable weeklyUpdate={weeklyUpdates[0]} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
