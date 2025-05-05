import * as React from 'react';
import { ButtonProps, ButtonType } from '../Button/types';
import { ButtonGroupProps, ButtonGroupSize, ButtonGroupMode } from './types';
import { getButtonGroupStyles } from './utils';
import { cn } from '../../utils';

/**
 * ButtonGroup component for grouping multiple buttons together
 * with consistent spacing and optional stacked appearance
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      size = ButtonGroupSize.MEDIUM,
      isStacked = true,
      mode = ButtonGroupMode.SINGLE_PRIMARY,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Get React children as array
    const childrenArray = React.Children.toArray(children);
    const totalChildren = childrenArray.length;
    
    // Find the first primary/success/danger button (for singlePrimary mode)
    let primaryButtonIndex = -1;
    if (mode === ButtonGroupMode.SINGLE_PRIMARY) {
      childrenArray.forEach((child, index) => {
        if (!React.isValidElement(child)) return;
        
        const childProps = child.props as Partial<ButtonProps>;
        const buttonType = childProps.buttonType;
        
        // If we find a non-secondary button, mark it as our primary button
        if (buttonType && buttonType !== ButtonType.SECONDARY && primaryButtonIndex === -1) {
          primaryButtonIndex = index;
        }
      });
    }
    
    return (
      <div
        ref={ref}
        className={cn(getButtonGroupStyles.container(size, isStacked), className)}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          
          // Type checking for Button component
          const childProps = child.props as Partial<ButtonProps>;
          let finalButtonType = childProps.buttonType;
          
          // Apply button type transformation based on mode
          if (mode === ButtonGroupMode.ALL_SECONDARY) {
            // Force all buttons to secondary
            finalButtonType = ButtonType.SECONDARY;
          } else if (mode === ButtonGroupMode.SINGLE_PRIMARY && primaryButtonIndex !== -1) {
            // Only allow one primary/success/danger button, make others secondary
            finalButtonType = index === primaryButtonIndex 
              ? childProps.buttonType 
              : ButtonType.SECONDARY;
          }
          
          // Get position-based styling for the button
          const buttonGroupClassName = getButtonGroupStyles.button(
            index,
            totalChildren,
            isStacked
          );
          
          return React.cloneElement(child, {
            ...childProps,
            buttonType: finalButtonType,
            size: size, // Ensure consistent size
            className: cn(buttonGroupClassName, childProps.className),
          } as React.HTMLAttributes<HTMLElement>);
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup; 