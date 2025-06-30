import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Eye, EyeOff } from 'lucide-react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import React, { useState } from 'react'

type StepPersonalDataProps = {
  name: string
  phoneNumber: string
  cpf: string
  birthDate: string
  password?: string
  confirmPassword?: string
  onChange: (
    field:
      | 'name'
      | 'phoneNumber'
      | 'cpf'
      | 'birthDate'
      | 'password'
      | 'confirmPassword',
    value: string,
  ) => void
  fieldErrors?: { [key: string]: string }
}

function formatPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

// Função para formatar CPF (ex: 999.999.999-99)
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
  onChange,
  fieldErrors = {},
}) => {
  const [open, setOpen] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const selectedDate = birthDate ? new Date(birthDate) : undefined

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="block text-sm font-medium">Nome</label>
      <Input
        placeholder="Nome"
        value={name}
        onChange={(e) => onChange('name', e.target.value)}
        maxLength={100}
        autoComplete="name"
        className={fieldErrors.name ? 'border-red-500 focus:ring-red-500' : ''}
      />
      {fieldErrors.name && (
        <p className="text-red-500 text-xs">{fieldErrors.name}</p>
      )}

      <label className="block text-sm font-medium">Telefone</label>
      <Input
        placeholder="Telefone"
        value={phoneNumber}
        onChange={(e) => onChange('phoneNumber', formatPhone(e.target.value))}
        autoComplete="tel"
        maxLength={15}
        className={fieldErrors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''}
      />
      {fieldErrors.phoneNumber && (
        <p className="text-red-500 text-xs">{fieldErrors.phoneNumber}</p>
      )}

      <label className="block text-sm font-medium">CPF</label>
      <Input
        placeholder="CPF"
        value={cpf}
        onChange={(e) => onChange('cpf', formatCPF(e.target.value))}
        autoComplete="off"
        maxLength={14}
        className={fieldErrors.cpf ? 'border-red-500 focus:ring-red-500' : ''}
      />
      {fieldErrors.cpf && (
        <p className="text-red-500 text-xs">{fieldErrors.cpf}</p>
      )}

      <div>
        <label className="block text-sm font-medium">Data de Nascimento</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${fieldErrors.birthDate ? 'border-red-500 focus:ring-red-500' : ''}`}
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
              onSelect={(date) => {
                setOpen(false)
                if (date) {
                  const iso = date.toISOString().split('T')[0]
                  onChange('birthDate', iso)
                }
              }}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
        {fieldErrors.birthDate && (
          <p className="text-red-500 text-xs">{fieldErrors.birthDate}</p>
        )}
      </div>

      <label className="block text-sm font-medium">Senha</label>
      <div className="relative">
        <Input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Senha"
          value={password}
          onChange={(e) => onChange('password', e.target.value)}
          autoComplete="new-password"
          className={fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''}
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

      <label className="block text-sm font-medium">Confirmar Senha</label>
      <div className="relative">
        <Input
          type={isConfirmPasswordVisible ? "text" : "password"}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => onChange('confirmPassword', e.target.value)}
          autoComplete="new-password"
          className={fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}
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
    );
  };
  
  export default StepPersonalData;