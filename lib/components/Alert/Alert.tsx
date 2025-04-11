import React, { forwardRef } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { AlertProps, AlertType } from './types';
import { themeConfig } from '../../themeConfig';
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

// Icon mapping directly in this file
const iconMap: Record<AlertType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  primary: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  purple: Info,
  neutral: Info,
  orange: AlertTriangle
};

/**
 * Alert Component - Displays important messages to users
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = 'primary',
      alertStyle = 'fill',
      title,
      description,
      actionButtons = 0,
      actionPlacement = 'bottom',
      primaryActionText = 'Primary Action',
      secondaryActionText = 'Secondary Action',
      onPrimaryAction,
      onSecondaryAction,
      buttonSubType = 'default',
      onClose,
      isDismissible = true,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    // Get all the class names using the utility functions
    const containerClassNames = getAlertContainerClassNames(type, alertStyle);
    const contentContainerClassNames = getContentContainerClassNames();
    const titleClassNames = getTitleClassNames();
    const descriptionClassNames = getDescriptionClassNames();
    const actionsContainerClassNames = getActionsContainerClassNames(actionPlacement);
    const iconClassNames = getIconClassNames(type, alertStyle);
    const closeButtonClassNames = getCloseButtonClassNames();

    // Render the icon based on type or custom icon
    const renderIcon = () => {
      const IconToRender = icon || iconMap[type];
      return (
        <IconToRender className={iconClassNames} />
      );
    };

    // Render action buttons based on the count
    const renderActionButtons = () => {
      const buttons = [];
      
      if (actionButtons >= 1) {
        buttons.push(
          <Button 
            key="primary-action"
            subType="link"
            onClick={onPrimaryAction}
          >
            {primaryActionText}
          </Button>
        );
      }
      
      if (actionButtons >= 2) {
        buttons.push(
          <Button 
            key="secondary-action" 
            subType="link"
            onClick={onSecondaryAction}
          >
            {secondaryActionText}
          </Button>
        );
      }
      
      return buttons;
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={containerClassNames}
        {...props}
      >
        {/* Main horizontal autolayout container */}
        <div className={themeConfig.euler.alert.layout.mainContainer}>
          {/* Content container */}
          <div className={contentContainerClassNames}>
            {renderIcon()}
            
            <div className="flex flex-col gap-5">
              <div className={themeConfig.euler.alert.layout.titleDescription}>
                {title && <h4 className={titleClassNames}>{title}</h4>}
                {description && <p className={descriptionClassNames}>{description}</p>}
              </div>
              
              {actionButtons > 0 && actionPlacement === 'bottom' && (
                <div className={actionsContainerClassNames}>
                  {renderActionButtons()}
                </div>
              )}
            </div>
          </div>
          
          {/* Action buttons for right placement */}
          {actionButtons > 0 && actionPlacement === 'right' && (
            <div className={actionsContainerClassNames}>
              {renderActionButtons()}
            </div>
          )}
          
          {/* Close button */}
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
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
