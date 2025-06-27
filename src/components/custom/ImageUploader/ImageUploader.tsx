import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ImageUploaderProps = {
  value?: File[]
  onChange?: (files: File[]) => void
}

const ImageUploader = React.forwardRef<HTMLDivElement, ImageUploaderProps>(({ value = [], onChange }: ImageUploaderProps, ref) => {
  const [previews, setPreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const MAX_FILES = 3
  const MAX_SIZE_MB = 3

  useEffect(() => {
    if (value.length > 0) {
      const objectUrls = value.map((file) => URL.createObjectURL(file))
      setPreviews(objectUrls)
      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url))
    } else {
      setPreviews([])
    }
  }, [value])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])
    const newErrors: string[] = []
    const validFiles: File[] = []

    if (files.length > MAX_FILES) {
      newErrors.push(`Você pode enviar no máximo ${MAX_FILES} imagens.`)
    }

    files.slice(0, MAX_FILES).forEach((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024

      if (!isValidType) {
        newErrors.push(`"${file.name}" não é um formato suportado.`)
      } else if (!isValidSize) {
        newErrors.push(`"${file.name}" excede o tamanho máximo de ${MAX_SIZE_MB}MB.`)
      } else {
        validFiles.push(file)
      }
    })

    setErrors(newErrors)
    onChange?.(validFiles)
  }

  return (
    <div className="grid gap-3">
      <Label htmlFor="images">Imagens (*.jpg, *.jpeg, *.png)</Label>
      <Input
        id="images"
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
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
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="w-24 h-24 object-cover rounded-md border"
            />
          ))}
        </div>
      )}
    </div>
  )
})

ImageUploader.displayName = "ImageUploader"

export { ImageUploader }