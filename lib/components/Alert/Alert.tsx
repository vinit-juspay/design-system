import React, { forwardRef } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { AlertProps, AlertType } from './types';
import { ButtonType } from '../Button/types';
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
import { themeConfig } from '../../themeConfig';

// Map alert types to their appropriate icons
const ICON_MAP: Record<AlertType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  primary: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  purple: Info,
  neutral: Info,
  orange: AlertTriangle
};

// Map alert types to button types for consistent styling
const ALERT_TO_BUTTON_TYPE_MAP: Record<AlertType, ButtonType> = {
  primary: 'primary',
  success: 'success',
  warning: 'secondary',
  error: 'danger',
  purple: 'secondary',
  neutral: 'secondary',
  orange: 'secondary'
};

/**
 * Alert Component - Displays important messages to users
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = 'primary',
      style = 'fill',
      title,
      description,
      actionPlacement = 'bottom',
      primaryActionText,
      secondaryActionText,
      onPrimaryAction,
      onSecondaryAction,
      onClose,
      hasCloseIcon = true,
      hasMainIcon = true,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const theme = themeConfig.euler.alert;
    
    // Computed class names
    const containerClassNames = getAlertContainerClassNames(type, style);
    const contentContainerClassNames = getContentContainerClassNames();
    const titleClassNames = getTitleClassNames();
    const descriptionClassNames = getDescriptionClassNames();
    const actionsContainerClassNames = getActionsContainerClassNames(actionPlacement);
    const iconClassNames = getIconClassNames(type, style);
    const closeButtonClassNames = getCloseButtonClassNames();

    // Helper functions
    const getColorClassForType = (alertType: AlertType): string => {
      return theme.actionButton.linkColors[alertType] || '';
    };

    const renderIcon = (): React.ReactElement => {
      const IconComponent = icon || ICON_MAP[type];
      return <IconComponent className={iconClassNames} aria-hidden="true" />;
    };

    // Determine if we should show action buttons based on text props
    const showPrimaryAction = !!primaryActionText;
    const showSecondaryAction = !!secondaryActionText;
    
    // Render pattern for bottom action placement
    if (actionPlacement === 'bottom') {
      return (
        <div
          ref={ref}
          role="alert"
          className={containerClassNames}
          {...props}
        >
          <div className={theme.layout.bottomLayout.wrapper}>
            <div className={contentContainerClassNames}>
              {hasMainIcon && <div className={theme.layout.iconWrapper}>{renderIcon()}</div>}
              
              <div className={theme.layout.bottomLayout.contentWrapper}>
                <div className={theme.layout.bottomLayout.titleDescriptionWrapper}>
                  {title && <h4 className={titleClassNames}>{title}</h4>}
                  {description && <p className={descriptionClassNames}>{description}</p>}
                </div>
                
                {(showPrimaryAction || showSecondaryAction) && (
                  <div className={actionsContainerClassNames}>
                    {showPrimaryAction && (
                      <Button 
                        key="primary-action"
                        buttonType={ALERT_TO_BUTTON_TYPE_MAP[type]}
                        subType="link"
                        onClick={onPrimaryAction}
                        className={getColorClassForType(type) || undefined}
                      >
                        {primaryActionText}
                      </Button>
                    )}
                    
                    {showSecondaryAction && (
                      <Button 
                        key="secondary-action" 
                        buttonType={ALERT_TO_BUTTON_TYPE_MAP[type]}
                        subType="link"
                        onClick={onSecondaryAction}
                        className={getColorClassForType(type) || undefined}
                      >
                        {secondaryActionText}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {hasCloseIcon && (
              <button 
                type="button"
                className={closeButtonClassNames}
                onClick={onClose}
                aria-label="Close alert"
              >
                <X size={20} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      );
    }
    
    // Render pattern for right action placement
    return (
      <div
        ref={ref}
        role="alert"
        className={containerClassNames}
        {...props}
      >
        <div className={theme.layout.rightLayout.wrapper}>
          <div className={theme.layout.rightLayout.contentWrapper}>
            {hasMainIcon && <div className={theme.layout.iconWrapper}>{renderIcon()}</div>}
            
            <div className={theme.layout.rightLayout.titleDescriptionWrapper}>
              {title && <h4 className={titleClassNames}>{title}</h4>}
              {description && <p className={descriptionClassNames}>{description}</p>}
            </div>
          </div>
          
          {(showPrimaryAction || showSecondaryAction) && (
            <div className={actionsContainerClassNames}>
              {showPrimaryAction && (
                <Button 
                  key="primary-action"
                  buttonType={ALERT_TO_BUTTON_TYPE_MAP[type]}
                  subType="link"
                  onClick={onPrimaryAction}
                  className={getColorClassForType(type) || undefined}
                >
                  {primaryActionText}
                </Button>
              )}
              
              {showSecondaryAction && (
                <Button 
                  key="secondary-action" 
                  buttonType={ALERT_TO_BUTTON_TYPE_MAP[type]}
                  subType="link"
                  onClick={onSecondaryAction}
                  className={getColorClassForType(type) || undefined}
                >
                  {secondaryActionText}
                </Button>
              )}
            </div>
          )}
          
          {(showPrimaryAction || showSecondaryAction) && hasCloseIcon && (
            <div className={theme.layout.rightLayout.divider} />
          )}
          
          {hasCloseIcon && (
            <button 
              type="button"
              className={closeButtonClassNames}
              onClick={onClose}
              aria-label="Close alert"
            >
              <X size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
