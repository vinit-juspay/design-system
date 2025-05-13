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
}, ref) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  console.log(children, data, topbar, activeTenant, setActiveTenant, activeMerchant, setActiveMerchant)

  return <div ref={ref} className="w-full h-full flex bg-gray-25">
    {isExpanded &&
      <aside className="max-w-[300px] w-full border-r border-gray-200 bg-gray-25 max-h-full flex">
        <div className="w-fit h-full border-r border-gray-200 bg-gray-25 flex flex-col gap-4 items-center p-2.5">
          {tenants && tenants.map((tenant, index) => (
            <button onClick={() => setActiveTenant?.(tenant.label)} data-active={activeTenant === tenant.label} key={index} className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointe outline outline-gray-150 data-[active=true]:outline-primary-500 duration-75 ">
              {tenant.icon}
            </button>
          ))}
        </div>

        <div className="w-full h-full">

          {/* MERCHANT SWITCHER  */}
          <div className="w-full p-4 flex items-center justify-between gap-4"> {merchants.length > 1 ? <MenuDropdown
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

          {/* DIRECTORY  */}
          <Directory directoryData={data} />
        </div>
      </aside>}

    <section className="w-full relative overflow-y-auto">
      {/* TOPBAR  */}
      <div className="w-full h-16 border-b border-gray-200 bg-white sticky top-0 flex debug items-center gap-3">

        <div className="w-fit shrink-0 flex items-center gap-2">
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


        <div className="w-full flex-1">{topbar}</div>
      </div>

      {/* CONTENT */}
      <div className="w-full h-full">{children}</div>
    </section>

  </div>

})

// const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({
//   children,
//   data,
//   topbar,
//   activeTenant,
//   setActiveTenant,
//   activeMerchant,
//   setActiveMerchant,
// }, ref) => {




//   // const hasTenants = data.length > 0 && data[0].label !== null;
//   // const selectedTenant = data.find(tenant => tenant.label === activeTenant);
//   // const selectedMerchant = selectedTenant?.merchantData.find(merchant => merchant.label === activeMerchant);
//   // const [isExpanded, setIsExpanded] = useState<boolean>(true);

//   // const merchantOptions = selectedTenant?.merchantData.map(merchant => ({
//   //   id: merchant.label,
//   //   text: merchant.label,
//   // })) || [];

//   return <div></div>

//   // return (
//   //   <div className="w-full h-full flex">
//   //     {isExpanded && <aside className="max-w-[300px] w-full border-r border-gray-200 bg-gray-25 max-h-full flex" ref={ref}>
//   //       {/* TENANT SIDE BAR */}
//   //       {hasTenants && <div className="w-fit h-full border-r border-gray-200 bg-gray-25 flex flex-col gap-4 items-center p-2.5">
//   //         {data.map((tenant, index) => (
//   //           <button data-active={activeTenant === tenant.label} tabIndex={0} onClick={() => setActiveTenant?.(tenant.label)} key={index} className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointe outline outline-gray-150 data-[active=true]:outline-primary-500 duration-75 ">{tenant.icon}</button>
//   //         ))}
//   //       </div>}

//   //       {/* MAIN SIDE BAR */}
//   //       <div className="w-full h-full flex flex-col gap-4 items-center">
//   //         {/* MERCHANT DROPDOWN */}
//   //         <div className="w-full py-3.5 px-2 flex items-center justify-between gap-2">
//   //           {merchantOptions.length > 1 ? <MenuDropdown
//   //             type={DropdownType.SINGLE_SELECT}
//   //             size={DropdownSize.SMALL}
//   //             subType={DropdownSubType.NO_CONTAINER}
//   //             placeholder="Select Merchant"
//   //             selectedOption={activeMerchant}
//   //             menuItems={merchantOptions}
//   //             onSelect={(item: MenuItemProps | MenuItemProps[]) => {
//   //               if (!Array.isArray(item) && setActiveMerchant) {
//   //                 setActiveMerchant(item.text);
//   //               }
//   //             }}
//   //             width="100%"
//   //           /> : <p>{activeMerchant}</p>}

//   //           <Button onClick={() => setIsExpanded(!isExpanded)} className="outline-none border-none hover:outline-none hover:border-none" buttonType={ButtonType.SECONDARY} subType={ButtonSubType.ICON_ONLY} size={ButtonSize.SMALL} leadingIcon={PanelsTopLeft} />
//   //         </div>

//   //         {/* NAVIGATION ITEMS */}
//   //         {/* <div className="w-full h-full flex-1 flex flex-col gap-4 items-center overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//   //           {selectedMerchant?.sections.map((section, sectionIdx) => <div key={sectionIdx} className="w-full px-2 py-3">
//   //             {section.label &&
//   //               <div className="px-3 text-body-sm font-medium text-gray-400 uppercase flex items-center gap-2 mb-2">
//   //                 <p>{section.label}</p>
//   //                 <div>
//   //                   <ChevronDown className="w-4 h-4" />
//   //                 </div>
//   //               </div>
//   //             }
//   //             <div className="flex flex-col gap-2">
//   //               {section.navItems.map((item, itemIndex) => (
//   //                 <button
//   //                   key={itemIndex}
//   //                   onClick={item.onClick}
//   //                   className={cn(
//   //                     "flex w-full text-body-md items-center gap-2 px-3 py-1.5 text-left text-gray-600 font-500",
//   //                     "hover:bg-gray-100 rounded-sm transition-colors"
//   //                   )}
//   //                 >
//   //                   {item.leftSlot}
//   //                   <span>{item.label}</span>
//   //                   {item.rightSlot}
//   //                 </button>
//   //               ))}
//   //             </div>
//   //           </div>)
//   //           }
//   //         </div> */}

//   //         <Directory  />
//   //       </div>
//   //     </aside>}
//   //     <section className="w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto relative">
//   //       <div className="w-full flex items-center gap-2 px-8 py-4 border-b border-gray-200 sticky top-0 bg-white">
//   //         {!isExpanded && <div className="flex items-center gap-2 w-full">
//   //           <Button onClick={() => setIsExpanded(!isExpanded)} className="outline-none border-none hover:outline-none hover:border-none" buttonType={ButtonType.SECONDARY} subType={ButtonSubType.ICON_ONLY} size={ButtonSize.SMALL} leadingIcon={PanelsTopLeft} />
//   //           {merchantOptions.length > 1 ? <MenuDropdown
//   //             type={DropdownType.SINGLE_SELECT}
//   //             size={DropdownSize.SMALL}
//   //             subType={DropdownSubType.NO_CONTAINER}
//   //             placeholder="Select Merchant"
//   //             selectedOption={activeMerchant}
//   //             menuItems={merchantOptions}
//   //             onSelect={(item: MenuItemProps | MenuItemProps[]) => {
//   //               if (!Array.isArray(item) && setActiveMerchant) {
//   //                 setActiveMerchant(item.text);
//   //               }
//   //             }}
//   //             width="100%"
//   //           /> : <p>{activeMerchant}</p>}
//   //         </div>}
//   //         <div className="w-full ">{topbar}</div>
//   //       </div>
//   //       <div className="w-full h-full">
//   //         {children}
//   //       </div>
//   //     </section>
//   //   </div>
//   // );
// });

Sidebar.displayName = "Sidebar";

export default Sidebar;