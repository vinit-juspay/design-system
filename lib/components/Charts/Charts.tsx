import React, { useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

import { ChartType, ChartProps, formatNumber, NestedDataPoint } from './utils';
import { CustomTooltip } from './ChartTooltip';
import { ChartHeader } from './ChartHeader';
import { ChartLegends } from './ChartLegends';

const transformData = (data: NestedDataPoint[], keys: string[]): any[] => {
    return data.map(point => {
        const transformed: any = { name: point.name };

        keys.forEach(key => {
            const nestedData = point[key];
            if (nestedData && nestedData.primary && nestedData.primary.val !== undefined) {
                transformed[key] = nestedData.primary.val;
            }
        });

        return transformed;
    });
};

export const Chart: React.FC<ChartProps> = ({
    type,
    data,
    width = '100%',
    height = 400,
    colors = ['#2B7FFF', '#00D492', '#C27AFF', '#FB2C36', '#0088FE'],
    xAxisLabel,
    yAxisLabel,
    metrics = [],
    slot1,
    slot2,
    slot3
}) => {
    const keys =
        (data && data.length > 0
            ? Object.keys(data[0]).filter(key =>
                key !== 'name' &&
                typeof data[0][key] === 'object' &&
                data[0][key] !== null &&
                data[0][key].primary !== undefined)
            : []);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [selectedMetric, setSelectedMetric] = useState<string>(metrics.length > 0 ? metrics[0] : '');
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [hoveredXValue, setHoveredXValue] = useState<string | null>(null);

    const transformedData = transformData(data, keys);

    const activeKeys = selectedKeys.length > 0 ? selectedKeys : null;

    const handleLegendClick = (dataKey: string) => {
        setSelectedKeys(prevSelected => {
            if (prevSelected.includes(dataKey)) {
                return prevSelected.filter(key => key !== dataKey);
            } else {
                return [...prevSelected, dataKey];
            }
        });
    };

    const handleMetricChange = (metric: string) => {
        setSelectedMetric(metric);
    };

    const renderChart = () => {
        switch (type) {
            case ChartType.LINE:
                return (
                    <LineChart
                        data={transformedData}
                        margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}
                        onMouseLeave={() => setHoveredKey(null)}
                    >
                        <CartesianGrid vertical={false} stroke="#ECEFF3" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#99A0AE', fontSize: 14, fontWeight: 500 }}
                            dy={10}
                            label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 15, fill: '#99A0AE', fontSize: 14, fontWeight: 500 } : undefined}
                        />
                        <YAxis
                            width={50}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => formatNumber(value)}
                            tick={{ fill: '#99A0AE', fontSize: 14, fontWeight: 500 }}
                            label={yAxisLabel ? {
                                value: yAxisLabel,
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle' },
                                offset: -15,
                                fill: '#99A0AE',
                                fontSize: 14,
                                fontWeight: 500,
                            } : undefined}
                        />
                        <Tooltip content={(props) => CustomTooltip({ ...props, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type })} />
                        {keys.map((dataKey, index) => (
                            <Line
                                key={dataKey}
                                type="linear"
                                dataKey={dataKey}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: hoveredKey === dataKey ? 4 : 0 }}
                                opacity={
                                    hoveredKey ? (hoveredKey === dataKey ? 1 : 0.3) :
                                        (activeKeys && !activeKeys.includes(dataKey) ? 0.3 : 1)
                                }
                                onMouseOver={() => setHoveredKey(dataKey)}
                            />
                        ))}
                    </LineChart>
                );
            case ChartType.BAR:
                return (
                    <BarChart
                        data={transformedData}
                        margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}
                        onMouseMove={(e) => {
                            if (e.activeLabel) {
                                setHoveredXValue(e.activeLabel.toString());
                            }
                        }}
                        onMouseLeave={() => {
                            setHoveredKey(null);
                            setHoveredXValue(null);
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="#ECEFF3" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#99A0AE', fontSize: 14, fontWeight: 500 }}
                            dy={10}
                            label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 15, fill: '#99A0AE', fontSize: 14, fontWeight: 500 } : undefined}
                        />
                        <YAxis
                            width={50}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => formatNumber(value)}
                            tick={{ fill: '#99A0AE', fontSize: 14, fontWeight: 500 }}
                            label={yAxisLabel ? {
                                value: yAxisLabel,
                                angle: -90,
                                position: 'insideLeft',
                                style: { textAnchor: 'middle' },
                                offset: -15,
                                fill: '#99A0AE',
                                fontSize: 14,
                                fontWeight: 500
                            } : undefined}
                        />
                        <Tooltip offset={0} cursor={false} content={(props) => CustomTooltip({ ...props, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type })}/>
                        {keys.map((dataKey, index) => (
                            <Bar
                                key={dataKey}
                                dataKey={dataKey}
                                fill={colors[index % colors.length]}
                                opacity={activeKeys && !activeKeys.includes(dataKey) ? 0.3 : 1}
                                onMouseOver={() => setHoveredKey(dataKey)}
                            />
                        ))}
                    </BarChart>
                );
            case ChartType.PIE:
                // Create pie data from the transformed data
                const pieData = [];
                for (const point of data) {
                    for (const key of keys) {
                        if (point[key] && point[key].primary) {
                            pieData.push({
                                name: `${key} (${point.name})`,
                                value: point[key].primary.val,
                                dataKey: key,
                                originalData: point[key]
                            });
                        }
                    }
                }

                return (
                    <PieChart margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                        <Tooltip active={true} content={({ active, payload }) => {
                            if (!active || !payload || payload.length === 0) return null;

                            const data = payload[0].payload;

                            return (
                                <div className="bg-gray-0 shadow-lg flex flex-col gap-3 rounded-lg p-3 pl-2.5 border border-gray-150 w-[260px]">
                                    <div className='pl-2 relative'>
                                        <div
                                            className='absolute top-0.5 left-0 w-1 h-4 rounded-full'
                                            style={{ backgroundColor: payload[0].color }}
                                        ></div>
                                        <div className='flex flex-col'>
                                            <h3 className='text-body-md font-600 text-gray-900'>{data.dataKey}</h3>
                                            <label className='font-500 text-body-xs text-gray-400'>{data.name.split(' ')[1].replace(/[()]/g, '')}</label>
                                        </div>
                                    </div>

                                    <div className='pl-2 flex flex-col'>
                                        <label className='text-body-sm font-500 text-gray-400'>{data.originalData.primary.name}</label>
                                        <h3 className='text-sm font-600 text-gray-900'>
                                            {typeof data.value === 'number' ? formatNumber(data.value) : data.value}
                                        </h3>
                                    </div>

                                    {data.originalData.aux && data.originalData.aux.length > 0 && (
                                        <div className='flex flex-col gap-1 pt-3 pl-2 border-t border-gray-150'>
                                            {data.originalData.aux.map((auxItem: any, index: number) => (
                                                <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
                                                    <span className="text-body-xs text-gray-400 truncate">{auxItem.name}</span>
                                                    <span className="text-body-sm font-600 text-gray-700">
                                                        {typeof auxItem.val === 'number' ? formatNumber(auxItem.val) : auxItem.val}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }} />
                        <Tooltip content={(props) => CustomTooltip({ ...props, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type })}/>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            innerRadius={100}
                            paddingAngle={5}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieData.map((entry, index) => {
                                const keyIndex = keys.indexOf(entry.dataKey);
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[keyIndex % colors.length]}
                                        opacity={activeKeys && !activeKeys.includes(entry.dataKey) ? 0.3 : 1}
                                    />
                                );
                            })}
                        </Pie>
                    </PieChart>
                );
            default:
                return <div>Unsupported chart type</div>;
        }
    };

    return (
        <div className='w-full h-full outline outline-1 outline-gray-300 rounded-lg bg-white'>
            <ChartHeader
                metrics={metrics}
                selectedMetric={selectedMetric}
                handleMetricChange={handleMetricChange}
                slot1={slot1}
                slot2={slot2}
                slot3={slot3}
            />
            <div className='py-5 px-4 flex flex-col gap-6'>
                <ChartLegends
                    keys={keys}
                    activeKeys={activeKeys}
                    handleLegendClick={handleLegendClick}
                    colors={colors}
                    type={type}
                    setSelectedKeys={setSelectedKeys}
                />
                <div>
                    <ResponsiveContainer width={width} height={height}>
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};


export default Chart;