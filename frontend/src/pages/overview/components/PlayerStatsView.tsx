import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { StatItem } from './PlayerDataContainer';
import { useState } from 'react';
import { LineChartIcon, BarChartIcon } from './icons';

type Props = {
  items: StatItem[];
  lineLabel: string;
  color?: string;
};

type ChartType = 'line' | 'bar';

type TooltipProps = {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-border-normal rounded-xl px-4 py-3 shadow-xl pointer-events-none">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-lg font-bold text-text-primary">{payload[0].value.toLocaleString()}</p>
      <p className="text-xs text-text-secondary">{payload[0].name}</p>
    </div>
  );
}

function PlayerStatsView({ items, lineLabel, color = '#1d6fea' }: Props) {
  const [chartType, setChartType] = useState<ChartType>('line');

  const data = items
    .filter((x) => x.createdAt)
    .slice()
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((x) => ({
      time: new Date(x.createdAt).toLocaleDateString('de-CH', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: x.value,
    }));

  const values = data.map(d => d.value);
  const minVal = values.length ? Math.min(...values) : 0;
  const maxVal = values.length ? Math.max(...values) : 0;
  const avg = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  const axisMin = Math.max(0, minVal - Math.round((maxVal - minVal) * 0.15));

  const commonProps = {
    data,
    margin: { top: 8, right: 16, left: 0, bottom: 8 },
  };

  const sharedElements = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,138,245,0.07)" vertical={false} />
      <XAxis
        dataKey="time"
        tick={{ fill: '#4a6b94', fontSize: 10 }}
        axisLine={{ stroke: 'rgba(59,138,245,0.1)' }}
        tickLine={false}
        interval="preserveStartEnd"
      />
      <YAxis
        domain={[axisMin, 'auto']}
        tick={{ fill: '#4a6b94', fontSize: 10 }}
        axisLine={false}
        tickLine={false}
        tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
        width={46}
      />
      <Tooltip
        content={<CustomTooltip />}
        cursor={chartType === 'line'
          ? { stroke: 'rgba(59,138,245,0.2)', strokeWidth: 1 }
          : { fill: 'rgba(59,138,245,0.05)' }
        }
      />
      {avg > 0 && (
        <ReferenceLine
          y={avg}
          stroke="rgba(59,138,245,0.3)"
          strokeDasharray="6 3"
          label={{ value: 'avg', position: 'insideTopRight', fill: '#4a6b94', fontSize: 10 }}
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Header: stats + chart toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-text-muted">
          {values.length > 0 && (
            <>
              <span>Min: <span className="text-text-secondary font-medium">{minVal.toLocaleString()}</span></span>
              <span>Max: <span className="text-text-secondary font-medium">{maxVal.toLocaleString()}</span></span>
              <span>Avg: <span className="text-text-secondary font-medium">{avg.toLocaleString()}</span></span>
            </>
          )}
        </div>

        {/* Toggle buttons */}
        <div className="flex gap-1 bg-bg-base rounded-lg p-1 border border-border-dim">
          <button
            id="chart-type-line"
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${chartType === 'line'
                ? 'bg-blue-primary text-white shadow'
                : 'text-text-muted hover:text-text-secondary'
              }`}
          >
            <LineChartIcon size={13} />
            Line
          </button>
          <button
            id="chart-type-bar"
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer ${chartType === 'bar'
                ? 'bg-blue-primary text-white shadow'
                : 'text-text-muted hover:text-text-secondary'
              }`}
          >
            <BarChartIcon size={13} />
            Bar
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart {...commonProps}>
                {sharedElements}
                <Line
                  type="monotone"
                  dataKey="value"
                  name={lineLabel}
                  stroke={color}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: color, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: color, stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
                  animationDuration={600}
                  tabIndex={-1}
                />
              </LineChart>
            ) : (
              <BarChart {...commonProps}>
                {sharedElements}
                <Bar
                  dataKey="value"
                  name={lineLabel}
                  fill={color}
                  radius={[4, 4, 0, 0]}
                  animationDuration={600}
                  fillOpacity={0.85}
                  tabIndex={-1}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default PlayerStatsView;
