const RADIAN = Math.PI / 180;

//@ts-ignore
export const customizedPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, index }) => {
    const labelRadius = innerRadius + (outerRadius - innerRadius) * 1.3 * (index > 10 ? (midAngle > 360 ? Math.pow(index / 10, 1.5) : 1) : 1);

    const midX = cx + outerRadius * Math.cos(-midAngle * RADIAN)
    const midY = cy + outerRadius * Math.sin(-midAngle * RADIAN)

    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    return (
        <>
            <line x1={midX} y1={midY} x2={x} y2={y} stroke="#3d3d3d" />
            <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={index > 10 ? 10 : 14}>
                {name}
            </text>
        </>
    );
};
