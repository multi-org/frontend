import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { hours, intervals } from "@/utils/disponibility"

type IntervalSelectProps = {
  control: any
  className?: string
  textColor?: string
  ringColor?: string
  inputColor?: string
}

export default function AvailabilityIntervalSelect({
  control,
  className,
  textColor = "text-black",
  ringColor = "focus-visible:ring-orangeLight",
  inputColor = "text-black",
}: IntervalSelectProps) {

  const triggerClass = cn(inputColor, ringColor)

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {intervals.map(({ label, start, end }) => (
        <div key={label} className="grid gap-2">
          <FormLabel className={textColor}>{label}</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name={start}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={textColor}>Início</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={triggerClass}>
                        <SelectValue placeholder="Ex: 08:00" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={textColor} />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={end}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={textColor}>Término</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={triggerClass}>
                        <SelectValue placeholder="Ex: 17:00" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={textColor} />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export { AvailabilityIntervalSelect }