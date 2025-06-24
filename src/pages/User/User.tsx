import { NewProduct } from "@/components/custom/NewProduct";
import { UserSidebar } from "@/components/custom/UserSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export default function User() {

    const [sideBarOption, setSideBarOption] = useState(0);

    function handleMenuClick(option: number) {
        setSideBarOption(option);
    }

    return (
        <SidebarProvider>
            <UserSidebar
                onMenuClick={handleMenuClick}
                activeOption={sideBarOption}
            />
            <SidebarTrigger className="hover:cursor-pointer" />
            <SidebarInset>
                <NewProduct />
            </SidebarInset>
        </SidebarProvider>
    )
}

export { User }