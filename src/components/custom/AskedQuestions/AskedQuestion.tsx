import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import UpdateAskedQuestionDialog from "./UpdateAskedQuestionDialog"

export default function AskedQuestion() {

    const [storedUserRoles, setStoredUserRoles] = useState<string[]>([])
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

    useEffect(() => {
        const storedUserRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");
        setStoredUserRoles(storedUserRoles)
    }, [])

    const isAdmin = storedUserRoles.includes("adminSystemUser");

    const handleDelete = () => {
        console.log("Deleting asked question...")
        setIsDeleteDialogOpen(false)
    }

    return (
        <AccordionItem value="item-1">
            <div className="flex justify-between">
                <AccordionTrigger
                    className="hover:no-underline hover:text-blueLight"
                >
                    Product Information
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
                                        onClick={() => {setIsUpdateDialogOpen(true)}}
                                        className="cursor-pointer"
                                    >
                                        <Pencil />
                                        Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {setIsDeleteDialogOpen(true)}}
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
                    Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.
                </p>
                <p>
                    Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.
                </p>
            </AccordionContent>
            
            {/* Dialog para alteração! */}
            <UpdateAskedQuestionDialog 
                open={isUpdateDialogOpen}
                onOpenChange={setIsUpdateDialogOpen}
            />

            {/* Dialog para deleção! */}
            <AlertDialog open={isDeleteDialogOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza que deseja deletar esta pergunta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ao confirmar, a pergunta será removida do sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {setIsDeleteDialogOpen(false)}}
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-500 text-grayLight"
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </AccordionItem>
    )
}

export { AskedQuestion }