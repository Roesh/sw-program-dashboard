import { Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { IWeeklyUpdate } from '../interfaces/weekly-update.interface';
import { IMetricStatusLiteral } from '../interfaces/metric-status.interface';
import { colorToHexCodeMap, programIdToName } from '../constants';
import { Card } from 'primereact/card';
import { customizedPieLabel } from './customizedPieLabel';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { renderActiveShape } from './customizedActivePieLabel';
import { useState } from 'react';
import { IProgramData } from '../interfaces/program-data.interface';
import { dashboardData } from '../dashboard_data';

interface IPieSummary {
    /** 0 - 100 */
    percentTotal: number;
    status: IMetricStatusLiteral;
    programName: string;
    programId: string;
}

// TODO: Add this; app/(main)/layout.tsx
export const ProgramPieSummary: React.FC<{
    weeklyUpdate: IWeeklyUpdate;
}> = ({ weeklyUpdate }) => {
    const router = useRouter();

    const tempData = [...dashboardData]
    tempData.sort((a,b) => b.size - a.size)
    const data: IProgramData[] = tempData.filter((data, index) => index < 13)

    const [activeIndex, setActiveIndex] = useState<number>();
    const [insidePie, setInsidePie] = useState<boolean>(false);

    return (
        <PieChart width={800} height={400} style={{ cursor: 'pointer' }}>
            {/* <Legend layout="vertical" verticalAlign="middle" align="right" /> */}
            <Pie
                data={data}
                dataKey="size"
                nameKey="programName"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={50}
                label={!insidePie ? customizedPieLabel : () => null}
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => {
                    setInsidePie(true)
                    setActiveIndex(index)
                }}
                onMouseLeave={() => {setInsidePie(false); setActiveIndex(undefined)}}
                activeShape={renderActiveShape}
                labelLine={false}
                onClick={(evt: IProgramData) => {
                    router.push(`/program/${evt.programName}`);
                }}
                startAngle={90}
                endAngle={90 + 360}
            >
                {data.map((summary, index) => (
                    <Cell key={`cell-${index}`} fill={colorToHexCodeMap[summary.overallHealth]} />
                ))}
            </Pie>
        </PieChart>
    );
};

const programNameToIdMap = {
    'CON-IT': 'pgm_con_it'
};
