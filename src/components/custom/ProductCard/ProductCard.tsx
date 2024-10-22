import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types/Product";
interface ProductCardProps {
  product:ProductType
}

export default function ProductCard({
  product: { id, name, description, image, price },
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="shadow-md">
      <Card className="flex gap-5 items-center p-4 w-[100%] h-[100%] shadow-md">
        <img src={image} alt="imagem de laboratório" className="w-[188px] h-[212px]" />
        <CardHeader className="flex flex-col items-start">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <p>{price}</p>
        </CardHeader>
      </Card>
    </Link>
  )
}

export { ProductCard };
