import { forwardRef, useState } from "react";
import { SidebarProps } from "./types";
import Directory from "../DIrectory/Directory";
import { DropdownType } from "../Menu/types";
import { MenuDropdown } from "../Menu";
import { DropdownSize } from "../Menu/types";
import { DropdownSubType } from "../Menu/types";
import { MenuItemProps } from "../Menu/types";
import { Button, ButtonSize, ButtonSubType, ButtonType } from "../Button";
import { PanelsTopLeft } from "lucide-react";
import GradientBlur from "../GradientBlur/GradientBlur";


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

  return <div ref={ref} className="w-full h-full flex bg-gray-25">
    <aside className={`max-w-[300px] will-change-transform duration-100 animate-slide-in-from-left w-full border-r border-gray-200 flex ${isExpanded ? "max-w-[300px]" : "max-w-[0px] border-none"}`}>
      {isExpanded &&
        <>
          {/* TENANTS SIDE BAR _ SECONDARY SIDE BAR */}
          <div className="w-fit h-full border-r border-gray-200 bg-gray-25 flex flex-col gap-4 items-center p-2.5">
            {tenants && tenants.map((tenant, index) => (
              <button onClick={() => setActiveTenant?.(tenant.label)} data-active={activeTenant === tenant.label} key={index} className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointe outline outline-gray-150 data-[active=true]:outline-primary-500 duration-75 ">
                {tenant.icon}
              </button>
            ))}
          </div>

          {/* PRIMARY SIDE BAR */}
          <div className="w-full h-full flex flex-col relative">
            {/* MERCHANT SWITCHER  */}
            <div className="w-full h-16 sticky top-0 z-10 bg-gray-25 flex items-center justify-between gap-3 px-2">
              {merchants.length > 1 ? <MenuDropdown
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
              /> : <p>{activeMerchant}</p>}
              <Button onClick={() => setIsExpanded(!isExpanded)} className="outline-none border-none hover:outline-none hover:border-none" buttonType={ButtonType.SECONDARY} subType={ButtonSubType.ICON_ONLY} size={ButtonSize.SMALL} leadingIcon={PanelsTopLeft} />
            </div>
            {/* DIRECTORY */}
            <div className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
              <Directory directoryData={data} className="pb-20" />
            </div>
            {/* FOOTER  */}
            <div className="w-full bg-gray-25 h-16 sticky bottom-0 z-10 flex items-center justify-between gap-3 px-2 border-t border-gray-200">
              <div className="absolute left-0 -top-[65px] right-0 h-16 rotate-180 pointer-events-none z-10">
                <GradientBlur />
              </div>
              {footer}
            </div>
          </div>
        </>
      }
    </aside>
    <section className="w-full h-full relative overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="w-full h-16 sticky top-0 z-10 border-b border-gray-200 bg-white flex items-center gap-3 px-8">
        {isExpanded === false && <div><Button onClick={() => setIsExpanded(!isExpanded)} className="outline-none border-none hover:outline-none hover:border-none" buttonType={ButtonType.SECONDARY} subType={ButtonSubType.ICON_ONLY} size={ButtonSize.SMALL} leadingIcon={PanelsTopLeft} /></div>}
        <div className="flex-1">{topbar}</div>
      </div>
      {children}
    </section>
  </div>
});

Sidebar.displayName = "Sidebar";

export default Sidebar;