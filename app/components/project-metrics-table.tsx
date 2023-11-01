'use client';
import { Box, Button as MantineButton, Table } from '@mantine/core';
import { Button } from 'primereact/button';
import { IProjectStatusUpdate } from '../interfaces/project-status-update.interface';
import { colorToHexCodeMap, weeklyUpdates } from '../constants';
import { useMemo } from 'react';
import { MRT_Cell, MRT_ColumnDef, MRT_Row, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { IMetricStatusLiteral } from '../interfaces/metric-status.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { IconDownload } from '@tabler/icons-react';
import { healthSortingFunction } from '../utils/health-sorting-function';
import { IWeeklyUpdate } from '../interfaces/weekly-update.interface';
import { IProgramData } from '../interfaces/program-data.interface';
import { dashboardData } from '../dashboard_data';
import { useRouter } from 'next/navigation';

const elements = weeklyUpdates[0].projectUpdates;

const healthColumnOptions: Partial<MRT_ColumnDef<IProgramData>> = {
    maxSize: 50,
    enableColumnActions: false,
    enableColumnDragging: false,
    filterVariant: 'multi-select',
    mantineFilterMultiSelectProps: { data: ['Green', 'Yellow', 'Red'] },
    sortingFn: healthSortingFunction,
    Cell: ({ cell }: { cell: MRT_Cell<IProgramData> }) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'start', marginLeft: '15px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={colorToHexCodeMap[cell.getValue<string>() as IMetricStatusLiteral]}>
                    <circle cx="8" cy="8" r="8" />
                    {/* <path fill="#ffffff" d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/> */}
                </svg>
            </div>
        );
    }
};

export const ProjectMetricsTable: React.FC<{
    weeklyUpdate: IWeeklyUpdate;
}> = ({ weeklyUpdate }) => {
    const data = useMemo(() => dashboardData, [dashboardData]);
    const router = useRouter()

    const columns = useMemo<MRT_ColumnDef<IProgramData>[]>(
        () => [
            {
                accessorKey: 'programName',
                header: 'Program Name',
                Cell: ({ cell }: { cell: MRT_Cell<IProgramData> }) => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <Button size="small" link onClick={() => router.push(`/program/${cell.getValue<string>()}`)}>
                                {cell.getValue<string>()}
                            </Button>
                        </div>
                    );
                },
                filterVariant: 'autocomplete'
            },
            {
                accessorKey: 'size',
                header: 'Program Size',
                filterVariant: 'range',
                maxSize: 50,
            },
            {
                ...healthColumnOptions,
                Cell: ({ cell }: { cell: MRT_Cell<IProgramData> }) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={colorToHexCodeMap[cell.getValue<string>() as IMetricStatusLiteral]}>
                                <circle cx="8" cy="8" r="8" />
                            </svg>
                        </div>
                    );
                },
                accessorKey: 'overallHealth',
                header: 'Overall Health'
            },
            {
                ...healthColumnOptions,
                accessorKey: 'Schedule',
                header: 'Schedule'
            },
            {
                ...healthColumnOptions,
                accessorKey: 'Cost',
                header: 'Cost'
            },
            {
                ...healthColumnOptions,
                accessorKey: 'Resource',
                header: 'Resource'
            },
            // {
            //   ...healthColumnOptions,
            //   accessorKey: "modernizationMetricStatus",
            //   header: "Tech",
            // },
            {
                ...healthColumnOptions,
                accessorKey: 'Risk',
                header: 'Risk'
            },
            {
                accessorKey: 'Comment',
                header: 'Comment'
            }
            // {
            //     accessorKey: 'dateOfLastMetricStatusUpdate',
            //     header: 'Last Updated',
            //     enableSorting: false,
            //     enableColumnActions: false,
            //     Cell: ({ cell }) => cell.getValue<Date>().toDateString()
            // },
            // {
            //     accessorKey: 'programName',
            //     header: 'Program'
            // },
            // {
            //     accessorKey: 'contact',
            //     header: 'Primary Contact',
            //     enableSorting: false,
            //     enableColumnActions: false,
            //     enableClickToCopy: true,
            //     Cell: ({ cell }) => (
            //         // <a href={`mailto:${cell.getValue<string>()}`}>
            //         <>{cell.getValue<string>()}</>
            //         // </a>
            //     )
            // }
        ],
        []
    );

    const table = useMantineReactTable<IProgramData>({
        columns,
        data,
        initialState: {
            columnVisibility: {
                projectId: false
            },
            sorting: [
                {
                    id: 'size',
                    desc: true
                }
            ],
            density: 'xs'
        },
        enableRowSelection: true, //enable some features
        enableGlobalFilter: false, //turn off a feature
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap'
                }}
            >
                <h2 style={{ marginTop: 0, marginBottom: 0 }}>Program Metrics</h2>
                <MantineButton
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                    leftIcon={<IconDownload />}
                    variant="filled"
                    style={{ display: 'flex', marginLeft: 'auto' }}
                >
                    Export All Rows
                </MantineButton>
                <MantineButton
                    disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                    //only export selected rows
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    leftIcon={<IconDownload />}
                    variant="filled"
                >
                    Export Selected Rows
                </MantineButton>
            </Box>
        )
    });

    /** This needs a refactor before going into the non-mockup stage
     * Right now the order of rendering is determined by Object.values, but we may need to
     * specify it manually because the keys aren't always guarnated. One of them is optional
     */
    const handleExportRows = (rows: MRT_Row<IProgramData>[]) => {
        const doc = new jsPDF();

        let pdfRowData;
        let program;
        const tableData = rows.map((row) => {
            pdfRowData = { ...row.original };
            //@ts-ignore
            delete pdfRowData.projectId;

            program = pdfRowData.programName;
            //@ts-ignore
            delete pdfRowData.programName;
            // delete pdfRowData.projectUpdateNotes;
            //@ts-ignore
            delete pdfRowData.contact;
            pdfRowData.programName = program;

            //@ts-ignore
            pdfRowData.dateOfLastMetricStatusUpdate = pdfRowData.dateOfLastMetricStatusUpdate.toDateString();
            return Object.values(pdfRowData);
        });

        const newHeader = [...columns];
        newHeader.shift();
        const tableHeaders = newHeader.map((c) => c.header);

        autoTable(doc, {
            head: [tableHeaders],
            //@ts-ignore
            body: tableData
        });

        doc.save('exec-dashboard-metrics.pdf');
    };

    return (
        // <MantineReactTable table={table} initialState={{ columnVisibility: { projectId: false } }} />
        <div style={{ marginBottom: '5rem' }}>
            <MantineReactTable table={table} />
        </div>
    );
};
