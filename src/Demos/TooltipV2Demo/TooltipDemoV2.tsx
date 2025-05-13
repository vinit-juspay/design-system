import { useState } from 'react';
import { Button } from '../../../lib/main';
import { Info, AlertCircle, HelpCircle, Settings } from 'lucide-react';
import { ButtonType } from '../../../lib/components/Button/types';
import TooltipV2 from '../../../lib/components/Tooltip/TooltipV2';
import {
  TooltipAlign,
  TooltipSide,
  TooltipSize,
  TooltipSlotDirection,
} from '../../../lib/components/Tooltip/types';

const TooltipDemoV2 = () => {
  const [config, setConfig] = useState({
    side: TooltipSide.TOP,
    align: TooltipAlign.CENTER,
    size: TooltipSize.SMALL,
    showArrow: true,
    slotDirection: TooltipSlotDirection.LEFT,
    delayDuration: 300,
    offset: 8,
    content: 'This is a tooltip',
    hasIcon: false,
    icon: 'info',
    showTooltip: false,
  });

  const icons = {
    info: <Info size={16} />,
    alert: <AlertCircle size={16} />,
    help: <HelpCircle size={16} />,
    settings: <Settings size={16} />,
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Tooltip Examples V2</h2>

      {/* Playground Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltip Playground</h3>
        <div className="grid grid-cols-2 gap-4 mb-8 p-4 border rounded-lg bg-gray-50">
          <div>
            <label className="block text-sm font-medium mb-2">Show Tooltip</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.showTooltip}
                onChange={e => setConfig({ ...config, showTooltip: e.target.checked })}
              />
              <span className="text-sm">Always show tooltip</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Show Arrow</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.showArrow}
                onChange={e => setConfig({ ...config, showArrow: e.target.checked })}
              />
              <span className="text-sm">Show Arrow</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Side</label>
            <select
              className="w-full p-2 border rounded"
              value={config.side}
              onChange={e => setConfig({ ...config, side: e.target.value as TooltipSide })}
            >
              {Object.values(TooltipSide).map(side => (
                <option key={side} value={side}>
                  {side.toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Align</label>
            <select
              className="w-full p-2 border rounded"
              value={config.align}
              onChange={e => setConfig({ ...config, align: e.target.value as TooltipAlign })}
            >
              {Object.values(TooltipAlign).map(align => (
                <option key={align} value={align}>
                  {align}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              className="w-full p-2 border rounded"
              value={config.size}
              onChange={e => setConfig({ ...config, size: e.target.value as TooltipSize })}
            >
              {Object.values(TooltipSize).map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slot Direction</label>
            <select
              className="w-full p-2 border rounded"
              value={config.slotDirection}
              onChange={e =>
                setConfig({ ...config, slotDirection: e.target.value as TooltipSlotDirection })
              }
            >
              {Object.values(TooltipSlotDirection).map(direction => (
                <option key={direction} value={direction}>
                  {direction}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Delay Duration (ms)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={config.delayDuration}
              onChange={e => {
                const value = e.target.value;
                setConfig({
                  ...config,
                  delayDuration: value === '' ? 0 : Number(value),
                });
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Offset (px)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={config.offset}
              onChange={e => setConfig({ ...config, offset: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={config.content}
              onChange={e => setConfig({ ...config, content: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Icon</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.hasIcon}
                onChange={e => setConfig({ ...config, hasIcon: e.target.checked })}
              />
              {config.hasIcon && (
                <select
                  className="p-2 border rounded"
                  value={config.icon}
                  onChange={e => setConfig({ ...config, icon: e.target.value })}
                >
                  {Object.keys(icons).map(icon => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex justify-center items-center h-32 border rounded-lg bg-white mb-8">
          <TooltipV2
            content={config.content}
            side={config.side}
            align={config.align}
            size={config.size}
            showArrow={config.showArrow}
            slotDirection={config.slotDirection}
            delayDuration={config.delayDuration}
            offset={config.offset}
            slot={config.hasIcon ? icons[config.icon as keyof typeof icons] : undefined}
            open={config.showTooltip}
          >
            <Button buttonType={ButtonType.PRIMARY}>Hover Me</Button>
          </TooltipV2>
        </div>

        {/* Current Config */}
        <div className="p-4 border rounded-lg bg-gray-50 mb-8">
          <h3 className="text-lg font-medium mb-2">Current Configuration</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </div>

      {/* Basic Tooltips */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Tooltips</h3>
        <div className="flex flex-wrap gap-4">
          <TooltipV2 content="This is a basic tooltip" side={TooltipSide.TOP}>
            <Button buttonType={ButtonType.PRIMARY}>Top Tooltip</Button>
          </TooltipV2>

          <TooltipV2 content="This is a basic tooltip" side={TooltipSide.BOTTOM}>
            <Button buttonType={ButtonType.PRIMARY}>Bottom Tooltip</Button>
          </TooltipV2>

          <TooltipV2 content="This is a basic tooltip" side={TooltipSide.LEFT}>
            <Button buttonType={ButtonType.PRIMARY}>Left Tooltip</Button>
          </TooltipV2>

          <TooltipV2 content="This is a basic tooltip" side={TooltipSide.RIGHT}>
            <Button buttonType={ButtonType.PRIMARY}>Right Tooltip</Button>
          </TooltipV2>
        </div>
      </div>

      {/* Tooltips with Icons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <TooltipV2
            content="Information tooltip"
            side={TooltipSide.TOP}
            slot={<Info size={16} />}
            slotDirection={TooltipSlotDirection.LEFT}
          >
            <Button buttonType={ButtonType.PRIMARY} leadingIcon={Info}>
              Info
            </Button>
          </TooltipV2>

          <TooltipV2
            content="Alert tooltip"
            side={TooltipSide.TOP}
            slot={<AlertCircle size={16} />}
            slotDirection={TooltipSlotDirection.LEFT}
          >
            <Button buttonType={ButtonType.PRIMARY} leadingIcon={AlertCircle}>
              Alert
            </Button>
          </TooltipV2>

          <TooltipV2
            content="Help tooltip"
            side={TooltipSide.TOP}
            slot={<HelpCircle size={16} />}
            slotDirection={TooltipSlotDirection.LEFT}
          >
            <Button buttonType={ButtonType.PRIMARY} leadingIcon={HelpCircle}>
              Help
            </Button>
          </TooltipV2>

          <TooltipV2
            content="Settings tooltip"
            side={TooltipSide.TOP}
            slot={<Settings size={16} />}
            slotDirection={TooltipSlotDirection.LEFT}
          >
            <Button buttonType={ButtonType.PRIMARY} leadingIcon={Settings}>
              Settings
            </Button>
          </TooltipV2>
        </div>
      </div>

      {/* Tooltips with Different Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Different Sizes</h3>
        <div className="flex flex-wrap gap-4">
          <TooltipV2 content="Small tooltip" side={TooltipSide.TOP} size={TooltipSize.SMALL}>
            <Button buttonType={ButtonType.PRIMARY}>Small</Button>
          </TooltipV2>

          <TooltipV2 content="Medium tooltip" side={TooltipSide.TOP} size={TooltipSize.LARGE}>
            <Button buttonType={ButtonType.PRIMARY}>Medium</Button>
          </TooltipV2>

          <TooltipV2 content="Large tooltip" side={TooltipSide.TOP} size={TooltipSize.LARGE}>
            <Button buttonType={ButtonType.PRIMARY}>Large</Button>
          </TooltipV2>
        </div>
      </div>

      {/* Tooltips with Custom Content */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Custom Content</h3>
        <div className="flex flex-wrap gap-4">
          <TooltipV2
            content={
              <div className="p-2">
                <h4 className="font-bold mb-1">Custom Tooltip</h4>
                <p>This is a custom tooltip with HTML content</p>
              </div>
            }
            side={TooltipSide.TOP}
            size={TooltipSize.SMALL}
          >
            <Button buttonType={ButtonType.PRIMARY}>Custom Content</Button>
          </TooltipV2>

          <TooltipV2
            content={
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <Info size={16} />
                  <span>Icon with text</span>
                </div>
              </div>
            }
            side={TooltipSide.TOP}
            size={TooltipSize.LARGE}
          >
            <Button buttonType={ButtonType.PRIMARY}>Icon + Text</Button>
          </TooltipV2>
        </div>
      </div>

      {/* Tooltips with Different Alignments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tooltips with Different Alignments</h3>
        <div className="flex flex-wrap gap-4">
          <TooltipV2
            content="Start aligned tooltip"
            side={TooltipSide.TOP}
            align={TooltipAlign.START}
          >
            <Button buttonType={ButtonType.PRIMARY}>Start Aligned</Button>
          </TooltipV2>

          <TooltipV2
            content="Center aligned tooltip"
            side={TooltipSide.TOP}
            align={TooltipAlign.CENTER}
          >
            <Button buttonType={ButtonType.PRIMARY}>Center Aligned</Button>
          </TooltipV2>

          <TooltipV2 content="End aligned tooltip" side={TooltipSide.TOP} align={TooltipAlign.END}>
            <Button buttonType={ButtonType.PRIMARY}>End Aligned</Button>
          </TooltipV2>
        </div>
      </div>
    </>
  );
};

export default TooltipDemoV2;
