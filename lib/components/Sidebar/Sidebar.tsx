"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react"
import { SidebarItem, SidebarProps, SidebarSectionProps } from "./types"




export function Sidebar({ sections, className = "" }: SidebarProps) {
  return (
    <div className={`w-full h-full border-r overflow-y-auto space-y-8 py-2 ${className}`}>
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
      {section.name && (
        <div
          className={`px-4 py-2 text-body-md font-medium text-gray-400 flex items-center gap-2 ${section.isCollapsible ? "cursor-pointer hover:bg-gray-150" : ""}`}
          onClick={toggleSection}
        >
          <span className="">{section.name}</span>
          {section.isCollapsible && (
            <span className="text-gray-400">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
        </div>
      )}

      {(!section.isCollapsible || isOpen) && (
        <div className="mt-1">
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
        className={`flex items-center px-4 py-1.5 text-body-md text-gray-900 font-medium hover:bg-gray-100 cursor-pointer`}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
        onClick={toggleItem}
      >
        {/* {hasChildren ? (
          <span className="mr-1 text-gray-400">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        ) : (
          <span className="mr-1 text-gray-400">
            <File className="h-4 w-4" />
          </span>
        )} */}

        <span className="truncate">{item.label}</span>
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
