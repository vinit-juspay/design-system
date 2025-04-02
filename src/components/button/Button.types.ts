import { ReactNode } from "react";

export type ButtonType = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  type: ButtonType;
  size: ButtonSize;
  children: ReactNode;
} 