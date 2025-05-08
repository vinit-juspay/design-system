import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';
import { cn } from '../../utils';
import {
  AccordionProps,
  AccordionItemProps,
  AccordionType,
  AccordionChevronPosition,
} from './types';
import {
  getAccordionRootClassNames,
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

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      type = AccordionType.NO_BORDER,
      defaultValue,
      value,
      isCollapsible = true,
      isMultiple = false,
      onValueChange,
      className,
    },
    ref
  ) => {
    const rootClassName = getAccordionRootClassNames(type, className);

    const baseProps = {
      collapsible: isCollapsible,
      className: rootClassName,
      ref: ref,
    };

    return isMultiple ? (
      <RadixAccordion.Root
        type="multiple"
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={onValueChange as ((value: string[]) => void) | undefined}
        {...baseProps}
      >
        {renderChildren()}
      </RadixAccordion.Root>
    ) : (
      <RadixAccordion.Root
        type="single"
        value={value as string | undefined}
        defaultValue={defaultValue as string | undefined}
        onValueChange={onValueChange as ((value: string) => void) | undefined}
        {...baseProps}
      >
        {renderChildren()}
      </RadixAccordion.Root>
    );

    function renderChildren() {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        const childProps = {
          ...(child.props as object),
          accordionType: type,
        };

        return React.cloneElement(child, childProps);
      });
    }
  }
);

Accordion.displayName = 'Accordion';

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
            className={triggerClassName}
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

export { Accordion, AccordionItem };
