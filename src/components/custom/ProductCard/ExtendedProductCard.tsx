import { 
    Clock, 
    Calendar, 
    MapPin, 
    Wrench, 
    Users, 
    ChevronLeft, 
    ChevronRight, 
    User, 
    Maximize 
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

interface Disponibilility {
    segSex: { inicio: string; fim: string }
    sabado: { inicio: string; fim: string }
    domingo: { inicio: string; fim: string }
}

interface ExtendedProductCardProps {
    id: string
    nome: string
    descricacao: string
    categoria: string
    capacidade?: number // Apenas para espaços
    area?: number // Apenas para espaços (em m²)
    imagens: string[]
    precoHora: number
    precoDia: number
    tipo: "espaco" | "equipamento" | "servico"
    localizacao?: string
    disponibilidade: Disponibilility
    onBack: () => void;
    onNext: () => void;
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

export default function ExtendedProductCard({
    id = "PROD-001",
    nome = "Auditório Premium",
    descricacao = "Auditório moderno e totalmente equipado com sistema de som profissional, projetor 4K, ar-condicionado, iluminação cênica e poltronas confortáveis. Ideal para palestras, seminários, apresentações corporativas e eventos acadêmicos.",
    categoria = "Auditório",
    capacidade = 150,
    area = 200,
    imagens = [
        "/src/assets/unsplash-lab.jpg",
        "/src/assets/unsplash-lab.jpg",
        "/src/assets/unsplash-lab.jpg",
    ],
    precoHora = 180.0,
    precoDia = 1200.0,
    tipo = "espaco",
    localizacao = "Campus Central - São Paulo",
    disponibilidade = {
        segSex: { inicio: "08:00", fim: "22:00" },
        sabado: { inicio: "09:00", fim: "18:00" },
        domingo: { inicio: "14:00", fim: "20:00" },
    },
    onBack,
    onNext,
}: ExtendedProductCardProps) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const config = tipoConfig[tipo]
    const IconComponent = config.icon

    const handleRent = () => {
        console.log("Solicitar aluguel do produto:", id)
        onNext();
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % imagens.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + imagens.length) % imagens.length)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 max-[300px]:flex-col max-[300px]:items-start">
                            <div className={`${config.color} flex items-center gap-1 p-1 rounded-full`}>
                                <IconComponent className="h-3 w-3" />
                                {config.label}
                            </div>
                            <div className="p-1 rounded-full border">{categoria}</div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{nome}</h2>
                        {localizacao && (
                            <p className="text-gray-600 flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {localizacao}
                            </p>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Carrossel de Imagens */}
                <div className="relative">
                    <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
                        <img
                            src={imagens[currentImageIndex] || "/src/assets/multi-prod-esp.png"}
                            alt={`${nome} - Imagem ${currentImageIndex + 1}`}
                            className="object-cover h-[500px] w-full"
                        />
                        {imagens.length > 1 && (
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
                    {imagens.length > 1 && (
                        <div className="flex justify-center gap-2 mt-3">
                            {imagens.map((_, index) => (
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
                            <p className="text-gray-600 leading-relaxed">{descricacao}</p>
                        </div>

                        {/* Informações específicas por tipo */}
                        {tipo === "espaco" && (capacidade || area) && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">Especificações</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {capacidade && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <User className="h-4 w-4 text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Capacidade</p>
                                                <p className="font-semibold">{capacidade} pessoas</p>
                                            </div>
                                        </div>
                                    )}
                                    {area && (
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <Maximize className="h-4 w-4 text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Área</p>
                                                <p className="font-semibold">{area} m²</p>
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
                                    <span className="font-semibold text-lg text-gray-900">{formatPrice(precoHora)}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg max-[300px]:flex-col">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span className="font-medium">Por dia</span>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-900">{formatPrice(precoDia)}</span>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Disponibilidade */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Disponibilidade</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 rounded max-[300px]:flex-col">
                                    <span className="text-sm font-medium text-gray-700">Segunda à Sexta</span>
                                    <span className="text-sm text-gray-600">
                                        {disponibilidade.segSex.inicio} - {disponibilidade.segSex.fim}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded max-[300px]:flex-col">
                                    <span className="text-sm font-medium text-gray-700">Sábado</span>
                                    <span className="text-sm text-gray-600">
                                        {disponibilidade.sabado.inicio} - {disponibilidade.sabado.fim}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded max-[300px]:flex-col">
                                    <span className="text-sm font-medium text-gray-700">Domingo</span>
                                    <span className="text-sm text-gray-600">
                                        {disponibilidade.domingo.inicio} - {disponibilidade.domingo.fim}
                                    </span>
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
                    Reservar
                </Button>
            </CardFooter>
        </Card>
    )
}

export { ExtendedProductCard }