import { MapPin, Wrench, Users, Copy, Check, Clock, QrCode, Smartphone, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookingType } from "@/types/Booking"

interface PaymentCardProps {
    bookingData: BookingType
    onNext: (bookingData: BookingType) => void
    onBack: () => void
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

export default function PaymentCard({
    bookingData,
    onNext,
    onBack,
}: PaymentCardProps) {

    const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos em segundos
    const [pixCopied, setPixCopied] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "checking" | "confirmed">("pending")

    const config = typeConfig[bookingData?.productType]
    const IconComponent = config.icon

    // Código PIX simulado (normalmente viria da API de pagamento)
    const pixCode =
        "00020126580014br.gov.bcb.pix013636c4c14e-4b8c-4c2a-9b5a-8f2e3d4c5b6a52040000530398654041800.005802BR5925INSTITUICAO DE ENSINO6009SAO PAULO62070503***6304A1B2"

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const calculateDiscount = (percentage: number) => {
        return (bookingData.totalAmount * percentage) / 100
    }

    const calculateFinalAmount = (price: number, percentage: number) => {
        return price - calculateDiscount(percentage)
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0 && paymentStatus === "pending") {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [timeLeft, paymentStatus])

    const onPaymentConfirmed = () => {
        console.log("Pagamento confirmado");
        onNext(bookingData);
    }

    const copyPixCode = async () => {
        try {
            await navigator.clipboard.writeText(pixCode)
            setPixCopied(true)
            setTimeout(() => setPixCopied(false), 2000)
        } catch (err) {
            console.error("Erro ao copiar código PIX:", err)
        }
    }

    const checkPayment = () => {
        setPaymentStatus("checking")
        // Simular verificação de pagamento
        setTimeout(() => {
            // Simular pagamento confirmado (em produção, isso viria da API)
            setPaymentStatus("confirmed")
            setTimeout(() => {
                onPaymentConfirmed()
            }, 2000)
        }, 3000)
    }

    const onCancel = () => {
        console.log("Pagamento cancelado");
        onBack();
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between max-[400px]:flex-col overflow-hidden">
                    <CardTitle className="text-xl flex items-center gap-2 max-[300px]:flex-col max-[300px]:text-ellipsis">
                        <CreditCard className="h-5 w-5 shrink-0" />
                        Pagamento via PIX
                    </CardTitle>
                    <div className="flex items-center gap-2 text-orange-600">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 overflow-hidden">
                {/* Status do Pagamento */}
                {paymentStatus === "checking" && (
                    <Alert className="border-blue-200 bg-blue-50">
                        <Clock className="h-4 w-4" />
                        <AlertDescription>Verificando pagamento... Aguarde alguns instantes.</AlertDescription>
                    </Alert>

                )}

                {paymentStatus === "confirmed" && (
                    <Alert className="border-green-200 bg-green-50">
                        <Check className="h-4 w-4" />
                        <AlertDescription className="text-green-800">
                            Pagamento confirmado! Redirecionando para confirmação da reserva...
                        </AlertDescription>
                    </Alert>
                )}

                {/* Resumo da Reserva */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Resumo da Reserva</h3>
                    <div className="flex gap-4 max-[400px]:flex-col">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={bookingData?.productImage[0] || "/placeholder.svg"}
                                alt={bookingData?.productTitle}
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 max-[400px]:flex-col max-[400px]:items-start">
                                <div className={`${config.color} flex items-center gap-1 p-1 rounded-full`}>
                                    <IconComponent className="h-3 w-3" />
                                    {config.label}
                                </div>
                                <div className="border p-1 rounded-full">{bookingData?.productCategory}</div>
                            </div>
                            <h4 className="font-semibold">{bookingData?.productTitle}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="h-3 w-3 shrink-0" />
                                {bookingData?.productAddress?.street}, {bookingData?.productAddress?.number} - {bookingData?.productAddress?.neighborhood} - {bookingData?.productAddress?.city}, {bookingData?.productAddress?.state}
                            </p>
                        </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium text-gray-700">Atividade:</p>
                            <p className="text-gray-600">{bookingData?.activityTitle}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700">Descrição:</p>
                            <p className="text-gray-600">{bookingData?.activityDescription}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-700">Período:</p>
                            <p className="text-gray-600">
                                {bookingData.startDate && bookingData.endDate
                                    ? `${format(bookingData.startDate, "dd/MM/yyyy", { locale: ptBR })} - ${format(bookingData.endDate, "dd/MM/yyyy", { locale: ptBR })}`
                                    : "Data não definida"
                                }
                            </p>
                            {bookingData.startTime && bookingData.endTime && (
                                <p className="text-gray-600">
                                    {bookingData.startTime} - {bookingData.endTime}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 p-3 bg-white rounded-lg border max-[400px]:flex-col truncate">
                        <span className="font-semibold">Valor total:</span>
                        <span className="text-xl font-medium text-green-600">
                            {formatPrice(bookingData?.totalAmount)}
                        </span>
                    </div>
                    {bookingData?.productDiscount > 0 ? (
                        <div className="flex justify-between items-center mt-4 p-3 bg-white rounded-lg border max-[400px]:flex-col truncate">
                            <span className="font-semibold">Desconto:</span>
                            <span className="text-xl font-medium text-green-600">
                                - {calculateDiscount(bookingData?.productDiscount)}
                            </span>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center mt-4 p-3 bg-white rounded-lg border max-[400px]:flex-col truncate">
                            <span className="font-semibold">Desconto:</span>
                            <span className="font-semibold">Sem desconto</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-4 p-3 bg-white rounded-lg border max-[400px]:flex-col truncate">
                        <span className="font-semibold">Valor final:</span>
                        {bookingData?.totalAmount > 0 && bookingData?.productDiscount > 0 ?
                            (
                                <span className="text-xl font-medium text-green-600">
                                    {calculateFinalAmount(bookingData?.totalAmount, bookingData?.productDiscount)}
                                </span>
                            ) : (
                                <span className="text-xl font-medium text-green-600">
                                    {formatPrice(bookingData?.totalAmount)}
                                </span>
                            )}
                    </div>
                </div>

                <Separator />

                {/* Informações do PIX */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* QR Code */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2 max-[400px]:flex max-[400px]:flex-col">
                            <QrCode className="h-5 w-5 shrink-0" />
                            Escaneie o QR Code
                        </h3>
                        <div className="flex justify-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg truncate">
                            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                <img
                                    src="/placeholder.svg?height=192&width=192"
                                    alt="QR Code PIX"
                                    className="rounded-lg h-48 w-48"
                                />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600">Abra o app do seu banco e escaneie o código</p>
                            <div className="flex items-center justify-center gap-2 max-[300px]:flex-col">
                                <Smartphone className="h-4 w-4 text-gray-500 shrink-0" />
                                <span className="text-xs text-gray-500">Compatível com todos os bancos</span>
                            </div>
                        </div>
                    </div>

                    {/* Código PIX */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Ou copie o código PIX</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-gray-100 rounded-lg border">
                                <p className="text-xs text-gray-600 mb-2">Código PIX:</p>
                                <p className="text-sm font-mono break-all text-gray-800">{pixCode}</p>
                            </div>
                            <Button onClick={copyPixCode} variant="outline" className="w-full bg-transparent truncate" disabled={pixCopied}>
                                {pixCopied ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4 text-green-600" />
                                        Código Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copiar Código PIX
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <h4 className="font-medium text-gray-800">Como pagar:</h4>
                            <ol className="list-decimal list-inside space-y-1">
                                <li>Abra o app do seu banco</li>
                                <li>Procure pela opção PIX</li>
                                <li>Escaneie o QR Code ou cole o código</li>
                                <li>Confirme os dados e finalize o pagamento</li>
                            </ol>
                        </div>

                        <Alert className="border-orange-200 bg-orange-50">
                            <Clock className="h-4 w-4" />
                            <AlertDescription className="text-orange-800">
                                Este código PIX expira em {formatTime(timeLeft)}. Após o pagamento, clique em "Verificar Pagamento".
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-3 overflow-hidden max-[400px]:flex-col">
                <Button
                    onClick={onCancel}
                    variant="outline"
                    className="flex-1 text-yellowDark border-yellowDark hover:bg-yellow-100 hover:text-yellowDark w-full truncate"
                    disabled={paymentStatus === "checking"}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={checkPayment}
                    className="flex-1 bg-green-600 hover:bg-green-700 w-full truncate"
                    disabled={paymentStatus === "checking" || paymentStatus === "confirmed"}
                >
                    {paymentStatus === "checking" ? "Verificando..." : "Verificar Pagamento"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export { PaymentCard }