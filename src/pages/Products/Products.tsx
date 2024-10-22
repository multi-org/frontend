import { useEffect, useState } from 'react'
import { Header } from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { Footer } from '@/components/custom/Footer'
import { ProductType } from '@/types/Product'
import { useProducts } from '@/hooks/products-hooks'

export function Products() {
  const { products, getProducts } = useProducts()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [date, setDate] = useState<Date | undefined>()

  useEffect(() => {
    getProducts()
  }, [getProducts])

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
    <div>
      <Header />
      <div className="border-black p-36">
        <div className="flex gap-2 border-black">
          <Input
            className="w-[671px]"
            placeholder="Procurar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
      <Footer />
    </div>
  )
}
