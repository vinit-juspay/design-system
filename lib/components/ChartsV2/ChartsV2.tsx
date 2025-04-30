import { ChartLegendPositionV2, ChartsV2Props, ChartTypeV2, FlattenedDataPoint, NewNestedDataPoint } from "./types"
import {
  ResponsiveContainer,
} from "recharts";
import { DEFAULT_COLORS, getChartContainer, getChartContentContainer } from "./themeUtils";
import { ChartHeaderV2 } from "./ChartHeaderV2";
import { ChartLegends } from "./ChartLegendV2";
import { useEffect, useRef, useState } from "react";
import { renderChart } from "./renderChart";


function transformNestedData(data: NewNestedDataPoint[], selectedKeys: string[] = []): FlattenedDataPoint[] {
  return data.map(item => {
    const flattened: FlattenedDataPoint = { name: item.name };

    // Get all keys from the data or only the selected ones
    const keysToInclude = selectedKeys.length > 0
      ? Object.keys(item.data).filter(key => selectedKeys.includes(key))
      : Object.keys(item.data);

    for (const key of keysToInclude) {
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);


  if (!colors || colors.length === 0) colors = DEFAULT_COLORS;
  const flattenedData = transformNestedData(data, selectedKeys);

  const lineKeys = data.length > 0
    ? Object.keys(data[0].data)
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

  function useUniqueLogger() {
    const lastLogRef = useRef<string | null>(null);

    function log(...args: unknown[]) {
      const message = JSON.stringify(args);
      if (message !== lastLogRef.current) {
        console.log(...args);
        lastLogRef.current = message;
      }
    }

    return log;
  }

  const handleLegendEnter = (key: string) => {
    if (selectedKeys.length === 0 || selectedKeys.length === lineKeys.length) {
      setHoveredKey(key);
    }
  }

  const handleLegendLeave = () => {
    setHoveredKey(null);
  }

  const log = useUniqueLogger();
  useEffect(() => {
    log(hoveredKey);
  }, [hoveredKey]);

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
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          hoveredKey={hoveredKey}
          activeKeys={selectedKeys}
        />
        <div>
          <ResponsiveContainer width="100%" height={400}>
            {renderChart({ flattenedData, chartType, hoveredKey, lineKeys, colors, setHoveredKey, xAxisLabel, yAxisLabel, data, selectedKeys })}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsV2;

