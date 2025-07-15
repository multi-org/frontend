import { useState } from "react"
import UserNotificationsList from "./UserNotificationsList"

interface UserNotification {
    id: string
    title: string
    description: string
    date: Date
    isRead: boolean
}

export default function BrowseNotifications() {

    const [notifications] = useState<UserNotification[]>([
        {
            id: "1",
            title: "Reserva Confirmada",
            description:
                "Sua reserva do Auditório Premium foi confirmada para 20/12/2024. Número de confirmação: RES-2024-001234",
            date: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
            isRead: false,
        },
        {
            id: "2",
            title: "Pagamento Processado",
            description: "O pagamento de R$ 3.600,00 via PIX foi processado com sucesso para sua reserva RES-2024-001234.",
            date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
            isRead: false,
        },
        {
            id: "3",
            title: "Lembrete de Reserva",
            description:
                "Sua reserva do Projetor 4K está agendada para amanhã às 14:00. Não se esqueça de chegar 15 minutos antes.",
            date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
            isRead: false,
        },
        {
            id: "4",
            title: "Avaliação Pendente",
            description: "Como foi sua experiência com a Consultoria em TI? Deixe sua avaliação e ajude outros usuários.",
            date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
            isRead: true,
        },
        {
            id: "5",
            title: "Nova Funcionalidade",
            description: "Agora você pode cancelar suas reservas diretamente pelo app até 24h antes do evento. Confira!",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
            isRead: true,
        },
    ])

    const handleDeleteNotification = (id: string) => {
        console.log("Deletando notificação:", id)
        // Aqui você implementaria a lógica de deletar da API
    }

    const handleMarkAsRead = (id: string) => {
        console.log("Marcando como lida:", id)
        // Aqui você implementaria a lógica de marcar como lida na API
    }

    const handleMarkAllAsRead = () => {
        console.log("Marcando todas como lidas")
        // Aqui você implementaria a lógica de marcar todas como lidas na API
    }

    const handleClearAll = () => {
        console.log("Limpando todas as notificações")
        // Aqui você implementaria a lógica de limpar todas na API
    }

    return (
        <div className="flex flex-col flex-1 min-w-0 w-full">
            <div className="p-4 sm:p-6">
                <UserNotificationsList
                    notifications={notifications}
                    onDeleteNotification={handleDeleteNotification}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onClearAll={handleClearAll}
                />
            </div>
        </div>
    )
}

export { BrowseNotifications }