import { MapPin, Wrench, Users, User, Maximize, CalendarDays, Tag, Package, PackageSearch, Layers, Clock, ListChecks } from "lucide-react"
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
import { ProductType } from "@/types/Product"
import { BookingType } from "@/types/Booking"
import { useProducts } from "@/hooks/products-hooks"

interface RentalBookingCardProps {
    product: ProductType
    onPayment: (bookingData: BookingType) => void
    onBack: () => void;
    onNext: () => void;
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

export default function RentalBookingCard({
    product,
    onPayment,
    onBack,
    onNext,
}: RentalBookingCardProps) {
    const { getProductAvailableDays, getProductAvailableHours } = useProducts()
    const [chargingType, setChargingType] = useState<"POR_HORA" | "POR_DIA" | null>(null)
    const [reservations, setReservations] = useState<{ date: Date; hours: string[] }[]>([]);
    const [activityTitle, setActivityTitle] = useState("")
    const [activityDescription, setActivityDescription] = useState("")
    const [availableDays, setAvailableDays] = useState<Date[]>([])
    const [availableHours, setAvailableHours] = useState<Record<string, string[]>>({})
    const [loadingDays, setLoadingDays] = useState(false)
    const [loadingHours, setLoadingHours] = useState(false)

    const config = typeConfig[product.type]
    const IconComponent = config.icon

    console.log(product)

    const handleChargingTypeChange = async (type: "POR_HORA" | "POR_DIA") => {
        setChargingType(type)
        setReservations([]) // reseta reservas ao mudar tipo

        try {
            setLoadingDays(true)
            console.log(loadingDays)
            const days = await getProductAvailableDays(product.id)
            const parsed = days.map((d) => {
                const [year, month, day] = d.split("-").map(Number)
                return new Date(year, month - 1, day, 12, 0, 0) // sempre meio-dia local
            })
            setAvailableDays(parsed)
            console.log(availableDays)
        } catch (err) {
            console.error("Erro ao buscar dias disponíveis", err)
        } finally {
            setLoadingDays(false)
            console.log(loadingDays)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const handleSelectDates = async (dates: Date[] | undefined) => {
        if (!dates) return

        setReservations((prev) => {
            const existing = new Map(prev.map(r => [r.date.toDateString(), r]))
            return dates.map((d) => existing.get(d.toDateString()) || { date: d, hours: [] })
        })

        // só busca horários se for por hora
        if (chargingType === "POR_HORA") {
            for (const d of dates) {
                const dateStr = format(d, "yyyy-MM-dd")
                if (!availableHours[dateStr]) {
                    try {
                        setLoadingHours(true)
                        const hours = await getProductAvailableHours(product.id, dateStr)
                        setAvailableHours((prev) => ({ ...prev, [dateStr]: hours }))
                        console.log(availableHours) // em teste
                    } catch (err) {
                        console.error("Erro ao buscar horários disponíveis", err)
                    } finally {
                        setLoadingHours(false)
                    }
                }
            }
        }
    }

    const calculateTotal = () => {
        if (chargingType === "POR_DIA") {
            return reservations.length * product.dailyPrice;
        }
        if (chargingType === "POR_HORA") {
            return reservations.reduce((total, r) => total + r.hours.length * product.hourlyPrice, 0);
        }
        return 0;
    };

    const handlePayment = () => {
        const bookingData = {
            id: "",
            productId: product.id,
            productTitle: product.title,
            productAddress: {
                street: product.owner.address.street,
                number: product.owner.address.number,
                neighborhood: product.owner.address.neighborhood,
                city: product.owner.address.city,
                state: product.owner.address.state,
            },
            productType: product.type,
            spaceProduct: product.spaceProduct,
            equipmentProduct: product.equipamentProduct,
            serviceProduct: product.servicesProduct,
            productCategory: product.category,
            productImage: product.imagesUrls,
            productDiscount: product.discountPercentage || 0,
            institution: {
                email: product.owner.email,
                phone: product.owner.phoneNumber,
            },
            client: {
                name: "",
                email: "",
                phone: "",
            },
            chargingType,
            reservations: reservations.map(r => ({
                date: format(r.date, "yyyy-MM-dd"),
                hours: chargingType === "POR_HORA" ? r.hours : []
            })),
            activityTitle,
            activityDescription,
            totalAmount: calculateTotal(),
            finalAmount: calculateTotal(),
            paymentDate: new Date(),
        }
        onPayment(bookingData);
        console.log(bookingData); // em teste
        onNext();
    }

    const isFormValid = () => {
        const hasBasicInfo = reservations && activityTitle && activityDescription
        const hasTimeInfo = chargingType === "POR_DIA" || reservations.some(r => r.hours.length > 0)
        return hasBasicInfo && hasTimeInfo
    }

    return (
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
            <CardHeader>
                <CardTitle className="text-xl">
                    Solicitar Aluguel
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Resumo do Produto */}
                <div className="flex max-[725px]:flex-col gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative flex items-center justify-center bg-gray-200 w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        {product?.imagesUrls?.length > 0 ? (
                            <img
                                src={product?.imagesUrls[0]}
                                alt={product?.title ?? "...Carregando"}
                                className="object-cover h-full w-full"
                            />
                        ) : (
                            <img
                                src={"/assets/svg/image.svg"}
                                alt={product?.title ?? "...Carregando"}
                                className="h-10 w-10 opacity-50"
                            />
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="flex max-[440px]:flex-col items-center max-[440px]:items-start gap-2">
                            <div className={`${config.color} flex items-center gap-1 p-1 rounded-full max-w-fit`}>
                                <IconComponent className="h-3 w-3" />
                                {config.label}
                            </div>
                            <div className="p-1 rounded-full border bg-white max-w-fit truncate">
                                {product.category}
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg">{product.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {product?.owner?.address?.street ?? "...Carregando"}, {product?.owner?.address?.number ?? ""} - {product?.owner?.address?.neighborhood ?? ""} - {product?.owner?.address?.city ?? ""}, {product?.owner?.address?.state ?? ""}
                        </p>
                        <div className="flex max-[535px]:flex-col gap-4 text-sm text-gray-600">
                            {product.type === "SPACE" && (product.spaceProduct?.capacity || product.spaceProduct?.area) && (
                                <>
                                    {product.spaceProduct.capacity && (
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3 shrink-0" />
                                            {product.spaceProduct.capacity} pessoas
                                        </span>
                                    )}
                                    {product.spaceProduct.area && (
                                        <span className="flex items-center gap-1">
                                            <Maximize className="h-3 w-3 shrink-0" />
                                            {product.spaceProduct.area} m²
                                        </span>
                                    )}
                                </>
                            )}
                            {product.type === "EQUIPMENT" && (product.equipamentProduct?.brand || product.equipamentProduct?.model || product.equipamentProduct?.specifications || product.equipamentProduct?.stock) && (
                                <>
                                    {product.equipamentProduct.brand && (
                                        <span className="flex items-center gap-1">
                                            <Tag className="h-3 w-3 shrink-0" />
                                            {product.equipamentProduct.brand}
                                        </span>
                                    )}
                                    {product.equipamentProduct.model && (
                                        <span className="flex items-center gap-1">
                                            <Package className="h-3 w-3 shrink-0" />
                                            {product.equipamentProduct.model}
                                        </span>
                                    )}
                                    {product.equipamentProduct.specifications && (
                                        <span className="flex items-center gap-1">
                                            <PackageSearch className="h-3 w-3 shrink-0" />
                                            {product.equipamentProduct.specifications}
                                        </span>
                                    )}
                                    {product.equipamentProduct.stock && (
                                        <span className="flex items-center gap-1">
                                            <Layers className="h-3 w-3 shrink-0" />
                                            {product.equipamentProduct.stock}
                                        </span>
                                    )}
                                </>
                            )}
                            {product.type === "SERVICE" && (product.servicesProduct?.durationMinutes || product.servicesProduct?.requirements) && (
                                <>
                                    {product.servicesProduct.durationMinutes && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3 shrink-0" />
                                            {product.servicesProduct.durationMinutes} minutos
                                        </span>
                                    )}
                                    {product.servicesProduct.requirements && (
                                        <span className="flex items-center gap-1">
                                            <ListChecks className="h-3 w-3 shrink-0" />
                                            {product.servicesProduct.requirements}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="text-right max-[725px]:text-left space-y-1">
                        <p className="text-sm text-gray-600">
                            {product.hourlyPrice > 0
                                ? `Por hora: ${formatPrice(product.hourlyPrice)}`
                                : "Preço por hora Indisponível"
                            }
                        </p>
                        <p className="text-sm text-gray-600">
                            {product.dailyPrice > 0
                                ? `Por dia: ${formatPrice(product.dailyPrice)}`
                                : "Preço por dia Indisponível"
                            }
                        </p>
                        <p className={product.discountPercentage ? "text-sm text-green-600" : "text-sm text-gray-600"}>
                            {product.discountPercentage && product.discountPercentage > 0
                                ? `Desconto de associado: ${formatPrice(product.discountPercentage)}%`
                                : "Sem desconto para associado"
                            }
                        </p>
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
                                value={chargingType ?? undefined}
                                onValueChange={handleChargingTypeChange}
                            >
                                <SelectTrigger className="text-black ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                    <SelectValue placeholder="Selecione a forma de aluguel" />
                                </SelectTrigger>
                                <SelectContent>
                                    {product.dailyPrice && product.dailyPrice > 0 &&
                                        <SelectItem value="POR_DIA">Por dia</SelectItem>
                                    }
                                    {product.hourlyPrice && product.hourlyPrice > 0 &&
                                        <SelectItem value="POR_HORA">Por hora</SelectItem>
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Seleção de Datas */}

                        <div className="space-y-2">
                            <Label>Data(s)</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent truncate">
                                        <CalendarDays className="mr-2 h-4 w-4 text-blueDark" />
                                        Selecionar data
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="multiple"
                                        selected={reservations.map(r => r.date)}
                                        onSelect={handleSelectDates}
                                        disabled={(date) => // em teste
                                            date < new Date() || !availableDays.some(d => d.toDateString() === date.toDateString())
                                        }
                                        classNames={{
                                            day_selected: "bg-blueLight text-white hover:bg-blueLight hover:text-white",
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>


                        {/* Seleção de Horários (apenas se for por hora) */}

                        {chargingType === "POR_HORA" && reservations.map((reservation, idx) => {
                            const dateStr = format(reservation.date, "yyyy-MM-dd")
                            const hours = availableHours[dateStr] || []

                            return (
                                <div key={idx} className="space-y-2 border p-3 rounded-md">
                                    <span className="text-sm">
                                        Dia {format(reservation.date, "dd/MM/yyyy", { locale: ptBR })}
                                    </span>
                                    {loadingHours && !hours.length ? (
                                        <p>Carregando horários...</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {hours.map((time) => {
                                                const isSelected = reservation.hours.includes(time)
                                                return (
                                                    <Button
                                                        key={time}
                                                        size="sm"
                                                        variant={isSelected ? "default" : "outline"}
                                                        className={isSelected ? "bg-blueLight text-white hover:bg-blueDark" : ""}
                                                        onClick={() => {
                                                            setReservations((prev) =>
                                                                prev.map((r, i) =>
                                                                    i === idx
                                                                        ? {
                                                                            ...r,
                                                                            hours: isSelected
                                                                                ? r.hours.filter((h) => h !== time)
                                                                                : [...r.hours, time],
                                                                        }
                                                                        : r
                                                                )
                                                            )
                                                        }}
                                                    >
                                                        {time}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
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
                                maxLength={100}
                            />
                            <div className={activityDescription.length > 80 ? "text-sm text-red-500 text-right" : "text-sm text-gray-500 text-right"}>
                                {100 - activityDescription.length} caracteres disponíveis
                            </div>
                        </div>

                        {/* Resumo do Preço */}
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 truncate">
                            <h4 className="font-semibold text-blueDark mb-2">
                                Resumo do Pagamento
                            </h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Tipo:</span>
                                    <span className="capitalize">
                                        {chargingType === "POR_HORA" ? "Por hora" : "Por dia"}
                                    </span>
                                </div>

                                {reservations.length > 0 && (
                                    <>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between">
                                            <span className="mr-2">Dias:</span>
                                            <span className="flex flex-wrap gap-x-4">
                                                {reservations.map((r, index) => (
                                                    <div key={index} className="flex flex-wrap gap-x-2">
                                                        <span>
                                                            {format(r.date, "dd/MM", { locale: ptBR })}
                                                        </span>
                                                    </div>
                                                ))}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {chargingType === "POR_HORA" && reservations.length > 0 && (
                                    <>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between">
                                            <span className="mr-2">Horários:</span>
                                            <span className="flex flex-wrap gap-x-4">
                                                {reservations.map((r, index) => (
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
                                    </>
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
                    onClick={onBack}
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