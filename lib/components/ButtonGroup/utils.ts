import { ButtonGroupSize } from './types';
import { themeConfig } from '../../themeConfig';
import { cn } from '../../utils';

/**
 * Get container class names for the button group component
 */
export const getButtonGroupStyles = {
  container: (size: ButtonGroupSize, isStacked: boolean): string => {
    const theme = themeConfig.euler.buttonGroup;

    // Get base container classes
    const baseClasses = theme.base.container;

    // Get spacing classes based on stacked state and size
    const spacingClasses = isStacked ? theme.spacing.stacked : theme.spacing.nonStacked[size];

    return cn(baseClasses, spacingClasses);
  },

  /**
   * Get button styling classes based on position in group
   */
  button: (index: number, total: number, isStacked: boolean): string => {
    if (!isStacked) {
      return themeConfig.euler.buttonGroup.buttonStyles.nonStacked;
    }

    const { stacked } = themeConfig.euler.buttonGroup.buttonStyles;

    if (index === 0) {
      return stacked.first;
    } else if (index === total - 1) {
      return stacked.last;
    } else {
      return stacked.middle;
    }
  },
};
