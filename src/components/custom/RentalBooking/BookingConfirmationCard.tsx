import {
    CheckCircle,
    MapPin,
    Wrench,
    Users,
    Calendar,
    Clock,
    Phone,
    Mail,
    Download,
    Printer,
    Home,
    Copy,
    User,
    Maximize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingConfirmationData {
    confirmationNumber: string
    productId: string
    productName: string
    productType: "espaco" | "equipamento" | "servico"
    productCategory: string
    productImage: string
    productLocation?: string
    capacidade?: number
    area?: number
    startDate: Date
    endDate: Date
    startTime?: string
    endTime?: string
    rentalType: "hora" | "dia"
    activityTitle: string
    activityDescription: string
    totalPrice: number
    paymentDate: Date
    customerName: string
    customerEmail: string
    customerPhone: string
}

interface BookingConfirmationCardProps {
    bookingData: BookingConfirmationData
    onBack: () => void;
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

export default function BookingConfirmationCard({
    bookingData = {
        confirmationNumber: "RES-2024-001234",
        productId: "ESP-001",
        productName: "Auditório Premium",
        productType: "espaco",
        productCategory: "Auditório",
        productImage: "/placeholder.svg?height=100&width=100",
        productLocation: "Campus Central - São Paulo",
        capacidade: 150,
        area: 200,
        startDate: new Date(2024, 11, 20),
        endDate: new Date(2024, 11, 22),
        rentalType: "dia",
        activityTitle: "Palestra sobre Inovação Tecnológica",
        activityDescription: "Evento corporativo com apresentações sobre as últimas tendências em tecnologia",
        totalPrice: 3600.0,
        paymentDate: new Date(),
        customerName: "João Silva",
        customerEmail: "joao.silva@email.com",
        customerPhone: "(11) 99999-9999",
    },
    onBack,
}: BookingConfirmationCardProps) {

    const [confirmationCopied, setConfirmationCopied] = useState(false)

    const config = tipoConfig[bookingData.productType]
    const IconComponent = config.icon

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const copyConfirmationNumber = async () => {
        try {
            await navigator.clipboard.writeText(bookingData.confirmationNumber)
            setConfirmationCopied(true)
            setTimeout(() => setConfirmationCopied(false), 2000)
        } catch (err) {
            console.error("Erro ao copiar número de confirmação:", err)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownload = () => {
        // Simular download do comprovante
        console.log("Download do comprovante iniciado")
        alert("Comprovante baixado com sucesso!")
    }

    const onBackToHome = () => {
        console.log("Voltando ao início");
        onBack();
    }

    return (
        <Card className="w-full max-w-4xl overflow-hidden mx-auto">
            <CardHeader className="text-center pb-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-green-800">Reserva Confirmada!</h1>
                        <p className="text-gray-600">Sua solicitação de aluguel foi processada com sucesso</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Número de Confirmação */}
                <Alert className="border-green-200 bg-green-50">
                    <AlertDescription className="flex items-center justify-between">
                        <div className="max-w-[90%] truncate">
                            <span className="text-green-800 font-medium">Número de Confirmação: </span>
                            <span className="font-mono font-bold text-green-900">{bookingData.confirmationNumber}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyConfirmationNumber}
                            className="text-green-700 hover:text-green-800 hover:bg-green-100"
                        >
                            {confirmationCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </AlertDescription>
                </Alert>

                {/* Detalhes da Reserva */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Detalhes da Reserva</h2>

                    {/* Produto */}
                    <div className="flex max-[400px]:flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={bookingData.productImage || "/placeholder.svg"}
                                alt={bookingData.productName}
                                className="object-cover h-full"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex max-[400px]:flex-col items-center max-[400px]:items-start gap-2">
                                <div className={`${config.color} flex items-center gap-1 p-1 rounded-full`}>
                                    <IconComponent className="h-3 w-3 shrink-0" />
                                    {config.label}
                                </div>
                                <div className="p-1 rounded-full border">
                                    {bookingData.productCategory}
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg">{bookingData.productName}</h3>
                            {bookingData.productLocation && (
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <MapPin className="h-3 w-3 shrink-0" />
                                    {bookingData.productLocation}
                                </p>
                            )}
                            <div className="flex max-[400px]:flex-col gap-4 text-sm text-gray-600">
                                {bookingData.capacidade && (
                                    <span className="flex items-center gap-1">
                                        <User className="h-3 w-3 shrink-0" />
                                        {bookingData.capacidade} pessoas
                                    </span>
                                )}
                                {bookingData.area && (
                                    <span className="flex items-center gap-1">
                                        <Maximize className="h-3 w-3 shrink-0" />
                                        {bookingData.area} m²
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Informações da Reserva */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Informações do Período</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-600">Período</p>
                                        <p className="font-medium">
                                            {format(bookingData.startDate, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                                            {format(bookingData.endDate, "dd/MM/yyyy", { locale: ptBR })}
                                        </p>
                                    </div>
                                </div>

                                {bookingData.startTime && bookingData.endTime && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Horário</p>
                                            <p className="font-medium">
                                                {bookingData.startTime} - {bookingData.endTime}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-yellowDark rounded-full flex-shrink-0"></div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tipo de Aluguel</p>
                                        <p className="font-medium capitalize">
                                            {bookingData.rentalType === "hora" ? "Por hora" : "Por dia"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Atividade</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600">Título</p>
                                    <p className="font-medium">{bookingData.activityTitle}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Descrição</p>
                                    <p className="text-sm text-gray-800">{bookingData.activityDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Informações de Pagamento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Informações de Pagamento</h3>
                            <div className="space-y-2">
                                <div className="flex max-[400px]:flex-col justify-between">
                                    <span className="text-gray-600">Valor Total:</span>
                                    <span className="font-semibold">{formatPrice(bookingData.totalPrice)}</span>
                                </div>
                                <div className="flex max-[400px]:flex-col justify-between">
                                    <span className="text-gray-600">Método de Pagamento:</span>
                                    <span className="font-medium">PIX</span>
                                </div>
                                <div className="flex max-[400px]:flex-col justify-between">
                                    <span className="text-gray-600">Data do Pagamento:</span>
                                    <span className="font-medium">
                                        {format(bookingData.paymentDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                    </span>
                                </div>
                                <div className="flex max-[400px]:flex-col justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <div className="text-sm bg-green-100 text-green-800 rounded-full w-fit p-1">
                                        Confirmado
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Dados do Solicitante</h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-600">Nome</p>
                                    <p className="font-medium">{bookingData.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">E-mail</p>
                                    <p className="font-medium max-w-[90%] truncate">{bookingData.customerEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Telefone</p>
                                    <p className="font-medium">{bookingData.customerPhone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Contato */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Para mais informações da reserva, entrar em contato com a instituição resposável</h3>
                        <div className="flex justify-between max-[500px]:flex-col gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                                <span>(11) 3000-0000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                                <span className="max-w-[90%] truncate">suporte@instituicao.edu.br</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex max-[650px]:flex-col gap-3 pt-6">
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 w-full hover:bg-yellow-100 border-yellowDark text-yellowDark hover:text-yellowDark truncate"
                >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Comprovante
                </Button>
                <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="flex-1 w-full hover:bg-yellow-100 border-yellowDark text-yellowDark hover:text-yellowDark truncate"
                >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
                </Button>
                <Button
                    onClick={onBackToHome}
                    className="flex-1 w-full bg-yellowDark hover:bg-yellowNormal truncate"
                >
                    <Home className="mr-2 h-4 w-4" />
                    Voltar ao Início
                </Button>
            </CardFooter>
        </Card>
    )
}

export { BookingConfirmationCard }