import { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../utils';
import { DateRangePreset } from './types';
import { getPresetLabel } from './utils';

interface QuickRangeSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  activePreset: DateRangePreset;
  onPresetSelect: (preset: DateRangePreset) => void;
  excludeCustom?: boolean;
  className?: string;
}

/**
 * QuickRangeSelector component for selecting date range presets
 */
const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
  ({ isOpen, onToggle, activePreset, onPresetSelect, excludeCustom = false, className }, ref) => {
    // Get the active preset label
    const activePresetLabel = getPresetLabel(activePreset);

    return (
      <div className={cn('relative w-full', className)} ref={ref}>
        <div
          className={cn(
            'border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer w-full',
            'hover:border-gray-400 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
          )}
          onClick={onToggle}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-gray-700">{activePresetLabel}</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>

        {isOpen && (
          <div
            className={cn(
              'absolute z-20 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-full',
              'max-h-60 overflow-y-auto'
            )}
            role="listbox"
            aria-labelledby="date-range-preset-selector"
          >
            <div className="p-1">
              {Object.values(DateRangePreset)
                .filter(preset => !excludeCustom || preset !== DateRangePreset.CUSTOM)
                .map(preset => (
                  <button
                    key={preset}
                    onClick={() => {
                      onPresetSelect(preset);
                      onToggle(); // Close the dropdown after selection
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-150',
                      'focus:outline-none focus:bg-gray-50',
                      activePreset === preset && 'bg-primary-50 text-primary-700 font-medium'
                    )}
                    role="option"
                    aria-selected={activePreset === preset}
                  >
                    {getPresetLabel(preset)}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

QuickRangeSelector.displayName = 'QuickRangeSelector';

export default QuickRangeSelector;
