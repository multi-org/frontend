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
import { ArrowLeft, CircleCheck, CircleX, Loader } from "lucide-react"
import { maskCEP, maskCNPJ, maskPhone } from "@/utils/masks"
import { MaskedInput } from "../MaskedInput.tsx"
import { useEffect } from "react"
import { toast } from "@/hooks/use-toast.ts"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import { useCompanies } from "@/hooks/companies-hooks.ts"

type companyRegisterRequestProps = {
    onBack: () => void;
    onNext: () => void;
    className?: string;
}

const companyRegisterRequestSchema = z.object({
    popularName: z.string().min(1, 'Nome da instituição é obrigatório.'),
    legalName: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome inválido"),
    description: z.string().min(1, 'Descrição é obrigatória.'),
    cnpj: z.string().min(18, "CNPJ precisa ter 18 caracteres"),
    zipCode: z.string().min(8, 'CEP precisa ter 8 números'),
    street: z.string().min(1, "Rua é pbrigatória"),
    number: z.string().min(1, "Número é obrigatóriio"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatório"),
    state: z.string().min(1, "Estado é obrigatório"),
    country: z.string().min(1, "País é obrigatório"),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email inválido"),
    phone: z.string().regex(/^\(\d{2}\) (?:\d \d{4}|\d{4})-\d{4}$/, "Telefone inválido"),
    isMicroenterprise: z.boolean(),
})

export default function CompanyRegisterRequest({
    onBack,
    onNext,
    className,
    ...props
}: companyRegisterRequestProps) {

    const { createCompanyRegisterRequest, loading } = useCompanies();

    const form = useForm<z.infer<typeof companyRegisterRequestSchema>>({
        resolver: zodResolver(companyRegisterRequestSchema),
        defaultValues: {
            popularName: '',
            legalName: '',
            description: '',
            cnpj: '',
            zipCode: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            country: '',
            email: '',
            phone: '',
            isMicroenterprise: false,
        },
    })

    const cep = useWatch({ control: form.control, name: 'zipCode' })

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
                form.setValue("country", "Brasil")
            })
            .catch((err) => console.error("Erro ao buscar CEP:", err))
    }, [cep, form])

    const onSubmit = async (data: z.infer<typeof companyRegisterRequestSchema>) => {
        try {
            const result = await createCompanyRegisterRequest(data)
            console.log("resposta:", result)
            if (result) {
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
                form.reset()
            }
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="popularName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className="text-black"
                                                            >
                                                                Nome fantasia
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    placeholder="Ex.: UEPB - Canpus Patos"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="legalName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel
                                                                className="text-black"
                                                            >
                                                                Nome jurídico
                                                            </FormLabel>
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
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => {
                                                    const remainingCharacters = 300 - field.value.length
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="text-black"
                                                            >
                                                                Descrição
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div
                                                                    className="relative"
                                                                >
                                                                    <Textarea
                                                                        placeholder="Ex.: Universidade voltada para o campo das ciências exatas"
                                                                        className="resize-none text-black focus-visible:ring-blueLight"
                                                                        maxLength={300}
                                                                        {...field}
                                                                    />
                                                                    <div
                                                                        className={cn(
                                                                            "absolute right-1 bottom-[-20px] text-xs",
                                                                            remainingCharacters < 50 ? "text-red-500" : "text-black"
                                                                        )}
                                                                    >
                                                                        {remainingCharacters} caracteres restantes
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="cnpj"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">
                                                                CNPJ
                                                            </FormLabel>
                                                            <FormControl>
                                                                <MaskedInput
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    placeholder="Ex.: 00.000.000/0000-00"
                                                                    mask={maskCNPJ}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="isMicroenterprise"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-center justify-between space-y-0 rounded-md border py-2 px-4 mt-8 bg-white overflow-hidden">
                                                            <FormLabel
                                                                className="text-black max-w-[60%] truncate"
                                                            >
                                                                Microempresa?
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Switch
                                                                    className="data-[state=checked]:bg-blueLight"
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
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
                                                    name="zipCode"
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
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">
                                                                Número
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="text-black focus-visible:ring-blueLight"
                                                                    placeholder="Ex.: 12 ou s/n"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
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
                                                                    placeholder="Ex.: Casa"
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
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
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
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="country"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">País</FormLabel>
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
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="focus-visible:ring-blueLight"
                                                                    placeholder="Ex.: email@email.com"
                                                                    {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Telefone</FormLabel>
                                                            <FormControl>
                                                                <MaskedInput
                                                                    className="focus-visible:ring-blueLight"
                                                                    placeholder="Ex.: (83) 9 9999-9999"
                                                                    mask={maskPhone}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full bg-yellowDark hover:bg-yellowNormal">
                                            {loading ?
                                                <Loader className="animate-spin" />
                                                : 'Prosseguir'
                                            }
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