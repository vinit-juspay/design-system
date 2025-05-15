import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartType, RenderChartProps } from './types';
import { formatNumber, lightenHexColor } from './chartUtils';
import { CustomTooltip } from './CustomTooltip';
import { getChartConfig } from './utils';

export const renderChart = ({
  flattenedData,
  chartType,
  hoveredKey,
  lineKeys,
  colors,
  setHoveredKey,
  xAxisLabel,
  yAxisLabel,
  data: originalData,
  selectedKeys,
}: RenderChartProps) => {
  const getColor = (key: string, chartType: ChartType) => {
    const originalIndex = lineKeys.indexOf(key);
    const baseColor = colors[originalIndex % colors.length];

    // For bar charts, highlight only the hovered bar
    if (chartType === ChartType.BAR) {
      return hoveredKey === null
        ? baseColor
        : hoveredKey === key
          ? baseColor
          : lightenHexColor(baseColor, 0.3);
    }

    // For other chart types (LINE, PIE), dim non-hovered elements
    if (hoveredKey && hoveredKey !== key) {
      return lightenHexColor(baseColor, 0.3);
    }

    return baseColor;
  };

  const chartConfig = getChartConfig();

  switch (chartType) {
    case ChartType.LINE:
      return (
        <LineChart
          data={flattenedData}
          margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: chartConfig.tickFill,
              fontSize: chartConfig.tickFontSize,
              fontWeight: chartConfig.tickFontWeight,
            }}
            dy={10}
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: 'bottom',
                    offset: 15,
                    fill: chartConfig.labelFill,
                    fontSize: chartConfig.labelFontSize,
                    fontWeight: chartConfig.labelFontWeight,
                  }
                : undefined
            }
          />
          <CartesianGrid vertical={false} stroke={chartConfig.gridStroke} />
          <YAxis
            width={50}
            axisLine={false}
            tickLine={false}
            tickFormatter={value => formatNumber(value)}
            tick={{
              fill: chartConfig.tickFill,
              fontSize: chartConfig.tickFontSize,
              fontWeight: chartConfig.tickFontWeight,
            }}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                    offset: -15,
                    fill: chartConfig.labelFill,
                    fontSize: chartConfig.labelFontSize,
                    fontWeight: chartConfig.labelFontWeight,
                  }
                : undefined
            }
          />
          <Tooltip
            cursor={{ strokeDasharray: '6 5', stroke: chartConfig.tickFill }}
            content={props =>
              CustomTooltip({
                ...props,
                hoveredKey,
                originalData,
                setHoveredKey,
                chartType,
                selectedKeys,
              })
            }
          />
          {lineKeys.map((key, _) => (
            <Line
              key={key}
              type="linear"
              dataKey={key}
              stroke={getColor(key, chartType)}
              strokeWidth={2}
              activeDot={{ r: hoveredKey === key ? 4 : 0 }}
              dot={false}
              animationDuration={350}
              onMouseOver={() => setHoveredKey(key)}
            />
          ))}
        </LineChart>
      );
    case ChartType.BAR:
      return (
        <BarChart
          data={flattenedData}
          margin={{ top: 10, right: 30, left: yAxisLabel ? 30 : 10, bottom: xAxisLabel ? 30 : 0 }}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <CartesianGrid vertical={false} stroke={chartConfig.gridStroke} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: chartConfig.tickFill,
              fontSize: chartConfig.tickFontSize,
              fontWeight: chartConfig.tickFontWeight,
            }}
            dy={10}
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: 'bottom',
                    offset: 15,
                    fill: chartConfig.labelFill,
                    fontSize: chartConfig.labelFontSize,
                    fontWeight: chartConfig.labelFontWeight,
                  }
                : undefined
            }
          />
          <YAxis
            width={50}
            axisLine={false}
            tickLine={false}
            tickFormatter={value => formatNumber(value)}
            tick={{
              fill: chartConfig.tickFill,
              fontSize: chartConfig.tickFontSize,
              fontWeight: chartConfig.tickFontWeight,
            }}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                    offset: -15,
                    fill: chartConfig.labelFill,
                    fontSize: chartConfig.labelFontSize,
                    fontWeight: chartConfig.labelFontWeight,
                  }
                : undefined
            }
          />
          <Tooltip
            cursor={{ fill: chartConfig.gridStroke }}
            content={props =>
              CustomTooltip({
                ...props,
                hoveredKey,
                originalData,
                setHoveredKey,
                chartType,
                selectedKeys,
              })
            }
          />
          {lineKeys.map((key, _) => (
            <Bar
              key={key}
              dataKey={key}
              fill={getColor(key, chartType)}
              animationDuration={350}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      );

    case ChartType.PIE:
      const pieData = lineKeys.map((key, _) => ({
        name: key,
        value: originalData[0].data[key]?.primary.val || 0,
      }));

      return (
        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius="100%"
            innerRadius="70%"
            paddingAngle={0}
            fill={colors[0]}
            dataKey="value"
            nameKey="name"
            label={false}
            animationDuration={350}
            onMouseEnter={(_, index) => setHoveredKey(pieData[index].name)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.name, chartType)} />
            ))}
          </Pie>
          <Tooltip
            content={props =>
              CustomTooltip({
                ...props,
                hoveredKey,
                originalData,
                setHoveredKey,
                chartType: ChartType.PIE,
                selectedKeys,
              })
            }
          />
        </PieChart>
      );

    default:
      return <div>Unsupported chart type</div>;
  }
};
