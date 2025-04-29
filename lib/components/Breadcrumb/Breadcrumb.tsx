import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbProps, BreadcrumbVariant } from './types';
import {
  getBreadcrumbContainerClassNames,
  getDividerClassNames,
  getMoreButtonClassNames,
} from './utils';

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ items, className, variant }, ref) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerClassName = getBreadcrumbContainerClassNames();
    const breadcrumbTheme = themeConfig.euler.breadcrumb;
    const MAX_ITEMS = 4; // Fixed constant instead of a prop

    const processedItems = items.map((item, index) => ({
      ...item,
      href: index === items.length - 1 ? undefined : item.href,
      isActive: index === items.length - 1,
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

    const renderFullBreadcrumb = () => (
      <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
        <ol className="flex items-center gap-2">
          {processedItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <BreadcrumbItem {...item} isLast={index === processedItems.length - 1} />
              {index < processedItems.length - 1 && (
                <span className={getDividerClassNames()}>/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );

    const renderTruncatedBreadcrumb = () => {
      const firstItems = processedItems.slice(0, 1);
      const lastItems = processedItems.slice(-3);
      const moreItems = processedItems.slice(1, -3);

      firstItems.forEach(item => (item.isActive = false));
      moreItems.forEach(item => (item.isActive = false));
      lastItems.forEach((item, index) => {
        item.isActive =
          index === lastItems.length - 1 && item === processedItems[processedItems.length - 1];
      });

      return (
        <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
          <ol className="flex items-center gap-2">
            {/* First item */}
            <li key="first" className="flex items-center gap-2">
              <BreadcrumbItem {...firstItems[0]} isLast={false} />
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
                <div ref={dropdownRef} className={breadcrumbTheme.dropdown.container} role="menu">
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
                  <BreadcrumbItem {...item} isLast={isLastItem} />
                  {!isLastItem && <span className={getDividerClassNames()}>/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      );
    };

    const shouldTruncate =
      variant === BreadcrumbVariant.TRUNCATED ||
      (processedItems.length > MAX_ITEMS && variant !== BreadcrumbVariant.DEFAULT);

    return processedItems.length > MAX_ITEMS && shouldTruncate
      ? renderTruncatedBreadcrumb()
      : renderFullBreadcrumb();
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
