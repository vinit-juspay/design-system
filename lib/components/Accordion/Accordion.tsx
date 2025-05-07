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
  getAccordionChevronClassNames,
  getAccordionContentWrapperClassNames,
  getAccordionChevronIconClassNames
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
  
  const baseProps = {
    collapsible: isCollapsible,
    className: rootClassName,
    ref: ref
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
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      const childProps = {
        ...(child.props as object),
        accordionVariant: variant,
        accordionType: type
      };
      
      return React.cloneElement(child, childProps);
    });
  }
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
  const chevronIconClassName = getAccordionChevronIconClassNames();
  const contentWrapperClassName = getAccordionContentWrapperClassNames(accordionVariant, accordionType);
  
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
            
            <div className={chevronClassName}>
              <ChevronDown className={chevronIconClassName} />
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