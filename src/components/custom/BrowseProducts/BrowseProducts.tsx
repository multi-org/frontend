import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ExtendedProductCard, ProductCard, ReducedProductCard } from '@/components/custom/ProductCard'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { ProductType } from '@/types/Product'
import { useProducts } from '@/hooks/products-hooks'
import { Search } from 'lucide-react'
import { BookingConfirmationCard, PaymentCard, RentalBookingCard } from '../RentalBooking'

export default function BrowseProducts() {

    const { products, getProducts } = useProducts()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [bookingStep, setBookingStep] = useState<number>(0)

    // useEffect(() => {
    //     getProducts()
    // }, [getProducts])

    const filteredProducts = products.filter((product: ProductType) => {
        const matchesSearchTerm = searchTerm
            ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true

        const matchesCategory = category ? product.category === category : true
        // const matchesDate = date
        //   ? new Date(product.date).toDateString() === date.toDateString() // Assumindo que `product.date` é uma string válida
        //   : true;

        return matchesSearchTerm && matchesCategory
    })

    return (
        <>
            {bookingStep === 0 && (
                <>
                    <header className="flex max-[350px]:flex-col gap-2 p-6">
                        <div className="relative w-full">
                            <Input
                                type="search"
                                className="pl-10 w-full focus-visible:ring-blueLight"
                                placeholder="Procurar produto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search
                                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>
                        <Select onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger className="w-[180px] max-[350px]:w-full truncate ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Espaços">Espaços</SelectItem>
                                    <SelectItem value="Serviços">Serviços</SelectItem>
                                    <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </header>
                    {/* <div className="mt-8 grid grid-cols-3 max-[750px]:grid-cols-2 max-[500px]:grid-cols-1 gap-2"></div> */}
                    <div className='p-6 grid grid-cols-3 max-[750px]:grid-cols-2 max-[500px]:grid-cols-1 gap-2'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ReducedProductCard
                                    key={product.id}
                                    product={product}
                                    tipo="espaco"
                                    localizacao="Centro - São Paulo"
                                    onNext={() => setBookingStep(1)}
                                />
                            ))
                        ) : (
                            <>
                                <p>Nenhum produto encontrado.</p>
                                {/* <ReducedProductCard
                                    id="ESP-001"
                                    nome="Sala de Reunião Executiva"
                                    descricacao="Sala moderna e equipada com projetor, ar-condicionado, mesa para 12 pessoas e acesso à internet de alta velocidade. Ideal para reuniões corporativas e apresentações."
                                    precoHora={45.0}
                                    precoDia={320.0}
                                    imagem="/placeholder.svg?height=200&width=400"
                                    tipo="espaco"
                                    localizacao="Centro - São Paulo"
                                    onNext={() => setBookingStep(1)}
                                />
                                <ReducedProductCard
                                    id="ESP-001"
                                    nome="Sala de Reunião Executiva"
                                    descricacao="Sala moderna e equipada com projetor, ar-condicionado, mesa para 12 pessoas e acesso à internet de alta velocidade. Ideal para reuniões corporativas e apresentações."
                                    precoHora={45.0}
                                    precoDia={320.0}
                                    imagem="/placeholder.svg?height=200&width=400"
                                    tipo="espaco"
                                    localizacao="Centro - São Paulo"
                                    onNext={() => setBookingStep(1)}
                                />
                                <ReducedProductCard
                                    id="ESP-001"
                                    nome="Sala de Reunião Executiva"
                                    descricacao="Sala moderna e equipada com projetor, ar-condicionado, mesa para 12 pessoas e acesso à internet de alta velocidade. Ideal para reuniões corporativas e apresentações."
                                    precoHora={45.0}
                                    precoDia={320.0}
                                    imagem="/placeholder.svg?height=200&width=400"
                                    tipo="espaco"
                                    localizacao="Centro - São Paulo"
                                    onNext={() => setBookingStep(1)}
                                /> */}
                            </>
                        )}
                    </div>
                    <div className="flex justify-center items-center p-6 max-[350px]:w-80 truncate">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
            {bookingStep === 1 && (
                <div className='p-6 max-[500px]:w-96 max-[430px]:w-80 max-[370px]:w-full'>
                    <ExtendedProductCard
                        id="PROD-001"
                        nome="Auditório Premium"
                        descricacao="Auditório moderno e totalmente equipado com sistema de som profissional, projetor 4K, ar-condicionado, iluminação cênica e poltronas confortáveis. Ideal para palestras, seminários, apresentações corporativas e eventos acadêmicos."
                        categoria="Auditório"
                        capacidade={150}
                        area={200}
                        imagens={[
                            "/src/assets/multi-prod-esp.png",
                            "/src/assets/multi-prod-serv.png",
                            "/src/assets/multi-prod-equip.png",
                        ]}
                        precoHora={180.0}
                        precoDia={1200.0}
                        tipo="espaco"
                        localizacao="Campus Central - São Paulo"
                        disponibilidade={{
                            segSex: { inicio: "08:00", fim: "22:00" },
                            sabado: { inicio: "09:00", fim: "18:00" },
                            domingo: { inicio: "14:00", fim: "20:00" },
                        }}
                        onBack={() => setBookingStep(0)}
                        onNext={() => setBookingStep(2)}
                    />
                </div>
            )}
            {bookingStep === 2 && (
                <div className='p-6 max-[500px]:w-96 max-[430px]:w-80 max-[370px]:w-full'>
                    <RentalBookingCard
                        product={{
                            id: "ESP-001",
                            nome: "Auditório Premium",
                            categoria: "Auditório",
                            capacidade: 150,
                            area: 200,
                            imagem: "/src/assets/multi-prod-serv.png",
                            precoHora: 180.0,
                            precoDia: 1200.0,
                            tipo: "espaco",
                            localizacao: "Campus Central - São Paulo"
                        }}
                        onPayment={(data: any) => console.log("Dados do pagamento:", data)}
                        onBack={() => setBookingStep(1)}
                        onNext={() => setBookingStep(3)}
                    />
                </div>
            )}
            {bookingStep === 3 && (
                <div className='p-6 max-[500px]:w-96 max-[430px]:w-80 max-[370px]:w-full'>
                    <PaymentCard
                        bookingData={{
                            productId: "ESP-001",
                            productName: "Auditório Premium",
                            productType: "espaco",
                            productCategory: "Auditório",
                            productImage: "/src/assets/multi-prod-serv.png",
                            productLocation: "Campus Central - São Paulo",
                            startDate: new Date(2024, 11, 20),
                            endDate: new Date(2024, 11, 22),
                            rentalType: "dia",
                            activityTitle: "Palestra sobre Inovação Tecnológica",
                            activityDescription: "Evento corporativo com apresentações sobre as últimas tendências em tecnologia",
                            totalPrice: 3600.0,
                        }}
                        onBack={() => setBookingStep(1)}
                        onNext={() => setBookingStep(4)}
                    />
                </div>
            )}
            {bookingStep === 4 && (
                <div className='p-6 max-[500px]:w-96 max-[430px]:w-80 max-[370px]:w-full'>
                    <BookingConfirmationCard
                        bookingData={{
                            confirmationNumber: "RES-2024-001234",
                            productId: "ESP-001",
                            productName: "Auditório Premium",
                            productType: "espaco",
                            productCategory: "Auditório",
                            productImage: "/src/assets/multi-prod-serv.png",
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
                        }}
                        onBack={() => setBookingStep(0)}
                    />
                </div>
            )}
        </>
    )
}

export { BrowseProducts }