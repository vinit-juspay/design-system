import { cn } from '../../utils';
import { BreadcrumbItemInternalProps } from './types';
import { getIconSlotClassNames, getBreadcrumbItemClassNames } from './utils';

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
  showLeftSlot = true,
  showRightSlot = true,
  className,
  isLast = false,
}: BreadcrumbItemInternalProps) => {
  const itemClasses = getBreadcrumbItemClassNames(isLast);
  
  const content = (
    <div className="flex items-center">
      {leftSlot && showLeftSlot && (
        <span className={getIconSlotClassNames('left')}>
          {leftSlot}
        </span>
      )}
      <span className="flex-shrink-0">{label}</span>
      {rightSlot && showRightSlot && (
        <span className={getIconSlotClassNames('right')}>
          {rightSlot}
        </span>
      )}
    </div>
  );
  
  if (isLast) {
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
    <button 
      onClick={onClick} 
      className={cn(itemClasses, className)}
      type="button"
    >
      {content}
    </button>
  );
}; 