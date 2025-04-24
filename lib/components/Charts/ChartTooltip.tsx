import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { capitaliseCamelCase, formatNumber } from './utils';
import { ChartType, NestedDataPoint } from './types';

interface CustomTooltipExtraProps {
    hoveredKey: string | null;
    setHoveredKey: (key: string | null) => void;
    data: NestedDataPoint[];
    keys: string[];
    hoveredXValue: string | null;
    type: ChartType;
}


export const CustomTooltip = ({ active, payload, label, hoveredKey, setHoveredKey, data, keys, hoveredXValue, type }: TooltipProps<ValueType, NameType> & CustomTooltipExtraProps) => {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    if (hoveredKey === null) {
        const fallbackKey = keys[0];
        hoveredKey = fallbackKey;
        setHoveredKey(fallbackKey);
    }

    const xAxisValue = payload[0].payload.name;
    const keyName = payload[0].dataKey as string;

    const dataPoint = data.find(point => point.name === label)
    if (!dataPoint) return null;

    let relevantData;

    if (type === ChartType.LINE) {
        relevantData = dataPoint[hoveredKey];
    } else if (type === ChartType.BAR) {
        relevantData = data.find(item => item.name === hoveredXValue)
    }

    const getColor = (key: string) => {
        const payloadItem = payload.find(item => item.dataKey === key);
        return payloadItem ? payloadItem.color : '#AD46FF';
    }


    return (
        <div className="bg-gray-0 font-sans shadow-lg flex flex-col gap-3 rounded-lg p-3 pl-2.5 border border-gray-150 min-w-[220px] !max-w-[200px]">
            {type === ChartType.LINE && (
                <>
                    <div className='pl-2 relative'>
                        <div
                            className='absolute top-0.5 left-0 w-1 h-4 rounded-full transition-all duration-75'
                            style={{ backgroundColor: getColor(hoveredKey) }}
                        ></div>
                        <div className='flex flex-col'>
                            <h3 className='text-body-md font-600 text-gray-900'>{capitaliseCamelCase(hoveredKey)}</h3>
                            <label className='font-500 text-body-sm text-gray-400'>{capitaliseCamelCase(xAxisValue)}</label>
                        </div>
                    </div>

                    {/* Primary Value for the line that is hovered over */}
                    <div className='pl-2 flex flex-col'>
                        <label className='text-body-sm font-500 text-gray-400'>{relevantData.primary.name}</label>
                        <h3 className='text-sm font-600 text-gray-900 overflow-clip whitespace-nowrap overflow-ellipsis'>
                            {relevantData.primary.val}
                        </h3>
                    </div>

                    <>
                        {relevantData.aux && relevantData.aux.length > 0 && (
                            <div className='flex flex-col gap-1 pt-3 pl-2 border-t border-gray-150'>
                                {relevantData.aux.map((auxItem: any, index: number) => (
                                    <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
                                        <span className="text-body-sm text-gray-500 truncate overflow-clip overflow-ellipsis">{auxItem.name}</span>
                                        <span className="text-body-sm font-500 text-gray-700">
                                            {typeof auxItem.val === 'number' ? formatNumber(auxItem.val) : auxItem.val}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                </>
            )}
            {type === ChartType.BAR && (
                <>
                    <div className='relative '>
                        <div className='flex flex-col '>
                            <h3 className='text-body-md font-500 text-gray-400'>{capitaliseCamelCase(xAxisValue)}</h3>
                            {/* <label className='font-500 text-body-sm text-gray-400'>{capitaliseCamelCase(xAxisValue)}</label> */}
                        </div>

                        <div className=" mt-3 space-y-3">
                            {relevantData && Object.keys(relevantData)
                                .filter(key => key !== 'name')
                                .map((key, index) => (
                                    <div key={`bar-${index}`} className="flex flex-col items-start">
                                        <div className="flex items-center gap-2 ">
                                            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: payload[index].color }}></div>
                                            <h3 className='text-body-sm font-400 text-gray-400'>{capitaliseCamelCase(key)}</h3>
                                        </div>
                                        <h3 className='w-full text-body-lg font-600 text-gray-900 pl-2.5 overflow-clip overflow-ellipsis whitespace-nowrap'>{relevantData[key].primary.val}</h3>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            )}
            {type === ChartType.PIE && (
                <>
                    <div className='flex flex-col'>
                        <h3 className='text-body-md font-600 text-gray-900'>{capitaliseCamelCase(hoveredKey)}</h3>
                    </div>
                </>
            )}
        </div>
    );
};