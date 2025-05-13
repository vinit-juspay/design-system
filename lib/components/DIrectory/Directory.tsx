"use client"

import type React from "react"
import { createRef, useEffect, useRef } from "react"
import { DirectoryProps } from "./types"
import { sampleData } from "./sampleData"
import SidebarSection from "./SidebarSection"

const Directory = ({ directoryData = sampleData }: DirectoryProps) => {
  const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>([])

  useEffect(() => {
    sectionRefs.current = directoryData.map(() => createRef<HTMLDivElement | null>())
  }, [directoryData])

  const handleSectionNavigation = (direction: "up" | "down", currentIndex: number) => {
    const nextIndex =
      direction === "up" ? Math.max(0, currentIndex - 1) : Math.min(directoryData.length - 1, currentIndex + 1)

    if (nextIndex !== currentIndex) {
      const nextSection = document.querySelectorAll("[data-state]")[nextIndex]
      const headerToFocus = nextSection?.querySelector('[role="button"]') as HTMLElement

      if (headerToFocus) {
        headerToFocus.focus()
      }
    }
  }

  return (
    <nav
      className="w-full h-full flex-1 flex flex-col gap-4 items-center overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      aria-label="Directory navigation"
    >
      {directoryData.map((section, sectionIndex) => (
        <SidebarSection
          key={sectionIndex}
          section={section}
          sectionIndex={sectionIndex}
          onNavigateBetweenSections={handleSectionNavigation}
        />
      ))}
    </nav>
  )
}

export default Directory
