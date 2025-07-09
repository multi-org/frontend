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
import { ArrowLeft, CircleCheck, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { MaskedInput } from "../MaskedInput.tsx"
import { maskCPF, maskPhone } from "@/utils/masks.ts"

type legalResponsibleUserFormProps = {
    onBack: () => void;
    className?: string;
}

const legalResponsibleUserFormSchema = z.object({
    name: z.string().regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome inválido"),
    cpf: z.string().
        min(1, 'Nº de CPF é obrigatório.')
        .refine((value) => value.replace(/\D/g, '').length === 11, {
            message: 'CPF deve conter exatamente 11 números.',
        }),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email inválido"),
    phone: z.string().regex(/^\(\d{2}\) \d \d{4}-\d{4}$/, "Telefone inválido"),
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

export default function LegalResponsibleUserForm({
    onBack,
    className,
    ...props
}: legalResponsibleUserFormProps) {

    const form = useForm<z.infer<typeof legalResponsibleUserFormSchema>>({
        resolver: zodResolver(legalResponsibleUserFormSchema),
        defaultValues: {
            name: '',
            cpf: '',
            email: '',
            phone: '',
            companyName: '',
            position: '',
            document: [],
        },
    })

    function onSubmit(data: z.infer<typeof legalResponsibleUserFormSchema>) {
        console.log("Dados enviados:", data)
        form.reset();
        toast({
            description: (
                <div className="flex items-center gap-2">
                    <CircleCheck className="text-white" size={20} />
                    Solicitação de associação enviada com sucesso
                </div>
            ),
            variant: 'default',
            style: {
                backgroundColor: "#4E995E",
                color: "#FFFFFF",
            },
        })
        form.reset();
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
                                                    name="cpf"
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
                                                    name="phone"
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
                                                    <FormItem>
                                                        <FormLabel className="text-black">Instituição</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    type="search"
                                                                    placeholder="Buscar instituição..."
                                                                    className="pl-10 text-black focus-visible:ring-yellowLight"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                />
                                                                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                                            Prosseguir
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

export { LegalResponsibleUserForm }