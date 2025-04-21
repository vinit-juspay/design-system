import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { getArrowClassNames, getSlotClassNames, getTooltipClassNames } from './utils';
import { TooltipProps, TooltipSide, TooltipSize, TooltipSlotDirection } from './types';
import { forwardRef } from 'react';

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      open,
      side,
      align,
      showArrow = true,
      size = TooltipSize.SMALL,
      slot,
      slotDirection = TooltipSlotDirection.LEFT,
      delayDuration = 300,
      offset = 4,
    },
    ref
  ) => {
    const tooltipClassName = getTooltipClassNames(size);
    const arrowWidth = size === TooltipSize.SMALL ? 8 : 12;
    const arrowHeight = size === TooltipSize.SMALL ? 4 : 6;

    return (
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root open={open}>
          <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            className={tooltipClassName}
            sideOffset={offset}
            arrowPadding={side === TooltipSide.LEFT || side === TooltipSide.RIGHT ? 8 : 6}
          >
            {slot && slotDirection === TooltipSlotDirection.LEFT && (
              <div className={getSlotClassNames(slotDirection, size)}>{slot}</div>
            )}
            {content}
            {slot && slotDirection === TooltipSlotDirection.RIGHT && (
              <div className={getSlotClassNames(slotDirection, size)}>{slot}</div>
            )}
            {showArrow && (
              <TooltipPrimitive.Arrow
                width={arrowWidth}
                height={arrowHeight}
                className={getArrowClassNames()}
              />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
