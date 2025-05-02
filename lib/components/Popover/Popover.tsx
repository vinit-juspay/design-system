"use client"

import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  showArrow?: boolean
  className?: string
  contentClassName?: string
  triggerClassName?: string
  arrowClassName?: string
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  offset?: number
}

export function Popover({
  children,
  content,
  placement = "bottom",
  showArrow = true,
  className = "",
  contentClassName = "",
  triggerClassName = "",
  arrowClassName = "",
  closeOnEscape = true,
  closeOnOutsideClick = true,
  open: controlledOpen,
  onOpenChange,
  offset = 8,
}: PopoverProps) {
  console.log("Rendering Popover")
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const firstFocusableElementRef = useRef<HTMLElement | null>(null)
  const lastFocusableElementRef = useRef<HTMLElement | null>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value)
      } else {
        setUncontrolledOpen(value)
      }
    },
    [isControlled, onOpenChange],
  )


  const headingId = useRef(`popover-heading-${Math.random().toString(36).substring(2, 9)}`).current
  const descriptionId = useRef(`popover-description-${Math.random().toString(36).substring(2, 9)}`).current

  const handleTriggerClick = () => {
    setOpen(!open)
  }

  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current || !contentRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()

    const availableSpace = {
      top: triggerRect.top,
      right: window.innerWidth - triggerRect.right,
      bottom: window.innerHeight - triggerRect.bottom,
      left: triggerRect.left,
    }

    let finalPlacement = placement
    const [primaryPlacement, secondaryPlacement] = placement.split("-") as [
      "top" | "right" | "bottom" | "left",
      "start" | "end" | undefined,
    ]

    if (primaryPlacement === "top" && availableSpace.top < contentRect.height + offset) {
      finalPlacement = secondaryPlacement ? `bottom-${secondaryPlacement}` : "bottom"
    } else if (primaryPlacement === "bottom" && availableSpace.bottom < contentRect.height + offset) {
      finalPlacement = secondaryPlacement ? `top-${secondaryPlacement}` : "top"
    } else if (primaryPlacement === "left" && availableSpace.left < contentRect.width + offset) {
      finalPlacement = secondaryPlacement ? `right-${secondaryPlacement}` : "right"
    } else if (primaryPlacement === "right" && availableSpace.right < contentRect.width + offset) {
      finalPlacement = secondaryPlacement ? `left-${secondaryPlacement}` : "left"
    }

    let top = 0
    let left = 0

    const [finalPrimaryPlacement, finalSecondaryPlacement] = finalPlacement.split("-") as [
      "top" | "right" | "bottom" | "left",
      "start" | "end" | undefined,
    ]

    if (finalPrimaryPlacement === "top") {
      top = triggerRect.top - contentRect.height - offset
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
    } else if (finalPrimaryPlacement === "bottom") {
      top = triggerRect.bottom + offset
      left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
    } else if (finalPrimaryPlacement === "left") {
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
      left = triggerRect.left - contentRect.width - offset
    } else if (finalPrimaryPlacement === "right") {
      top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
      left = triggerRect.right + offset
    }

    if (finalSecondaryPlacement === "start") {
      if (finalPrimaryPlacement === "top" || finalPrimaryPlacement === "bottom") {
        left = triggerRect.left
      } else if (finalPrimaryPlacement === "left" || finalPrimaryPlacement === "right") {
        top = triggerRect.top
      }
    } else if (finalSecondaryPlacement === "end") {
      if (finalPrimaryPlacement === "top" || finalPrimaryPlacement === "bottom") {
        left = triggerRect.right - contentRect.width
      } else if (finalPrimaryPlacement === "left" || finalPrimaryPlacement === "right") {
        top = triggerRect.bottom - contentRect.height
      }
    }


    if (left < 0) left = 0
    if (top < 0) top = 0
    if (left + contentRect.width > window.innerWidth) {
      left = window.innerWidth - contentRect.width
    }
    if (top + contentRect.height > window.innerHeight) {
      top = window.innerHeight - contentRect.height
    }


    contentRef.current.style.top = `${top}px`
    contentRef.current.style.left = `${left}px`

    if (showArrow && arrowRef.current) {
      const arrowSize = 8 
      let arrowTop = 0
      let arrowLeft = 0
      let staticSide = ""

      if (finalPrimaryPlacement === "top") {
        arrowTop = contentRect.height - 1   
        arrowLeft = contentRect.width / 2 - arrowSize 
        staticSide = "bottom"
      } else if (finalPrimaryPlacement === "bottom") {
        arrowTop = -arrowSize * 2 + 1 
        arrowLeft = contentRect.width / 2 - arrowSize
        staticSide = "top"
      } else if (finalPrimaryPlacement === "left") {
        arrowTop = contentRect.height / 2 - arrowSize
        arrowLeft = contentRect.width - 1 
        staticSide = "right"
      } else if (finalPrimaryPlacement === "right") {
        arrowTop = contentRect.height / 2 - arrowSize
        arrowLeft = -arrowSize * 2 + 1 
        staticSide = "left"
      }

      if (
        finalSecondaryPlacement === "start" &&
        (finalPrimaryPlacement === "top" || finalPrimaryPlacement === "bottom")
      ) {
        arrowLeft = Math.min(
          Math.max(arrowSize, triggerRect.left + triggerRect.width / 2 - left - arrowSize),
          contentRect.width - arrowSize * 3,
        )
      } else if (
        finalSecondaryPlacement === "end" &&
        (finalPrimaryPlacement === "top" || finalPrimaryPlacement === "bottom")
      ) {
        arrowLeft = Math.min(
          Math.max(arrowSize, triggerRect.left + triggerRect.width / 2 - left - arrowSize),
          contentRect.width - arrowSize * 3,
        )
      }

      arrowRef.current.style.top = `${arrowTop}px`
      arrowRef.current.style.left = `${arrowLeft}px`
      arrowRef.current.style[staticSide as any] = `-${arrowSize}px`
    }
  }, [open, placement, offset, showArrow])

  const getFocusableElements = useCallback(() => {
    if (!contentRef.current) return []

    return Array.from(
      contentRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
    ) as HTMLElement[]
  }, [])

  useEffect(() => {
    if (!open || !closeOnOutsideClick) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [open, closeOnOutsideClick, setOpen])

  useEffect(() => {
    if (!open || !closeOnEscape) return

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [open, closeOnEscape, setOpen])

  useEffect(() => {
    if (!open) return

    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      firstFocusableElementRef.current = focusableElements[0]
      lastFocusableElementRef.current = focusableElements[focusableElements.length - 1]

      setTimeout(() => {
        firstFocusableElementRef.current?.focus()
      }, 0)
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (!firstFocusableElementRef.current || !lastFocusableElementRef.current) return

      if (e.shiftKey && document.activeElement === firstFocusableElementRef.current) {
        e.preventDefault()
        lastFocusableElementRef.current.focus()
      }
      else if (!e.shiftKey && document.activeElement === lastFocusableElementRef.current) {
        e.preventDefault()
        firstFocusableElementRef.current.focus()
      }
    }

    document.addEventListener("keydown", handleTabKey)
    return () => {
      document.removeEventListener("keydown", handleTabKey)
    }
  }, [open, getFocusableElements])

  useEffect(() => {
    if (!open) return

    updatePosition()

    const handleResize = () => {
      updatePosition()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleResize)
    }
  }, [open, updatePosition])

  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
    } else if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus()
    }
  }, [open])

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${triggerClassName}`}
        onClick={handleTriggerClick}
        aria-expanded={open}
        aria-haspopup="dialog"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleTriggerClick()
          }
        }}
      >
        {children}
      </div>
      {open && (
        <div
          ref={contentRef}
          className={`z-50 bg-white fixed min-w-[8rem] rounded-md border p-4 text-popover-foreground shadow-md outline-none duration-1000 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out ${contentClassName} ${className}`}
          role="dialog"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
          data-state="open"
          data-side={placement.split("-")[0]}
        >
          {content}
          {showArrow && (
            <div
              ref={arrowRef}
              className={`absolute h-2 w-2 rotate-45 bg-popover border ${arrowClassName}`}
              style={{
                borderWidth: "0 1px 1px 0",
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      )}
    </>
  )
}
