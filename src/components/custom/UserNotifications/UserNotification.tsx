import { Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface UserNotificationProps {
    id: string
    title: string
    description: string
    date: Date
    isRead?: boolean
    onDelete: (id: string) => void
    onMarkAsRead?: (id: string) => void
}

export default function UserNotification({
    id,
    title,
    description,
    date,
    isRead = false,
    onDelete,
    onMarkAsRead,
}: UserNotificationProps) {

    const handleDelete = () => {
        onDelete(id)
    }

    const handleClick = () => {
        if (!isRead && onMarkAsRead) {
            onMarkAsRead(id)
        }
    }

    const formatNotificationDate = (date: Date) => {
        const now = new Date()
        const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(diffInHours * 60)
            return `${diffInMinutes} min atrás`
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h atrás`
        } else if (diffInHours < 48) {
            return "Ontem"
        } else {
            return format(date, "dd/MM/yyyy", { locale: ptBR })
        }
    }

    return (
        <Card
            className={`w-full transition-all duration-200 hover:shadow-md overflow-hidden cursor-pointer ${!isRead ? "border-blue-200 bg-blue-50/30" : "bg-white"
                }`}
            onClick={handleClick}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-2">
                        {/* Cabeçalho com título e badge */}
                        <div className="flex items-start justify-between gap-2">
                            <h3 className={`font-semibold text-sm ${!isRead ? "text-gray-900" : "text-gray-700"}`}>
                                {title}
                            </h3>
                            {!isRead && (
                                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                    Nova
                                </div>
                            )}
                        </div>

                        {/* Descrição */}
                        <p className={`text-sm leading-relaxed ${!isRead ? "text-gray-700" : "text-gray-600"}`}>
                            {description}
                        </p>

                        {/* Data */}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatNotificationDate(date)}</span>
                        </div>
                    </div>

                    {/* Botão de deletar */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete()
                        }}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export { UserNotification }