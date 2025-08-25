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
import { ExtendedProductCard, ReducedProductCard } from '@/components/custom/ProductCard'
import {
    Pagination,
    PaginationContent,
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
    const [type, setType] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [bookingStep, setBookingStep] = useState<number>(0)
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 6

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        console.log("Produtos atualizados (crus):", products) // em teste
    }, [products])

    const filteredProducts = products.filter((product: ProductType) => {
        const matchesSearchTerm = searchTerm
            ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        const matchesCategory = category && category !== "ALL" ? product.category === category : true;
        const matchesType = type && type !== "ALL" ? product.type === type : true;

        return matchesSearchTerm && matchesCategory && matchesType;
    })

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, category, type])

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1)
        }
    }, [totalPages, currentPage])

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
                        <Select onValueChange={(value) => setType(value)}>
                            <SelectTrigger className="w-[180px] max-[350px]:w-full truncate ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="ALL">Todos</SelectItem>
                                    <SelectItem value="SPACE">Espaço</SelectItem>
                                    <SelectItem value="SERVICE">Serviço</SelectItem>
                                    <SelectItem value="EQUIPMENT">Equipamento</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger className="w-[180px] max-[350px]:w-full truncate ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2">
                                <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="ALL">Todos</SelectItem>
                                    <SelectItem value="Sala de aula">Sala de aula</SelectItem>
                                    <SelectItem value="Auditório">Auditório</SelectItem>
                                    <SelectItem value="Laboratório">Laboratório</SelectItem>
                                    <SelectItem value="Espaço para eventos">
                                        Espaço para eventos
                                    </SelectItem>
                                    <SelectItem value="Instalação esportiva">
                                        Instalação esportiva
                                    </SelectItem>
                                    <SelectItem value="Área administrativa/coorporativa">
                                        Área administrativa/coorporativa
                                    </SelectItem>
                                    <SelectItem value="Técnico/operacional">
                                        Técnico/operacional
                                    </SelectItem>
                                    <SelectItem value="Acadêmico/profissional">
                                        Acadêmico/profissional
                                    </SelectItem>
                                    <SelectItem value="Logística e organização">
                                        Logística e organização
                                    </SelectItem>
                                    <SelectItem value="Alimentação">
                                        Alimentação
                                    </SelectItem>
                                    <SelectItem value="Comunicação e marketing">
                                        Comunicação e marketing
                                    </SelectItem>
                                    <SelectItem value="Audiovisual">
                                        Audiovisual
                                    </SelectItem>
                                    <SelectItem value="Informática/tecnologia">
                                        Informática/tecnologia
                                    </SelectItem>
                                    <SelectItem value="Laboratorial">
                                        Laboratorial
                                    </SelectItem>
                                    <SelectItem value="Mobiliário">
                                        Mobiliário
                                    </SelectItem>
                                    <SelectItem value="Esportivo">
                                        Esportivo
                                    </SelectItem>
                                    <SelectItem value="Outros">
                                        Outros
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </header>
                    <div className='p-6 grid grid-cols-3 max-[750px]:grid-cols-2 max-[500px]:grid-cols-1 gap-2'>
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <ReducedProductCard
                                    key={product.id}
                                    product={product}
                                    onNext={(product) => {
                                        setSelectedProduct(product)
                                        setBookingStep(1)
                                    }}
                                />
                            ))
                        ) : (
                            <>
                                <p className='col-start-2 text-center max-[750px]:col-span-2'>
                                    Nenhum produto encontrado
                                </p>
                            </>
                        )}
                    </div>
                    <div className="flex justify-center items-center p-6 max-[350px]:w-80 truncate">
                        <Pagination>
                            <PaginationContent>
                                {/* Botão anterior */}
                                <PaginationItem>
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        className="px-3 py-1 disabled:opacity-50"
                                    >
                                        <PaginationPrevious href="#" />
                                    </button>
                                </PaginationItem>
                                {/* Páginas */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <button
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-1 ${page === currentPage ? "font-extrabold" : ""}`}
                                        >
                                            <PaginationLink
                                                className={page === currentPage ? "bg-gray-100" : ""}
                                                href="#">
                                                {page}
                                            </PaginationLink>
                                        </button>
                                    </PaginationItem>
                                ))}
                                {/* Botão próximo */}
                                <PaginationItem>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className="px-3 py-1 disabled:opacity-50"
                                    >
                                        <PaginationNext href="#" />
                                    </button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
            {bookingStep === 1 && selectedProduct && (
                <div className='p-6 max-[500px]:w-96 max-[430px]:w-80 max-[370px]:w-full'>
                    <ExtendedProductCard
                        product={selectedProduct}
                        onBack={() => setBookingStep(0)}
                        onNext={(selectedProduct) => {
                            setSelectedProduct(selectedProduct)
                            setBookingStep(2)
                        }}
                    />
                </div>
            )}
            {bookingStep === 2 && selectedProduct && (
                <div className='p-6 max-[500px]:w-96 max-[430px]:w-80 max-[370px]:w-full'>
                    <RentalBookingCard
                        product={selectedProduct}
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