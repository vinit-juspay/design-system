import * as React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { AlertProps } from './types';
import { 
  getAlertContainerClassNames,
  getContentContainerClassNames,
  getTitleClassNames,
  getDescriptionClassNames,
  getActionsContainerClassNames,
  getIconClassNames,
  getCloseButtonClassNames
} from './utils';
import Button from '../Button/Button';

/**
 * Alert Component - Displays important messages to users
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    type = 'primary',
    alertStyle = 'fill',
    actionButtons = 0,
    actionPlacement = 'bottom',
    title,
    description,
    primaryActionText,
    secondaryActionText,
    onPrimaryAction,
    onSecondaryAction,
    onClose,
    isDismissible = true,
    icon: CustomIcon,
    children,
    className,
    ...props
  }, ref) => {
    // Default icons based on alert type
    const getDefaultIcon = () => {
      switch (type) {
        case 'success':
          return CheckCircle;
        case 'error':
          return AlertCircle;
        case 'warning':
          return AlertTriangle;
        default:
          return Info;
      }
    };
    
    const Icon = CustomIcon || getDefaultIcon();
    const containerClassNames = getAlertContainerClassNames(type, alertStyle, actionPlacement);
    const contentContainerClassNames = getContentContainerClassNames(actionPlacement);
    const titleClassNames = getTitleClassNames();
    const descriptionClassNames = getDescriptionClassNames();
    const actionsContainerClassNames = getActionsContainerClassNames(actionPlacement);
    const iconClassNames = getIconClassNames(type, alertStyle);
    const closeButtonClassNames = getCloseButtonClassNames();
    
    // Map alert type to button type
    const getButtonType = () => {
      switch (type) {
        case 'success':
          return 'success';
        case 'error':
          return 'danger';
        case 'primary':
          return 'primary';
        default:
          return 'secondary';
      }
    };
    
    const buttonType = getButtonType();
    
    return (
      <div
        ref={ref}
        role="alert"
        className={containerClassNames}
        {...props}
      >
        <div className={contentContainerClassNames}>
          <Icon className={iconClassNames} />
          
          <div>
            {children || (
              <>
                {title && <h4 className={titleClassNames}>{title}</h4>}
                {description && <p className={descriptionClassNames}>{description}</p>}
              </>
            )}
          </div>
        </div>
        
        {actionButtons > 0 && (
          <div className={actionsContainerClassNames}>
            {actionButtons >= 1 && primaryActionText && (
              <Button 
                buttonType={buttonType}
                size="sm"
                onClick={onPrimaryAction}
              >
                {primaryActionText}
              </Button>
            )}
            
            {actionButtons >= 2 && secondaryActionText && (
              <Button 
                buttonType="secondary"
                size="sm"
                onClick={onSecondaryAction}
              >
                {secondaryActionText}
              </Button>
            )}
          </div>
        )}
        
        {isDismissible && (
          <button 
            type="button"
            className={closeButtonClassNames}
            onClick={onClose}
            aria-label="Close alert"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
