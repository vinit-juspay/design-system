import { ChartLegendPositionV2, ChartsV2Props, ChartTypeV2, FlattenedDataPoint, NewNestedDataPoint } from "./types"
import {
  ResponsiveContainer,
} from "recharts";
import { DEFAULT_COLORS, getChartContainer, getChartContentContainer } from "./themeUtils";
import { ChartHeaderV2 } from "./ChartHeaderV2";
import { ChartLegends } from "./ChartLegendV2";
import { useEffect, useRef, useState } from "react";
import { renderChart } from "./renderChart";


function transformNestedData(data: NewNestedDataPoint[]): FlattenedDataPoint[] {
  return data.map(item => {
    const flattened: FlattenedDataPoint = { name: item.name };

    for (const key in item.data) {
      flattened[key] = item.data[key].primary.val;
    }

    return flattened;
  });
}

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
  // const [hoveredXValue, setHoveredXValue] = useState<string | null>(null);
  const [_, setSelectedKeys] = useState<string[]>([]);

  if (!colors || colors.length === 0) colors = DEFAULT_COLORS;
  const flattenedData = transformNestedData(data);


  const lineKeys = flattenedData.length > 0
    ? Object.keys(flattenedData[0]).filter(key => key !== "name")
    : [];


  const handleLegendClick = (key: string) => {
    setSelectedKeys(prevActiveKeys => {
      if (prevActiveKeys.includes(key)) {
        return prevActiveKeys.filter(k => k !== key);
      } else {
        return [...prevActiveKeys, key];
      }
    });
  }

  const handleLegendEnter = (key: string) => {
    setHoveredKey(key);
  }

  const handleLegendLeave = () => {
    setHoveredKey(null);
  }

  useEffect(() => {
    console.log(hoveredKey, "Hovered Key")
  }, [hoveredKey])

  return (
    <div className={getChartContainer()} ref={chartContainerRef}>
      <ChartHeaderV2 slot1={slot1} slot2={slot2} slot3={slot3} chartHeaderSlot={chartHeaderSlot} />
      <div className={getChartContentContainer(legendPosition)}>
        <ChartLegends
          chartContainerRef={chartContainerRef}
          keys={lineKeys}
          colors={colors}
          handleLegendClick={handleLegendClick}
          handleLegendEnter={handleLegendEnter}
          handleLegendLeave={handleLegendLeave}
        />
        <div>
          <ResponsiveContainer width="100%" height={400}>
            {renderChart(flattenedData, chartType, hoveredKey, lineKeys, colors, setHoveredKey, xAxisLabel, yAxisLabel)}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsV2;

