import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

interface UpdateAskedQuestionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const updateAskedQuestionSchema = z.object({
    answear: z.string().min(1, 'Descrição é obrigatória.'),
})

export default function UpdateAskedQuestionDialog({
    open,
    onOpenChange,
}: UpdateAskedQuestionDialogProps) {

    const form = useForm<z.infer<typeof updateAskedQuestionSchema>>({
        resolver: zodResolver(updateAskedQuestionSchema),
        defaultValues: {
            answear: "",
        }
    })

    const handleUpdate = (data: z.infer<typeof updateAskedQuestionSchema>) => {
        console.log("Dados da submissão:", data)
        toast({
            description: (
                <div className="flex items-center gap-2">
                    <CircleCheck className="text-white" size={20} />
                    Resposta registrada com sucesso
                </div>
            ),
            variant: 'default',
            style: {
                backgroundColor: "#4E995E",
                color: "#FFFFFF",
            },
        })
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormProvider {...form}>
                <DialogContent className="sm:max-w-[425px] scroll-auto">
                    <form onSubmit={form.handleSubmit(handleUpdate)}>
                        <DialogHeader>
                            <DialogTitle>Responder pergunta</DialogTitle>
                            <DialogDescription>
                                Preencha o campo com a resposta para a pergunta e depois clique em 'salvar' para confirmar
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3 py-2">
                                <FormField
                                    control={form.control}
                                    name="answear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-black">
                                                Resposta
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Ex.: Para realizar este procedimento, siga os seguintes passos: ..."
                                                    className="resize-none text-black focus-visible:ring-blueLight"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose
                                    onClick={() => onOpenChange(false)}
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="hover:cursor-pointer"
                                    >
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-success text-white hover:bg-successLight hover:cursor-pointer"
                                >
                                    Salvar
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </FormProvider>
        </Dialog>
    )
}

export { UpdateAskedQuestionDialog }