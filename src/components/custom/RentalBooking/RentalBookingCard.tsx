import { MapPin, Wrench, Users, User, Maximize, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ProductInfo {
    id: string
    nome: string
    categoria: string
    capacidade?: number
    area?: number
    imagem: string
    precoHora: number
    precoDia: number
    tipo: "espaco" | "equipamento" | "servico"
    localizacao?: string
}

interface RentalBookingCardProps {
    product: ProductInfo
    onPayment: (bookingData: any) => void
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

// Gerar horários de 8h às 22h
const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 22; hour++) {
        slots.push(`${hour.toString().padStart(2, "0")}:00`)
    }
    return slots
}

export default function RentalBookingCard({
    product = {
        id: "ESP-001",
        nome: "Auditório Premium",
        categoria: "Auditório",
        capacidade: 150,
        area: 200,
        imagem: "/placeholder.svg?height=200&width=300",
        precoHora: 180.0,
        precoDia: 1200.0,
        tipo: "espaco",
        localizacao: "Campus Central - São Paulo",
    },
    onPayment = (data: any) => console.log("Dados do pagamento:", data),
}: RentalBookingCardProps) {

    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [rentalType, setRentalType] = useState<"hora" | "dia">("dia")
    const [activityTitle, setActivityTitle] = useState("")
    const [activityDescription, setActivityDescription] = useState("")

    const config = tipoConfig[product.tipo]
    const IconComponent = config.icon
    const timeSlots = generateTimeSlots()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0

        if (rentalType === "dia") {
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
            return diffDays * product.precoDia
        } else {
            if (!startTime || !endTime) return 0
            const [startHour] = startTime.split(":").map(Number)
            const [endHour] = endTime.split(":").map(Number)
            const hours = endHour - startHour
            return hours * product.precoHora
        }
    }

    const handlePayment = () => {
        const bookingData = {
            productId: product.id,
            startDate,
            endDate,
            startTime: rentalType === "hora" ? startTime : undefined,
            endTime: rentalType === "hora" ? endTime : undefined,
            rentalType,
            activityTitle,
            activityDescription,
            totalPrice: calculateTotal(),
        }
        onPayment(bookingData)
    }

    const isFormValid = () => {
        const hasBasicInfo = startDate && endDate && activityTitle && activityDescription
        const hasTimeInfo = rentalType === "dia" || (startTime && endTime)
        return hasBasicInfo && hasTimeInfo
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl">Solicitar Aluguel</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Resumo do Produto */}
                <div className="flex max-[600px]:flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.imagem || "/placeholder.svg"} alt={product.nome} className="object-cover h-full" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex max-[300px]:flex-col items-center max-[300px]:items-start gap-2">
                            <div className={`${config.color} flex items-center gap-1 p-1 rounded-full`}>
                                <IconComponent className="h-3 w-3" />
                                {config.label}
                            </div>
                            <div className="p-1 rounded-full border">{product.categoria}</div>
                        </div>
                        <h3 className="font-semibold text-lg">{product.nome}</h3>
                        {product.localizacao && (
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {product.localizacao}
                            </p>
                        )}
                        <div className="flex max-[300px]:flex-col gap-4 text-sm text-gray-600">
                            {product.capacidade && (
                                <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {product.capacidade} pessoas
                                </span>
                            )}
                            {product.area && (
                                <span className="flex items-center gap-1">
                                    <Maximize className="h-3 w-3" />
                                    {product.area} m²
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                        <p className="text-sm text-gray-600">Por hora: {formatPrice(product.precoHora)}</p>
                        <p className="text-sm text-gray-600">Por dia: {formatPrice(product.precoDia)}</p>
                    </div>
                </div>

                <Separator />

                {/* Formulário de Reserva */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Coluna Esquerda - Datas e Horários */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Período do Aluguel</h3>

                        {/* Tipo de Aluguel */}
                        <div className="space-y-2">
                            <Label>Tipo de Aluguel</Label>
                            <Select
                                value={rentalType}
                                onValueChange={(value: "hora" | "dia") => setRentalType(value)}
                            >
                                <SelectTrigger className="text-black ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                    <SelectValue placeholder="Selecione o modelo de cobrança" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dia">Por dia</SelectItem>
                                    <SelectItem value="hora">Por hora</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Seleção de Datas */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Data de Início</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent truncate">
                                            <CalendarDays className="mr-2 h-4 w-4 text-blueDark" />
                                            {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-2">
                                <Label>Data de Fim</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent truncate">
                                            <CalendarDays className="mr-2 h-4 w-4 text-blueDark" />
                                            {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={endDate}
                                            onSelect={setEndDate}
                                            disabled={(date) => date < new Date() || (startDate ? date < startDate : false)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        {/* Seleção de Horários (apenas se for por hora) */}
                        {rentalType === "hora" && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Horário de Início</Label>
                                    <Select value={startTime} onValueChange={setStartTime}>
                                        <SelectTrigger className="ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                            <SelectValue placeholder="Selecionar horário" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Horário de Fim</Label>
                                    <Select value={endTime} onValueChange={setEndTime}>
                                        <SelectTrigger className="ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                            <SelectValue placeholder="Selecionar horário" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timeSlots.map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Coluna Direita - Atividade */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Detalhes da Atividade</h3>

                        <div className="space-y-2">
                            <Label htmlFor="title">Título da Atividade</Label>
                            <Input
                                className="focus-visible:ring-blueLight"
                                id="title"
                                placeholder="Ex: Palestra sobre Inovação Tecnológica"
                                value={activityTitle}
                                onChange={(e) => setActivityTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição da Atividade</Label>
                            <Textarea
                                className="focus-visible:ring-blueLight resize-none"
                                id="description"
                                placeholder="Descreva brevemente a atividade que será realizada..."
                                rows={4}
                                value={activityDescription}
                                onChange={(e) => setActivityDescription(e.target.value)}
                            />
                        </div>

                        {/* Resumo do Preço */}
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 truncate">
                            <h4 className="font-semibold text-blueDark mb-2">Resumo do Pagamento</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Tipo:</span>
                                    <span className="capitalize">{rentalType === "hora" ? "Por hora" : "Por dia"}</span>
                                </div>
                                {startDate && endDate && (
                                    <div className="flex justify-between">
                                        <span>Período:</span>
                                        <span>
                                            {format(startDate, "dd/MM", { locale: ptBR })} - {format(endDate, "dd/MM", { locale: ptBR })}
                                        </span>
                                    </div>
                                )}
                                {rentalType === "hora" && startTime && endTime && (
                                    <div className="flex justify-between">
                                        <span>Horário:</span>
                                        <span>
                                            {startTime} - {endTime}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-semibold text-blueDark">
                                <span>Total:</span>
                                <span>{formatPrice(calculateTotal())}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-6 max-[500px]:grid-cols-1">
                <Button
                    variant={"outline"}
                    size="lg"
                    className="w-full border-yellowDark text-yellowDark hover:text-yellowDark hover:bg-yellow-100"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handlePayment}
                    disabled={!isFormValid()}
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 truncate"
                >
                    Pagamento - {formatPrice(calculateTotal())}
                </Button>
            </CardFooter>
        </Card>
    )
}

export { RentalBookingCard }