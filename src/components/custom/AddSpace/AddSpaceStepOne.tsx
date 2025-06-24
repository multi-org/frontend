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
import { MultiSelectCheckbox } from "../MultiSelectCheckbox"

type AddSpaceStepOneProps = {
    onNext: (data: z.infer<typeof addSpaceSchema>) => void
    onBack: () => void
    className?: string
}

const days = [
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
    'domingo',
] as const

const hours = [
    '8h-9h', '9h-10h', '10h-11h', '11h-12h',
    '12h-13h', '13h-14h', '14h-15h', '15h-16h',
    '16h-17h', '17h-18h', '18h-19h', '19h-20h',
    '20h-21h', '21h-22h',
] as const

const addSpaceSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório.'),
    description: z.string().min(1, 'Descrição é obrigatória.'),
    capacity: z.number().min(0, 'Preço deve ser maior ou igual a 0.'),
    area: z.number().min(0, 'Preço deve ser maior ou igual a 0.'),
    category: z.enum(['Auditório', 'Laboratório', 'Ginásio', 'Outros'], {
        errorMap: () => ({ message: 'Categoria é obrigatória.' }),
    }),
    price: z.number().min(0, 'Preço deve ser maior ou igual a 0.'),
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
    day: z
        .array(z.enum([
            'segunda-feira',
            'terça-feira',
            'quarta-feira',
            'quinta-feira',
            'sexta-feira',
            'sábado',
            'domingo',
        ]))
        .min(1, 'Escolha ao menos um dia.'),
    hour: z
        .array(z.enum([
            '8h-9h', '9h-10h', '10h-11h', '11h-12h',
            '12h-13h', '13h-14h', '14h-15h', '15h-16h',
            '16h-17h', '17h-18h', '18h-19h', '19h-20h',
            '20h-21h', '21h-22h'
        ]))
        .min(1, 'Escolha ao menos um horário.'),
})

export default function AddSpaceStepOne({
    onNext,
    onBack,
    className,
    ...props
}: AddSpaceStepOneProps) {

    const form = useForm<z.infer<typeof addSpaceSchema>>({
        resolver: zodResolver(addSpaceSchema),
        defaultValues: {
            title: '',
            description: '',
            capacity: undefined,
            area: undefined,
            category: undefined,
            price: undefined,
            image: [],
            day: [],
            hour: []
        },
    })

    function onSubmit(data: z.infer<typeof addSpaceSchema>) {
        onNext(data)
    }

    return (
        <>
            <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
                <Card className="overflow-hidden p-0 bg-orangeDark text-grayLight">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="bg-muted relative hidden md:block">
                            <img
                                src="/src/assets/multi-prod-esp-orange.png"
                                alt="Imagem exemplo de espaço"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <h1
                                className="absolute inset-0 mt-96 text-4xl text-grayLight font-bold text-center"
                            >
                                Cadastro de <br /> Espaços
                            </h1>
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
                                            Etapa 1/2
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
                                                    <FormMessage className="text-grayLight"/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Descrição</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Ex.: Um auditório amplo e bem equipado, ideal para eventos acadêmicos e culturais"
                                                            className="resize-none text-black focus-visible:ring-orangeLight"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-grayLight"/>
                                                </FormItem>
                                            )}
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
                                                    <FormMessage className="text-grayLight"/>
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
                                                    <FormMessage className="text-grayLight"/>
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
                                                            className="text-black focus-visible:ring-orangeLight"
                                                        >
                                                            <SelectValue
                                                                placeholder="Categoria"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="Auditório">Auditório</SelectItem>
                                                                <SelectItem value="Laboratório">Laboratório</SelectItem>
                                                                <SelectItem value="Ginásio">Ginásio</SelectItem>
                                                                <SelectItem value="Outros">Outros</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-grayLight"/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Preço</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black focus-visible:ring-orangeLight"
                                                            placeholder="Ex.: R$ 100"
                                                            type="number"
                                                            value={field.value === undefined || field.value === null ? "" : field.value}
                                                            onChange={(e) => {
                                                                const value = e.target.value
                                                                field.onChange(value === "" ? undefined : parseFloat(value));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-grayLight"/>
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
                                                    <FormMessage className="text-grayLight"/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="day"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight">Dias disponíveis</FormLabel>
                                                        <FormControl>
                                                            <MultiSelectCheckbox
                                                                options={days}
                                                                selected={field.value}
                                                                onChange={field.onChange}
                                                                placeholder="Selecione os dias"
                                                                checkboxColor="orange"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-grayLight"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="hour"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight">Horários disponíveis</FormLabel>
                                                        <FormControl>
                                                            <MultiSelectCheckbox
                                                                options={hours}
                                                                selected={field.value}
                                                                onChange={field.onChange}
                                                                placeholder="Selecione os horários"
                                                                checkboxColor="orange"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-grayLight"/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
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

export { AddSpaceStepOne }