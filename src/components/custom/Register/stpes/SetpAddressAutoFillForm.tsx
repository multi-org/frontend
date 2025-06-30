import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Importe o enum do local correto
export enum AssociationType {
  local = 1,
  equipment = 2,
  service = 3,
}

interface FormData {
  zipcode: string
  street: string
  city: string
  state: string
  preference?: AssociationType[]
}

interface AddressAutoFillFormProps {
  formData: FormData
  onChange: (updatedFields: Partial<FormData>) => void
  fieldErrors?: { [key: string]: string }
}

function formatCEP(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

const AddressAutoFillForm: React.FC<AddressAutoFillFormProps> = ({
  formData,
  onChange,
  fieldErrors = {},
}) => {
  const { zipcode, street, city, state, preference = [] } = formData

  // Função para alternar seleção dos botões
  const togglePreference = (type: AssociationType) => {
    const alreadySelected = preference.includes(type)
    const newPreference = alreadySelected
      ? preference.filter((t) => t !== type)
      : [...preference, type]
    onChange({ preference: newPreference })
  }

  useEffect(() => {
    const fetchAddress = async () => {
      const cleanCep = zipcode.replace(/\D/g, '')
      if (cleanCep.length !== 8) return

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()

        if (!data.erro) {
          onChange({
            street: data.logradouro || '',
            city: data.localidade || '',
            state: data.uf || '',
          })
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }

    fetchAddress()
  }, [zipcode, onChange])

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex gap-2 my-4">
  <Button
    type="button"
    className={
      preference.includes(AssociationType.local)
        ? "bg-[#F7B350] text-white border border-[#E79927] hover:bg-[#eaa73e]"
        : "bg-white text-[#A0A0A0] border border-[#A0A0A0] hover:bg-[#f5f5f5]"
    }
    onClick={() => togglePreference(AssociationType.local)}
  >
    Local
  </Button>

  <Button
    type="button"
    className={
      preference.includes(AssociationType.equipment)
        ? "bg-[#F7B350] text-white border border-[#E79927] hover:bg-[#eaa73e]"
        : "bg-white text-[#A0A0A0] border border-[#A0A0A0] hover:bg-[#f5f5f5]"
    }
    onClick={() => togglePreference(AssociationType.equipment)}
  >
    Equipamento
  </Button>

  <Button
    type="button"
    className={
      preference.includes(AssociationType.service)
        ? "bg-[#F7B350] text-white border border-[#E79927] hover:bg-[#eaa73e]"
        : "bg-white text-[#A0A0A0] border border-[#A0A0A0] hover:bg-[#f5f5f5]"
    }
    onClick={() => togglePreference(AssociationType.service)}
  >
    Serviço
  </Button>
</div>



      {/* ...restante do formulário... */}
      <label className="block text-sm font-medium">CEP</label>
      <Input
        placeholder="Digite o CEP"
        value={zipcode}
        onChange={(e) => onChange({ zipcode: formatCEP(e.target.value) })}
        maxLength={9}
        autoComplete="postal-code"
        className={fieldErrors.zipcode ? 'border-red-500 focus:ring-red-500' : ''}
      />
      {fieldErrors.zipcode && (
        <p className="text-red-500 text-xs">{fieldErrors.zipcode}</p>
      )}

      <label className="block text-sm font-medium">Rua</label>
      <Input
        placeholder="Rua"
        value={street}
        onChange={(e) => onChange({ street: e.target.value })}
        className={fieldErrors.street ? 'border-red-500 focus:ring-red-500' : ''}
      />
      {fieldErrors.street && (
        <p className="text-red-500 text-xs">{fieldErrors.street}</p>
      )}

      <div className='flex gap-2'>
        <div className='flex-col'>
          <label className="block text-sm font-medium">Cidade</label>
          <Input
            placeholder="Cidade"
            value={city}
            onChange={(e) => onChange({ city: e.target.value })}
            className={fieldErrors.city ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {fieldErrors.city && (
            <p className="text-red-500 text-xs">{fieldErrors.city}</p>
          )}
        </div>

        <div className='flex-col'>
          <label className="block text-sm font-medium">Estado</label>
          <Input
            placeholder="Estado"
            value={state}
            onChange={(e) => onChange({ state: e.target.value })}
            className={fieldErrors.state ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {fieldErrors.state && (
            <p className="text-red-500 text-xs">{fieldErrors.state}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddressAutoFillForm