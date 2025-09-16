import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Eye, EyeOff, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import React, { useState } from 'react'

export enum AssociationType {
  local = 1,
  equipment = 2,
  service = 3,
}

type StepPersonalDataProps = {
  name: string
  phoneNumber: string
  cpf: string
  birthDate: string
  password?: string
  confirmPassword?: string
  preferences?: AssociationType[]
  onChange: (
    field:
      | 'name'
      | 'phoneNumber'
      | 'cpf'
      | 'birthDate'
      | 'password'
      | 'confirmPassword'
      | 'preferences',
    value: any
  ) => void
  fieldErrors?: { [key: string]: string }
  clearFieldError?: (field: string) => void // Nova prop opcional
}

function formatPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

function formatCPF(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

const StepPersonalData: React.FC<StepPersonalDataProps> = ({
  name,
  phoneNumber,
  cpf,
  birthDate,
  password,
  confirmPassword,
  preferences,
  onChange,
  fieldErrors = {},
  clearFieldError, // Nova prop
}) => {
  const [open, setOpen] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const selectedDate = birthDate ? new Date(birthDate) : undefined

  const handleFieldChange = (
    field: 'name' | 'phoneNumber' | 'cpf' | 'birthDate' | 'password' | 'confirmPassword' | 'preferences',
    value: any
  ) => {
    onChange(field, value)
    if (clearFieldError && fieldErrors[field]) {
      clearFieldError(field)
    }
  }

  const togglePreference = (type: AssociationType) => {
    const newPreferences = preferences?.includes(type)
      ? preferences.filter((item) => item !== type)
      : [...(preferences ?? []), type]
    handleFieldChange('preferences', newPreferences)
  }

  const handleDateChange = (date: Date | undefined) => {
    setOpen(false)
    if (date) {
      const iso = date.toISOString().split('T')[0]
      handleFieldChange('birthDate', iso)
    }
  }

  return (
    <div className="flex w-full flex-col gap-1">
      {/* Nome */}
      <label className="block text-sm font-medium">Nome</label>
      <Input
        placeholder="Nome"
        value={name}
        onChange={(e) => handleFieldChange('name', e.target.value)}
        maxLength={100}
        autoComplete="name"
        className={fieldErrors.name ? 
          'border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2' : 
          'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'
        }
      />
      {fieldErrors.name && (
        <p className="text-red-500 text-xs">{fieldErrors.name}</p>
      )}

      {/* Telefone */}
      <label className="block text-sm font-medium">Telefone</label>
      <Input
        placeholder="Telefone"
        value={phoneNumber}
        onChange={(e) => handleFieldChange('phoneNumber', formatPhone(e.target.value))}
        autoComplete="tel"
        maxLength={15}
        className={fieldErrors.phoneNumber ? 
          'border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2' : 
          'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'
        }
      />
      {fieldErrors.phoneNumber && (
        <p className="text-red-500 text-xs">{fieldErrors.phoneNumber}</p>
      )}

      {/* CPF */}
      <label className="block text-sm font-medium">CPF</label>
      <Input
        placeholder="CPF"
        value={cpf}
        onChange={(e) => handleFieldChange('cpf', formatCPF(e.target.value))}
        autoComplete="off"
        maxLength={14}
        className={fieldErrors.cpf ? 
          'border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2' : 
          'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'
        }
      />
      {fieldErrors.cpf && (
        <p className="text-red-500 text-xs">{fieldErrors.cpf}</p>
      )}

      {/* Data de Nascimento */}
      <div>
        <label className="block text-sm font-medium">Data de Nascimento</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                fieldErrors.birthDate ? 
                  'border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2' : 
                  'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'
              }`}
            >
              {birthDate ? (
                format(new Date(birthDate), 'dd/MM/yyyy')
              ) : (
                <span>Selecione a data</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              captionLayout="dropdown"
              fromYear={1900}
              toYear={new Date().getFullYear()}
            />
          </PopoverContent>
        </Popover>
        {fieldErrors.birthDate && (
          <p className="text-red-500 text-xs">{fieldErrors.birthDate}</p>
        )}
      </div>

      {/* Preferências */}
      <label className="block text-sm font-medium mt-2">Preferências</label>
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          type="button"
          variant="outline"
          className={
            (preferences ?? []).includes(AssociationType.local)
              ? 'bg-[#F7B350] text-white border-[#E79927] hover:bg-[#eaa73e] shadow-md'
              : 'bg-white text-[#A0A0A0] border-[#A0A0A0] hover:bg-[#f5f5f5]'
          }
          onClick={() => togglePreference(AssociationType.local)}
        >
          Local
        </Button>

        <Button
          type="button"
          variant="outline"
          className={
            (preferences ?? []).includes(AssociationType.equipment)
              ? 'bg-[#F7B350] text-white border-[#E79927] hover:bg-[#eaa73e] shadow-md'
              : 'bg-white text-[#A0A0A0] border-[#A0A0A0] hover:bg-[#f5f5f5]'
          }
          onClick={() => togglePreference(AssociationType.equipment)}
        >
          Equipamento
        </Button>

        <Button
          type="button"
          variant="outline"
          className={
            (preferences ?? []).includes(AssociationType.service)
              ? 'bg-[#F7B350] text-white border-[#E79927] hover:bg-[#eaa73e] shadow-md'
              : 'bg-white text-[#A0A0A0] border-[#A0A0A0] hover:bg-[#f5f5f5]'
          }
          onClick={() => togglePreference(AssociationType.service)}
        >
          Serviço
        </Button>
      </div>

      {/* Senha */}
      <label className="block text-sm font-medium">Senha</label>
      <div className="relative">
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Senha"
          value={password}
          onChange={(e) => handleFieldChange('password', e.target.value)}
          autoComplete="new-password"
          className={fieldErrors.password ? 
            'border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2' : 
            'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'
          }
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setIsPasswordVisible((v) => !v)}
          tabIndex={-1}
        >
          {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {fieldErrors.password && (
        <p className="text-red-500 text-xs">{fieldErrors.password}</p>
      )}

      {/* Confirmar Senha */}
      <label className="block text-sm font-medium">Confirmar Senha</label>
      <div className="relative">
        <Input
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
          autoComplete="new-password"
          className={fieldErrors.confirmPassword ? 
            'border-red-500 focus-visible:ring-red-500 focus-visible:ring-2 focus-visible:ring-offset-2' : 
            'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'
          }
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          onClick={() => setIsConfirmPasswordVisible((v) => !v)}
          tabIndex={-1}
        >
          {isConfirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {fieldErrors.confirmPassword && (
        <p className="text-red-500 text-xs">{fieldErrors.confirmPassword}</p>
      )}
    </div>
  )
}

export default StepPersonalData