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
    chargingModel: z.enum(['POR_HORA', 'POR_DIA', 'AMBOS']),
    hourlyPrice: z.number().optional(),
    dailyPrice: z.number().optional(),
    weekdayHourStart: z.string().min(1),
    weekdayHourEnd: z.string().min(1),
    saturdayHourStart: z.string().optional(),
    saturdayHourEnd: z.string().optional(),
    sundayHourStart: z.string().optional(),
    sundayHourEnd: z.string().optional(),
}).superRefine((data, ctx) => {
    const intervals = [
        ["weekdayHourStart", "weekdayHourEnd"],
        ["saturdayHourStart", "saturdayHourEnd"],
        ["sundayHourStart", "sundayHourEnd"],
    ] as const

    intervals.forEach(([startKey, endKey]) => {
        const start = data[startKey]
        const end = data[endKey]

        if (start && end) {
            const startNum = start
            const endNum = end

            if (startNum >= endNum) {
                ctx.addIssue({
                    path: [endKey],
                    code: z.ZodIssueCode.custom,
                    message: "O horário de término deve ser maior que o de início",
                })
            }
        }
    })

    // Validação de preços
    if (data.chargingModel === "POR_HORA" && data.hourlyPrice === undefined) {
        ctx.addIssue({
            path: ["hourlyPrice"],
            code: z.ZodIssueCode.custom,
            message: "Informe o preço por hora",
        })
    }
    if (data.chargingModel === "POR_DIA" && data.dailyPrice === undefined) {
        ctx.addIssue({
            path: ["dailyPrice"],
            code: z.ZodIssueCode.custom,
            message: "Informe o preço por dia",
        })
    }
    if (
        data.chargingModel === "AMBOS" &&
        (data.hourlyPrice === undefined || data.dailyPrice === undefined)
    ) {
        ctx.addIssue({
            path: ["hourlyPrice"],
            code: z.ZodIssueCode.custom,
            message: "Informe os dois preços para o modelo 'ambos'",
        })
    }
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
                                                        <SelectTrigger className="text-black ring-1 ring-transparent focus:ring-2 focus:ring-orangeLight focus:ring-offset-2">
                                                            <SelectValue placeholder="Selecione o modelo de cobrança" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="POR_HORA">Por hora</SelectItem>
                                                            <SelectItem value="POR_DIA">Por dia</SelectItem>
                                                            <SelectItem value="AMBOS">Ambos</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-grayLight" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {form.watch("chargingModel") === "POR_HORA" || form.watch("chargingModel") === "AMBOS" ? (
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="hourlyPrice"
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
                                    {form.watch("chargingModel") === "POR_DIA" || form.watch("chargingModel") === "AMBOS" ? (
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="dailyPrice"
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
                                            ringColor="ring-1 ring-transparent focus:ring-2 focus:ring-orangeLight focus:ring-offset-2"
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

export { AddSpaceStepTwo }