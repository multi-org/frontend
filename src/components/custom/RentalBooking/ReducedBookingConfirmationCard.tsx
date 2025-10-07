import { MapPin, Wrench, Users, Calendar, Clock, Eye, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { BookingType } from "@/types/Booking"

interface ReducedBookingConfirmationCardProps {
    booking: BookingType
    onViewDetails: (booking: BookingType) => void
    onCancel?: (confirmationNumber: string) => void
    onModify?: (confirmationNumber: string) => void
}

const typeConfig = {
    SPACE: {
        label: "Espaço",
        icon: MapPin,
        color: "bg-blue-100 text-blue-800",
    },
    EQUIPMENT: {
        label: "Equipamento",
        icon: Wrench,
        color: "bg-green-100 text-green-800",
    },
    SERVICE: {
        label: "Serviço",
        icon: Users,
        color: "bg-purple-100 text-purple-800",
    },
}

const statusConfig = {
    CONFIRMED: {
        label: "Confirmado",
        color: "bg-green-100 text-green-800",
    },
    PENDING: {
        label: "Pendente",
        color: "bg-yellow-100 text-yellow-800",
    },
    CANCELLED: {
        label: "Cancelado",
        color: "bg-red-100 text-red-800",
    },
    COMPLETED: {
        label: "Concluído",
        color: "bg-gray-100 text-gray-800",
    },
}

export default function ReducedBookingConfirmationCard({
    booking,
    onViewDetails,
    onCancel = (id: string) => console.log("Cancelar:", id),
    onModify = (id: string) => console.log("Modificar:", id),
}: ReducedBookingConfirmationCardProps) {

    const tpConfig = typeConfig[booking?.productType]
    const IconComponent = tpConfig.icon

    const stConfig = statusConfig[booking?.status as keyof typeof statusConfig] ?? {
        label: "Indefinido",
        color: "bg-gray-100 text-gray-800",
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const canCancel = booking.status === "CONFIRMED" || booking.status === "PENDING"
    const canModify = booking.status === "CONFIRMED"

    return (
        <Card className="flex flex-col flex-1 min-w-0 w-full hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 sm:p-6 overflow-hidden">
                <div className="flex max-[550px]:flex-col gap-4">
                    {/* Imagem do Produto */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={booking?.productImage[0] || "/placeholder.svg"}
                            alt={booking?.productTitle}
                            className="object-cover h-full"
                        />
                    </div>

                    {/* Informações Principais */}
                    <div className="flex-1 min-w-0 space-y-2">
                        {/* Linha 1: Badges e Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex max-[865px]:flex-col items-center gap-2">
                                <div className={`${tpConfig.color} flex items-center gap-1 text-xs p-1 rounded-full`}>
                                    <IconComponent className="h-3 w-3" />
                                    {tpConfig.label}
                                </div>
                                <div className="text-xs p-1 rounded-full border">
                                    {booking?.productCategory}
                                </div>
                            </div>
                            <div className={`${stConfig.color} text-xs p-1 rounded-full max-[865px]:mt-2`}>
                                {stConfig.label}
                            </div>
                        </div>

                        {/* Linha 2: Nome do Produto */}
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 truncate">
                                {booking?.productTitle}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">
                                {booking?.activityTitle}
                            </p>
                        </div>

                        {/* Linha 3: Data e Horário */}
                        <div className="flex max-[550px]:flex-col items-center max-[550px]:items-start gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-600">Período</p>
                                    <span className="mr-2">Dias:</span>
                                    <span className="flex flex-wrap gap-x-4">
                                        {booking.reservations.map((r, index) => (
                                            <div key={index} className="flex flex-wrap gap-x-2">
                                                <span>
                                                    {format(r.date, "dd/MM", { locale: ptBR })}
                                                </span>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                            </div>

                            {booking?.chargingType === "POR_HORA" && booking?.reservations.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                                    <div>
                                        <p className="mr-2">Horários:</p>
                                        <span className="flex flex-wrap gap-x-4">
                                            {booking.reservations.map((r, index) => (
                                                <div key={index} className="flex flex-wrap gap-x-2">
                                                    <span className="font-semibold">
                                                        dia {format(r.date, "dd/MM", { locale: ptBR })}:
                                                    </span>
                                                    {r.hours.map((hour, i) => (
                                                        <span key={i}>{hour}</span>
                                                    ))}
                                                </div>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Linha 4: Confirmação e Preço */}
                        <div className="flex max-[550px]:flex-col items-center max-[550px]:items-start justify-between">
                            <span className="text-xs text-gray-500 font-mono">
                                Número: {booking?.id}
                            </span>
                            <span className="font-semibold text-gray-900">{formatPrice(booking.finalAmount)}</span>
                        </div>
                    </div>

                    {/* Menu de Ações */}
                    <div className="flex max-[550px]:justify-between items-start gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewDetails(booking)}
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
                                        <DropdownMenuItem onClick={() => onModify?.(booking?.id)}>
                                            Modificar Reserva
                                        </DropdownMenuItem>
                                    )}
                                    {canCancel && (
                                        <DropdownMenuItem onClick={() => onCancel?.(booking?.id)} className="text-red-600">
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