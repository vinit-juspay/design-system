import { useState } from 'react';
import { Popover } from '../../../lib/components/Popover';
import { Button, ButtonType } from '../../../lib/components/Button';
import { Placement, Alignment } from '../../../lib/components/Popover/types';

const PopoverDemo = () => {
  const [playgroundProps, setPlaygroundProps] = useState({
    placement: Placement.BOTTOM,
    alignment: Alignment.CENTER,
    showCloseButton: true,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    heading: 'Heading',
    description:
      'This is a popover. It displays additional content or actions when triggered by the user.',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    primaryButtonType: ButtonType.PRIMARY,
    secondaryButtonType: ButtonType.SECONDARY,
    primaryButtonDisabled: false,
    secondaryButtonDisabled: false,
  });

  const handlePropChange = (prop: string, value: any) => {
    setPlaygroundProps(prev => ({ ...prev, [prop]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Popover Component</h2>
        <p className="text-gray-600 mb-6">
          A popover component that displays content in a floating container next to a trigger
          element. It supports various placements, alignments, and can include headers,
          descriptions, and action buttons.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-3">Playground</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Placement</label>
              <select
                className="w-full p-2 border rounded"
                value={playgroundProps.placement}
                onChange={e => handlePropChange('placement', e.target.value)}
              >
                {Object.values(Placement).map(placement => (
                  <option key={placement} value={placement}>
                    {placement}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Alignment</label>
              <select
                className="w-full p-2 border rounded"
                value={playgroundProps.alignment}
                onChange={e => handlePropChange('alignment', e.target.value)}
              >
                {Object.values(Alignment).map(alignment => (
                  <option key={alignment} value={alignment}>
                    {alignment}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={playgroundProps.heading}
                onChange={e => handlePropChange('heading', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={playgroundProps.description}
                onChange={e => handlePropChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Options</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showCloseButton"
                  checked={playgroundProps.showCloseButton}
                  onChange={e => handlePropChange('showCloseButton', e.target.checked)}
                />
                <label htmlFor="showCloseButton">Show Close Button</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="closeOnEscape"
                  checked={playgroundProps.closeOnEscape}
                  onChange={e => handlePropChange('closeOnEscape', e.target.checked)}
                />
                <label htmlFor="closeOnEscape">Close on Escape</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="closeOnOutsideClick"
                  checked={playgroundProps.closeOnOutsideClick}
                  onChange={e => handlePropChange('closeOnOutsideClick', e.target.checked)}
                />
                <label htmlFor="closeOnOutsideClick">Close on Outside Click</label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary Button</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={playgroundProps.primaryButtonText}
                    onChange={e => handlePropChange('primaryButtonText', e.target.value)}
                    placeholder="Primary Button Text"
                  />
                  <select
                    className="w-full p-2 border rounded"
                    value={playgroundProps.primaryButtonType}
                    onChange={e => handlePropChange('primaryButtonType', e.target.value)}
                  >
                    {Object.values(ButtonType).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="primaryButtonDisabled"
                      checked={playgroundProps.primaryButtonDisabled}
                      onChange={e => handlePropChange('primaryButtonDisabled', e.target.checked)}
                    />
                    <label htmlFor="primaryButtonDisabled">Disabled</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Secondary Button</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={playgroundProps.secondaryButtonText}
                    onChange={e => handlePropChange('secondaryButtonText', e.target.value)}
                    placeholder="Secondary Button Text"
                  />
                  <select
                    className="w-full p-2 border rounded"
                    value={playgroundProps.secondaryButtonType}
                    onChange={e => handlePropChange('secondaryButtonType', e.target.value)}
                  >
                    {Object.values(ButtonType).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="secondaryButtonDisabled"
                      checked={playgroundProps.secondaryButtonDisabled}
                      onChange={e => handlePropChange('secondaryButtonDisabled', e.target.checked)}
                    />
                    <label htmlFor="secondaryButtonDisabled">Disabled</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center border rounded-lg p-8">
            <Popover
              trigger={<Button>Open Popover</Button>}
              {...playgroundProps}
              className="max-w-[480px]"
              onPrimaryButtonClick={() => console.log('Primary button clicked')}
              onSecondaryButtonClick={() => console.log('Secondary button clicked')}
            >
              <div className="">
                <p>
                  This is the popover content. You can customize the appearance and behavior using
                  the controls on the left.
                </p>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopoverDemo;
