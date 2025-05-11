import { cn } from "../../utils";
import { themeConfig } from "../../themeConfig";

export const getModalClasses = (className?: string) => {
  return cn(
    themeConfig.euler.modal.base.container,
    className
  );
};

export const getHeaderClasses = () => {
  return themeConfig.euler.modal.base.header;
};

export const getContentClasses = () => {
  return themeConfig.euler.modal.base.content;
};

export const getFooterClasses = () => {
  return themeConfig.euler.modal.base.footer;
};

export const getBackdropClasses = () => {
  return themeConfig.euler.modal.base.backdrop;
};

export const getContainerClasses = () => {
  return themeConfig.euler.modal.base.wrapper;
};
