import { forwardRef, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { TooltipProps, TooltipSide, TooltipSize, TooltipSlotDirection } from './types';
import { getArrowClassNames, getSlotClassNames, getTooltipClassNames } from './utils';

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
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const tooltipClassName = getTooltipClassNames(size);
    const arrowWidth = size === TooltipSize.SMALL ? 8 : 12;
    const arrowHeight = size === TooltipSize.SMALL ? 6 : 8;
    const tooltipBgColor = '#333';

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
    }, [readyToPosition]);

    useEffect(() => {
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('scroll', calculatePosition);
        window.removeEventListener('resize', calculatePosition);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block', position: 'relative' }}
      >
        {children}
        {isVisible && (
          <div
            ref={(node) => {
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
              backgroundColor: tooltipBgColor,
              padding: '6px 10px',
              color: 'white',
              borderRadius: '4px',
              fontSize: size === TooltipSize.SMALL ? '12px' : '14px',
              whiteSpace: 'nowrap',
            }}
          >
            {slot && slotDirection === TooltipSlotDirection.LEFT && (
              <div className={getSlotClassNames(slotDirection, size)}>{slot}</div>
            )}

            {content}

            {slot && slotDirection === TooltipSlotDirection.RIGHT && (
              <div className={getSlotClassNames(slotDirection, size)}>{slot}</div>
            )}

            {showArrow && (
              <div
                className={getArrowClassNames()}
                style={{
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  ...(side === TooltipSide.TOP && {
                    bottom: -arrowHeight,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderWidth: `${arrowHeight}px ${arrowWidth / 2}px 0 ${arrowWidth / 2}px`,
                    borderColor: `${tooltipBgColor} transparent transparent transparent`,
                  }),
                  ...(side === TooltipSide.BOTTOM && {
                    top: -arrowHeight,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderWidth: `0 ${arrowWidth / 2}px ${arrowHeight}px ${arrowWidth / 2}px`,
                    borderColor: `transparent transparent ${tooltipBgColor} transparent`,
                  }),
                  ...(side === TooltipSide.LEFT && {
                    right: -arrowWidth,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderWidth: `${arrowHeight / 2}px 0 ${arrowHeight / 2}px ${arrowWidth}px`,
                    borderColor: `transparent transparent transparent ${tooltipBgColor}`,
                  }),
                  ...(side === TooltipSide.RIGHT && {
                    left: -arrowWidth,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    borderWidth: `${arrowHeight / 2}px ${arrowWidth}px ${arrowHeight / 2}px 0`,
                    borderColor: `transparent ${tooltipBgColor} transparent transparent`,
                  }),
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

TooltipV2.displayName = 'TooltipV2';
export default TooltipV2;
