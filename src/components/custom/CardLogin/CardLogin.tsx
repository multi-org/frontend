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
  import { Eye, EyeOff } from 'lucide-react'
  import { Link } from 'react-router-dom'
  import { Toaster } from '@/components/ui/toaster'
  import { useToast } from "@/components/ui/use-toast"
  import api from '@/apis/api'

  const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 8 caracteres'),
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

    const { toast } = useToast()  // ✅ Ajuste aqui

    const onSubmit = async (data: FormData) => {
  try {
    setLoading(true);

    const response = await api.post('/users/login', {
      email: data.email,
      password: data.password,
    });

    const { token, user } = response.data;

    // Salva token em localStorage (ou onde preferir)
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    toast({
      title: "Login realizado",
      description: `Bem-vindo, ${user.name || 'usuário'}!`,
    });

    // Redirecionamento (se estiver usando react-router)
     // ou useNavigate se estiver com hooks
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Erro ao realizar login. Tente novamente.';

    toast({
      variant: "destructive",
      title: "Erro ao realizar login",
      description: errorMsg,
    });
  } finally {
    setLoading(false);
  }
};


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
      <div className="flex justify-center items-center h-full py-6 bg-[#FFFF] select-none">
        <Toaster />
        <Card className="flex flex-row h-full bg-[#F2F2F2] shadow-md rounded-l-md">
          <div className="w-[400px] h-[645px] relative hidden sm:flex">
            <img
              src="src\assets\imageLogin.png"
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
                    {...register('email')}
                    className={`${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5 relative justify-center">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    placeholder="********"
                    type={isVisible ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password')}
                    className={`${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <button
                    onClick={handlePasswordVisibility}
                    type="button"
                    aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    tabIndex={0}
                  >
                    {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center py-7 space-y-0.5">
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-[#36858E] hover:bg-[#5fb7c1] text-white cursor-pointer "
                    disabled={loading}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>

                  <Link to={'/register'}>
                    <Button
                      variant="link"
                      className="text-blue-500 hover:underline cursor-pointer"
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
