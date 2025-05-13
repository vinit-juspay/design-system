import { ReactNode } from "react"

export interface DirectoryProps {
  directoryData?: DirectoryData[]
}

export interface DirectoryData {
  label?: string
  items?: NavbarItem[]
  isCollapsible?: boolean
  defaultOpen?: boolean
}

export interface NavbarItem {
  label: string
  items?: NavbarItem[]
  leftSlot?: ReactNode
  rightSlot?: ReactNode
  onClick?: () => void
  href?: string
}

export interface SectionProps {
  section: DirectoryData;
  sectionIndex: number;
  // totalSections: number;
  onNavigateBetweenSections: (direction: "up" | "down", currentIndex: number) => void;
}

export interface NavItemProps {
  item: NavbarItem;
  index: number;
  // totalItems: number;
  onNavigate: (direction: "up" | "down", currentIndex: number) => void;
}