import { AskedQuestionsHandler } from "@/components/custom/AskedQuestions";
import { 
    AssociateHandler, 
    RequestsHandler 
} from "@/components/custom/AssociateToCompany";
import { BrowseBookings } from "@/components/custom/BrowseBookings";
import { BrowseProducts } from "@/components/custom/BrowseProducts";
import { NewProduct } from "@/components/custom/NewProduct";
import { UserAccountManagement } from "@/components/custom/UserAccountManagement";
import { BrowseNotifications } from "@/components/custom/UserNotifications";
import { UserSidebar } from "@/components/custom/UserSidebar";
import { 
    SidebarInset, 
    SidebarProvider, 
    SidebarTrigger 
} from "@/components/ui/sidebar";
import { useState } from "react";

export default function User() {

    const [sidebarOption, setSidebarOption] = useState<number>(2);

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
                {sidebarOption === 0 && (<UserAccountManagement />)}
                {sidebarOption === 1 && (<BrowseNotifications />)}
                {sidebarOption === 2 && (<BrowseProducts />)}
                {sidebarOption === 3 && (<BrowseBookings />)}
                {sidebarOption === 4 && (<NewProduct />)}
                {sidebarOption === 5 && (<AssociateHandler />)}
                {sidebarOption === 6 && (<AskedQuestionsHandler />)}
                {sidebarOption === 7 && (<RequestsHandler />)}
            </SidebarInset>
        </SidebarProvider>
    )
}

export { User }