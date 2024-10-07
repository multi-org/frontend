import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function ProductCard() {
  return (
    <Link to={'#'}>
      <Card className="flex gap-5 items-center p-4 w-[100%] h-[100%] shadow-md">
        <img src="src/assets/unsplash__9xRHrMOjeg.jpg" alt="imagem de laboratório" className="w-[188px] h-[212px]" />
        <CardHeader className="flex flex-col items-start">
          <CardTitle>Produto</CardTitle>
          <CardDescription>Descrição do produto</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export { ProductCard };
