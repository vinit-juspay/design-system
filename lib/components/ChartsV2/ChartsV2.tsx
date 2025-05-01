import { ChartLegendPositionV2, ChartsV2Props, ChartTypeV2 } from "./types"
import {
  ResponsiveContainer,
} from "recharts";
import { DEFAULT_COLORS, getChartContainer, getChartContentContainer } from "./utils";
import { ChartHeaderV2 } from "./ChartHeaderV2";
import { ChartLegends } from "./ChartLegendV2";
import { useRef, useState } from "react";
import { renderChart } from "./renderChart";
import { transformNestedData } from "./chartUtils";

const ChartsV2: React.FC<ChartsV2Props> = ({
  chartType = ChartTypeV2.LINE,
  data,
  colors,
  xAxisLabel,
  yAxisLabel,
  slot1,
  slot2,
  slot3,
  legendPosition = ChartLegendPositionV2.TOP,
  chartHeaderSlot, }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null!);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);


  if (!colors || colors.length === 0) colors = DEFAULT_COLORS;
  const flattenedData = transformNestedData(data, selectedKeys);

  const lineKeys = data.length > 0
    ? Object.keys(data[0].data)
    : [];

  const handleLegendClick = (key: string) => {
    if (chartType === ChartTypeV2.PIE) return;
    setSelectedKeys(prevActiveKeys => {
      if (prevActiveKeys.includes(key)) {
        return prevActiveKeys.filter(k => k !== key);
      } else {
        return [...prevActiveKeys, key];
      }
    });
  }

  const handleLegendEnter = (key: string) => {
    if (selectedKeys.length === 0 || selectedKeys.length === lineKeys.length) {
      setHoveredKey(key);
    }
  }

  const handleLegendLeave = () => {
    setHoveredKey(null);
  }

  const showHorizontallyStackedLegends = () => {
    return !(chartType === ChartTypeV2.PIE && legendPosition === ChartLegendPositionV2.RIGHT);
  }

  return (
    <div className={getChartContainer()} ref={chartContainerRef}>
      <ChartHeaderV2 slot1={slot1} slot2={slot2} slot3={slot3} chartHeaderSlot={chartHeaderSlot} />
      {showHorizontallyStackedLegends() ?
        (<>
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
                {renderChart({ flattenedData, chartType, hoveredKey, lineKeys, colors, setHoveredKey, xAxisLabel, yAxisLabel, data, selectedKeys })}
              </ResponsiveContainer>
            </div>
          </div>
        </>)
        :
        (<>
          <div className={getChartContentContainer(legendPosition)}>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height={400}>
                {renderChart({ flattenedData, chartType, hoveredKey, lineKeys, colors, setHoveredKey, xAxisLabel, yAxisLabel, data, selectedKeys })}
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
        </>)
      }
    </div>
  );
}

export default ChartsV2;

