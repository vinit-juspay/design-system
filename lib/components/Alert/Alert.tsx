import { forwardRef } from 'react';
import { AlertActionPlacement, AlertProps, AlertStyle, AlertVariant } from './types';
import {
  getAlertContainerStyles,
  getHeaderClassNames,
  getBodyClassNames,
  getCloseButtonClassNames,
  getActionButtonStyles,
  getAlertHeaderContainerStyles,
  getDescriptionClassNames,
  getButtonTypeFromAlert,
  getAlertBodyContainerStyles,
  getAlertDividerStyles,
  getAlertIconStyles,
} from './utils';

import { Info, X } from 'lucide-react';
import Button from '../Button/Button';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      heading,
      description,
      variant = AlertVariant.PRIMARY,
      primaryAction,
      secondaryAction,
      onClose,
      icon,
      style = AlertStyle.FILL,
      actionPlacement = AlertActionPlacement.BOTTOM,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={getAlertContainerStyles(variant, style)}>
        <div className={getAlertHeaderContainerStyles()}>
          <div className="flex items-center gap-2">
            {icon ? (
              <div className={getAlertIconStyles()}>{icon}</div>
            ) : (
              <div className={getAlertIconStyles()}>
                <Info size={16} />
              </div>
            )}
            <h3 className={getHeaderClassNames()}>{heading}</h3>
          </div>
          {onClose && actionPlacement === AlertActionPlacement.BOTTOM && (
            <button className={getCloseButtonClassNames()} onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>
          )}
        </div>

        <div className={`${getBodyClassNames(actionPlacement)}`}>
          <p className={getDescriptionClassNames()}>{description}</p>

          {(primaryAction || (onClose && actionPlacement === AlertActionPlacement.RIGHT)) && (
            <div className={getAlertBodyContainerStyles()}>
              {(primaryAction || secondaryAction) && (
                <div className={getAlertBodyContainerStyles()}>
                  {primaryAction && (
                    <Button
                      key="primary-action"
                      buttonType={getButtonTypeFromAlert(variant)}
                      onClick={primaryAction.onClick}
                      subType="link"
                      className={getActionButtonStyles(variant)}
                    >
                      {primaryAction.label}
                    </Button>
                  )}

                  {secondaryAction && (
                    <Button
                      key="secondary-action"
                      buttonType={getButtonTypeFromAlert(variant)}
                      onClick={secondaryAction.onClick}
                      subType="link"
                      className={getActionButtonStyles(variant)}
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                </div>
              )}
              {onClose && actionPlacement === AlertActionPlacement.RIGHT && (
                <div className={getAlertDividerStyles()}></div>
              )}
              {onClose && actionPlacement === AlertActionPlacement.RIGHT && (
                <button className={getCloseButtonClassNames()} onClick={onClose} aria-label="Close">
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
