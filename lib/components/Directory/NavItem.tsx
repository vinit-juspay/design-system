import React from 'react'
import { NavItemProps } from './types'
import { ChevronDown } from 'lucide-react'

const NavItem = ({
  item,
  index,
  // totalItems,
  onNavigate,
}: NavItemProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const hasChildren = item.items && item.items.length > 0
  const itemRef = React.useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    } else if (item.onClick) {
      item.onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
      e.preventDefault()
      setIsExpanded(true)
    } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
      e.preventDefault()
      setIsExpanded(false)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      onNavigate("down", index)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      onNavigate("up", index)
    }
  }

  const Element = item.href ? "a" : "button"
  const elementProps = item.href ? { href: item.href } : {}

  return (
    <li className="w-full">
      <Element
        {...elementProps}
        ref={itemRef as any}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-start gap-3 text-body-md px-3 py-1.5 text-left text-jp-gray-600 font-500 hover:bg-jp-gray-100 rounded-sm transition-colors focus:bg-jp-gray-100 focus:outline-none focus:ring-0 user-select-none"
        aria-expanded={hasChildren ? isExpanded : undefined}
        role={!item.href ? "button" : undefined}
        tabIndex={0}
      >
        <div className="flex items-center justify-start gap-2">
          {item.leftSlot && <span aria-hidden="true">{item.leftSlot}</span>}
          <span>{item.label}</span>
          {item.rightSlot && <span aria-hidden="true">{item.rightSlot}</span>}
        </div>
        {hasChildren && (
          <div className="flex items-center justify-center ml-auto" aria-hidden="true">
            <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`} />
          </div>
        )}
      </Element>

      {/* Render nested items if expanded */}
      {hasChildren && isExpanded && (
        <ul className="w-full space-y-2 pl-6 mt-2 relative" role="group" aria-label={`${item.label} submenu`}>
          <div className="absolute left-4 top-0 h-full w-[1px] bg-jp-gray-200" aria-hidden="true"></div>
          {item.items &&
            item.items.map((childItem, childIdx) => (
              <NavItem
                key={childIdx}
                item={childItem}
                index={childIdx}
                onNavigate={(direction, currentIndex) => {
                  if (direction === "up" && currentIndex === 0) {
                    itemRef.current?.focus()
                  } else if (direction === "down" && currentIndex === (item.items?.length || 0) - 1) {
                    onNavigate("down", index)
                  } else {
                    const nextIndex =
                      direction === "up"
                        ? Math.max(0, currentIndex - 1)
                        : Math.min((item.items?.length || 0) - 1, currentIndex + 1)
                    const nestedItems = itemRef.current?.parentElement
                      ?.querySelector("ul")
                      ?.querySelectorAll("button, a")
                    if (nestedItems && nestedItems[nextIndex]) {
                      ; (nestedItems[nextIndex] as HTMLElement).focus()
                    }
                  }
                }}
              />
            ))}
        </ul>
      )}
    </li>
  )
}


export default NavItem;