import { forwardRef, useState, useRef, useEffect } from 'react';
import { BreadcrumbProps, BreadcrumbVariant } from './types';
import { getBreadcrumbContainerClassNames, getDividerClassNames, getMoreButtonClassNames } from './utils';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import { BreadcrumbItem } from './BreadcrumbItem';

/**
 * Breadcrumb component renders a navigation trail showing the user's location
 * in the application hierarchy. It supports both standard and truncated displays.
 */
export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      items,
      className,
      variant,
    },
    ref
  ) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerClassName = getBreadcrumbContainerClassNames();
    const breadcrumbTheme = themeConfig.euler.breadcrumb;
    const MAX_ITEMS = 4; // Fixed constant instead of a prop
    
    // Process items to ensure last item has no href and mark active state
    const processedItems = items.map((item, index) => ({
      ...item,
      href: index === items.length - 1 ? undefined : item.href,
      isActive: index === items.length - 1 // Only the very last item is active
    }));
    
    // Handle clicks outside dropdown to close it
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
    
    /**
     * Renders all items in a single row
     * Used when variant is DEFAULT or when there aren't many items
     */
    const renderFullBreadcrumb = () => (
      <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
        <ol className="flex items-center gap-2">
          {processedItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <BreadcrumbItem 
                {...item} 
                isLast={index === processedItems.length - 1} 
              />
              {index < processedItems.length - 1 && (
                <span className={getDividerClassNames()}>/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
    
    /**
     * Renders a truncated breadcrumb with dropdown for hidden middle items
     * Used when variant is TRUNCATED and there are many items
     */
    const renderTruncatedBreadcrumb = () => {
      const firstItems = processedItems.slice(0, 1);
      const lastItems = processedItems.slice(-3);
      const moreItems = processedItems.slice(1, -3);
      const totalItems = processedItems.length;
      
      // Override isActive on all items to ensure consistent styling
      // Only the very last item should have isActive=true
      firstItems.forEach(item => item.isActive = false);
      moreItems.forEach(item => item.isActive = false);
      lastItems.forEach((item, index) => {
        item.isActive = index === lastItems.length - 1 && 
                       item === processedItems[processedItems.length - 1];
      });
      
      return (
        <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
          <ol className="flex items-center gap-2">
            {/* First item */}
            <li key="first" className="flex items-center gap-2">
              <BreadcrumbItem 
                {...firstItems[0]} 
                isLast={false} 
              />
              <span className={getDividerClassNames()}>/</span>
            </li>
            
            {/* More button with dropdown */}
            <li key="dropdown" className="flex items-center gap-2 relative">
              <button 
                ref={buttonRef}
                className={getMoreButtonClassNames(showDropdown)} 
                onClick={() => setShowDropdown(!showDropdown)}
                aria-label="Show more breadcrumbs"
                aria-expanded={showDropdown}
                aria-haspopup="menu"
                type="button"
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
                    <div key={index} className={breadcrumbTheme.dropdown.item} role="menuitem">
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
            {lastItems.map((item, index) => {
              const isLastItem = item.isActive;
              return (
                <li key={`last-${index}`} className="flex items-center gap-2">
                  <BreadcrumbItem 
                    {...item} 
                    isLast={isLastItem} 
                  />
                  {!isLastItem && (
                    <span className={getDividerClassNames()}>/</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      );
    };
    
    // Determine if we should truncate based on:
    // 1. Explicit variant setting (if provided)
    // 2. Item count (automatically truncate if more than MAX_ITEMS and variant not explicitly set to DEFAULT)
    const shouldTruncate = 
      variant === BreadcrumbVariant.TRUNCATED || 
      (processedItems.length > MAX_ITEMS && variant !== BreadcrumbVariant.DEFAULT);
    
    // Show truncated view if shouldTruncate is true AND there are more than MAX_ITEMS
    return (processedItems.length > MAX_ITEMS && shouldTruncate) 
      ? renderTruncatedBreadcrumb() 
      : renderFullBreadcrumb();
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
