import { Header } from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";

export function Products() {
    const [date, setDate] = useState<Date>()

  return (
    <div>
      <Header />
        <div className="p-36 border-black">
          <div className="border-black flex">
           <Input className="w-[671px]"/>  
           <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="-" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Espaços</SelectItem>
          <SelectItem value="banana">Serviçoes</SelectItem>
          <SelectItem value="blueberry">Equipamentos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select> 
     <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
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
        </div>
    </div>
  )
}
