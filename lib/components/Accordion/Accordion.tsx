import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../utils";
import {
  AccordionProps,
  AccordionItemProps,
  AccordionVariant,
  AccordionType
} from "./types";
import {
  getAccordionRootClassNames,
  getAccordionItemClassNames,
  getAccordionTriggerClassNames,
  getAccordionContentClassNames,
  getAccordionTitleClassNames,
  getAccordionSubtextClassNames,
  getAccordionSlotClassNames,
  getAccordionHeaderRowClassNames,
  getAccordionChevronClassNames
} from "./utils";

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  children,
  variant = AccordionVariant.BORDERED,
  type = AccordionType.NO_BORDER,
  defaultValue,
  value,
  isCollapsible = true,
  isMultiple = false,
  onValueChange,
  className,
}, ref) => {
  const rootClassName = getAccordionRootClassNames(variant, type, className);
  
  const accordionType = isMultiple ? "multiple" : "single";
  
  const accordionProps = isMultiple
    ? {
        type: accordionType as "multiple",
        value: (value as string[]) || undefined,
        defaultValue: (defaultValue as string[]) || undefined,
        onValueChange: (onValueChange as ((value: string[]) => void)) || undefined,
        collapsible: isCollapsible
      }
    : {
        type: accordionType as "single",
        value: (value as string) || undefined,
        defaultValue: (defaultValue as string) || undefined,
        onValueChange: (onValueChange as ((value: string) => void)) || undefined,
        collapsible: isCollapsible
      };
  
  return (
    <RadixAccordion.Root 
      className={rootClassName}
      ref={ref}
      {...accordionProps}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
          // @ts-ignore - This is a valid operation, passing parent's variant/type to children
          accordionVariant: variant,
          accordionType: type
        });
      })}
    </RadixAccordion.Root>
  );
});

Accordion.displayName = "Accordion";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps & { 
  accordionVariant?: AccordionVariant;
  accordionType?: AccordionType;
}>(({
  value,
  title,
  subtext,
  leftSlot,
  rightSlot,
  subtextSlot,
  children,
  isDisabled = false,
  className,
  accordionVariant = AccordionVariant.BORDERED,
  accordionType = AccordionType.NO_BORDER,
}, ref) => {
  const itemClassName = getAccordionItemClassNames(accordionVariant, accordionType);
  const triggerClassName = getAccordionTriggerClassNames(accordionVariant, accordionType, isDisabled);
  const contentClassName = getAccordionContentClassNames(accordionVariant, accordionType);
  const titleClassName = getAccordionTitleClassNames();
  const subtextClassName = getAccordionSubtextClassNames();
  const headerRowClassName = getAccordionHeaderRowClassNames();
  const chevronClassName = getAccordionChevronClassNames();
  
  const contentWrapperClassName = cn(
    "py-5 px-3",
    (accordionType === AccordionType.NO_BORDER || accordionVariant === AccordionVariant.BORDERED) && "border-t border-gray-200"
  );
  
  return (
    <RadixAccordion.Item 
      value={value} 
      disabled={isDisabled}
      className={cn(itemClassName, className)}
      ref={ref}
    >
      <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger className={triggerClassName} disabled={isDisabled}>
          <div className="w-full relative">
            {/* First row: left slot, title, and right slot */}
            <div className={headerRowClassName}>
              {leftSlot && (
                <div className={getAccordionSlotClassNames(true)}>
                  {leftSlot}
                </div>
              )}
              <div className={titleClassName}>{title}</div>
              {rightSlot && (
                <div className={getAccordionSlotClassNames(false)}>
                  {rightSlot}
                </div>
              )}
            </div>
            
            {/* Second row: subtext and subtextSlot */}
            {(subtext || subtextSlot) && (
              <div className="flex items-center">
                {subtext && <div className={subtextClassName}>{subtext}</div>}
                {subtextSlot && (
                  <div className="ml-2 flex-shrink-0">
                    {subtextSlot}
                  </div>
                )}
              </div>
            )}
            
            {/* Arrow positioned absolutely at top right */}
            <div className={chevronClassName}>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
            </div>
          </div>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className={contentClassName}>
        <div className={contentWrapperClassName}>
          {children}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
});

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem }; 