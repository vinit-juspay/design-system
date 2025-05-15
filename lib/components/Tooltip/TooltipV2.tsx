import { forwardRef, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { TooltipProps, TooltipSide, TooltipSize, TooltipSlotDirection } from './types';
import {
  getArrowClassNames,
  getArrowPosition,
  getSlotClassNames,
  getTooltipClassNames,
} from './utils';

const TooltipV2 = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      open,
      side = TooltipSide.TOP,
      align = 'center',
      showArrow = true,
      size = TooltipSize.SMALL,
      slot,
      slotDirection = TooltipSlotDirection.LEFT,
      delayDuration = 300,
      offset = 8,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: -9999, left: -9999 });
    const [readyToPosition, setReadyToPosition] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const tooltipClassName = getTooltipClassNames(size);
    const arrowWidth = size === TooltipSize.SMALL ? 8 : 12;
    const arrowHeight = size === TooltipSize.SMALL ? 6 : 8;
    const tooltipBgColor = '#181B25';

    const calculatePosition = () => {
      const triggerEl = triggerRef.current;
      const tooltipEl = tooltipRef.current;
      if (!triggerEl || !tooltipEl) return;

      const triggerRect = triggerEl.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (side) {
        case TooltipSide.TOP:
          top = triggerRect.top - tooltipRect.height - arrowHeight - offset;
          left =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
                ? triggerRect.right - tooltipRect.width
                : triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case TooltipSide.BOTTOM:
          top = triggerRect.bottom + arrowHeight + offset;
          left =
            align === 'start'
              ? triggerRect.left
              : align === 'end'
                ? triggerRect.right - tooltipRect.width
                : triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case TooltipSide.LEFT:
          top =
            align === 'start'
              ? triggerRect.top
              : align === 'end'
                ? triggerRect.bottom - tooltipRect.height
                : triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - arrowWidth - offset;
          break;
        case TooltipSide.RIGHT:
          top =
            align === 'start'
              ? triggerRect.top
              : align === 'end'
                ? triggerRect.bottom - tooltipRect.height
                : triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + arrowWidth + offset;
          break;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (left + tooltipRect.width > vw) left = vw - tooltipRect.width - 10;
      if (left < 0) left = 10;
      if (top + tooltipRect.height > vh) top = vh - tooltipRect.height - 10;
      if (top < 0) top = 10;

      setPosition({ top, left });
    };

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setReadyToPosition(true);
      }, delayDuration);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(false);
      setReadyToPosition(false);
    };

    useEffect(() => {
      if (open !== undefined) {
        setIsVisible(open);
        setReadyToPosition(open);
      }
    }, [open]);

    useLayoutEffect(() => {
      if (readyToPosition) {
        calculatePosition();
      }
    }, [readyToPosition, side, align, offset]);

    useEffect(() => {
      const handlePositionChange = () => {
        if (isVisible) {
          calculatePosition();
        }
      };

      window.addEventListener('scroll', handlePositionChange, true);
      window.addEventListener('resize', handlePositionChange);

      return () => {
        window.removeEventListener('scroll', handlePositionChange, true);
        window.removeEventListener('resize', handlePositionChange);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [isVisible]);

    return (
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block', position: 'relative' }}
      >
        {children}
        {isVisible && (
          <>
            <div
              ref={node => {
                tooltipRef.current = node;
                if (ref) {
                  if (typeof ref === 'function') {
                    ref(node);
                  } else {
                    ref.current = node;
                  }
                }
              }}
              className={tooltipClassName}
              style={{
                position: 'fixed',
                top: position.top,
                left: position.left,
                zIndex: 1000,
              }}
            >
              {slot && slotDirection === TooltipSlotDirection.LEFT && (
                <div className={getSlotClassNames(slotDirection, size)}>{slot}</div>
              )}

              {content}

              {slot && slotDirection === TooltipSlotDirection.RIGHT && (
                <div className={getSlotClassNames(slotDirection, size)}>{slot}</div>
              )}
            </div>
            {showArrow && (
              <div
                className={getArrowClassNames()}
                style={getArrowPosition(
                  side,
                  position,
                  tooltipRef,
                  arrowWidth,
                  arrowHeight,
                  tooltipBgColor
                )}
              />
            )}
          </>
        )}
      </div>
    );
  }
);

TooltipV2.displayName = 'TooltipV2';
export default TooltipV2;
