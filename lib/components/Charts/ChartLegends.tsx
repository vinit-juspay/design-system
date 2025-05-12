import { RotateCcw } from 'lucide-react';
import { capitaliseCamelCase } from './utils';
import { ChartLegendsProps } from './types';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { DropdownMenu } from 'radix-ui';
import { useDebounce } from '../../hooks/useDebounce';
import {
  getChartLegendContainer,
  getChartLegendItem,
  getChartLegendItemsContainer,
  getChartLegendMarker,
  getChartLegendResetButton,
} from './themeUtils';
const ChartLegendsComponent: React.FC<ChartLegendsProps> = ({
  keys,
  activeKeys,
  handleLegendClick,
  colors,
  chartContainerRef,
  stacked = false,
  onReset,
  handleLegendEnter,
  handleLegendLeave,
  hoveredKey,
}) => {
  const legendColors = useMemo(() => keys.map((_, i) => colors[i % colors.length]), [keys, colors]);

  if (stacked)
    return (
      <StackedLegends
        keys={keys}
        activeKeys={activeKeys}
        handleLegendClick={handleLegendClick}
        colors={legendColors}
        handleLegendEnter={handleLegendEnter}
        handleLegendLeave={handleLegendLeave}
      />
    );

  const lastWidth = useRef<number>(0);
  const legendItemsContainerRef = useRef<HTMLDivElement>(null!);
  const [cuttOffIndex, setCuttOffIndex] = useState<number>(keys.length);

  const highlight = useCallback((element: HTMLElement, className: string) => {
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, 200);
  }, []);

  const handleResize = useCallback(() => {
    if (!legendItemsContainerRef.current) return;
    const { right: containerRight } = legendItemsContainerRef.current.getBoundingClientRect();
    const BUFFER = 120;
    const legendItems = Array.from(legendItemsContainerRef.current.children);

    let currentIndex = 0;
    for (const item of legendItems) {
      const itemRight = item.getBoundingClientRect().right;
      if (itemRight + BUFFER > containerRight) {
        if (cuttOffIndex >= currentIndex) {
          setCuttOffIndex(currentIndex);
          return;
        }
      }
      currentIndex++;
    }
    if (currentIndex !== cuttOffIndex) {
      setCuttOffIndex(currentIndex);
    }
  }, [cuttOffIndex]);

  const debouncedResize = useDebounce(handleResize, 100);

  useResizeObserver(chartContainerRef, ({ width }) => {
    if (width && width !== lastWidth.current) {
      lastWidth.current = width;
      highlight(chartContainerRef.current, 'bg-red-500/20');
      debouncedResize();
    }
  });

  return (
    <div className={getChartLegendContainer()}>
      <div className={getChartLegendItemsContainer()} ref={legendItemsContainerRef}>
        {keys.slice(0, cuttOffIndex).map((dataKey, index) => (
          <div
            key={dataKey}
            className={getChartLegendItem()}
            onClick={() => handleLegendClick(dataKey)}
            onMouseEnter={() => handleLegendEnter(dataKey)}
            onMouseLeave={() => handleLegendLeave()}
          >
            <div
              className={getChartLegendMarker()}
              style={{
                backgroundColor: colors[index],
                opacity: hoveredKey
                  ? hoveredKey === dataKey
                    ? 1
                    : 0.4
                  : activeKeys && activeKeys.length > 0
                    ? activeKeys.includes(dataKey)
                      ? 1
                      : 0.4
                    : 1,
              }}
            />
            <span
              className="text-[14px] font-medium"
              style={{
                color: hoveredKey
                  ? hoveredKey === dataKey
                    ? '#333'
                    : '#99A0AE'
                  : activeKeys && activeKeys.length > 0
                    ? activeKeys.includes(dataKey)
                      ? '#333'
                      : '#D1D5DB'
                    : '#333',
              }}
            >
              {capitaliseCamelCase(dataKey)}
            </span>
          </div>
        ))}
        {cuttOffIndex < keys.length && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2 text-body-md font-medium h-full text-gray-600 hover:text-[#333]">
              + {keys.length - cuttOffIndex} more
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white z-50 rounded-md shadow-lg border border-gray-200 min-w-[180px]">
              {keys.slice(cuttOffIndex).map(dataKey => (
                <DropdownMenu.Item
                  key={dataKey}
                  className="px-4 py-2 text-[14px] hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLegendClick(dataKey)}
                  // onMouseOver={() => setHoveredKey(dataKey)}
                  onMouseEnter={() => handleLegendEnter(dataKey)}
                  onMouseLeave={handleLegendLeave}
                >
                  {capitaliseCamelCase(dataKey)}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
      {activeKeys && activeKeys.length > 0 && activeKeys.length !== keys.length && (
        <button className={getChartLegendResetButton()} onClick={onReset}>
          <RotateCcw className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

const StackedLegends: React.FC<{
  keys: string[];
  activeKeys: string[] | null;
  handleLegendClick: (dataKey: string) => void;
  colors: string[];
  handleLegendEnter: (dataKey: string) => void;
  handleLegendLeave: () => void;
}> = ({ keys, activeKeys, handleLegendClick, colors, handleLegendEnter, handleLegendLeave }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center gap-2">
      {keys.map((key, index) => (
        <div
          key={key}
          className={getChartLegendItem()}
          onClick={() => handleLegendClick(key)}
          onMouseEnter={() => handleLegendEnter(key)}
          onMouseLeave={handleLegendLeave}
        >
          <div className={getChartLegendMarker()} style={{ backgroundColor: colors[index] }} />
          <span
            className="text-[14px] font-medium"
            style={{
              color: activeKeys && activeKeys.includes(key) ? '#333' : '#717784',
            }}
          >
            {capitaliseCamelCase(key)}
          </span>
        </div>
      ))}
    </div>
  );
};

ChartLegendsComponent.displayName = 'ChartLegends';

export const ChartLegends = React.memo(ChartLegendsComponent);
