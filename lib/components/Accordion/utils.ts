import { themeConfig } from "../../themeConfig";
import { cn } from "../../utils";
import { AccordionType, AccordionVariant } from "./types";

export const getAccordionRootClassNames = (
  variant: AccordionVariant, 
  type: AccordionType,
  className?: string
): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(
    theme.base.container,
    theme.variant[variant].container,
    theme.type[type].container,
    className
  );
};

export const getAccordionItemClassNames = (
  variant: AccordionVariant,
  type: AccordionType
): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(
    theme.base.item,
    theme.variant[variant].item,
    theme.type[type].item
  );
};

export const getAccordionTriggerClassNames = (
  variant: AccordionVariant,
  type: AccordionType,
  isDisabled?: boolean
): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(
    theme.base.trigger,
    theme.variant[variant].trigger,
    theme.type[type].trigger,
    isDisabled && theme.states.disabled
  );
};

export const getAccordionContentClassNames = (
  variant: AccordionVariant,
  type: AccordionType
): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(
    theme.base.content,
    theme.variant[variant].content,
    theme.type[type].content
  );
};

export const getAccordionTitleClassNames = (): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(theme.base.title);
};

export const getAccordionSubtextClassNames = (): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(theme.base.subtext);
};

export const getAccordionSlotClassNames = (isLeft: boolean): string => {
  const theme = themeConfig.euler.accordion;
  const slotType = isLeft ? "leftSlot" : "rightSlot";
  
  return cn(theme.layout[slotType]);
};

export const getAccordionHeaderRowClassNames = (): string => {
  const theme = themeConfig.euler.accordion;
  
  return theme.layout.headerRow;
};

export const getAccordionChevronClassNames = (): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(theme.layout.chevron);
};

export const getAccordionContentWrapperClassNames = (
  variant: AccordionVariant,
  type: AccordionType
): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(
    theme.base.contentWrapper,
    theme.variant[variant].contentWrapper,
    theme.type[type].contentWrapper
  );
};

export const getAccordionChevronIconClassNames = (): string => {
  const theme = themeConfig.euler.accordion;
  
  return cn(theme.layout.chevronIcon);
}; 