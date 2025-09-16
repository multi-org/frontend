import { ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

type MultiSelectCheckboxProps<T extends string> = {
    options: readonly T[]
    selected: T[]
    onChange: (value: T[]) => void
    placeholder?: string
    checkboxColor?: string
    label?: string
}

export default function MultiSelectCheckbox<T extends string>({
    options,
    selected,
    onChange,
    placeholder = "Selecione...",
    checkboxColor,
}: MultiSelectCheckboxProps<T>) {

    const checkboxColors: Record<string, string> = {
        green: "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
        orange: "data-[state=checked]:bg-orangeDark data-[state=checked]:border-orangeDark",
        blue: "data-[state=checked]:bg-blueDark data-[state=checked]:border-blueDark",
        yellow: "data-[state=checked]:bg-yellowDark data-[state=checked]:border-yellowDark",
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-full justify-between truncate overflow-hidden text-ellipsis text-black", !selected.length && "text-muted-foreground")}
                >
                    <span className="truncate">
                        {selected.length > 0
                            ? `${selected[0]}${selected.length > 1 ? ` +${selected.length - 1}` : ""}`
                            : placeholder}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandGroup>
                        {options.map((option) => {
                            const isChecked = selected.includes(option)
                            return (
                                <CommandItem
                                    key={option}
                                    onSelect={() => {
                                        const newValue = isChecked
                                            ? selected.filter((v) => v !== option)
                                            : [...selected, option]
                                        onChange(newValue)
                                    }}
                                >
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={() => { }}
                                        className={cn("mr-2", checkboxColors[checkboxColor ?? "green"])}
                                    />
                                    {option}
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export { MultiSelectCheckbox }