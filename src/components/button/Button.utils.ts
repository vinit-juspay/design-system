import { ButtonSize, ButtonType } from "./Button.types";
import { themeConfig } from "../../themeConfig";

export const getButtonClassNames = (type: ButtonType, size: ButtonSize): string => {
  const theme = themeConfig.euler.button;
  const buttonType = theme.buttonType[type];
  const buttonSize = theme.sizes[size];

  return `
    ${theme.transition} 
    ${theme.borderRadius} 
    ${theme.transform} 
    ${buttonType.backgroundColor} 
    ${buttonType.textColor} 
    ${buttonSize.height} 
    ${buttonSize.padding} 
    ${buttonSize.fontSize} 
    ${buttonType.borderColor} 
    ${buttonType.borderWidth} 
    ${buttonType.borderStyle}
    ${buttonType.hoverBackgroundColor} 
    ${buttonType.hoverTextColor} 
    ${buttonType.focusOutline}
  `.trim();
}; 