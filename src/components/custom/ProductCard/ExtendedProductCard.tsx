import {
    Clock,
    Calendar,
    MapPin,
    Wrench,
    Users,
    ChevronLeft,
    ChevronRight,
    User,
    Maximize,
    Tag,
    Package,
    PackageSearch,
    Layers,
    ListChecks,
    Loader
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { ProductType } from "@/types/Product"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/auth-hooks"

interface ExtendedProductCardProps {
    product: ProductType
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

export default function ExtendedProductCard({
    product,
    onBack,
    onNext,
}: ExtendedProductCardProps) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const config = typeConfig[product.type]
    const IconComponent = config.icon
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuth()
    console.log(product) // em teste

    const handleRent = () => {
        if (isLoading) return
        if (!isAuthenticated) {
            navigate("/login")
            return
        }
        console.log("Usuário autenticado -> Solicitar aluguel:", product.id)
        onNext();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.imagesUrls.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            (prev - 1 + product.imagesUrls.length)
            % product.imagesUrls.length)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex gap-2 max-[430px]:flex-col max-[300px]:items-start">
                            <div className={`${config.color} flex items-center gap-1 p-1 rounded-full max-w-fit`}>
                                <IconComponent className="h-3 w-3" />
                                {config.label}
                            </div>
                            <div className="p-1 rounded-full border max-w-fit">
                                {product.category}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {product.title}
                        </h2>
                        <p className="text-gray-600 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {product.owner.address.street}, {product.owner.address.number} -  {product.owner.address.neighborhood} - {product.owner.address.city}, {product.owner.address.state}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Carrossel de Imagens */}
                <div className="relative">
                    <div className="relative flex items-center justify-center bg-gray-200 h-[500px] w-full rounded-lg overflow-hidden">
                        {product?.imagesUrls?.length > 0 ? (
                            <img
                                src={product.imagesUrls[currentImageIndex]}
                                alt={`${product.title} - Imagem ${currentImageIndex + 1}`}
                                className="object-cover h-[500px] w-full"
                            />
                        ) : (
                            <img
                                src={"/src/assets/svg/image.svg"}
                                alt={product?.title ?? "...Carregando"}
                                className="h-10 w-10 opacity-50"
                            />
                        )}

                        {product.imagesUrls.length > 1 && (
                            <>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>
                    {product.imagesUrls.length > 1 && (
                        <div className="flex justify-center gap-2 mt-3">
                            {product.imagesUrls.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-yellowDark" : "bg-gray-300"
                                        }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Informações do Produto */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Descrição</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Informações específicas por tipo */}
                        {product.type === "SPACE" && (product.spaceProduct?.capacity || product.spaceProduct?.area) && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">Especificações</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.spaceProduct.capacity && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <User className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Capacidade
                                                </p>
                                                <p className="font-semibold">
                                                    {product.spaceProduct.capacity} pessoas
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {product.spaceProduct.area && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <Maximize className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">Área</p>
                                                <p className="font-semibold">
                                                    {product.spaceProduct.area} m²
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {product.type === "EQUIPMENT" && (product.equipamentProduct?.brand || product.equipamentProduct?.model || product.equipamentProduct?.specifications || product.equipamentProduct?.stock) && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">Especificações</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.equipamentProduct.brand && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <Tag className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Marca
                                                </p>
                                                <p className="font-semibold">
                                                    {product.equipamentProduct.brand}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {product.equipamentProduct.model && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <Package className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Modelo
                                                </p>
                                                <p className="font-semibold">
                                                    {product.equipamentProduct.model}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {product.equipamentProduct.specifications && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <PackageSearch className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Especificações
                                                </p>
                                                <p className="font-semibold">
                                                    {product.equipamentProduct.specifications}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {product.equipamentProduct.stock && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <Layers className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Estoque
                                                </p>
                                                <p className="font-semibold">
                                                    {product.equipamentProduct.stock}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {product.type === "SERVICE" && (product.servicesProduct?.durationMinutes || product.servicesProduct?.requirements) && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">Especificações</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.servicesProduct.durationMinutes && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <Clock className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Duração
                                                </p>
                                                <p className="font-semibold">
                                                    {product.servicesProduct.durationMinutes} minutos
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {product.servicesProduct.requirements && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <ListChecks className="h-4 w-4 text-gray-600 shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    Requisitos
                                                </p>
                                                <p className="font-semibold">
                                                    {product.servicesProduct.requirements}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Preços e Disponibilidade */}
                    <div className="space-y-4">
                        {/* Preços */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Preços</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg max-[300px]:flex-col">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span className="font-medium">Por hora</span>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-900">{formatPrice(product.hourlyPrice)}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg max-[300px]:flex-col">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span className="font-medium">Por dia</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">
                                        {product.dailyPrice
                                            ? formatPrice(product.dailyPrice)
                                            : "Indisponível"
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Disponibilidade */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Disponibilidade</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 rounded max-[300px]:flex-col">
                                    <span className="text-sm font-medium text-gray-700">
                                        Segunda à Sexta
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {product.ProductWeeklyAvailability.monday.start} - {product.ProductWeeklyAvailability.monday.end}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded max-[300px]:flex-col">
                                    <span className="text-sm font-medium text-gray-700">
                                        Sábado
                                    </span>
                                    {product.ProductWeeklyAvailability.saturday ? (
                                        <span className="text-sm text-gray-600">
                                            {product.ProductWeeklyAvailability.saturday?.start} - {product.ProductWeeklyAvailability.saturday?.end}
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-600">
                                            Indisponível
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center p-2 rounded max-[300px]:flex-col">
                                    <span className="text-sm font-medium text-gray-700">
                                        Domingo
                                    </span>
                                    {product.ProductWeeklyAvailability.sunday ? (
                                        <span className="text-sm text-gray-600">
                                            {product.ProductWeeklyAvailability.sunday?.start} - {product.ProductWeeklyAvailability.sunday?.end}
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-600">
                                            Indisponível
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-6 grid grid-cols-2 gap-6 max-[300px]:grid-cols-1">
                <Button
                    variant={"outline"}
                    onClick={onBack}
                    size="lg"
                    className="w-full border-yellowDark text-yellowDark hover:bg-yellow-100 hover:text-yellowDark">
                    Voltar
                </Button>
                <Button onClick={handleRent} size="lg" className="w-full bg-yellowDark hover:bg-yellowNormal">
                    {isLoading ? <Loader /> : "Reservar"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export { ExtendedProductCard }