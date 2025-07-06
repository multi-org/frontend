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
import { CircleCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

type UserPasswordUpdateProps = {
    className?: string;
}

const userPasswordUpdateSchema = z.object({
    password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/, "A senha precisa ter no mínimo 8 caracteres, com letras, números e caracteres especiais como @, #, $, %, &, *"),
    confirmPassword: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/, "A senha precisa ter no mínimo 8 caracteres, com letras, números e caracteres especiais como @, #, $, %, &, *"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
})

export default function UserPasswordUpdate({
    className,
    ...props
}: UserPasswordUpdateProps) {

    const [showPassword, setShowPassword] = useState(true)
    const [wantsToUpdatePassword, setWantsToUpdatePassword] = useState(false)

    const form = useForm<z.infer<typeof userPasswordUpdateSchema>>({
        resolver: zodResolver(userPasswordUpdateSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: z.infer<typeof userPasswordUpdateSchema>) {
        console.log(data);
        toast({
            description: (
                <div className="flex items-center gap-2">
                    <CircleCheck className="text-white" size={20} />
                    Senha alterada com sucesso
                </div>
            ),
            variant: 'default',
            style: {
                backgroundColor: "#4E995E",
                color: "#FFFFFF",
            },
        })
        form.reset()
    }

    function handleCancel() {
        setWantsToUpdatePassword(false)
        form.reset()
    }

    return (
        <div className={cn("flex flex-col gap-6 justify-center items-center", className)} {...props}>
            <Card className="m-6 w-1/2 min-w-56 overflow-hidden">
                <CardHeader className="text-center">
                    <CardTitle>Alteração de senha</CardTitle>
                    {wantsToUpdatePassword ? (
                        <CardDescription>
                            Preencha os campos de senha e confirmação para alterar corretamente
                        </CardDescription>
                    ) : (
                        <CardDescription>
                            Se deseja alterar sua senha, clique no botão abaixo
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-6">
                    {wantsToUpdatePassword ? (
                        <FormProvider  {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
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
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmação da senha</FormLabel>
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
                                        onClick={handleCancel}
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
                    ) : (
                        <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => setWantsToUpdatePassword(true)}
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