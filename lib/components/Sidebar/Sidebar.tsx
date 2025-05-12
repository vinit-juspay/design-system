"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react"
import { SidebarItem, SidebarProps, SidebarSectionProps } from "./types"


export function Sidebar({ sections, className = "" }: SidebarProps) {
  return (
    <div className={`w-full h-full border-r overflow-y-auto debug space-y-8 py-2 px-1 ${className}`} style={{scrollbarWidth: "none"}}>
      {sections.map((section, index) => (
        <SidebarSection key={index} section={section} />
      ))}
    </div>
  )
}


function SidebarSection({ section }: SidebarSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  const toggleSection = () => {
    if (section.isCollapsible) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="">
      {/* Section Header */}
      {section.name && (
        <div
          className={`px-4 py-2 text-body-md font-medium rounded-sm text-gray-1000 flex items-center gap-2 ${section.isCollapsible ? "cursor-pointer hover:bg-gray-150" : ""}`}
          onClick={toggleSection}
        >
          <span className="">{section.name}</span>
          {section.isCollapsible && (
            <span className="text-gray-400">
              <ChevronRight className="h-4 w-4 transition-transform duration-200 touch-none" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
            </span>
          )}
        </div>
      )}

      {(!section.isCollapsible || isOpen) && (
        <div className="mt-1 debug">
          {section.items.map((item, index) => (
            <SidebarItemComponent key={index} item={item} level={0} />
          ))}
        </div>
      )}

      {section.showSeperator && <div className="h-px border-t border-dashed border-gray-200 my-2 mx-4" />}
    </div>
  )
}

interface SidebarItemComponentProps {
  item: SidebarItem
  level: number
}

function SidebarItemComponent({ item, level }: SidebarItemComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hasChildren = item.items && item.items.length > 0

  const toggleItem = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div>
      <div
        className={`flex gap-2 items-center justify-between px-3 py-1.5 text-body-md text-gray-600 font-medium cursor-pointer`}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
        onClick={toggleItem}
      >
        <div className="flex flex-1 shrink-0 items-center gap-2 overflow-hidden whitespace-nowrap">
          {item.leftSlot && <div className="flex items-center justify-center w-5 h-5">{item.leftSlot}</div>}
          <span className="truncate">{item.label}</span>
          {item.rightSlot && <div className="flex items-center justify-center w-5 h-5">{item.rightSlot}</div>}
        </div>
        {hasChildren && <div className="flex items-center justify-center w-5 h-5">
          <ChevronDown className="h-4 w-4 transition-transform duration-200 touch-none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
        </div>}
      </div>

      {hasChildren && isOpen && (
        <div >
          {item.items!.map((childItem, index) => (
            <SidebarItemComponent key={index} item={childItem} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
