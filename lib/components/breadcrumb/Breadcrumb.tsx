import { forwardRef, useState, useRef, useEffect } from 'react';
import { BreadcrumbItemProps, BreadcrumbProps, BreadcrumbVariant } from './types';
import { getBreadcrumbContainerClassNames, getBreadcrumbItemClassNames, getDividerClassNames, getMoreButtonClassNames } from './utils';
import { cn } from '../../utils';
import { themeConfig } from '../../themeConfig';

const BreadcrumbItem = ({
  label,
  href,
  isCurrentPage = false,
  onClick,
  className,
}: BreadcrumbItemProps) => {
  const itemClasses = getBreadcrumbItemClassNames(isCurrentPage);
  
  if (isCurrentPage) {
    return <span className={cn(itemClasses, className)} aria-current="page">{label}</span>;
  }
  
  if (href) {
    return (
      <a href={href} className={cn(itemClasses, className)}>
        {label}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={cn(itemClasses, className)}>
      {label}
    </button>
  );
};

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  (
    {
      items,
      variant = BreadcrumbVariant.DEFAULT,
      className,
    },
    ref
  ) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerClassName = getBreadcrumbContainerClassNames();
    const breadcrumbTheme = themeConfig.euler.breadcrumb;
    const MAX_ITEMS = 4; // Fixed constant instead of a prop
    
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
    
    // Show all items if variant is DEFAULT or if items count is less than or equal to MAX_ITEMS
    if (variant === BreadcrumbVariant.DEFAULT || items.length <= MAX_ITEMS) {
      return (
        <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
          <ol className="flex items-center">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <BreadcrumbItem {...item} />
                {index < items.length - 1 && (
                  <span className={getDividerClassNames()}>/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      );
    }
    
    // Show truncated view for TRUNCATED variant with more than MAX_ITEMS
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-2);
    const moreItems = items.slice(1, -2);
    
    return (
      <nav aria-label="Breadcrumb" ref={ref} className={cn(containerClassName, className)}>
        <ol className="flex items-center">
          {/* First item */}
          <li className="flex items-center">
            <BreadcrumbItem {...firstItems[0]} />
            <span className={getDividerClassNames()}>/</span>
          </li>
          
          {/* More button with dropdown */}
          <li className="flex items-center relative">
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
            <li key={index} className="flex items-center">
              <BreadcrumbItem {...item} />
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
