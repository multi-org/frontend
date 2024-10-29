import { Footer } from '@/components/custom/Footer'
import { Header } from '@/components/custom/Header'
import { SingleProduct } from '@/components/custom/SingleProduct'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useProducts } from '@/hooks/products-hooks'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function Product() {
  const [date, setDate] = useState<Date | undefined>()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const navigate = useNavigate();
  const { id } = useParams()
  const { getProductById } = useProducts()
  if (!id) {
    throw new Error('Id is not defined')
  }
  const product = getProductById(id)

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
          <Select onValueChange={(value) => navigate(`/produtos?categoria=${value}`)}>
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
          <SingleProduct product={product} />
        ) : (
          <p className="text-lg mt-4">Produto não encontrado :(</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
