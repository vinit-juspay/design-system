export interface SidebarItems {
  name?: string
  items: SidebarItem[]
  showSeperator?: boolean
  isCollapsible?: boolean
}

export interface SidebarItem {
  label: string
  items?: SidebarItem[]
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  
}

export interface SidebarProps {
  sections: SidebarItems[]
  className?: string
}

export interface SidebarSectionProps {
  section: SidebarItems
}
