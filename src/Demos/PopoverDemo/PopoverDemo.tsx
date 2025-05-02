import { useState } from 'react';
import { Info, Settings, Bell, User, HelpCircle } from 'lucide-react';
import { Popover } from '../../../lib/components/Popover/Popover';
import { Button } from '../../../lib/components/Button';

const PopoverDemo = () => {
  const [placement, setPlacement] = useState<string>('bottom');
  const [showArrow, setShowArrow] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(true);
  const [offset, setOffset] = useState(8);
  const [controlledOpen, setControlledOpen] = useState(false);

  const placements = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
  ];

  const renderControls = () => (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Placement</label>
        <select
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={placement}
          onChange={e => setPlacement(e.target.value)}
        >
          {placements.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Offset</label>
        <input
          type="number"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={offset}
          onChange={e => setOffset(Number(e.target.value))}
          min={0}
          max={50}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showArrow}
              onChange={e => setShowArrow(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Arrow</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={closeOnEscape}
              onChange={e => setCloseOnEscape(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Close on Escape</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={closeOnOutsideClick}
              onChange={e => setCloseOnOutsideClick(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Close on Outside Click</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Controlled Mode</label>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setControlledOpen(!controlledOpen)}
          >
            {controlledOpen ? 'Close Popover' : 'Open Popover'}
          </button>
          <span className="text-sm text-gray-500">
            Current state: {controlledOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
    </div>
  );

  const renderBasicPopover = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Standard Popover</h3>
      <div className="flex items-center justify-center p-8 border border-dashed border-gray-300 rounded-md">
        <Popover
          placement={placement as any}
          showArrow={showArrow}
          closeOnEscape={closeOnEscape}
          closeOnOutsideClick={closeOnOutsideClick}
          offset={offset}
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">Popover Title</h4>
              <p className="text-sm">This is a basic popover content with some additional information.</p>
            </div>
          }
        >
          <Button>Click to Toggle</Button>
        </Popover>
      </div>
    </div>
  );

  const renderControlledPopover = () => (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-medium text-gray-900">Controlled Popover</h3>
      <div className="flex items-center justify-center p-8 border border-dashed border-gray-300 rounded-md">
        <Popover
          placement={placement as any}
          showArrow={showArrow}
          closeOnEscape={closeOnEscape}
          closeOnOutsideClick={closeOnOutsideClick}
          offset={offset}
          open={controlledOpen}
          onOpenChange={setControlledOpen}
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">Controlled Popover</h4>
              <p className="text-sm">This popover's open state is controlled externally.</p>
              <button
                className="mt-2 px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300"
                onClick={() => setControlledOpen(false)}
              >
                Close
              </button>
            </div>
          }
        >
          <Button>Controlled Popover</Button>
        </Popover>
      </div>
    </div>
  );

  const renderCustomStyledPopovers = () => (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-medium text-gray-900">Custom Styled Popovers</h3>
      <div className="flex flex-wrap gap-4 justify-center p-4 border border-dashed border-gray-300 rounded-md">
        <Popover
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">Info Popover</h4>
              <p className="text-sm">Contains helpful information for the user.</p>
            </div>
          }
          contentClassName="bg-blue-50 border-blue-200 text-blue-800"
          arrowClassName="bg-blue-50 border-blue-200"
          showArrow={true}
        >
          <div className="flex items-center gap-1 text-blue-500 cursor-pointer px-3 py-2 rounded hover:bg-blue-50">
            <Info size={16} />
            <span>Information</span>
          </div>
        </Popover>

        <Popover
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">Settings Menu</h4>
              <ul className="space-y-1 mt-2">
                <li className="text-sm hover:bg-gray-100 p-1 rounded cursor-pointer">Profile Settings</li>
                <li className="text-sm hover:bg-gray-100 p-1 rounded cursor-pointer">Account Settings</li>
                <li className="text-sm hover:bg-gray-100 p-1 rounded cursor-pointer">Privacy Settings</li>
              </ul>
            </div>
          }
          contentClassName="bg-white shadow-lg border-gray-100"
          placement="bottom-end"
          showArrow={false}
        >
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <Settings size={18} />
          </div>
        </Popover>

        <Popover
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">Notifications</h4>
              <div className="space-y-2 mt-2">
                <div className="text-xs p-2 bg-gray-50 rounded">
                  <span className="font-medium">System update:</span> New features available
                </div>
                <div className="text-xs p-2 bg-gray-50 rounded">
                  <span className="font-medium">Message:</span> You have a new message
                </div>
              </div>
            </div>
          }
          contentClassName="bg-white shadow-lg border-gray-100 min-w-[200px]"
          placement="bottom-end"
          showArrow={true}
        >
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <Bell size={18} />
          </div>
        </Popover>

        <Popover
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">User Profile</h4>
              <div className="flex items-center gap-2 border-b pb-2 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-gray-500">john.doe@example.com</div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="hover:bg-gray-100 p-1 rounded cursor-pointer">My Account</div>
                <div className="hover:bg-gray-100 p-1 rounded cursor-pointer">Settings</div>
                <div className="hover:bg-gray-100 p-1 rounded cursor-pointer text-red-500">Logout</div>
              </div>
            </div>
          }
          contentClassName="bg-white shadow-lg border-gray-100 min-w-[200px]"
          placement="bottom-end"
          showArrow={true}
        >
          <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-100">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span>Profile</span>
          </div>
        </Popover>
      </div>
    </div>
  );

  const renderHelpPopover = () => (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-medium text-gray-900">Help Tooltip Style</h3>
      <div className="flex items-center justify-center p-8 border border-dashed border-gray-300 rounded-md">
        <div className="text-center relative">
          <span className="text-sm">Hover over the help icon for more information</span>
          <Popover
            content={
              <div className="p-2">
                <p className="text-sm">This is a tooltip-style popover that appears on hover.</p>
              </div>
            }
            contentClassName="bg-black text-white border-none"
            arrowClassName="bg-black border-none"
            placement="top"
            showArrow={true}
            offset={12}
          >
            <div className="inline-flex ml-2 text-gray-500 cursor-help">
              <HelpCircle size={16} />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Popover Demo</h2>
      <div className='w-full flex justify-center'>

        <Popover
          content={
            <div className="p-2">
              <h4 className="text-sm font-semibold mb-1">User Profile</h4>
              <div className="flex items-center gap-2 border-b pb-2 mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-gray-500">john.doe@example.com</div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="hover:bg-gray-100 p-1 rounded cursor-pointer">My Account</div>
                <div className="hover:bg-gray-100 p-1 rounded cursor-pointer">Settings</div>
                <div className="hover:bg-gray-100 p-1 rounded cursor-pointer text-red-500">Logout</div>
              </div>
            </div>
          }
          contentClassName="bg-white shadow-lg border-gray-100 min-w-[200px]"
          placement="left"
          showArrow={true}
        >
          <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-100">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span>Profile</span>
          </div>
        </Popover>
      </div>
      {renderControls()}
      {renderBasicPopover()}
      {renderControlledPopover()}
      {renderCustomStyledPopovers()}
      {renderHelpPopover()}
    </div>
  );
};

export default PopoverDemo; 