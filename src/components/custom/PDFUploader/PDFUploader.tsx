import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

type PDFUploaderProps = {
  value?: File[]
  onChange?: (files: File[]) => void
}

const PDFUploader = React.forwardRef<HTMLDivElement, PDFUploaderProps>(
  ({ value = [], onChange }: PDFUploaderProps, ref) => {
    const [errors, setErrors] = useState<string[]>([])
    const MAX_FILES = 1
    const MAX_SIZE_MB = 5

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
      const files = Array.from(event.target.files || [])
      const newErrors: string[] = []
      const validFiles: File[] = []

      if (files.length > MAX_FILES) {
        newErrors.push(`Você pode enviar no máximo ${MAX_FILES} documento(s).`)
      }

      files.slice(0, MAX_FILES).forEach((file) => {
        const isValidType = file.type === "application/pdf"
        const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024

        if (!isValidType) {
          newErrors.push(`"${file.name}" não é um PDF válido.`)
        } else if (!isValidSize) {
          newErrors.push(`"${file.name}" excede o tamanho máximo de ${MAX_SIZE_MB}MB.`)
        } else {
          validFiles.push(file)
        }
      })

      setErrors(newErrors)
      if (newErrors.length === 0) {
        onChange?.(validFiles)
      }
    }

    function handleRemove(index: number) {
      const updatedFiles = [...value]
      updatedFiles.splice(index, 1)
      onChange?.(updatedFiles)
    }

    return (
      <div ref={ref} className="grid gap-3">
        <Label htmlFor="pdf">Documento (*.pdf)</Label>
        <Input
          id="pdf"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="text-gray-500 hover:cursor-pointer"
        />
        {errors.length > 0 && (
          <ul className="text-red-500 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        )}
        {value.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded-md bg-white text-black"
              >
                <span className="truncate max-w-[80%]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

PDFUploader.displayName = "PDFUploader"

export { PDFUploader }