import {
  BadgeCheck,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from 'react-router-dom'
import { getFirstName, getUserInitials } from "@/utils/manipulateNames"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

type NavUserProps = {
  onNavUserOption: (navUserOption: number) => void;
  unreadNotifications?: number
}

export default function NavUser({
  onNavUserOption,
  unreadNotifications = 3,
}: NavUserProps) {

  const navigate = useNavigate()
  const [storedUserName, setStoredUserName] = useState("")
  const [storedUserAvatar, setStoredUserAvatar] = useState("")
  const [unreadNotificationsNumber, setUnreadNotificationsNumber] = useState<number>(unreadNotifications)

  const handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('user')
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    })
    navigate('/login')
  }

  const handleUnreadNotifications = () => {
    setUnreadNotificationsNumber(0)
    onNavUserOption(1)
  }

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "";
    const storedUserRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");
    const storedUserAvatar = localStorage.getItem("userProfilePic")
    setStoredUserName(storedUserName);
    setStoredUserAvatar(storedUserAvatar || "");
    console.log("Roles carregadas:", storedUserRoles) // teste
  }, [])

  const initials = getUserInitials(storedUserName);
  const firstName = getFirstName(storedUserName);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={storedUserAvatar} alt={storedUserName} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{firstName}</span>
              </div>
              <ChevronDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onNavUserOption(0)}
              >
                <BadgeCheck />
                Minha conta
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleUnreadNotifications}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center justify-between gap-2">
                    <Bell />
                    Notificações
                  </div>
                  {unreadNotificationsNumber > 0 && (
                    <div className="text-xs px-1.5 py-0.5 min-w-[18px] h-5 bg-yellowDark rounded-full text-grayLight">
                      {unreadNotificationsNumber}
                    </div>
                  )}
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export { NavUser }