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
      {intervals.map(({ label, start, end, required }) => (
        <div key={label} className="grid gap-2">
          <FormLabel className={textColor}>{label}</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            {[start, end].map((fieldName, idx) => (
              <FormField
                key={fieldName}
                control={control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={textColor}>
                      {idx === 0 ? "Início" : "Término"}
                    </FormLabel>
                    <Select
                      onValueChange={(val) =>
                        field.onChange(val === "none" ? undefined : val)
                      }
                      value={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger className={triggerClass}>
                          <SelectValue placeholder={`Ex: ${idx === 0 ? "08:00" : "17:00"}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!required && <SelectItem value="none">Nenhum</SelectItem>}
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
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { AvailabilityIntervalSelect }