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
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AvailabilityIntervalSelect } from "../AvailabilityIntervalSelect"

type AddSpaceStepTwoProps = {
    onNext: (data: z.infer<typeof addSpaceStepTwoSchema>) => void
    onBack: () => void
    className?: string
}

export type StepTwoData = z.infer<typeof addSpaceStepTwoSchema>

const addSpaceStepTwoSchema = z.object({
    chargingModel: z.enum(['por_hora', 'por_dia', 'ambos']),
    pricePerHour: z.number().optional(),
    pricePerDay: z.number().optional(),
    weekdayHourStart: z.string().min(1),
    weekdayHourEnd: z.string().min(1),
    saturdayHourStart: z.string().optional(),
    saturdayHourEnd: z.string().optional(),
    sundayHourStart: z.string().optional(),
    sundayHourEnd: z.string().optional(),
}).refine((data) => {
    if (data.chargingModel === 'por_hora') return data.pricePerHour !== undefined
    if (data.chargingModel === 'por_dia') return data.pricePerDay !== undefined
    if (data.chargingModel === 'ambos') return data.pricePerHour && data.pricePerDay
    return true
}, {
    message: 'Informe os preços corretos para o modelo de cobrança.',
    path: ['pricePerHour']
})

export default function AddSpaceStepTwo({
    onNext,
    onBack,
    className,
    ...props
}: AddSpaceStepTwoProps) {

    const form = useForm<z.infer<typeof addSpaceStepTwoSchema>>({
        resolver: zodResolver(addSpaceStepTwoSchema),
        defaultValues: {},
    })

    function onSubmit(data: z.infer<typeof addSpaceStepTwoSchema>) {
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
                                            Etapa 2/3
                                        </p>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="chargingModel"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-grayLight">Modelo de cobrança</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="text-black focus-visible:ring-orangeLight">
                                                            <SelectValue placeholder="Selecione o modelo de cobrança" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="por_hora">Por hora</SelectItem>
                                                            <SelectItem value="por_dia">Por dia</SelectItem>
                                                            <SelectItem value="ambos">Ambos</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {form.watch("chargingModel") === "por_hora" || form.watch("chargingModel") === "ambos" ? (
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="pricePerHour"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight">Preço por hora</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="text-black focus-visible:ring-orangeLight"
                                                                placeholder="Ex.: R$ 50"
                                                                type="number"
                                                                value={field.value ?? ""}
                                                                onChange={(e) =>
                                                                    field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-grayLight" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ) : null}
                                    {form.watch("chargingModel") === "por_dia" || form.watch("chargingModel") === "ambos" ? (
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="pricePerDay"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-grayLight">Preço por dia</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className="text-black focus-visible:ring-orangeLight"
                                                                placeholder="Ex.: R$ 200"
                                                                type="number"
                                                                value={field.value ?? ""}
                                                                onChange={(e) =>
                                                                    field.onChange(e.target.value === "" ? undefined : parseFloat(e.target.value))
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-grayLight" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ) : null}
                                    <div className="grid gap-2">
                                        <h2 className="text-lg font-semibold text-grayLight">Disponibilidade</h2>
                                        <AvailabilityIntervalSelect
                                            control={form.control}
                                            textColor="text-grayLight"
                                            ringColor="focus-visible:ring-orangeLight"
                                            inputColor="text-black"
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
                                            Próximo
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

export { AddSpaceStepTwo }