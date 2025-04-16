import React, { ReactNode, useState } from 'react';
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
    TooltipProps,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import Dropdown from '../Dropdown/Dropdown';

export enum ChartType {
    LINE = 'line',
    BAR = 'bar',
    PIE = 'pie'
}

// Define interfaces for the nested data structure
export interface NestedDataPoint {
    name: string;
    [key: string]: any; // Allow any nested structure
}

export interface ChartProps {
    type: ChartType;
    data: NestedDataPoint[];
    dataKeys?: string[]; // Optional - will extract from data if not provided
    width?: string | number;
    height?: string | number;
    colors?: string[];
    xAxisLabel?: string;
    yAxisLabel?: string;
    metrics?: string[];
    slot1?: ReactNode;
    slot2?: ReactNode;
    slot3?: ReactNode;
}

// Helper function to transform the nested data for charts
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

/**
 * Chart component that renders either a Line, Bar or Pie chart based on the type prop
 * with support for nested data structure
 */
export const Chart: React.FC<ChartProps> = ({
    type,
    data,
    dataKeys,
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
    // If dataKeys not provided, extract them from the first data point
    const keys = dataKeys || 
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

    // Transform the nested data for the charts
    const transformedData = transformData(data, keys);

    // Define CustomTooltip to handle the nested structure
    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (!active || !payload || payload.length === 0) {
            return null;
        }
    
        // Get the key name from the first payload item
        const keyName = payload[0].dataKey as string;
        
        // Find the original data point for the current label (month)
        const dataPoint = data.find(point => point.name === label);
        if (!dataPoint) return null;
        
        // Get the nested data from the data point
        const nestedData = dataPoint[keyName];
        if (!nestedData || !nestedData.primary) return null;
        
        return (
            <div className="bg-gray-0 shadow-lg flex flex-col gap-3 rounded-lg p-3 pl-2.5 border border-gray-150 w-[260px]">
                <div className='pl-2 relative'>
                    <div 
                        className='absolute top-0.5 left-0 w-1 h-4 rounded-full' 
                        style={{ backgroundColor: payload[0].color }}
                    ></div>
                    <div className='flex flex-col'>
                        <h3 className='text-body-md font-600 text-gray-900'>{keyName}</h3>
                        <label className='font-500 text-body-xs text-gray-400'>{label}</label>
                    </div>
                </div>

                {/* Primary Value */}
                <div className='pl-2 flex flex-col'>
                    <label className='text-body-sm font-500 text-gray-400'>{nestedData.primary.name}</label>
                    <h3 className='text-sm font-600 text-gray-900'>{nestedData.primary.val}</h3>
                </div>

                {/* Auxiliary Values */}
                {nestedData.aux && nestedData.aux.length > 0 && (
                    <div className='flex flex-col gap-1 pt-3 pl-2 border-t border-gray-150'>
                        {nestedData.aux.map((auxItem: any, index: number) => (
                            <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
                                <span className="text-body-xs text-gray-400 truncate">{auxItem.name}</span>
                                <span className="text-body-sm font-600 text-gray-700">{auxItem.val}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Determine which keys are active (selected)
    const activeKeys = selectedKeys.length > 0 ? selectedKeys : null;

    const handleLegendClick = (dataKey: string) => {
        setSelectedKeys(prevSelected => {
            if (prevSelected.includes(dataKey)) {
                // If clicking an already selected item, remove it from selection
                return prevSelected.filter(key => key !== dataKey);
            } else {
                // Otherwise, add the clicked item to selection
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
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 15 } : undefined}
                        />
                        <YAxis
                            width={50}
                            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'left', offset: 10 } : undefined}
                        />
                        <Tooltip content={CustomTooltip} />
                        {keys.map((dataKey, index) => (
                            <Line
                                key={dataKey}
                                type="linear"
                                dataKey={dataKey}
                                stroke={colors[index % colors.length]}
                                strokeWidth={1.5}
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
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 15 } : undefined}
                        />
                        <YAxis
                            width={50}
                            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'left', offset: 10 } : undefined}
                        />
                        <Tooltip content={CustomTooltip} cursor={{ fill: 'transparent' }} />
                        {keys.map((dataKey, index) => (
                            <Bar
                                key={dataKey}
                                dataKey={dataKey}
                                fill={colors[index % colors.length]}
                                opacity={activeKeys && !activeKeys.includes(dataKey) ? 0.3 : 1}
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
                                            <h3 className='text-body-md font-600 text-gray-900'>{data.dataKey}</h3>
                                            <label className='font-500 text-body-xs text-gray-400'>{data.name.split(' ')[1].replace(/[()]/g, '')}</label>
                                        </div>
                                    </div>

                                    {/* Primary Value */}
                                    <div className='pl-2 flex flex-col'>
                                        <label className='text-body-sm font-500 text-gray-400'>{data.originalData.primary.name}</label>
                                        <h3 className='text-sm font-600 text-gray-900'>{data.value}</h3>
                                    </div>

                                    {/* Auxiliary Values */}
                                    {data.originalData.aux && data.originalData.aux.length > 0 && (
                                        <div className='flex flex-col gap-1 pt-3 pl-2 border-t border-gray-150'>
                                            {data.originalData.aux.map((auxItem: any, index: number) => (
                                                <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
                                                    <span className="text-body-xs text-gray-400 truncate">{auxItem.name}</span>
                                                    <span className="text-body-sm font-600 text-gray-700">{auxItem.val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }} />
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            innerRadius={60}
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
            <div className="flex items-center justify-between gap-2 py-4 px-[18px] bg-[#FCFCFD] border-b border-[#ECEFF3]">
                <div>
                    {metrics.length > 0 ? (
                        <Dropdown
                            options={metrics}
                            selectedOption={selectedMetric}
                            onSelect={handleMetricChange}
                        />
                    ) : (
                        <h3 className="text-base font-semibold text-[#525866]">{selectedMetric}</h3>
                    )}
                </div>
                <div className='flex items-center gap-2'>
                    {slot1}
                    {slot2}
                    {slot3}
                </div>
            </div>
            <div className='py-5 px-4 flex flex-col gap-6'>
                <div className="flex flex-wrap items-center gap-8">
                    {type === ChartType.PIE ? 
                        keys.map((dataKey, index) => (
                            <div
                                key={dataKey}
                                className="flex items-center gap-3 pl-1 cursor-pointer"
                                onClick={() => handleLegendClick(dataKey)}
                            >
                                <div
                                    className="w-3 h-3 rounded-xs"
                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                    }}
                                />
                                <span
                                    className="text-[14px] font-medium"
                                    style={{
                                        color: activeKeys && activeKeys.includes(dataKey) ? '#333' : '#717784',
                                        opacity: activeKeys && !activeKeys.includes(dataKey) ? 0.3 : 1
                                    }}
                                >
                                    {dataKey}
                                </span>
                            </div>
                        )) :
                        keys.map((dataKey, index) => (
                            <div
                                key={dataKey}
                                className="flex items-center gap-3 pl-1 cursor-pointer"
                                onClick={() => handleLegendClick(dataKey)}
                            >
                                <div
                                    className="w-3 h-3 rounded-xs"
                                    style={{
                                        backgroundColor: colors[index % colors.length],
                                    }}
                                />
                                <span
                                    className="text-[14px] font-medium"
                                    style={{
                                        color: activeKeys && activeKeys.includes(dataKey) ? '#333' : '#717784',
                                    }}
                                >
                                    {dataKey}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <ResponsiveContainer width={width} height={height} >
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Chart;