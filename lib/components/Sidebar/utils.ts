import { themeConfig } from "../../themeConfig"
import { cn } from "../../utils"

export const getSidebarWrapperStyles = () => {
  return themeConfig.euler.sidebar.base.wrapper
}

export const getSidebarContainerStyles = (isExpanded: boolean) => {
  if (isExpanded) isExpanded = true //FIX: DO WE NEED THIS? THINK OF FALLBACKS
  return cn(themeConfig.euler.sidebar.base.sidebarContainer, isExpanded ? "max-w-[300px]" : "!w-0 border-none")
}

export const getSidebarTenantContainerStyles = () => {
  return themeConfig.euler.sidebar.base.secondarySidebar.tenantContainer
}

export const getSidebarTenantButtonStyles = () => {
  return themeConfig.euler.sidebar.base.secondarySidebar.tenantButton
}

export const getSidebarPrimaryContainerStyles = () => {
  return themeConfig.euler.sidebar.base.primarySidebarContainer
}

export const getSidebarMerchantSwitcherContainerStyles = () => {
  return themeConfig.euler.sidebar.base.merchantSwitcherContainer
}

export const getSidebarDirectoryContainerStyles = () => {
  return themeConfig.euler.sidebar.base.directoryContainer
}

export const getSidebarFooterContainerStyles = () => {
  return themeConfig.euler.sidebar.base.footer.container
}

export const getSidebarFooterGradientBlurContainerStyles = () => {
  return themeConfig.euler.sidebar.base.footer.gradientBlurContainer
}

export const getSidebarMainContentContainerStyles = () => {
  return themeConfig.euler.sidebar.base.mainContentContainer.base
}

export const getSidebarMainContentTopbarWrapperStyles = () => {
  return themeConfig.euler.sidebar.base.mainContentContainer.topbar.wrapper
}