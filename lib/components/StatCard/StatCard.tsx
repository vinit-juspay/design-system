import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipProps,
  Area,
  AreaChart,
} from 'recharts';

import { cn } from '../../utils';
import { ChangeType, StatCardVariant, type StatCardProps } from './types';
import { useMemo } from 'react';
import { ArrowDown, ArrowUp, CircleHelp } from 'lucide-react';
import { TooltipV2 } from '../Tooltip';

const StatCard = ({
  title,
  value,
  change,
  subtitle = 'Last 7 days',
  variant,
  chartData,
  progressValue,
  className,
  titleIcon,
  actionIcon,
  helpIconText,
}: StatCardProps) => {
  // If line or bar variant is provided but no chart data, fall back to number variant
  const effectiveVariant =
    (variant === StatCardVariant.LINE || variant === StatCardVariant.BAR) &&
    (!chartData || chartData.length === 0)
      ? StatCardVariant.NUMBER
      : variant;

  // Format change value for display
  const formattedChange = change ? (
    <span className="flex items-center">
      {change.type === ChangeType.INCREASE ? (
        <ArrowUp size={14} className="mr-0.5" />
      ) : (
        <ArrowDown size={14} className="mr-0.5" />
      )}
      {Math.abs(change.value).toFixed(2)}%
    </span>
  ) : null;

  // Determine if data is trending down (first value > last value)
  const isTrendingDown = useMemo(() => {
    if (!chartData || chartData.length < 2) return false;
    return chartData[0].value > chartData[chartData.length - 1].value;
  }, [chartData]);

  // Set colors based on trend
  const lineColor = isTrendingDown ? '#ef4444' : '#22c55e'; // red for down, green for up
  const areaColor = isTrendingDown ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'; // transparent red/green

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const currentValue = payload[0].value as number;
    const currentIndex = payload[0].payload?.index as number;
    const previousIndex = Math.max(0, currentIndex - 1);
    const previousValue = chartData?.[previousIndex]?.value || currentValue;

    const diff = currentValue - previousValue;
    const percentage = previousValue ? (diff / previousValue) * 100 : 0;
    const isUp = diff >= 0;
    return (
      <div className="bg-black text-white text-xs px-2 py-1 rounded-md">
        {/* TODO: What data to show */}
        {/* <div>{currentLabel}</div> */}
        <div>{`${Math.abs(percentage).toFixed(0)}% ${isUp ? 'Up' : 'Down'}`}</div>
        {/* <div>{`Value: ${currentValue}`}</div> */}
      </div>
    );
  };

  // Prepare chart data with index for tooltip calculations
  const indexedChartData = useMemo(() => {
    return chartData?.map((point, index) => ({
      ...point,
      index,
    }));
  }, [chartData]);

  return (
    <div
      className={cn(
        'rounded-lg h-[190px] border border-jp-gray-200 overflow-hidden bg-white shadow-xs p-4 space-y-6',
        className
      )}
    >
      {effectiveVariant !== StatCardVariant.NUMBER && (
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-2">
            {titleIcon && (
              <div className="w-5 h-5 flex items-center justify-center">{titleIcon}</div>
            )}
            <div className="w-full flex items-center flex-1 space-x-2">
              <h4 className="text-body-md font-medium text-jp-gray-400 whitespace-nowrap text-ellipsis">
                {title}
              </h4>
              {helpIconText && (
                <div className="text-body-sm text-jp-gray-400">
                  <TooltipV2 content={helpIconText}>
                    <CircleHelp className="w-4 h-4" />
                  </TooltipV2>
                </div>
              )}
            </div>
            {actionIcon && (
              <div className="w-5 h-5 flex items-center justify-center">{actionIcon}</div>
            )}
          </div>

          <div className={`flex items-start flex-col ${titleIcon ? 'pl-7' : ''}`}>
            <div className="w-full flex items-center gap-1">
              <h3 className="text-lg font-bold text-jp-gray-800">{value}</h3>
              {formattedChange && (
                <span
                  className={cn(
                    'ml-2 text-xs',
                    change?.type === ChangeType.INCREASE ? 'text-jp-green-600' : 'text-jp-red-600'
                  )}
                >
                  {formattedChange}
                </span>
              )}
            </div>
            <p className="text-body-sm text-gray-400 font-medium">{subtitle}</p>
          </div>
        </div>
      )}

      {effectiveVariant === StatCardVariant.NUMBER && (
        <div className="flex flex-col h-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            {titleIcon && (
              <div className="w-5 h-5 flex items-center justify-center">{titleIcon}</div>
            )}
            <div className="w-full flex items-center flex-1 space-x-2">
              <h4 className="text-body-md font-medium text-jp-gray-400 whitespace-nowrap text-ellipsis">
                {title}
              </h4>
              {helpIconText && (
                <div className="text-body-sm text-jp-gray-400">
                  <TooltipV2 content={helpIconText}>
                    <CircleHelp className="w-4 h-4" />
                  </TooltipV2>
                </div>
              )}
            </div>
          </div>

          <div className={'flex items-center flex-col'}>
            <div className="w-full flex items-center gap-1">
              <h3 className="text-lg font-bold text-jp-gray-800">{value}</h3>
              {formattedChange && (
                <span
                  className={cn(
                    'ml-2 text-xs',
                    change?.type === ChangeType.INCREASE ? 'text-jp-green-600' : 'text-jp-red-600'
                  )}
                >
                  {formattedChange}
                </span>
              )}
            </div>
            <p className="text-body-sm text-gray-400 font-medium">{subtitle}</p>
          </div>
        </div>
      )}

      {effectiveVariant !== StatCardVariant.NUMBER && (
        <div className="h-[50px]">
          {effectiveVariant === StatCardVariant.LINE && indexedChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={indexedChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ strokeDasharray: '6 5', stroke: '#99A0AE' }}
                  position={{ y: 0 }}
                  isAnimationActive={false}
                  animationDuration={350}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={areaColor} stopOpacity={1} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0.5} />
                  </linearGradient>
                </defs>

                <Area
                  animationDuration={350}
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  fill={`url(#colorGradient)`}
                  activeDot={{ r: 4, fill: 'white', stroke: lineColor }}
                ></Area>
              </AreaChart>
            </ResponsiveContainer>
          )}

          {effectiveVariant === StatCardVariant.BAR && indexedChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={indexedChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'transparent' }}
                  position={{ y: 0 }}
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[2, 2, 0, 0]}
                  isAnimationActive={false}
                  activeBar={{
                    fill: '#e0e7ff',
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {effectiveVariant === StatCardVariant.PROGRESS_BAR && progressValue && (
            <div className="w-full h-5 flex items-center gap-4">
              <div className="w-full h-full flex flex-1 rounded-xs overflow-hidden">
                <div className="bg-jp-primary-500 h-full" style={{ width: `${progressValue}%` }}></div>
                <div
                  className="bg-white h-full [background-image:repeating-linear-gradient(to_right,_#e1e4ea,_#e1e4ea_5px,_transparent_1px,_transparent)] [background-size:10px_10px]"
                  style={{ width: `${100 - progressValue}%` }}
                ></div>
              </div>
              <div className="text-body-md font-600">{progressValue}%</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
