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

type AddEquipmentStepOneProps = {
    onNext: (data: z.infer<typeof addEquipmentStepOneSchema>) => void
    onBack: () => void
    className?: string
}

export type StepOneData = z.infer<typeof addEquipmentStepOneSchema>

const addEquipmentStepOneSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório.'),
    description: z.string()
        .min(1, 'Descrição é obrigatória.')
        .max(300, 'A descrição deve ter no máximo 300 caracteres.'),
    category: z.enum(['Audio', 'Video', 'Esportivo', 'Informatica', 'Outros'], {
        errorMap: () => ({ message: 'Categoria é obrigatória.' }),
    }),
    image: z
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

export default function AddEquipmentStepOne({
    onNext,
    onBack,
    className,
    ...props
}: AddEquipmentStepOneProps) {

    const form = useForm<z.infer<typeof addEquipmentStepOneSchema>>({
        resolver: zodResolver(addEquipmentStepOneSchema),
        defaultValues: {
            title: '',
            description: '',
            category: undefined,
            image: [],
        },
    })

    function onSubmit(data: z.infer<typeof addEquipmentStepOneSchema>) {
        onNext(data)
    }

    return (
        <>
            <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
                <Card className="overflow-hidden p-0 bg-yellowDark text-grayLight">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src="/src/assets/multi-prod-equip-yellow.png"
                                alt="Imagem exemplo de espaço"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <h1
                                className="absolute inset-0 mt-96 text-4xl text-grayLight font-bold text-center"
                            >
                                Cadastro de <br /> Equipamentos
                            </h1>
                        </div>
                        <FormProvider  {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold">Informações Gerais</h1>
                                        <p className="text-balance">
                                            Informe os dados gerais do equipamento que deseja cadastrar.
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
                                                            className="text-black focus-visible:ring-yellowLight"
                                                            placeholder="Ex.: Retroprojetor"
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
                                                const remainingCharacters = 300 - field.value.length
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight">Descrição</FormLabel>
                                                        <FormControl>
                                                            <div
                                                                className="relative"
                                                            >
                                                                <Textarea
                                                                    placeholder="Ex.: um retroprojetor de alta resolução para exibição de apresentações"
                                                                    className="resize-none text-black focus-visible:ring-yellowLight"
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
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Categoria</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}

                                                    >
                                                        <SelectTrigger
                                                            className="text-black focus-visible:ring-yellowLight"
                                                        >
                                                            <SelectValue
                                                                placeholder="Categoria"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="Audio">Audio</SelectItem>
                                                                <SelectItem value="Video">Video</SelectItem>
                                                                <SelectItem value="Esportivo">Esportivo</SelectItem>
                                                                <SelectItem value="Informatica">Informática</SelectItem>
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
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <ImageUploader
                                                            {...field}
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
                                            className="w-full text-yellowDark hover:text-yellowLight"
                                            onClick={onBack}
                                        >
                                            Voltar
                                        </Button>
                                        <Button type="submit" className="w-full bg-success hover:bg-successLight">
                                            Próximo
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

export { AddEquipmentStepOne }