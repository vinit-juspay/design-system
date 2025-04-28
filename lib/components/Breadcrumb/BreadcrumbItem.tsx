import { cn } from '../../utils';
import { BreadcrumbItemInternalProps } from './types';
import { getIconSlotClassNames, getBreadcrumbItemClassNames } from './utils';
import { Button, ButtonSubType, ButtonType } from '../Button';

/**
 * BreadcrumbItem component renders individual items in a breadcrumb trail
 * It renders as a link when href is provided, a button when onClick is provided,
 * or a plain span when it's the last item
 */
export const BreadcrumbItem = ({
  label,
  href,
  onClick,
  leftSlot,
  rightSlot,
  className,
  isLast = false,
  isActive = false,
}: BreadcrumbItemInternalProps) => {
  // Use either isActive or isLast to determine if this is the active item
  const isActiveItem = isActive || isLast;
  const itemClasses = getBreadcrumbItemClassNames(isActiveItem);
  
  const content = (
    <div className="flex items-center gap-1.5">
      {leftSlot && (
        <span className={getIconSlotClassNames('left')}>
          {leftSlot}
        </span>
      )}
      <span className="flex-shrink-0">{label}</span>
      {rightSlot && (
        <span className={getIconSlotClassNames('right')}>
          {rightSlot}
        </span>
      )}
    </div>
  );
  
  if (isActiveItem) {
    return <span className={cn(itemClasses, className)} aria-current="page">{content}</span>;
  }
  
  if (href) {
    return (
      <a href={href} className={cn(itemClasses, className)}>
        {content}
      </a>
    );
  }
  
  return (
    <Button 
      onClick={onClick} 
      className={cn(itemClasses, className)}
      buttonType={ButtonType.SECONDARY}
      subType={ButtonSubType.LINK}
    >
      {content}
    </Button>
  );
}; 