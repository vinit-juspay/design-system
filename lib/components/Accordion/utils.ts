import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { AccordionType, AccordionChevronPosition } from './types';

export const getAccordionRootClassNames = (type: AccordionType, className?: string): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.container, theme.type[type].container, className);
};

export const getAccordionItemClassNames = (type: AccordionType): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.item, theme.type[type].item);
};

export const getAccordionTriggerClassNames = (
  type: AccordionType,
  isDisabled?: boolean
): string => {
  const theme = themeConfig.euler.accordion;

  return cn(
    theme.base.trigger,
    theme.type[type].trigger,
    isDisabled && theme.states.disabled,
    type === AccordionType.BORDER ? 'data-[state=open]:bg-gray-50' : ''
  );
};

export const getAccordionContentClassNames = (type: AccordionType): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.content, theme.type[type].content);
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
  const slotType = isLeft ? 'leftSlot' : 'rightSlot';

  return cn(theme.layout[slotType]);
};

export const getAccordionHeaderRowClassNames = (): string => {
  const theme = themeConfig.euler.accordion;

  return theme.layout.headerRow;
};

export const getAccordionChevronClassNames = (
  position: AccordionChevronPosition = AccordionChevronPosition.RIGHT
): string => {
  const theme = themeConfig.euler.accordion;

  return cn(
    position === AccordionChevronPosition.RIGHT
      ? theme.layout.chevronRight
      : theme.layout.chevronLeft
  );
};

export const getAccordionContentWrapperClassNames = (type: AccordionType): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.contentWrapper, theme.type[type].contentWrapper);
};

export const getAccordionChevronIconClassNames = (): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.layout.chevronIcon);
};
