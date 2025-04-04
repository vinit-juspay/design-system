// import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { TooltipProps } from './Tooltip.types';
import { getTooltipClassNames, getArrowStyles, getContentContainerClassNames } from './Tooltip.utils';

/**
 * Tooltip component built on top of Radix UI tooltip primitive
 * Provides contextual information when hovering over elements
 * 
 * @component
 * @example
 * // Basic usage
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * 
 * // With custom slot (e.g. icon)
 * <Tooltip content="Custom tooltip" arrow="right" hasSlot slot={InfoIcon} slotDirection="left">
 *   <span>Hover for info</span>
 * </Tooltip>
 */

const Tooltip = ({
  children,
  content,
  size = 'sm',
  arrow = 'default',
  hasSlot = false,
  slotDirection = 'left',
  slot: Slot,
  providerProps = { delayDuration: 300 },
  rootProps,
  contentProps,
}: TooltipProps) => {
  const tooltipClassNames = getTooltipClassNames(size);
  const { arrowClassName, side, align, showArrow } = getArrowStyles(arrow);
  const contentContainerClassNames = getContentContainerClassNames();

  return (
    <RadixTooltip.Provider delayDuration={providerProps.delayDuration}>
      <RadixTooltip.Root {...rootProps}>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={5}
            side={side as RadixTooltip.TooltipContentProps['side']}
            align={align as RadixTooltip.TooltipContentProps['align']}
            className={tooltipClassNames}
            {...contentProps}
          >
            <div className={contentContainerClassNames}>
              {hasSlot && slotDirection === 'left' && Slot && (
                <Slot className="mr-2 h-4 w-4" />
              )}
              {content}
              {hasSlot && slotDirection === 'right' && Slot && (
                <Slot className="ml-2 h-4 w-4" />
              )}
            </div>
            {showArrow && <RadixTooltip.Arrow className={arrowClassName} />}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip; 