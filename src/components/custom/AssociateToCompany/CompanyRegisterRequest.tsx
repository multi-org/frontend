import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, CircleCheck } from "lucide-react"
import { maskCEP } from "@/utils/masks"
import { MaskedInput } from "../MaskedInput.tsx"
import { useEffect } from "react"
import { toast } from "@/hooks/use-toast.ts"

type companyRegisterRequestProps = {
    onBack: () => void;
    onNext: () => void;
    className?: string;
}

const companyRegisterRequestSchema = z.object({
    companyName: z.string().min(1, 'Nome da instituição é obrigatório.'),
    companyAddress: z.string().min(1, 'CEP é obrigatório.'),
    street: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
})

export default function CompanyRegisterRequest({
    onBack,
    onNext,
    className,
    ...props
}: companyRegisterRequestProps) {

    const form = useForm<z.infer<typeof companyRegisterRequestSchema>>({
        resolver: zodResolver(companyRegisterRequestSchema),
        defaultValues: {
            companyName: '',
            companyAddress: '',
            street: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
        },
    })

    const cep = useWatch({ control: form.control, name: 'companyAddress' })

    useEffect(() => {
        const cleanCep = cep?.replace(/\D/g, '')
        if (cleanCep?.length !== 8) return

        fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.erro) return
                form.setValue("street", data.logradouro || '')
                form.setValue("complement", data.complemento || '')
                form.setValue("neighborhood", data.bairro || '')
                form.setValue("city", data.localidade || '')
                form.setValue("state", data.uf || '')
            })
            .catch((err) => console.error("Erro ao buscar CEP:", err))
    }, [cep, form])

    function onSubmit(data: z.infer<typeof companyRegisterRequestSchema>) {
        console.log("Dados enviados:", data)
        form.reset()
        toast({
            description: (
                <div className="flex items-center gap-2">
                    <CircleCheck className="text-white" size={20} />
                    Solicitação de cadasto de instituição enviada com sucesso
                </div>
            ),
            variant: 'default',
            style: {
                backgroundColor: "#4E995E",
                color: "#FFFFFF",
            },
        })
    }

    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Solicite o cadastro da sua instituição
                    </h1>
                    <span className="text-center font-medium">
                        Depois de estar devidamente cadastrada, você poderá associar-se à sua instituição
                    </span>
                </div>
            </header>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="m-6 bg-gray-100 overflow-hidden">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Dados da solicitação</CardTitle>
                        <CardDescription>
                            Inform corretamente os dados abaixo para solicitar o cadastro da sua instituição.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormProvider  {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="companyName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-black">Nome da instituição</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="text-black focus-visible:ring-blueLight"
                                                                placeholder="Ex.: Universidade Estadual da Paraíba - UEPB"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="companyAddress"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className="text-black">CEP</FormLabel>
                                                            <FormControl>
                                                                <MaskedInput
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    placeholder="Ex.: 00000-000"
                                                                    mask={maskCEP}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="street"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">Rua</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="complement"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">Complemento</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="neighborhood"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">Bairro</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="city"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">Cidade</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="state"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">Estado</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full bg-yellowDark hover:bg-yellowNormal">
                                            Prosseguir
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm">
                                        Clique{" "}
                                        <Button
                                            type="button"
                                            className="p-0 text-yellowDark hover:text-blueDark"
                                            variant="link"
                                            onClick={onNext}
                                        >
                                            aqui
                                        </Button>
                                        {" "}caso deseje solicitar um responsável legal pela instituição.
                                    </div>
                                    <div className="flex justify-end text-center text-sm ">
                                        <Button
                                            type="button"
                                            className="p-0 text-yellowDark hover:text-blueDark"
                                            variant="link"
                                            onClick={onBack}
                                        >
                                            <ArrowLeft />
                                            Voltar
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export { CompanyRegisterRequest }