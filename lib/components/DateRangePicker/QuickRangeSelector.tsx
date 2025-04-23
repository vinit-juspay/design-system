import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils";
import { DateRangePreset } from "./types";
import { getPresetLabel } from "./utils";

interface QuickRangeSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  activePreset: DateRangePreset;
  onPresetSelect: (preset: DateRangePreset) => void;
  excludeCustom?: boolean;
}

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(({
  isOpen,
  onToggle,
  activePreset,
  onPresetSelect,
  excludeCustom = false
}, ref) => {
  return (
    <div className="relative mr-1 w-full" ref={ref}>
      <div 
        className="border border-gray-300 rounded-l-md p-2 flex justify-between items-center cursor-pointer w-full"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <span className="mr-2">Date Filters</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-20 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-full">
          <div className="p-2">
            {Object.values(DateRangePreset)
              .filter(preset => !excludeCustom || preset !== DateRangePreset.CUSTOM)
              .map(preset => (
                <button 
                  key={preset}
                  onClick={() => onPresetSelect(preset)} 
                  className={cn(
                    "w-full text-left p-2 hover:bg-gray-100 rounded",
                    activePreset === preset && "bg-primary-50 text-primary-700"
                  )}
                >
                  {getPresetLabel(preset)}
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
});

QuickRangeSelector.displayName = "QuickRangeSelector";

export default QuickRangeSelector; 