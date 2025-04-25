import React, { useRef, useState } from 'react';
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


import { CustomTooltip } from './ChartTooltip';
import { ChartHeader } from './ChartHeader';
import { ChartLegends } from './ChartLegends';
import { ChartProps, ChartType, ChartLegendPosition } from './types';
import { capitaliseCamelCase, formatNumber, getKeys, transformData } from './utils';
import { getChartContainer, getChartContentContainer } from './themeUtils';

interface PieDataItem {
    name: string;
    value: number;
    dataKey: string;
    originalData: {
        primary: { val: number; name: string };
        aux?: Array<{ name: string; val: number | string }>;
    };
}

export const Chart: React.FC<ChartProps> = ({
    type,
    data,
    width = '100%',
    height = "100%",
    colors = ['#00C951', '#C27AFF', '#FB2C36', "#00D492", "#2B7FFF", "#AD46FF", "#FF8904"],
    xAxisLabel,
    yAxisLabel,
    metrics = [],
    slot1,
    slot2,
    slot3,
    legendPosition = ChartLegendPosition.TOP,
    chartHeaderSlot
}) => {
    const chartContainerRef = useRef<HTMLDivElement>(null!);
    const keys = getKeys(data);
    const isChartAnimating = useRef<boolean>(false);
    const [showingTruncatedData, setShowingTruncatedData] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [hoveredXValue, setHoveredXValue] = useState<string | null>(null);


    const transformedData = React.useMemo(() => {
        const rawTransformed = transformData(data, keys);

        if (!showingTruncatedData && !selectedKeys.length) {
            return rawTransformed;
        }

        return rawTransformed.map(item => {
            const filteredItem: any = { name: item.name };
            selectedKeys.forEach(key => {
                if (item[key]) {
                    filteredItem[key] = item[key];
                }
            });
            return filteredItem;
        });
    }, [data, keys, selectedKeys, showingTruncatedData]);

    const activeKeys = selectedKeys.length > 0 ? selectedKeys : null;

    const handleLegendClick = (dataKey: string) => {
        setShowingTruncatedData(true);
        setSelectedKeys(prevSelected => {
            if (prevSelected.includes(dataKey)) {
                const newSelected = prevSelected.filter(key => key !== dataKey);
                if (newSelected.length === 0) {
                    setShowingTruncatedData(false);
                }
                return newSelected;
            } else {
                return [...prevSelected, dataKey];
            }
        });
        setHoveredKey(null);
        // setHoveredXValue(null);
    };


    // const handleHover = (key: string | null) => {
    //     if (!showingTruncatedData) {
    //         setHoveredKey(key);
    //     }
    // };

    const getElementOpacity = (dataKey: string) => {
        if (showingTruncatedData) {
            return activeKeys?.includes(dataKey) ? 1 : 0.3;
        }
        return hoveredKey ? (hoveredKey === dataKey ? 1 : 0.3) : 1;
    };

    const handleReset = () => {
        setShowingTruncatedData(false);
        setSelectedKeys([]);
        setHoveredKey(null);
        setHoveredXValue(null);
    };


    const handleLegendEnter = (dataKey: string) => {
        if (isChartAnimating.current || (activeKeys && activeKeys.length > 0)) return;
        setHoveredKey(dataKey);
    }

    const handleLegendLeave = () => {
        console.log("Reached here")
        console.log('leaving');
        setHoveredKey(null);
    }

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
                        <Tooltip cursor={{ strokeDasharray: '6 5', stroke: '#99A0AE' }} content={(props) => CustomTooltip({ ...props, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type })} />
                        {keys.map((dataKey, index) => (
                            <Line
                                key={dataKey}
                                type="linear"
                                dataKey={dataKey}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: hoveredKey === dataKey ? 4 : 0 }}
                                opacity={getElementOpacity(dataKey)}
                                onMouseOver={() => setHoveredKey(dataKey)}
                                animationDuration={350}
                                onAnimationStart={() => isChartAnimating.current = true}
                                onAnimationEnd={() => isChartAnimating.current = false}
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
                        <Tooltip cursor={{ stroke: '#f3f4f6' }} offset={0} content={(props) => CustomTooltip({ ...props, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type })} />
                        {keys.map((dataKey, index) => (
                            <Bar
                                key={dataKey}
                                dataKey={dataKey}
                                fill={colors[index % colors.length]}
                                opacity={getElementOpacity(dataKey)}
                                // onMouseOver={() => handleHover(dataKey)}
                                animationDuration={350}
                                onAnimationStart={() => isChartAnimating.current = true}
                                onAnimationEnd={() => isChartAnimating.current = false}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </BarChart>
                );
            case ChartType.PIE:
                const pieData: PieDataItem[] = [];
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
                        <Tooltip content={({ active, payload }) => {
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
                                            <h3 className='text-body-md font-600 text-gray-900'>{capitaliseCamelCase(data.dataKey)}</h3>
                                            <label className='font-500 text-body-xs text-gray-400'>{data.name.split(' ')[1].replace(/[()]/g, '')}</label>
                                        </div>
                                    </div>

                                    <div className='pl-2 flex flex-col'>
                                        <label className='text-body-sm font-500 text-gray-400'>{capitaliseCamelCase(data.originalData.primary.name)}</label>
                                        <h3 className='text-sm font-600 text-gray-900'>
                                            {data.originalData.primary.val}
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
                        <Tooltip content={(props) => CustomTooltip({ ...props, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type })} />
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            innerRadius={100}
                            paddingAngle={0}
                            label={false}
                            onMouseEnter={(_, index) => setHoveredKey(pieData[index].dataKey)}
                            onMouseLeave={() => setHoveredKey(null)}
                        >
                            {pieData.map((entry, index) => {
                                const keyIndex = keys.indexOf(entry.dataKey);
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[keyIndex % colors.length]}
                                        opacity={hoveredKey ? (hoveredKey === entry.dataKey ? 1 : 0.3) : getElementOpacity(entry.dataKey)}
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
        <div className={getChartContainer()} ref={chartContainerRef}>
            <ChartHeader
                slot1={slot1}
                slot2={slot2}
                slot3={slot3}
                chartHeaderSlot={chartHeaderSlot}
            />
            {type === ChartType.LINE || type === ChartType.BAR || (type === ChartType.PIE && legendPosition === ChartLegendPosition.TOP) ? <div className={getChartContentContainer(legendPosition)}>
                <ChartLegends
                    chartContainerRef={chartContainerRef}
                    keys={keys}
                    activeKeys={activeKeys}
                    handleLegendClick={handleLegendClick}
                    colors={colors}
                    setSelectedKeys={setSelectedKeys}
                    onReset={handleReset}
                    handleLegendEnter={handleLegendEnter}
                    handleLegendLeave={handleLegendLeave}
                    hoveredKey={hoveredKey}
                />
                <div>
                    <ResponsiveContainer width={width} height={height}>
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </div> : <div className={getChartContentContainer(legendPosition)}>
                <div className='w-1/4 flex items-center justify-center'>
                    <ChartLegends
                        chartContainerRef={chartContainerRef}
                        keys={keys}
                        activeKeys={activeKeys}
                        handleLegendClick={handleLegendClick}
                        colors={colors}
                        setSelectedKeys={setSelectedKeys}
                        stacked={true}
                        onReset={handleReset}
                        handleLegendEnter={handleLegendEnter}
                        handleLegendLeave={handleLegendLeave}
                        hoveredKey={hoveredKey}
                    />
                </div>
                <div className='flex-1 w-full'>
                    <ResponsiveContainer width={width} height={height}>
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </div>}
        </div>
    );
};


export default Chart;