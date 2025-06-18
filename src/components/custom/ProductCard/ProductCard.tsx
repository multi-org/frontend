import { Link } from 'react-router-dom'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProductType } from '@/types/Product'

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({
  product: { _id, nome, descricao, preco },
}: ProductCardProps) {
  return (
    <Link to={`/produtos/${_id}`} className="shadow-md">
      <Card className="flex h-[100%] w-[100%] items-start gap-5 p-4 shadow-md">
        {/* <img src={image} alt="imagem de laboratório" className="w-[188px] h-[212px]" /> */}
        <img src="/src/assets/unsplash-lab.jpg" alt="imagem de laboratório" className="w-[188px] h-[212px]" />
        <CardHeader className="flex flex-col items-start py-0 break-all">
          <CardTitle>{nome}</CardTitle>
          <CardDescription>{descricao}</CardDescription>
          <p>R$ {preco}</p>
        </CardHeader>
      </Card>
    </Link>
  )
}

export { ProductCard }
