import { TooltipProps } from "recharts";
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { getChartTooltipContainer } from "./themeUtils";
import { ChartTypeV2, NewNestedDataPoint } from "./types";
import { capitaliseCamelCase, formatNumber } from "./utils";

interface CustomTooltipV2Props extends TooltipProps<ValueType, NameType> {
  hoveredKey: string | null;
  originalData: NewNestedDataPoint[];
  setHoveredKey: (key: string) => void;
  chartType: ChartTypeV2;
}

export const CustomTooltipV2 = ({ active, payload, label, hoveredKey, originalData, setHoveredKey, chartType }: CustomTooltipV2Props) => {
  if (active && hoveredKey == null) {
    setHoveredKey(Object.keys(originalData[0].data)[0])
  }

  if (!active || !payload || !payload.length || !hoveredKey || !label) {
    return null;
  }

  const getRelevantData = () => {
    const currentDataPoint = originalData.find(item => item.name === label);

    if (!currentDataPoint || !currentDataPoint.data || !currentDataPoint.data[hoveredKey]) {
      return null;
    }

    return currentDataPoint.data[hoveredKey];
  }
  const relevantData = getRelevantData();
  if (!relevantData) {
    return null;
  }


  const getColor = (key: string) => {
    const payloadItem = payload.find(item => item.dataKey === key);
    return payloadItem ? payloadItem.color : '#AD46FF';
  };

  return (
    <div className={getChartTooltipContainer()}>
      {chartType === ChartTypeV2.LINE && <LineChartTooltip originalData={originalData} hoveredKey={hoveredKey} label={label} getColor={getColor} />}
      {chartType === ChartTypeV2.BAR && <BarChartTooltip originalData={originalData} label={label} getColor={getColor} />}
    </div>
  );

};


const BarChartTooltip = ({ originalData, label, getColor }: {
  originalData: NewNestedDataPoint[];
  label: string;
  getColor: (key: string) => string | undefined;
}) => {

  const relevantData = originalData.find(item => item.name === label)?.data;
  return (
    <>
      <div className="relative ">
        <div className="flex flex-col ">
          <h3 className="text-body-md font-500 text-gray-400">
            {capitaliseCamelCase(label)}
          </h3>
        </div>

        <div className="mt-3 space-y-3">
          {relevantData &&
            Object.keys(relevantData)
              .filter(key => key !== 'name')
              .map((key, index) => (
                <div key={`bar-${index}`} className="flex flex-col items-start">
                  <div className="flex items-center gap-2 ">
                    <div
                      className="w-1 h-4 rounded-full"
                      style={{ backgroundColor: getColor(key) }}
                    ></div>
                    <h3 className="text-body-sm font-400 text-gray-400">
                      {capitaliseCamelCase(key)}
                    </h3>
                  </div>
                  <h3 className="w-full text-body-lg font-600 text-gray-900 pl-2.5 overflow-clip overflow-ellipsis whitespace-nowrap">
                    {relevantData[key].primary.val}
                  </h3>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}


const LineChartTooltip = ({ originalData, hoveredKey, label, getColor }: {
  originalData: NewNestedDataPoint[];
  hoveredKey: string;
  label: string;
  getColor: (key: string) => string | undefined;
}) => {
  const getRelevantData = () => {

    // Find the data point that matches the current label (x-axis value)
    const currentDataPoint = originalData.find(item => item.name === label);

    if (!currentDataPoint || !currentDataPoint.data || !currentDataPoint.data[hoveredKey]) {
      return null;
    }

    return currentDataPoint.data[hoveredKey];
  }
  const relevantData = getRelevantData();
  if (!relevantData) {
    return null;
  }
  return (
    <>
      <div className="pl-2 relative">
        <div
          className="absolute top-0.5 left-0 w-1 h-4 rounded-full transition-all duration-75"
          style={{ backgroundColor: getColor(hoveredKey) }}
        ></div>
        <div className="flex flex-col">
          <h3 className="text-body-md font-600 text-gray-900">
            {capitaliseCamelCase(hoveredKey)}
          </h3>
          <label className="font-500 text-body-sm text-gray-400">
            {capitaliseCamelCase(label)}
          </label>
        </div>
      </div>

      <div className="pl-2 flex flex-col">
        <label className="text-body-sm font-500 text-gray-400">
          {relevantData.primary.label}
        </label>
        <h3 className="text-sm font-600 text-gray-900 overflow-clip whitespace-nowrap overflow-ellipsis">
          {relevantData.primary.val}
        </h3>
      </div>

      <>
        {relevantData.aux && relevantData.aux.length > 0 && (
          <div className="flex flex-col gap-1 pt-3 pl-2 border-t border-gray-150">
            {relevantData.aux.map((auxItem: any, index: number) => (
              <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
                <span className="text-body-sm text-gray-500 truncate overflow-clip overflow-ellipsis">
                  {auxItem.label}
                </span>
                <span className="text-body-sm font-500 text-gray-700">
                  {typeof auxItem.val === 'number' ? formatNumber(auxItem.val) : auxItem.val}
                </span>
              </div>
            ))}
          </div>
        )}
      </>
    </>
  )
}