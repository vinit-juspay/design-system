import { useEffect, useRef } from "react"
import { Placement, Alignment, PopoverProps } from "./types"
import { Button, ButtonSubType, ButtonType } from "../Button"
import { X } from "lucide-react"
import {
    getPopoverClasses,
    getTriggerClasses,
    getContentClasses,
    getHeaderClasses,
    getHeaderRowClasses,
    getHeadingClasses,
    getDescriptionClasses,
    getCloseButtonClasses,
    getFooterClasses,
} from "./utils"
import { usePopoverState, usePopoverPosition, useFocusManagement } from "./hooks"

export const Popover = ({
    children,
    trigger,
    placement = Placement.BOTTOM,
    alignment = Alignment.START,
    className = "",
    closeOnEscape = true,
    closeOnOutsideClick = true,
    open: controlledOpen,
    onOpenChange,
    offset = 8,
    collisionBoundaryRef,
    collisionPadding = 16,
    heading,
    description,
    primaryButtonType = ButtonType.PRIMARY,
    secondaryButtonType = ButtonType.SECONDARY,
    showCloseButton = true,
    primaryButtonDisabled = false,
    secondaryButtonDisabled = false,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    primaryButtonSubType = ButtonSubType.LINK,
    secondaryButtonSubType = ButtonSubType.LINK,
}: PopoverProps) => {
    const { open, setOpen } = usePopoverState(controlledOpen, onOpenChange);
    const { triggerRef, contentRef } = usePopoverPosition(
        open,
        placement,
        alignment,
        offset,
        collisionBoundaryRef,
        collisionPadding
    );
    useFocusManagement(open);

    const headingId = useRef(`popover-heading-${Math.random().toString(36).substring(2, 9)}`).current;
    const descriptionId = useRef(`popover-description-${Math.random().toString(36).substring(2, 9)}`).current;

    useEffect(() => {
        if (!open || !closeOnOutsideClick) return;

        const handleOutsideClick = (e: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [open, closeOnOutsideClick, setOpen]);

    useEffect(() => {
        if (!open || !closeOnEscape) return;

        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [open, closeOnEscape, setOpen]);

    const handleTriggerClick = () => setOpen(!open);

    const renderHeader = () => (
        <div className={getHeaderClasses()}>
            <div className={getHeaderRowClasses()}>
                {heading && (
                    <p id={headingId} className={getHeadingClasses()}>
                        {heading}
                    </p>
                )}
                {showCloseButton && (
                    <X 
                        onClick={() => setOpen(false)} 
                        className={getCloseButtonClasses()} 
                    />
                )}
            </div>
            {description && (
                <p id={descriptionId} className={getDescriptionClasses()}>
                    {description}
                </p>
            )}
        </div>
    );

    const renderFooter = () => {
        if (!primaryButtonText && !secondaryButtonText) return null;

        return (
            <div className={getFooterClasses()}>
                {primaryButtonText && (
                    <Button
                        buttonType={primaryButtonType}
                        onClick={() => { onPrimaryButtonClick?.(); setOpen(false) }}
                        disabled={primaryButtonDisabled}
                        subType={primaryButtonSubType}

                    >
                        {primaryButtonText}
                    </Button>
                )}
                {secondaryButtonText && (
                    <Button
                        buttonType={secondaryButtonType}
                        onClick={() => { onSecondaryButtonClick?.(); setOpen(false) }}
                        disabled={secondaryButtonDisabled}
                        subType={secondaryButtonSubType}

                    >
                        {secondaryButtonText}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <>
            <div
                ref={triggerRef}
                className={getTriggerClasses()}
                onClick={handleTriggerClick}
                aria-expanded={open}
                aria-haspopup="dialog"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleTriggerClick();
                    }
                }}
            >
                {trigger}
            </div>
            {open && (
                <div
                    ref={contentRef}
                    className={getPopoverClasses(className)}
                    role="popover"
                    aria-labelledby={headingId}
                    aria-describedby={descriptionId}
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={-1}
                    data-state={open ? "open" : "closed"}
                    data-side={placement.split("-")[0]}
                >
                    {renderHeader()}
                    <div className={getContentClasses()}>
                        {children}
                    </div>
                    {renderFooter()}
                </div>
            )}
        </>
    );
};

Popover.displayName = "Popover";