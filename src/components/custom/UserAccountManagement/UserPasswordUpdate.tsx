import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useUsers } from "@/hooks/users-hooks";

type UserPasswordUpdateProps = {
    className?: string;
}

const stepOneSchema = z.object({
    password: z.string().min(1, "Informe sua senha atual"),
})

const stepTwoSchema = z.object({
    newPassword: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/, "Senha inválida"),
    passwordConfirmation: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/, "Senha inválida"),
}).refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
})

export default function UserPasswordUpdate({
    className,
    ...props
}: UserPasswordUpdateProps) {

    const { confirmUserPassword, updateUserPassword } = useUsers()
    const [showPassword, setShowPassword] = useState(true)
    const [updatePasswordStep, setUpdatePasswordStep] = useState<number>(0)

    const form = useForm({
        resolver: zodResolver(updatePasswordStep === 1 ? stepOneSchema : stepTwoSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            passwordConfirmation: "",
        },
    })

    const handleConfirmCurrentPassword = async (data: z.infer<typeof stepOneSchema>) => {
        try {
            const result = await confirmUserPassword(data.password)
            console.log(result)
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleCheck className="text-sucess" size={20} />
                        Senha correta! Agora informe a nova senha
                    </div>
                ),
                variant: 'default',
                style: {
                    backgroundColor: "#FFFFFF",
                    color: "#4E995E",
                },
            })
            setUpdatePasswordStep(2)
            form.reset()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado";
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            })
        }
    }

    const handleUpdatePassword = async (data: z.infer<typeof stepTwoSchema>) => {
        try {
            const result = await updateUserPassword(data.newPassword, data.passwordConfirmation)
            console.log(result)
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleCheck className="text-white" size={20} />
                        Senha alterada com sucesso!
                    </div>
                ),
                variant: 'default',
                style: {
                    backgroundColor: "#4E995E",
                    color: "#FFFFFF",
                },
            })
            setUpdatePasswordStep(0)
            form.reset()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado";
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            })
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 justify-center items-center", className)} {...props}>
            <Card className="m-6 w-1/2 min-w-72 overflow-hidden">
                <CardHeader className="text-center">
                    <CardTitle>Alteração de senha</CardTitle>
                    {updatePasswordStep === 0 && (
                        <CardDescription>
                            Se deseja alterar sua senha, clique no botão abaixo
                        </CardDescription>
                    )}
                    {updatePasswordStep === 1 && (
                        <CardDescription>
                            Confirme sua senha atual
                        </CardDescription>
                    )}
                    {updatePasswordStep === 2 && (
                        <CardDescription>
                            Informe e confirme a sua nova senha
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-6">
                    {updatePasswordStep === 1 && (
                        <FormProvider  {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleConfirmCurrentPassword)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha atual</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2 relative">
                                                    <Input
                                                        className="w-full pr-10 focus-visible:ring-blueLight"
                                                        type={showPassword
                                                            ? "password"
                                                            : "text"
                                                        }
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent hover:cursor-pointer"
                                                        variant="ghost"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword
                                                            ? <EyeOff className="w-5 h-5" />
                                                            : <Eye className="w-5 h-5" />
                                                        }
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between mt-6 gap-2">
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        onClick={() => setUpdatePasswordStep(0)}
                                        className="hover:bg-blue-50"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant={"outline"}
                                        className="hover:bg-yellowDark hover:text-grayLight"
                                    >
                                        Confirmar
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    )}
                    {updatePasswordStep === 2 && (
                        <FormProvider  {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleUpdatePassword)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nova senha</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2 relative">
                                                    <Input
                                                        className="w-full pr-10 focus-visible:ring-blueLight"
                                                        type={showPassword
                                                            ? "password"
                                                            : "text"
                                                        }
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent hover:cursor-pointer"
                                                        variant="ghost"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword
                                                            ? <EyeOff className="w-5 h-5" />
                                                            : <Eye className="w-5 h-5" />
                                                        }
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="passwordConfirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmar nova senha</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2 relative">
                                                    <Input
                                                        className="w-full pr-10 focus-visible:ring-blueLight"
                                                        type={showPassword
                                                            ? "password"
                                                            : "text"
                                                        }
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent hover:cursor-pointer"
                                                        variant="ghost"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword
                                                            ? <EyeOff className="w-5 h-5" />
                                                            : <Eye className="w-5 h-5" />
                                                        }
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between mt-6 gap-2">
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        onClick={() => setUpdatePasswordStep(0)}
                                        className="hover:bg-blue-50"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant={"outline"}
                                        className="hover:bg-yellowDark hover:text-grayLight"
                                    >
                                        Confirmar
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    )}
                    {updatePasswordStep === 0 && (
                        <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => setUpdatePasswordStep(1)}
                            className="hover:bg-blueLight hover:text-grayLight"
                        >
                            Alterar
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export { UserPasswordUpdate }