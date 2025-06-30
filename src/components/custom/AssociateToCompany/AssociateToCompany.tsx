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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { PDFUploader } from "../PDFUploader"
import { CircleCheck, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

type associateToCompanyProps = {
    onNext: () => void;
    className?: string;
}

const associateToCompanySchema = z.object({
    enrollmentNumber: z.string().min(1, 'Nº de matrícula é obrigatório.'),
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
    companyName: z.string().min(1, 'Nome da instituição é obrigatório.'),
})

export default function AssociateToCompany({
    onNext,
    className,
    ...props
}: associateToCompanyProps) {

    const form = useForm<z.infer<typeof associateToCompanySchema>>({
        resolver: zodResolver(associateToCompanySchema),
        defaultValues: {
            enrollmentNumber: '',
            document: [],
            companyName: '',
        },
    })

    function onSubmit(data: z.infer<typeof associateToCompanySchema>) {
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
    }

    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Associe-se a uma instituição
                    </h1>
                    <span className="text-center font-medium">
                        Ao associar-se, você pode obter benefícios como descontos no aluguel de espaços, equipamentos e serviços
                    </span>
                </div>
            </header>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="m-6 bg-gray-100 overflow-hidden">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Associar-se</CardTitle>
                        <CardDescription>
                            Busque por sua instituição e informe os dados necessários para associação
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
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="enrollmentNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-black">Nº de matrícula</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="text-black focus-visible:ring-yellowLight"
                                                                placeholder="Ex.: 123456789"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
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
                                        <Button type="submit" className="w-full bg-blueNormal hover:bg-blueLight">
                                            Prosseguir
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm">
                                        Não encontrou sua instituição? Solicite{" "}
                                        <Button
                                            type="button"
                                            className="p-0 text-blueDark hover:text-yellowDark"
                                            variant="link"
                                            onClick={onNext}
                                        >
                                            aqui
                                        </Button>
                                        {" "}o cadastro da mesma.
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

export { AssociateToCompany }