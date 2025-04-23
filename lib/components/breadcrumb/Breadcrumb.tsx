import { forwardRef, useState, useRef, useEffect } from 'react';
import { BreadcrumbItemProps, BreadcrumbProps, BreadcrumbVariant } from './types';
import { getBreadcrumbContainerClassNames, getBreadcrumbItemClassNames, getDividerClassNames, getMoreButtonClassNames, getIconSlotClassNames } from './utils';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

const BreadcrumbItem = ({
  label,
  href,
  onClick,
  leftSlot,
  rightSlot,
  showLeftSlot = true,
  showRightSlot = true,
  className,
  isLast = false,
}: BreadcrumbItemProps & { isLast?: boolean }) => {
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
    <button onClick={onClick} className={cn(itemClasses, className)}>
      {content}
    </button>
  );
};

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      items,
      className,
      variant = BreadcrumbVariant.DEFAULT,
    },
    ref
  ) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerClassName = getBreadcrumbContainerClassNames();
    const breadcrumbTheme = themeConfig.euler.breadcrumb;
    const MAX_ITEMS = 4; // Fixed constant instead of a prop
    
    // Process items to ensure last item has no href
    const processedItems = items.map((item, index) => ({
      ...item,
      href: index === items.length - 1 ? undefined : item.href
    }));
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current && 
          buttonRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    // Show all items if variant is DEFAULT or if items count is less than or equal to MAX_ITEMS and variant is TRUNCATED
    if (variant === BreadcrumbVariant.DEFAULT || (processedItems.length <= MAX_ITEMS && variant === BreadcrumbVariant.TRUNCATED)) {
      return (
        <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
          <ol className="flex items-center">
            {processedItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <BreadcrumbItem {...item} isLast={index === processedItems.length - 1} />
                {index < processedItems.length - 1 && (
                  <span className={getDividerClassNames()}>/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      );
    }
    
    // Show truncated view for more than MAX_ITEMS
    const firstItems = processedItems.slice(0, 1);
    const lastItems = processedItems.slice(-3);
    const moreItems = processedItems.slice(1, -3);
    
    return (
      <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
        <ol className="flex items-center">
          {/* First item */}
          <li key="first" className="flex items-center">
            <BreadcrumbItem {...firstItems[0]} isLast={false} />
            <span className={getDividerClassNames()}>/</span>
          </li>
          
          {/* More button with dropdown */}
          <li key="dropdown" className="flex items-center relative">
            <button 
              ref={buttonRef}
              className={getMoreButtonClassNames(showDropdown)} 
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Show more breadcrumbs"
              aria-expanded={showDropdown}
              aria-haspopup="menu"
            >
              ...
            </button>
            
            {/* Dropdown menu */}
            {showDropdown && (
              <div 
                ref={dropdownRef}
                className={breadcrumbTheme.dropdown.container}
                role="menu"
              >
                {moreItems.map((item, index) => (
                  <div key={index} className={breadcrumbTheme.dropdown.item}>
                    <BreadcrumbItem 
                      {...item} 
                      isLast={false}
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        setShowDropdown(false);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <span className={getDividerClassNames()}>/</span>
          </li>
          
          {/* Last items */}
          {lastItems.map((item, index) => (
            <li key={`last-${index}`} className="flex items-center">
              <BreadcrumbItem 
                {...item} 
                isLast={index === lastItems.length - 1} 
              />
              {index < lastItems.length - 1 && (
                <span className={getDividerClassNames()}>/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
