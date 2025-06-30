import { Footer } from '@/components/custom/Footer'
import { Header } from '@/components/custom/Header'
import { SingleProduct } from '@/components/custom/SingleProduct'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProducts } from '@/hooks/products-hooks'
import { cn } from '@/lib/utils'
import { ProductType } from '@/types/Product'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function Product() {
  const [date, setDate] = useState<Date | undefined>()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [product, setProduct] = useState<ProductType | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const { getProductById, getProducts, products } = useProducts()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('ID não definido')
        return
      }
  
      if (products.length === 0) {
        await getProducts()
      }
  
      const data = getProductById(id)
      if (data) {
        setProduct(data)
      } else {
        console.error('Produto não encontrado no estado local')
      }
    }
    fetchProduct()
  }, [id, products, getProducts, getProductById])

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
          <Select
            onValueChange={(value) => navigate(`/produtos?categoria=${value}`)}
          >
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
        {product ? (
          <div className="mt-8">
            <SingleProduct product={product} />
          </div>
        ) : (
          <p className="mt-4 text-lg">Produto não encontrado</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
