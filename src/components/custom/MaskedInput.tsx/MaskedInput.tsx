import React, { useState } from "react"
import { Input } from "@/components/ui/input"

type MaskedInputProps = {
  mask: (value: string) => string
} & React.InputHTMLAttributes<HTMLInputElement>

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, ...props }, ref) => {
    const [value, setValue] = useState(props.value?.toString() || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "") // remove tudo que não for número
      const masked = mask(rawValue)
      setValue(masked)

      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: masked,
          },
        })
      }
    }

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
      />
    )
  }
)

MaskedInput.displayName = "MaskedInput"

export { MaskedInput }