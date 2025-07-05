import React, { useEffect, useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'

interface FormData {
  zipCode: string
  street: string
  number?: string
  complement?: string
  country?: string
  neighborhood?: string
  city: string
  state: string
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
  const { zipCode, street, city, state, number, complement, neighborhood, country } = formData
  const [isLoading, setIsLoading] = useState(false)
  const [lastSearchedCep, setLastSearchedCep] = useState('')

  // Função debounce
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }, [])

  // Função para buscar endereço
  const fetchAddress = useCallback(async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '')
    
    // Verificar se o CEP tem 8 dígitos
    if (cleanCep.length !== 8) return
    
    // Evitar buscar o mesmo CEP novamente
    if (cleanCep === lastSearchedCep) return
    
    setIsLoading(true)
    setLastSearchedCep(cleanCep)

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()

      if (!data.erro) {
        onChange({
          street: data.logradouro || '',
          city: data.localidade || '',
          state: data.uf || '',
          neighborhood: data.bairro || '',
          country: 'Brasil'
        })
      } else {
        console.log('CEP não encontrado')
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
    } finally {
      setIsLoading(false)
    }
  }, [onChange, lastSearchedCep])

  // Debounce da função de busca (espera 800ms após parar de digitar)
  const debouncedFetchAddress = useCallback(
    debounce(fetchAddress, 800),
    [fetchAddress]
  )

  useEffect(() => {
    if (zipCode) {
      debouncedFetchAddress(zipCode)
    }
  }, [zipCode, debouncedFetchAddress])

  return (
    <div className="flex w-full flex-col gap-3">
      {/* CEP */}
      <div>
        <label className="block text-sm font-medium mb-1">
          CEP {isLoading && <span className="text-blue-500 text-xs">(Buscando...)</span>}
        </label>
        <Input
          placeholder="Digite o CEP"
          value={zipCode || ''}
          onChange={e => onChange({ zipCode: formatCEP(e.target.value) })}
          maxLength={9}
          autoComplete="postal-code"
          className={fieldErrors.zipCode ? 'border-red-500 focus:ring-red-500' : ''}
        />
        {fieldErrors.zipCode && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.zipCode}</p>
        )}
      </div>

      {/* Resto dos campos... */}
      <div>
        <label className="block text-sm font-medium mb-1">Rua</label>
        <Input
          placeholder="Rua"
          value={street || ''}
          onChange={e => onChange({ street: e.target.value })}
          className={fieldErrors.street ? 'border-red-500 focus:ring-red-500' : ''}
        />
        {fieldErrors.street && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.street}</p>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Número</label>
          <Input
            placeholder="Número"
            value={number || ''}
            onChange={e => onChange({ number: e.target.value })}
            className={fieldErrors.number ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {fieldErrors.number && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.number}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Complemento</label>
          <Input
            placeholder="Apto, Bloco, etc. (opcional)"
            value={complement || ''}
            onChange={e => onChange({ complement: e.target.value })}
            className={fieldErrors.complement ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {fieldErrors.complement && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.complement}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bairro</label>
        <Input
          placeholder="Bairro"
          value={neighborhood || ''}
          onChange={e => onChange({ neighborhood: e.target.value })}
          className={fieldErrors.neighborhood ? 'border-red-500 focus:ring-red-500' : ''}
        />
        {fieldErrors.neighborhood && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.neighborhood}</p>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Cidade</label>
          <Input
            placeholder="Cidade"
            value={city || ''}
            onChange={e => onChange({ city: e.target.value })}
            className={fieldErrors.city ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {fieldErrors.city && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>
          )}
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Estado</label>
          <Input
            placeholder="Estado"
            value={state || ''}
            onChange={e => onChange({ state: e.target.value })}
            className={fieldErrors.state ? 'border-red-500 focus:ring-red-500' : ''}
          />
          {fieldErrors.state && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.state}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">País</label>
        <Input
          placeholder="País"
          value={country || 'Brasil'}
          onChange={e => onChange({ country: e.target.value })}
          className={fieldErrors.country ? 'border-red-500 focus:ring-red-500' : ''}
        />
        {fieldErrors.country && (
          <p className="text-red-500 text-xs mt-1">{fieldErrors.country}</p>
        )}
      </div>
    </div>
  )
}

export default AddressAutoFillForm