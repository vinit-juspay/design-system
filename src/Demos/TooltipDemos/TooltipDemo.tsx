import { Button } from '../../../lib/main';
import {
  TooltipAlign,
  TooltipSlotDirection,
  TooltipSide,
  TooltipSize,
} from '../../../lib/components/Tooltip/types';
import { Tooltip } from '../../../lib/main';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { ButtonSize } from '../../../lib/components/Button/types';
import { ButtonType } from '../../../lib/components/Button/types';

const TooltipDemo = () => {
  const [content, setContent] = useState('This is a tooltip');
  const [side, setSide] = useState(TooltipSide.TOP);
  const [align, setAlign] = useState(TooltipAlign.CENTER);
  const [size, setSize] = useState(TooltipSize.SMALL);
  const [showArrow, setShowArrow] = useState(true);
  const [delayDuration, setDelayDuration] = useState(300);
  const [useSlot, setUseSlot] = useState(false);
  const [slotDirection, setSlotDirection] = useState(TooltipSlotDirection.LEFT);
  const [customOpen, setCustomOpen] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tooltip Component Playground</h1>

          {/* Global tooltip control */}
          <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
            <input
              type="checkbox"
              id="globalOpen"
              checked={globalOpen}
              onChange={e => setGlobalOpen(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="globalOpen" className="font-medium text-blue-700">
              Show All Tooltips
            </label>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex flex-col gap-4 items-center justify-center min-h-32 p-8 border border-gray-200 rounded-lg">
          <Tooltip
            content={content}
            side={side}
            align={align}
            showArrow={showArrow}
            size={size}
            delayDuration={delayDuration}
            slot={useSlot ? <Info size={16} /> : null}
            slotDirection={slotDirection}
            open={globalOpen ? true : controlOpen ? customOpen : undefined}
          >
            <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.SMALL}>
              Hover me
            </Button>
          </Tooltip>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-medium">Content</label>
              <input
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Side</label>
              <select
                value={side}
                onChange={e => setSide(e.target.value as TooltipSide)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value={TooltipSide.TOP}>Top</option>
                <option value={TooltipSide.RIGHT}>Right</option>
                <option value={TooltipSide.BOTTOM}>Bottom</option>
                <option value={TooltipSide.LEFT}>Left</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Align</label>
              <select
                value={align}
                onChange={e => setAlign(e.target.value as TooltipAlign)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value={TooltipAlign.START}>Start</option>
                <option value={TooltipAlign.CENTER}>Center</option>
                <option value={TooltipAlign.END}>End</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Size</label>
              <select
                value={size}
                onChange={e => setSize(e.target.value as TooltipSize)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value={TooltipSize.SMALL}>Small</option>
                <option value={TooltipSize.LARGE}>Large</option>
              </select>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showArrow"
                checked={showArrow}
                onChange={e => setShowArrow(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showArrow" className="font-medium">
                Show Arrow
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">Delay Duration (ms)</label>
              <input
                type="number"
                value={delayDuration}
                onChange={e => setDelayDuration(Number(e.target.value))}
                min="0"
                max="1000"
                step="50"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useSlot"
                checked={useSlot}
                onChange={e => setUseSlot(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="useSlot" className="font-medium">
                Use Icon Slot
              </label>
            </div>

            {useSlot && (
              <div>
                <label className="block mb-2 font-medium">Slot Direction</label>
                <select
                  value={slotDirection}
                  onChange={e => setSlotDirection(e.target.value as TooltipSlotDirection)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value={TooltipSlotDirection.LEFT}>Left</option>
                  <option value={TooltipSlotDirection.RIGHT}>Right</option>
                </select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="controlOpen"
                checked={controlOpen}
                onChange={e => setControlOpen(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="controlOpen" className="font-medium">
                Control Open State
              </label>
            </div>

            {controlOpen && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="customOpen"
                  checked={customOpen}
                  onChange={e => setCustomOpen(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="customOpen" className="font-medium">
                  Open
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipDemo;
