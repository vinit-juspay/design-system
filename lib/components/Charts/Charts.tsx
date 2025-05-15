import { ChartLegendPosition, ChartsProps, ChartType } from './types';
import { ResponsiveContainer } from 'recharts';
import { DEFAULT_COLORS, getChartContainer, getChartContentContainer } from './utils';
import { ChartHeader } from './ChartHeader';
import { ChartLegends } from './ChartLegend';
import { useRef, useState } from 'react';
import { renderChart } from './renderChart';
import { transformNestedData } from './chartUtils';

const Charts: React.FC<ChartsProps> = ({
  chartType = ChartType.LINE,
  data,
  colors,
  xAxisLabel,
  yAxisLabel,
  slot1,
  slot2,
  slot3,
  legendPosition = ChartLegendPosition.TOP,
  chartHeaderSlot,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null!);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  if (!colors || colors.length === 0) colors = DEFAULT_COLORS;
  const flattenedData = transformNestedData(data, selectedKeys);

  const lineKeys = data.length > 0 ? Object.keys(data[0].data) : [];

  const handleLegendClick = (key: string) => {
    if (chartType === ChartType.PIE) return;
    setSelectedKeys(prevActiveKeys => {
      if (prevActiveKeys.includes(key)) {
        return prevActiveKeys.filter(k => k !== key);
      } else {
        return [...prevActiveKeys, key];
      }
    });
  };

  const handleLegendEnter = (key: string) => {
    if (selectedKeys.length === 0 || selectedKeys.length === lineKeys.length) {
      setHoveredKey(key);
    }
  };

  const handleLegendLeave = () => {
    setHoveredKey(null);
  };

  const showHorizontallyStackedLegends = () => {
    return !(chartType === ChartType.PIE && legendPosition === ChartLegendPosition.RIGHT);
  };

  return (
    <div className={getChartContainer()} ref={chartContainerRef}>
      <ChartHeader slot1={slot1} slot2={slot2} slot3={slot3} chartHeaderSlot={chartHeaderSlot} />
      {showHorizontallyStackedLegends() ? (
        <>
          <div className={getChartContentContainer(legendPosition)}>
            <ChartLegends
              chartContainerRef={chartContainerRef}
              keys={lineKeys}
              colors={colors}
              handleLegendClick={handleLegendClick}
              handleLegendEnter={handleLegendEnter}
              handleLegendLeave={handleLegendLeave}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              hoveredKey={hoveredKey}
              activeKeys={selectedKeys}
              stacked={false}
            />
            <div>
              <ResponsiveContainer width="100%" height={400}>
                {renderChart({
                  flattenedData,
                  chartType,
                  hoveredKey,
                  lineKeys,
                  colors,
                  setHoveredKey,
                  xAxisLabel,
                  yAxisLabel,
                  data,
                  selectedKeys,
                })}
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={getChartContentContainer(legendPosition)}>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height={400}>
                {renderChart({
                  flattenedData,
                  chartType,
                  hoveredKey,
                  lineKeys,
                  colors,
                  setHoveredKey,
                  xAxisLabel,
                  yAxisLabel,
                  data,
                  selectedKeys,
                })}
              </ResponsiveContainer>
            </div>
            <div className="w-1/4 flex items-center justify-center">
              <ChartLegends
                chartContainerRef={chartContainerRef}
                keys={lineKeys}
                colors={colors}
                handleLegendClick={handleLegendClick}
                handleLegendEnter={handleLegendEnter}
                handleLegendLeave={handleLegendLeave}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
                hoveredKey={hoveredKey}
                activeKeys={selectedKeys}
                stacked={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;
