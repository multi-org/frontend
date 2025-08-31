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
import { FormProvider, useForm } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PDFUploader } from "../PDFUploader"
import { ArrowLeft, CircleCheck, CircleX, Loader, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { MaskedInput } from "../MaskedInput.tsx"
import { maskCPF, maskPhone } from "@/utils/masks.ts"
import { useEffect, useState } from "react"
import { useCompanies } from "@/hooks/companies-hooks.ts"
import { debounce } from "@/utils/debounce.ts"
import { useAssociateToCompany } from "@/hooks/associateToCompany-hooks.ts"

type InstitutionOption = {
    id: string
    name: string
}

type legalResponsibleUserRequestProps = {
    onBack: () => void;
    className?: string;
}

const legalResponsibleUserRequestSchema = z.object({
    name: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome inválido"),
    userCpf: z.string().
        min(1, 'Nº de CPF é obrigatório.')
        .refine((value) => value.replace(/\D/g, '').length === 11, {
            message: 'CPF deve conter exatamente 11 números.',
        }),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email inválido"),
    phoneNumber: z.string().regex(/^\(\d{2}\) \d \d{4}-\d{4}$/, "Telefone inválido"),
    companyName: z.string().min(1, 'Nome da instituição é obrigatório.'),
    position: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Informar cargo exercido"),
    document: z
        .any()
        .refine(
            (files: File[]) => files.length === 1,
            'Você deve enviar 1 documento.'
        )
        .refine(
            (files: File[]) =>
                files.every((file) => file.size <= 5 * 1024 * 1024),
            'O arquivo deve ter no máximo 5MB.'
        )
        .refine(
            (files: File[]) =>
                files.every((file) => file.type === 'application/pdf'),
            'O arquivo deve ser um PDF válido.'
        ),
})

export default function LegalResponsibleUserRequest({
    onBack,
    className,
    ...props
}: legalResponsibleUserRequestProps) {

    const { getCompanies } = useCompanies()
    const { createResponsibleUser, loading } = useAssociateToCompany()
    const [query, setQuery] = useState("")
    const [filteredInstitutions, setFilteredInstitutions] = useState<InstitutionOption[]>([])
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

    useEffect(() => {
        const debouncedSearch = debounce(async () => {
            if (!query) {
                setFilteredInstitutions([])
                return
            }
            try {
                const response = await getCompanies()
                const filtered = response
                    .filter((company) =>
                        company.legalName.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((company) => ({
                        id: company.id,
                        name: company.legalName,
                    }))

                setFilteredInstitutions(filtered)
            } catch (err) {
                console.error("Erro ao buscar instituições:", err)
            }
        }, 300)
        debouncedSearch()
        return () => debouncedSearch.cancel()
    }, [query])

    const form = useForm<z.infer<typeof legalResponsibleUserRequestSchema>>({
        resolver: zodResolver(legalResponsibleUserRequestSchema),
        defaultValues: {
            name: '',
            userCpf: '',
            email: '',
            phoneNumber: '',
            companyName: '',
            position: '',
            document: [],
        },
    })

    const onSubmit = async (data: z.infer<typeof legalResponsibleUserRequestSchema>) => {
        if (!selectedCompanyId) {
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        Selecione uma instituição válida.
                    </div>
                ),
                variant: "destructive"
            });
            return;
        }
        if (!data.document || !Array.isArray(data.document) || data.document.length !== 1) {
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        Você deve enviar 1 documento PDF.
                    </div>
                ),
                variant: "destructive"
            });
            return;
        }
        const finalData = {
            userCpf: data.userCpf,
            document: data.document[0] as File,
            userId: {
                name: data.name,
                phoneNumber: data.phoneNumber,
            },
            companyId: {
                id: selectedCompanyId,
                legalName: data.companyName,
            },
            position: data.position,
        };
        try {
            console.log("dados enviados:", finalData)
            const result = await createResponsibleUser(finalData)
            console.log("Resposta da requisição:", result)
            if (result) {
                toast({
                    description: (
                        <div className="flex items-center gap-2">
                            <CircleCheck className="text-white" size={20} />
                            Solicitação de usuário responsável legal enviada com sucesso
                        </div>
                    ),
                    variant: 'default',
                    style: {
                        backgroundColor: "#4E995E",
                        color: "#FFFFFF",
                    },
                });
                form.reset();
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado"
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            });
        }
    }

    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Solicitar responsável legal para uma instituição
                    </h1>
                    <span className="text-center font-medium">
                        Ao ser aprovado, o responsável legal ficará à cargo do gerenciamento das demandas da instiuição no sistema
                    </span>
                </div>
            </header>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="m-6 bg-gray-100 overflow-hidden">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Solicitação de responsável legal</CardTitle>
                        <CardDescription>
                            Informe a instituição e os dados necessários do responsável legal para solicitação
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
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nome</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="focus-visible:ring-yellowLight"
                                                                    placeholder="Ex.: João da Silva"
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
                                                    name="userCpf"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-black">
                                                                CPF
                                                            </FormLabel>
                                                            <FormControl>
                                                                <MaskedInput
                                                                    className="text-black focus-visible:ring-yellowLight"
                                                                    placeholder="Ex.: 000.000.000-00"
                                                                    mask={maskCPF}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
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
                                                                    className="focus-visible:ring-yellowLight"
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
                                                    name="phoneNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Telefone</FormLabel>
                                                            <FormControl>
                                                                <MaskedInput
                                                                    className="focus-visible:ring-yellowLight"
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
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="companyName"
                                                render={({ field }) => (
                                                    <FormItem className="relative">
                                                        <FormLabel className="text-black">Instituição</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    type="search"
                                                                    placeholder="Buscar instituição..."
                                                                    className="pl-8 text-black focus-visible:ring-yellowLight"
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value
                                                                        field.onChange(value)
                                                                        setQuery(value)
                                                                    }}
                                                                />
                                                                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                                {filteredInstitutions.length > 0 && (
                                                                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-auto">
                                                                        {filteredInstitutions.map((inst, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                                                onClick={() => {
                                                                                    field.onChange(inst.name)
                                                                                    setSelectedCompanyId(inst.id)
                                                                                    setQuery("")
                                                                                    setFilteredInstitutions([])
                                                                                }}
                                                                            >
                                                                                {inst.name}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
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
                                                    name="position"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Cargo</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="focus-visible:ring-yellowLight"
                                                                    placeholder="Ex.: Gerente administrativo"
                                                                    {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="mt-[6px]">
                                                <FormField
                                                    control={form.control}
                                                    name="document"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <PDFUploader {...field} />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full bg-blueNormal hover:bg-blueLight">
                                            {loading
                                                ? <Loader className="animate-spin" />
                                                : "Prosseguir"
                                            }
                                        </Button>
                                    </div>
                                    <div className="flex justify-end text-center text-sm ">
                                        <Button
                                            type="button"
                                            className="p-0 text-blueDark hover:text-yellowDark"
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

export { LegalResponsibleUserRequest }