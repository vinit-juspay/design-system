import * as React from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import { themeConfig } from "../themeConfig";

type ButtonProps = {
  type: "primary" | "secondary" | "danger" | "success";
  size: "small" | "medium" | "large";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, size, children }) => {
  const theme = themeConfig.euler.button;
  const buttonType = theme.buttonType[type];
  const buttonSize = theme.sizes[size];

  return (
    <RadixButton
      className={`
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
      `}
    >
      {children}
    </RadixButton>
  );
};

export default Button; 