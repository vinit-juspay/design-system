import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

export const getModalClasses = (className?: string): string => {
  const theme = themeConfig.euler.modal.base;
  return cn(theme.container, className);
};

export const getHeaderClasses = (showDivider: boolean = true): string => {
  const theme = themeConfig.euler.modal.base;
  return cn(theme.header, !showDivider && 'border-b-0');
};

export const getContentClasses = (): string => {
  const theme = themeConfig.euler.modal.base;
  return theme.content;
};

export const getFooterClasses = (showDivider: boolean = true): string => {
  const theme = themeConfig.euler.modal.base;
  return cn(theme.footer, !showDivider && 'border-t-0');
};

export const getBackdropClasses = (): string => {
  const theme = themeConfig.euler.modal.base;
  return theme.backdrop;
};

export const getContainerClasses = (): string => {
  const theme = themeConfig.euler.modal.base;
  return theme.wrapper;
};

export const getTitleClasses = (): string => {
  const theme = themeConfig.euler.modal.base;
  return theme.modalTitle;
};

export const getSubtitleClasses = (): string => {
  const theme = themeConfig.euler.modal.base;
  return theme.modalSubtitle;
};
