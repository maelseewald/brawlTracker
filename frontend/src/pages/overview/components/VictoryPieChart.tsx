import type { PlayerDTO } from '../../../../generated';
import type { PieLabelRenderProps } from 'recharts';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

type Props = {
    playerData: readonly PlayerDTO[];
};

const COLORS = ['#1d6fea', '#0ea5e9', '#38bdf8'];
const RADIAN = Math.PI / 180;

const renderCustomLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (
        cx === undefined || cy === undefined || midAngle === undefined ||
        innerRadius === undefined || outerRadius === undefined || percent === undefined
    ) return null;

    const ir = typeof innerRadius === 'number' ? innerRadius : 0;
    const or = typeof outerRadius === 'number' ? outerRadius : 0;
    const angle = typeof midAngle === 'number' ? midAngle : 0;
    const cxn = typeof cx === 'number' ? cx : 0;
    const cyn = typeof cy === 'number' ? cy : 0;

    const radius = ir + (or - ir) * 0.55;
    const x = cxn + radius * Math.cos(-angle * RADIAN);
    const y = cyn + radius * Math.sin(-angle * RADIAN);

    if ((percent as number) < 0.04) return null;
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
            {`${((percent as number) * 100).toFixed(0)}%`}
        </text>
    );
};

type TooltipProps = {
    active?: boolean;
    payload?: readonly { name: string; value: number }[];
    total: number;
};

function CustomTooltip({ active, payload, total }: TooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-bg-elevated border border-border-normal rounded-lg px-3 py-2 shadow-lg text-sm pointer-events-none">
            <p className="font-semibold text-text-primary">{payload[0].name}</p>
            <p className="text-text-secondary">{payload[0].value.toLocaleString()} wins</p>
            <p className="text-text-muted">{((payload[0].value / total) * 100).toFixed(1)}%</p>
        </div>
    );
}

function VictoryPieChart({ playerData }: Props) {
    if (!playerData.length) return null;

    const latest = playerData.reduce((a, b) =>
        new Date(a.createdAt ?? 0) > new Date(b.createdAt ?? 0) ? a : b
    );

    const solo = latest.soloVictories ?? 0;
    const duo = latest.duoVictories ?? 0;
    const trio = latest.threeVsThreeVictories ?? 0;
    const total = solo + duo + trio;

    if (total === 0) {
        return (
            <div className="flex items-center justify-center h-full text-text-muted text-sm">
                No victory data available
            </div>
        );
    }

    const data = [
        { name: 'Solo', value: solo },
        { name: 'Duo', value: duo },
        { name: '3v3', value: trio },
    ].filter(d => d.value > 0);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-base font-semibold text-text-primary">Victory Distribution</span>
                <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full border border-border-dim">
                    {total.toLocaleString()} total
                </span>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart tabIndex={-1}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius="78%"
                            innerRadius="42%"
                            dataKey="value"
                            labelLine={false}
                            label={renderCustomLabel}
                            animationBegin={0}
                            animationDuration={800}
                            tabIndex={-1}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    stroke="rgba(4,11,20,0.6)"
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={(props) => <CustomTooltip {...props} total={total} />} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => (
                                <span style={{ color: '#8baad4', fontSize: 12 }}>{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default VictoryPieChart;
