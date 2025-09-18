import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CircleCheck, EllipsisVertical, Loader, Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import UpdateAskedQuestionDialog from "./UpdateAskedQuestionDialog"
import { AskedQuestionType } from "@/types/AskedQuestion"
import { useAskedQuestions } from "@/hooks/askedQuestions-hooks"
import { toast } from "@/hooks/use-toast"

interface AskedQuestionProps {
    askedQuestion: AskedQuestionType
}

export default function AskedQuestion({
    askedQuestion
}: AskedQuestionProps) {

    const { loading, deleteAskedQuestionById, getAskedQuestionsById } = useAskedQuestions();
    const [storedUserRoles, setStoredUserRoles] = useState<string[]>([])
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

    useEffect(() => {
        const storedUserRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");
        setStoredUserRoles(storedUserRoles)
    }, [])

    const isAdmin = storedUserRoles.includes("adminSystemUser");

    const handleDelete = async () => {
        try {
            await deleteAskedQuestionById(askedQuestion.id)
            const result = getAskedQuestionsById(askedQuestion.id)
            if (!result) {
                console.log("Dúvida removida no sistema!")
                toast({
                    description: (
                        <div className="flex items-center gap-2">
                            <CircleCheck className="text-white" size={20} />
                            Dúvida removida no sistema!
                        </div>
                    ),
                    variant: 'default',
                    style: {
                        backgroundColor: "#4E995E",
                        color: "#FFFFFF",
                    },
                })
                setIsDeleteDialogOpen(false)
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado";
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleCheck className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            })
        }
    }

    return (
        <AccordionItem value="item-1">
            <div className="flex justify-between">
                <AccordionTrigger
                    className="hover:no-underline hover:text-blueLight"
                >
                    {/* Product Information */}
                    {askedQuestion?.question || "Carregando..."}
                </AccordionTrigger>
                {isAdmin && (
                    <>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-none bg-transparent hover:text-blueLight"
                                >
                                    <EllipsisVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => { setIsUpdateDialogOpen(true) }}
                                        className="cursor-pointer"
                                    >
                                        <Pencil />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => { setIsDeleteDialogOpen(true) }}
                                        className="cursor-pointer text-red-600"
                                    >
                                        <Trash2 />
                                        Deletar
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    {askedQuestion?.answer || "Carregando..."}
                </p>
            </AccordionContent>

            {/* Dialog para alteração! */}
            <UpdateAskedQuestionDialog
                askedQuestion={askedQuestion}
                open={isUpdateDialogOpen}
                onOpenChange={setIsUpdateDialogOpen}
            />

            {/* Dialog para deleção! */}
            <AlertDialog open={isDeleteDialogOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Tem certeza que deseja deletar esta pergunta?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Ao confirmar, a pergunta será removida do sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => { setIsDeleteDialogOpen(false) }}
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-500 text-grayLight"
                        >
                            {loading ? <Loader /> : "Confirmar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </AccordionItem>
    )
}

export { AskedQuestion }