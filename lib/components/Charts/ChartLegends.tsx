import { RotateCcw } from "lucide-react";
import { capitaliseCamelCase } from "./utils";
import { ChartLegendsProps } from "./types";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { DropdownMenu } from "radix-ui";
import { useDebounce } from "../../hooks/useDebounce";

const ChartLegendsComponent: React.FC<ChartLegendsProps> = ({
    keys,
    activeKeys,
    handleLegendClick,
    colors,
    setSelectedKeys,
    chartContainerRef,
    stacked = false,
    setHoveredKey
}) => {

    const legendColors = useMemo(
        () => keys.map((_, i) => colors[i % colors.length]),
        [keys, colors]
    );

    if (stacked) return <StackedLegends
        keys={keys}
        activeKeys={activeKeys}
        handleLegendClick={handleLegendClick}
        colors={legendColors}
        setSelectedKeys={setSelectedKeys}
    />

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
            highlight(chartContainerRef.current, "bg-red-500/20");
            debouncedResize();
        }
    });


    return (
        <div className="flex items-center gap-8 justify-between">
            <div
                className="flex h-7 items-center overflow-x-hidden overflow-visible whitespace-nowrap flex-1"
                ref={legendItemsContainerRef}
            >
                {keys.slice(0, cuttOffIndex).map((dataKey, index) => (
                    <div
                        key={dataKey}
                        className="h-4 flex items-center gap-2 cursor-pointer pr-4"
                        onClick={() => handleLegendClick(dataKey)}
                        // onMouseEnter={() => setHoveredKey(dataKey)}
                        // onMouseLeave={() => setHoveredKey(null)}
                        onMouseOver={() => setHoveredKey(dataKey)}
                    >
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: legendColors[index] }}
                        />
                        <span
                            className="text-[14px] font-medium"
                            style={{
                                color:
                                    activeKeys && activeKeys.includes(dataKey)
                                        ? "#333"
                                        : "#717784",
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
                            {keys.slice(cuttOffIndex).map((dataKey) => (
                                <DropdownMenu.Item
                                    key={dataKey}
                                    className="px-4 py-2 text-[14px] hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleLegendClick(dataKey)}
                                    onMouseOver={() => setHoveredKey(dataKey)}
                                >
                                    {capitaliseCamelCase(dataKey)}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </div>
            {activeKeys && activeKeys.length > 0 && <button
                className="text-sm flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm h-4 w-4 shrink-0"
                onClick={() => setSelectedKeys([])}
            >
                <RotateCcw className="w-3 h-3" />
            </button>}
        </div>
    );
};


const StackedLegends: React.FC<{
    keys: string[];
    activeKeys: string[] | null;
    handleLegendClick: (dataKey: string) => void;
    colors: string[];
    setSelectedKeys: (keys: string[]) => void;
}> = ({
    keys,
    activeKeys,
    handleLegendClick,
    colors,
    setSelectedKeys,
}) => {
        return <div className="h-full w-full flex flex-col justify-center gap-2">
            {
                keys.map((key, index) => (
                    <div
                        key={key}
                        className="h-4 flex items-center gap-2 cursor-pointer justify-start"
                        onClick={() => handleLegendClick(key)}
                    >
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: colors[index] }}
                        />
                        <span
                            className="text-[14px] font-medium"
                            style={{
                                color:
                                    activeKeys && activeKeys.includes(key)
                                        ? "#333"
                                        : "#717784",
                            }}
                        >
                            {capitaliseCamelCase(key)}
                        </span>
                    </div>
                ))
            }
        </div>
    }

ChartLegendsComponent.displayName = "ChartLegends";

export const ChartLegends = React.memo(ChartLegendsComponent);
