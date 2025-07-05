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
import { useToast } from '@/components/ui/use-toast'
import { getFirstName, getUserInitials } from "@/utils/manipulateNames"
import { useEffect, useState } from "react"

export default function NavUser() {

  const navigate = useNavigate()
  const { toast } = useToast()
  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")

  const handleLogout = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('user')
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    })
    navigate('/login')
  }

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || ""
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    setUserName(storedName)
    setUserAvatar(storedUser.avatar || "")
  }, [])

  const initials = getUserInitials(userName);
  const firstName = getFirstName(userName);

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
                <AvatarImage src={userAvatar} alt={userName} />
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
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                Minha conta
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Bell />
                Notificações
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