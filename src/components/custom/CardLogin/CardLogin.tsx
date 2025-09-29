import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CircleCheck, Eye, EyeOff, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import api from '@/apis/api'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type FormData = z.infer<typeof loginSchema>

const CardLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)

      console.log('Enviando dados de login:', data)

      const response = await api.post('/users/login', {
        email: data.email,
        password: data.password,
      })

      console.log('✅ LOGIN BEM-SUCEDIDO!')
      console.log('Response:', response)
      console.log('Response data:', response.data)
      console.log('Response status:', response.status)

      // A resposta do seu backend contém: { message, userName }
      const { user } = response.data;
      const userName = user?.userName;
      const userAvatar = user?.photoPerfil || "";
      const userRoles = user?.userRoles || [];

      // O token está sendo enviado como cookie HTTP-only automaticamente
      // Não precisamos salvar o token manualmente, ele já está nos cookies

      // Salvar apenas as informações do usuário no localStorage (opcional)
      if (user) {
        localStorage.setItem('userName', userName)
        localStorage.setItem('userProfilePic', userAvatar)
        localStorage.setItem('userRoles', JSON.stringify(userRoles))
      }

      toast({
        description: (
          <div className="flex items-center gap-2">
            <CircleCheck className="text-blueNormal" size={20} />
            Bem-vindo, {userName || 'usuário'}!
          </div>
        ),
        variant: 'default',
        style: {
          color: "#36858E",
        },
      })

      navigate('/user')

    } catch (error: any) {
      console.error('❌ ERRO NO LOGIN:')
      console.error('Erro completo:', error)
      console.error('Error response:', error.response)
      console.error('Error response status:', error.response?.status)
      console.error('Error response data:', error.response?.data)

      let errorMsg = 'Erro ao realizar login. Tente novamente.'

      if (error.response?.data?.message) {
        errorMsg = error.response.data.message
      } else if (error.message) {
        errorMsg = error.message
      }

      toast({
        variant: "destructive",
        title: "Erro ao realizar login",
        description: errorMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: error.message || 'Erro ao preencher o formulário',
      })
    })
  }

  const handlePasswordVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <div className="flex justify-center items-center h-full py-6 bg-[#FFFF] select-none ">
      <Card className="flex flex-row h-full bg-[#F2F2F2] shadow-md rounded-l-md">
        <div className="w-[400px] h-[645px] relative hidden sm:flex">
          <img
            src="/assets/imageLogin.png"
            alt="Imagem de fundo"
            className="w-full h-full object-cover rounded-l-md"
            draggable="false"
          />
        </div>

        <div className="flex flex-col px-6 py-6 w-[400px] max-w-[550px] h-full">
          <CardHeader className="flex flex-col items-center text-center">
            <CardTitle className="text-lg font-bold py-3">Entrar</CardTitle>
            <CardDescription className="text-muted-foreground max-w-xs">
              Bem-vindo de volta à Multi UEPB! Obrigado por utilizar nossa plataforma.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col py-8 items-center">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-4 w-full"
            >
              <div className="flex flex-col py-7 space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  placeholder="Seu E-mail"
                  autoComplete="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500 focus:ring-red-500' : 'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'}

                />
                {errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="********"
                    type={isVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password')}
                    className={errors.password ? 'border-red-500 focus:ring-red-500' : 'focus-visible:ring-yellowDark focus-visible:ring-2 focus-visible:ring-offset-2'}
                  />
                  <button
                    onClick={handlePasswordVisibility}
                    type="button"
                    aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={0}
                  >
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center py-7 space-y-0.5">
                <Button
                  type="submit"
                  className="w-full mt-4 bg-[#36858E] hover:bg-[#5fb7c1] text-grayLight"
                  disabled={loading}
                >
                  {loading ? <Loader className='animate-spin'/> : 'Login'}
                </Button>

                <Link to="/sign-up">
                  <Button
                    variant="link"
                    className="text-blueLight hover:text-yellowDark hover:no-underline"
                    type="button"
                  >
                    Não possui conta? clique aqui
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default CardLogin