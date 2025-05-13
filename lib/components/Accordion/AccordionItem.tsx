import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '../../utils';
import { AccordionItemProps, AccordionType, AccordionChevronPosition } from './types';
import {
  getAccordionItemClassNames,
  getAccordionTriggerClassNames,
  getAccordionContentClassNames,
  getAccordionTitleClassNames,
  getAccordionSubtextClassNames,
  getAccordionSlotClassNames,
  getAccordionHeaderRowClassNames,
  getAccordionChevronClassNames,
  getAccordionContentWrapperClassNames,
  getAccordionChevronIconClassNames,
} from './utils';

const AccordionItem = forwardRef<
  HTMLDivElement,
  AccordionItemProps & {
    accordionType?: AccordionType;
    chevronPosition?: AccordionChevronPosition;
  }
>(
  (
    {
      value,
      title,
      children,
      subtext,
      leftSlot,
      rightSlot,
      subtextSlot,
      isDisabled = false,
      chevronPosition = AccordionChevronPosition.RIGHT,
      className,
      accordionType = AccordionType.NO_BORDER,
    },
    ref
  ) => {
    const itemClassName = getAccordionItemClassNames(accordionType, isDisabled);
    const triggerClassName = getAccordionTriggerClassNames(accordionType, isDisabled);
    const contentClassName = getAccordionContentClassNames(accordionType);
    const titleClassName = getAccordionTitleClassNames(isDisabled);
    const subtextClassName = getAccordionSubtextClassNames(isDisabled);
    const headerRowClassName = getAccordionHeaderRowClassNames();
    const chevronClassName = getAccordionChevronClassNames(chevronPosition);
    const chevronIconClassName = getAccordionChevronIconClassNames(isDisabled);
    const contentWrapperClassName = getAccordionContentWrapperClassNames(accordionType);

    const ChevronComponent = (
      <div className={chevronClassName} aria-hidden="true">
        <ChevronDown className={chevronIconClassName} />
      </div>
    );

    return (
      <RadixAccordion.Item
        value={value}
        disabled={isDisabled}
        className={cn(itemClassName, className)}
        ref={ref}
        data-disabled={isDisabled || undefined}
      >
        <RadixAccordion.Header className="flex">
          <RadixAccordion.Trigger
            className={cn(
              triggerClassName,
              accordionType === AccordionType.BORDER && 'data-[state=open]:border-b border-gray-200'
            )}
            disabled={isDisabled}
            data-type={accordionType}
            data-disabled={isDisabled || undefined}
          >
            <div className="w-full relative">
              <div className={headerRowClassName}>
                {chevronPosition === AccordionChevronPosition.LEFT && ChevronComponent}
                {leftSlot && <div className={getAccordionSlotClassNames(true)}>{leftSlot}</div>}
                <div className={titleClassName}>{title}</div>
                {rightSlot && <div className={getAccordionSlotClassNames(false)}>{rightSlot}</div>}
                {chevronPosition === AccordionChevronPosition.RIGHT && ChevronComponent}
              </div>

              {(subtext || subtextSlot) && (
                <div
                  className={cn(
                    'flex items-center',
                    chevronPosition === AccordionChevronPosition.LEFT ? 'pl-8' : ''
                  )}
                >
                  {subtext && <div className={subtextClassName}>{subtext}</div>}
                  {subtextSlot && <div className="ml-2 flex-shrink-0">{subtextSlot}</div>}
                </div>
              )}
            </div>
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <RadixAccordion.Content className={contentClassName}>
          <div className={contentWrapperClassName}>{children}</div>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
