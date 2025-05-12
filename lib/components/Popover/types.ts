import { ReactNode, RefObject } from "react"
import { ButtonType } from "../Button"

export enum Placement {
  TOP = "top",
  TOP_START = "top-start",
  TOP_END = "top-end",
  BOTTOM = "bottom",
  BOTTOM_START = "bottom-start",
  BOTTOM_END = "bottom-end",
  LEFT = "left",
  LEFT_START = "left-start",
  LEFT_END = "left-end",
  RIGHT = "right",
  RIGHT_START = "right-start",
  RIGHT_END = "right-end",
}

export enum Alignment {
  START = "start",
  CENTER = "center",
  END = "end",
}

export interface PopoverProps {
  children: ReactNode
  trigger: ReactNode
  placement?: Placement
  alignment?: Alignment
  className?: string
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  offset?: number
  collisionBoundaryRef?: RefObject<HTMLElement>
  collisionPadding?: number
  heading?: string
  description?: string
  primaryButtonType?: ButtonType
  secondaryButtonType?: ButtonType
  showCloseButton?: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonDisabled?: boolean
  secondaryButtonDisabled?: boolean
  onPrimaryButtonClick?: () => void
  onSecondaryButtonClick?: () => void
}
