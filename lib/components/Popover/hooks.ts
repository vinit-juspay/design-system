import { useCallback, useEffect, useRef, useState } from 'react';
import { Placement, Alignment } from './types';

export const usePopoverState = (
  controlledOpen?: boolean,
  onOpenChange?: (open: boolean) => void
) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange]
  );

  return { open, setOpen };
};

export const usePopoverPosition = (
  open: boolean,
  placement: Placement,
  alignment: Alignment,
  offset: number,
  collisionBoundaryRef?: React.RefObject<HTMLElement>,
  collisionPadding: number = 16,
  closeOnScroll: boolean = true,
  onOpenChange?: (open: boolean) => void
) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = useCallback(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const boundaryRect =
      collisionBoundaryRef?.current?.getBoundingClientRect() ||
      new DOMRect(0, 0, window.innerWidth, window.innerHeight);

    const availableSpace = {
      top: triggerRect.top - boundaryRect.top,
      right: boundaryRect.right - triggerRect.right,
      bottom: boundaryRect.bottom - triggerRect.bottom,
      left: triggerRect.left - boundaryRect.left,
    };

    let finalPlacement = placement;
    const [primaryPlacement, secondaryPlacement] = placement.split('-') as [
      'top' | 'right' | 'bottom' | 'left',
      'start' | 'end' | undefined,
    ];

    // Adjust placement based on available space
    if (primaryPlacement === 'top' && availableSpace.top < contentRect.height + offset) {
      finalPlacement = secondaryPlacement
        ? (`bottom-${secondaryPlacement}` as Placement)
        : Placement.BOTTOM;
    } else if (
      primaryPlacement === 'bottom' &&
      availableSpace.bottom < contentRect.height + offset
    ) {
      finalPlacement = secondaryPlacement
        ? (`top-${secondaryPlacement}` as Placement)
        : Placement.TOP;
    } else if (primaryPlacement === 'left' && availableSpace.left < contentRect.width + offset) {
      finalPlacement = secondaryPlacement
        ? (`right-${secondaryPlacement}` as Placement)
        : Placement.RIGHT;
    } else if (primaryPlacement === 'right' && availableSpace.right < contentRect.width + offset) {
      finalPlacement = secondaryPlacement
        ? (`left-${secondaryPlacement}` as Placement)
        : Placement.LEFT;
    }

    // Calculate position
    let top = 0;
    let left = 0;
    const [finalPrimaryPlacement] = finalPlacement.split('-') as [
      'top' | 'right' | 'bottom' | 'left',
      string | undefined,
    ];

    if (finalPrimaryPlacement === 'top') {
      top = triggerRect.top - contentRect.height - offset;
      left = calculateHorizontalPosition(triggerRect, contentRect, alignment);
    } else if (finalPrimaryPlacement === 'bottom') {
      top = triggerRect.bottom + offset;
      left = calculateHorizontalPosition(triggerRect, contentRect, alignment);
    } else if (finalPrimaryPlacement === 'left') {
      left = triggerRect.left - contentRect.width - offset;
      top = calculateVerticalPosition(triggerRect, contentRect, alignment);
    } else if (finalPrimaryPlacement === 'right') {
      left = triggerRect.right + offset;
      top = calculateVerticalPosition(triggerRect, contentRect, alignment);
    }

    const finalPosition = applyCollisionDetection(
      { top, left },
      contentRect,
      boundaryRect,
      collisionPadding
    );

    if (contentRef.current) {
      contentRef.current.style.position = 'fixed';
      contentRef.current.style.top = `${finalPosition.top}px`;
      contentRef.current.style.left = `${finalPosition.left}px`;
    }
  }, [open, placement, alignment, offset, collisionBoundaryRef, collisionPadding]);

  const setOpenState = useCallback(
    (value: boolean) => {
      if (onOpenChange) {
        onOpenChange(value);
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    if (!open) return;

    updatePosition();
    
    const handlePositionUpdate = (event: Event) => {
      requestAnimationFrame(updatePosition);
      
      if (closeOnScroll && contentRef.current) {
        if (contentRef.current === event.target || contentRef.current.contains(event.target as Node)) {
          return;
        }
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          setOpenState(false);
        }, 10);
      }
    };
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', handlePositionUpdate, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', handlePositionUpdate, true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [open, updatePosition, closeOnScroll, setOpenState]);

  return { triggerRef, contentRef };
};

export const useFocusManagement = (open: boolean) => {
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!document.activeElement) return [];
    return Array.from(
      document.activeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
  }, []);

  useEffect(() => {
    if (!open) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      firstFocusableElementRef.current = focusableElements[0];
      lastFocusableElementRef.current = focusableElements[focusableElements.length - 1];
      setTimeout(() => firstFocusableElementRef.current?.focus(), 0);
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!firstFocusableElementRef.current || !lastFocusableElementRef.current) return;

      if (e.shiftKey && document.activeElement === firstFocusableElementRef.current) {
        e.preventDefault();
        lastFocusableElementRef.current.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableElementRef.current) {
        e.preventDefault();
        firstFocusableElementRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [open, getFocusableElements]);

  useEffect(() => {
    if (open) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    } else if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus();
    }
  }, [open]);

  return { firstFocusableElementRef, lastFocusableElementRef };
};

const calculateHorizontalPosition = (
  triggerRect: DOMRect,
  contentRect: DOMRect,
  alignment: Alignment
): number => {
  switch (alignment) {
    case Alignment.START:
      return triggerRect.left;
    case Alignment.END:
      return triggerRect.right - contentRect.width;
    default:
      return triggerRect.left + (triggerRect.width - contentRect.width) / 2;
  }
};

const calculateVerticalPosition = (
  triggerRect: DOMRect,
  contentRect: DOMRect,
  alignment: Alignment
): number => {
  switch (alignment) {
    case Alignment.START:
      return triggerRect.top;
    case Alignment.END:
      return triggerRect.bottom - contentRect.height;
    default:
      return triggerRect.top + (triggerRect.height - contentRect.height) / 2;
  }
};

const applyCollisionDetection = (
  position: { top: number; left: number },
  contentRect: DOMRect,
  boundaryRect: DOMRect,
  padding: number
): { top: number; left: number } => {
  let { top, left } = position;

  if (left < boundaryRect.left + padding) {
    left = boundaryRect.left + padding;
  }
  if (top < boundaryRect.top + padding) {
    top = boundaryRect.top + padding;
  }
  if (left + contentRect.width > boundaryRect.right - padding) {
    left = boundaryRect.right - contentRect.width - padding;
  }
  if (top + contentRect.height > boundaryRect.bottom - padding) {
    top = boundaryRect.bottom - contentRect.height - padding;
  }

  return { top, left };
};
