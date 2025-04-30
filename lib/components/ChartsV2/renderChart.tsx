import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTypeV2, RenderChartProps } from "./types";
import { formatNumber } from "./utils";
import { CustomTooltipV2 } from "./CustomTooltipV2";

export const renderChart = ({
  flattenedData,
  chartType,
  hoveredKey,
  lineKeys,
  colors,
  setHoveredKey,
  xAxisLabel,
  yAxisLabel,
  data: originalData
}: RenderChartProps) => {
  const getColor = (key: string) => {
    const originalIndex = lineKeys.indexOf(key);
    return colors[originalIndex % colors.length];
  }

  const getElementOpacity = (dataKey: string) => {
    if (hoveredKey) {
      return hoveredKey === dataKey ? 1 : 0.1;
    }
    return 1;
  }

  switch (chartType) {
    case ChartTypeV2.LINE:
      return (<LineChart data={flattenedData} margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}
        onMouseLeave={() => setHoveredKey(null)}
      >
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
        <Tooltip cursor={{ strokeDasharray: '6 5', stroke: '#99A0AE' }} content={props =>
          CustomTooltipV2({
            ...props,
            hoveredKey,
            originalData,
            setHoveredKey,
            chartType
          })
        } />
        {lineKeys.map((key, _) => (
          <Line
            key={key}
            type="linear"
            dataKey={key}
            stroke={getColor(key)}
            opacity={getElementOpacity(key)}
            strokeWidth={2}
            activeDot={{ r: hoveredKey === key ? 4 : 0 }}
            dot={false}
            animationDuration={350}
            onMouseOver={() => setHoveredKey(key)}
          />
        ))}
      </LineChart>)
    case ChartTypeV2.BAR:
      return (<BarChart data={flattenedData} margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}>
        <CartesianGrid vertical={false} stroke="#ECEFF3" />
        <XAxis
          dataKey="name"
          axisLine={false}
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
        <Tooltip cursor={{ fill: "#f3f4f6" }} content={props =>
          CustomTooltipV2({
            ...props,
            hoveredKey,
            originalData,
            setHoveredKey,
            chartType
          })
        } />
        {lineKeys.map((key, _) => (
          <Bar
            key={key}
            dataKey={key}
            fill={getColor(key)}
            opacity={getElementOpacity(key)}
            animationDuration={350}
            radius={[4, 4, 0, 0]}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
          />
        ))}
      </BarChart>)

    default:
      return <div>Unsupported chart type</div>;;
  }
}