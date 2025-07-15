import { MapPin, Wrench, Users, Calendar, Clock, Eye, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingSummaryData {
    confirmationNumber: string
    productName: string
    productType: "espaco" | "equipamento" | "servico"
    productCategory: string
    productImage: string
    startDate: Date
    endDate: Date
    startTime?: string
    endTime?: string
    rentalType: "hora" | "dia"
    totalPrice: number
    status: "confirmado" | "pendente" | "cancelado" | "concluido"
    activityTitle: string
}

interface ReducedBookingConfirmationCardProps {
    booking: BookingSummaryData
    onViewDetails: (confirmationNumber: string) => void
    onCancel?: (confirmationNumber: string) => void
    onModify?: (confirmationNumber: string) => void
}

const tipoConfig = {
    espaco: {
        label: "Espaço",
        icon: MapPin,
        color: "bg-blue-100 text-blue-800",
    },
    equipamento: {
        label: "Equipamento",
        icon: Wrench,
        color: "bg-green-100 text-green-800",
    },
    servico: {
        label: "Serviço",
        icon: Users,
        color: "bg-purple-100 text-purple-800",
    },
}

const statusConfig = {
    confirmado: {
        label: "Confirmado",
        color: "bg-green-100 text-green-800",
    },
    pendente: {
        label: "Pendente",
        color: "bg-yellow-100 text-yellow-800",
    },
    cancelado: {
        label: "Cancelado",
        color: "bg-red-100 text-red-800",
    },
    concluido: {
        label: "Concluído",
        color: "bg-gray-100 text-gray-800",
    },
}

export default function ReducedBookingConfirmationCard({
    booking = {
        confirmationNumber: "RES-2024-001234",
        productName: "Auditório Premium",
        productType: "espaco",
        productCategory: "Auditório",
        productImage: "/placeholder.svg?height=80&width=80",
        startDate: new Date(2024, 11, 20),
        endDate: new Date(2024, 11, 22),
        rentalType: "dia",
        totalPrice: 3600.0,
        status: "confirmado",
        activityTitle: "Palestra sobre Inovação Tecnológica",
    },
    onViewDetails = (id: string) => console.log("Ver detalhes:", id),
    onCancel = (id: string) => console.log("Cancelar:", id),
    onModify = (id: string) => console.log("Modificar:", id),
}: ReducedBookingConfirmationCardProps) {

    const config = tipoConfig[booking.productType]
    const statusInfo = statusConfig[booking.status]
    const IconComponent = config.icon

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const formatDateRange = () => {
        const startFormatted = format(booking.startDate, "dd/MM", { locale: ptBR })
        const endFormatted = format(booking.endDate, "dd/MM/yyyy", { locale: ptBR })

        if (booking.startDate.getTime() === booking.endDate.getTime()) {
            return format(booking.startDate, "dd/MM/yyyy", { locale: ptBR })
        }

        return `${startFormatted} - ${endFormatted}`
    }

    const canCancel = booking.status === "confirmado" || booking.status === "pendente"
    const canModify = booking.status === "confirmado"

    return (
        <Card className="w-full hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6 overflow-hidden">
                <div className="flex max-[550px]:flex-col gap-4">
                    {/* Imagem do Produto */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={booking.productImage || "/placeholder.svg"}
                            alt={booking.productName}
                            className="object-cover h-full"
                        />
                    </div>

                    {/* Informações Principais */}
                    <div className="flex-1 min-w-0 space-y-2">
                        {/* Linha 1: Badges e Status */}
                        <div className="flex max-[590px]:flex-col items-center max-[550px]:items-start justify-between max-[550px]:absolute max-[550px]:top-32 max-[550px]:left-52 max-[350px]:left-36">
                            <div className="flex max-[550px]:flex-col items-center gap-2">
                                <div className={`${config.color} flex items-center gap-1 text-xs p-1 rounded-full`}>
                                    <IconComponent className="h-3 w-3" />
                                    {config.label}
                                </div>
                                <div className="text-xs p-1 rounded-full border">
                                    {booking.productCategory}
                                </div>
                            </div>
                            <div className={`${statusInfo.color} text-xs p-1 rounded-full max-[550px]:mt-2`}>
                                {statusInfo.label}
                            </div>
                        </div>

                        {/* Linha 2: Nome do Produto */}
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 truncate">
                                {booking.productName}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                                {booking.activityTitle}
                            </p>
                        </div>

                        {/* Linha 3: Data e Horário */}
                        <div className="flex max-[550px]:flex-col items-center max-[550px]:items-start gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span>{formatDateRange()}</span>
                            </div>
                            {booking.startTime && booking.endTime && (
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                        {booking.startTime} - {booking.endTime}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Linha 4: Confirmação e Preço */}
                        <div className="flex max-[550px]:flex-col items-center max-[550px]:items-start justify-between">
                            <span className="text-xs text-gray-500 font-mono">{booking.confirmationNumber}</span>
                            <span className="font-semibold text-gray-900">{formatPrice(booking.totalPrice)}</span>
                        </div>
                    </div>

                    {/* Menu de Ações */}
                    <div className="flex max-[550px]:justify-between items-start gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetails(booking.confirmationNumber)}
                            className="bg-transparent truncate"
                        >
                            Ver reserva
                            <Eye className="h-4 w-4" />
                        </Button>

                        {(canCancel || canModify) && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="bg-transparent">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {canModify && (
                                        <DropdownMenuItem onClick={() => onModify?.(booking.confirmationNumber)}>
                                            Modificar Reserva
                                        </DropdownMenuItem>
                                    )}
                                    {canCancel && (
                                        <DropdownMenuItem onClick={() => onCancel?.(booking.confirmationNumber)} className="text-red-600">
                                            Cancelar Reserva
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export { ReducedBookingConfirmationCard }