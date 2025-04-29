import { ChartLegendPositionV2, ChartsV2Props, ChartTypeV2, NewNestedDataPoint } from "./types"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatNumber } from "./utils";
import { getChartContainer, getChartContentContainer } from "./themeUtils";
import { ChartHeaderV2 } from "./ChartHeaderV2";
import { ChartLegends } from "./ChartLegendV2";
import { useRef } from "react";

type FlattenedDataPoint = {
  name: string;
  [key: string]: number | string;
};

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
  console.log(chartType)

  if (!colors || colors.length === 0) colors = ['#8EC5FF', '#00C951', '#C27AFF', '#FB2C36', '#00D492', '#2B7FFF', '#AD46FF', '#FF8904'];
  const flattenedData = transformNestedData(data);
  const lineKeys = flattenedData.length > 0
    ? Object.keys(flattenedData[0]).filter(key => key !== "name")
    : [];

  const renderChart = () => {
    return (<LineChart data={flattenedData} margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}>
      <XAxis dataKey="name" axisLine={false}
        tickLine={false}
        tick={{ fill: '#99A0AE', fontSize: 14, fontWeight: 500 }}
        dy={10}
        label={
          xAxisLabel
            ? {
              value: xAxisLabel,
              position: 'bottom',
              offset: 15,
              fill: '#99A0AE',
              fontSize: 14,
              fontWeight: 500,
            }
            : undefined
        }
      />
      <CartesianGrid vertical={false} stroke="#ECEFF3" />
      <YAxis
        width={50}
        axisLine={false}
        tickLine={false}
        tickFormatter={value => formatNumber(value)}
        tick={{ fill: '#99A0AE', fontSize: 14, fontWeight: 500 }}
        label={
          yAxisLabel
            ? {
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
              offset: -15,
              fill: '#99A0AE',
              fontSize: 14,
              fontWeight: 500,
            }
            : undefined
        }
      />
      <Tooltip />
      {lineKeys.map((key, index) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={colors[index]}
          dot={false}
        />
      ))}
    </LineChart>)
  }

  return (
    <div className={getChartContainer()} ref={chartContainerRef}>
      <ChartHeaderV2 slot1={slot1} slot2={slot2} slot3={slot3} chartHeaderSlot={chartHeaderSlot} />
      <div className={getChartContentContainer(legendPosition)}>
        <ChartLegends
          chartContainerRef={chartContainerRef}
          keys={lineKeys}
          colors={colors}
        />
        <div>
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsV2;

