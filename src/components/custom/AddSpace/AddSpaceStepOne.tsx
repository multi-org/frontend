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

type AddSpaceStepOneProps = {
    onNext: (data: z.infer<typeof addSpaceStepOneSchema>) => void
    onBack: () => void
    className?: string
}

export type StepOneData = z.infer<typeof addSpaceStepOneSchema>

const addSpaceStepOneSchema = z.object({
    type: z.string(),
    title: z.string().min(1, 'Título é obrigatório.'),
    description: z.string()
        .min(1, 'Descrição é obrigatória.')
        .max(300, 'A descrição deve ter no máximo 300 caracteres.'),
    capacity: z
        .preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, 'Capacidade deve ser maior ou igual a 0.')),
    area: z
        .preprocess(val => val === "" ? undefined : Number(val), z.number().min(0, 'Área deve ser maior ou igual a 0.')),
    category: z.enum(['Sala de aula', 'Auditório', 'Laboratório', 'Espaço para eventos', 'Instação esportiva', 'Área administrativa/coorporativa', 'Outros'], {
        errorMap: () => ({ message: 'Categoria é obrigatória.' }),
    }),
    ImagesFiles: z
        .any()
        .refine(
            (files: File[]) => files && files.length > 0 && files.length <= 3,
            'Selecione entre 1 e 3 imagens.'
        )
        .refine(
            (files: File[]) =>
                files.every((file) => file.size <= 3 * 1024 * 1024),
            'Cada imagem deve ter no máximo 3MB.'
        )
})

export default function AddSpaceStepOne({
    onNext,
    onBack,
    className,
    ...props
}: AddSpaceStepOneProps) {

    const form = useForm<z.infer<typeof addSpaceStepOneSchema>>({
        resolver: zodResolver(addSpaceStepOneSchema),
        defaultValues: {
            type: "SPACE",
            title: '',
            description: '',
            capacity: undefined,
            area: undefined,
            category: undefined,
            ImagesFiles: [],
        },
    })

    function onSubmit(data: z.infer<typeof addSpaceStepOneSchema>) {
        onNext(data)
    }

    return (
        <>
            <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
                <Card className="overflow-hidden p-0 bg-orangeDark text-grayLight">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="relative hidden md:flex min-h-[600px] flex-1 items-center justify-center bg-muted">
                            <img
                                src="/src/assets/multi-prod-esp-orange.png"
                                alt="Imagem exemplo de espaço"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="relative z-10 text-center">
                                <h1 className="text-4xl text-grayLight font-bold">
                                    Cadastro de <br /> Espaços
                                </h1>
                            </div>
                        </div>
                        <FormProvider  {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Informações Gerais</h1>
                                        <p className="text-balance">
                                            Informe os dados gerais do espaço que deseja cadastrar.
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
                                                            className="text-black focus-visible:ring-orangeLight"
                                                            placeholder="Ex.: Auditório Central"
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
                                            name="description"
                                            render={({ field }) => {
                                                // const remainingCharacters = 300 - field.value.length
                                                const remainingCharacters = 300 - ((field.value || "").length)
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight"
                                                        >
                                                            Descrição
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div
                                                                className="relative"
                                                            >
                                                                <Textarea
                                                                    placeholder="Ex.: Um auditório amplo e bem equipado, ideal para eventos acadêmicos e culturais"
                                                                    className="resize-none text-black focus-visible:ring-orangeLight"
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
                                            name="capacity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Capacidade</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black focus-visible:ring-orangeLight"
                                                            placeholder="Ex.: 100 pessoas"
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
                                            name="area"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Área (m²)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black focus-visible:ring-orangeLight"
                                                            placeholder="Ex.: 200 m²"
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
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Categoria</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}

                                                    >
                                                        <SelectTrigger
                                                            className="text-black ring-1 ring-transparent focus:ring-2 focus:ring-orangeLight focus:ring-offset-2"
                                                        >
                                                            <SelectValue
                                                                placeholder="Categoria"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="Sala de aula">Sala de aula</SelectItem>
                                                                <SelectItem value="Auditório">Auditório</SelectItem>
                                                                <SelectItem value="Laboratório">Laboratório</SelectItem>
                                                                <SelectItem value="Espaço para eventos">Espaço para eventos</SelectItem>
                                                                <SelectItem value="Instação esportiva">Instação esportiva</SelectItem>
                                                                <SelectItem value="Área administrativa/coorporativa">Área administrativa/coorporativa</SelectItem>
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
                                            name="ImagesFiles"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <ImageUploader
                                                            // {...field}
                                                            value={field.value}
                                                            onChange={field.onChange}
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
                                            className="w-full text-orangeDark hover:text-orangeLight"
                                            onClick={onBack}>
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
            </div >
        </>
    )
}

export { AddSpaceStepOne }