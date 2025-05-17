import { forwardRef } from 'react';
import { Tooltip } from '@base-ui-components/react/tooltip';

interface BaseTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const BaseTooltip = forwardRef<HTMLDivElement, BaseTooltipProps>(({
  trigger,
  content,
}, ref) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={10}>
            <Tooltip.Popup ref={ref} className="bg-jp-gray-800 text-jp-gray-0 p-2 rounded-jp-sm">
              <Tooltip.Arrow />
              {content}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
});

BaseTooltip.displayName = 'BaseTooltip';

export default BaseTooltip;
