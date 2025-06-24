import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { ProductType } from '@/types/Product'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from '@/hooks/use-toast'
import { useProducts } from '@/hooks/products-hooks'
import { Loading } from '../Loading'
import { UpdateProductDialog } from '../UpdateProductDialog'
import { ToastAction } from '@/components/ui/toast'

interface SingleProductProps {
  product: ProductType
}

export default function SingleProduct({
  product: { _id, nome, descricao, preco, disponibilidade, categoria },
}: SingleProductProps) {
  const [date, setDate] = useState<Date | undefined>()

  const { deleteProductById, getProductById, loading } = useProducts()

  const deleteProduct = async () => {
    try {
      await deleteProductById(_id)
      const result = getProductById(_id)
      if (!result) {
        toast({
          title: 'Produto excluído com sucesso!',
          variant: 'destructive',
          action:
            <ToastAction
              onClick={() => window.location.reload()}
              altText="Continuar">
              Continuar
            </ToastAction>
        })
      }
    } catch (error: any) {
      toast({ title: 'error: could not delete product', variant: 'destructive' })
    }
  }

  return (
    <>
      <Card className="flex h-[100%] w-[100%] items-start justify-between gap-5 p-4 shadow-md">
        <div className="flex">
          <img
            src="/src/assets/unsplash-lab.jpg"
            alt="imagem de produto"
            className="h-[500px] w-[360px]"
          />
          <CardHeader className="flex flex-col items-start py-0 break-all">
            <CardTitle>{nome}</CardTitle>
            <CardDescription>{descricao}</CardDescription>
            <br />
            <div className="flex flex-col gap-4">
              {/* <p><span className="font-semibold">Status: </span>{status === "disponivel" ? "Disponível "+ <BadgeCheck /> : "Indisponivel"}</p> */}
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
                    {date ? (
                      format(date, 'PPP')
                    ) : (
                      <span>Selecione a data de locação</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disponibilidade={disponibilidade}
                  />
                </PopoverContent>
              </Popover>
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
                    {date ? (
                      format(date, 'PPP')
                    ) : (
                      <span>Selecione a data de entrega</span>
                    )}
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
              <p>
                <span className="font-semibold">Preço: </span>R$ {Number(preco)}
              </p>
            </div>
          </CardHeader>
        </div>
        <div className="flex gap-2">
          <UpdateProductDialog
            _id={_id}
            categoria={categoria}
            nome={nome}
            descricao={descricao}
            preco={preco}
            disponibilidade={disponibilidade}
          />
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive">
                <Trash2 />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja deletar o produto?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Isso excuirá este produto
                  permanentemente e removerá seus dados de nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteProduct()}>
                  {loading ? <Loading /> : 'Deletar Produto'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              <img
                src="/src/assets/unsplash-lab.jpg"
                alt="imagem de produto"
                className="h-[42px] w-[42px] rounded-md transition-transform duration-200 hover:scale-150"
              />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              <img
                src="/src/assets/unsplash-lab.jpg"
                alt="imagem de produto"
                className="h-[42px] w-[42px] rounded-md transition-transform duration-200 hover:scale-150"
              />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">
              <img
                src="/src/assets/unsplash-lab.jpg"
                alt="imagem de produto"
                className="h-[42px] w-[42px] rounded-md transition-transform duration-200 hover:scale-150"
              />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export { SingleProduct }
