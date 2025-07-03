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
import { ProductCard } from '@/components/custom/ProductCard'
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

export default function BrowseProducts() {

    const { products, getProducts } = useProducts()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [category, setCategory] = useState<string>('')

    // useEffect(() => {
    //     getProducts()
    // }, [getProducts])

    const filteredProducts = products.filter((product: ProductType) => {
        const matchesSearchTerm = searchTerm
            ? product.nome.toLowerCase().includes(searchTerm.toLowerCase())
            : true

        const matchesCategory = category ? product.categoria === category : true
        // const matchesDate = date
        //   ? new Date(product.date).toDateString() === date.toDateString() // Assumindo que `product.date` é uma string válida
        //   : true;

        return matchesSearchTerm && matchesCategory
    })

    return (
        <div className="border-black flex flex-1 flex-col gap-4 p-4 mt-4">
            <div className="flex gap-2 border-black">
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
                    <SelectTrigger className="w-[180px] focus-visible:ring-blueLight">
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
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
            <Pagination className="mt-8">
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
    )
}

export { BrowseProducts }