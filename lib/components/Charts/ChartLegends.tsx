import { RotateCcw } from "lucide-react";
import { capitaliseCamelCase } from "./utils";
import { ChartType } from "./utils";
import { ChartLegendsProps } from "./utils";

export const ChartLegends: React.FC<ChartLegendsProps> = ({
  keys,
  activeKeys,
  handleLegendClick,
  colors,
  type,
  setSelectedKeys
}) => {
  return <div className="h-4 flex items-center gap-4 justify-between">
      <div className="h-4 flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
              {type === ChartType.PIE ?
                  keys.map((dataKey, index) => (
                      <div
                          key={dataKey}
                          className="flex items-center gap-2 pl-1 cursor-pointer shrink-0"
                          onClick={() => handleLegendClick(dataKey)}
                      >
                          <div
                              className="w-3 h-3 rounded-sm"
                              style={{
                                  backgroundColor: colors[index % colors.length],
                              }}
                          />
                          <span
                              className="text-[14px] font-medium"
                              style={{
                                  color: activeKeys && activeKeys.includes(dataKey) ? '#333' : '#717784',
                                  opacity: activeKeys && !activeKeys.includes(dataKey) ? 0.3 : 1
                              }}
                          >
                              {capitaliseCamelCase(dataKey)}
                          </span>
                      </div>
                  )) :
                  keys.map((dataKey, index) => (
                      <div
                          key={dataKey}
                          className="h-4 flex items-center gap-2 cursor-pointer shrink-0"
                          onClick={() => handleLegendClick(dataKey)}
                      >
                          <div
                              className="w-3 h-3 rounded-sm"
                              style={{
                                  backgroundColor: colors[index % colors.length],
                              }}
                          />
                          <span
                              className="text-[14px] font-medium"
                              style={{
                                  color: activeKeys && activeKeys.includes(dataKey) ? '#333' : '#717784',
                              }}
                          >
                              {capitaliseCamelCase(dataKey)}
                          </span>
                      </div>
                  ))
              }
          </div>
      </div>
      {activeKeys && activeKeys.length < keys.length && (
          <button
              className="text-sm flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-sm h-4 w-4 shrink-0"
              onClick={() => setSelectedKeys([])}
          >
              <RotateCcw className='w-3 h-3' />
          </button>
      )}
  </div>;
};
