"use client"

import type React from "react"
import { createRef, useEffect, useRef } from "react"
import { DirectoryProps } from "./types"
import Section from "./Section"

const Directory = ({ directoryData, className }: DirectoryProps) => {
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
      className={`w-full h-full flex-1 flex flex-col items-center overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}
      aria-label="Directory navigation"
    >
      {directoryData.map((section, sectionIndex) => (
        <Section
          key={sectionIndex}
          section={section}
          sectionIndex={sectionIndex}
          onNavigateBetweenSections={handleSectionNavigation}
        />
      ))}
    </nav>
  )
}

Directory.displayName = "Directory"

export default Directory
