import { forwardRef, useState } from "react";
import { SidebarProps } from "./types";
import Directory from "../Directory/Directory";
import { DropdownType } from "../Menu/types";
import { MenuDropdown } from "../Menu";
import { DropdownSize } from "../Menu/types";
import { DropdownSubType } from "../Menu/types";
import { MenuItemProps } from "../Menu/types";
import { Button, ButtonSize, ButtonSubType, ButtonType } from "../Button";
import { PanelsTopLeft } from "lucide-react";
import GradientBlur from "../GradientBlur/GradientBlur.tsx";
import { getSidebarContainerStyles, getSidebarDirectoryContainerStyles, getSidebarFooterContainerStyles, getSidebarFooterGradientBlurContainerStyles, getSidebarMainContentContainerStyles, getSidebarMainContentTopbarWrapperStyles, getSidebarMerchantSwitcherContainerStyles, getSidebarPrimaryContainerStyles, getSidebarTenantButtonStyles, getSidebarTenantContainerStyles, getSidebarWrapperStyles } from "./utils.ts";

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({
  children,
  data,
  topbar,
  activeTenant,
  setActiveTenant,
  activeMerchant,
  setActiveMerchant,
  tenants,
  merchants,
  footer
}, ref) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return <div ref={ref} className={getSidebarWrapperStyles()}>
    <aside className={getSidebarContainerStyles(isExpanded)}>
      {isExpanded &&
        <>
          {/* TENANTS SIDE BAR _ SECONDARY SIDE BAR */}
          <div className={getSidebarTenantContainerStyles()}>
            {tenants && tenants.map((tenant, index) => (
              // TODO: Add theme config
              <button onClick={() => setActiveTenant?.(tenant.label)} data-active={activeTenant === tenant.label} key={index} className={getSidebarTenantButtonStyles()}>
                {tenant.icon}
              </button>
            ))}
          </div>

          {/* PRIMARY SIDE BAR */}
          <div className={getSidebarPrimaryContainerStyles()}>
            {/* MERCHANT SWITCHER  */}
            <div className={getSidebarMerchantSwitcherContainerStyles()}>
              {merchants.length > 1 ?
                <MenuDropdown
                  type={DropdownType.SINGLE_SELECT}
                  size={DropdownSize.SMALL}
                  subType={DropdownSubType.NO_CONTAINER}
                  placeholder="Select Merchant"
                  menuItems={merchants.map(merchant => ({
                    ...merchant,
                    text: merchant.label
                  }))}
                  onSelect={(item: MenuItemProps | MenuItemProps[]) => {
                    if (!Array.isArray(item) && setActiveMerchant) {
                      setActiveMerchant(item.text);
                    }
                  }}
                  width="100%"
                /> :
                <p>{activeMerchant}</p>
              }
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="outline-none border-none hover:outline-none hover:border-none" buttonType={ButtonType.SECONDARY} subType={ButtonSubType.ICON_ONLY}
                size={ButtonSize.SMALL} leadingIcon={PanelsTopLeft}
              />
            </div>
            {/* DIRECTORY */}
            <div className={getSidebarDirectoryContainerStyles()}>
              <Directory directoryData={data} className="pb-20" />
            </div>
            <SidebarFooter footer={footer} />
          </div>
        </>
      }
    </aside>
    <section className={getSidebarMainContentContainerStyles()}>
      {/* TOPBAR  */}
      <div className={getSidebarMainContentTopbarWrapperStyles()}>
        {isExpanded === false &&
          <div className="flex items-center gap-4 w-fit shrink-0">
            <Button onClick={() => setIsExpanded(!isExpanded)} className="outline-none border-none hover:outline-none hover:border-none" buttonType={ButtonType.SECONDARY} subType={ButtonSubType.ICON_ONLY} size={ButtonSize.SMALL} leadingIcon={PanelsTopLeft} />
            {merchants.length > 1 ?
              <MenuDropdown
                type={DropdownType.SINGLE_SELECT}
                size={DropdownSize.SMALL}
                subType={DropdownSubType.NO_CONTAINER}
                placeholder="Select Merchant"
                selectedOption={activeMerchant}
                menuItems={merchants.map(merchant => ({
                  ...merchant,
                  text: merchant.label
                }))}
                onSelect={(item: MenuItemProps | MenuItemProps[]) => {
                  if (!Array.isArray(item) && setActiveMerchant) {
                    setActiveMerchant(item.text);
                  }
                }}
                width="100%"
              /> :
              <p>{activeMerchant}</p>
            }
          </div>
        }
        <div className="flex-1">{topbar}</div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  </div>
});

const SidebarFooter = ({ footer }: { footer: React.ReactNode }) => {
  return (
    <div className={getSidebarFooterContainerStyles()}>
      <div aria-hidden={true} className={getSidebarFooterGradientBlurContainerStyles()}>
        <GradientBlur />
      </div>
      {footer}
    </div>
  )
}


Sidebar.displayName = "Sidebar";

export default Sidebar;