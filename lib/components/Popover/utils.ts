import { themeConfig } from '../../themeConfig';
import { Placement } from './types';

const { popover } = themeConfig.euler;

export const getPopoverClasses = (className?: string) => {
  return `${popover.base.container} ${popover.animation.open} ${popover.animation.closed} ${className || ''}`;
};

export const getTriggerClasses = () => {
  return popover.base.trigger;
};

export const getContentClasses = () => {
  return popover.base.content;
};

export const getHeaderClasses = () => {
  return popover.base.header;
};

export const getHeaderRowClasses = () => {
  return popover.base.headerRow;
};

export const getHeadingClasses = () => {
  return popover.base.heading;
};

export const getDescriptionClasses = () => {
  return popover.base.description;
};

export const getCloseButtonClasses = () => {
  return popover.base.closeButton;
};

export const getFooterClasses = () => {
  return popover.base.footer;
};

export const getPlacementClasses = (placement: Placement) => {
  const [primaryPlacement] = placement.split('-');
  return popover.placement[primaryPlacement as keyof typeof popover.placement] || '';
};
