import * as React from "react"
import {
    Contact,
    PackagePlus,
} from "lucide-react"
import { NavUser } from "../NavUser"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

type UserSidebarProps = {
    onMenuClick: (option: number) => void;
    activeOption: number;
    props?: React.ComponentProps<typeof Sidebar>;
};

export default function UserSidebar({
    onMenuClick,
    activeOption,
    ...props
}: UserSidebarProps) {

    const data = {
        user: {
            name: "username",
            avatar: "/avatars/shadcn.jpg",
        },
        items: [
            {
                id: 0,
                title: "Cadastrar produtos",
                // url: "#",
                icon: PackagePlus,
            },
            {
                id: 1,
                title: "Associar-se",
                // url: "#",
                icon: Contact,
            },
        ],
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavUser user={data.user} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        className={`hover:cursor-pointer ${activeOption === item.id && "bg-orange-100 text-orangeLight"}`}
                                        onClick={() => onMenuClick(item.id)}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-default hover:bg-transparent hover:text-current"
                >
                    <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <img
                            src="/src/assets/logo multi.png"
                            alt="Logo UEPB MULTI"
                            className="size-8"
                        />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">UEPB MULTI</span>
                    </div>
                </SidebarMenuButton>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export { UserSidebar }