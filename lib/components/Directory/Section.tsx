import React from 'react'
import { SectionProps } from './types'
import { ChevronRight } from 'lucide-react'
import NavItem from './NavItem'

const Section = ({
  section,
  sectionIndex,
  // totalSections,
  onNavigateBetweenSections,
}: SectionProps) => {
  const [isOpen, setIsOpen] = React.useState(section.defaultOpen !== false)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const headerRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<Array<React.RefObject<HTMLElement | null>>>([])

  // Initialize refs for each item
  React.useEffect(() => {
    if (section.items) {
      itemRefs.current = section.items.map(() => React.createRef<HTMLElement | null>())
    }
  }, [section.items])

  const toggleSection = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleSection()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        // Navigate to the first item in the section
        const firstItem = sectionRef.current?.querySelector("ul")?.querySelector("button, a")
        if (firstItem) {
          ; (firstItem as HTMLElement).focus()
        } else {
          // If no items, go to the next section
          onNavigateBetweenSections("down", sectionIndex)
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      // Navigate to the previous section
      onNavigateBetweenSections("up", sectionIndex)
    }
  }

  const handleItemNavigation = (direction: "up" | "down", currentIndex: number) => {
    if (direction === "up") {
      if (currentIndex === 0) {
        // If at the first item and going up, focus the section header
        headerRef.current?.focus()
      } else {
        // Focus the previous item
        const prevItem = sectionRef.current?.querySelector("ul")?.querySelectorAll("button, a")[currentIndex - 1]
        if (prevItem) {
          ; (prevItem as HTMLElement).focus()
        }
      }
    } else {
      if (currentIndex === (section.items?.length || 0) - 1) {
        // If at the last item and going down, go to the next section
        onNavigateBetweenSections("down", sectionIndex)
      } else {
        // Focus the next item
        const nextItem = sectionRef.current?.querySelector("ul")?.querySelectorAll("button, a")[currentIndex + 1]
        if (nextItem) {
          ; (nextItem as HTMLElement).focus()
        }
      }
    }
  }

  const isCollapsible = section.isCollapsible !== false

  return (
    <div
      ref={sectionRef}
      className="w-full py-3 px-2"
      data-state={isOpen ? "open" : "closed"}
      key={`section-${sectionIndex}`}
    >
      {section.label && (
        <div
          ref={headerRef}
          className={`px-3 h-8 text-body-sm font-medium text-gray-400 uppercase flex items-center gap-2 mb-2 focus:bg-gray-100 focus:outline-none focus:ring-0 user-select-none ${isCollapsible ? "cursor-pointer" : ""}`}
          onClick={isCollapsible ? toggleSection : undefined}
          onKeyDown={isCollapsible ? handleKeyDown : undefined}
          role={isCollapsible ? "button" : undefined}
          tabIndex={isCollapsible ? 0 : undefined}
          aria-expanded={isCollapsible ? isOpen : undefined}
          aria-controls={isCollapsible ? `section-content-${sectionIndex}` : undefined}
        >
          <p>{section.label}</p>
          {isCollapsible && (
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-150 ${isOpen ? "-rotate-90" : ""}`}
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {section.items && isOpen && (
        <ul
          className="w-full space-y-2"
          id={`section-content-${sectionIndex}`}
          role="menu"
          aria-label={`${section.label} menu`}
        >
          {section.items.map((item, itemIdx) => (
            <NavItem
              key={itemIdx}
              item={item}
              index={itemIdx}
              // totalItems={section.items?.length || 0}
              onNavigate={handleItemNavigation}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Section