import * as React from "react";
import { Button as RadixButton } from "@radix-ui/themes";
import { ButtonProps } from "./Button.types";
import { getButtonClassNames } from "./Button.utils";

const Button: React.FC<ButtonProps> = ({ type, size, children }) => {
  const classNames = getButtonClassNames(type, size);

  return (
    <RadixButton className={classNames}>
      {children}
    </RadixButton>
  );
};

export default Button; 