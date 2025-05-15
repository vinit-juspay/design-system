import { RotateCcw } from 'lucide-react';
import { capitaliseCamelCase } from './chartUtils';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import React, { useState, useRef, useCallback } from 'react';
import { DropdownMenu } from 'radix-ui';
import { useDebounce } from '../../hooks/useDebounce';
import {
  getChartLegendContainer,
  getChartLegendItem,
  getChartLegendItemsContainer,
  getChartLegendItemText,
  getChartLegendMarker,
  getChartLegendResetButton,
  getChartStackedLegendContainer,
} from './utils';
import { ChartLegendsProps } from './types';

const ChartLegendsComponent: React.FC<ChartLegendsProps> = ({
  keys,
  handleLegendClick,
  handleLegendEnter,
  handleLegendLeave,
  colors,
  chartContainerRef,
  selectedKeys,
  setSelectedKeys,
  hoveredKey,
  stacked = false,
}) => {
  if (stacked)
    return (
      <StackedLegends
        keys={keys}
        activeKeys={selectedKeys}
        handleLegendClick={handleLegendClick}
        colors={colors}
        handleLegendEnter={handleLegendEnter}
        handleLegendLeave={handleLegendLeave}
        hoveredKey={hoveredKey}
        selectedKeys={selectedKeys}
      />
    );

  const lastWidth = useRef<number>(0);
  const legendItemsContainerRef = useRef<HTMLDivElement>(null!);
  const [cuttOffIndex, setCuttOffIndex] = useState<number>(keys.length);

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
            onMouseLeave={handleLegendLeave}
            style={{
              opacity: hoveredKey
                ? hoveredKey === dataKey
                  ? 1
                  : 0.4
                : selectedKeys && selectedKeys.length > 0
                  ? selectedKeys.includes(dataKey)
                    ? 1
                    : 0.4
                  : 1,
            }}
          >
            <div
              className={getChartLegendMarker()}
              style={{
                backgroundColor: colors[index],
                opacity: 1,
              }}
            />
            <span
              className={getChartLegendItemText()}
              style={{
                color: '#717784',
              }}
            >
              {capitaliseCamelCase(dataKey)}
            </span>
          </div>
        ))}
        {cuttOffIndex < keys.length && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2 text-body-md font-medium h-full text-[#525866] hover:text-[#333]">
              + {keys.length - cuttOffIndex} more
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white z-50 rounded-md shadow-lg border border-gray-200 min-w-[180px]">
              {keys.slice(cuttOffIndex).map(dataKey => (
                <DropdownMenu.Item
                  key={dataKey}
                  className="px-4 py-2 text-[14px] hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLegendClick(dataKey)}
                  onMouseEnter={() => handleLegendEnter(dataKey)}
                  onMouseLeave={handleLegendLeave}
                  style={{
                    opacity: hoveredKey
                      ? hoveredKey === dataKey
                        ? 1
                        : 0.4
                      : selectedKeys && selectedKeys.length > 0
                        ? selectedKeys.includes(dataKey)
                          ? 1
                          : 0.4
                        : 1,
                  }}
                >
                  {capitaliseCamelCase(dataKey)}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
      {selectedKeys && selectedKeys.length > 0 && selectedKeys.length !== keys.length && (
        <button className={getChartLegendResetButton()} onClick={() => setSelectedKeys([])}>
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
  hoveredKey: string | null;
  selectedKeys: string[];
}> = ({
  keys,
  activeKeys,
  handleLegendClick,
  colors,
  handleLegendEnter,
  handleLegendLeave,
  hoveredKey,
  selectedKeys,
}) => {
  return (
    <div className={getChartStackedLegendContainer()}>
      {keys.map((key, index) => (
        <div
          key={key}
          className={getChartLegendItem()}
          onClick={() => handleLegendClick(key)}
          onMouseEnter={() => handleLegendEnter(key)}
          onMouseLeave={handleLegendLeave}
          style={{
            opacity: hoveredKey
              ? hoveredKey === key
                ? 1
                : 0.4
              : selectedKeys && selectedKeys.length > 0
                ? selectedKeys.includes(key)
                  ? 1
                  : 0.4
                : 1,
          }}
        >
          <div className={getChartLegendMarker()} style={{ backgroundColor: colors[index] }} />
          <span
            className={getChartLegendItemText()}
            style={{
              color: activeKeys && activeKeys.includes(key) ? '#333' : '#717784',
            }}
            title={capitaliseCamelCase(key)}
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
