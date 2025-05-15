import { getChartTooltipContainer } from './utils';
import { ChartType, CustomTooltipProps, NewNestedDataPoint } from './types';
import { capitaliseCamelCase, formatNumber } from './chartUtils';

import { Payload, ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

export const CustomTooltip = ({
  active,
  payload,
  label,
  hoveredKey,
  originalData,
  setHoveredKey,
  chartType,
  selectedKeys,
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const getColor = (key: string) => {
    const payloadItem = payload.find(item => item.dataKey === key);
    return payloadItem ? payloadItem.color : '#AD46FF';
  };

  return (
    <div className={getChartTooltipContainer()}>
      {chartType === ChartType.LINE && (
        <LineChartTooltip
          active={active}
          payload={payload}
          selectedKeys={selectedKeys}
          setHoveredKey={setHoveredKey}
          originalData={originalData}
          hoveredKey={hoveredKey}
          label={label}
          getColor={getColor}
        />
      )}
      {chartType === ChartType.BAR && (
        <BarChartTooltip originalData={originalData} label={label} getColor={getColor} />
      )}
      {chartType === ChartType.PIE && (
        <PieChartTooltip
          active={active}
          payload={payload}
          selectedKeys={selectedKeys}
          setHoveredKey={setHoveredKey}
          originalData={originalData}
          hoveredKey={hoveredKey}
        />
      )}
    </div>
  );
};

const BarChartTooltip = ({
  originalData,
  label,
  getColor,
}: {
  originalData: NewNestedDataPoint[];
  label: string;
  getColor: (key: string) => string | undefined;
}) => {
  const relevantData = originalData.find(item => item.name === label)?.data;
  return (
    <>
      <div className="relative">
        <div className="flex flex-col">
          <h3 className="text-jp-body-md font-jp-500 text-jp-gray-400">{capitaliseCamelCase(label)}</h3>
        </div>

        <div className="mt-3 space-y-3">
          {relevantData &&
            Object.keys(relevantData)
              .filter(key => key !== 'name')
              .map((key, index) => (
                <div key={`bar-${index}`} className="flex flex-col items-start">
                  <div className="flex items-center gap-2 ">
                    <div
                      className="w-1 h-4 rounded-jp-full"
                      style={{ backgroundColor: getColor(key) }}
                    ></div>
                    <h3 className="text-jp-body-sm font-jp-400 text-jp-gray-400">
                      {capitaliseCamelCase(key)}
                    </h3>
                  </div>
                  <h3 className="w-full text-jp-body-lg font-jp-600 text-jp-gray-900 pl-2.5 overflow-clip overflow-ellipsis whitespace-nowrap">
                    {relevantData[key].primary.val}
                  </h3>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

const LineChartTooltip = ({
  originalData,
  hoveredKey,
  label,
  getColor,
  active,
  payload,
  selectedKeys,
  setHoveredKey,
}: {
  originalData: NewNestedDataPoint[];
  hoveredKey: string | null;
  label: string;
  getColor: (key: string) => string | undefined;
  active: boolean;
  payload: Payload<ValueType, NameType>[];
  selectedKeys: string[];
  setHoveredKey: (key: string) => void;
}) => {
  if (active && hoveredKey == null) {
    if (selectedKeys.length > 0) {
      setHoveredKey(selectedKeys[0]);
    } else {
      setHoveredKey(Object.keys(originalData[0].data)[0]);
    }
  }

  if (!active || !payload || !payload.length || !hoveredKey || !label) {
    return null;
  }

  const getRelevantData = () => {
    // Find the data point that matches the current label (x-axis value)
    const currentDataPoint = originalData.find(item => item.name === label);

    if (!currentDataPoint || !currentDataPoint.data || !currentDataPoint.data[hoveredKey]) {
      return null;
    }

    return currentDataPoint.data[hoveredKey];
  };
  const relevantData = getRelevantData();
  if (!relevantData) {
    return null;
  }
  return (
    <>
      <div className="pl-2 relative">
        <div
          className="absolute top-0.5 left-0 w-1 h-4 rounded-jp-full transition-all duration-75"
          style={{ backgroundColor: getColor(hoveredKey) }}
        ></div>
        <div className="flex flex-col">
          <h3 className="text-jp-body-md font-jp-600 text-jp-gray-900">{capitaliseCamelCase(hoveredKey)}</h3>
          <label className="font-jp-500 text-jp-body-sm text-jp-gray-400">
            {capitaliseCamelCase(label)}
          </label>
        </div>
      </div>

      <div className="pl-2 flex flex-col">
        <label className="text-jp-body-sm font-jp-500 text-jp-gray-400">{relevantData.primary.label}</label>
        <h3 className="text-jp-body-sm font-jp-600 text-jp-gray-900 overflow-clip whitespace-nowrap overflow-ellipsis">
          {relevantData.primary.val}
        </h3>
      </div>

      <>
        {relevantData.aux && relevantData.aux.length > 0 && (
          <div className="flex flex-col gap-1 pt-3 pl-2 border-t border-jp-gray-150">
            {relevantData.aux.map((auxItem: any, index: number) => (
              <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
                <span className="text-jp-body-sm text-jp-gray-500 truncate overflow-clip overflow-ellipsis">
                  {auxItem.label}
                </span>
                <span className="text-jp-body-sm font-jp-500 text-jp-gray-700">
                  {typeof auxItem.val === 'number' ? formatNumber(auxItem.val) : auxItem.val}
                </span>
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
};

const PieChartTooltip = ({
  originalData,
  hoveredKey,
  active,
  payload,
  selectedKeys,
  setHoveredKey,
}: {
  originalData: NewNestedDataPoint[];
  hoveredKey: string | null;
  active: boolean;
  payload: Payload<ValueType, NameType>[];
  selectedKeys: string[];
  setHoveredKey: (key: string) => void;
}) => {
  if (active && hoveredKey == null) {
    if (selectedKeys.length > 0) {
      setHoveredKey(selectedKeys[0]);
    } else {
      setHoveredKey(Object.keys(originalData[0].data)[0]);
    }
  }

  if (!active || !payload || !payload.length || !hoveredKey) {
    return null;
  }

  let name = payload[0].name as string;
  if (!name) name = Object.keys(originalData[0].data)[0];

  const data = originalData[0].data[name];

  return (
    <>
      <div className="pl-2 relative">
        <div
          className="absolute top-0.5 left-0 w-1 h-4 rounded-jp-full"
          style={{ backgroundColor: payload[0].payload.fill }}
        ></div>
        <div className="flex flex-col">
          <h3 className="text-jp-body-md font-jp-600 text-jp-gray-900">{capitaliseCamelCase(name)}</h3>
          <label className="font-jp-500 text-jp-body-xs text-jp-gray-400">
            {capitaliseCamelCase(originalData[0].name)}
          </label>
        </div>
      </div>

      <div className="pl-2 flex flex-col">
        <label className="text-jp-body-sm font-jp-500 text-jp-gray-400">
          {capitaliseCamelCase(data.primary.label)}
        </label>
        <h3 className="text-jp-body-sm font-jp-600 text-jp-gray-900">{data.primary.val}</h3>
      </div>

      {data.aux && data.aux.length > 0 && (
        <div className="flex flex-col gap-1 pt-3 pl-2 border-t border-jp-gray-150">
          {data.aux.map((auxItem: any, index: number) => (
            <div key={`aux-${index}`} className="flex items-center justify-between gap-2">
              <span className="text-jp-body-xs text-jp-gray-400 truncate">{auxItem.label}</span>
              <span className="text-jp-body-sm font-jp-600 text-jp-gray-700">
                {typeof auxItem.val === 'number' ? formatNumber(auxItem.val) : auxItem.val}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
