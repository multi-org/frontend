import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { ImageUploader } from "../ImageUploader"
import {
    FormProvider,
    useForm
} from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCompanies } from "@/hooks/companies-hooks"
import { useEffect, useState } from "react"
import { debounce } from "@/utils/debounce"
import { toast } from "@/hooks/use-toast"
import { CircleX, Search } from "lucide-react"

type InstitutionOption = {
    id: string
    name: string
}

type AddServiceStepOneProps = {
    onNext: (data: z.infer<typeof addServiceStepOneSchema>) => void
    onBack: () => void
    className?: string
}

export type StepOneData = z.infer<typeof addServiceStepOneSchema>

const addServiceStepOneSchema = z.object({
    type: z.string(),
    title: z.string().min(1, 'Título é obrigatório.'),
    companyName: z.string().min(1, 'Informar instituição é obigatório'),
    companyId: z.string().min(1, 'Informar instituição é obigatório'),
    description: z.string()
        .min(1, 'Descrição é obrigatória.')
        .max(300, 'A descrição deve ter no máximo 300 caracteres.'),
    durationMinutes: z
        .preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, 'Duração deve ser maior ou igual a 0.')),
    requirements: z.string().min(1, 'Informar requisitos necessários é obrigatório'),
    category: z.enum(['Técnico/operacional', 'Acadêmico/profissional', 'Logística e organização', 'Alimentação', 'Comunicação e marketing', 'Outros'], {
        errorMap: () => ({ message: 'Categoria é obrigatória.' }),
    }),
    images: z
        .any()
        .refine(
            (files: File[]) => files && files.length > 0 && files.length <= 3,
            'Selecione entre 1 e 3 imagens.'
        )
        .refine(
            (files: File[]) =>
                files.every((file) => file.size <= 3 * 1024 * 1024),
            'Cada imagem deve ter no máximo 3MB.'
        ),
})

export default function AddServiceStepOne({
    onNext,
    onBack,
    className,
    ...props
}: AddServiceStepOneProps) {

    const { getCompanies } = useCompanies()
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
                        company.popularName.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((company) => ({
                        id: company.id,
                        name: company.popularName,
                    }))

                setFilteredInstitutions(filtered)
            } catch (err) {
                console.error("Erro ao buscar instituições:", err)
            }
        }, 300)
        debouncedSearch()
        return () => debouncedSearch.cancel()
    }, [query])

    const form = useForm<z.infer<typeof addServiceStepOneSchema>>({
        resolver: zodResolver(addServiceStepOneSchema),
        defaultValues: {
            type: "SERVICE",
            title: '',
            companyName: '',
            companyId: '',
            description: '',
            durationMinutes: undefined,
            requirements: '',
            category: undefined,
            images: [],
        },
    })

    function onSubmit(data: z.infer<typeof addServiceStepOneSchema>) {
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
        const finalData = {
            type: data.type,
            title: data.title,
            companyName: data.companyName,
            companyId: selectedCompanyId,
            description: data.description,
            durationMinutes: data.durationMinutes,
            requirements: data.requirements,
            category: data.category,
            images: data.images
        }
        onNext(finalData)
    }

    return (
        <>
            <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
                <Card className="overflow-hidden p-0 bg-blueDark text-grayLight">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="relative hidden md:flex min-h-[600px] flex-1 items-center justify-center bg-muted">
                            <img
                                src="/assets/multi-prod-serv-blue.png"
                                alt="Imagem exemplo de serviço"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="relative z-10 text-center">
                                <h1 className="text-4xl text-grayLight font-bold">
                                    Cadastro de <br /> Serviços
                                </h1>
                            </div>
                        </div>
                        <FormProvider  {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Informações Gerais</h1>
                                        <p className="text-balance">
                                            Informe os dados gerais do serviço que deseja cadastrar.
                                        </p>
                                        <p className="text-balance font-semibold">
                                            Etapa 1/3
                                        </p>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Título</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black focus-visible:ring-blueLight"
                                                            placeholder="Ex.: Impressão 3D"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="companyName"
                                            render={({ field }) => ( // em teste
                                                <FormItem className="relative">
                                                    <FormLabel className="text-grayLight">Instituição</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type="search"
                                                                placeholder="Buscar instituição..."
                                                                className="pl-8 text-black focus-visible:ring-blueLight"
                                                                value={field.value}
                                                                onChange={(e) => {
                                                                    const value = e.target.value
                                                                    field.onChange(value)
                                                                    setQuery(value)
                                                                }}
                                                            />
                                                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                                            {filteredInstitutions.length > 0 && (
                                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-auto">
                                                                    {filteredInstitutions.map((inst, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100"
                                                                            onClick={() => {
                                                                                field.onChange(inst.name)
                                                                                setSelectedCompanyId(inst.id)
                                                                                form.setValue("companyId", inst.id)
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
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => {
                                                const remainingCharacters = 300 - field.value.length
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight">Descrição</FormLabel>
                                                        <FormControl>
                                                            <div
                                                                className="relative"
                                                            >
                                                                <Textarea
                                                                    placeholder="Ex.: Impressão 3D acompanhada por técnico/profissional"
                                                                    className="resize-none text-black focus-visible:ring-blueLight"
                                                                    maxLength={300}
                                                                    {...field}
                                                                />
                                                                <div
                                                                    className={cn(
                                                                        "absolute right-1 bottom-[-20px] text-xs text-grayLight"
                                                                    )}
                                                                >
                                                                    {remainingCharacters} caracteres restantes
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-grayLight" />
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="durationMinutes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Duração</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black focus-visible:ring-blueLight"
                                                            placeholder="Ex.: 40 minutos"
                                                            type="number"
                                                            value={field.value === undefined || field.value === null ? "" : field.value}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                field.onChange(value === "" ? undefined : parseFloat(value));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="requirements"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Requisitos</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black focus-visible:ring-blueLight"
                                                            placeholder="Ex.: Equipamentos necessários.."
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Categoria</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}

                                                    >
                                                        <SelectTrigger
                                                            className="text-black ring-1 ring-transparent focus:ring-2 focus:ring-blueLight focus:ring-offset-2t"
                                                        >
                                                            <SelectValue
                                                                placeholder="Categoria"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="Técnico/operacional">Técnico/operacional</SelectItem>
                                                                <SelectItem value="Acadêmico/profissional">Acadêmico/profissional</SelectItem>
                                                                <SelectItem value="Logística e organização">Logística e organização</SelectItem>
                                                                <SelectItem value="Alimentação">Alimentação</SelectItem>
                                                                <SelectItem value="Comunicação e marketing">Comunicação e marketing</SelectItem>
                                                                <SelectItem value="Outros">Outros</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="images"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <ImageUploader
                                                            // {...field}
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            errorColorClass="text-grayLight"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full text-blueDark hover:text-blueLight"
                                            onClick={onBack}
                                        >
                                            Voltar
                                        </Button>
                                        <Button type="submit" className="w-full bg-success hover:bg-successLight">
                                            {
                                                form.formState.isSubmitting
                                                    ? "Salvando..."
                                                    : "Próximo"
                                            }
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

export { AddServiceStepOne }