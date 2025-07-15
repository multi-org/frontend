import { Bell, BellOff, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import UserNotification from "./UserNotification"

interface UserNotification {
    id: string
    title: string
    description: string
    date: Date
    isRead: boolean
}

interface UserNotificationsListProps {
    notifications?: UserNotification[]
    onDeleteNotification?: (id: string) => void
    onMarkAsRead?: (id: string) => void
    onMarkAllAsRead?: () => void
    onClearAll?: () => void
}

export default function UserNotificationsList({
    notifications = [],
    onDeleteNotification = (id: string) => console.log("Deletar notificação:", id),
    onMarkAsRead = (id: string) => console.log("Marcar como lida:", id),
    onMarkAllAsRead = () => console.log("Marcar todas como lidas"),
    onClearAll = () => console.log("Limpar todas"),
}: UserNotificationsListProps) {

    const [localNotifications, setLocalNotifications] = useState<UserNotification[]>(notifications)

    const handleDelete = (id: string) => {
        setLocalNotifications((prev) => prev.filter((notification) => notification.id !== id))
        onDeleteNotification(id)
    }

    const handleMarkAsRead = (id: string) => {
        setLocalNotifications((prev) =>
            prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
        )
        onMarkAsRead(id)
    }

    const handleMarkAllAsRead = () => {
        setLocalNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
        onMarkAllAsRead()
    }

    const handleClearAll = () => {
        setLocalNotifications([])
        onClearAll()
    }

    const unreadCount = localNotifications.filter((n) => !n.isRead).length
    const hasNotifications = localNotifications.length > 0

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <CardTitle className="text-xl">Notificações</CardTitle>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {unreadCount}
                            </span>
                        )}
                    </div>

                    {hasNotifications && (
                        <div className="flex gap-2">
                            {unreadCount > 0 && (
                                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="text-xs bg-transparent">
                                    <Check className="h-3 w-3 mr-1" />
                                    Marcar todas como lidas
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearAll}
                                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Limpar todas
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {hasNotifications ? (
                    <div className="space-y-0">
                        {localNotifications.map((notification, index) => (
                            <div key={notification.id}>
                                <div className="px-6 py-2">
                                    <UserNotification
                                        id={notification.id}
                                        title={notification.title}
                                        description={notification.description}
                                        date={notification.date}
                                        isRead={notification.isRead}
                                        onDelete={handleDelete}
                                        onMarkAsRead={handleMarkAsRead}
                                    />
                                </div>
                                {index < localNotifications.length - 1 && <Separator className="mx-6" />}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <BellOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notificação</h3>
                        <p className="text-sm text-gray-500">Você está em dia! Não há notificações para exibir no momento.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export { UserNotificationsList }