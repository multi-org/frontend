import { Clock, Calendar, MapPin, Wrench, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProductType } from "@/types/Product"

interface ReducedProductCardProps {
    type: "SPACE" | "EQUIPMENT" | "SERVICE"
    product: ProductType
    localizacao?: string
    onNext: () => void;
}

const typoConfig = {
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

export default function ReducedProductCard({
    type,
    product,
    localizacao = "Centro - São Paulo",
    onNext,
}: ReducedProductCardProps) {

    const defineProductType = () => {
        if (product.type === "SPACE") {
            type = "SPACE"
        }else if (product.type === "EQUIPMENT") {
            type = "EQUIPMENT"
        } else {
            type = "SERVICE"
        }
        return type
    }
    const config = typoConfig[defineProductType()]
    const IconComponent = config.icon

    const handleRent = () => {
        console.log("Solicitar aluguel do produto:", product.id)
        // implementari lógica de aluguel
        onNext();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Imagem do Produto */}
            <div className="relative h-48 w-full">
                <img src={"/src/assets/unsplash-lab.jpg"} alt={product.title} className="object-cover h-52 w-96" />
                <div className="absolute top-3 left-3">
                    <div className={`${config.color} flex items-center text-sm gap-1 p-1 rounded-full`}>
                        <IconComponent className="h-3 w-3" />
                        {config.label}
                    </div>
                </div>
            </div>

            <CardContent className="p-4 space-y-3">
                {/* Nome do Produto */}
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                        {product.title}
                    </h3>
                    {localizacao && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {localizacao}
                        </p>
                    )}
                </div>

                {/* Descrição */}
                <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                </p>

                {/* Preços */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">Por hora</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                            {formatPrice(product.hourlyPrice)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">Por dia</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                            {formatPrice(product.dailyPrice)}
                        </span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button onClick={handleRent} className="w-full bg-yellowDark hover:bg-yellowNormal truncate">
                    Ver detalhes
                </Button>
            </CardFooter>
        </Card>
    )
}

export { ReducedProductCard }