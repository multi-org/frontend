import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar'
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/Product";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from "react";
import { 
    Pagination, 
    PaginationContent, 
    PaginationEllipsis, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from "@/components/ui/pagination";

interface SingleProductProps {
    product: ProductType
}

export default function SingleProduct({
    product: { _id, nome, descricao, preco },
}: SingleProductProps) {
    
    const [date, setDate] = useState<Date | undefined>()

    return (
        <>
            <Card className="flex h-[100%] w-[100%] items-start gap-5 p-4 shadow-md">
                <img src="/src/assets/unsplash-lab.jpg" alt="imagem de produto" className="w-[360px] h-[500px]" />
                <CardHeader className="flex flex-col items-start py-0">
                    <CardTitle>{nome}</CardTitle>
                    <CardDescription>{descricao}</CardDescription>
                    <br />
                    <div className="flex flex-col gap-4">
                        <p><span className="font-semibold">Status: </span>disponível</p>
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
                                    {date ? format(date, 'PPP') : <span>Selecione a data de locação</span>}
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
                                    {date ? format(date, 'PPP') : <span>Selecione a data de entrega</span>}
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
                        <p><span className="font-semibold">Preço: </span>R$ {preco}</p>
                    </div>
                </CardHeader>
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
                                className="w-[42px] h-[42px] rounded-md transition-transform duration-200 hover:scale-150" />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            <img src="/src/assets/unsplash-lab.jpg"
                                alt="imagem de produto"
                                className="w-[42px] h-[42px] rounded-md transition-transform duration-200 hover:scale-150" />
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">
                            <img src="/src/assets/unsplash-lab.jpg"
                                alt="imagem de produto"
                                className="w-[42px] h-[42px] rounded-md transition-transform duration-200 hover:scale-150" />
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

export { SingleProduct };