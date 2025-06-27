import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useProducts } from '@/hooks/products-hooks'
import { toast } from '@/hooks/use-toast'
import { Loading } from '../Loading'
import { ProductType } from '@/types/Product'
import { CategoriaType } from '@/types/Categoria'
import { ToastAction } from '@/components/ui/toast'

const updateProductSchema = z.object({
  _id: z.string().min(1, 'ID é obrigatótio.'),
  nome: z.string().min(1, 'Nome é obrigatório.'),
  descricao: z.string().min(1, 'Descrição é obrigatória.'),
  categoria: z.enum(['Espaços', 'Serviços', 'Equipamento']),
  preco: z.number().min(1, 'Preço deve ser maior ou igual a 0.'),
  disponibilidade: z.any(),
})

export function UpdateProductDialog({
  categoria,
  descricao,
  nome,
  preco,
  disponibilidade,
  _id,
}: ProductType) {
  const { updateProduct, loading } = useProducts()
  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      _id,
      nome,
      descricao,
      preco,
      categoria: categoria as CategoriaType,
      disponibilidade: disponibilidade || [
        {
          _id: '',
          data: new Date(),
          horario: '',
        },
      ],
    },
  })
  console.log(form.getValues())
  const onSubmit = async (data: z.infer<typeof updateProductSchema>) => {
    try {
      console.log('Dados enviados:', data)

      const result = await updateProduct(data as ProductType)
      if (result) {
        toast({
          title: 'Produto atualizado com sucesso!',
          variant: 'default',
          action:
            <ToastAction
              onClick={() => window.location.reload()}
              altText="Continuar">
              Continuar
            </ToastAction>
        })
      }
    } catch (error: any) {
      toast({ title: 'error', variant: 'destructive' })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atualizar Produto</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os detalhes do produto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite aqui o nome do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite aqui a descrição do produto"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Espaços">Espaços</SelectItem>
                        <SelectItem value="Serviços">Serviços</SelectItem>
                        <SelectItem value="Equipamentos">
                          Equipamentos
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite aqui o preço do produto"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                        field.onChange(value ? parseFloat(value) : 0)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button type="submit" className="ml-2">
                {loading ? <Loading /> : 'Atualizar Produto'}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
