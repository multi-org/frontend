import { AssociateHandler } from "@/components/custom/AssociateToCompany";
import { NewProduct } from "@/components/custom/NewProduct";
import { UserSidebar } from "@/components/custom/UserSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export default function User() {

    const [sidebarOption, setSidebarOption] = useState(0);

    function handleMenuClick(option: number) {
        setSidebarOption(option);
    }

    return (
        <SidebarProvider>
            <UserSidebar
                onMenuClick={handleMenuClick}
                activeOption={sidebarOption}
            />
            <SidebarTrigger className="hover:cursor-pointer" />
            <SidebarInset>
                {sidebarOption === 0 && (<NewProduct />)}
                {sidebarOption === 1 && (<AssociateHandler />)}
            </SidebarInset>
        </SidebarProvider>
    )
}

export { User }