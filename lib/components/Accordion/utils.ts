import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';
import { AccordionType, AccordionChevronPosition } from './types';

export const getAccordionRootClassNames = (type: AccordionType, className?: string): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.container, theme.type[type].container, className);
};

export const getAccordionItemClassNames = (type: AccordionType, isDisabled?: boolean): string => {
  const theme = themeConfig.euler.accordion;

  return cn(
    theme.base.item,
    theme.type[type].item,
    isDisabled && type === AccordionType.BORDER && theme.states.disabled
  );
};

export const getAccordionTriggerClassNames = (
  type: AccordionType,
  isDisabled?: boolean
): string => {
  const theme = themeConfig.euler.accordion;

  return cn(
    theme.base.trigger,
    theme.type[type].trigger,
    isDisabled && type === AccordionType.BORDER && theme.states.disabled
  );
};

export const getAccordionContentClassNames = (type: AccordionType): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.content, theme.type[type].content);
};

export const getAccordionTitleClassNames = (isDisabled?: boolean): string => {
  const theme = themeConfig.euler.accordion;

  return cn(theme.base.title, isDisabled ? theme.base.titleDisabled : theme.base.titleEnabled);
};

export const getAccordionSubtextClassNames = (isDisabled?: boolean): string => {
  const theme = themeConfig.euler.accordion;

  return cn(
    theme.base.subtext,
    isDisabled ? theme.base.subtextDisabled : theme.base.subtextEnabled
  );
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

export const getAccordionChevronIconClassNames = (isDisabled?: boolean): string => {
  const theme = themeConfig.euler.accordion;

  return cn(
    theme.layout.chevronIcon.default,
    isDisabled ? theme.layout.chevronIcon.disabled : theme.layout.chevronIcon.enabled
  );
};
