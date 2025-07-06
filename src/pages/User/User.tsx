import { AskedQuestionsHandler } from "@/components/custom/AskedQuestions";
import { AssociateHandler } from "@/components/custom/AssociateToCompany";
import { BrowseProducts } from "@/components/custom/BrowseProducts";
import { NewProduct } from "@/components/custom/NewProduct";
import { UserAccountManagement } from "@/components/custom/UserAccountManagement";
import { UserSidebar } from "@/components/custom/UserSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export default function User() {

    const [sidebarOption, setSidebarOption] = useState(1);

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
                {sidebarOption === 1 && (<BrowseProducts />)}
                {sidebarOption === 2 && (<NewProduct />)}
                {sidebarOption === 3 && (<AssociateHandler />)}
                {sidebarOption === 4 && (<AskedQuestionsHandler />)}
                {sidebarOption === 0 && (<UserAccountManagement />)}
            </SidebarInset>
        </SidebarProvider>
    )
}

export { User }