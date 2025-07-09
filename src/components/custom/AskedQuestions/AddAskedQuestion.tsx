import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CircleCheck } from "lucide-react"
import { toast } from '@/hooks/use-toast'
import { cn } from "@/lib/utils"
import { useState } from "react"

type AddAskedQuestionProps = {
    onBack: () => void;
    className?: string;
}

const addAskedQuestionSchema = z.object({
    question: z.string()
        .min(1, 'Descrição da dúvida é obrigatória.')
        .max(400, 'A dúvida deve ter no máximo 400 caracteres.'),
    answer: z.string().min(0),
})

export default function AddAskedQuestion({
    onBack,
    className,
    ...props
}: AddAskedQuestionProps) {

    const [sentQustion, setSentQuestion] = useState(false);

    const form = useForm<z.infer<typeof addAskedQuestionSchema>>({
        resolver: zodResolver(addAskedQuestionSchema),
        defaultValues: {
            question: '',
            answer: '',
        },
    })

    function onSubmit(data: z.infer<typeof addAskedQuestionSchema>) {
        console.log("Dados enviados:", data)
        form.reset();
        setSentQuestion(true);
        toast({
            description: (
                <div className="flex items-center gap-2">
                    <CircleCheck className="text-white" size={20} />
                    Sua dúvida foi registrada com sucesso.
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
                        Fale conosco
                    </h1>
                    <span className="text-center font-medium">
                        Conte com a nossa equipe para te ajudar com qualquer dúvida que você tenha. Estamos aqui para te ajudar!
                    </span>
                </div>
            </header>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="m-6 bg-gray-100 overflow-hidden">
                    {sentQustion ? (
                        <>
                            <CardContent>
                                <FormProvider  {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <p className="text-center pt-16">Sua dúvida foi enviada e será respondida o quanto antes</p>
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
                        </>
                    ) : (
                        <>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">Deixe sua dúvida</CardTitle>
                                <CardDescription>
                                    Explique em detalhes sua dúvida para que possamos te ajudar da melhor forma possível.
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
                                                        name="question"
                                                        render={({ field }) => {
                                                            const remainingCharacters = 400 - field.value.length

                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="text-black">Dúvida</FormLabel>
                                                                    <FormControl>
                                                                        <div className="relative"
                                                                        >
                                                                            <Textarea
                                                                                placeholder="Ex.: Como faço uma reserva?"
                                                                                className="resize-none text-black focus-visible:ring-yellowLight"
                                                                                maxLength={400}
                                                                                {...field}
                                                                            />
                                                                            <div
                                                                                className={cn(
                                                                                    "absolute right-1 bottom-[-20px] text-xs",
                                                                                    remainingCharacters < 50 ? "text-red-500" : "text-muted-foreground"
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
                                                <Button type="submit" className="w-full bg-blueNormal hover:bg-blueLight">
                                                    Enviar
                                                </Button>
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
                        </>
                    )}
                </Card>
            </div>
        </>
    )
}

export { AddAskedQuestion }